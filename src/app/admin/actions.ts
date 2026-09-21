"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { readSiteData, writeSiteData } from "@/lib/data/store";
import type { CaseStudy, Service } from "@/lib/data/schema";
import { requireAdmin, signIn, signOut, verifyPassword } from "@/lib/auth";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function num(formData: FormData, key: string): number {
  const value = Number(str(formData, key));
  return Number.isFinite(value) ? value : 0;
}

function lines(formData: FormData, key: string): string[] {
  return str(formData, key)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function zipPairs(
  formData: FormData,
  keyA: string,
  keyB: string,
): [string, string][] {
  const a = formData.getAll(keyA).map((v) => String(v).trim());
  const b = formData.getAll(keyB).map((v) => String(v).trim());
  const out: [string, string][] = [];
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] && b[i]) out.push([a[i], b[i]]);
  }
  return out;
}

function refresh(): void {
  revalidatePath("/", "layout");
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function loginAction(formData: FormData): Promise<void> {
  const password = str(formData, "password");
  if (!password || !verifyPassword(password)) {
    redirect("/admin/login?error=1");
  }
  await signIn();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await signOut();
  redirect("/admin/login");
}

export async function saveSiteAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const data = await readSiteData();

  data.site = {
    ...data.site,
    name: str(formData, "name"),
    fullName: str(formData, "fullName"),
    domain: str(formData, "domain"),
    url: str(formData, "url"),
    tagline: str(formData, "tagline"),
    description: str(formData, "description"),
    contact: {
      email: str(formData, "email"),
      phone: str(formData, "phone"),
      whatsapp: str(formData, "whatsapp"),
      address: str(formData, "address"),
      officeHours: str(formData, "officeHours"),
    },
    navigation: zipPairs(formData, "navLabel", "navHref").map(([label, href]) => ({
      label,
      href,
    })),
    socials: zipPairs(formData, "socialLabel", "socialHref").map(([label, href]) => ({
      label,
      href,
    })),
    stats: zipPairs(formData, "statValue", "statLabel").map(([value, label]) => ({
      value,
      label,
    })),
  };

  await writeSiteData(data);
  refresh();
  redirect("/admin/site?saved=1");
}

export async function saveDivisionsAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const data = await readSiteData();

  for (const division of data.divisions) {
    division.name = str(formData, `name-${division.id}`);
    division.shortName = str(formData, `shortName-${division.id}`);
    division.tagline = str(formData, `tagline-${division.id}`);
    division.description = str(formData, `description-${division.id}`);
    division.teamLabel = str(formData, `teamLabel-${division.id}`);
    division.highlights = lines(formData, `highlights-${division.id}`);
  }

  await writeSiteData(data);
  refresh();
  redirect("/admin/divisions?saved=1");
}

export async function saveServiceAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const data = await readSiteData();

  const originalSlug = str(formData, "originalSlug");
  const slug = str(formData, "slug").toLowerCase();

  if (!SLUG_PATTERN.test(slug)) {
    redirect(originalSlug ? `/admin/services/${originalSlug}?error=slug` : "/admin/services/new?error=slug");
  }

  const payload: Service = {
    slug,
    title: str(formData, "title"),
    description: str(formData, "description"),
    deliverables: lines(formData, "deliverables"),
    division: str(formData, "division") === "support-infra" ? "support-infra" : "software-ai",
    startingPrice: num(formData, "startingPrice"),
  };

  if (originalSlug) {
    const index = data.services.findIndex((s) => s.slug === originalSlug);
    if (index === -1) redirect("/admin/services?error=notfound");
    data.services[index] = payload;
  } else {
    if (data.services.some((s) => s.slug === slug)) {
      redirect("/admin/services/new?error=duplicate");
    }
    data.services.push(payload);
  }

  await writeSiteData(data);
  refresh();
  redirect("/admin/services?saved=1");
}

export async function deleteServiceAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const data = await readSiteData();
  const slug = str(formData, "slug");

  data.services = data.services.filter((s) => s.slug !== slug);
  await writeSiteData(data);
  refresh();
  redirect("/admin/services?deleted=1");
}

export async function saveCaseStudyAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const data = await readSiteData();

  const originalSlug = str(formData, "originalSlug");
  const slug = str(formData, "slug").toLowerCase();

  if (!SLUG_PATTERN.test(slug)) {
    redirect(originalSlug ? `/admin/portfolio/${originalSlug}?error=slug` : "/admin/portfolio/new?error=slug");
  }

  const payload: CaseStudy = {
    slug,
    title: str(formData, "title"),
    clientType: str(formData, "clientType"),
    division: str(formData, "division") === "support-infra" ? "support-infra" : "software-ai",
    category: str(formData, "category"),
    year: Math.round(num(formData, "year")),
    duration: str(formData, "duration"),
    summary: str(formData, "summary"),
    challenge: str(formData, "challenge"),
    solution: str(formData, "solution"),
    impact: zipPairs(formData, "impactValue", "impactLabel").map(([value, label]) => ({
      value,
      label,
    })),
    techStack: lines(formData, "techStack"),
    services: lines(formData, "relatedServices"),
    featured: formData.get("featured") === "on",
  };

  if (originalSlug) {
    const index = data.caseStudies.findIndex((c) => c.slug === originalSlug);
    if (index === -1) redirect("/admin/portfolio?error=notfound");
    data.caseStudies[index] = payload;
  } else {
    if (data.caseStudies.some((c) => c.slug === slug)) {
      redirect("/admin/portfolio/new?error=duplicate");
    }
    data.caseStudies.push(payload);
  }

  await writeSiteData(data);
  refresh();
  redirect("/admin/portfolio?saved=1");
}

export async function deleteCaseStudyAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const data = await readSiteData();
  const slug = str(formData, "slug");

  data.caseStudies = data.caseStudies.filter((c) => c.slug !== slug);
  await writeSiteData(data);
  refresh();
  redirect("/admin/portfolio?deleted=1");
}
