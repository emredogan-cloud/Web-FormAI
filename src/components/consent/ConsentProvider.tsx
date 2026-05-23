'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  acceptAllConsent,
  defaultConsent,
  isDoNotTrackEnabled,
  readConsent,
  rejectAllConsent,
  writeConsent,
  type ConsentState,
} from '@/lib/consent';

interface ConsentApi {
  state: ConsentState | null;
  hasDecided: boolean;
  // Modal / settings
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  // Actions
  acceptAll: () => void;
  rejectAll: () => void;
  saveCustom: (partial: { analytics: boolean; marketing: boolean }) => void;
  // For testing / settings page
  reset: () => void;
}

const ConsentContext = createContext<ConsentApi | null>(null);

export function useConsent(): ConsentApi {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used inside <ConsentProvider />');
  return ctx;
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ConsentState | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const dntRef = useRef<boolean>(false);

  // Initial hydration — read from storage, respect DNT.
  useEffect(() => {
    dntRef.current = isDoNotTrackEnabled();
    const existing = readConsent();
    setState(existing);
    setHydrated(true);
  }, []);

  const persist = useCallback((next: ConsentState) => {
    writeConsent(next);
    setState(next);
  }, []);

  const acceptAll = useCallback(() => {
    // Even if user clicks "accept all", honor DNT signal for analytics/marketing.
    const next = dntRef.current ? defaultConsent() : acceptAllConsent();
    persist(next);
    setSettingsOpen(false);
  }, [persist]);

  const rejectAll = useCallback(() => {
    persist(rejectAllConsent());
    setSettingsOpen(false);
  }, [persist]);

  const saveCustom = useCallback(
    ({ analytics, marketing }: { analytics: boolean; marketing: boolean }) => {
      const next: ConsentState = {
        ...defaultConsent(),
        analytics: dntRef.current ? false : analytics,
        marketing: dntRef.current ? false : marketing,
      };
      persist(next);
      setSettingsOpen(false);
    },
    [persist]
  );

  const reset = useCallback(() => {
    setState(null);
    writeConsent(defaultConsent());
    // Force re-prompt by clearing the storage entry.
    try {
      window.localStorage.removeItem(`formai_consent_v1`);
    } catch {
      /* ignore */
    }
    setState(null);
  }, []);

  const api = useMemo<ConsentApi>(
    () => ({
      // While not hydrated, expose null so the banner doesn't flash.
      state: hydrated ? state : null,
      hasDecided: hydrated ? state !== null : true,
      settingsOpen,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
      acceptAll,
      rejectAll,
      saveCustom,
      reset,
    }),
    [hydrated, state, settingsOpen, acceptAll, rejectAll, saveCustom, reset]
  );

  return <ConsentContext.Provider value={api}>{children}</ConsentContext.Provider>;
}
