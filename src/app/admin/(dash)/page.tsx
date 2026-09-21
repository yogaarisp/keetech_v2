import Link from "next/link";
import { ArrowRight, Database, FolderKanban, KeyRound, Layers, Wrench } from "lucide-react";
import { readSiteData } from "@/lib/data/store";
import { isUsingDefaultPassword } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { AdminHeading } from "@/components/admin/fields";

export default async function AdminDashboardPage() {
  const data = await readSiteData();

  const cards = [
    {
      href: "/admin/services",
      label: "Layanan",
      count: data.services.length,
      icon: Wrench,
      description: "Kelola daftar layanan, deliverables, dan harga mulai.",
    },
    {
      href: "/admin/portfolio",
      label: "Studi Kasus",
      count: data.caseStudies.length,
      icon: FolderKanban,
      description: "Kelola portofolio: tantangan, solusi, dan dampak bisnis.",
    },
    {
      href: "/admin/divisions",
      label: "Divisi",
      count: data.divisions.length,
      icon: Layers,
      description: "Ubah deskripsi dan highlight tiap divisi.",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <AdminHeading
        title="Dashboard"
        description="Kelola seluruh konten website KeeTech dari satu tempat."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href} className="group">
              <Card className="h-full transition-colors group-hover:border-primary/40">
                <CardContent className="flex h-full flex-col gap-3 p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted">
                      <Icon className="h-5 w-5 text-primary" />
                    </span>
                    <span className="font-display text-3xl leading-none text-primary">
                      {card.count}
                    </span>
                  </div>
                  <div>
                    <p className="flex items-center gap-1.5 font-semibold">
                      {card.label}
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="flex flex-col gap-3 p-6">
            <div className="flex items-center gap-2.5">
              <Database className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Penyimpanan Data</h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Seluruh perubahan tersimpan ke file{" "}
              <code className="font-mono text-xs text-primary">data/content.json</code> di folder
              proyek. Perubahan langsung tampil di website publik.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-3 p-6">
            <div className="flex items-center gap-2.5">
              <KeyRound className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Keamanan</h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {isUsingDefaultPassword()
                ? "Anda masih memakai password default admin123. Ganti dengan menambahkan ADMIN_PASSWORD=... di file .env.local lalu restart server."
                : "Password admin sudah diatur lewat variabel ADMIN_PASSWORD di .env.local. Sesi login berlaku 7 hari."}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
