// ─────────────────────────────────────────────────────────────────────────────
// Consent — KVKK + GDPR aligned, versioned, localStorage-backed.
//
// What gets consent:
//   - necessary  : always on, cannot be disabled (functional storage only).
//   - analytics  : anonymous usage analytics (Vercel Analytics, PostHog, etc.)
//   - marketing  : retargeting / ad pixels (not currently used).
//
// Pattern: this module is the *source of truth* for the consent state. UI
// reads/writes via the ConsentProvider hook. Tracking scripts that get added
// later (PR 4.5 / 5.4) must read consent before initialising and re-check
// when consent changes.
// ─────────────────────────────────────────────────────────────────────────────

export const CONSENT_VERSION = 1;
export const CONSENT_KEY = `formai_consent_v${CONSENT_VERSION}`;

export type ConsentCategory = 'necessary' | 'analytics' | 'marketing';

export interface ConsentState {
  version: number;
  timestamp: string; // ISO 8601
  necessary: true; // always true; encoded for completeness
  analytics: boolean;
  marketing: boolean;
}

export function defaultConsent(): ConsentState {
  return {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    necessary: true,
    analytics: false,
    marketing: false,
  };
}

export function acceptAllConsent(): ConsentState {
  return { ...defaultConsent(), analytics: true, marketing: true };
}

export function rejectAllConsent(): ConsentState {
  // Same as default — explicit rejection still records timestamp.
  return defaultConsent();
}

export function readConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    // Reject anything from a different schema version — re-prompt.
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      version: CONSENT_VERSION,
      timestamp: typeof parsed.timestamp === 'string' ? parsed.timestamp : new Date().toISOString(),
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return null;
  }
}

export function writeConsent(state: ConsentState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  } catch {
    // Private mode / disabled storage → silently no-op. UI still works for the session.
  }
}

export function clearConsent(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    // ignore
  }
}

export function isDoNotTrackEnabled(): boolean {
  if (typeof navigator === 'undefined') return false;
  // navigator.doNotTrack returns "1" when enabled (string), "0" when off, "unspecified"/null otherwise.
  const dnt =
    navigator.doNotTrack ??
    (window as unknown as { doNotTrack?: string }).doNotTrack ??
    null;
  return dnt === '1' || dnt === 'yes';
}
