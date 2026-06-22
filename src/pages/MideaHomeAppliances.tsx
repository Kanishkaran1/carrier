import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    image: "/images/midea/homeappliances/washingmachine.jpg",
    title: "Washing Machine",
  },
  {
    image: "/images/midea/homeappliances/waterpurifier.jpg",
    title: "Water Purifier",
  },
  {
    image: "/images/midea/homeappliances/waterheater.jpg",
    title: "Water Heater",
  },
  {
    image: "/images/midea/homeappliances/microoven.jpg",
    title: "Microwave Ovens",
  },
  {
    image: "/images/midea/homeappliances/airpurifier.jpg",
    title: "Air Purifier",
  },
  {
    image: "/images/midea/homeappliances/dishwasher.jpg",
    title: "Dish Washer",
  },
  {
    image: "/images/midea/homeappliances/winecooler.jpg",
    title: "Wine Cooler",
  },
  {
    image: "/images/midea/homeappliances/waterdispensers.jpg",
    title: "Water Dispensers",
  },
];

const MideaHomeAppliances = () => {
  return (
    <div>
      <PageBanner
        title="Midea Home Appliances"
        breadcrumb="Midea Home Appliances"
      />
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product) => (
              <ProductCard key={product.title} image={product.image} title={product.title} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MideaHomeAppliances;
