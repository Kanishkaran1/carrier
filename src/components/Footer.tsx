import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Our Clients", path: "/clients" },
  { name: "Contact Us", path: "/contact" },
];

const productLinks = [
  {
    brand: "Carrier",
    items: [
      { label: "Hi Wall AC", path: "/products/carrier/hi-wall-ac" },
      { label: "VRF System", path: "/products/carrier/vrf-system" },
      { label: "Ducted AC", path: "/products/carrier/ducted-ac" },
      { label: "Cassette AC", path: "/products/carrier/cassette-ac" },
    ],
  },
  {
    brand: "Toshiba",
    items: [
      { label: "Hi Wall AC", path: "/products/toshiba/hi-wall-ac" },
      { label: "Cassette AC", path: "/products/toshiba/cassette-ac" },
      { label: "VRF System", path: "/products/toshiba/vrf-system" },
    ],
  },
  {
    brand: "Midea",
    items: [
      { label: "Hi Wall AC", path: "/products/midea/hi-wall-ac" },
      { label: "Window AC", path: "/products/midea/window-ac" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="relative bg-abyss text-secondary-foreground overflow-hidden">
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-60" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ice/25 to-transparent" />

      {/* ── Pre-footer CTA panel ─────────────────────────────────────── */}
      <div className="container mx-auto px-6 pt-14 relative z-10">
        <div className="rounded-2xl p-px border-gradient-ice">
          <div className="rounded-2xl glass-card px-8 py-9 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute -top-20 right-[15%] w-[300px] h-[200px] rounded-full blur-[90px] pointer-events-none"
              style={{ background: "hsl(var(--primary) / 0.18)" }}
            />
            <div className="relative">
              <h3 className="text-xl md:text-2xl font-black text-white leading-tight tracking-tight">
                Ready for better comfort?
              </h3>
              <p className="text-white/55 text-sm mt-1.5 max-w-md">
                Get a free site assessment and no-obligation quote — we cover
                Puducherry and Chennai.
              </p>
            </div>
            <div className="relative flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="tel:+919843020458"
                className="inline-flex items-center gap-2 rounded-full glass-card text-white px-6 py-3 text-sm font-bold hover:bg-white/10 active:scale-[0.98] transition-all"
              >
                <Phone size={14} />
                Call Now
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-electric text-white px-6 py-3 text-sm font-bold shadow-[0_0_22px_hsl(var(--primary)/0.35)] hover:shadow-[0_0_34px_hsl(var(--primary)/0.55)] active:scale-[0.98] transition-all"
              >
                Request a Quote
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer grid ─────────────────────────────────────────── */}
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">

        {/* Col 1: Brand / About */}
        <div>
          <Logo variant="full" className="mb-4" imgClassName="h-20" />
          <p className="text-white/45 text-sm leading-relaxed mb-5">
            Authorised dealer for Carrier, Toshiba and Midea — delivering
            premium HVAC solutions across Puducherry and Chennai since 1999.
          </p>
          <span className="inline-block rounded-full text-[9px] uppercase tracking-[0.22em] text-ice font-bold border border-ice/30 px-3 py-1.5 glass-card">
            Est. 1999
          </span>

          {/* Contact quick-links */}
          <div className="mt-6 space-y-2.5">
            <a
              href="tel:+919843020458"
              className="flex items-center gap-2 text-sm text-white/45 hover:text-ice transition-colors"
            >
              <Phone size={13} className="text-ice shrink-0" />
              +91 98430 20458
            </a>
            <a
              href="mailto:admin@comfortair.co.in"
              className="flex items-center gap-2 text-sm text-white/45 hover:text-ice transition-colors"
            >
              <Mail size={13} className="text-ice shrink-0" />
              admin@comfortair.co.in
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white mb-5 pb-2.5 border-b border-white/[0.08]">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="flex items-center gap-2 text-sm text-white/45 hover:text-ice transition-colors group"
                >
                  <span className="w-1 h-1 rounded-full bg-ice/40 group-hover:bg-ice group-hover:shadow-[0_0_6px_hsl(var(--ice))] transition-all shrink-0" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Products */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white mb-5 pb-2.5 border-b border-white/[0.08]">
            Our Products
          </h3>
          <div className="space-y-5">
            {productLinks.map(({ brand, items }) => (
              <div key={brand}>
                <span className="block text-[9px] uppercase tracking-[0.22em] text-ice font-bold mb-2">
                  {brand}
                </span>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.path}
                        className="flex items-center gap-2 text-sm text-white/45 hover:text-ice transition-colors group"
                      >
                        <span className="w-1 h-1 rounded-full bg-ice/40 group-hover:bg-ice group-hover:shadow-[0_0_6px_hsl(var(--ice))] transition-all shrink-0" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Col 4: Locate Us */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white mb-5 pb-2.5 border-b border-white/[0.08]">
            Locate Us
          </h3>
          <div className="flex items-start gap-2.5 mb-5">
            <MapPin size={14} className="mt-0.5 shrink-0 text-ice" />
            <p className="text-sm text-white/45 leading-relaxed">
              295, Thiruvalluvar Salai, Raja Nagar, Pudupalaiyam,
              Puducherry — 605013
            </p>
          </div>

          {/* Embedded map */}
          <div className="rounded-xl overflow-hidden border border-white/10 h-40 glass-card">
            <iframe
              title="Comfort Aircon Location"
              src="https://maps.google.com/maps?q=11.9337659,79.813273&hl=en&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────── */}
      <div className="border-t border-white/[0.08] py-5 px-6 relative z-10">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <span>
            © {new Date().getFullYear()} Comfort Aircon. All Rights Reserved.
          </span>
          <span className="hidden sm:block">
            Authorised Dealer · Carrier · Toshiba · Midea
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
