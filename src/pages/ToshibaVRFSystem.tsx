import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    image: `${import.meta.env.BASE_URL}images/toshiba/vrf/vrf1.jpg`,
    title: "Side Discharge",
  },
  {
    image: `${import.meta.env.BASE_URL}images/toshiba/vrf/vrf2.jpg`,
    title: "Top Discharge",
  },
];

const ToshibaVRFSystem = () => {
  return (
    <div>
      <PageBanner title="Toshiba VRF System" breadcrumb="Toshiba VRF System" />
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

export default ToshibaVRFSystem;
