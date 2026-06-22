import { useEffect, useRef } from "react";

/**
 * Cold-air streamline simulation — lightweight 2D canvas.
 *
 * Performance contract:
 *  - DPR capped at 2, particle count scaled to viewport width
 *  - rAF loop is delta-time based (frame-rate independent)
 *  - Paused when offscreen (IntersectionObserver) or tab hidden
 *  - Never mounts under prefers-reduced-motion
 *  - Zero React re-renders after mount; everything lives in refs
 */

interface Particle {
  x: number;
  y: number;
  speed: number;
  amplitude: number;
  wavelength: number;
  phase: number;
  baseY: number;
  length: number;
  opacity: number;
  hueShift: number;
}

const AirflowCanvas = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let visible = true;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let lastTime = performance.now();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const spawn = (w: number, h: number, randomX = true): Particle => {
      const baseY = Math.random() * h;
      return {
        x: randomX ? Math.random() * w : w + 20,
        y: baseY,
        baseY,
        speed: 28 + Math.random() * 55,            // px/s, right→left drift
        amplitude: 6 + Math.random() * 22,
        wavelength: 220 + Math.random() * 360,
        phase: Math.random() * Math.PI * 2,
        length: 30 + Math.random() * 90,
        opacity: 0.05 + Math.random() * 0.16,
        hueShift: Math.random() * 18 - 9,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Scale particle density to viewport — fewer on mobile
      const count = width < 640 ? 26 : width < 1024 ? 42 : 60;
      particles = Array.from({ length: count }, () => spawn(width, height));
    };

    const draw = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - lastTime) / 1000, 0.05); // clamp tab-switch jumps
      lastTime = now;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";

      for (const p of particles) {
        p.x -= p.speed * dt;
        p.y = p.baseY + Math.sin((p.x / p.wavelength) * Math.PI * 2 + p.phase) * p.amplitude;

        if (p.x + p.length < -20) {
          Object.assign(p, spawn(width, height, false));
          continue;
        }

        // Streak: gradient stroke fading toward the tail
        const tailX = p.x + p.length;
        const tailY = p.baseY + Math.sin((tailX / p.wavelength) * Math.PI * 2 + p.phase) * p.amplitude;

        const grad = ctx.createLinearGradient(p.x, p.y, tailX, tailY);
        grad.addColorStop(0, `hsla(${192 + p.hueShift}, 100%, 68%, ${p.opacity})`);
        grad.addColorStop(1, "hsla(200, 100%, 60%, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        // Slight curve through the midpoint for an organic streamline
        const midX = p.x + p.length / 2;
        const midY = p.baseY + Math.sin((midX / p.wavelength) * Math.PI * 2 + p.phase) * p.amplitude;
        ctx.quadraticCurveTo(midX, midY, tailX, tailY);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!running && visible && !document.hidden) {
        running = true;
        lastTime = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    />
  );
};

export default AirflowCanvas;
