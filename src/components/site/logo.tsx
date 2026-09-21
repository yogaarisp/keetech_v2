import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <Image
        src="/keetech.png"
        alt="KeeTech"
        width={44}
        height={44}
        className="h-9 w-9 object-contain brightness-0 transition group-hover:opacity-70"
        priority
      />
      <span className="font-display text-2xl leading-none tracking-tight">
        Kee<span className="text-primary">Tech</span>
      </span>
    </Link>
  );
}
