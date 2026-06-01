import {
  Wrench,
  Hammer,
  Settings,
  ShieldCheck,
  Clock,
  Headphones,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageBanner from "@/components/PageBanner";

const services = [
  {
    icon: Hammer,
    title: "New Installation",
    description: "Professional installation of all types of AC systems.",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description: "Scheduled maintenance to keep systems running efficiently.",
  },
  {
    icon: Settings,
    title: "Repair Services",
    description: "Expert diagnosis and repair for all AC brands.",
  },
  {
    icon: ShieldCheck,
    title: "AMC Plans",
    description: "Comprehensive annual maintenance contracts.",
  },
  {
    icon: Clock,
    title: "Emergency Service",
    description: "24/7 emergency repair and support services.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "Dedicated support team for all your queries.",
  },
];

const Services = () => {
  return (
    <div>
      <PageBanner title="Services" breadcrumb="Services" />
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-6 leading-tight">
                Air-conditioning systems need regular & timely maintenance for
                effective results:
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                With proper and timely maintenance, air-conditioning systems can
                retain their efficiency and increase product life. If products
                are not maintained and serviced, they not only have shorter life
                span but also increase power consumption.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We encourage our buyers to call us for maintenance and servicing
                of their air conditioning systems.
              </p>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src="/images/ac_service.jpg"
                  alt="AC Maintenance Tools"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-6">
                Services provided
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Comfort Aircon is one of the most trusted and professional
                Air-conditioning dealers in Northern India. Our services focus
                on providing our customers the most comprehensive range of
                products for their needs. Our aim is for you to have an energy
                efficient system that makes the indoor experience comfortable
                and delightful for you.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Comfort Aircon service contract includes the following services:
              </p>

              <ul className="space-y-4 mb-8">
                <li className="text-muted-foreground">
                  <span className="font-bold text-secondary">
                    Trained Personnel Visit:
                  </span>{" "}
                  Our teams of experienced and trained engineer visit the
                  premises for servicing.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-bold text-secondary">
                    Priority Service:
                  </span>{" "}
                  We take all service requests and issues very seriously and
                  make it a top priority
                </li>
                <li className="text-muted-foreground">
                  <span className="font-bold text-secondary">
                    Preventive Maintenance:
                  </span>{" "}
                  We also provide the timely servicing and routine maintenance
                  as per company policies.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-bold text-secondary">
                    Genuine Parts:
                  </span>{" "}
                  It goes without saying that all are spare parts and
                  replacements are 100% genuine.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-bold text-secondary">
                    Extended Life:
                  </span>{" "}
                  We assure our customers more efficient and durable products
                  after proper care and timely service.
                </li>
              </ul>

              <Link
                to="/contact"
                className="inline-block bg-primary text-primary-foreground px-8 py-3 font-semibold rounded hover:bg-primary/90 transition-colors"
              >
                Book an Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
