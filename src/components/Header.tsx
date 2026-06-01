import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Phone } from "lucide-react";

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

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  // mobile
  const [mobileBrandOpen, setMobileBrandOpen] = useState<string | null>(null);
  const location = useLocation();

  const simpleNavItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
  ];
  const afterProductsNav = [
    { label: "Services", path: "/services" },
    { label: "Our Clients", path: "/clients" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* Top bar */}
      <div className="bg-background py-4 px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-2xl">
              CA
            </span>
          </div>
          <div>
            <h1 className="text-primary font-bold text-3xl leading-tight">
              COMFORT AIRCON
            </h1>
          </div>
        </Link>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 text-secondary">
            <Phone size={20} />
            <span className="font-semibold">+91 98430 20458</span>
          </div>
          <a
            href="https://wa.me/919843020458"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-semibold hover:bg-primary/90 transition-colors shadow-sm"
          >
            Request a Free Quote
          </a>
        </div>

        <button
          className="md:hidden text-secondary"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Red nav bar */}
      <nav className="bg-primary">
        {/* Desktop */}
        <ul className="hidden md:flex items-center justify-center gap-1">
          {simpleNavItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className={`block px-5 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground hover:bg-primary/80 transition-colors ${
                  location.pathname === item.path ? "bg-primary/70" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* Products mega menu */}
          <li
            className="relative"
            onMouseEnter={() => {
              setProductsOpen(true);
            }}
            onMouseLeave={() => {
              setProductsOpen(false);
              setActiveBrand(null);
            }}
          >
            <div
              className={`flex items-center gap-1 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-cursor-pointer text-primary-foreground hover:bg-primary/80 transition-colors ${
                location.pathname.startsWith("/products") ? "bg-primary/70" : ""
              }`}
            >
              Products <ChevronDown size={14} />
            </div>

            {productsOpen && (
              <div className="absolute left-0 top-full flex bg-primary shadow-xl z-50 min-w-[420px]">
                {/* Brands column */}
                <div className="w-[200px] border-r border-primary-foreground/20">
                  {brands.map((brand) => (
                    <button
                      key={brand.label}
                      className={`w-full flex items-center justify-between px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/70 transition-colors ${
                        activeBrand === brand.label ? "bg-primary/70" : ""
                      }`}
                      onMouseEnter={() => setActiveBrand(brand.label)}
                    >
                      {brand.label}{" "}
                      <ChevronDown
                        size={14}
                        className={
                          activeBrand === brand.label ? "" : "-rotate-90"
                        }
                      />
                    </button>
                  ))}
                </div>

                {/* Products column */}
                <div className="w-[220px] bg-primary/90">
                  {brands
                    .filter((b) => b.label === activeBrand)
                    .map((brand) =>
                      brand.products.map((product) => (
                        <Link
                          key={product.label}
                          to={product.link}
                          className="block px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/70 transition-colors"
                          onClick={() => setProductsOpen(false)}
                        >
                          {product.label}
                        </Link>
                      )),
                    )}
                </div>
              </div>
            )}
          </li>

          {afterProductsNav.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className={`block px-5 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground hover:bg-primary/80 transition-colors ${
                  location.pathname === item.path ? "bg-primary/70" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile */}
        {mobileOpen && (
          <ul className="md:hidden flex flex-col">
            {simpleNavItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="block px-5 py-3 text-sm font-semibold uppercase text-primary-foreground hover:bg-primary/80"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Products accordion */}
            <li>
              <div className="flex items-center justify-between">
                <Link
                  to="/products"
                  className="flex-1 px-5 py-3 text-sm font-semibold uppercase text-primary-foreground hover:bg-primary/80"
                  onClick={() => setMobileOpen(false)}
                >
                  Products
                </Link>
                <button
                  className="px-4 py-3 text-primary-foreground"
                  onClick={() => setProductsOpen(!productsOpen)}
                >
                  <ChevronDown
                    size={14}
                    className={
                      productsOpen
                        ? "rotate-180 transition-transform"
                        : "transition-transform"
                    }
                  />
                </button>
              </div>
              {productsOpen && (
                <ul className="bg-primary/80">
                  {brands.map((brand) => (
                    <li key={brand.label}>
                      <button
                        className="w-full flex items-center justify-between px-8 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/70"
                        onClick={() =>
                          setMobileBrandOpen(
                            mobileBrandOpen === brand.label
                              ? null
                              : brand.label,
                          )
                        }
                      >
                        {brand.label}
                        <ChevronDown
                          size={12}
                          className={
                            mobileBrandOpen === brand.label
                              ? "rotate-180 transition-transform"
                              : "transition-transform"
                          }
                        />
                      </button>
                      {mobileBrandOpen === brand.label && (
                        <ul className="bg-primary/70">
                          {brand.products.map((p) => (
                            <li key={p.label}>
                              <Link
                                to={p.link}
                                className="block px-12 py-2 text-sm text-primary-foreground hover:bg-primary/60"
                                onClick={() => setMobileOpen(false)}
                              >
                                {p.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {afterProductsNav.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="block px-5 py-3 text-sm font-semibold uppercase text-primary-foreground hover:bg-primary/80"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
