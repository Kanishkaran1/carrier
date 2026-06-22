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
    <div>
      <PageBanner title="Our Clients" breadcrumb="Our Clients" />
      <section className="py-28 px-6">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionLabel center>Trusted By</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-secondary tracking-tight text-balance">
              Some of Our Customers
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {clients.map((c) => (
              <div
                key={c}
                className="bg-card border border-border rounded-xl shadow-sm px-8 py-5 flex items-center justify-center min-w-[160px] hover:border-primary/30 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                <span className="font-semibold text-secondary text-center">{c}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Clients;
