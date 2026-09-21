import { saveSiteAction } from "@/app/admin/actions";
import { getSite } from "@/lib/data/site";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AdminHeading,
  FlashBanner,
  TextAreaField,
  TextField,
} from "@/components/admin/fields";
import { KeyValueList } from "@/components/admin/key-value-list";

export default async function AdminSitePage({
  searchParams,
}: PageProps<"/admin/site">) {
  const { saved } = await searchParams;
  const site = await getSite();

  return (
    <div className="flex flex-col gap-6">
      <AdminHeading
        title="Profil & Kontak"
        description="Identitas website, kontak, menu navigasi, sosial media, dan statistik kepercayaan."
      />

      {saved ? <FlashBanner message="Perubahan berhasil disimpan." /> : null}

      <form action={saveSiteAction} className="flex flex-col gap-6">
        <Card>
          <CardContent className="flex flex-col gap-5 p-6 sm:p-7">
            <h2 className="font-semibold">Identitas</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField label="Nama Singkat" name="name" defaultValue={site.name} required />
              <TextField label="Nama Resmi" name="fullName" defaultValue={site.fullName} required />
              <TextField label="Domain" name="domain" defaultValue={site.domain} required />
              <TextField label="URL Situs" name="url" defaultValue={site.url} required hint="Dipakai untuk metadata & SEO." />
            </div>
            <TextField label="Tagline" name="tagline" defaultValue={site.tagline} required />
            <TextAreaField
              label="Deskripsi"
              name="description"
              defaultValue={site.description}
              rows={3}
              hint="Dipakai di footer dan meta description."
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-5 p-6 sm:p-7">
            <h2 className="font-semibold">Kontak</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField label="Email" name="email" type="email" defaultValue={site.contact.email} required />
              <TextField label="Telepon" name="phone" defaultValue={site.contact.phone} required />
              <TextField label="Link WhatsApp" name="whatsapp" defaultValue={site.contact.whatsapp} hint="Contoh: https://wa.me/6281234567890" />
              <TextField label="Alamat" name="address" defaultValue={site.contact.address} />
            </div>
            <TextField label="Jam Operasional" name="officeHours" defaultValue={site.contact.officeHours} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-5 p-6 sm:p-7">
            <h2 className="font-semibold">Navigasi Menu</h2>
            <KeyValueList
              aName="navLabel"
              bName="navHref"
              aHeader="Label"
              bHeader="URL"
              aPlaceholder="Home"
              bPlaceholder="/"
              initial={site.navigation.map((n) => [n.label, n.href])}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-5 p-6 sm:p-7">
            <h2 className="font-semibold">Sosial Media</h2>
            <KeyValueList
              aName="socialLabel"
              bName="socialHref"
              aHeader="Platform"
              bHeader="URL"
              aPlaceholder="LinkedIn"
              bPlaceholder="https://..."
              initial={site.socials.map((s) => [s.label, s.href])}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-5 p-6 sm:p-7">
            <h2 className="font-semibold">Statistik</h2>
            <p className="text-sm text-muted-foreground">
              Ditampilkan di section trust halaman utama.
            </p>
            <KeyValueList
              aName="statValue"
              bName="statLabel"
              aHeader="Nilai"
              bHeader="Keterangan"
              aPlaceholder="50+"
              bPlaceholder="Proyek Selesai"
              initial={site.stats.map((s) => [s.value, s.label])}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </div>
  );
}
