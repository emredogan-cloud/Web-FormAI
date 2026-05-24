import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal, RevealItem, RevealStagger } from '@/components/ui/Reveal';
import { Logo, LogoMark } from '@/components/marks/Logo';
import { site } from '@/lib/site';
import { alternatesFor } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Basın & Medya — Press Kit',
  description:
    'FormAI basın kiti: marka logosu, uygulama ikonu, renk paleti, ekran görüntüleri, künye ve doğrudan iletişim. Bağımsız, pre-launch bir ürün.',
  alternates: alternatesFor('/press'),
};

const EMAIL = site.team.contact.email;

// Brand palette — the real tokens from tailwind.config.ts (Standing Rule #3).
const palette = [
  { hex: '#7C5CFF', name: 'Violet 500', role: 'Marka · Gelişim' },
  { hex: '#FF7A1A', name: 'Ember 500', role: 'Antrenman' },
  { hex: '#C8FF00', name: 'Lime 500', role: 'Beslenme' },
  { hex: '#1FCFFF', name: 'Scan 500', role: 'Güvenlik' },
  { hex: '#05030C', name: 'Ink 950', role: 'Zemin' },
];

// Künye — every line is verifiable against the product / site config. No
// investors, no funding, no "as seen in", no fabricated traction.
const facts: { label: string; value: string }[] = [
  { label: 'Ürün', value: 'Yapay zekâ destekli fitness koçu (mobil uygulama)' },
  { label: 'Platform', value: 'iOS 15+ · Android 10+' },
  { label: 'Durum', value: 'Kapalı beta · pre-launch' },
  { label: 'Ekip', value: `Bağımsız küçük ekip · ${site.team.location}` },
  { label: 'Teknoloji', value: 'On-device pose detection (BlazePose / ML Kit) · Flutter' },
  { label: 'Gizlilik', value: 'Kamera cihazda işlenir · reklam SDK’sı yok · telemetri onay tabanlı' },
];

const shots = [
  { src: '/screenshots/welcome.jpg', alt: 'FormAI karşılama ekranı', caption: 'Karşılama' },
  { src: '/screenshots/dashboard.jpg', alt: 'FormAI gösterge paneli', caption: 'Gösterge paneli' },
  { src: '/screenshots/nutrition.jpg', alt: 'FormAI beslenme ekranı', caption: 'Beslenme' },
];

export default function PressPage() {
  return (
    <>
      <PageHero
        eyebrow="Basın & Medya · Press Kit"
        title={
          <>
            FormAI hakkında <br />
            <span className="text-gradient-violet">yazmak mı istiyorsun?</span>
          </>
        }
        description="Logolar, renkler, ekran görüntüleri ve künye — hepsi indirilebilir ve serbestçe kullanılabilir. Aşağıdakilerin tamamı gerçek ürünü yansıtır; abartı yok."
        tone="violet"
      />

      {/* About + künye */}
      <section className="relative py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div>
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-violet-400/70" />
                  <Eyebrow>Hakkında</Eyebrow>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-6 text-pretty text-lg font-display leading-snug text-white">
                  {site.name} — {site.tagline}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-xl text-pretty text-[15px] leading-[1.75] text-white/65">
                  {site.description}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-4 max-w-xl text-pretty text-[15px] leading-[1.75] text-white/55">
                  FormAI bir startup değil. Tek bir Flutter kod tabanı, 138 egzersiz, sekiz
                  özel pose analyzer ve sabırlı bir testler dizisinden geliyor. {site.team.location}’den,
                  ürün için. Verinin sende kalması, kameranın cihazından çıkmaması ve hiçbir
                  reklam SDK’sının kurulmaması baştan yazılmış üç söz.
                </p>
              </Reveal>
            </div>

            {/* Künye fact sheet */}
            <Reveal delay={0.1} direction="left">
              <dl className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06]">
                {facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-[7.5rem_1fr] gap-3 bg-ink-950 px-5 py-4">
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-violet-300/80">
                      {f.label}
                    </dt>
                    <dd className="text-sm leading-relaxed text-white/80">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Brand kit — logo display + downloads + palette */}
      <section className="relative py-16">
        <Container>
          <Reveal>
            <div className="mb-10 flex items-center gap-3">
              <span className="h-px w-10 bg-violet-400/70" />
              <Eyebrow>Marka kiti</Eyebrow>
            </div>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-2">
            {/* Logo display + downloads */}
            <Reveal>
              <div className="flex h-full flex-col rounded-3xl border border-white/[0.07] bg-white/[0.02] p-8">
                <div className="flex flex-1 items-center justify-center rounded-2xl border border-white/[0.05] bg-ink-900/60 py-12">
                  <Logo className="scale-[2]" withGlow />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-white/55">
                  Koyu zeminde kullan; logoyu yeniden renklendirme, döndürme veya
                  oranını bozma. Etrafında en az ikon yüksekliği kadar boşluk bırak.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <DownloadTile href="/favicon.svg" label="Logo işareti" sub="SVG · vektörel" />
                  <DownloadTile href="/images/app-icon.webp" label="Uygulama ikonu" sub="WebP · 1254px" />
                </div>
              </div>
            </Reveal>

            {/* Palette */}
            <Reveal direction="left">
              <div className="flex h-full flex-col rounded-3xl border border-white/[0.07] bg-white/[0.02] p-8">
                <div className="flex items-center gap-2">
                  <LogoMark className="h-5 w-5" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/45">
                    Renk paleti
                  </span>
                </div>
                <div className="mt-6 grid flex-1 content-start gap-2.5">
                  {palette.map((c) => (
                    <div key={c.hex} className="flex items-center gap-4">
                      <span
                        className="h-11 w-11 shrink-0 rounded-xl border border-white/10"
                        style={{ backgroundColor: c.hex }}
                        aria-hidden
                      />
                      <div className="flex flex-1 items-baseline justify-between gap-3">
                        <div>
                          <div className="text-sm font-medium text-white">{c.name}</div>
                          <div className="text-xs text-white/45">{c.role}</div>
                        </div>
                        <code className="font-mono text-xs uppercase text-white/60">{c.hex}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Screenshots */}
      <section className="relative py-16">
        <Container>
          <Reveal>
            <div className="mb-10 flex items-center gap-3">
              <span className="h-px w-10 bg-violet-400/70" />
              <Eyebrow>Ekran görüntüleri</Eyebrow>
            </div>
          </Reveal>
          <RevealStagger className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3" stagger={0.06}>
            {shots.map((s) => (
              <RevealItem key={s.src}>
                <figure className="group">
                  <div className="relative aspect-[1080/2408] overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 300px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-sm text-white/60">{s.caption}</span>
                    <a
                      href={s.src}
                      download
                      className="font-mono text-[10px] uppercase tracking-widest text-violet-300 underline-offset-4 transition-colors hover:text-violet-200 hover:underline"
                    >
                      İndir ↓
                    </a>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealStagger>
          <Reveal>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-white/35">
              1080 × 2408 · gerçek uygulama ekranları
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Contact */}
      <section className="relative py-16 pb-28">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500/[0.08] to-transparent p-10 sm:p-14">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-violet-400/70" />
                <Eyebrow>İletişim</Eyebrow>
              </div>
              <h2 className="mt-5 max-w-2xl text-balance font-display text-2xl font-semibold text-white sm:text-3xl">
                Soru, röportaj talebi veya ek görsel için doğrudan yaz.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
                Basın ve içerik üreticisi taleplerine 24 saat içinde Türkçe yanıt veriyoruz.
                İhtiyacın olan bir varlık burada yoksa, iste — göndeririz.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a
                  href={`mailto:${EMAIL}?subject=Basın%20talebi`}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-b from-violet-400 to-violet-600 px-6 text-[15px] font-medium text-white shadow-[0_8px_30px_-8px_rgba(124,92,255,0.7)] transition-all hover:-translate-y-px"
                >
                  {EMAIL}
                </a>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  {site.team.status} · {site.team.location}
                </span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

// Styled download anchor (Button has no `download` prop, so a native <a download>).
function DownloadTile({ href, label, sub }: { href: string; label: string; sub: string }) {
  return (
    <a
      href={href}
      download
      className="group inline-flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 transition-all hover:-translate-y-0.5 hover:border-violet-400/30 hover:bg-white/[0.05] hover:shadow-glow-subtle"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/10 text-violet-200">
        ↓
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-medium text-white">{label}</span>
        <span className="block font-mono text-[10px] uppercase tracking-widest text-white/45">{sub}</span>
      </span>
    </a>
  );
}
