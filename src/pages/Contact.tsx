import PageBanner from "@/components/PageBanner";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  return (
    <div>
      <PageBanner title="Contact Us" breadcrumb="Contact Us" />
      <section className="relative py-16 px-6 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-white">
        <div className="absolute inset-0 opacity-20 bg-[conic-gradient(from_0deg,transparent,rgba(139,69,19,0.3),transparent,rgba(139,69,19,0.2),transparent)]" />
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
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
