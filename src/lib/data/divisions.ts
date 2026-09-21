import { readSiteData } from "./store";
import type { Division, DivisionId, Service } from "./schema";

export type { Division, DivisionId, Service } from "./schema";

export async function getDivisions(): Promise<Division[]> {
  return (await readSiteData()).divisions;
}

export async function getServices(): Promise<Service[]> {
  return (await readSiteData()).services;
}

export async function getDivision(id: DivisionId): Promise<Division> {
  const divisions = await getDivisions();
  return divisions.find((d) => d.id === id)!;
}

export async function getServicesByDivision(id: DivisionId): Promise<Service[]> {
  const services = await getServices();
  return services.filter((s) => s.division === id);
}
