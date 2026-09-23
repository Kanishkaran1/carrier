import TiltCard from "@/components/TiltCard";
import { ArrowRight } from "lucide-react";

/**
 * ProductCard — the shared product tile used across every brand/category page.
 *
 * Fully modernized with interactive glass reflection (glare), sharp borders,
 * left-aligned specifications, and an engineering-grade action indicator.
 */

interface ProductCardProps {
  image: string;
  title: string;
}

const ProductCard = ({ image, title }: ProductCardProps) => (
  <div className="rounded-xl p-px border-gradient-ice h-full">
    <TiltCard
      className="glass-card rounded-xl overflow-hidden shadow-lg flex flex-col h-full group"
      glare={true}
      glareMaxOpacity={0.12}
      max={6}
      lift={6}
    >
      <div className="p-8 flex-1 flex items-center justify-center min-h-[300px]">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-contain max-h-[240px] transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="bg-abyss/30 p-5 text-left border-t border-white/5 flex items-center justify-between gap-4">
        <h3 className="text-white font-semibold text-sm md:text-[15px] leading-snug flex-1">
          {title}
        </h3>
        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-all duration-300 text-ice group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:shadow-[0_0_12px_hsl(var(--primary)/0.4)]">
          <ArrowRight size={14} className="transform group-hover:translate-x-0.5 transition-transform duration-300" />
        </div>
      </div>
    </TiltCard>
  </div>
);

export default ProductCard;
