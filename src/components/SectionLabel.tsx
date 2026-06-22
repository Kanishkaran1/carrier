import { Wind } from "lucide-react";

const SectionLabel = ({
  children,
  center = false,
}: {
  children: React.ReactNode;
  center?: boolean;
}) => (
  <div className={`flex items-center gap-2.5 mb-4 ${center ? "justify-center" : ""}`}>
    <Wind size={13} className="text-primary" strokeWidth={2.5} />
    <span className="text-primary text-[10px] font-bold uppercase tracking-[0.28em]">
      {children}
    </span>
  </div>
);

export default SectionLabel;
