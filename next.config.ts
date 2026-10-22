import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // Compress responses with gzip/brotli
  compress: true,

  // Remove X-Powered-By header (security + fewer bytes)
  poweredByHeader: false,

  // Image optimisation
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 2592000, // 30 days
    qualities: [75, 90],
  },

  // Long-lived cache headers for static assets + security headers for HTML
  async headers() {
    const isProd = process.env.NODE_ENV === "production";

    const headersList = [
      {
        // Security + performance headers for all HTML pages
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];

    if (isProd) {
      headersList.push(
        {
          // Immutable cache for all /_next/static assets (JS, CSS, fonts, images) in production
          source: "/_next/static/:path*",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=31536000, immutable",
            },
          ],
        },
        {
          // Cache WebP hero images and logo for 30 days in production
          source: "/:file(hero-.*\\.webp|logo\\.webp)",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=2592000, stale-while-revalidate=86400",
            },
          ],
        }
      );
    }

    return headersList;
  },
};

export default withPayload(nextConfig);
