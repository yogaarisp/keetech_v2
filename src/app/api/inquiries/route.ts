import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const INQUIRIES_FILE = path.join(process.cwd(), "data", "inquiries.json");

type IncomingInquiry = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  phone?: unknown;
  message?: unknown;
};

type StoredInquiry = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
};

function sanitize(value: unknown): string {
  return typeof value === "string" ? value.slice(0, 5000).trim() : "";
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json().catch(() => null)) as IncomingInquiry | null;

  const name = sanitize(body?.name);
  const email = sanitize(body?.email);
  const company = sanitize(body?.company);
  const phone = sanitize(body?.phone);
  const message = sanitize(body?.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Nama, email, dan kebutuhan wajib diisi." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Format email tidak valid." }, { status: 400 });
  }

  const inquiry: StoredInquiry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    name,
    email,
    company: company || undefined,
    phone: phone || undefined,
    message,
  };

  try {
    let existing: StoredInquiry[] = [];
    try {
      const raw = await fs.readFile(INQUIRIES_FILE, "utf8");
      existing = JSON.parse(raw) as StoredInquiry[];
    } catch {
      existing = [];
    }

    existing = [...existing, inquiry];
    await fs.mkdir(path.dirname(INQUIRIES_FILE), { recursive: true });
    await fs.writeFile(INQUIRIES_FILE, `${JSON.stringify(existing, null, 2)}\n`, "utf8");
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menyimpan inquiry. Silakan coba lagi." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}