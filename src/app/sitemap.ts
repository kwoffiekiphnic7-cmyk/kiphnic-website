import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";

const siteUrl = "https://kiphnic.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/ai", "/projects", "/about", "/contact"];
  const staticPages = pages.map((p) => ({
    url: `${siteUrl}${p}`,
    lastModified: new Date("2026-10-06"),
    changeFrequency: (p === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: p === "" ? 1 : 0.8,
  }));
  const projectPages = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: new Date("2026-10-06"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...staticPages, ...projectPages];
}
