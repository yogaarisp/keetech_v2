import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { SectionHeading } from "@/components/section-heading";
import { getCaseStudies, getPortfolioCategories } from "@/lib/data/portfolio";
import { getDivisions } from "@/lib/data/divisions";
import { getSite } from "@/lib/data/site";
import { BreadcrumbLd } from "@/components/seo/structured-data";

export const metadata: Metadata = {
  title: "Portfolio KeeTech — Proyek Website, CCTV & Jaringan di Semarang",
  description:
    "Portofolio KeeTech Semarang: proyek pembuatan website, aplikasi, instalasi CCTV, setup jaringan & server untuk korporasi, pemerintah, dan bisnis di Semarang dan sekitarnya.",
  alternates: {
    canonical: "/portfolio",
  },
};

export default async function PortfolioPage() {
  const [caseStudies, categories, divisions, site] = await Promise.all([
    getCaseStudies(),
    getPortfolioCategories(),
    getDivisions(),
    getSite(),
  ]);

  return (
    <>
      <BreadcrumbLd
        items={[
          { name: "Home", url: site.url },
          { name: "Portfolio", url: `${site.url}/portfolio` },
        ]}
      />
      <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Case Studies"
          title={
            <>
              Portofolio Berbasis <span className="text-gradient">Dampak Bisnis</span>
            </>
          }
          description="Setiap studi kasus diringkas dalam format challenge → solution → impact. Gunakan filter untuk menemukan proyek yang relevan dengan kebutuhan Anda."
        />
        <div className="mt-14">
          <PortfolioGrid
            caseStudies={caseStudies}
            categories={categories}
            divisions={divisions}
          />
        </div>
      </section>
    </>
  );
}
