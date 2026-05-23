import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal, RevealItem, RevealStagger } from '@/components/ui/Reveal';
import { Card } from '@/components/ui/Card';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { CtaBlock } from '@/components/sections/CtaBlock';
import { FounderStrip } from '@/components/sections/FounderStrip';
import { Button } from '@/components/ui/Button';
import { faqGroups } from '@/data/faq';
import { site } from '@/lib/site';

// MP.1 — single support address. Both Destek channel cards route to the same
// inbox (proton.me); the labels (E-posta / Veri talebi) keep their distinct
// meanings so users can self-identify their request in the subject.
const SUPPORT_EMAIL = site.team.contact.email;

export const metadata: Metadata = {
  title: 'Destek — Sorularına cevap, yanına koç',
  description:
    'FormAI hakkında sıkça sorulanlar, gizlilik notları ve doğrudan iletişim. Türkçe destek, 24 saat içinde yanıt.',
};

const channels = [
  { icon: 'mail',   label: 'E-posta desteği', value: SUPPORT_EMAIL,            href: `mailto:${SUPPORT_EMAIL}?subject=Destek`,        tone: 'violet' as const, body: 'Türkçe yanıt · 24 saat içinde.' },
  { icon: 'shield', label: 'Veri talebi',     value: SUPPORT_EMAIL,            href: `mailto:${SUPPORT_EMAIL}?subject=KVKK%20veri%20talebi`, tone: 'scan'   as const, body: 'KVKK · hesap silme · veri dökümü.' },
  { icon: 'doc',    label: 'Yasal sayfalar',  value: 'Gizlilik · Şartlar · KVKK', href: '#yasal',                                       tone: 'lime'   as const, body: 'Bağlı yasal hükümlerin tamamı.' },
];

export default function DestekPage() {
  return (
    <>
      <PageHero
        eyebrow="Destek · Türkçe öncelikli"
        title={<>Sorun yok. <br /><span className="text-gradient-violet">Sadece sorular ve cevapları var.</span></>}
        description="Aşağıdaki sıkça sorulanlar, son altı ay içinde gelen gerçek kullanıcı sorularından türetildi. Bulamadığını sorman için aşağıda kanal listesi var."
        tone="violet"
      />

      {/* Channels */}
      <section className="relative py-16" id="iletisim">
        <Container>
          <RevealStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {channels.map((c) => (
              <RevealItem key={c.label}>
                <Link
                  href={c.href}
                  className={`group flex h-full flex-col gap-3 rounded-3xl border border-white/[0.06] bg-white/[0.025] p-7 transition-all hover:-translate-y-0.5 hover:bg-white/[0.04] ${c.tone === 'lime' ? 'hover:border-lime-500/30 hover:shadow-glow-lime' : c.tone === 'scan' ? 'hover:border-scan-500/30 hover:shadow-glow-scan' : 'hover:border-violet-400/30 hover:shadow-glow-subtle'}`}
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${c.tone === 'lime' ? 'border-lime-500/40 bg-lime-500/10 text-lime-400' : c.tone === 'scan' ? 'border-scan-500/40 bg-scan-500/10 text-scan-400' : 'border-violet-400/40 bg-violet-500/15 text-violet-300'}`}>
                    {c.icon === 'mail' ? <MailIcon /> : c.icon === 'shield' ? <ShieldIcon /> : <DocIcon />}
                  </div>
                  <Eyebrow tone={c.tone}>{c.label}</Eyebrow>
                  <div className="font-display text-lg font-semibold text-white">{c.value}</div>
                  <p className="text-sm text-white/55">{c.body}</p>
                </Link>
              </RevealItem>
            ))}
          </RevealStagger>
        </Container>
      </section>

      <FounderStrip />

      {/* FAQ groups */}
      <section className="relative py-16" id="sss">
        <Container>
          <Reveal>
            <div className="mb-12 flex items-center gap-3">
              <span className="h-px w-12 bg-violet-400/70" />
              <Eyebrow>Sıkça sorulanlar</Eyebrow>
            </div>
          </Reveal>
          <div className="grid gap-12">
            {faqGroups.map((g) => (
              <div key={g.id} id={g.id}>
                <Reveal>
                  <h2 className="mb-6 font-display text-2xl font-semibold text-white sm:text-3xl">{g.title}</h2>
                </Reveal>
                <Reveal delay={0.05}>
                  <FaqAccordion items={[...g.items]} tone={faqGroupTone(g.id)} />
                </Reveal>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Trust + privacy */}
      <section className="relative py-24 sm:py-32" id="guvenlik">
        <Container>
          <Reveal>
            <Card padding="lg" className="overflow-hidden">
              <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
                <div>
                  <Eyebrow tone="scan">Privacy by build</Eyebrow>
                  <h2 className="mt-4 font-display text-display-md text-balance text-gradient">
                    Veri seninle kalır. <br />
                    <span className="text-scan-400">Sahte güvence yok.</span>
                  </h2>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-white/65">
                    Pose detection cihazda. Sentry yalnızca onay sonrası açılır. PostHog
                    yalnızca anonim event yollar. Hesap silme satır tabanlı RLS politikası ile zincirleme silinir.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <TrustItem title="RLS uçtan uca" body="Her kullanıcı tablosu Postgres satır seviyesinde korunur." />
                  <TrustItem title="On-device ML" body="Pose tahmini cihazda; bulut çağrısı yok." />
                  <TrustItem title="Server-of-truth abonelik" body="RevenueCat webhook → Supabase pro_entitlements." />
                  <TrustItem title="Onay tabanlı telemetri" body="Sentry beforeSend onaysız event yollamaz." />
                  <TrustItem title="Yaş gateway" body="Tüm akışın başında 16+ yaş onayı." />
                  <TrustItem title="KVKK · GDPR" body="Aydınlatma metni, açık rıza, veri silme." />
                </div>
              </div>
            </Card>
          </Reveal>
        </Container>
      </section>

      <CtaBlock
        eyebrow="Başlamaya hazır mısın?"
        title={<>Sorularını sordun. <br /> <span className="text-gradient-violet">Şimdi koçunla tanış.</span></>}
        description="Yedi gün ücretsiz dene. Hiçbir ödeme bilgisi gerekmeden başlar."
        primaryLabel="Hemen başla"
        secondaryHref="/"
        secondaryLabel="Ana sayfaya dön"
      />
    </>
  );
}

// MP.9 — map each FAQ group id to its pillar tone so the accordion
// chrome (number chip on open, left-rail accent, chevron) reinforces
// the pillar identity established by MP.5 + the rest of the site.
// Defaults to violet for the generic "sss" group + any future group.
function faqGroupTone(id: string): 'violet' | 'ember' | 'lime' | 'scan' {
  switch (id) {
    case 'antrenman':
      return 'ember';
    case 'beslenme':
      return 'lime';
    case 'gelisim':
      return 'violet';
    case 'guvenlik':
      return 'scan';
    default:
      return 'violet';
  }
}

function TrustItem({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
      <div className="flex items-start gap-3">
        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-scan-500/40 bg-scan-500/10 text-scan-400">
          <CheckIcon />
        </span>
        <div>
          <div className="font-display text-sm font-semibold text-white">{title}</div>
          <p className="mt-1 text-xs text-white/55">{body}</p>
        </div>
      </div>
    </div>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 5 L9 10 L16 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 1.5 L15 4 V9 C15 12 12 15 9 16 C6 15 3 12 3 9 V4 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M6.5 9 L8.5 11 L12 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function DocIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 2 H11 L14 5 V15 a1 1 0 01-1 1 H5 a1 1 0 01-1-1 V3 a1 1 0 011-1 Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 2 V5 H14" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
      <path d="M3 6.5 L5 8.5 L9 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
