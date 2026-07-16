import type { MetadataRoute } from "next";

// Set NEXT_PUBLIC_SITE_URL in your .env.local (or hosting env vars) when you have a domain.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    // Only include sitemap link when a production URL is configured
    sitemap: siteUrl ? `${siteUrl}/sitemap.xml` : undefined,
  };
}
