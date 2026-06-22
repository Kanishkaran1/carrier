import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    image: `${import.meta.env.BASE_URL}images/carrier/hiwall/hiwall1.jpg`,
    title: "Fixed Speed Hi-Wall Split A.C With R-22 Refrigerant",
  },
  {
    image: `${import.meta.env.BASE_URL}images/carrier/hiwall/hiwall2.png`,
    title: "Fixed Speed Hi Wall Split AC : Cyclojet Type With R-22 Refrigerant",
  },
  {
    image: `${import.meta.env.BASE_URL}images/carrier/hiwall/hiwall3.jpg`,
    title: "Inverter Hi-Wall Split A.C With R-410A Refrigerant",
  },
];

const CarrierHiWallAC = () => {
  return (
    <div>
      <PageBanner title="Carrier Hi-Wall AC" breadcrumb="Carrier Hi-Wall AC" />
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <ProductCard key={index} image={product.image} title={product.title} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarrierHiWallAC;
