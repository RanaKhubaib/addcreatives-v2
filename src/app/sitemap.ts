import type { MetadataRoute } from "next";
import { getBlogPosts, getCaseStudies } from "@/lib/content";
import { siteConfig } from "@/data/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.company.website.replace(/\/$/, "");
  const [blogPosts, caseStudies] = await Promise.all([
    getBlogPosts(),
    getCaseStudies(),
  ]);
  const staticRoutes = [
    "",
    "/services",
    "/about",
    "/contact",
    "/case-studies",
    "/blog",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...siteConfig.services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...caseStudies.map((study) => ({
      url: `${baseUrl}/case-studies/${study.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.55,
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(`${post.date}T12:00:00`),
      changeFrequency: "yearly" as const,
      priority: 0.55,
    })),
  ];
}
