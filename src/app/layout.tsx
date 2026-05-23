import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';
import { site } from '@/lib/site';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { ConsentProvider } from '@/components/consent/ConsentProvider';
import { MotionGate } from '@/components/util/MotionGate';

// PR 4.3 — ConsentBanner + ConsentSettings are the only layout-level surfaces
// that still depend on Framer Motion (the slide-up banner + the modal use
// AnimatePresence for enter/exit transitions, which is non-trivial to replace
// in pure CSS). Dynamic-importing them moves the FM bundle out of every
// page's initial load — it only ships when the consent UI actually mounts,
// which is post-hydration. Net win: no FM bundle on the first paint of any
// route. ConsentProvider stays in the main bundle because it sets up context
// the rest of the tree might read.
const ConsentBanner = dynamic(
  () => import('@/components/consent/ConsentBanner').then((m) => m.ConsentBanner),
  { ssr: false }
);
const ConsentSettings = dynamic(
  () => import('@/components/consent/ConsentSettings').then((m) => m.ConsentSettings),
  { ssr: false }
);

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#05030C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    'yapay zeka fitness koçu',
    'AI fitness coach',
    'kişisel antrenman programı',
    'beslenme planı',
    'form takibi',
    'kamera pose detection',
    'FormAI',
    'SixPack AI',
  ],
  authors: [{ name: 'FormAI' }],
  creator: 'FormAI',
  publisher: 'FormAI',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [site.ogImage],
    creator: site.twitter,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${inter.variable} ${mono.variable}`}>
      <body className="overflow-x-hidden">
        <ConsentProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:rounded-md focus:bg-violet-500 focus:px-4 focus:py-2 focus:text-white"
          >
            İçeriğe geç
          </a>
          <Navbar />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
          <ConsentBanner />
          <ConsentSettings />
          {/* PR 4.4 — pauses off-viewport ambient animations. Renders null. */}
          <MotionGate />
        </ConsentProvider>
      </body>
    </html>
  );
}
