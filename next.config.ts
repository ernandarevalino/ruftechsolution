import type { NextConfig } from 'next';

/**
 * Website dibangun sebagai situs statis (folder `out/`), jadi bisa di-hosting
 * gratis di Netlify, Vercel, Cloudflare Pages, atau hosting biasa.
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
