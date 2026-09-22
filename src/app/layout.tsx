import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { getSite } from "@/lib/data/site";
import { OrganizationLd, WebSiteLd } from "@/components/seo/structured-data";
import { GoogleAnalytics } from "@/components/seo/analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  const ogImage = `${site.url}/og-image.png`;
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${site.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    keywords: [
      "jasa IT Semarang",
      "jasa service PC Semarang",
      "service komputer Semarang",
      "rakit PC Semarang",
      "jasa rakit komputer Semarang",
      "pembuatan website Semarang",
      "jasa bikin website Semarang",
      "jasa pembuatan web Semarang",
      "jasa CCTV Semarang",
      "instalasi CCTV Semarang",
      "pasang CCTV Semarang",
      "jasa instalasi jaringan Semarang",
      "jasa jaringan kantor Semarang",
      "jasa server Semarang",
      "jasa maintenance komputer Semarang",
      "jasa IT support Semarang",
      "jasa pembuatan aplikasi Semarang",
      "jasa software development Semarang",
      "jasa AI Semarang",
      "jasa chatbot Semarang",
      "jasa otomasi Semarang",
      "jasa RPA Semarang",
      "jasa data analytics Semarang",
      "jasa dashboard Semarang",
      "jasa keamanan jaringan Semarang",
      "jasa firewall Semarang",
      "jasa VPN Semarang",
      "jasa backup data Semarang",
      "jasa cloud Semarang",
      "jasa migrasi cloud Semarang",
      "jasa IT outsourcing Semarang",
      "jasa helpdesk Semarang",
      "jasa IT consultant Semarang",
      "konsultan IT Semarang",
      "perusahaan IT Semarang",
      "vendor IT Semarang",
      "teknisi komputer Semarang",
      "teknisi jaringan Semarang",
      "jasa IT Banyumanik",
      "jasa IT Ngaliyan",
      "jasa IT Gunungpati",
      "jasa IT Tembalang",
      "jasa IT Gajah Mungkur",
      "jasa IT Candisari",
      "jasa IT Mijen",
      "jasa IT Tugu",
      "jasa IT Pedurungan",
      "jasa IT Gayamsari",
      "jasa IT Semarang Selatan",
      "jasa IT Semarang Timur",
      "jasa IT Semarang Barat",
      "jasa IT Semarang Utara",
      "jasa IT Semarang Tengah",
      "jasa IT Ungaran",
      "jasa IT Salatiga",
      "jasa IT Demak",
      "jasa IT Kendal",
      "jasa IT Jawa Tengah",
      "software development Semarang",
      "AI integration Semarang",
      "jasa pembuatan software Semarang",
      "infrastructure IT Semarang",
      "CCTV Semarang",
      "managed services Semarang",
      "IT solutions agency",
      "AI integration",
      "custom software development",
      "IT infrastructure",
      "managed services",
      "pengembangan aplikasi Semarang",
      site.name,
    ],
    authors: [{ name: site.fullName }],
    creator: site.fullName,
    publisher: site.fullName,
    alternates: {
      canonical: site.url,
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: site.url,
      siteName: site.name,
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${site.name} — ${site.tagline}`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      google: "GOOGLE_SITE_VERIFICATION_TOKEN",
    },
    icons: {
      icon: "/keetech.ico",
      apple: "/keetech.png",
    },
    manifest: "/manifest.json",
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <GoogleAnalytics />
        <OrganizationLd />
        <WebSiteLd />
        {children}
      </body>
    </html>
  );
}
