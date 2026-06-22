import PageBanner from "@/components/PageBanner";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  return (
    <div>
      <PageBanner title="Contact Us" breadcrumb="Contact Us" />
      <section className="relative py-20 px-6 bg-cinema text-white overflow-hidden">
        <div className="absolute inset-0 grid-lines pointer-events-none" />
        <div
          aria-hidden="true"
          className="absolute bottom-[-20%] right-[-5%] w-[440px] h-[440px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: "hsl(var(--primary) / 0.12)" }}
        />
        <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-8">Contact us</h2>
            <div className="space-y-6 text-sm">
              <p>
                295, Thiruvalluvar Salai, Raja Nagar, Pudupalaiyam, Puducherry,
                605013
              </p>
              <p>+91 98430 20458</p>
              <p>admin@comfortair.co.in</p>
            </div>
          </div>
          <div className="rounded-2xl p-px border-gradient-ice">
            <div className="rounded-2xl glass-card p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
