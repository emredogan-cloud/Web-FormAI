import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal, RevealStagger, RevealItem } from '@/components/ui/Reveal';
import { ParallaxLayer } from '@/components/ui/ParallaxLayer';

export function Manifesto() {
  return (
    <section id="manifesto" className="relative isolate overflow-hidden py-24 sm:py-32 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-violet mask-fade-b opacity-30" />
      </div>

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <Reveal>
              <div className="flex items-center gap-2">
                <span className="h-px w-12 bg-violet-400/70" />
                <Eyebrow>Manifesto</Eyebrow>
              </div>
            </Reveal>
            {/* PR 6.2 — line-by-line reveal. Each manifesto statement rises in
                sequence as the section enters view (RevealStagger clones an
                incrementing transitionDelay onto each line; IO + CSS, no Framer
                Motion). Calm + cinematic, never scrubbed-on-scroll (which would
                risk half-visible text + motion noise). text-wrap:balance is
                inherited, so the container setting cascades to each line. */}
            <RevealStagger
              stagger={0.14}
              className="mt-8 font-display text-[28px] leading-[1.25] text-balance text-white/90 sm:text-[36px] sm:leading-[1.2]"
            >
              <RevealItem>
                Fitness; süslü cihazlardan, abartılı vaadlerden, klişe motivasyon
                sözlerinden ibaret değildir.
              </RevealItem>
              <RevealItem className="text-gradient-violet">
                Dikkat, ölçüm ve sabırdır.
              </RevealItem>
              <RevealItem className="mt-6">
                FormAI; ölçümü kamera ile, dikkati yapay zekâ ile, sabrı 30 günlük
                takvim ile size geri verir.
              </RevealItem>
              <RevealItem>Salon değil, zekâ kiralarsınız.</RevealItem>
            </RevealStagger>
            <RevealStagger stagger={0.09} delay={0.05} className="mt-10 grid gap-4 sm:grid-cols-3">
              <RevealItem>
                <Principle no="01" title="Veri seninle kalır" body="Pose analizi on-device. Sentry ve PostHog yalnızca onay sonrası açılır." />
              </RevealItem>
              <RevealItem>
                <Principle no="02" title="Salon zorunlu değil" body="138 egzersizin tamamı evde, ekipmansız varyantlarla planlanır." />
              </RevealItem>
              <RevealItem>
                <Principle no="03" title="Plan akar, durmaz" body="Her gün retrospektif. Programın yarına göre kalibre olur." />
              </RevealItem>
            </RevealStagger>
          </div>

          <Reveal direction="left">
            <div className="relative">
              {/* Glow stays put; the panel drifts over it (PR 6.2 parallax) so
                  the two layers separate into depth. */}
              <div className="pointer-events-none absolute -inset-10 rounded-full bg-violet-500/25 blur-3xl" aria-hidden />
              {/* PR 6.2 — scroll-tied parallax. The whole panel translates (no
                  zoom) so the landscape source is never upscaled further — the
                  blur rule (#1) stays intact. Reduced-motion/data → static. */}
              <ParallaxLayer amplitude={32}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-violet-400/20 bg-ink-900">
                  <Image
                    src="/images/pt-form.webp"
                    alt="FormAI · AI Coach"
                    fill
                    sizes="(max-width: 1024px) 80vw, 480px"
                    className="object-cover object-center"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                  <div className="absolute inset-x-5 bottom-5 hud-panel p-4">
                    <Eyebrow tone="violet">Form AI · Coach Module</Eyebrow>
                    <div className="mt-2 font-display text-lg font-semibold text-white">&ldquo;Senin disiplinini ölçen değil, sürdüren bir zekâ.&rdquo;</div>
                  </div>
                </div>
              </ParallaxLayer>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Principle({ no, title, body }: { no: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
      <Eyebrow>{no}</Eyebrow>
      <h3 className="mt-3 font-display text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/55">{body}</p>
    </div>
  );
}
