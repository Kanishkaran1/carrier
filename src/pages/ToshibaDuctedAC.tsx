import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    image: `${import.meta.env.BASE_URL}images/toshiba/ducted/toshibaduct1.png`,
    title: "Ducted Digital Inverter (1:1) Heat Pump",
  },
  {
    image: `${import.meta.env.BASE_URL}images/toshiba/ducted/toshibaduct2.png`,
    title: "Ducted Stable Power Inverter : Cooling Only",
  },
];

const ToshibaDuctedAC = () => {
  return (
    <div>
      <PageBanner title="Toshiba Ducted AC" breadcrumb="Toshiba Ducted AC" />
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

export default ToshibaDuctedAC;
