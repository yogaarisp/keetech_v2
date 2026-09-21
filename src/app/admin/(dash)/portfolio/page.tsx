import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { deleteCaseStudyAction } from "@/app/admin/actions";
import { getCaseStudies } from "@/lib/data/portfolio";
import { getDivisions } from "@/lib/data/divisions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AdminHeading,
  ErrorBanner,
  FlashBanner,
} from "@/components/admin/fields";
import { cn } from "@/lib/utils";

export default async function AdminPortfolioPage({
  searchParams,
}: PageProps<"/admin/portfolio">) {
  const { saved, deleted, error } = await searchParams;
  const [caseStudies, divisions] = await Promise.all([getCaseStudies(), getDivisions()]);
  const divisionName = (id: string) =>
    divisions.find((d) => d.id === id)?.shortName ?? id;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <AdminHeading
          title="Portofolio"
          description="Studi kasus yang tampil di halaman Portfolio dan featured di Home."
        />
        <Link href="/admin/portfolio/new" className={cn(buttonVariants(), "shrink-0")}>
          <Plus className="h-4 w-4" />
          Tambah Studi Kasus
        </Link>
      </div>

      {saved ? <FlashBanner message="Studi kasus berhasil disimpan." /> : null}
      {deleted ? <FlashBanner message="Studi kasus berhasil dihapus." /> : null}
      {error ? <ErrorBanner message="Terjadi kesalahan. Coba lagi." /> : null}

      <Card>
        <CardContent className="p-0">
          <div className="flex flex-col divide-y divide-border">
            {caseStudies.map((study) => (
              <div
                key={study.slug}
                className="flex flex-wrap items-center justify-between gap-4 p-5"
              >
                <div className="min-w-0">
                  <p className="font-medium">
                    {study.title}
                    {study.featured ? (
                      <span className="ml-2 rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                        Featured
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
                    <span>{divisionName(study.division)}</span>
                    <span>{study.category}</span>
                    <span>{study.year}</span>
                    <code className="font-mono">/{study.slug}</code>
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={`/admin/portfolio/${study.slug}`}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Link>
                  <form action={deleteCaseStudyAction}>
                    <input type="hidden" name="slug" value={study.slug} />
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
            {caseStudies.length === 0 ? (
              <p className="p-10 text-center text-sm text-muted-foreground">
                Belum ada studi kasus. Klik “Tambah Studi Kasus” untuk membuat.
              </p>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
