import Link from "next/link";
import { ArrowRight, Building2, CalendarDays } from "lucide-react";
import { getFeaturedCaseStudies } from "@/lib/data/portfolio";
import { getDivisions } from "@/lib/data/divisions";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StaggerItem } from "@/components/motion/fade-in";

export async function FeaturedCaseStudies() {
  const [featured, divisions] = await Promise.all([
    getFeaturedCaseStudies(),
    getDivisions(),
  ]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 border-b border-border pb-10 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          align="left"
          eyebrow="03 — Outcome-Based Showcase"
          title={
            <>
              Dampak nyata, <span className="text-gradient">bukan sekadar</span> galeri.
            </>
          }
          description="Setiap proyek kami ceritakan berdasarkan dampak bisnis yang dihasilkan."
        />
        <Link
          href="/portfolio"
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
        >
          Lihat semua studi kasus
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {featured.map((study) => (
          <StaggerItem key={study.slug}>
            <Link href={`/portfolio/${study.slug}`} className="group block h-full">
              <Card className="card-glow h-full transition-colors hover:border-foreground/40">
                <CardContent className="flex h-full flex-col gap-5 p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{study.category}</Badge>
                    <Badge variant="outline">
                      {divisions.find((d) => d.id === study.division)?.shortName}
                    </Badge>
                  </div>

                  <h3 className="font-display text-2xl transition-colors group-hover:text-primary">
                    {study.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">{study.summary}</p>

                  <div className="mt-auto grid grid-cols-3 gap-3 border-t border-border pt-5">
                    {study.impact.slice(0, 3).map((metric) => (
                      <div key={metric.label}>
                        <p className="font-display text-2xl leading-none text-primary">
                          {metric.value}
                        </p>
                        <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-primary" />
                      {study.clientType}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-primary" />
                      {study.year}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </StaggerItem>
        ))}
      </div>
    </section>
  );
}
