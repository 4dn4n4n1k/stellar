import Link from "next/link";
import { servicesData } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import {
  Search,
  BarChart3,
  Landmark,
  GraduationCap,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Search,
  BarChart3,
  Landmark,
  GraduationCap,
};

export default function ServicesSnapshot() {
  // Show first 4 services on homepage
  const displayed = servicesData.slice(0, 4);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive development solutions tailored to your needs."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {displayed.map((service, i) => {
            const Icon = iconMap[service.icon] || Search;
            return (
              <ScrollReveal key={service.id} delay={i * 100}>
                <div className="bg-slate rounded-xl p-8 card-hover h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center shrink-0">
                      <Icon className="text-gold" size={26} />
                    </div>
                    <div>
                      <h3 className="text-navy font-semibold text-xl mb-1">
                        {service.title}
                      </h3>
                      <p className="text-warm-grey text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <ul className="ml-[4.5rem] space-y-1.5">
                    {service.items.slice(0, 3).map((item) => (
                      <li
                        key={item}
                        className="text-charcoal text-sm flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        {item}
                      </li>
                    ))}
                    {service.items.length > 3 && (
                      <li className="text-warm-grey text-sm italic">
                        +{service.items.length - 3} more
                      </li>
                    )}
                  </ul>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center justify-center h-11 px-8 text-sm font-semibold rounded-lg bg-gradient-to-r from-gold to-gold-light text-navy hover:from-gold-light hover:to-gold shadow-lg shadow-gold/20 transition-all"
          >
            View All Services →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
