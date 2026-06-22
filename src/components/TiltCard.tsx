import { useCallback, useRef, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * TiltCard — premium 3D-depth surface.
 *
 * A pointer-reactive card that tilts in perspective, lifts, and catches a
 * cursor-tracked ice glow + sheen — the "floating glass" tactile feel.
 *
 * Performance contract:
 *  - transform / opacity only → composited on the GPU, never touches layout
 *  - zero React re-renders: all motion is written straight to the DOM via refs
 *  - listeners attach work only for fine pointers (mouse/trackpad); touch is static
 *  - fully inert under prefers-reduced-motion (renders a plain card)
 *
 * Drop-in for any card: <TiltCard className="rounded-2xl glass-card …">…</TiltCard>
 * The `group` class is applied to the tilting element, so existing
 * `group-hover:*` children keep working.
 */

interface TiltCardProps {
  children: ReactNode;
  /** Classes for the tilting surface (e.g. "rounded-2xl glass-card flex flex-col h-full"). */
  className?: string;
  /** Max tilt in degrees. Default 6 — subtle, Apple-grade. */
  max?: number;
  /** Hover lift in px. Default 6. */
  lift?: number;
  /** Cursor-tracked ice glow. Default true. */
  glow?: boolean;
  /** Cursor-tracked white sheen / reflection. Default true. */
  glare?: boolean;
}

const hasFinePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches;

const TiltCard = ({
  children,
  className,
  max = 6,
  lift = 6,
  glow = true,
  glare = true,
}: TiltCardProps) => {
  const reduced = useReducedMotion();
  const innerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);

  const onEnter = useCallback(() => {
    activeRef.current = hasFinePointer();
    const el = innerRef.current;
    if (!el || !activeRef.current) return;
    el.style.transition = "transform 120ms ease-out";
    el.style.setProperty("--tc-glow", glow ? "1" : "0");
    el.style.setProperty("--tc-glare", glare ? "1" : "0");
  }, [glow, glare]);

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      const el = innerRef.current;
      if (!el || !activeRef.current) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const px = x / r.width - 0.5; // -0.5 … 0.5
      const py = y / r.height - 0.5;
      el.style.transform = `translate3d(0, ${-lift}px, 0) rotateX(${(
        -py * max
      ).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
      el.style.setProperty("--tc-x", `${x}px`);
      el.style.setProperty("--tc-y", `${y}px`);
    },
    [lift, max],
  );

  const onLeave = useCallback(() => {
    const el = innerRef.current;
    if (!el) return;
    activeRef.current = false;
    el.style.transition = "transform 520ms cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "";
    el.style.setProperty("--tc-glow", "0");
    el.style.setProperty("--tc-glare", "0");
  }, []);

  // Reduced motion → plain, static card. Still a `group` for hover children.
  if (reduced) {
    return <div className={cn("group relative", className)}>{children}</div>;
  }

  return (
    <div className="h-full [perspective:1100px]" onPointerEnter={onEnter} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div
        ref={innerRef}
        className={cn(
          "group relative overflow-hidden transform-gpu will-change-transform [backface-visibility:hidden]",
          className,
        )}
        style={{ "--tc-x": "50%", "--tc-y": "50%" } as CSSProperties}
      >
        {glow && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: "var(--tc-glow, 0)" as unknown as number,
              background:
                "radial-gradient(340px circle at var(--tc-x) var(--tc-y), hsl(var(--ice) / 0.13), transparent 62%)",
            }}
          />
        )}
        {glare && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-300"
            style={{
              opacity: "var(--tc-glare, 0)" as unknown as number,
              background:
                "radial-gradient(200px circle at var(--tc-x) var(--tc-y), hsl(0 0% 100% / 0.10), transparent 55%)",
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
