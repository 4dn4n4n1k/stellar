import { whyStellar } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Brain, MapPin, LineChart, CheckCircle } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Brain,
  MapPin,
  LineChart,
  CheckCircle,
};

export default function WhyStellar() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Why Stellar"
          title="Why Stellar Associates"
          subtitle="What sets us apart in the development consultancy landscape."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyStellar.map((item, i) => {
            const Icon = iconMap[item.icon] || CheckCircle;
            return (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="bg-white border border-gray-200 rounded-[10px] p-6 text-center h-full card-hover shadow-sm transition-all duration-180">
                  <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto mb-5">
                    <Icon className="text-teal-700" size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-navy-900 font-bold text-lg mb-3 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
