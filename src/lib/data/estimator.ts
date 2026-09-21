import type { ComplexityId, ComplexityOption, DivisionId, Service } from "./schema";

export type { ComplexityId, ComplexityOption } from "./schema";

export function estimateRange(
  services: Service[],
  complexityOptions: ComplexityOption[],
  selectedServiceSlugs: string[],
  complexity: ComplexityId,
): { min: number; max: number } {
  const selected = services.filter((s) => selectedServiceSlugs.includes(s.slug));
  const base = selected.reduce((sum, s) => sum + s.startingPrice, 0);
  const multiplier =
    complexityOptions.find((c) => c.id === complexity)?.multiplier ?? 1;
  // Range estimasi ±25%
  return {
    min: Math.round((base * multiplier * 0.75) / 5) * 5,
    max: Math.round((base * multiplier * 1.25) / 5) * 5,
  };
}

export function divisionOfSelection(
  services: Service[],
  slugs: string[],
): DivisionId | "mixed" | "empty" {
  const selected = services.filter((s) => slugs.includes(s.slug));
  if (selected.length === 0) return "empty";
  const uniqueDivisions = new Set(selected.map((s) => s.division));
  if (uniqueDivisions.size === 1) return selected[0].division;
  return "mixed";
}
