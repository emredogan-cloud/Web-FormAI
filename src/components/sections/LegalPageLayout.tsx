import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Mono } from '@/components/ui/Mono';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { site } from '@/lib/site';
import { cn } from '@/lib/cn';

export interface LegalSection {
  id: string;
  title: string;
}

export function LegalPageLayout({
  eyebrow,
  title,
  lastUpdated,
  effective,
  intro,
  sections,
  contactEmail = site.team.contact.email,
  children,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  effective?: string;
  intro?: React.ReactNode;
  sections: LegalSection[];
  contactEmail?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-36 pb-12 sm:pt-44 sm:pb-16">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-grid-violet mask-fade-b opacity-30" />
        </div>
        <Container className="relative">
          <div className="max-w-3xl">
            <Mono>{eyebrow}</Mono>
            <h1 className="mt-5 font-display text-display-xl text-balance text-gradient">
              {title}
            </h1>
            <p className="mt-6 text-sm text-white/55">
              Son güncelleme: <span className="text-white/80">{lastUpdated}</span>
              {effective && (
                <>
                  {' · '}Yürürlük: <span className="text-white/80">{effective}</span>
                </>
              )}
            </p>
            {intro && (
              <div className="mt-6 rounded-2xl border border-violet-400/15 bg-violet-500/[0.06] p-5 text-sm leading-relaxed text-white/75">
                {intro}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Body grid: TOC (sticky on desktop) + content */}
      <section className="relative pb-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
            {/* TOC */}
            <aside className="hidden lg:block">
              <nav aria-label="İçindekiler" className="sticky top-28">
                <Eyebrow className="mb-4 block">İçindekiler</Eyebrow>
                <ol className="space-y-2.5 text-sm">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <Link
                        href={`#${s.id}`}
                        className="group flex items-baseline gap-3 text-white/55 transition-colors hover:text-white"
                      >
                        <span className="font-mono text-[10px] tabular-nums text-violet-300/60 group-hover:text-violet-300">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="leading-snug">{s.title}</span>
                      </Link>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 border-t border-white/[0.06] pt-6">
                  <Eyebrow className="mb-3 block">İletişim</Eyebrow>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-sm text-violet-300 transition-colors hover:text-violet-200"
                  >
                    {contactEmail}
                  </a>
                </div>
              </nav>
            </aside>

            {/* Content */}
            <article className="prose-legal max-w-[68ch]">
              {children}
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}

// Section header used inside each legal page's content. Provides anchor + ring.
export function LegalSectionHeader({
  id,
  number,
  children,
}: {
  id: string;
  number: number;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="group scroll-mt-32 mt-16 first:mt-0 flex items-baseline gap-4 font-display text-2xl font-semibold text-white sm:text-[26px]"
    >
      <span className="font-mono text-[11px] tabular-nums text-violet-300/70">{String(number).padStart(2, '0')}</span>
      <span className="flex-1">{children}</span>
      <a
        href={`#${id}`}
        aria-label="Bu bölüme bağlantı"
        className="opacity-0 transition-opacity group-hover:opacity-100 text-violet-300/60 hover:text-violet-200 font-mono text-base"
      >
        #
      </a>
    </h2>
  );
}

// Sub-header (e.g. "1.1 Hesap bilgileri") inside a numbered section.
export function LegalSubHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={cn('mt-8 font-display text-base font-semibold text-white/90', className)}>
      {children}
    </h3>
  );
}

// Paragraph token used inside legal content.
export function LegalP({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('mt-4 text-[15px] leading-[1.75] text-white/70', className)}>
      {children}
    </p>
  );
}

// Bulleted list inside legal content.
export function LegalUL({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <ul className={cn('mt-4 list-none space-y-2.5 text-[15px] leading-[1.75] text-white/70', className)}>
      {children}
    </ul>
  );
}
export function LegalLI({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-5">
      <span aria-hidden className="absolute left-0 top-[0.7em] h-1 w-1 rounded-full bg-violet-400/70" />
      {children}
    </li>
  );
}

// Highlighted callout box (used for plain-language summaries).
export function LegalCallout({ children, tone = 'violet' }: { children: React.ReactNode; tone?: 'violet' | 'scan' | 'ember' }) {
  const map = {
    violet: 'border-violet-400/25 bg-violet-500/[0.06] text-violet-100',
    scan: 'border-scan-500/30 bg-scan-500/[0.06] text-scan-200',
    ember: 'border-ember-500/30 bg-ember-500/[0.06] text-ember-200',
  }[tone];
  return (
    <div className={cn('mt-6 rounded-2xl border p-5 text-[15px] leading-relaxed', map)}>
      {children}
    </div>
  );
}

// Inline strong/emphasis used in legal copy.
export function LegalStrong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-white">{children}</strong>;
}
