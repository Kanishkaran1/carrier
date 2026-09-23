import { motion } from "framer-motion";
import PageBanner from "@/components/PageBanner";
import SectionLabel from "@/components/SectionLabel";
import { fadeUp } from "@/lib/motion";

const clients = [
  "Canara Bank", "Capgemini", "TATA", "Levi's", "TATA Motors",
  "Aditya Birla", "Tonino", "Larsen & Toubro", "Adidas",
  "Swaminarayan Akshardham", "Dr Lal PathLabs", "Syndicate Bank",
  "Red Cross", "Cafe Coffee Day", "State Bank of India",
  "Chai Point", "Reebok", "Lifestyle", "Spencer's", "M2K",
  "Parsvnath", "Punjab National Bank", "Union Bank of India",
  "TATA Communications", "BLK Hospital", "Metro Hospital",
];

const Clients = () => {
  return (
    <div className="bg-cinema text-white min-h-screen">
      <PageBanner title="Our Clients" breadcrumb="Our Clients" />
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
            <SectionLabel center>Trusted By</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
              Some of Our Customers
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {clients.map((c) => (
              <div
                key={c}
                className="group glass-card border border-white/5 rounded-xl px-6 py-5 flex items-center justify-center min-h-[90px] hover:border-primary/45 hover:shadow-[0_0_24px_hsl(var(--primary)/0.15)] hover:-translate-y-1.5 transition-all duration-300 cursor-default"
              >
                <span className="font-semibold text-white/70 group-hover:text-ice text-center text-sm transition-colors duration-300">
                  {c}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Clients;
