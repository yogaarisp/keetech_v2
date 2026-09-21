import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { DivisionShowcase } from "@/components/home/division-showcase";
import { ServiceEstimator } from "@/components/home/estimator";
import { FeaturedCaseStudies } from "@/components/home/featured-case-studies";
import { TrustSection } from "@/components/home/trust";
import { CtaBanner } from "@/components/home/cta-banner";
import { getDivisions, getServices } from "@/lib/data/divisions";
import { getComplexityOptions } from "@/lib/data/store";

export const metadata: Metadata = {
  title: "KeeTech — Modern IT & AI Solutions Agency",
  description:
    "Agensi solusi IT & AI modern: Software & AI Innovation untuk membangun sistem cerdas, Support & Infrastructure untuk operasional yang andal.",
};

export default async function HomePage() {
  const [services, divisions, complexityOptions] = await Promise.all([
    getServices(),
    getDivisions(),
    getComplexityOptions(),
  ]);

  return (
    <>
      <Hero />
      <DivisionShowcase />
      <ServiceEstimator
        services={services}
        divisions={divisions}
        complexityOptions={complexityOptions}
      />
      <FeaturedCaseStudies />
      <TrustSection />
      <CtaBanner />
    </>
  );
}
