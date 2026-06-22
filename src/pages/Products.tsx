import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AirVent, ArrowRight, Building2 } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import SectionLabel from "@/components/SectionLabel";
import TiltCard from "@/components/TiltCard";
import { fadeUp, stagger } from "@/lib/motion";

const categories = [
  {
    icon: AirVent,
    title: "Residential Air Conditioners",
    description: "Split ACs, window ACs, inverter models for homes and apartments.",
    link: "/products/carrier/hi-wall-ac",
  },
  {
    icon: Building2,
    title: "Commercial Air Conditioners",
    description: "Ductable, cassette, VRF and central AC systems for offices and commercial spaces.",
    link: "/products/carrier/vrf-system",
  },
];

const Products = () => {
  return (
    <div>
      <PageBanner title="Products" breadcrumb="Products" />
      <section className="py-28 px-6">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionLabel center>Browse Categories</SectionLabel>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {categories.map((cat) => (
              <motion.div key={cat.title} variants={fadeUp} className="h-full">
                <TiltCard className="bg-card border border-border rounded-2xl p-8 text-center h-full hover:border-primary/40">
                <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary/[0.12] to-electric/[0.08] flex items-center justify-center group-hover:from-primary/20 group-hover:to-electric/15 group-hover:shadow-[0_0_24px_hsl(var(--primary)/0.25)] transition-all duration-300">
                  <cat.icon size={40} className="text-primary" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-black text-secondary mb-2 tracking-tight">{cat.title}</h3>
                <p className="text-muted-foreground text-sm mb-6">{cat.description}</p>
                <Link
                  to={cat.link}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-electric text-white px-6 py-2.5 text-sm font-bold uppercase tracking-wide shadow-[0_0_16px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_28px_hsl(var(--primary)/0.5)] active:scale-[0.97] transition-all duration-200"
                >
                  Learn More <ArrowRight size={14} />
                </Link>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Products;
