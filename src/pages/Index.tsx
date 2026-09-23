import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import AirflowCanvas from "@/components/AirflowCanvas";
import TiltCard from "@/components/TiltCard";
import VideoScrubHero from "@/components/VideoScrubHero";

// Last section of the page — the form stack (react-hook-form, zod, emailjs)
// stays out of the critical bundle.
const ContactForm = lazy(() => import("@/components/ContactForm"));
import { Link } from "react-router-dom";
import {
  AirVent,
  Building2,
  Wrench,
  ShieldCheck,
  Settings,
  Hammer,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Star,
  Clock,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
  ThumbsUp,
  Wind,
} from "lucide-react";

// ─── Motion language ──────────────────────────────────────────────────────────
// One easing curve everywhere — motion feels like a single system.

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: 36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ─── Animated Counter ─────────────────────────────────────────────────────────

const AnimatedCounter = ({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

// ─── Magnetic CTA — subtle cursor-follow physics on desktop ──────────────────

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${dx * 0.12}px, ${dy * 0.18}px)`;
  }, []);

  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  }, []);

  if (reduced) return <>{children}</>;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block transition-transform duration-300 ease-out will-change-transform"
    >
      {children}
    </div>
  );
};

// ─── Cinematic hero ───────────────────────────────────────────────────────────
// The mp4 plays FORWARD as an ambient loop (hardware-decoded — cheap), instead
// of being scroll-scrubbed (decode-bound — the source of the old jank).
// Scroll storytelling happens via transform-only parallax. Native scroll stays.

const CinematicHero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();


  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Transform/opacity only — composited on GPU, never touches layout
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.55]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center bg-cinema overflow-hidden"
    >
      {/* Ambient engineering footage — skipped entirely under reduced motion */}
      {!reduced && (
        <motion.video
          src={`${import.meta.env.BASE_URL}videos/AC_animation.mp4`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-hidden="true"
          style={{ scale: videoScale }}
          className="absolute inset-0 w-full h-full object-cover opacity-40 will-change-transform"
        />
      )}

      {/* Depth veils */}
      <div className="absolute inset-0 bg-gradient-to-r from-abyss/90 via-abyss/45 to-abyss/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent to-abyss/60 pointer-events-none" />

      {/* Cold-light aurora orbs */}
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

      {/* Engineering grid + airflow streamlines */}
      <div className="absolute inset-0 grid-lines pointer-events-none" />
      <AirflowCanvas className="absolute inset-0 w-full h-full" />


      {/* Scroll-out veil — hero recedes into darkness as the next act enters */}
      <motion.div
        className="absolute inset-0 bg-abyss pointer-events-none"
        style={{ opacity: veilOpacity }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full px-6 md:px-16 lg:px-24 pt-28 pb-24"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
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
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-white/30 text-[9px] uppercase tracking-[0.34em] font-bold">
          Scroll
        </span>
        <div className="w-5 h-9 rounded-full border border-white/20 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-ice/80 animate-scroll-cue" />
        </div>
      </div>
    </section>
  );
};

// ─── Data (content unchanged) ─────────────────────────────────────────────────

const stats = [
  { value: 25, suffix: "+", label: "Years of Experience", icon: Award },
  { value: 3, suffix: "", label: "Premium Brands", icon: Star },
  { value: 500, suffix: "+", label: "Projects Completed", icon: CheckCircle2 },
  { value: 2, suffix: "", label: "Service Locations", icon: MapPin },
];

const brands = [
  {
    name: "Carrier",
    tagline: "Inventor of modern air conditioning",
    description:
      "World-leading HVAC solutions trusted by businesses and homeowners globally. Window, Hi-Wall, Ducted, Cassette, Slimpak, Packaged & VRF systems.",
    image: `${import.meta.env.BASE_URL}images/carrier.jpg`,
    link: "/products/carrier/hi-wall-ac",
  },
  {
    name: "Toshiba",
    tagline: "Japanese precision engineering",
    description:
      "Advanced inverter technology and ultra-quiet operation. Hi-Wall, Cassette, Ducted and VRF systems built for reliability in demanding climates.",
    image: `${import.meta.env.BASE_URL}images/toshiba.jpg`,
    link: "/products/toshiba/hi-wall-ac",
  },
  {
    name: "Midea",
    tagline: "Innovation-driven comfort technology",
    description:
      "Smart, energy-efficient climate solutions for modern living. Window, Hi-Wall units and a full range of home appliances.",
    image: `${import.meta.env.BASE_URL}images/midea.jpg`,
    link: "/products/midea/hi-wall-ac",
  },
];

const services = [
  {
    icon: Hammer,
    title: "New Installation",
    description:
      "Certified installation of residential and commercial AC systems, handled end-to-end by our factory-trained engineers.",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description:
      "Scheduled preventive maintenance to keep your units running at peak efficiency and extend system lifespan.",
  },
  {
    icon: Settings,
    title: "Repair Services",
    description:
      "Fast, reliable diagnosis and repair for all major brands. Minimise downtime with our rapid response team.",
  },
  {
    icon: ShieldCheck,
    title: "AMC Plans",
    description:
      "Annual Maintenance Contracts with priority service, regular check-ups and discounted repair rates.",
  },
];

const reasons = [
  {
    icon: Award,
    title: "Authorised Dealer",
    description:
      "Official dealership from Carrier, Toshiba and Midea — genuine parts and full manufacturer warranties on every job.",
  },
  {
    icon: Users,
    title: "Expert Engineers",
    description:
      "Our field team is factory-trained and regularly certified, ensuring installations and repairs meet OEM standards.",
  },
  {
    icon: Clock,
    title: "Prompt Response",
    description:
      "Same-day site visits for breakdowns. Scheduled maintenance at a time that suits you — no waiting weeks.",
  },
  {
    icon: ThumbsUp,
    title: "Trusted Since 1999",
    description:
      "Over two decades across Puducherry and Chennai with a client roster that includes national and global brands.",
  },
];

const clients = [
  "Canara Bank",
  "Capgemini",
  "TATA",
  "Levi's",
  "TATA Motors",
  "Aditya Birla",
  "Tonino",
  "Larsen & Toubro",
  "Adidas",
  "Swaminarayan Akshardham",
  "Dr Lal PathLabs",
  "Syndicate Bank",
  "Red Cross",
  "Cafe Coffee Day",
  "State Bank of India",
  "Chai Point",
  "Reebok",
  "Lifestyle",
  "Spencer's",
  "M2K",
  "Parsvnath",
  "Punjab National Bank",
  "Union Bank of India",
];

// ─── Section heading helper ────────────────────────────────────────────────────

const SectionLabel = ({
  children,
  center = false,
}: {
  children: React.ReactNode;
  center?: boolean;
}) => (
  <div className={`flex items-center gap-2.5 mb-4 ${center ? "justify-center" : ""}`}>
    <Wind size={13} className="text-primary" strokeWidth={2.5} />
    <span className="text-primary text-[10px] font-bold uppercase tracking-[0.28em]">
      {children}
    </span>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const Index = () => {
  return (
    <div>

      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <VideoScrubHero />

      {/* ── 2. ENGINEERING STATS — floating glass band ───────────────────── */}
      <section className="bg-cinema relative overflow-hidden px-6 pb-20 -mt-px">
        <div className="absolute inset-0 dot-grid pointer-events-none" />

        <motion.div
          className="container mx-auto relative z-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="rounded-2xl p-px border-gradient-ice">
            <div className="rounded-2xl glass-card grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
              {stats.map(({ value, suffix, label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center py-10 px-4 gap-1.5 text-center group"
                >
                  <Icon
                    size={20}
                    className="text-ice mb-2 opacity-70 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_hsl(var(--ice)/0.6)] transition-all duration-300"
                  />
                  <span className="text-4xl lg:text-5xl font-black text-white leading-none tabular-nums">
                    <AnimatedCounter target={value} suffix={suffix} />
                  </span>
                  <span className="text-white/40 text-[10px] uppercase tracking-[0.22em] font-medium mt-1">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── 3. ABOUT — editorial split ───────────────────────────────────── */}
      <section className="py-28 px-6 bg-gradient-to-b from-background to-muted/60">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image with layered depth */}
          <motion.div
            className="relative"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/15 via-transparent to-electric/10 blur-xl" aria-hidden="true" />
            <img
              src={`${import.meta.env.BASE_URL}images/welcome.jpg`}
              alt="Comfort Aircon team"
              className="relative w-full h-[420px] object-cover rounded-2xl shadow-2xl shadow-secondary/20"
              loading="lazy"
            />
            <div className="absolute -bottom-6 md:-right-6 right-0 rounded-xl bg-gradient-to-br from-primary to-electric text-white px-8 py-5 shadow-2xl shadow-primary/30 animate-float-y">
              <span className="block text-4xl font-black leading-none">25+</span>
              <span className="text-[10px] uppercase tracking-[0.22em] font-bold opacity-85">
                Years of Trust
              </span>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="lg:pl-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Est. 1999</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-secondary leading-tight mb-5 tracking-tight text-balance"
            >
              Your Trusted HVAC Partner
              <br />
              in South India
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-4 text-[15px]">
              Comfort Aircon is an authorised dealer and distributor of Carrier,
              Midea and Toshiba air conditioning systems, operating since 1999
              with offices in Puducherry and Chennai.
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-8 text-[15px]">
              From single-room splits to large-scale VRF systems for commercial
              complexes, we handle design, supply, installation and ongoing
              maintenance — a single accountable partner for all your climate
              control needs.
            </motion.p>

            <motion.ul variants={stagger} className="space-y-2.5 mb-9">
              {[
                "Factory-trained installation engineers",
                "Genuine OEM parts & full warranties",
                "Residential and commercial expertise",
                "Rapid response maintenance support",
              ].map((pt) => (
                <motion.li
                  key={pt}
                  variants={fadeUp}
                  className="flex items-center gap-2.5 text-sm text-foreground"
                >
                  <CheckCircle2
                    size={15}
                    className="text-primary shrink-0"
                    strokeWidth={2.5}
                  />
                  {pt}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp}>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-8 py-3.5 font-bold text-sm uppercase tracking-wide hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/25 transition-all duration-300"
              >
                Learn About Us <ArrowRight size={15} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. AUTHORIZED BRANDS — spotlight glass cards ─────────────────── */}
      <section className="py-28 px-6 bg-cinema relative overflow-hidden">
        <div className="absolute inset-0 grid-lines pointer-events-none opacity-60" />
        <div
          aria-hidden="true"
          className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[700px] h-[380px] rounded-full blur-[130px] pointer-events-none"
          style={{ background: "hsl(var(--primary) / 0.10)" }}
        />

        <div className="container mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionLabel center>Our Brands</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight text-balance">
              Authorised Dealer for 3 Premium Brands
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {brands.map((brand) => (
              <motion.div key={brand.name} variants={fadeUp} className="h-full">
                <TiltCard className="rounded-2xl glass-card flex flex-col h-full">
                  {/* Logo panel */}
                  <div className="m-5 mb-0 rounded-xl bg-white flex items-center justify-center h-36 overflow-hidden">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      loading="lazy"
                      className="max-h-24 w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-ice text-[10px] font-bold uppercase tracking-[0.25em] mb-1.5">
                      {brand.tagline}
                    </span>
                    <h3 className="text-xl font-black text-white mb-3">
                      {brand.name}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">
                      {brand.description}
                    </p>
                    <Link
                      to={brand.link}
                      className="inline-flex items-center gap-1.5 text-ice font-bold text-sm uppercase tracking-wide group-hover:gap-3 transition-all duration-200"
                    >
                      View Products <ChevronRight size={15} />
                    </Link>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. SERVICES ──────────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: heading + service cards */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>What We Do</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl lg:text-5xl font-black text-secondary leading-tight mb-5 tracking-tight text-balance"
              >
                End-to-End HVAC
                <br />
                Service &amp; Support
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-muted-foreground leading-relaxed mb-9 text-[15px]"
              >
                Whether you need a new system installed, existing units
                serviced, or a long-term maintenance partner — our certified
                team covers all major brands across Puducherry and Chennai.
              </motion.p>

              <motion.div
                variants={stagger}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {services.map(({ icon: Icon, title, description }) => (
                  <motion.div
                    key={title}
                    variants={fadeUp}
                    className="group rounded-xl p-5 border border-border bg-card hover:border-primary/40 hover:shadow-[0_12px_36px_hsl(var(--primary)/0.10)] hover:-translate-y-1 transition-all duration-300 cursor-default"
                  >
                    <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary/[0.12] to-electric/[0.08] flex items-center justify-center mb-3.5 group-hover:from-primary/20 group-hover:to-electric/15 group-hover:shadow-[0_0_18px_hsl(var(--primary)/0.25)] transition-all duration-300">
                      <Icon size={19} className="text-primary" strokeWidth={2} />
                    </div>
                    <h4 className="font-bold text-secondary text-sm mb-1.5">
                      {title}
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-9">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-electric text-white px-8 py-3.5 font-bold text-sm uppercase tracking-wide hover:shadow-[0_0_28px_hsl(var(--primary)/0.4)] transition-shadow duration-300"
                >
                  All Services <ArrowRight size={15} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: image with floating glass card */}
            <motion.div
              className="relative h-[500px] lg:h-auto overflow-hidden rounded-2xl"
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/ourserviceleft.webp`}
                alt="AC service technician at work"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss/75 via-abyss/10 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 rounded-xl glass-card p-5">
                <p className="text-white font-bold text-sm mb-1">
                  Need urgent AC repair?
                </p>
                <p className="text-white/55 text-xs mb-3">
                  Same-day service in Puducherry &amp; Chennai.
                </p>
                <a
                  href="tel:+919843020458"
                  className="inline-flex items-center gap-2 text-ice font-bold text-sm hover:gap-3 transition-all"
                >
                  <Phone size={13} strokeWidth={2.5} />
                  +91 98430 20458
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. WHY CHOOSE US — numbered engineering tiles ────────────────── */}
      <section className="py-28 px-6 bg-cinema relative overflow-hidden">
        <div className="absolute inset-0 dot-grid pointer-events-none opacity-50" />

        <div className="container mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionLabel center>Why Comfort Aircon</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight text-balance">
              The Comfort Aircon Difference
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {reasons.map(({ icon: Icon, title, description }, i) => (
              <motion.div key={title} variants={fadeUp} className="h-full">
                <TiltCard className="rounded-2xl glass-card p-7 h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-electric/10 border border-ice/15 flex items-center justify-center group-hover:shadow-[0_0_22px_hsl(var(--ice)/0.25)] transition-shadow duration-300">
                      <Icon size={22} className="text-ice" strokeWidth={1.8} />
                    </div>
                    <span className="text-white/10 font-black text-5xl leading-none select-none tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-[15px] mb-2">{title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{description}</p>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 7. PRODUCT CATEGORIES ────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-gradient-to-b from-background to-muted/60">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionLabel center>Product Range</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-secondary tracking-tight text-balance">
              Solutions for Every Space
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                icon: AirVent,
                title: "Residential Air Conditioners",
                description:
                  "Split, window and inverter units for homes, apartments and small offices — from India's top brands.",
                link: "/products",
              },
              {
                icon: Building2,
                title: "Commercial Air Conditioners",
                description:
                  "Cassette, ducted, packaged and VRF systems engineered for offices, retail spaces and large commercial properties.",
                link: "/products",
              },
            ].map(({ icon: Icon, title, description, link }) => (
              <motion.div key={title} variants={fadeUp}>
                <Link
                  to={link}
                  className="group relative rounded-2xl bg-secondary p-9 flex flex-col overflow-hidden h-full hover:shadow-[0_20px_60px_hsl(var(--primary)/0.20)] hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Inner cold glow on hover */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(420px circle at 85% -10%, hsl(var(--primary) / 0.22), transparent 60%)",
                    }}
                  />
                  <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-electric flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
                    <Icon size={26} className="text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="relative font-black text-white text-xl mb-2.5 tracking-tight">
                    {title}
                  </h3>
                  <p className="relative text-white/55 text-sm leading-relaxed mb-6 flex-1">
                    {description}
                  </p>
                  <span className="relative inline-flex items-center gap-1.5 text-ice font-bold text-sm uppercase tracking-wide group-hover:gap-3 transition-all duration-200">
                    Browse Range <ChevronRight size={15} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 8. CLIENT TICKER ─────────────────────────────────────────────── */}
      <section className="py-20 bg-cinema relative overflow-hidden">
        <div className="absolute inset-0 dot-grid pointer-events-none opacity-40" />

        <motion.div
          className="container mx-auto px-6 mb-10 text-center relative z-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionLabel center>Our Clients</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Trusted by Leading Organisations
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-abyss to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-abyss to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden relative z-0">
            <div className="flex w-max animate-marquee gap-4 items-center px-6 hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:w-full motion-reduce:justify-center">
              {[...clients, ...clients].map((c, index) => (
                <span
                  key={`${c}-${index}`}
                  className="rounded-full glass-card font-semibold text-sm text-white/45 whitespace-nowrap px-5 py-2 tracking-wide hover:text-white/80 transition-colors"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-10 relative z-10">
          <Link
            to="/clients"
            className="inline-flex items-center gap-1.5 text-ice font-bold text-sm uppercase tracking-wide hover:gap-3 transition-all duration-200"
          >
            See All Clients <ChevronRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── 9. LEAD GEN / CONTACT ────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-cinema text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-lines pointer-events-none opacity-70" />
        <div
          aria-hidden="true"
          className="absolute bottom-[-25%] right-[-8%] w-[560px] h-[560px] rounded-full blur-[130px] animate-aurora-drift pointer-events-none"
          style={{ background: "hsl(var(--primary) / 0.12)" }}
        />

        <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: info */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Get in Touch</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-5 tracking-tight text-balance"
            >
              <span className="text-white">Ready to Upgrade</span>
              <br />
              <span className="text-ice-gradient">Your Comfort?</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/55 leading-relaxed mb-10 max-w-md text-[15px] font-light"
            >
              Tell us about your space and requirements. Our team will
              recommend the right system, provide a detailed quote and schedule
              a site visit — completely free.
            </motion.p>

            <motion.ul variants={stagger} className="space-y-5 mb-10">
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  value:
                    "295, Thiruvalluvar Salai, Raja Nagar, Pudupalaiyam, Puducherry — 605013",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+91 98430 20458",
                  href: "tel:+919843020458",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "admin@comfortair.co.in",
                  href: "mailto:admin@comfortair.co.in",
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <motion.li
                  key={label}
                  variants={fadeUp}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg glass-card flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={15} className="text-ice" strokeWidth={2} />
                  </div>
                  <div>
                    <span className="block text-white/35 text-[9px] uppercase tracking-[0.22em] mb-0.5 font-medium">
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="text-white text-sm font-medium hover:text-ice transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-white text-sm font-medium">{value}</span>
                    )}
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp}>
              <a
                href="https://wa.me/919843020458"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass-card text-white px-7 py-3 font-bold text-sm uppercase tracking-wide hover:bg-white/10 hover:glow-ice transition-all duration-300"
              >
                Chat on WhatsApp
                <ArrowRight size={14} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right: glass form panel */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="rounded-2xl p-px border-gradient-ice">
              <div className="rounded-2xl glass-card p-8 min-h-[420px]">
                <Suspense fallback={null}>
                  <ContactForm />
                </Suspense>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
