import { readSiteData } from "./store";
import type { Article } from "./schema";

export type { Article } from "./schema";

export async function getArticles(): Promise<Article[]> {
  const data = await readSiteData();
  return data.articles ?? [];
}

export async function getFeaturedArticles(limit = 3): Promise<Article[]> {
  const articles = await getArticles();
  return articles.slice(0, limit);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const articles = await getArticles();
  return articles.find((a) => a.slug === slug);
}

export async function getArticleCategories(): Promise<string[]> {
  const articles = await getArticles();
  const categories = Array.from(new Set(articles.map((a) => a.category)));
  return ["Semua", ...categories];
}
