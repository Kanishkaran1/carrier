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
    <div>
      <PageBanner title="Services" breadcrumb="Services" />
      <section className="py-28 px-6">
        <div className="container mx-auto">
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
                className="text-2xl md:text-3xl lg:text-4xl font-black text-secondary leading-tight mb-5 tracking-tight text-balance"
              >
                Air-conditioning systems need regular & timely maintenance for
                effective results:
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-4 text-[15px]">
                With proper and timely maintenance, air-conditioning systems can
                retain their efficiency and increase product life. If products
                are not maintained and serviced, they not only have shorter life
                span but also increase power consumption.
              </motion.p>
              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-8 text-[15px]">
                We encourage our buyers to call us for maintenance and servicing
                of their air conditioning systems.
              </motion.p>
              <motion.div variants={fadeLeft} className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/15 via-transparent to-electric/10 blur-xl"
                />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-secondary/20">
                  <img
                    src="/images/ac_service.jpg"
                    alt="AC Maintenance Tools"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover"
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
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>What's Included</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-2xl md:text-3xl lg:text-4xl font-black text-secondary leading-tight mb-5 tracking-tight text-balance"
              >
                Services provided
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-muted-foreground leading-relaxed mb-6 text-[15px]"
              >
                Comfort Aircon is one of the most trusted and professional
                Air-conditioning dealers in Northern India. Our services focus
                on providing our customers the most comprehensive range of
                products for their needs. Our aim is for you to have an energy
                efficient system that makes the indoor experience comfortable
                and delightful for you.
              </motion.p>
              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-6 text-[15px]">
                Comfort Aircon service contract includes the following services:
              </motion.p>

              <motion.ul variants={stagger} className="space-y-4 mb-9">
                {serviceChecklist.map(({ title, description }) => (
                  <motion.li
                    key={title}
                    variants={fadeUp}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 size={17} className="text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>
                      <span className="font-bold text-secondary">{title}</span>{" "}
                      {description}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div variants={fadeUp}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-electric text-white px-8 py-3.5 font-bold text-sm uppercase tracking-wide shadow-[0_0_22px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_34px_hsl(var(--primary)/0.5)] active:scale-[0.98] transition-all duration-300"
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
