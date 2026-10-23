import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WaButton from '@/components/WaButton';
import Effects from '@/components/Effects';
import { site, SITE_URL } from '@/lib/site';
import '@/styles/global.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: '/favicon.png', apple: '/apple-touch-icon.png' },
  alternates: { types: { 'application/rss+xml': [{ url: '/rss.xml', title: 'Artikel Ruftech' }] } },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#050B1F',
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.nama,
  description: site.deskripsi,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/img/logo-ruftech-full.png`,
  telephone: site.whatsappTampil,
  address: { '@type': 'PostalAddress', addressLocality: 'Tangerang', addressRegion: 'Banten', addressCountry: 'ID' },
  sameAs: [`https://www.instagram.com/${site.instagram}`],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const ga4 = site.ga4 || '';
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,500;1,14..32,600&family=JetBrains+Mono:wght@500&display=swap" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
      <body>
        <div className="page-bg">
          <div className="progress" aria-hidden="true"></div>
          <Header />
          <main id="isi">{children}</main>
          <Footer />
        </div>
        <WaButton />
        <Effects />
        {ga4 && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); }; gtag('js', new Date()); gtag('config', ${JSON.stringify(ga4)});`}</Script>
          </>
        )}
      </body>
    </html>
  );
}
