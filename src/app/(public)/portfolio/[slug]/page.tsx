import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Clock3,
  Target,
  Lightbulb,
  TrendingUp,
  Layers,
} from "lucide-react";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/data/portfolio";
import { getDivision } from "@/lib/data/divisions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/fade-in";

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return { title: "Case Study Not Found" };
  return {
    title: `${study.title} — Case Study`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  const division = await getDivision(study.division);

  return (
    <article className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Portofolio
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{study.category}</Badge>
          <Badge>{division.name}</Badge>
        </div>

        <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
          {study.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            {study.clientType}
          </span>
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            {study.year}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-primary" />
            Durasi {study.duration}
          </span>
        </div>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {study.summary}
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-12">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {study.impact.map((metric) => (
            <div key={metric.label} className="bg-card p-7 text-center">
              <p className="font-display text-4xl leading-none text-primary">{metric.value}</p>
              <p className="mt-3 text-sm leading-snug text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-6">
          <FadeIn>
            <Card className="border-border">
              <CardContent className="p-7">
                <div className="flex items-center gap-3 border-b border-border pb-5">
                  <Target className="h-5 w-5 text-primary" />
                  <h2 className="text-base font-semibold">
                    Tantangan
                  </h2>
                </div>
                <p className="mt-5 leading-relaxed text-muted-foreground">{study.challenge}</p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.05}>
            <Card className="border-border">
              <CardContent className="p-7">
                <div className="flex items-center gap-3 border-b border-border pb-5">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <h2 className="text-base font-semibold">
                    Solusi Kami
                  </h2>
                </div>
                <p className="mt-5 leading-relaxed text-muted-foreground">{study.solution}</p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card className="border-border">
              <CardContent className="p-7">
                <div className="flex items-center gap-3 border-b border-border pb-5">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h2 className="text-base font-semibold">
                    Dampak Bisnis
                  </h2>
                </div>
                <ul className="mt-5 flex flex-col gap-4">
                  {study.impact.map((metric) => (
                    <li key={metric.label} className="flex items-center gap-4">
                      <span className="min-w-20 rounded-lg border border-primary/30 bg-primary/5 px-3 py-1.5 text-center font-display text-lg text-primary">
                        {metric.value}
                      </span>
                      <span className="text-sm text-muted-foreground">{metric.label}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        <div className="flex flex-col gap-6">
          <FadeIn delay={0.1}>
            <Card className="border-border">
              <CardContent className="p-7">
                <div className="flex items-center gap-3 border-b border-border pb-5">
                  <Layers className="h-5 w-5 text-primary" />
                  <h2 className="text-base font-semibold">
                    Tech Stack
                  </h2>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {study.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="eyebrow mt-7">Layanan Terkait</h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {study.services.map((s) => (
                    <li key={s} className="text-sm text-foreground">
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="card-glow rounded-2xl border border-foreground/15 bg-card p-7">
              <h3 className="font-display text-2xl">
                Punya tantangan serupa?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Kami siap menganalisis kebutuhan Anda dan merancang solusi dengan pendekatan yang
                sama.
              </p>
              <Link
                href="/contact"
                className={cn(buttonVariants({ className: "mt-6 w-full" }))}
              >
                Diskusikan Proyek Anda
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </article>
  );
}
