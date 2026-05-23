import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { GlowOrb } from '@/components/ui/GlowOrb';

export function CtaBlock({
  eyebrow = 'Hazır mısın?',
  title,
  description,
  primaryHref = '/baslat',
  primaryLabel = 'Programını oluştur',
  secondaryHref,
  secondaryLabel,
  imageSrc = '/images/coach-hero.webp',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  imageSrc?: string;
}) {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-violet-400/15 bg-gradient-to-b from-ink-800 to-ink-900 p-10 sm:p-16">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <GlowOrb tone="violet" size="xl" className="-top-32 -right-32 opacity-50" />
              <GlowOrb tone="scan" size="md" className="-bottom-20 left-1/4 opacity-30" />
              <div className="absolute inset-0 bg-grid-violet mask-fade-b opacity-40" />
            </div>

            {imageSrc && (
              <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-25 mask-radial lg:block">
                <Image src={imageSrc} alt="" fill className="object-cover object-left" />
              </div>
            )}

            <div className="relative max-w-2xl">
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 className="mt-5 text-display-xl font-display text-balance text-gradient">
                {title}
              </h2>
              <p className="mt-6 text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
                {description}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button href={primaryHref} variant="primary" size="lg" arrow>
                  {primaryLabel}
                </Button>
                {secondaryHref && secondaryLabel && (
                  <Button href={secondaryHref} variant="secondary" size="lg">
                    {secondaryLabel}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
