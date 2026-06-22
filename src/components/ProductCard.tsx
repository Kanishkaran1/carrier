import TiltCard from "@/components/TiltCard";

/**
 * ProductCard — the shared product tile used across every brand/category page.
 *
 * Previously this markup was duplicated inline across 14 product pages; it now
 * lives here once and gains the premium TiltCard depth treatment (3D tilt +
 * lift + ice glow), tuned for a light surface (glare disabled — it reads as
 * white-on-white). Content/structure are otherwise identical to the original.
 */

interface ProductCardProps {
  image: string;
  title: string;
}

const ProductCard = ({ image, title }: ProductCardProps) => (
  <TiltCard
    className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col h-full"
    glare={false}
    max={5}
    lift={5}
  >
    <div className="p-8 flex-1 flex items-center justify-center bg-white min-h-[300px]">
      <img
        src={image}
        alt={title}
        loading="lazy"
        decoding="async"
        className="w-full h-auto object-contain max-h-[250px] transform group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="bg-secondary p-4 text-center">
      <h3 className="text-white font-medium text-sm md:text-base">{title}</h3>
    </div>
  </TiltCard>
);

export default ProductCard;
