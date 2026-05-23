import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

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
            <Reveal delay={0.05}>
              <p className="mt-8 font-display text-[28px] leading-[1.25] text-balance text-white/90 sm:text-[36px] sm:leading-[1.2]">
                Fitness; süslü cihazlardan, abartılı vaadlerden, klişe motivasyon
                sözlerinden ibaret değildir. <span className="text-gradient-violet">Dikkat, ölçüm ve sabırdır.</span>
                <br /><br />
                FormAI; ölçümü kamera ile, dikkati yapay zekâ ile, sabrı 30 günlük
                takvim ile size geri verir. Salon değil, zekâ kiralarsınız.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <Principle no="01" title="Veri seninle kalır" body="Pose analizi on-device. Sentry ve PostHog yalnızca onay sonrası açılır." />
                <Principle no="02" title="Salon zorunlu değil" body="138 egzersizin tamamı evde, ekipmansız varyantlarla planlanır." />
                <Principle no="03" title="Plan akar, durmaz" body="Her gün retrospektif. Programın yarına göre kalibre olur." />
              </div>
            </Reveal>
          </div>

          <Reveal direction="left">
            <div className="relative">
              <div className="pointer-events-none absolute -inset-10 rounded-full bg-violet-500/25 blur-3xl" aria-hidden />
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-violet-400/20 bg-ink-900">
                <Image src="/images/coach-portrait.webp" alt="FormAI AI Coach portresi" fill sizes="(max-width: 1024px) 80vw, 480px" className="object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 hud-panel p-4">
                  <Eyebrow tone="violet">Form AI · Coach Module</Eyebrow>
                  <div className="mt-2 font-display text-lg font-semibold text-white">&ldquo;Senin disiplinini ölçen değil, sürdüren bir zekâ.&rdquo;</div>
                </div>
              </div>
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
