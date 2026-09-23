import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import SectionLabel from "@/components/SectionLabel";
import { fadeUp, fadeLeft, stagger } from "@/lib/motion";

const serviceChecklist = [
  {
    title: "Trained Personnel Visit:",
    description:
      "Our teams of experienced and trained engineer visit the premises for servicing.",
  },
  {
    title: "Priority Service:",
    description:
      "We take all service requests and issues very seriously and make it a top priority",
  },
  {
    title: "Preventive Maintenance:",
    description:
      "We also provide the timely servicing and routine maintenance as per company policies.",
  },
  {
    title: "Genuine Parts:",
    description:
      "It goes without saying that all are spare parts and replacements are 100% genuine.",
  },
  {
    title: "Extended Life:",
    description:
      "We assure our customers more efficient and durable products after proper care and timely service.",
  },
];

const Services = () => {
  return (
    <div className="bg-cinema text-white min-h-screen">
      <PageBanner title="Services" breadcrumb="Services" />
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid pointer-events-none opacity-40" />
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>Why It Matters</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-5 tracking-tight text-balance uppercase"
              >
                Air-conditioning systems need regular &amp; timely maintenance for
                effective results:
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/60 leading-relaxed mb-4 text-[15px] font-light">
                With proper and timely maintenance, air-conditioning systems can
                retain their efficiency and increase product life. If products
                are not maintained and serviced, they not only have shorter life
                span but also increase power consumption.
              </motion.p>
              <motion.p variants={fadeUp} className="text-white/60 leading-relaxed mb-8 text-[15px] font-light">
                We encourage our buyers to call us for maintenance and servicing
                of their air conditioning systems.
              </motion.p>
              <motion.div
                className="relative group"
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-electric/15 blur-xl group-hover:from-primary/30 group-hover:to-electric/25 transition-all duration-500"
                />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-primary/30 transition-all duration-500">
                  <img
                    src={`${import.meta.env.BASE_URL}images/ac_service.jpg`}
                    alt="AC Maintenance Tools"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover transform scale-100 group-hover:scale-103 transition-transform duration-[1.2s] ease-out"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="lg:pl-4"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>What's Included</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-5 tracking-tight text-balance uppercase"
              >
                Services provided
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-white/60 leading-relaxed mb-6 text-[15px] font-light"
              >
                Comfort Aircon is one of the most trusted and professional
                Air-conditioning dealers in Northern India. Our services focus
                on providing our customers the most comprehensive range of
                products for their needs. Our aim is for you to have an energy
                efficient system that makes the indoor experience comfortable
                and delightful for you.
              </motion.p>
              <motion.p variants={fadeUp} className="text-white/80 font-semibold mb-6 text-[15px]">
                Comfort Aircon service contract includes the following services:
              </motion.p>

              <motion.ul variants={stagger} className="space-y-4 mb-10">
                {serviceChecklist.map(({ title, description }) => (
                  <motion.li
                    key={title}
                    variants={fadeUp}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary/30 hover:bg-white/[0.05] transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_0_12px_hsl(var(--primary)/0.3)] transition-all duration-300">
                      <CheckCircle2 size={16} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm mb-1 group-hover:text-ice transition-colors duration-200">{title}</h4>
                      <p className="text-white/60 text-sm leading-relaxed font-light">{description}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div variants={fadeUp}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-electric text-white px-8 py-3.5 font-bold text-sm uppercase tracking-wide shadow-[0_0_22px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_34px_hsl(var(--primary)/0.5)] active:scale-[0.97] transition-all duration-300"
                >
                  Book an Appointment <ArrowRight size={15} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
