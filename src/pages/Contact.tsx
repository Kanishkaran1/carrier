import { motion } from "framer-motion";
import PageBanner from "@/components/PageBanner";
import ContactForm from "@/components/ContactForm";
import SectionLabel from "@/components/SectionLabel";
import { MapPin, Phone, Mail } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";

const Contact = () => {
  return (
    <div className="bg-cinema text-white min-h-screen">
      <PageBanner title="Contact Us" breadcrumb="Contact Us" />
      <section className="relative py-28 px-6 bg-cinema text-white overflow-hidden">
        <div className="absolute inset-0 grid-lines pointer-events-none opacity-60" />
        <div
          aria-hidden="true"
          className="absolute bottom-[-20%] right-[-5%] w-[440px] h-[440px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: "hsl(var(--primary) / 0.12)" }}
        />
        
        <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Get in Touch</SectionLabel>
            </motion.div>
            
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl lg:text-5xl font-black mb-8 uppercase tracking-tight text-white leading-tight"
            >
              Contact Us
            </motion.h2>
            
            <motion.ul variants={stagger} className="space-y-6">
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  value:
                    "295, Thiruvalluvar Salai, Raja Nagar, Pudupalaiyam, Puducherry — 605013",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+91 98430 20458",
                  href: "tel:+919843020458",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "admin@comfortair.co.in",
                  href: "mailto:admin@comfortair.co.in",
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <motion.li
                  key={label}
                  variants={fadeUp}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg glass-card flex items-center justify-center shrink-0 mt-0.5 border border-white/5">
                    <Icon size={15} className="text-ice" strokeWidth={2} />
                  </div>
                  <div>
                    <span className="block text-white/35 text-[9px] uppercase tracking-[0.22em] mb-0.5 font-bold">
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="text-white text-sm font-semibold hover:text-ice transition-colors duration-200"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-white text-sm font-medium leading-relaxed max-w-sm block">
                        {value}
                      </span>
                    )}
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="rounded-2xl p-px border-gradient-ice"
          >
            <div className="rounded-2xl glass-card p-8 md:p-10">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
