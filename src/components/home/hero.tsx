"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Wrench } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeroScene } from "@/components/home/hero-scene";

const ease: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const proofPoints = [
  { icon: ShieldCheck, label: "SLA Terukur & Terjamin" },
  { icon: Wrench, label: "Tim On-Site Berpengalaman" },
  { icon: Sparkles, label: "Garansi Bug-Fix" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="paper-dots absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_20%_10%,black,transparent)]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="flex flex-col items-start">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="eyebrow"
          >
            Modern IT &amp; AI Solutions Agency
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-7 font-display text-5xl font-semibold leading-[1.06] sm:text-6xl lg:text-[4.5rem]"
          >
            Solusi Software &amp; AI untuk bisnis yang{" "}
            <span className="text-gradient">bertransformasi</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Dua divisi spesialis dalam satu payung:{" "}
            <span className="text-foreground">Software &amp; AI Innovation</span> untuk membangun
            sistem cerdas, dan{" "}
            <span className="text-foreground">Support &amp; Infrastructure</span> untuk operasional
            yang tak pernah berhenti.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
              Mulai Konsultasi
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/portfolio"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
            >
              Lihat Portofolio
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 grid w-full gap-px border-t border-border pt-6 sm:grid-cols-3"
          >
            {proofPoints.map((point) => (
              <li key={point.label} className="flex items-start gap-2.5">
                <point.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {point.label}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative">
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
