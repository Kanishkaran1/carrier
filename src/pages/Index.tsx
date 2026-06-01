import { useState, useEffect } from "react";
import ContactForm from "@/components/ContactForm";
import { Link } from "react-router-dom";
import {
  AirVent,
  Building2,
  Wrench,
  ShieldCheck,
  Settings,
  Hammer,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const heroSlides = [
  {
    title: "Lightweight and Compact Energy Saving Air Conditioners",
    subtitle: "Authorized Dealer for Carrier, Midea & Toshiba",
    image: "/images/image1.jpg",
  },
  {
    title: "Innovative Climate Control for Modern Spaces",
    subtitle: "Leading the Way in HVAC Technology",
    image: "/images/image2.png",
  },
  {
    title: "Complete Air Conditioning Solutions for Every Need",
    subtitle: "Residential & Commercial AC Systems",
    image: "/images/image4.webp",
  },
  {
    title: "Premium Cassette ACs for Uniform Cooling",
    subtitle: "Perfect for Offices and Large Spaces",
    image: "/images/image3.jpg",
  },
];

const dealers = [
  {
    name: "Toshiba",
    description: "Japanese precision engineering",
    image: "/images/toshiba.jpg",
  },
  {
    name: "Carrier",
    description: "World leader in HVAC solutions",
    image: "/images/carrier.jpg",
  },
  {
    name: "Midea",
    description: "Innovation-driven comfort technology",
    image: "/images/midea.jpg",
  },
];

const services = [
  {
    icon: Hammer,
    title: "New Installation",
    description: "Professional AC installation services",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description: "Regular maintenance & tune-ups",
  },
  {
    icon: Settings,
    title: "Repair Services",
    description: "Quick and reliable repairs",
  },
  {
    icon: ShieldCheck,
    title: "AMC Plans",
    description: "Annual maintenance contracts",
  },
];

const products = [
  {
    icon: AirVent,
    title: "Residential Air Conditioners",
    link: "/services",
  },
  {
    icon: Building2,
    title: "Commercial Air Conditioners",
    link: "/services",
  },
];

const clients = [
  "Canara Bank",
  "Capgemini",
  "TATA",
  "Levi's",
  "TATA Motors",
  "Aditya Birla",
  "Tonino",
  "Larsen & Toubro",
  "Adidas",
  "Swaminarayan Akshardham",
  "Dr Lal PathLabs",
  "Syndicate Bank",
  "Red Cross",
  "Cafe Coffee Day",
  "State Bank of India",
  "Chai Point",
  "Reebok",
  "Lifestyle",
  "Spencer's",
  "M2K",
  "Parsvnath",
  "Punjab National Bank",
  "Union Bank of India",
];

const Index = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div>
      {/* Hero Carousel */}
      <section className="relative group">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
        >
          <CarouselContent>
            {heroSlides.map((slide, i) => (
              <CarouselItem key={i}>
                <div
                  className="relative h-[400px] md:h-[500px] bg-cover bg-center flex items-center justify-start text-left px-6 md:px-20"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="relative z-10 max-w-3xl">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-lg text-white/80 mb-6">
                      {slide.subtitle}
                    </p>
                    <Link
                      to="/about"
                      className="inline-block bg-primary text-primary-foreground px-8 py-3 font-semibold uppercase text-sm hover:bg-primary/90 transition-colors"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === current - 1
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold uppercase text-secondary mb-2">
            Welcome To Comfort Aircon
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground leading-relaxed mb-6">
            Established in 1999, Comfort Aircon is an authorized dealer and
            distributor of Carrier, Midea, and Toshiba air conditioning systems.
            With offices in Pondicherry, Chennai, we provide comprehensive HVAC
            solutions for residential and commercial spaces across all region.
            Our commitment to quality service and customer satisfaction has made
            us one of the most trusted names in the air conditioning industry.
          </p>
          <Link
            to="/about"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 font-semibold uppercase text-sm hover:bg-primary/90 transition-colors"
          >
            Read More
          </Link>
        </div>
      </section>

      {/* Authorized Dealers */}
      <section className="py-16 px-6 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold uppercase text-secondary text-center mb-2">
            Authorized Dealers
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dealers.map((d) => (
              <div
                key={d.name}
                className="bg-background rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow"
              >
                <img
                  src={d.image}
                  alt={d.name}
                  className="w-full h-full object-contain"
                />

                <p className="text-muted-foreground text-sm">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service & Support */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold uppercase text-secondary text-center mb-2">
            Service and Support
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Our Services */}
            <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden min-h-[300px] md:min-h-[650px] flex items-end p-8">
              <div className="absolute inset-0 bg-[url('/images/ourserviceleft.webp')] bg-cover bg-center" />
            </div>

            {/* Product & Service Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((p) => (
                <div
                  key={p.title}
                  className="bg-background border rounded-lg p-6 text-center hover:shadow-md transition-shadow"
                >
                  <h4 className="text-lg font-semibold text-foreground mb-3">
                    {p.title}
                  </h4>
                  <div className="w-12 h-0.5 bg-primary mx-auto mb-4" />
                  <p.icon size={48} className="mx-auto text-foreground mb-4" />
                  <Link
                    to={p.link}
                    className="inline-block bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              ))}
              {services.slice(0, 2).map((s) => (
                <div
                  key={s.title}
                  className="bg-secondary rounded-lg p-6 text-center hover:shadow-md transition-shadow"
                >
                  <s.icon
                    size={48}
                    className="mx-auto text-secondary-foreground mb-4"
                  />
                  <h4 className="text-lg font-semibold text-secondary-foreground mb-3">
                    {s.title}
                  </h4>
                  <Link
                    to="/services"
                    className="inline-block border border-primary text-primary-foreground bg-primary px-5 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Customers */}
      {/* <section className="py-16 bg-muted overflow-hidden">
        <div className="container mx-auto px-6 mb-10">
          <h2 className="text-3xl font-bold uppercase text-secondary text-center mb-2">
            Some of Our Customers
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>

        <div className="relative flex overflow-hidden group bg-black py-6 rounded-full mx-6 mb-12 border border-white/10 shadow-lg">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-12 items-center px-6">
            {[...clients, ...clients].map((c, index) => (
              <span
                key={`${c}-${index}`}
                className="font-bold text-lg md:text-xl text-white whitespace-nowrap"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section className="relative py-16 px-6 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-white">
        <div className="absolute inset-0 opacity-20 bg-[conic-gradient(from_0deg,transparent,rgba(139,69,19,0.3),transparent,rgba(139,69,19,0.2),transparent)]" />
        <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
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
          {/* Quick Enquiry */}
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
