import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { deleteServiceAction } from "@/app/admin/actions";
import { getDivisions, getServices } from "@/lib/data/divisions";
import { formatRupiah } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AdminHeading,
  ErrorBanner,
  FlashBanner,
} from "@/components/admin/fields";
import { cn } from "@/lib/utils";

export default async function AdminServicesPage({
  searchParams,
}: PageProps<"/admin/services">) {
  const { saved, deleted, error } = await searchParams;
  const [services, divisions] = await Promise.all([getServices(), getDivisions()]);
  const divisionName = (id: string) =>
    divisions.find((d) => d.id === id)?.shortName ?? id;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <AdminHeading
          title="Layanan"
          description="Daftar layanan yang tampil di halaman Services dan estimator."
        />
        <Link href="/admin/services/new" className={cn(buttonVariants(), "shrink-0")}>
          <Plus className="h-4 w-4" />
          Tambah Layanan
        </Link>
      </div>

      {saved ? <FlashBanner message="Layanan berhasil disimpan." /> : null}
      {deleted ? <FlashBanner message="Layanan berhasil dihapus." /> : null}
      {error ? <ErrorBanner message="Terjadi kesalahan. Coba lagi." /> : null}

      <Card>
        <CardContent className="p-0">
          <div className="flex flex-col divide-y divide-border">
            {services.map((service) => (
              <div
                key={service.slug}
                className="flex flex-wrap items-center justify-between gap-4 p-5"
              >
                <div className="min-w-0">
                  <p className="font-medium">{service.title}</p>
                  <p className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
                    <span>{divisionName(service.division)}</span>
                    <span>Mulai {formatRupiah(service.startingPrice * 1_000_000)}</span>
                    <code className="font-mono">/{service.slug}</code>
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={`/admin/services/${service.slug}`}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Link>
                  <form action={deleteServiceAction}>
                    <input type="hidden" name="slug" value={service.slug} />
                    <Button
                      type="submit"
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Hapus
                    </Button>
                  </form>
                </div>
              </div>
            ))}
            {services.length === 0 ? (
              <p className="p-10 text-center text-sm text-muted-foreground">
                Belum ada layanan. Klik “Tambah Layanan” untuk membuat.
              </p>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
