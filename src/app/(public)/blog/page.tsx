import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { getArticles } from "@/lib/data/articles";
import { getSite } from "@/lib/data/site";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, StaggerItem } from "@/components/motion/fade-in";
import { BreadcrumbLd } from "@/components/seo/structured-data";

export const metadata: Metadata = {
  title: "Blog IT Semarang — Tips Service PC, CCTV, Website & Jaringan",
  description:
    "Blog KeeTech Semarang: tips service PC dan komputer, panduan instalasi CCTV, cara bikin website, setup jaringan kantor, integrasi AI, dan insight teknologi untuk bisnis di Semarang.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const [articles, site] = await Promise.all([getArticles(), getSite()]);

  return (
    <>
      <BreadcrumbLd
        items={[
          { name: "Home", url: site.url },
          { name: "Blog", url: `${site.url}/blog` },
        ]}
      />
      <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Blog & Insight"
          title={
            <>
              Wawasan <span className="text-gradient">IT & AI</span> untuk Semarang
            </>
          }
          description="Tips, panduan praktis, dan studi kasus teknologi yang relevan untuk bisnis di Semarang dan sekitarnya."
        />

        {articles.length === 0 ? (
          <p className="mt-14 text-center text-muted-foreground">
            Artikel segera hadir.
          </p>
        ) : (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <StaggerItem key={article.slug}>
                <Link href={`/blog/${article.slug}`}>
                  <Card className="card-glow h-full border-border transition-colors hover:border-foreground/40">
                    <CardContent className="flex h-full flex-col gap-4 p-7">
                      <span className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary w-fit">
                        {article.category}
                      </span>
                      <h3 className="font-display text-xl leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-4">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5 text-primary" />
                          {new Date(article.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 className="h-3.5 w-3.5 text-primary" />
                          {article.readTime}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        Baca selengkapnya
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
