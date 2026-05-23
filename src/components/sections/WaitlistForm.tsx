'use client';

import { useState, useId } from 'react';
import { Button } from '@/components/ui/Button';
import { Mono } from '@/components/ui/Mono';
import { cn } from '@/lib/cn';
import { isValidEmail, type WaitlistResponse } from '@/lib/waitlist';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function WaitlistForm({
  source = 'baslat',
  className,
}: {
  source?: string;
  className?: string;
}) {
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string>('');
  const inputId = useId();
  const liveId = useId();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'submitting') return;

    if (!isValidEmail(email)) {
      setStatus('error');
      setMessage('Geçerli bir e-posta gir.');
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, source, hp_field: hp }),
      });
      const data = (await res.json()) as WaitlistResponse;

      if (data.ok) {
        setStatus('success');
        setMessage('Listedesin. Mağazalar açıldığında ilk sana yazıyoruz.');
        setEmail('');
      } else {
        setStatus('error');
        if (data.error === 'rate_limited') setMessage('Çok hızlı denedin, biraz bekle.');
        else if (data.error === 'invalid_email') setMessage('Geçerli bir e-posta gir.');
        else setMessage('Bir şey ters gitti. Birazdan tekrar dene.');
      }
    } catch {
      setStatus('error');
      setMessage('Bağlantı kurulamadı. Birazdan tekrar dene.');
    }
  }

  const submitting = status === 'submitting';
  const succeeded = status === 'success';

  return (
    <form
      onSubmit={submit}
      noValidate
      className={cn('mx-auto mt-8 flex w-full max-w-md flex-col gap-3', className)}
      aria-describedby={liveId}
    >
      <label htmlFor={inputId} className="sr-only">
        E-posta
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          required
          inputMode="email"
          disabled={submitting || succeeded}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="ornek@formai.app"
          className="h-12 flex-1 rounded-full border border-white/[0.1] bg-white/[0.04] px-5 text-sm text-white placeholder:text-white/35 focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-400/30 disabled:opacity-60"
        />
        {/* Honeypot — visually hidden, off-screen, ignored by real users. */}
        <input
          type="text"
          name="hp_field"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          arrow={!succeeded}
          disabled={submitting || succeeded}
          ariaBusy={submitting}
        >
          {submitting ? 'Gönderiliyor…' : succeeded ? 'Eklendin ✓' : 'Beni listeye ekle'}
        </Button>
      </div>

      <div
        id={liveId}
        role="status"
        aria-live="polite"
        className={cn(
          'min-h-[1.25rem] text-left text-xs sm:text-center',
          status === 'success' && 'text-lime-400',
          status === 'error' && 'text-ember-400',
          status === 'idle' && 'text-white/40'
        )}
      >
        {message}
        {status === 'idle' && !message && (
          <Mono tone="neutral">Spam yok · istediğin an çık</Mono>
        )}
      </div>
    </form>
  );
}
