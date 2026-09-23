import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    image: `${import.meta.env.BASE_URL}images/toshiba/hiwallac/toshibahiwall1.png`,
    title: "Fixed Speed Hi-Wall Split A.C With R-410A Refrigerant",
  },
  {
    image: `${import.meta.env.BASE_URL}images/toshiba/hiwallac/toshibahiwall2.png`,
    title: "Inverter Hi-Wall Split A.C With R-410A Refrigerant",
  },
];

const ToshibaHiWallAC = () => {
  return (
    <div>
      <PageBanner title="Toshiba Hi-Wall AC" breadcrumb="Toshiba Hi-Wall AC" />
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

export default ToshibaHiWallAC;
