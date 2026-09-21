"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, CalendarDays, ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/data/portfolio";
import type { Division, DivisionId } from "@/lib/data/divisions";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type DivisionFilter = DivisionId | "all";

export function PortfolioGrid({
  caseStudies,
  categories,
  divisions,
}: {
  caseStudies: CaseStudy[];
  categories: string[];
  divisions: Division[];
}) {
  const [category, setCategory] = useState("Semua");
  const [division, setDivision] = useState<DivisionFilter>("all");

  const filtered = caseStudies.filter(
    (study) =>
      (category === "Semua" || study.category === category) &&
      (division === "all" || study.division === division)
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-2">
          {divisions.map((d) => (
            <FilterChip
              key={d.id}
              active={division === d.id}
              onClick={() => setDivision((prev) => (prev === d.id ? "all" : d.id))}
            >
              {d.shortName}
            </FilterChip>
          ))}
          {division !== "all" ? (
            <FilterChip active={false} onClick={() => setDivision("all")}>
              Reset divisi
            </FilterChip>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2 border-t border-border pt-5">
          {categories.map((c) => (
            <FilterChip key={c} active={category === c} onClick={() => setCategory(c)}>
              {c}
            </FilterChip>
          ))}
        </div>
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((study) => (
            <motion.div
              key={study.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <CaseCard study={study} divisions={divisions} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          Tidak ada studi kasus yang cocok dengan filter ini.
        </p>
      ) : null}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors cursor-pointer",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-card text-muted-foreground hover:border-foreground/40 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

function CaseCard({
  study,
  divisions,
}: {
  study: CaseStudy;
  divisions: Division[];
}) {
  const divisionName = divisions.find((d) => d.id === study.division)?.shortName;
  return (
    <Link href={`/portfolio/${study.slug}`} className="group block h-full">
      <Card className="card-glow h-full transition-colors hover:border-foreground/40">
        <CardContent className="flex h-full flex-col gap-5 p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{study.category}</Badge>
              <Badge variant="outline">{divisionName}</Badge>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </div>

          <h3 className="font-display text-2xl transition-colors group-hover:text-primary">
            {study.title}
          </h3>
          <p className="text-base leading-relaxed text-muted-foreground">{study.summary}</p>

          <div className="mt-auto grid grid-cols-3 gap-3 border-t border-border pt-5">
            {study.impact.slice(0, 3).map((metric) => (
              <div key={metric.label}>
                <p className="font-display text-2xl leading-none text-primary">{metric.value}</p>
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
  );
}
