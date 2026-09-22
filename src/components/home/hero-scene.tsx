"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Activity, Cpu, ShieldCheck } from "lucide-react";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

function Layer({
  children,
  className,
  style,
  float = -12,
  duration = 7,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  float?: number;
  duration?: number;
  delay?: number;
}) {
  return (
    <div className={`absolute ${className ?? ""}`} style={style}>
      <div
        className="animate-scene-float"
        style={
          {
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            "--float-y": `${float}px`,
            "--float-z": "0px",
          } as CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}

export function HeroScene() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 90, damping: 18, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateY = useTransform(sx, [0, 1], reduce ? [-16, -16] : [-30, -6]);
  const rotateX = useTransform(sy, [0, 1], reduce ? [12, 12] : [20, 3]);

  function handlePointer(event: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function resetPointer() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div
      className="relative w-full select-none"
      style={{ perspective: "1500px" }}
      onPointerMove={handlePointer}
      onPointerLeave={resetPointer}
    >
      <motion.div
        className="relative mx-auto h-[360px] w-full max-w-[520px] sm:h-[440px] lg:h-[500px]"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.15 }}
      >
        {/* topology plane */}
        <Layer
          className="inset-0"
          style={{ transform: "translateZ(-170px)" }}
          float={-8}
          duration={9}
        >
          <div className="grid-pattern relative h-full w-full overflow-hidden rounded-2xl border border-border/70 bg-card/40 opacity-70">
            <div className="animate-scene-orbit absolute -right-16 -top-16 h-56 w-56 rounded-full border border-dashed border-primary/40" />
          </div>
          <svg
            viewBox="0 0 520 500"
            className="absolute inset-0 h-full w-full text-foreground/25"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M70 120 L250 210 L430 130 M250 210 L250 380 M120 330 L250 380 L400 320"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="6 10"
              className="animate-scene-dash"
            />
            {[
              [70, 120],
              [430, 130],
              [250, 210],
              [120, 330],
              [400, 320],
              [250, 380],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="currentColor" />
            ))}
          </svg>
        </Layer>

        {/* left metric */}
        <Layer
          className="left-0 top-10 hidden w-[190px] sm:block"
          style={{ transform: "translate3d(-40px, 0, -20px)" }}
          float={-16}
          duration={6.5}
          delay={0.4}
        >
          <div className="rounded-2xl border border-border bg-card p-4 shadow-[0_24px_60px_-30px_rgba(20,19,15,0.4)]">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
              Uptime SLA
            </p>
            <p className="mt-2 font-display text-3xl leading-none text-foreground">99.9%</p>
            <div className="mt-3 flex items-end gap-1">
              {[8, 14, 11, 18, 13, 22, 17].map((h, i) => (
                <span
                  key={i}
                  className={`w-1.5 ${i === 5 ? "bg-primary" : "bg-foreground/15"}`}
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          </div>
        </Layer>

        {/* right chip */}
        <Layer
          className="right-2 top-24 hidden sm:block"
          style={{ transform: "translate3d(30px, 0, 60px)" }}
          float={-10}
          duration={7.5}
          delay={0.9}
        >
          <div className="flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground px-3 py-2 text-background shadow-[0_18px_40px_-24px_rgba(20,19,15,0.6)]">
            <Cpu className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em]">AI / LLM</span>
          </div>
        </Layer>

        {/* main console */}
        <Layer
          className="left-1/2 top-1/2 w-[280px] sm:w-[340px]"
          style={{ transform: "translate3d(-50%, -50%, 30px)" }}
          float={-14}
          duration={8}
          delay={0.2}
        >
          <div className="overflow-hidden rounded-2xl border border-foreground/15 bg-card shadow-[0_40px_90px_-40px_rgba(20,19,15,0.55)]">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="h-2 w-2 rounded-full bg-foreground/15" />
                <span className="h-2 w-2 rounded-full bg-foreground/15" />
              </div>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
                control-center
              </span>
            </div>
            <div className="flex flex-col gap-4 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                    System Health
                  </p>
                  <p className="mt-1 font-display text-2xl leading-none">Operational</p>
                </div>
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div className="flex items-end gap-1.5">
                {[16, 26, 20, 34, 24, 42, 30, 48, 36, 52].map((h, i) => (
                  <span
                    key={i}
                    className={`flex-1 ${i > 6 ? "bg-primary" : "bg-foreground/12"}`}
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 border-t border-border pt-3">
                {[
                  { icon: Activity, label: "Monitor" },
                  { icon: ShieldCheck, label: "Secure" },
                  { icon: Cpu, label: "Automate" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-1.5">
                    <item.icon className="h-3.5 w-3.5 text-primary" />
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Layer>

        {/* accent node */}
        <Layer
          className="bottom-16 right-10"
          style={{ transform: "translateZ(90px)" }}
          float={-20}
          duration={5.5}
          delay={0.6}
        >
          <span className="block h-3 w-3 rounded-full bg-primary shadow-[0_0_0_6px_rgba(31,58,138,0.15)]" />
        </Layer>
      </motion.div>
    </div>
  );
}
