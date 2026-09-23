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
    <div className="bg-cinema text-white min-h-screen">
      <PageBanner title="Products" breadcrumb="Products" />
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid pointer-events-none opacity-40" />
        
        <div className="container mx-auto relative z-10">
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
                <div className="rounded-2xl p-px border-gradient-ice h-full">
                  <TiltCard className="glass-card rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-br from-primary/20 to-electric/10 border border-primary/20 flex items-center justify-center transition-all duration-300 group-hover:from-primary group-hover:to-electric group-hover:shadow-[0_0_24px_hsl(var(--primary)/0.35)] group-hover:border-primary">
                      <cat.icon size={36} className="text-ice transition-colors duration-300 group-hover:text-white" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-xl font-black text-white mb-2 tracking-tight uppercase">{cat.title}</h3>
                    <p className="text-white/60 text-sm mb-8 font-light max-w-xs">{cat.description}</p>
                    <Link
                      to={cat.link}
                      className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-electric text-white px-7 py-3 text-xs font-bold uppercase tracking-wide shadow-[0_0_16px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_28px_hsl(var(--primary)/0.5)] active:scale-[0.97] transition-all duration-200"
                    >
                      Learn More <ArrowRight size={14} />
                    </Link>
                  </TiltCard>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Products;
