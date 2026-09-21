import fs from "node:fs/promises";
import path from "node:path";
import { defaultData, type SiteData } from "./schema";

const DATA_FILE = path.join(process.cwd(), "data", "content.json");

export async function getComplexityOptions(): Promise<SiteData["complexityOptions"]> {
  return (await readSiteData()).complexityOptions;
}

export async function readSiteData(): Promise<SiteData> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<SiteData>;
    return { ...defaultData, ...parsed };
  } catch {
    return defaultData;
  }
}

export async function writeSiteData(data: SiteData): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}
