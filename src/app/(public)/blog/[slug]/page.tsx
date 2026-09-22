import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { getArticles, getArticleBySlug } from "@/lib/data/articles";
import { getSite } from "@/lib/data/site";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/fade-in";
import { BreadcrumbLd, BlogArticleLd } from "@/components/seo/structured-data";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Artikel Tidak Ditemukan" };
  const site = await getSite();
  return {
    title: `${article.title}`,
    description: article.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `${site.url}/blog/${slug}`,
      publishedTime: `${article.date}T00:00:00+07:00`,
      authors: [site.fullName],
      tags: article.tags,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const [site, allArticles] = await Promise.all([getSite(), getArticles()]);
  const related = allArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 2);

  const paragraphs = article.content.split("\n\n");

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <BreadcrumbLd
        items={[
          { name: "Home", url: site.url },
          { name: "Blog", url: `${site.url}/blog` },
          { name: article.title, url: `${site.url}/blog/${article.slug}` },
        ]}
      />
      <BlogArticleLd article={article} />

      <FadeIn>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke blog
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{article.category}</Badge>
        </div>

        <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.15] sm:text-5xl">
          {article.title}
        </h1>

        <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            {new Date(article.date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-primary" />
            {article.readTime}
          </span>
        </div>

        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-10">
        <div className="prose-content flex flex-col gap-5">
          {paragraphs.map((para, i) => {
            if (para.startsWith("## ")) {
              return (
                <h2 key={i} className="mt-4 font-display text-2xl font-semibold">
                  {para.replace(/^##\s+/, "")}
                </h2>
              );
            }
            return (
              <p key={i} className="leading-relaxed text-muted-foreground">
                {para}
              </p>
            );
          })}
        </div>
      </FadeIn>

      <FadeIn delay={0.15} className="mt-12">
        <Card className="card-glow border-foreground/15">
          <CardContent className="p-7">
            <h3 className="font-display text-2xl">Butuh konsultasi IT di Semarang?</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              KeeTech berbasis di Semarang dan siap membantu kebutuhan IT, software, AI,
              CCTV, dan infrastruktur bisnis Anda.
            </p>
            <Link
              href="/contact"
              className={cn(buttonVariants({ className: "mt-6" }))}
            >
              Konsultasi gratis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </FadeIn>

      {related.length > 0 && (
        <FadeIn delay={0.2} className="mt-14">
          <h2 className="eyebrow mb-5">Artikel terkait</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((ra) => (
              <Link key={ra.slug} href={`/blog/${ra.slug}`}>
                <Card className="h-full border-border transition-colors hover:border-foreground/40">
                  <CardContent className="p-5">
                    <p className="text-sm font-semibold leading-snug">{ra.title}</p>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                      {ra.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </FadeIn>
      )}
    </article>
  );
}
