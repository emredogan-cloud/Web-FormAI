import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/site';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { ConsentProvider } from '@/components/consent/ConsentProvider';
import { ConsentBanner } from '@/components/consent/ConsentBanner';
import { ConsentSettings } from '@/components/consent/ConsentSettings';

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
        </ConsentProvider>
      </body>
    </html>
  );
}
