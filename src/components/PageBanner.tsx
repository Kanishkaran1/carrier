interface PageBannerProps {
  title: string;
  breadcrumb?: string;
}

const PageBanner = ({ title, breadcrumb }: PageBannerProps) => {
  return (
    <div className="bg-secondary py-12 px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold uppercase text-secondary-foreground">{title}</h1>
        {breadcrumb && (
          <p className="text-sm text-secondary-foreground/70 mt-2">Home &gt; {breadcrumb}</p>
        )}
      </div>
    </div>
  );
};

export default PageBanner;
