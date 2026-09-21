import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { saveServiceAction } from "@/app/admin/actions";
import { getDivision, getDivisions, getServices } from "@/lib/data/divisions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  AdminHeading,
  ErrorBanner,
  TextAreaField,
  TextField,
} from "@/components/admin/fields";

export default async function AdminServiceEditPage({
  params,
  searchParams,
}: PageProps<"/admin/services/[slug]">) {
  const { slug } = await params;
  const { error } = await searchParams;
  const isCreate = slug === "new";

  const [divisions, services] = await Promise.all([getDivisions(), getServices()]);
  const service = isCreate ? undefined : services.find((s) => s.slug === slug);
  if (!isCreate && !service) notFound();

  const currentDivision = service
    ? await getDivision(service.division)
    : divisions[0];

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/services"
        className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Daftar Layanan
      </Link>

      <AdminHeading
        title={isCreate ? "Tambah Layanan" : "Edit Layanan"}
        description={
          isCreate
            ? "Isi detail layanan baru untuk ditambahkan ke website."
            : `Mengubah layanan: ${service?.title}`
        }
      />

      {error === "slug" ? (
        <ErrorBanner message="Slug tidak valid. Gunakan huruf kecil, angka, dan tanda hubung (contoh: custom-software)." />
      ) : null}
      {error === "duplicate" ? (
        <ErrorBanner message="Slug sudah dipakai layanan lain. Gunakan slug berbeda." />
      ) : null}

      <form action={saveServiceAction} className="flex flex-col gap-6">
        <input type="hidden" name="originalSlug" value={service?.slug ?? ""} />

        <Card>
          <CardContent className="flex flex-col gap-5 p-6 sm:p-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                label="Nama Layanan"
                name="title"
                defaultValue={service?.title}
                required
              />
              <TextField
                label="Slug"
                name="slug"
                defaultValue={service?.slug}
                required
                hint="Huruf kecil dan tanda hubung, dipakai sebagai identifier internal."
              />
              <div className="flex flex-col gap-2">
                <Label htmlFor="division">Divisi</Label>
                <select
                  id="division"
                  name="division"
                  defaultValue={currentDivision?.id}
                  className="flex h-11 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground transition-colors focus-visible:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                >
                  {divisions.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <TextField
                label="Harga Mulai (juta rupiah)"
                name="startingPrice"
                type="number"
                defaultValue={service?.startingPrice ?? 0}
                required
                hint="Angka dalam juta, contoh: 45 = Rp45 juta. Dipakai estimator."
              />
            </div>
            <TextAreaField
              label="Deskripsi"
              name="description"
              defaultValue={service?.description}
              rows={3}
            />
            <TextAreaField
              label="Deliverables"
              name="deliverables"
              defaultValue={service?.deliverables.join("\n")}
              rows={5}
              hint="Satu deliverable per baris."
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Link
            href="/admin/services"
            className="inline-flex h-10 items-center rounded-lg px-4 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Batal
          </Link>
          <Button type="submit" size="lg">
            {isCreate ? "Tambah Layanan" : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </div>
  );
}
