import { readSiteData } from "./store";
import type { NavigationItem, Site } from "./schema";

export type { NavigationItem, Site } from "./schema";

export async function getSite(): Promise<Site> {
  return (await readSiteData()).site;
}

export async function getNavigation(): Promise<NavigationItem[]> {
  return (await readSiteData()).site.navigation;
}
