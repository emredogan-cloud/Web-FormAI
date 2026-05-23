'use client';

import { useConsent } from './ConsentProvider';

export function ConsentFooterLink({ className }: { className?: string }) {
  const { openSettings } = useConsent();
  return (
    <button
      type="button"
      onClick={openSettings}
      className={
        className ??
        'text-xs text-white/45 transition-colors hover:text-white underline-offset-4 hover:underline'
      }
    >
      Çerez tercihleri
    </button>
  );
}
