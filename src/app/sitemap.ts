import type { MetadataRoute } from "next";

// Set NEXT_PUBLIC_SITE_URL in your .env.local (or hosting env vars) when you have a domain.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/",            priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/about",       priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services",    priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/expertise",   priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/team",        priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/publications",priority: 0.7, changeFrequency: "weekly"  as const },
    { path: "/careers",     priority: 0.7, changeFrequency: "weekly"  as const },
    { path: "/contact",     priority: 0.6, changeFrequency: "yearly"  as const },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
