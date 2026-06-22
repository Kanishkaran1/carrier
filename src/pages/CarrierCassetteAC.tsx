import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    image: "/images/carrier/cassette/cast1.jpg",
    title: "Cassette : R22 Refrigerant",
  },
  {
    image: "/images/carrier/cassette/cast2.jpg",
    title: "Cassette : R410A Refrigerant",
  },
];

const CarrierCassetteAC = () => {
  return (
    <div>
      <PageBanner
        title="Carrier Cassette AC"
        breadcrumb="Carrier Cassette AC"
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

export default CarrierCassetteAC;
