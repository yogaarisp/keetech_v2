import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import { getServices, getServiceBySlug } from "@/lib/data/divisions";
import { getDivision } from "@/lib/data/divisions";
import { getSite } from "@/lib/data/site";
import { formatRupiah } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/fade-in";
import { BreadcrumbLd } from "@/components/seo/structured-data";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

const seoMeta: Record<string, { title: string; description: string }> = {
  "custom-software": {
    title: "Jasa Pembuatan Website & Aplikasi di Semarang — Custom Software",
    description:
      "Jasa pembuatan website, aplikasi web, dan software custom di Semarang. ERP, sistem internal, platform pelanggan dengan arsitektur cloud-native. Tim developer KeeTech Semarang siap membangun.",
  },
  "ai-integration": {
    title: "Jasa Integrasi AI & Chatbot di Semarang — Machine Learning",
    description:
      "Jasa integrasi AI dan chatbot di Semarang: chatbot LLM WhatsApp, document intelligence OCR, computer vision, model prediktif. KeeTech mengintegrasikan AI ke sistem bisnis Anda.",
  },
  "workflow-automation": {
    title: "Jasa Otomatisasi Workflow (RPA) di Semarang",
    description:
      "Jasa otomatisasi proses bisnis (RPA) di Semarang. Pangkas waktu proses manual dengan bot otomasi terintegrasi. Audit, implementasi, dan pelatihan tim oleh KeeTech Semarang.",
  },
  "data-analytics": {
    title: "Jasa Data Analytics & Dashboard di Semarang",
    description:
      "Jasa data analytics di Semarang: dashboard real-time, data pipeline ETL, laporan otomatis. KeeTech membantu manajemen mengambil keputusan berbasis data.",
  },
  "managed-it": {
    title: "Jasa IT Managed Services & Support di Semarang — Monitoring 24/7",
    description:
      "Jasa IT managed services, maintenance komputer, dan support IT di Semarang. Monitoring server & jaringan 24/7, backup, disaster recovery, helpdesk. SLA terukur.",
  },
  "network-server": {
    title: "Jasa Instalasi Jaringan & Server di Semarang — Network Setup",
    description:
      "Jasa instalasi jaringan kantor, server, dan infrastruktur IT di Semarang. Desain topologi, virtualisasi, firewall, VPN. Tim on-site KeeTech merancang jaringan yang andal.",
  },
  "cctv-security": {
    title: "Jasa Instalasi CCTV di Semarang — Pasang CCTV IP & Security",
    description:
      "Jasa pasang CCTV di Semarang: CCTV IP, NVR, access control, monitoring terpusat. KeeTech memasang sistem pengawasan untuk kantor, gudang, rumah, dan area produksi di Semarang.",
  },
  "onsite-support": {
    title: "Jasa Service PC & Komputer On-Site di Semarang — Teknisi Panggilan",
    description:
      "Jasa service PC, komputer, dan laptop on-site di Semarang. Teknisi panggilan untuk perawatan, perbaikan, instalasi software, dan upgrade hardware. SLA terukur.",
  },
};

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const meta = seoMeta[slug];
  if (!meta) return { title: "Layanan Tidak Ditemukan" };
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [division, site, allServices] = await Promise.all([
    getDivision(service.division),
    getSite(),
    getServices(),
  ]);

  const meta = seoMeta[slug];
  const relatedServices = allServices
    .filter((s) => s.division === service.division && s.slug !== service.slug)
    .slice(0, 3);

  return (
    <article className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <BreadcrumbLd
        items={[
          { name: "Home", url: site.url },
          { name: "Services", url: `${site.url}/services` },
          { name: service.title, url: `${site.url}/services/${service.slug}` },
        ]}
      />

      <FadeIn>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Semua layanan
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-primary/40 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            {division.name}
          </span>
          <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
            Mulai {formatRupiah(service.startingPrice * 1_000_000)}
          </span>
        </div>

        <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] sm:text-5xl">
          {service.title}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {service.description}
        </p>

        <p className="mt-4 text-sm text-muted-foreground">
          KeeTech menyediakan layanan {service.title.toLowerCase()} untuk klien di Semarang,
          Jawa Tengah, dan seluruh Indonesia. Tim {division.teamLabel.toLowerCase()} kami siap
          membantu kebutuhan {division.shortName.toLowerCase()} bisnis Anda.
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-12">
        <Card className="border-border">
          <CardContent className="p-7">
            <h2 className="flex items-center gap-3 border-b border-border pb-5 text-base font-semibold">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Deliverables
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary/80" />
                  {d}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn delay={0.15} className="mt-8">
        <Card className="card-glow border-border">
          <CardContent className="flex flex-col gap-4 p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-2xl">
                Mulai {formatRupiah(service.startingPrice * 1_000_000)}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Estimasi investasi awal. Konsultasi gratis untuk penawaran detail.
              </p>
            </div>
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Konsultasi sekarang
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </FadeIn>

      {relatedServices.length > 0 && (
        <FadeIn delay={0.2} className="mt-14">
          <SectionHeading
            eyebrow="Layanan terkait"
            title={<>Layanan lain di divisi {division.shortName}</>}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {relatedServices.map((rs) => (
              <Link key={rs.slug} href={`/services/${rs.slug}`}>
                <Card className="card-glow h-full border-border transition-colors hover:border-foreground/40">
                  <CardContent className="p-5">
                    <p className="text-sm font-semibold">{rs.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {rs.description}
                    </p>
                    <p className="mt-3 text-xs font-medium text-primary">
                      Mulai {formatRupiah(rs.startingPrice * 1_000_000)}
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
