import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { DivisionShowcase } from "@/components/home/division-showcase";
import { ServiceEstimator } from "@/components/home/estimator";
import { FeaturedCaseStudies } from "@/components/home/featured-case-studies";
import { TrustSection } from "@/components/home/trust";
import { CtaBanner } from "@/components/home/cta-banner";
import { getDivisions, getServices } from "@/lib/data/divisions";
import { getComplexityOptions } from "@/lib/data/store";
import { getSite } from "@/lib/data/site";
import { getFeaturedArticles } from "@/lib/data/articles";
import { FaqLd, ServiceListLd, ReviewLd } from "@/components/seo/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "KeeTech — Jasa IT, Service PC, CCTV & Pembuatan Website di Semarang",
  description:
    "KeeTech Semarang: jasa IT, service PC, rakit komputer, pembuatan website & aplikasi, instalasi CCTV, jaringan kantor, server, dan managed services. Melayani Semarang, Banyumanik, Ngaliyan, dan sekitarnya.",
  alternates: {
    canonical: "/",
  },
};

const faqs = [
  {
    q: "Apa saja layanan KeeTech di Semarang?",
    a: "KeeTech menyediakan custom software development, AI & machine learning integration, workflow automation (RPA), data analytics, IT managed services, network & server infrastructure, CCTV & security systems, serta on-site technical support untuk klien di Semarang dan sekitarnya.",
  },
  {
    q: "Berapa biaya jasa IT di KeeTech Semarang?",
    a: "Biaya dimulai dari Rp 10 juta untuk on-site support hingga Rp 45 juta+ untuk custom software development, tergantung kompleksitas. Kami menyediakan kalkulator estimasi interaktif untuk membantu Anda memproyeksikan investasi.",
  },
  {
    q: "Apakah KeeTech melayani klien di luar Semarang?",
    a: "Ya, KeeTech berbasis di Semarang dan melayani klien di seluruh Jawa Tengah serta Indonesia. Tim on-site kami siap datang ke lokasi Anda untuk survei, instalasi, dan dukungan teknis.",
  },
  {
    q: "Berapa lama pengerjaan proyek IT di KeeTech?",
    a: "Durasi proyek bervariasi tergantung kompleksitas: 1-2 bulan untuk proyek standard, 2-4 bulan untuk advanced, dan 4-6 bulan+ untuk enterprise. Tim kami akan memberikan estimasi timeline yang detail setelah konsultasi awal.",
  },
  {
    q: "Apakah KeeTech menyediakan dukungan pasca-proyek?",
    a: "Ya, KeeTech menyediakan garansi bug-fix selama 3 bulan (dapat diperpanjang hingga 12 bulan), monitoring 24/7 untuk managed services, dan dukungan on-site dengan SLA response time 1 jam remote / 4 jam on-site.",
  },
];

export default async function HomePage() {
  const [services, divisions, complexityOptions, site, articles] = await Promise.all([
    getServices(),
    getDivisions(),
    getComplexityOptions(),
    getSite(),
    getFeaturedArticles(3),
  ]);

  return (
    <>
      <FaqLd faqs={faqs} />
      <ServiceListLd />
      <ReviewLd />
      <Hero />
      <DivisionShowcase />
      <ServiceEstimator
        services={services}
        divisions={divisions}
        complexityOptions={complexityOptions}
      />
      <FeaturedCaseStudies />
      <TrustSection />
      {articles.length > 0 && (
        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Blog & Insight"
              title={
                <>
                  Wawasan terbaru <span className="text-gradient">IT & AI</span>
                </>
              }
              description="Tips dan panduan teknologi untuk bisnis di Semarang dan sekitarnya."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {articles.map((article) => (
                <FadeIn key={article.slug}>
                  <Link href={`/blog/${article.slug}`}>
                    <Card className="card-glow h-full border-border transition-colors hover:border-foreground/40">
                      <CardContent className="flex h-full flex-col gap-4 p-6">
                        <span className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary w-fit">
                          {article.category}
                        </span>
                        <h3 className="font-display text-lg leading-snug">{article.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                          {article.excerpt}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground border-t border-border pt-3">
                          <CalendarDays className="h-3.5 w-3.5 text-primary" />
                          {new Date(article.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </FadeIn>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-foreground"
              >
                Lihat semua artikel
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
      <CtaBanner />
    </>
  );
}
