import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-32 text-center sm:px-6 lg:px-8">
      <p className="font-display text-8xl leading-none text-primary">404</p>
      <h1 className="mt-5 font-display text-3xl tracking-tight">Halaman tidak ditemukan</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Halaman yang Anda cari mungkin telah dipindahkan atau tidak pernah ada.
      </p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8")}>
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Beranda
      </Link>
    </section>
  );
}
