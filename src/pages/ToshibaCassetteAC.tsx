import PageBanner from "@/components/PageBanner";

const products = [
  {
    image: "/images/toshiba/cassette/toshibacassette1.jpg",
    title: "Digital Inverter 4Way Cassette (1:1) Heat Pump",
  },
  {
    image: "/images/toshiba/cassette/toshibacassete2.jpg",
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

export default ToshibaCassetteAC;
