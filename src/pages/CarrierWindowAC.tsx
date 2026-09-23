import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    image: `${import.meta.env.BASE_URL}images/carrier/window/window1.jpg`,
    title: "Window Air conditioner",
  },
];

const CarrierWindowAC = () => {
  return (
    <div className="bg-cinema text-white min-h-screen">
      <PageBanner title="Carrier Window AC" breadcrumb="Carrier Window AC" />
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid pointer-events-none opacity-40" />
        <div className="container mx-auto relative z-10">
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

export default CarrierWindowAC;
