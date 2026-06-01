import { Link } from "react-router-dom";
import { AirVent, Building2 } from "lucide-react";
import PageBanner from "@/components/PageBanner";

const categories = [
  {
    icon: AirVent,
    title: "Residential Air Conditioners",
    description: "Split ACs, window ACs, inverter models for homes and apartments.",
    link: "/products/residential",
  },
  {
    icon: Building2,
    title: "Commercial Air Conditioners",
    description: "Ductable, cassette, VRF and central AC systems for offices and commercial spaces.",
    link: "/products/commercial",
  },
];

const Products = () => {
  return (
    <div>
      <PageBanner title="Products" breadcrumb="Products" />
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {categories.map((cat) => (
              <div key={cat.title} className="bg-background border rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <cat.icon size={56} className="mx-auto text-secondary mb-4" />
                <h3 className="text-xl font-bold text-secondary mb-2">{cat.title}</h3>
                <div className="w-12 h-0.5 bg-primary mx-auto mb-4" />
                <p className="text-muted-foreground text-sm mb-6">{cat.description}</p>
                <Link
                  to={cat.link}
                  className="inline-block bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
