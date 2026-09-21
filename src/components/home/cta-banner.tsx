import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";

export function CtaBanner() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-16 text-background sm:px-14">
          <div className="paper-dots absolute inset-0 opacity-[0.06]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div className="flex flex-col gap-5">
              <span className="inline-flex items-center gap-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] text-background/60">
                <span className="h-px w-7 bg-primary" />
                05 — Mulai Proyek
              </span>
              <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.1] sm:text-5xl">
                Siap bertransformasi <span className="italic text-primary">dengan KeeTech?</span>
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-background/70 sm:text-base">
                Ceritakan kebutuhan Anda — tim kami akan menyiapkan rekomendasi solusi dan
                estimasi dalam 1×24 jam kerja.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
                Jadwalkan Meeting
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-background/25 px-8 text-base font-medium text-background transition-colors hover:bg-background hover:text-foreground"
              >
                Pelajari Layanan
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
