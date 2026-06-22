import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    image: "/images/carrier/packaged/packaged.jpg",
    title: "Packaged AC",
  },
];

const CarrierPackagedAC = () => {
  return (
    <div>
      <PageBanner
        title="Carrier Packaged AC"
        breadcrumb="Carrier Packaged AC"
      />
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {products.map((product, index) => (
              <ProductCard key={index} image={product.image} title={product.title} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarrierPackagedAC;
