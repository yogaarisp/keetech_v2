"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type FormState = "idle" | "submitting" | "success";

export function ContactForm({ initialMessage = "" }: { initialMessage?: string }) {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError(null);

    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      phone: String(data.get("phone") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        throw new Error(result?.error ?? "Gagal mengirim inquiry.");
      }

      setState("success");
    } catch (err) {
      setState("idle");
      setError(
        err instanceof Error
          ? err.message
          : "Gagal mengirim. Silakan coba lagi atau hubungi kami langsung via WhatsApp."
      );
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-primary/30 bg-primary/5 p-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
          <CheckCircle2 className="h-7 w-7 text-primary" />
        </span>
        <h3 className="text-lg font-semibold">Inquiry Terkirim</h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Terima kasih! Tim kami akan menghubungi Anda dalam 1×24 jam kerja untuk menjadwalkan
          sesi konsultasi.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Nama Lengkap *</Label>
          <Input id="name" name="name" required placeholder="Nama Anda" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" required placeholder="nama@perusahaan.com" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="company">Perusahaan / Instansi</Label>
          <Input id="company" name="company" placeholder="Nama organisasi" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">No. WhatsApp</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+62 ..." />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Kebutuhan Anda *</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          defaultValue={initialMessage}
          placeholder="Ceritakan kebutuhan, tantangan, atau sistem yang ingin Anda bangun..."
        />
      </div>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" size="lg" disabled={state === "submitting"} className="w-full sm:w-fit">
        {state === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Mengirim...
          </>
        ) : (
          <>
            <SendHorizonal className="h-4 w-4" />
            Kirim Inquiry
          </>
        )}
      </Button>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Data Anda hanya digunakan untuk keperluan komunikasi proyek. Kami tidak membagikannya
        ke pihak ketiga.
      </p>
    </form>
  );
}
