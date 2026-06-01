import PageBanner from "@/components/PageBanner";

const clients = [
  "Canara Bank", "Capgemini", "TATA", "Levi's", "TATA Motors",
  "Aditya Birla", "Tonino", "Larsen & Toubro", "Adidas",
  "Swaminarayan Akshardham", "Dr Lal PathLabs", "Syndicate Bank",
  "Red Cross", "Cafe Coffee Day", "State Bank of India",
  "Chai Point", "Reebok", "Lifestyle", "Spencer's", "M2K",
  "Parsvnath", "Punjab National Bank", "Union Bank of India",
  "TATA Communications", "BLK Hospital", "Metro Hospital",
];

const Clients = () => {
  return (
    <div>
      <PageBanner title="Our Clients" breadcrumb="Our Clients" />
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold uppercase text-secondary text-center mb-2">Some of Our Customers</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-10" />
          <div className="flex flex-wrap justify-center gap-6">
            {clients.map((c) => (
              <div
                key={c}
                className="bg-muted rounded shadow-sm px-8 py-5 flex items-center justify-center min-w-[160px] hover:shadow-md transition-shadow"
              >
                <span className="font-semibold text-secondary">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clients;
