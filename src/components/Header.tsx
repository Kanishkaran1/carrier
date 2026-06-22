import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Phone, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";

const brands = [
  {
    label: "Toshiba",
    products: [
      { label: "Hi Wall AC", link: "/products/toshiba/hi-wall-ac" },
      { label: "Cassette AC", link: "/products/toshiba/cassette-ac" },
      { label: "Ducted AC", link: "/products/toshiba/ducted-ac" },
      { label: "VRF System", link: "/products/toshiba/vrf-system" },
    ],
  },
  {
    label: "Carrier",
    products: [
      { label: "Window AC", link: "/products/carrier/window-ac" },
      { label: "Hi Wall AC", link: "/products/carrier/hi-wall-ac" },
      { label: "Ducted AC", link: "/products/carrier/ducted-ac" },
      { label: "Cassette AC", link: "/products/carrier/cassette-ac" },
      { label: "Slimpak AC", link: "/products/carrier/slimpak-ac" },
      { label: "Package AC", link: "/products/carrier/packaged-ac" },
      { label: "VRF System", link: "/products/carrier/vrf-system" },
    ],
  },
  {
    label: "Midea",
    products: [
      { label: "Window AC", link: "/products/midea/window-ac" },
      { label: "Hi Wall AC", link: "/products/midea/hi-wall-ac" },
      { label: "Home Appliances", link: "/products/midea/home-appliances" },
    ],
  },
];

const mainNav = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
];

const afterNav = [
  { label: "Services", path: "/services" },
  { label: "Our Clients", path: "/clients" },
  { label: "Contact Us", path: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [mobileBrandOpen, setMobileBrandOpen] = useState<string | null>(null);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const location = useLocation();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const wasMobileOpenRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setActiveBrand(null);
    setMobileBrandOpen(null);
    setMobileProductsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu open (iOS Safari ignores overflow:hidden
  // on body while the page is scrolled, so pin its position too)
  useEffect(() => {
    if (!mobileOpen) return;
    const scrollY = window.scrollY;
    const { body } = document;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflow = "hidden";
    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  // Close drawer / mega-menu on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobileOpen) setMobileOpen(false);
      if (productsOpen) {
        setProductsOpen(false);
        setActiveBrand(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, productsOpen]);

  // Move focus into the drawer on open, and back to the trigger on close
  useEffect(() => {
    if (mobileOpen) {
      wasMobileOpenRef.current = true;
      closeButtonRef.current?.focus();
    } else if (wasMobileOpenRef.current) {
      wasMobileOpenRef.current = false;
      hamburgerRef.current?.focus();
    }
  }, [mobileOpen]);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const isProductsActive = location.pathname.startsWith("/products");

  const handleProductsBlur = (e: React.FocusEvent<HTMLLIElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setProductsOpen(false);
      setActiveBrand(null);
    }
  };

  const handleDrawerKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !drawerRef.current) return;
    const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const desktopLink = (path: string, label: string) => (
    <li key={label} className="relative">
      <Link
        to={path}
        className={`relative block px-4 py-2 text-[12.5px] font-bold uppercase tracking-wider rounded-full transition-colors duration-200 ${
          isActive(path)
            ? "text-white"
            : "text-white/60 hover:text-white hover:bg-white/5"
        }`}
      >
        {label}
        {isActive(path) && (
          <motion.span
            layoutId="nav-pill"
            className="absolute inset-0 -z-10 rounded-full bg-white/10 border border-white/10"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
        )}
      </Link>
    </li>
  );

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50">
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? "glass-nav shadow-[0_8px_40px_hsl(var(--abyss)/0.5)]"
              : "bg-gradient-to-b from-abyss/85 to-transparent"
          }`}
        >
          <div
            className={`container mx-auto px-5 flex items-center justify-between gap-4 transition-all duration-300 ${
              scrolled ? "h-16" : "h-20"
            }`}
          >
            {/* Logo */}
            <Logo
              variant="mark"
              className="md:hidden"
              imgClassName={scrolled ? "h-10" : "h-11"}
            />
            <Logo
              variant="full"
              className="hidden md:inline-flex"
              imgClassName={scrolled ? "h-12 lg:h-14" : "h-14 lg:h-[68px]"}
            />

            {/* Desktop nav */}
            <nav aria-label="Main navigation" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {mainNav.map((item) => desktopLink(item.path, item.label))}

                {/* Products mega-menu */}
                <li
                  className="relative"
                  onMouseEnter={() => {
                    setProductsOpen(true);
                    setActiveBrand((prev) => prev ?? brands[0].label);
                  }}
                  onMouseLeave={() => {
                    setProductsOpen(false);
                    setActiveBrand(null);
                  }}
                  onBlur={handleProductsBlur}
                >
                  <button
                    type="button"
                    aria-expanded={productsOpen}
                    aria-haspopup="true"
                    onClick={() => setProductsOpen((o) => !o)}
                    className={`relative flex items-center gap-1.5 px-4 py-2 text-[12.5px] font-bold uppercase tracking-wider rounded-full transition-colors duration-200 ${
                      isProductsActive
                        ? "text-white"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    Products
                    <motion.span
                      animate={{ rotate: productsOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex"
                    >
                      <ChevronDown size={13} />
                    </motion.span>
                    {isProductsActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-white/10 border border-white/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </button>

                  <AnimatePresence>
                    {productsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-3"
                      >
                        <div
                          className="flex rounded-2xl overflow-hidden shadow-[0_24px_80px_hsl(var(--abyss)/0.8)] border border-white/10"
                          style={{
                            minWidth: 480,
                            background: "hsl(var(--abyss) / 0.92)",
                            backdropFilter: "blur(24px) saturate(1.4)",
                            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
                          }}
                        >
                          {/* Brand list */}
                          <div className="w-[190px] border-r border-white/[0.08] bg-white/[0.03]">
                            <div className="px-4 py-3 border-b border-white/[0.08]">
                              <span className="text-[9px] uppercase tracking-[0.2em] text-white/35 font-bold">
                                Select Brand
                              </span>
                            </div>
                            {brands.map((brand) => (
                              <button
                                key={brand.label}
                                onMouseEnter={() => setActiveBrand(brand.label)}
                                onFocus={() => setActiveBrand(brand.label)}
                                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors ${
                                  activeBrand === brand.label
                                    ? "bg-gradient-to-r from-primary/25 to-transparent text-ice"
                                    : "text-white/65 hover:text-white hover:bg-white/5"
                                }`}
                              >
                                {brand.label}
                                <ChevronDown
                                  size={12}
                                  className={`-rotate-90 ${
                                    activeBrand === brand.label
                                      ? "text-ice"
                                      : "text-white/30"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>

                          {/* Product links */}
                          <div className="flex-1 py-2">
                            {activeBrand && (
                              <>
                                <div className="px-4 py-3 border-b border-white/[0.08]">
                                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/35 font-bold">
                                    {activeBrand} Products
                                  </span>
                                </div>
                                {brands
                                  .find((b) => b.label === activeBrand)
                                  ?.products.map((product) => (
                                    <Link
                                      key={product.label}
                                      to={product.link}
                                      onClick={() => setProductsOpen(false)}
                                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/65 hover:text-ice hover:bg-white/5 transition-colors group"
                                    >
                                      <span className="w-1 h-1 rounded-full bg-ice/40 group-hover:bg-ice group-hover:shadow-[0_0_6px_hsl(var(--ice))] transition-all shrink-0" />
                                      {product.label}
                                    </Link>
                                  ))}
                              </>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>

                {afterNav.map((item) => desktopLink(item.path, item.label))}
              </ul>
            </nav>

            {/* Desktop: phone + CTA */}
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              <a
                href="tel:+919843020458"
                className="hidden xl:flex items-center gap-2.5 text-white/70 hover:text-white transition-colors duration-200 group"
              >
                <div className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center group-hover:border-ice/50 group-hover:shadow-[0_0_14px_hsl(var(--ice)/0.25)] transition-all duration-300">
                  <Phone size={13} />
                </div>
                <div>
                  <span className="block text-[8.5px] text-white/35 uppercase tracking-widest">
                    Call Us
                  </span>
                  <span className="block text-sm font-bold leading-tight">
                    +91 98430 20458
                  </span>
                </div>
              </a>

              <a
                href="https://wa.me/919843020458"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-electric text-white px-6 py-2.5 text-sm font-bold shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_32px_hsl(var(--primary)/0.5)] active:scale-[0.97] transition-all duration-200"
              >
                Free Quote
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              ref={hamburgerRef}
              className="lg:hidden w-11 h-11 rounded-full glass-card flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile slide-in panel ───────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 bg-abyss/70 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              onKeyDown={handleDrawerKeyDown}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[320px] max-w-[90vw] z-[70] flex flex-col lg:hidden shadow-2xl"
              style={{
                background: "hsl(var(--abyss) / 0.96)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
              }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-5 border-b border-white/[0.08] shrink-0">
                <Logo variant="mark" imgClassName="h-9" />
                <button
                  ref={closeButtonRef}
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X size={17} />
                </button>
              </div>

              {/* Nav links — scrollable */}
              <nav className="flex-1 overflow-y-auto py-3 px-3">
                {mainNav.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`flex items-center px-4 py-3.5 mb-1 rounded-xl text-sm font-bold uppercase tracking-wide transition-colors ${
                      isActive(item.path)
                        ? "text-ice bg-gradient-to-r from-primary/15 to-transparent border border-ice/15"
                        : "text-white/65 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Products accordion */}
                <div className="my-1">
                  <button
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wide transition-colors ${
                      isProductsActive
                        ? "text-ice bg-gradient-to-r from-primary/15 to-transparent border border-ice/15"
                        : "text-white/65 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    aria-expanded={mobileProductsOpen}
                  >
                    Products
                    <motion.span
                      animate={{ rotate: mobileProductsOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex"
                    >
                      <ChevronDown size={15} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileProductsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mt-1 rounded-xl bg-white/[0.03] border border-white/5 py-1">
                          {brands.map((brand) => (
                            <div key={brand.label}>
                              <button
                                className={`w-full flex items-center justify-between px-5 py-3 text-sm font-semibold transition-colors ${
                                  mobileBrandOpen === brand.label
                                    ? "text-ice"
                                    : "text-white/65 hover:text-white"
                                }`}
                                onClick={() =>
                                  setMobileBrandOpen(
                                    mobileBrandOpen === brand.label
                                      ? null
                                      : brand.label
                                  )
                                }
                                aria-expanded={mobileBrandOpen === brand.label}
                              >
                                {brand.label}
                                <motion.span
                                  animate={{
                                    rotate: mobileBrandOpen === brand.label ? 180 : 0,
                                  }}
                                  transition={{ duration: 0.18 }}
                                  className="inline-flex"
                                >
                                  <ChevronDown size={12} />
                                </motion.span>
                              </button>

                              <AnimatePresence initial={false}>
                                {mobileBrandOpen === brand.label && (
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    exit={{ height: 0 }}
                                    transition={{ duration: 0.18 }}
                                    className="overflow-hidden"
                                  >
                                    {brand.products.map((p) => (
                                      <Link
                                        key={p.label}
                                        to={p.link}
                                        className="flex items-center gap-2.5 pl-9 pr-5 py-2.5 text-sm text-white/50 hover:text-ice transition-colors"
                                      >
                                        <span className="w-1 h-1 rounded-full bg-ice/50 shrink-0" />
                                        {p.label}
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {afterNav.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`flex items-center px-4 py-3.5 mb-1 rounded-xl text-sm font-bold uppercase tracking-wide transition-colors ${
                      isActive(item.path)
                        ? "text-ice bg-gradient-to-r from-primary/15 to-transparent border border-ice/15"
                        : "text-white/65 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Drawer footer — conversion CTAs */}
              <div className="p-4 border-t border-white/[0.08] space-y-3 shrink-0">
                <a
                  href="tel:+919843020458"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl glass-card hover:bg-white/[0.08] transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/25 to-electric/15 border border-ice/20 flex items-center justify-center shrink-0">
                    <Phone size={13} className="text-ice" />
                  </div>
                  <div>
                    <span className="block text-[8.5px] text-white/35 uppercase tracking-widest">
                      Call Us Now
                    </span>
                    <span className="block text-sm font-bold text-white leading-tight">
                      +91 98430 20458
                    </span>
                  </div>
                </a>
                <a
                  href="https://wa.me/919843020458"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-gradient-to-r from-primary to-electric text-white py-3.5 text-sm font-bold uppercase tracking-wide shadow-[0_0_22px_hsl(var(--primary)/0.35)] active:scale-[0.98] transition-transform"
                >
                  Request a Free Quote
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
