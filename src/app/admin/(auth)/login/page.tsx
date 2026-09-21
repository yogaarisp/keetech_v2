import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { loginAction } from "@/app/admin/actions";
import { isAdmin, isUsingDefaultPassword } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ErrorBanner } from "@/components/admin/fields";

export const metadata: Metadata = {
  title: "Login Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="flex min-h-svh items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardContent className="flex flex-col gap-6 p-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted">
              <LockKeyhole className="h-6 w-6 text-primary" />
            </span>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Admin KeeTech</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Masuk untuk mengelola konten website.
              </p>
            </div>
          </div>

          {error ? <ErrorBanner message="Password salah. Coba lagi." /> : null}

          <form action={loginAction} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full">
              Masuk
            </Button>
          </form>

          {isUsingDefaultPassword() ? (
            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              Password default: <code className="font-mono text-primary">admin123</code>. Ganti
              dengan menambahkan <code className="font-mono">ADMIN_PASSWORD</code> di file{" "}
              <code className="font-mono">.env.local</code>.
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
