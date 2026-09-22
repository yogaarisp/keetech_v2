import type { Metadata } from "next";
import {
  CalendarClock,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Video,
} from "lucide-react";
import { getSite } from "@/lib/data/site";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { ContactForm } from "@/components/contact/contact-form";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Hubungi KeeTech — Jasa Service PC, CCTV & Website di Semarang",
  description:
    "Hubungi KeeTech Semarang untuk jasa service PC, instalasi CCTV, pembuatan website, setup jaringan & server. Konsultasi gratis, teknisi panggilan, dan dukungan 24/7.",
  alternates: {
    canonical: "/contact",
  },
};

function schedulingOptions(officeHours: string) {
  return [
    {
      icon: Video,
      title: "Online Meeting",
      description: "Sesi discovery 30–60 menit via Google Meet / Zoom, gratis tanpa komitmen.",
    },
    {
      icon: MapPin,
      title: "On-Site Visit",
      description: "Kunjungan survei lokasi untuk kebutuhan infrastruktur, CCTV, dan jaringan.",
    },
    {
      icon: CalendarClock,
      title: "Jam Operasional",
      description: officeHours,
    },
  ];
}

export default async function ContactPage({
  searchParams,
}: PageProps<"/contact">) {
  const { estimator } = await searchParams;
  const site = await getSite();
  const telHref = `tel:${site.contact.phone.replace(/[^\d+]/g, "")}`;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Get In Touch"
        title={
          <>
            Mari diskusikan <span className="text-gradient">kebutuhan Anda</span>.
          </>
        }
        description="Kirim inquiry melalui formulir, atau langsung jadwalkan meeting — respons kami dalam 1×24 jam kerja."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_400px]">
        <FadeIn>
          <Card className="border-border">
            <CardContent className="p-7 sm:p-9">
              <div className="mb-7 flex items-center gap-3 border-b border-border pb-5">
                <MessageSquareText className="h-5 w-5 text-primary" />
                <h2 className="text-base font-semibold">
                  Formulir Inquiry
                </h2>
              </div>
              <ContactForm initialMessage={typeof estimator === "string" ? estimator : ""} />
            </CardContent>
          </Card>
        </FadeIn>

        <div className="flex flex-col gap-6">
          <FadeIn delay={0.1}>
            <Card className="border-border">
              <CardContent className="flex flex-col gap-4 p-7">
                <h2 className="eyebrow border-b border-border pb-5">Kontak Resmi</h2>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {site.contact.email}
                </a>
                <span className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <a href={telHref} className="hover:text-primary">{site.contact.phone}</a>
                </span>
                <span className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {site.contact.address}
                </span>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.15}>
            <Card className="border-border">
              <CardContent className="flex flex-col gap-5 p-7">
                <h2 className="eyebrow border-b border-border pb-5">Jadwalkan Meeting</h2>
                {schedulingOptions(site.contact.officeHours).map((option) => (
                  <div key={option.title} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
                      <option.icon className="h-4 w-4 text-primary" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{option.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </div>
                ))}
                <a
                  href={site.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ className: "mt-2 w-full" }))}
                >
                  Chat via WhatsApp
                </a>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
