import { motion } from "framer-motion";
import PageBanner from "@/components/PageBanner";
import SectionLabel from "@/components/SectionLabel";
import { fadeUp, fadeLeft, stagger } from "@/lib/motion";

const About = () => {
  return (
    <div className="bg-cinema text-white min-h-screen">
      <PageBanner title="About Us" breadcrumb="About Us" />
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid pointer-events-none opacity-40" />
        
        <div className="container mx-auto relative z-10">
          {/* Welcome Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center mb-28">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>About Us</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-5 tracking-tight text-balance"
              >
                Welcome to Comfort Aircon
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/60 leading-relaxed mb-6 text-[15px] font-light">
                Comfort Aircon was established in the late 1999 and
                has marked 25 years in the business of Air-conditioning. With
                years of expertise and an eager-growing list of 1000+ clients
                including Banks, Coffee Houses and Infrastructure Industries, we
                know what works best in the world of cooling solutions.
              </motion.p>
              <motion.p variants={fadeUp} className="text-white/60 leading-relaxed text-[15px] font-light">
                Comfort Aircon is an authorized dealer for Carrier, Midea and
                Toshiba Air Conditioning Products. We aim to provide holistic
                and end-to end services to our customers. With a highly
                specialized team of 70 experts, and over 1000 servicing
                locations across the city, our energy-efficient options are the
                easiest way to save up on electricity bills. We believe in
                educating customers so that they can make informed choices for
                their indoor comfort while safeguarding our environment.
              </motion.p>
            </motion.div>
            
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
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-primary/30 transition-all duration-500">
                <img
                  src={`${import.meta.env.BASE_URL}images/welcome.jpg`}
                  alt="Welcome to Comfort Aircon"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                />
              </div>
            </motion.div>
          </div>

          {/* Mission & Vision Section */}
          <div className="rounded-2xl p-px border-gradient-ice">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center glass-card p-8 md:p-12 rounded-2xl relative overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute -top-40 right-[-10%] w-[380px] h-[380px] rounded-full blur-[110px] pointer-events-none"
                style={{ background: "hsl(var(--primary) / 0.12)" }}
              />
              <motion.div
                className="relative group order-2 md:order-1"
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-electric/15 blur-xl group-hover:from-primary/30 group-hover:to-electric/25 transition-all duration-500"
                />
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-primary/30 transition-all duration-500">
                  <img
                    src={`${import.meta.env.BASE_URL}images/vision.jpeg`}
                    alt="Mission and Vision"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                  />
                </div>
              </motion.div>
              
              <motion.div
                className="order-1 md:order-2 relative z-10"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.div variants={fadeUp}>
                  <SectionLabel>Our Purpose</SectionLabel>
                </motion.div>
                <motion.div variants={fadeUp} className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-3 uppercase tracking-tight">
                    Mission
                  </h3>
                  <p className="text-white/60 leading-relaxed text-[15px] font-light">
                    To meet our vision we want to keep fulfilling our promise of
                    Quality, Competency and Trust. We believe in making the
                    experience of Air-conditioning an enriching one for you. By
                    virtue of our timely and trusted services and expertise, we
                    wish to continue serving our esteemed customers.
                  </p>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-3 uppercase tracking-tight">
                    Vision
                  </h3>
                  <p className="text-white/60 leading-relaxed text-[15px] font-light">
                    To remain a trusted and valued brand for our customers and
                    strengthen each relationship we build along the way.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
