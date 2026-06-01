import PageBanner from "@/components/PageBanner";

const About = () => {
  return (
    <div>
      <PageBanner title="About Us" breadcrumb="About Us" />
      <section className="py-16 px-6">
        <div className="container mx-auto">
          {/* Welcome Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-6">
                Welcome to Comfort Aircon
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Comfort Aircon was established in the late 1999 and
                has marked 25 years in the business of Air-conditioning. With
                years of expertise and an eager-growing list of 1000+ clients
                including Banks, Coffee Houses and Infrastructure Industries, we
                know what works best in the world of cooling solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Comfort Aircon is an authorized dealer for Carrier, Midea and
                Toshiba Air Conditioning Products. We aim to provide holistic
                and end-to end services to our customers. With a highly
                specialized team of 70 experts, and over 1000 servicing
                locations across the city, our energy-efficient options are the
                easiest way to save up on electricity bills. We believe in
                educating customers so that they can make informed choices for
                their indoor comfort while safeguarding our environment.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/welcome.jpg"
                alt="Welcome to Comfort Aircon"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Mission & Vision Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-muted/30 p-8 rounded-xl">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
              <img
                src="/images/vision.jpeg"
                alt="Mission and Vision"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-secondary mb-4">
                  Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To meet our vision we want to keep fulfilling our promise of
                  Quality, Competency and Trust. We believe in making the
                  experience of Air-conditioning an enriching one for you. By
                  virtue of our timely and trusted services and expertise, we
                  wish to continue serving our esteemed customers.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-secondary mb-4">
                  Vision
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To remain a trusted and valued brand for our customers and
                  strengthen each relationship we build along the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
