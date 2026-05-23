// ─────────────────────────────────────────────────────────────────────────────
// Waitlist helpers — pure, runtime-agnostic. Shared by client + route handler.
// ─────────────────────────────────────────────────────────────────────────────

// Conservative RFC-ish regex; covers ~99% of real addresses without being
// pedantic. The route handler is the source of truth; this is for UX hints.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const v = value.trim();
  if (v.length < 5 || v.length > 254) return false;
  return EMAIL_RE.test(v);
}

export type WaitlistSource = 'baslat' | 'home' | 'other';

export type WaitlistOk = { ok: true };
export type WaitlistErr = {
  ok: false;
  error: 'invalid_email' | 'rate_limited' | 'spam' | 'server';
  message?: string;
};
export type WaitlistResponse = WaitlistOk | WaitlistErr;
