import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold uppercase mb-4 border-b border-primary pb-2">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
              { name: "Services", path: "/services" },
              { name: "Our Clients", path: "/clients" },
              { name: "Contact Us", path: "/contact" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Dealership Brands */}
        <div>
          <h3 className="text-lg font-bold uppercase mb-4 border-b border-primary pb-2">
            Our Brands
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Toshiba Air Conditioning</li>
            <li>Carrier Air Conditioning</li>
            <li>Midea Air Conditioning</li>
          </ul>
        </div>

        {/* Locate Us */}
        <div>
          <h3 className="text-lg font-bold uppercase mb-4 border-b border-primary pb-2">
            Locate Us
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
              <p>
                295, Thiruvalluvar Salai, Raja Nagar, Pudupalaiyam, Puducherry,
                605013
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-primary" />
              <p>+91 98430 20458</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-primary" />
              <p>admin@comfortair.co.in</p>
            </div>
          </div>
          {/* Map placeholder */}
          <div className="mt-4 rounded h-48 overflow-hidden border border-secondary-foreground/20">
            <iframe
              title="Location Map"
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

      <div className="border-t border-secondary-foreground/20 py-4 text-center text-xs text-secondary-foreground/60">
        © {new Date().getFullYear()} Comfort Aircon All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
