import type { MetadataRoute } from "next";
import { getSite } from "@/lib/data/site";
import { getCaseStudies } from "@/lib/data/portfolio";
import { getServices } from "@/lib/data/divisions";
import { getArticles } from "@/lib/data/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSite();
  const caseStudies = await getCaseStudies();
  const services = await getServices();
  const articles = await getArticles();
  const now = new Date();
  const lastModified = now;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/services`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/blog`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/portfolio`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${site.url}/services/${service.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${site.url}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${site.url}/portfolio/${study.slug}`,
    lastModified: new Date(study.year, 11, 31),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...articleRoutes, ...caseStudyRoutes];
}