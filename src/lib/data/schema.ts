export type DivisionId = "software-ai" | "support-infra";

export type ComplexityId = "standard" | "advanced" | "enterprise";

export type NavigationItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type Site = {
  name: string;
  fullName: string;
  domain: string;
  url: string;
  tagline: string;
  description: string;
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
    geo?: {
      latitude: number;
      longitude: number;
    };
    address: string;
    officeHours: string;
    openingHoursSpec?: string;
  };
  socials: SocialLink[];
  stats: StatItem[];
  navigation: NavigationItem[];
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  deliverables: string[];
  division: DivisionId;
  startingPrice: number; // dalam juta rupiah
};

export type Division = {
  id: DivisionId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  teamLabel: string;
  highlights: string[];
};

export type ImpactMetric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  clientType: string;
  division: DivisionId;
  category: string;
  year: number;
  duration: string;
  summary: string;
  challenge: string;
  solution: string;
  impact: ImpactMetric[];
  techStack: string[];
  services: string[];
  featured?: boolean;
};

export type ComplexityOption = {
  id: ComplexityId;
  label: string;
  description: string;
  multiplier: number;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  content: string;
};

export type Testimonial = {
  author: string;
  role: string;
  company: string;
  rating: number;
  text: string;
};

export type SiteData = {
  site: Site;
  divisions: Division[];
  services: Service[];
  caseStudies: CaseStudy[];
  complexityOptions: ComplexityOption[];
  articles?: Article[];
  testimonials?: Testimonial[];
};

export const defaultData: SiteData = {
  site: {
    name: "KeeTech",
    fullName: "PT KeeTech Solusi Digital",
    domain: "keetech.my.id",
    url: "https://keetech.my.id",
    tagline: "Modern IT & AI Solutions Agency",
    description:
      "KeeTech adalah agensi solusi IT & AI di Semarang yang membantu korporasi dan instansi bertransformasi melalui software enterprise, integrasi AI, dan infrastruktur yang andal. Melayani klien di Semarang, Jawa Tengah, dan seluruh Indonesia.",
    contact: {
      email: "hello@keetech.my.id",
      phone: "+62 857-9941-0169",
      whatsapp: "https://wa.me/6285799410169",
      streetAddress: "Jl. Pudaksari V, Bumirejo",
      addressLocality: "Semarang",
      addressRegion: "Jawa Tengah",
      postalCode: "50268",
      addressCountry: "ID",
      geo: { latitude: -7.0492, longitude: 110.3956 },
      address: "Jl. Pudaksari V, Bumirejo, Banyumanik, Kota Semarang, Jawa Tengah 50268 — Melayani klien di seluruh Indonesia",
      officeHours: "Senin – Jumat, 09.00 – 18.00 WIB",
      openingHoursSpec: "Mo-Fr 09:00-18:00",
    },
    socials: [
      { label: "LinkedIn", href: "https://linkedin.com/company/keetech" },
      { label: "Instagram", href: "https://instagram.com/keetech" },
      { label: "GitHub", href: "https://github.com/keetech" },
    ],
    stats: [
      { value: "50+", label: "Proyek Selesai" },
      { value: "30+", label: "Klien Korporat & Instansi" },
      { value: "99.9%", label: "Uptime SLA Terjaga" },
      { value: "24/7", label: "Dukungan On-Site & Remote" },
    ],
    navigation: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  divisions: [
    {
      id: "software-ai",
      name: "Software & AI Innovation",
      shortName: "Software & AI",
      tagline: "Membangun sistem cerdas yang menggerakkan bisnis Anda",
      description:
        "Divisi developer yang merancang, membangun, dan mengintegrasikan perangkat lunak skala enterprise — dari custom web & mobile apps hingga integrasi AI dan otomatisasi workflow yang memangkas proses manual.",
      teamLabel: "Developer Team",
      highlights: [
        "Arsitektur software enterprise & cloud-native",
        "Integrasi AI: LLM, computer vision, forecasting",
        "Otomatisasi proses bisnis & workflow (RPA)",
        "Code review, QA otomatis & dokumentasi lengkap",
      ],
    },
    {
      id: "support-infra",
      name: "Support & Infrastructure",
      shortName: "Support & Infra",
      tagline: "Operasional IT yang stabil, aman, dan terpantau",
      description:
        "Divisi on-site team yang memastikan infrastruktur TI Anda berjalan tanpa henti — jaringan, server, keamanan CCTV, hingga dukungan teknis lapangan dengan komitmen SLA yang terukur.",
      teamLabel: "On-Site Team",
      highlights: [
        "Managed services & monitoring 24/7",
        "Setup jaringan, server & data center",
        "Instalasi CCTV & sistem keamanan",
        "Response time SLA: 1 jam remote, 4 jam on-site",
      ],
    },
  ],
  services: [
    {
      slug: "custom-software",
      title: "Custom Software Development",
      description:
        "Pengembangan aplikasi web & enterprise system yang dirancang sesuai proses bisnis unik Anda — ERP ringan, sistem internal, hingga platform pelanggan.",
      deliverables: [
        "Aplikasi web enterprise",
        "REST/GraphQL API",
        "Dokumentasi teknis",
        "Panduan user & admin",
      ],
      division: "software-ai",
      startingPrice: 45,
    },
    {
      slug: "ai-integration",
      title: "AI & Machine Learning Integration",
      description:
        "Integrasi kapabilitas AI ke dalam sistem Anda: asisten berbasis LLM, klasifikasi dokumen, computer vision, dan prediksi berbasis data historis.",
      deliverables: [
        "Chatbot & AI assistant",
        "Document intelligence (OCR + LLM)",
        "Model prediktif & forecasting",
        "Integrasi API AI ke sistem existing",
      ],
      division: "software-ai",
      startingPrice: 35,
    },
    {
      slug: "workflow-automation",
      title: "Workflow Automation (RPA)",
      description:
        "Otomatisasi proses repetitif — dari entri data, rekonsiliasi, hingga integrasi antar sistem — untuk memangkas waktu proses dan human error.",
      deliverables: [
        "Audit proses & identifikasi automation",
        "Bot otomasi terintegrasi",
        "Dashboard monitoring proses",
        "Pelatihan tim internal",
      ],
      division: "software-ai",
      startingPrice: 25,
    },
    {
      slug: "data-analytics",
      title: "Data Analytics & Dashboard",
      description:
        "Konsolidasi data dari berbagai sumber menjadi dashboard real-time yang membantu manajemen mengambil keputusan berbasis data.",
      deliverables: [
        "Data pipeline & ETL",
        "Executive dashboard real-time",
        "Laporan otomatis",
        "Data governance ringan",
      ],
      division: "software-ai",
      startingPrice: 30,
    },
    {
      slug: "managed-it",
      title: "IT Managed Services",
      description:
        "Pengelolaan penuh aset TI perusahaan — monitoring server & jaringan 24/7, patching, backup, hingga helpdesk terjadwal.",
      deliverables: [
        "Monitoring & alerting 24/7",
        "Backup & disaster recovery",
        "Helpdesk & ticketing system",
        "Laporan kesehatan infrastruktur bulanan",
      ],
      division: "support-infra",
      startingPrice: 15,
    },
    {
      slug: "network-server",
      title: "Network & Server Infrastructure",
      description:
        "Perancangan dan implementasi jaringan kantor/multi-cabang, server on-premise, virtualisasi, dan integrasi cloud hybrid.",
      deliverables: [
        "Desain topologi jaringan",
        "Instalasi server & virtualisasi",
        "Keamanan jaringan (firewall, VPN)",
        "Dokumentasi infrastruktur",
      ],
      division: "support-infra",
      startingPrice: 20,
    },
    {
      slug: "cctv-security",
      title: "CCTV & Security Systems",
      description:
        "Instalasi sistem pengawasan CCTV IP, access control, dan integrasi monitoring terpusat untuk kantor, gudang, dan area produksi.",
      deliverables: [
        "Survei lokasi & desain coverage",
        "Instalasi CCTV IP & NVR",
        "Akses kontrol & integrasi alarm",
        "Pemetaan kamera & pelatihan operator",
      ],
      division: "support-infra",
      startingPrice: 12,
    },
    {
      slug: "onsite-support",
      title: "On-Site Technical Support",
      description:
        "Tim teknis yang hadir langsung di lokasi Anda — perawatan preventif, penanganan insiden, dan pendampingan operasional harian dengan SLA terukur.",
      deliverables: [
        "SLA response terukur",
        "Perawatan preventif berkala",
        "Penanganan insiden on-site",
        "Inventaris & lifecycle aset IT",
      ],
      division: "support-infra",
      startingPrice: 10,
    },
  ],
  caseStudies: [
    {
      slug: "document-intelligence-bank",
      title: "Document Intelligence untuk Pemrosesan Kredit",
      clientType: "Bank BPR Regional",
      division: "software-ai",
      category: "AI & Automation",
      year: 2025,
      duration: "4 bulan",
      summary:
        "Sistem pemrosesan dokumen pengajuan kredit berbasis OCR + LLM yang memangkas waktu review dokumen lebih dari 70%.",
      challenge:
        "Tim kredit memproses ratusan dokumen pengajuan per minggu secara manual: verifikasi identitas, slip gaji, dan agunan dilakukan satu per satu. Rata-rata proses per berkas memakan 45 menit dengan tingkat human error yang menyebabkan rework berkali-kali.",
      solution:
        "Kami membangun pipeline document intelligence: dokumen dipindai, diklasifikasikan otomatis, data kunci diekstraksi via OCR + LLM, lalu divalidasi terhadap rule kredit internal. Hasil ekstraksi masuk ke dashboard review dengan confidence score, sehingga petugas hanya memverifikasi anomali.",
      impact: [
        { value: "-72%", label: "Waktu proses per berkas (45 → 12 menit)" },
        { value: "98.4%", label: "Akurasi ekstraksi data kunci" },
        { value: "3x", label: "Kapasitas review tanpa penambahan SDM" },
      ],
      techStack: ["Next.js", "Python", "OCR Engine", "LLM API", "PostgreSQL"],
      services: ["AI & Machine Learning Integration", "Workflow Automation"],
      featured: true,
    },
    {
      slug: "omnichannel-retail",
      title: "Platform Omnichannel Retail 40 Cabang",
      clientType: "Jaringan Ritel Nasional",
      division: "software-ai",
      category: "Enterprise Platform",
      year: 2025,
      duration: "6 bulan",
      summary:
        "Konsolidasi kasir, inventori, dan e-commerce ke satu platform terpusat yang menyatukan stok real-time seluruh cabang.",
      challenge:
        "Setiap cabang menjalankan sistem kasir terpisah dengan rekap manual harian. Stok antar cabang tidak terlihat pusat, menyebabkan kehabisan barang di lokasi ramai dan penumpukan di lokasi sepi. Rekonsiliasi keuangan bulanan memakan waktu hingga 10 hari kerja.",
      solution:
        "Kami merancang platform omnichannel terpusat: POS modern per cabang, sinkronisasi stok real-time, integrasi marketplace, dan dashboard performa per lokasi. Modul rekonsiliasi otomatis menggantikan rekap manual.",
      impact: [
        { value: "40", label: "Cabang terintegrasi dalam satu platform" },
        { value: "-85%", label: "Waktu rekonsiliasi (10 hari → 1.5 hari)" },
        { value: "+18%", label: "Pengurangan kehilangan penjualan due-to-stockout" },
      ],
      techStack: ["Next.js", "NestJS", "Redis", "PostgreSQL", "Docker"],
      services: ["Custom Software Development", "Data Analytics & Dashboard"],
      featured: true,
    },
    {
      slug: "e-office-pemda",
      title: "E-Office & Digitalisasi Arsip Pemda",
      clientType: "Pemerintah Daerah",
      division: "software-ai",
      category: "Government",
      year: 2024,
      duration: "5 bulan",
      summary:
        "Sistem surat menyurat, persuratan digital, dan arsip elektronik yang mempercepat alur persetujuan berjenjang di lingkungan sekretariat daerah.",
      challenge:
        "Alur surat berjalan dengan kertas fisik melintasi puluhan unit kerja. Penelusuran arsip lama butuh berhari-hari, dan tidak ada jejak audit atas disposisi pejabat. Kebutuhan regulasi: sistem harus on-premise dengan jejak audit lengkap.",
      solution:
        "Kami membangun e-office on-premise: persuratan digital dengan disposisi berjenjang, tanda tangan elektronik, arsip dengan pencarian full-text, dan log audit menyeluruh. Migrasi arsip lama dilakukan bertahap oleh tim kami di lokasi.",
      impact: [
        { value: "-64%", label: "Waktu alur surat antar unit kerja" },
        { value: "100%", label: "Jejak audit disposisi tercatat" },
        { value: "1 hari", label: "Penelusuran arsip (dari 3–5 hari)" },
      ],
      techStack: ["Laravel", "Next.js", "Elasticsearch", "MinIO"],
      services: ["Custom Software Development", "Data Analytics & Dashboard"],
      featured: true,
    },
    {
      slug: "smart-factory-monitoring",
      title: "IoT Monitoring Lini Produksi",
      clientType: "Manufaktur Komponen Otomotif",
      division: "software-ai",
      category: "AI & Automation",
      year: 2024,
      duration: "3 bulan",
      summary:
        "Dashboard monitoring mesin produksi real-time dengan prediksi downtime berbasis data sensor, menurunkan unplanned downtime signifikan.",
      challenge:
        "Downtime mesin baru diketahui saat operator melapor, tanpa data historis yang bisa dianalisis. Perawatan dilakukan berdasarkan jadwal, bukan kondisi — mesin sering mati mendadak di tengah target produksi.",
      solution:
        "Kami memasang sensor getaran & suhu pada mesin kritis, mengalirkan datanya ke dashboard monitoring real-time, lalu membangun model prediksi anomali yang memberi peringatan dini sebelum kerusakan terjadi.",
      impact: [
        { value: "-41%", label: "Unplanned downtime per kuartal" },
        { value: "±15 mnt", label: "Peringatan dini sebelum anomali kritis" },
        { value: "12", label: "Mesin kritis terpantau real-time" },
      ],
      techStack: ["IoT Gateway", "MQTT", "TimescaleDB", "Next.js"],
      services: ["Data Analytics & Dashboard", "AI & Machine Learning Integration"],
      featured: false,
    },
    {
      slug: "hospital-network-overhaul",
      title: "Pembenahan Jaringan & Infrastruktur RS",
      clientType: "Rumah Sakit Swasta",
      division: "support-infra",
      category: "Infrastructure",
      year: 2025,
      duration: "8 minggu",
      summary:
        "Redesign jaringan multi-lantai dengan segmentasi VLAN, redundansi link, dan monitoring 24/7 — mendukung SIMRS yang tidak boleh berhenti.",
      challenge:
        "Jaringan rumah sakit sering mengalami gangguan tanpa penyebab jelas: Wi-Fi apotek dan rawat inap satu jaringan dengan sistem medis kritis. Tidak ada monitoring, sehingga setiap masalah baru terasa saat layanan terganggu.",
      solution:
        "Tim on-site kami mendesain ulang topologi: segmentasi VLAN per unit layanan, redundansi uplink, QoS untuk sistem medis, dan monitoring terpusat dengan alerting 24/7. Implementasi dilakukan bertahap tanpa menghentikan layanan rawat.",
      impact: [
        { value: "99.97%", label: "Uptime jaringan pasca implementasi" },
        { value: "0", label: "Insiden gangguan SIMRS kritis dalam 6 bulan" },
        { value: "8", label: "Lantai dengan coverage Wi-Fi merata" },
      ],
      techStack: ["MikroTik", "Ubiquiti", "VLAN", "Zabbix"],
      services: ["Network & Server Infrastructure", "IT Managed Services"],
      featured: true,
    },
    {
      slug: "warehouse-cctv-rollout",
      title: "Sistem Keamanan CCTV Gudang 12 Lokasi",
      clientType: "Logistik & Distribusi",
      division: "support-infra",
      category: "Security",
      year: 2024,
      duration: "6 minggu",
      summary:
        "Rollout CCTV IP terintegrasi dengan monitoring terpusat di 12 gudang, menurunkan insiden kehilangan barang hingga 90%.",
      challenge:
        "Gudang-gudang tersebar di 12 kota dengan sistem pengawasan lama yang tidak terekam rapi. Investigasi kehilangan barang sulit karena rekaman tidak terpusat dan sering tertimpa.",
      solution:
        "Tim kami mensurvei tiap lokasi, mendesain coverage kamera per zona risiko, menginstalasi CCTV IP dengan NVR kapasitas 90 hari, dan mengintegrasikan semuanya ke portal monitoring terpusat di kantor pusat.",
      impact: [
        { value: "-90%", label: "Insiden kehilangan barang terlaporkan" },
        { value: "90 hari", label: "Retensi rekaman aman terpusat" },
        { value: "12", label: "Lokasi terpantau dari satu portal" },
      ],
      techStack: ["Hikvision IP", "NVR", "VMS Centralized"],
      services: ["CCTV & Security Systems", "On-Site Technical Support"],
      featured: false,
    },
  ],
  complexityOptions: [
    {
      id: "standard",
      label: "Standard",
      description: "Cakupan jelas, 1 sistem utama, timeline 1–2 bulan",
      multiplier: 1,
    },
    {
      id: "advanced",
      label: "Advanced",
      description: "Integrasi multi-sistem, timeline 2–4 bulan",
      multiplier: 1.6,
    },
    {
      id: "enterprise",
      label: "Enterprise",
      description: "Skala besar, multi-unit, timeline 4–6 bulan ke atas",
      multiplier: 2.4,
    },
  ],
  articles: [],
  testimonials: [],
};
