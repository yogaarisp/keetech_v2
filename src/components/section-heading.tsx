import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/fade-in";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <FadeIn
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <span className={cn("eyebrow", align === "center" && "justify-center")}>{eyebrow}</span>
      <h2 className="font-display text-4xl font-semibold leading-[1.12] sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </FadeIn>
  );
}
