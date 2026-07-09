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
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Our Services"
          title="Comprehensive Development Solutions"
          subtitle="Tailored consulting, research, and advisory services for development partners."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {displayed.map((service, i) => {
            const Icon = iconMap[service.icon] || Search;
            return (
              <ScrollReveal key={service.id} delay={i * 80}>
                <div className="bg-white border border-gray-200 rounded-[10px] p-8 hover:translate-y-[-2px] hover:shadow-hover transition-all duration-180 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-[6px] bg-navy-900 flex items-center justify-center shrink-0 shadow-sm">
                      <Icon className="text-teal-100" size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-navy-900 font-extrabold text-xl mb-1 font-heading">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <ul className="ml-16 space-y-1.5">
                    {service.items.slice(0, 3).map((item) => (
                      <li
                        key={item}
                        className="text-gray-900 text-sm flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-700 shrink-0" />
                        {item}
                      </li>
                    ))}
                    {service.items.length > 3 && (
                      <li className="text-gray-600 text-sm italic">
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
            className="inline-flex items-center justify-center h-11 px-8 text-sm font-semibold rounded-[6px] bg-teal-700 hover:bg-teal-800 text-white shadow-sm transition-colors duration-180"
          >
            View All Services →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
