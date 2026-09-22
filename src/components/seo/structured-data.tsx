import { getSite } from "@/lib/data/site";
import { getServices } from "@/lib/data/divisions";
import { getCaseStudies } from "@/lib/data/portfolio";
import { readSiteData } from "@/lib/data/store";
import type { CaseStudy, Article, Testimonial } from "@/lib/data/schema";

/**
 * JSON-LD Structured Data Components for SEO
 * These are server-rendered <script type="application/ld+json"> tags
 * that help Google understand the business, services, and content.
 */

function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organization + LocalBusiness schema for the company (used site-wide in layout) */
export async function OrganizationLd() {
  const site = await getSite();

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.fullName,
    alternateName: site.fullName,
    url: site.url,
    logo: `${site.url}/keetech.png`,
    image: `${site.url}/keetech.png`,
    description: site.description,
    slogan: site.tagline,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.streetAddress || "Jl. Pudaksari V, Bumirejo",
      addressLocality: site.contact.addressLocality || "Semarang",
      addressRegion: site.contact.addressRegion || "Jawa Tengah",
      postalCode: site.contact.postalCode || "50268",
      addressCountry: site.contact.addressCountry || "ID",
    },
    geo: site.contact.geo
      ? {
          "@type": "GeoCoordinates",
          latitude: site.contact.geo.latitude,
          longitude: site.contact.geo.longitude,
        }
      : undefined,
    areaServed: [
      { "@type": "City", name: "Semarang" },
      { "@type": "State", name: "Jawa Tengah" },
      { "@type": "Country", name: "Indonesia" },
    ],
    openingHoursSpecification: site.contact.openingHoursSpec
      ? [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        ]
      : undefined,
    sameAs: site.socials.map((s) => s.href),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.contact.phone,
      email: site.contact.email,
      contactType: "customer service",
      availableLanguage: ["Indonesian", "English"],
      areaServed: "Indonesia",
    },
    priceRange: "Rp 10.000.000 - Rp 100.000.000+",
  };

  // Clean undefined values
  const cleaned = JSON.parse(JSON.stringify(schema));
  return <JsonLd data={cleaned} />;
}

/** WebSite schema with search action (used site-wide in layout) */
export async function WebSiteLd() {
  const site = await getSite();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        publisher: { "@id": `${site.url}/#organization` },
        inLanguage: "id-ID",
        potentialAction: {
          "@type": "SearchAction",
          target: `${site.url}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

/** BreadcrumbList for navigation context */
export function BreadcrumbLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

/** Service schema for individual services */
export async function ServiceListLd() {
  const [site, services] = await Promise.all([getSite(), getServices()]);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: services.map((service, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            url: `${site.url}/services#${service.division}`,
            provider: { "@id": `${site.url}/#organization` },
            areaServed: { "@type": "Country", name: "Indonesia" },
            offers: {
              "@type": "Offer",
              price: service.startingPrice * 1_000_000,
              priceCurrency: "IDR",
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: service.startingPrice * 1_000_000,
                priceCurrency: "IDR",
              },
            },
          },
        })),
      }}
    />
  );
}

/** Article schema for case study pages */
export async function CaseStudyLd({ study }: { study: CaseStudy }) {
  const site = await getSite();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: study.title,
        description: study.summary,
        url: `${site.url}/portfolio/${study.slug}`,
        datePublished: `${study.year}-01-01`,
        dateModified: `${study.year}-01-01`,
        author: { "@id": `${site.url}/#organization` },
        publisher: { "@id": `${site.url}/#organization` },
        about: {
          "@type": "Thing",
          name: study.category,
        },
        mentions: study.techStack.map((tech) => ({
          "@type": "SoftwareApplication",
          name: tech,
        })),
      }}
    />
  );
}

/** FAQPage schema for rich snippets */
export function FaqLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      }}
    />
  );
}

/** Blog Article schema */
export async function BlogArticleLd({ article }: { article: Article }) {
  const site = await getSite();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.title,
        description: article.excerpt,
        url: `${site.url}/blog/${article.slug}`,
        datePublished: `${article.date}T00:00:00+07:00`,
        dateModified: `${article.date}T00:00:00+07:00`,
        author: { "@id": `${site.url}/#organization` },
        publisher: { "@id": `${site.url}/#organization` },
        keywords: article.tags.join(", "),
        articleSection: article.category,
        inLanguage: "id-ID",
      }}
    />
  );
}

/** Review schema for testimonials (rich snippets with star ratings) */
export async function ReviewLd() {
  const data = await readSiteData();
  const testimonials = data.testimonials ?? [];
  if (testimonials.length === 0) return null;
  const site = await getSite();

  return (
    <JsonLd
      data={testimonials.map((t: Testimonial) => ({
        "@context": "https://schema.org",
        "@type": "Review",
        itemReviewed: {
          "@type": "Organization",
          "@id": `${site.url}/#organization`,
        },
        author: {
          "@type": "Person",
          name: t.author,
          description: `${t.role} at ${t.company}`,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: t.rating,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody: t.text,
        publisher: { "@id": `${site.url}/#organization` },
      }))}
    />
  );
}
