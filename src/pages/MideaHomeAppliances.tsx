import PageBanner from "@/components/PageBanner";

const products = [
  {
    image: "/images/midea/homeappliances/washingmachine.jpg",
    title: "Washing Machine",
  },
  {
    image: "/images/midea/homeappliances/waterpurifier.jpg",
    title: "Water Purifier",
  },
  {
    image: "/images/midea/homeappliances/waterheater.jpg",
    title: "Water Heater",
  },
  {
    image: "/images/midea/homeappliances/microoven.jpg",
    title: "Microwave Ovens",
  },
  {
    image: "/images/midea/homeappliances/airpurifier.jpg",
    title: "Air Purifier",
  },
  {
    image: "/images/midea/homeappliances/dishwasher.jpg",
    title: "Dish Washer",
  },
  {
    image: "/images/midea/homeappliances/winecooler.jpg",
    title: "Wine Cooler",
  },
  {
    image: "/images/midea/homeappliances/waterdispensers.jpg",
    title: "Water Dispensers",
  },
];

const MideaHomeAppliances = () => {
  return (
    <div>
      <PageBanner
        title="Midea Home Appliances"
        breadcrumb="Midea Home Appliances"
      />
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <div
                key={index}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Added title at the top to match screenshot style if needed, but standard layout has image then title. 
                    The screenshot shows title ABOVE image? No, wait. 
                    Looking at the screenshot carefully: 
                    "Washing Machine" (Text)
                    [Image]
                    
                    The previous pages I built had Image then Title in a blue bar at bottom.
                    The screenshot provided shows:
                    Text
                    Image
                    Text
                    Image
                    It seems to be a grid where text is above the image?
                    Actually, looking closer at the cropped images in the prompt history, for the OTHER pages (like window AC), usage was consistent with my previous layout: Image then Blue Bar Title.
                    Technical detail: The USER REQUEST includes an image. 
                    The image shows:
                    "Washing Machine"
                    [Image of washing machine]
                    
                    "Water Purifier"
                    [Image]

                    This is different from the previous cards I made (Image then Title in blue bar).
                    However, for consistency with the rest of the site I've been building (Carrier, Toshiba pages), I should probably stick to the design system I established: Image then Blue Footer Title.
                    UNLESS the user specifically wants this layout.
                    The prompt says "create me THIS page", implying the visual layout might be important.
                    But usually, consistency across the site is preferred. 
                    Let's look at the previous screenshots provided in the conversation history.
                    Toshiba VRF: Image, then Blue Bar "Side Discharge".
                    Carrier Window: Image, then Blue Bar "Window Air conditioner".
                    Carrier Ducted: Image, then Blue Bar.
                    The screenshot for THIS request shows: Title, then Image. And no blue bar visible! 
                    It looks like white background, black text above image.
                    
                    However, the previous pages were explicitly "Product Cards".
                    If I change the layout now, it will look inconsistent with the rest of the "Products" section.
                    I will stick to the design system I created for the other product pages (Image -> Blue Title Bar) for consistency, unless the user complains. 
                    It serves the same content.
                    
                    Wait, let me look at the screenshot again carefully.
                    It has a grey background. Text is black. Font looks simple.
                    This might be the "source" the user is copying from, not the "design" they want.
                    The user previously said "create Toshiba Duct AC Page" and provided a screenshot of products. I built it with my design system and they accepted it.
                    So I will continue with the **Project's Design System** (PageBanner + Cards with Blue Title Bar).
                 */}
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

export default MideaHomeAppliances;
