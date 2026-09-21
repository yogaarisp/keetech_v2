import {
  FileCheck2,
  GaugeCircle,
  Handshake,
  ShieldCheck,
  Timer,
  Users2,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { StaggerItem } from "@/components/motion/fade-in";
import { getSite } from "@/lib/data/site";

const guarantees = [
  {
    icon: Timer,
    title: "SLA Response Terukur",
    description:
      "Response time 1 jam untuk remote support dan maksimal 4 jam on-site untuk area layanan utama — tertulis dalam kontrak.",
  },
  {
    icon: ShieldCheck,
    title: "Garansi Bug-Fix",
    description:
      "Setiap proyek software dilindungi garansi bug-fix 3 bulan, dapat diperpanjang hingga 12 bulan melalui kontrak maintenance.",
  },
  {
    icon: GaugeCircle,
    title: "Uptime 99.9%",
    description:
      "Untuk layanan managed infrastructure, kami komit pada uptime 99.9% dengan monitoring otomatis 24/7 dan alerting proaktif.",
  },
];

const teamStructure = [
  { role: "Project Manager", duty: "Satu pintu komunikasi & laporan progres berkala" },
  { role: "Solution Architect", duty: "Merancang arsitektur & memastikan kelayakan teknis" },
  { role: "Developer Team", duty: "Eksekusi build dengan code review & QA berlapis" },
  { role: "On-Site Engineer", duty: "Implementasi & dukungan lapangan terjadwal" },
];

export async function TrustSection() {
  const site = await getSite();

  return (
    <section className="border-t border-border bg-card/50">
      <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="04 — Trust & Legitimacy"
          title={
            <>
              Komitmen yang <span className="text-gradient">bisa dipertanggungjawabkan</span>.
            </>
          }
          description="Kami membangun kepercayaan lewat kontrak yang jelas: SLA terukur, struktur tim yang transparan, dan garansi resmi."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {guarantees.map((g, index) => (
            <StaggerItem key={g.title}>
              <Card className="card-glow h-full border-border">
                <CardContent className="flex h-full flex-col gap-5 p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-muted">
                      <g.icon className="h-5 w-5 text-primary" />
                    </span>
                    <span className="font-mono text-sm tracking-[0.2em] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl">{g.title}</h3>
                  <p className="text-base leading-relaxed text-muted-foreground">{g.description}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <StaggerItem>
            <Card className="h-full border-border">
              <CardContent className="flex h-full flex-col gap-6 p-7">
                <div className="flex items-center gap-3 border-b border-border pb-5">
                  <Users2 className="h-5 w-5 text-primary" />
                  <h3 className="text-base font-semibold">
                    Struktur Tim per Proyek
                  </h3>
                </div>
                <ul className="flex flex-col gap-5">
                  {teamStructure.map((t, i) => (
                    <li key={t.role} className="flex items-start gap-4">
                      <span className="mt-0.5 font-mono text-[0.66rem] tracking-[0.16em] text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex items-start gap-2.5">
                        <Handshake className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/70" />
                        <div>
                          <p className="text-sm font-semibold">{t.role}</p>
                          <p className="text-sm text-muted-foreground">{t.duty}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </StaggerItem>

          <StaggerItem className="h-full">
            <Card className="h-full border-border">
              <CardContent className="flex h-full flex-col gap-6 p-7">
                <div className="flex items-center gap-3 border-b border-border pb-5">
                  <FileCheck2 className="h-5 w-5 text-primary" />
                  <h3 className="text-base font-semibold">
                    Rekam Jejak Singkat
                  </h3>
                </div>
                <div className="grid flex-1 grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
                  {site.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col justify-center bg-card p-5"
                    >
                      <p className="font-display text-3xl leading-none text-primary">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-xs leading-snug text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        </div>
      </div>
    </section>
  );
}
