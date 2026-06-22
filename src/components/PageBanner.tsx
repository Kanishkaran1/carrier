import { Link } from "react-router-dom";
import { ChevronRight, Wind } from "lucide-react";

interface PageBannerProps {
  title: string;
  breadcrumb?: string;
}

const PageBanner = ({ title, breadcrumb }: PageBannerProps) => {
  return (
    <div className="relative bg-cinema pt-36 pb-16 px-6 overflow-hidden">
      {/* Engineering texture + cold-light glow */}
      <div className="absolute inset-0 grid-lines pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute -top-24 right-[10%] w-[420px] h-[300px] rounded-full blur-[110px] pointer-events-none"
        style={{ background: "hsl(var(--primary) / 0.14)" }}
      />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ice/25 to-transparent" />

      <div className="container mx-auto relative z-10">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="inline-flex items-center gap-1.5 rounded-full glass-card px-4 py-1.5 text-xs text-white/45">
              <li>
                <Link to="/" className="hover:text-ice transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="flex">
                <ChevronRight size={12} className="text-white/25" />
              </li>
              <li className="text-white/75 font-medium">{breadcrumb}</li>
            </ol>
          </nav>
        )}

        <div className="flex items-center gap-3 mb-3">
          <Wind size={14} className="text-ice" strokeWidth={2.5} />
          <span className="h-px w-12 bg-gradient-to-r from-ice/60 to-transparent" />
        </div>

        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white text-balance">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default PageBanner;
