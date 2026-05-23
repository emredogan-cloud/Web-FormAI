import Link from 'next/link';
import { Logo } from '@/components/marks/Logo';
import { Container } from '@/components/ui/Container';
import { Mono } from '@/components/ui/Mono';
import { footerNav } from '@/lib/nav';
import { site } from '@/lib/site';
import { ConsentFooterLink } from '@/components/consent/ConsentFooterLink';

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/[0.05] bg-ink-950">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-40 bg-radial-violet opacity-50" />

      <Container className="relative pt-20 pb-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="space-y-5">
            <Logo className="text-xl" />
            <p className="max-w-sm text-sm text-white/55">
              {site.description}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Mono>{`Sürüm 1.0 · Türkiye`}</Mono>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerNav).map(([label, items]) => (
              <div key={label}>
                <Mono className="mb-4 block">{label}</Mono>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-white/65 transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/[0.05] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} {site.name}. Tüm hakları saklıdır.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
            <ConsentFooterLink />
            <span className="text-white/40">Made with discipline. Powered by on-device AI.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
