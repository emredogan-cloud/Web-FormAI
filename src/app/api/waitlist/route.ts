// ─────────────────────────────────────────────────────────────────────────────
// POST /api/waitlist
//
// Zero-config: validates email, drops a structured log line, returns 200.
// Vercel function logs capture every signup — you can grep them or wire a
// Log Drain later. No DB, no third-party account required to be functional.
//
// Optional upgrade paths (activate by setting env vars):
//   - WAITLIST_WEBHOOK_URL          → POSTs JSON to any webhook (Zapier,
//                                     n8n, Make, Slack incoming-webhook).
//   - RESEND_API_KEY                → sends a notification email via Resend.
//   - WAITLIST_NOTIFY_EMAIL         → recipient of the Resend notification.
//   - WAITLIST_FROM_EMAIL           → verified sender for Resend.
//
// If none are set the endpoint still works — signups land in the function log.
// ─────────────────────────────────────────────────────────────────────────────

import { NextResponse } from 'next/server';
import { isValidEmail, type WaitlistResponse } from '@/lib/waitlist';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Best-effort, per-instance rate limit. Real rate-limiting belongs in
// Vercel KV / Upstash later; this discourages naive bot replays for now.
const RECENT = new Map<string, number>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 4;

function rateLimitKey(req: Request): string {
  // x-forwarded-for is the only thing Edge gives us; fall back to UA.
  const fwd = req.headers.get('x-forwarded-for') ?? '';
  const ip = fwd.split(',')[0]?.trim() || req.headers.get('user-agent') || 'unknown';
  return ip;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  // GC older entries
  for (const [k, t] of RECENT) if (now - t > WINDOW_MS) RECENT.delete(k);
  const count = [...RECENT.entries()].filter(([k, t]) => k.startsWith(key) && now - t < WINDOW_MS).length;
  if (count >= MAX_PER_WINDOW) return true;
  RECENT.set(`${key}|${now}`, now);
  return false;
}

async function forwardToWebhook(payload: object): Promise<void> {
  const url = process.env.WAITLIST_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('[waitlist] webhook forward failed:', err);
  }
}

async function notifyViaResend(email: string, source: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.WAITLIST_NOTIFY_EMAIL;
  const from = process.env.WAITLIST_FROM_EMAIL;
  if (!apiKey || !to || !from) return;
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `FormAI · Yeni bekleme listesi kaydı (${source})`,
        text: `Yeni e-posta: ${email}\nKaynak: ${source}\nZaman: ${new Date().toISOString()}`,
      }),
    });
  } catch (err) {
    console.error('[waitlist] resend notify failed:', err);
  }
}

export async function POST(req: Request): Promise<NextResponse<WaitlistResponse>> {
  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
  }
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
  }

  const { email, hp_field, source } = body as {
    email?: unknown;
    hp_field?: unknown;
    source?: unknown;
  };

  // Honeypot — real users never fill this. Bots that scrape and submit will.
  if (typeof hp_field === 'string' && hp_field.length > 0) {
    // Pretend to succeed; quietly drop.
    return NextResponse.json({ ok: true });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
  }

  const key = rateLimitKey(req);
  if (isRateLimited(key)) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited', message: 'Çok hızlı denedin, biraz bekle.' },
      { status: 429 }
    );
  }

  const cleanSource = typeof source === 'string' && source.length < 40 ? source : 'unknown';
  const normalized = email.trim().toLowerCase();

  // Structured log line — easy to grep in Vercel logs and to pipe via Log Drain.
  console.log(
    JSON.stringify({
      tag: 'waitlist.signup',
      email: normalized,
      source: cleanSource,
      ts: new Date().toISOString(),
      ip: key,
    })
  );

  // Best-effort fan-out (both no-op if env vars absent).
  await Promise.allSettled([
    forwardToWebhook({ email: normalized, source: cleanSource, ts: new Date().toISOString() }),
    notifyViaResend(normalized, cleanSource),
  ]);

  return NextResponse.json({ ok: true });
}

// Block other methods explicitly.
export async function GET() {
  return NextResponse.json({ ok: false, error: 'server', message: 'POST only' }, { status: 405 });
}
