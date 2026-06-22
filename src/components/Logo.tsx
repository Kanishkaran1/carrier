import { Link } from "react-router-dom";

interface LogoProps {
  /** "full" = full lockup with wordmark, "mark" = snowflake symbol only */
  variant?: "full" | "mark";
  className?: string;
  imgClassName?: string;
}

const SOURCES = {
  full: {
    src: "/images/logo/full_logo.png",
    webp: "/images/logo/full_logo.webp",
    alt: "Comfort Aircon — Reach For The Sky",
    width: 364,
    height: 122,
  },
  mark: {
    src: "/images/logo/ca_snowflake.png",
    webp: "/images/logo/ca_snowflake.webp",
    alt: "Comfort Aircon",
    width: 316,
    height: 190,
  },
} as const;

const Logo = ({ variant = "full", className = "", imgClassName = "" }: LogoProps) => {
  const { src, webp, alt, width, height } = SOURCES[variant];

  return (
    <Link
      to="/"
      aria-label="Comfort Aircon — Home"
      className={`group inline-flex items-center shrink-0 ${className}`}
    >
      <picture>
        <source srcSet={webp} type="image/webp" />
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          decoding="async"
          className={`w-auto object-contain animate-fade-in transition-[filter,height] duration-300 ease-out group-hover:drop-shadow-[0_0_18px_hsl(var(--primary)/0.55)] ${imgClassName}`}
        />
      </picture>
    </Link>
  );
};

export default Logo;
