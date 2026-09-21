import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { saveCaseStudyAction } from "@/app/admin/actions";
import { getCaseStudyBySlug, type CaseStudy } from "@/lib/data/portfolio";
import { getDivisions } from "@/lib/data/divisions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  AdminHeading,
  ErrorBanner,
  TextAreaField,
  TextField,
} from "@/components/admin/fields";
import { KeyValueList } from "@/components/admin/key-value-list";

export default async function AdminCaseStudyEditPage({
  params,
  searchParams,
}: PageProps<"/admin/portfolio/[slug]">) {
  const { slug } = await params;
  const { error } = await searchParams;
  const isCreate = slug === "new";

  const [divisions, study] = await Promise.all([
    getDivisions(),
    isCreate ? Promise.resolve(undefined) : getCaseStudyBySlug(slug),
  ]);
  if (!isCreate && !study) notFound();

  const selectedDivisionId: CaseStudy["division"] = study
    ? study.division
    : divisions[0]?.id ?? "software-ai";

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/portfolio"
        className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Daftar Portofolio
      </Link>

      <AdminHeading
        title={isCreate ? "Tambah Studi Kasus" : "Edit Studi Kasus"}
        description={
          isCreate
            ? "Isi detail studi kasus baru: tantangan, solusi, dan dampak bisnis."
            : `Mengubah: ${study?.title}`
        }
      />

      {error === "slug" ? (
        <ErrorBanner message="Slug tidak valid. Gunakan huruf kecil, angka, dan tanda hubung (contoh: document-intelligence-bank)." />
      ) : null}
      {error === "duplicate" ? (
        <ErrorBanner message="Slug sudah dipakai studi kasus lain. Gunakan slug berbeda." />
      ) : null}

      <form action={saveCaseStudyAction} className="flex flex-col gap-6">
        <input type="hidden" name="originalSlug" value={study?.slug ?? ""} />

        <Card>
          <CardContent className="flex flex-col gap-5 p-6 sm:p-7">
            <h2 className="font-semibold">Informasi Utama</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField label="Judul" name="title" defaultValue={study?.title} required />
              <TextField
                label="Slug (URL)"
                name="slug"
                defaultValue={study?.slug}
                required
                hint="Menjadi URL: /portfolio/{slug}"
              />
              <TextField label="Jenis Klien" name="clientType" defaultValue={study?.clientType} required />
              <TextField label="Kategori" name="category" defaultValue={study?.category} required hint="Contoh: AI & Automation, Infrastructure." />
              <TextField label="Tahun" name="year" type="number" defaultValue={study?.year ?? new Date().getFullYear()} required />
              <TextField label="Durasi" name="duration" defaultValue={study?.duration} required hint="Contoh: 4 bulan" />
              <div className="flex flex-col gap-2">
                <Label htmlFor="division">Divisi</Label>
                <select
                  id="division"
                  name="division"
                  defaultValue={selectedDivisionId}
                  className="flex h-11 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground transition-colors focus-visible:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                >
                  {divisions.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <label className="mt-6 flex h-10 items-center gap-3 text-sm sm:mt-0">
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={study?.featured ?? false}
                  className="h-4 w-4 accent-[var(--primary)]"
                />
                Tampilkan sebagai Featured di Home
              </label>
            </div>
            <TextAreaField
              label="Ringkasan"
              name="summary"
              defaultValue={study?.summary}
              rows={3}
              hint="Ditampilkan di kartu portofolio dan meta description."
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-5 p-6 sm:p-7">
            <h2 className="font-semibold">Narasi</h2>
            <TextAreaField
              label="Tantangan"
              name="challenge"
              defaultValue={study?.challenge}
              rows={4}
            />
            <TextAreaField
              label="Solusi"
              name="solution"
              defaultValue={study?.solution}
              rows={4}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-5 p-6 sm:p-7">
            <h2 className="font-semibold">Dampak Bisnis</h2>
            <KeyValueList
              aName="impactValue"
              bName="impactLabel"
              aHeader="Nilai"
              bHeader="Keterangan"
              aPlaceholder="-72%"
              bPlaceholder="Waktu proses per berkas"
              initial={(study?.impact ?? []).map((m) => [m.value, m.label])}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-5 p-6 sm:p-7">
            <h2 className="font-semibold">Teknologi & Layanan</h2>
            <TextAreaField
              label="Tech Stack"
              name="techStack"
              defaultValue={study?.techStack.join("\n")}
              rows={5}
              hint="Satu teknologi per baris."
            />
            <TextAreaField
              label="Layanan Terkait"
              name="relatedServices"
              defaultValue={study?.services.join("\n")}
              rows={4}
              hint="Satu nama layanan per baris (samakan dengan nama layanan di halaman Services)."
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Link
            href="/admin/portfolio"
            className="inline-flex h-10 items-center rounded-lg px-4 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Batal
          </Link>
          <Button type="submit" size="lg">
            {isCreate ? "Tambah Studi Kasus" : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </div>
  );
}
