import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    image: `${import.meta.env.BASE_URL}images/midea/hiwall/hiwall1.jpg`,
    title: "Midea Hi-Wall AC Model 1",
  },
  {
    image: `${import.meta.env.BASE_URL}images/midea/hiwall/hiwall3.jpg`,
    title: "Midea Hi-Wall AC Model 2",
  },
];

const MideaHiWallAC = () => {
  return (
    <div>
      <PageBanner title="Midea Hi-Wall AC" breadcrumb="Midea Hi-Wall AC" />
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

export default MideaHiWallAC;
