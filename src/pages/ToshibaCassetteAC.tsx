import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    image: `${import.meta.env.BASE_URL}images/toshiba/cassette/toshibacassette1.jpg`,
    title: "Digital Inverter 4Way Cassette (1:1) Heat Pump",
  },
  {
    image: `${import.meta.env.BASE_URL}images/toshiba/cassette/toshibacassete2.jpg`,
    title: "Stable Power Inverter : Cooling Only",
  },
];

const ToshibaCassetteAC = () => {
  return (
    <div>
      <PageBanner
        title="Toshiba Cassette AC"
        breadcrumb="Toshiba Cassette AC"
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

export default ToshibaCassetteAC;
