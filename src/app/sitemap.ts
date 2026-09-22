import type { MetadataRoute } from "next";
import { getSite } from "@/lib/data/site";
import { getCaseStudies } from "@/lib/data/portfolio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSite();
  const caseStudies = await getCaseStudies();
  const today = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: today, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/services`, lastModified: today, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/portfolio`, lastModified: today, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/contact`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${site.url}/portfolio/${study.slug}`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}