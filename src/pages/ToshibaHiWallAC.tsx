import PageBanner from "@/components/PageBanner";

const products = [
  {
    image: "/images/toshiba/hiwallac/toshibahiwall1.png",
    title: "Fixed Speed Hi-Wall Split A.C With R-410A Refrigerant",
  },
  {
    image: "/images/toshiba/hiwallac/toshibahiwall2.png",
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
              <div
                key={index}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="p-8 flex-1 flex items-center justify-center bg-white min-h-[300px]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-auto object-contain max-h-[250px] transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="bg-[#004080] p-4 text-center">
                  <h3 className="text-white font-medium text-sm md:text-base">
                    {product.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToshibaHiWallAC;
