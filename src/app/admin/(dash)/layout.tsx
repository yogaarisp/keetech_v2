import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";
import { AdminNav } from "@/components/admin/admin-nav";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminDashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row">
        <aside className="flex shrink-0 flex-col gap-6 lg:w-60">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight">
                Kee<span className="text-primary">Tech</span>
              </span>
              <span className="text-xs text-muted-foreground">Panel Admin</span>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Lihat Situs
            </Link>
          </div>

          <AdminNav />

          <form action={logoutAction}>
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start gap-2.5 text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </Button>
          </form>
        </aside>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
