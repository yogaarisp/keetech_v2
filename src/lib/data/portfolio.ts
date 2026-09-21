import { readSiteData } from "./store";
import type { CaseStudy } from "./schema";

export type { CaseStudy, ImpactMetric } from "./schema";

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return (await readSiteData()).caseStudies;
}

export async function getPortfolioCategories(): Promise<string[]> {
  const caseStudies = await getCaseStudies();
  return ["Semua", ...Array.from(new Set(caseStudies.map((c) => c.category)))];
}

export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
  return (await getCaseStudies()).filter((c) => c.featured);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  return (await getCaseStudies()).find((c) => c.slug === slug);
}
