import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { SectionHeading } from "@/components/section-heading";
import { getCaseStudies, getPortfolioCategories } from "@/lib/data/portfolio";
import { getDivisions } from "@/lib/data/divisions";

export const metadata: Metadata = {
  title: "Portfolio — Case Studies & Business Impact",
  description:
    "Direktori studi kasus KeeTech dengan filter interaktif: AI & Automation, Enterprise Platform, Infrastructure, dan Security.",
};

export default async function PortfolioPage() {
  const [caseStudies, categories, divisions] = await Promise.all([
    getCaseStudies(),
    getPortfolioCategories(),
    getDivisions(),
  ]);

  return (
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
  );
}
