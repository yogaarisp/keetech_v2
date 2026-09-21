import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { getNavigation, getSite } from "@/lib/data/site";
import { getDivisions } from "@/lib/data/divisions";
import { Logo } from "@/components/site/logo";

export async function Footer() {
  const [site, navigation, divisions] = await Promise.all([
    getSite(),
    getNavigation(),
    getDivisions(),
  ]);

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {site.description}
            </p>
          </div>

          <div>
            <h3 className="eyebrow mb-5">Navigasi</h3>
            <ul className="flex flex-col gap-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-5">Divisi Kami</h3>
            <ul className="flex flex-col gap-3">
              {divisions.map((d) => (
                <li key={d.id}>
                  <Link
                    href={`/services#${d.id}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-5">Kontak</h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${site.contact.email}`} className="hover:text-primary">
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{site.contact.phone}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{site.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <p className="font-display text-[16vw] leading-[0.8] text-foreground/10 sm:text-[12rem]">
            KeeTech
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {site.fullName}
          </p>
          <p className="text-xs text-muted-foreground">
            {site.domain} — {site.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
