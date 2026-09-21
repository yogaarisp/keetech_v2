import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { getDivisions, getServicesByDivision } from "@/lib/data/divisions";
import { formatRupiah } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, StaggerItem } from "@/components/motion/fade-in";
import { CtaBanner } from "@/components/home/cta-banner";

export const metadata: Metadata = {
  title: "Services — Detailed Division Breakdown",
  description:
    "Rincian layanan dua divisi KeeTech: Software & AI Innovation dan Support & Infrastructure. Lihat deliverables dan estimasi investasi tiap layanan.",
};

export default async function ServicesPage() {
  const divisions = await getDivisions();
  const servicesPerDivision = await Promise.all(
    divisions.map((d) => getServicesByDivision(d.id))
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="paper-dots absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Services"
            title={
              <>
                Layanan lintas <span className="text-gradient">dua divisi</span> spesialis.
              </>
            }
            description="Dari membangun software dan mengintegrasikan AI, hingga menjaga infrastruktur berjalan 24/7 — semua ditangani tim yang tepat."
          />
          <FadeIn className="mt-8 flex flex-wrap justify-center gap-3" delay={0.15}>
            {divisions.map((d) => (
              <Link
                key={d.id}
                href={`#${d.id}`}
                className="rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/40 hover:text-primary"
              >
                {d.name}
              </Link>
            ))}
          </FadeIn>
        </div>
      </section>

      {divisions.map((division, divisionIndex) => {
        const divisionServices = servicesPerDivision[divisionIndex];
        return (
          <section
            key={division.id}
            id={division.id}
            className="scroll-mt-20 border-b border-border"
          >
            <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
              <FadeIn className="max-w-3xl">
                <span className="eyebrow">{division.teamLabel}</span>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.12] sm:text-5xl">
                  {division.name}
                </h2>
                <p className="mt-3 text-sm font-medium text-primary">
                  {division.tagline}
                </p>
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  {division.description}
                </p>
              </FadeIn>

              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {divisionServices.map((service) => (
                  <StaggerItem key={service.slug}>
                    <Card className="card-glow h-full border-border transition-colors hover:border-foreground/40">
                      <CardContent className="flex h-full flex-col gap-5 p-7">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-display text-2xl">
                            {service.title}
                          </h3>
                          <span className="shrink-0 rounded-full border border-primary/40 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                            Mulai {formatRupiah(service.startingPrice * 1_000_000)}
                          </span>
                        </div>
                        <p className="text-base leading-relaxed text-muted-foreground">
                          {service.description}
                        </p>
                        <div className="mt-auto border-t border-border pt-5">
                          <p className="eyebrow mb-3">Deliverables</p>
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {service.deliverables.map((d) => (
                              <li
                                key={d}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/80" />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CtaBanner />
    </>
  );
}
