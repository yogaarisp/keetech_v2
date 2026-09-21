"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
import {
  estimateRange,
  type ComplexityId,
  type ComplexityOption,
} from "@/lib/data/estimator";
import type { Division, Service } from "@/lib/data/divisions";
import { cn, formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ServiceEstimator({
  services,
  divisions,
  complexityOptions,
}: {
  services: Service[];
  divisions: Division[];
  complexityOptions: ComplexityOption[];
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [complexity, setComplexity] = useState<ComplexityId>("standard");

  const range = useMemo(
    () => estimateRange(services, complexityOptions, selected, complexity),
    [services, complexityOptions, selected, complexity],
  );

  const toggleService = (slug: string) => {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const reset = () => {
    setSelected([]);
    setComplexity("standard");
  };

  const inquiryHref = useMemo(() => {
    const chosen = services.filter((s) => selected.includes(s.slug));
    const comp = complexityOptions.find((c) => c.id === complexity)!;
    const lines = [
      "Halo KeeTech, saya ingin melakukan inquiry layanan berikut:",
      "",
      ...chosen.map((s) => `- ${s.title} (${s.division === "software-ai" ? "Software & AI" : "Support & Infra"})`),
      "",
      `Skala proyek: ${comp.label}`,
      `Estimasi awal: ${formatRupiah(range.min * 1_000_000)} – ${formatRupiah(range.max * 1_000_000)}`,
      "",
      "Mohon dihubungi untuk diskusi lebih lanjut. Terima kasih.",
    ];
    return `/contact?estimator=${encodeURIComponent(lines.join("\n"))}`;
  }, [selected, complexity, range, services, complexityOptions]);

  return (
    <section className="border-y border-border bg-card/50">
      <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="flex flex-col gap-5">
            <span className="eyebrow">02 — Interactive Estimator</span>
            <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.12] sm:text-5xl">
              Estimasi kebutuhan Anda dalam <span className="text-gradient">60 detik</span>.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            Pilih layanan yang Anda butuhkan, tentukan skala proyek, dan dapatkan estimasi
            investasi awal — tanpa registrasi.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <h3 className="eyebrow">01 — Pilih layanan</h3>
              {divisions.map((division) => (
                <div key={division.id} className="flex flex-col gap-3">
                  <p className="text-sm font-semibold text-primary">
                    {division.name}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {services
                      .filter((s) => s.division === division.id)
                      .map((service) => {
                        const active = selected.includes(service.slug);
                        return (
                          <button
                            key={service.slug}
                            type="button"
                            onClick={() => toggleService(service.slug)}
                            className={cn(
                              "flex items-center justify-between gap-3 rounded-xl border p-4 text-left transition-colors cursor-pointer",
                              active
                                ? "border-foreground bg-foreground/[0.03]"
                                : "border-border bg-card hover:border-foreground/40"
                            )}
                          >
                            <span>
                              <span className="block text-sm font-medium">{service.title}</span>
                              <span className="mt-1 block text-xs text-muted-foreground">
                                Mulai {formatRupiah(service.startingPrice * 1_000_000)}
                              </span>
                            </span>
                            <span
                              className={cn(
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                                active
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border"
                              )}
                            >
                              {active ? <Check className="h-3 w-3" /> : null}
                            </span>
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="eyebrow">02 — Tentukan skala proyek</h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {complexityOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setComplexity(option.id)}
                    className={cn(
                      "rounded-xl border p-4 text-left transition-colors cursor-pointer",
                      complexity === option.id
                        ? "border-foreground bg-foreground/[0.03]"
                        : "border-border bg-card hover:border-foreground/40"
                    )}
                  >
                    <span className="block font-display text-xl leading-none">
                      {option.label}
                    </span>
                    <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
                      {option.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-fit lg:sticky lg:top-24">
            <div className="card-glow rounded-2xl border border-foreground/15 bg-card p-6">
              <h3 className="eyebrow">Estimasi Investasi</h3>
              {selected.length === 0 ? (
                <p className="mt-5 text-sm text-muted-foreground">
                  Pilih minimal satu layanan untuk melihat estimasi.
                </p>
              ) : (
                <>
                  <p className="mt-5 font-display text-4xl leading-none tracking-tight text-primary">
                    {formatRupiah(range.min * 1_000_000)}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    s/d {formatRupiah(range.max * 1_000_000)}
                  </p>
                  <p className="mt-5 rounded-lg border border-border bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground">
                    Estimasi indikatif sebelum survey kebutuhan. Harga final ditetapkan setelah
                    sesi konsultasi &amp; analisis kebutuhan — gratis, tanpa komitmen.
                  </p>
                </>
              )}

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href={inquiryHref}
                  className={cn(
                    "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-foreground hover:text-background",
                    selected.length === 0 && "pointer-events-none opacity-40"
                  )}
                  aria-disabled={selected.length === 0}
                >
                  Kirim Inquiry Ini
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Button variant="ghost" onClick={reset} className="h-9">
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset pilihan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
