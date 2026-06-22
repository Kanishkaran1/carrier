import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Wind, ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center bg-cinema overflow-hidden pt-40 pb-20 px-6">
      <div className="absolute inset-0 grid-lines pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "hsl(var(--primary) / 0.14)" }}
      />

      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="flex items-center gap-2 rounded-full glass-card px-4 py-1.5">
            <Wind size={12} className="text-ice" strokeWidth={2.5} />
            <span className="text-ice text-[10px] font-bold uppercase tracking-[0.28em]">
              Error 404
            </span>
          </span>
        </div>
        <h1 className="text-7xl md:text-9xl font-black tracking-tight text-ice-gradient mb-4">
          404
        </h1>
        <p className="text-white/60 text-base md:text-lg mb-10">
          Oops! Page not found
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-electric text-white px-8 py-4 font-bold text-sm uppercase tracking-wide shadow-[0_0_28px_hsl(var(--primary)/0.35)] hover:shadow-[0_0_44px_hsl(var(--primary)/0.55)] active:scale-[0.98] transition-shadow duration-300"
        >
          Return to Home
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
