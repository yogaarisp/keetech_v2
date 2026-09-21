import Link from "next/link";
import { Code2, Network, ArrowUpRight } from "lucide-react";
import { getDivisions } from "@/lib/data/divisions";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { StaggerItem } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";

const divisionIcons = {
  "software-ai": Code2,
  "support-infra": Network,
} as const;

export async function DivisionShowcase() {
  const divisions = await getDivisions();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="01 — Dual Specialty Division"
        title={
          <>
            Dua divisi, <span className="text-gradient">satu standar</span> kualitas.
          </>
        }
        description="Kami memisahkan kompetensi build dan run agar setiap proyek ditangani tim yang benar-benar ahli di bidangnya."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {divisions.map((division, index) => {
          const Icon = divisionIcons[division.id];
          return (
            <StaggerItem key={division.id}>
              <Card className="card-glow group h-full border-border transition-colors hover:border-foreground/40">
                <CardContent className="flex h-full flex-col gap-6 p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-sm tracking-[0.2em] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Badge variant="secondary">{division.teamLabel}</Badge>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted">
                      <Icon className="h-5 w-5 text-primary" />
                    </span>
                    <div>
                      <h3 className="font-display text-3xl">
                        {division.name}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-primary">
                        {division.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    {division.description}
                  </p>

                  <ul className="flex flex-col gap-3 border-t border-border pt-5">
                    {division.highlights.map((h, i) => (
                      <li
                        key={h}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <span className="mt-0.5 font-mono text-[0.66rem] tracking-[0.16em] text-primary">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/services#${division.id}`}
                    className="mt-auto inline-flex items-center gap-2 border-t border-border pt-5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    Jelajahi layanan {division.shortName}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </CardContent>
              </Card>
            </StaggerItem>
          );
        })}
      </div>
    </section>
  );
}
