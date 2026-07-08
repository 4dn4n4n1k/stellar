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
    <section className="py-20 md:py-28 bg-navy relative overflow-hidden">
      {/* Decorative arcs */}
      <div className="hero-arc w-[500px] h-[500px] -top-64 -right-64 opacity-10" />
      <div
        className="hero-arc w-[350px] h-[350px] -bottom-40 -left-40 opacity-10"
        style={{ animationDelay: "-10s" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why Stellar Associates"
          subtitle="What sets us apart in the development consultancy landscape."
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyStellar.map((item, i) => {
            const Icon = iconMap[item.icon] || CheckCircle;
            return (
              <ScrollReveal key={item.title} delay={i * 120}>
                <div className="glass-card rounded-xl p-6 text-center h-full hover:bg-white/5 transition-colors duration-300">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mx-auto mb-5">
                    <Icon className="text-gold" size={28} />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
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
