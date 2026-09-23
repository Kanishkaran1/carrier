import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AirflowCanvas from "@/components/AirflowCanvas";

// ── Constants ──────────────────────────────────────────────────────────────────
const FRAME_COUNT = 120;
const BASE = import.meta.env.BASE_URL;

// Pad to 4 digits: 1 → "0001"
const frameSrc = (i: number) =>
  `${BASE}frames/frame_${String(i).padStart(4, "0")}.jpg`;

// ── Easing ─────────────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ── Magnetic CTA ───────────────────────────────────────────────────────────────
const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.12}px, ${(e.clientY - (r.top + r.height / 2)) * 0.18}px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "translate(0,0)";
      }}
      className="inline-block transition-transform duration-300 ease-out will-change-transform"
    >
      {children}
    </div>
  );
};

// ── Draw image with object-fit: cover behaviour ────────────────────────────────
const drawCover = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement
) => {
  const { width: cw, height: ch } = ctx.canvas;
  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
  const sw = img.naturalWidth * scale;
  const sh = img.naturalHeight * scale;
  ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
};

// ── Component ─────────────────────────────────────────────────────────────────
const VideoScrubHero = () => {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // ── Set --vh CSS var so 100svh works on all OS/browser combos ──────────────
  // `svh`/`dvh` units are broken on Windows Chromium < 108 and some Android
  // builds — they either collapse to 0 or equal 100vh ignoring the toolbar.
  // We measure the actual inner height and write it as --vh so every element
  // using calc(var(--vh, 1vh) * 100) gets the correct value everywhere.
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  // ── Resize canvas to match device pixels ───────────────────────────────────
  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [reduced]);

  // ── Preload all frames ──────────────────────────────────────────────────────
  useEffect(() => {
    if (reduced) return;

    const imgs: HTMLImageElement[] = [];

    const drawFirst = () => {
      const canvas = canvasRef.current;
      if (!canvas || !imgs[0]) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      drawCover(ctx, imgs[0]);
    };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        if (i === 1) drawFirst();
      };
      imgs.push(img);
    }

    imagesRef.current = imgs;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  // ── Scroll → frame index mapping ───────────────────────────────────────────
  useEffect(() => {
    if (reduced) return;

    const onScroll = () => {
      const wrapper = wrapperRef.current;
      const canvas = canvasRef.current;
      if (!wrapper || !canvas) return;

      const { top, height } = wrapper.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      const raw = Math.max(0, Math.min(1, -top / scrollable));
      // 0.12 dead-zone at the start: animation doesn't begin until the user
      // has scrolled past the first 12% of the sticky area, then maps the
      // remaining scroll to the full frame range — feels unhurried.
      const DELAY = 0.12;
      const progress = Math.max(0, Math.min(1, (raw - DELAY) / (1 - DELAY)));
      const idx = Math.min(
        FRAME_COUNT - 1,
        Math.floor(progress * FRAME_COUNT)
      );

      if (idx === frameRef.current) return;
      frameRef.current = idx;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const img = imagesRef.current[idx];
        if (!img?.complete) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        drawCover(ctx, img);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // sync on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  // ── Reduced-motion: plain ambient video fallback ───────────────────────────
  if (reduced) {
    return (
      <section className="relative min-h-screen-vh flex items-center bg-cinema overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-abyss/90 via-abyss/50 to-abyss/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent to-abyss/60 pointer-events-none" />
        <HeroContent />
      </section>
    );
  }

  return (
    /*
     * The outer div is 300vh tall — this gives us scroll distance to map
     * against. The inner section is sticky so it pins to the viewport while
     * the parent scrolls. We use --vh instead of svh for cross-OS compat.
     */
    <div ref={wrapperRef} className="relative h-scrub-area-lg">
      <section className="sticky top-0 h-screen-vh flex items-center bg-cinema overflow-hidden">

        {/* ── Frame canvas — fills the viewport ──────────────────────────── */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full opacity-55 will-change-auto"
        />

        {/* ── Depth veils ────────────────────────────────────────────────── */}
        <div className="absolute inset-0 bg-gradient-to-r from-abyss/85 via-abyss/40 to-abyss/15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent to-abyss/55 pointer-events-none" />

        {/* ── Cold-light aurora orbs ─────────────────────────────────────── */}
        <div
          aria-hidden="true"
          className="absolute -top-32 right-[8%] w-[480px] h-[480px] rounded-full blur-[120px] animate-aurora-drift pointer-events-none"
          style={{ background: "hsl(var(--primary) / 0.16)" }}
        />
        <div
          aria-hidden="true"
          className="absolute bottom-[-20%] left-[-5%] w-[420px] h-[420px] rounded-full blur-[110px] animate-aurora-drift pointer-events-none"
          style={{ background: "hsl(var(--electric) / 0.10)", animationDelay: "-9s" }}
        />

        {/* ── Engineering grid + airflow streamlines ─────────────────────── */}
        <div className="absolute inset-0 grid-lines pointer-events-none" />
        <AirflowCanvas className="absolute inset-0 w-full h-full" />

        {/* ── Scroll-progress indicator bar ─────────────────────────────── */}
        <ScrollProgressBar wrapperRef={wrapperRef} />

        {/* ── Hero content ───────────────────────────────────────────────── */}
        <HeroContent />

        {/* ── Scroll cue ─────────────────────────────────────────────────── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
          <span className="text-white/30 text-[9px] uppercase tracking-[0.34em] font-bold">
            Scroll
          </span>
          <div className="w-5 h-9 rounded-full border border-white/20 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-ice/80 animate-scroll-cue" />
          </div>
        </div>
      </section>
    </div>
  );
};

// ── Thin ice-blue progress bar along top edge ──────────────────────────────────
const ScrollProgressBar = ({
  wrapperRef,
}: {
  wrapperRef: React.RefObject<HTMLDivElement>;
}) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current;
      const bar = barRef.current;
      if (!wrapper || !bar) return;
      const { top, height } = wrapper.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -top / scrollable));
      bar.style.transform = `scaleX(${progress})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [wrapperRef]);

  return (
    <div className="absolute top-0 left-0 right-0 h-[2px] z-20 bg-white/5">
      <div
        ref={barRef}
        className="h-full origin-left"
        style={{
          background: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--ice)))",
          transform: "scaleX(0)",
          willChange: "transform",
        }}
      />
    </div>
  );
};

// ── Hero copy (shared between both render paths) ───────────────────────────────
const HeroContent = () => (
  <motion.div
    className="relative z-10 w-full px-6 md:px-16 lg:px-24 pt-28 pb-24"
    initial="hidden"
    animate="visible"
    variants={stagger}
  >
    <div className="max-w-3xl">
      <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
        <span className="flex items-center gap-2 rounded-full glass-card px-4 py-1.5">
          <span className="text-ice text-[10px] font-bold uppercase tracking-[0.28em]">
            Authorised HVAC Dealer
          </span>
        </span>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="text-4xl md:text-6xl lg:text-[4.2rem] font-black leading-[1.04] mb-6 tracking-tight text-balance"
      >
        <span className="text-white">Advanced Climate</span>
        <br />
        <span className="text-ice-gradient">Engineering Solutions</span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="text-base md:text-lg text-white/60 mb-10 leading-relaxed max-w-xl font-light"
      >
        Authorised dealer for Carrier, Midea &amp; Toshiba — precision HVAC
        for Puducherry &amp; Chennai since 1999.
      </motion.p>

      <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
        <Magnetic>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-electric text-white px-8 py-4 font-bold text-sm uppercase tracking-wide shadow-[0_0_28px_hsl(var(--primary)/0.35)] hover:shadow-[0_0_44px_hsl(var(--primary)/0.55)] active:scale-[0.98] transition-shadow duration-300"
          >
            Get a Free Quote
            <ArrowRight size={15} />
          </Link>
        </Magnetic>
        <Link
          to="/about"
          className="inline-flex items-center gap-2 rounded-full glass-card text-white px-8 py-4 font-bold text-sm uppercase tracking-wide hover:bg-white/10 transition-colors duration-300"
        >
          About Us
        </Link>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="mt-12 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-white/35 font-semibold"
      >
        <span className="h-px w-10 bg-gradient-to-r from-ice/60 to-transparent" />
        Carrier · Toshiba · Midea
      </motion.div>
    </div>
  </motion.div>
);

export default VideoScrubHero;
