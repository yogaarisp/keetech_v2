import { saveDivisionsAction } from "@/app/admin/actions";
import { getDivisions } from "@/lib/data/divisions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AdminHeading,
  FlashBanner,
  TextAreaField,
  TextField,
} from "@/components/admin/fields";

export default async function AdminDivisionsPage({
  searchParams,
}: PageProps<"/admin/divisions">) {
  const { saved } = await searchParams;
  const divisions = await getDivisions();

  return (
    <div className="flex flex-col gap-6">
      <AdminHeading
        title="Divisi"
        description="Ubah nama, tagline, deskripsi, dan highlight tiap divisi."
      />

      {saved ? <FlashBanner message="Perubahan berhasil disimpan." /> : null}

      <form action={saveDivisionsAction} className="flex flex-col gap-6">
        {divisions.map((division) => (
          <Card key={division.id}>
            <CardContent className="flex flex-col gap-5 p-6 sm:p-7">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">{division.name}</h2>
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                  {division.id}
                </code>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField label="Nama" name={`name-${division.id}`} defaultValue={division.name} required />
                <TextField label="Nama Singkat" name={`shortName-${division.id}`} defaultValue={division.shortName} required />
                <TextField label="Label Tim" name={`teamLabel-${division.id}`} defaultValue={division.teamLabel} />
                <TextField label="Tagline" name={`tagline-${division.id}`} defaultValue={division.tagline} />
              </div>
              <TextAreaField
                label="Deskripsi"
                name={`description-${division.id}`}
                defaultValue={division.description}
                rows={3}
              />
              <TextAreaField
                label="Highlights"
                name={`highlights-${division.id}`}
                defaultValue={division.highlights.join("\n")}
                rows={5}
                hint="Satu poin per baris."
              />
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </div>
  );
}
