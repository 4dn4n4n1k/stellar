import Link from "next/link";
import { servicesData } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Search,
  BarChart3,
  Landmark,
  GraduationCap,
  HardHat,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Search,
  BarChart3,
  Landmark,
  GraduationCap,
  HardHat,
};

export default function ServicesSnapshot() {
  // Show first 4 services on homepage
  const displayed = servicesData.slice(0, 4);

  // Group services for the asymmetrical layout:
  // Left Column gets items 0 and 2 (Research and Governance)
  // Right Column gets items 1 and 3 (MEL and Labor)
  const leftColServices = [displayed[0], displayed[2]];
  const rightColServices = [displayed[1], displayed[3]];

  return (
    <section className="py-12 md:py-14 bg-[#f7f8fa] relative overflow-hidden">
      {/* Subtle background geometric pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none select-none" 
        style={{ 
          backgroundImage: "radial-gradient(#156E67 1.2px, transparent 1.2px)", 
          backgroundSize: "32px 32px" 
        }} 
      />

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-10 md:mb-12 flex flex-col items-center">
          <ScrollReveal variant="up">
            <p className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] mb-4">
              Our Services
            </p>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={100}>
            <h2 className="text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] lg:leading-[1.1] text-[#0C1B38] font-extrabold mb-6 font-heading tracking-tight max-w-[800px] mx-auto">
              Comprehensive Development Solutions
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={200}>
            <p className="text-gray-500 text-[17px] leading-[1.7] max-w-[620px] mx-auto">
              Tailored consulting, research, and advisory services for development partners.
            </p>
          </ScrollReveal>
        </div>

        {/* Asymmetrical Staggered Editorial Layout (Visible only on lg and above) */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          
          {/* Left Column (No Offset) */}
          <div className="space-y-6 lg:space-y-8">
            {leftColServices.map((service, index) => {
              if (!service) return null;
              const Icon = iconMap[service.icon] || Search;
              const numStr = (index * 2 + 1).toString().padStart(2, "0"); // 01, 03

              return (
                <ScrollReveal key={service.id} delay={index * 120} variant="up">
                  <div className="group relative bg-white border border-gray-200/50 rounded-[18px] p-6 lg:p-7 shadow-[0_10px_35px_rgba(12,27,56,0.02)] hover:shadow-[0_20px_50px_rgba(12,27,56,0.06)] hover:-translate-y-1.5 hover:border-[#156E67]/30 transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden">
                    
                    {/* Faint document numbering */}
                    <span className="absolute top-6 right-6 text-xs font-bold tracking-widest text-gray-300 font-heading select-none">
                      {numStr}
                    </span>

                    <div>
                      {/* Outlined Icon Container */}
                      <div className="w-10 h-10 rounded-[10px] bg-[#156E67]/8 group-hover:bg-[#156E67]/15 flex items-center justify-center mb-4 transition-colors duration-300">
                        <Icon className="text-[#156E67]" size={20} strokeWidth={1.5} />
                      </div>

                      <h3 className="text-[#0C1B38] font-extrabold text-xl sm:text-[22px] mb-2 font-heading tracking-tight leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-[480px]">
                        {service.description}
                      </p>

                      <div className="w-full h-px bg-gray-100 my-4" />

                      {/* Capabilities Bullet List */}
                      <ul className="space-y-2.5 mb-2">
                        {service.items.slice(0, 4).map((item) => (
                          <li key={item} className="text-gray-700 text-sm flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#156E67] shrink-0" />
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                        {service.items.length > 4 && (
                          <li className="text-[#156E67] text-xs font-semibold uppercase tracking-wider pl-4.5 pt-1.5">
                            + {service.items.length - 4} More Capabilities
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Right Column (Offset Downward by lg:pt-8) */}
          <div className="space-y-6 lg:space-y-8 lg:pt-8">
            {rightColServices.map((service, index) => {
              if (!service) return null;
              const Icon = iconMap[service.icon] || Search;
              const numStr = (index * 2 + 2).toString().padStart(2, "0"); // 02, 04

              return (
                <ScrollReveal key={service.id} delay={index * 120 + 60} variant="up">
                  <div className="group relative bg-white border border-gray-200/50 rounded-[18px] p-6 lg:p-7 shadow-[0_10px_35px_rgba(12,27,56,0.02)] hover:shadow-[0_20px_50px_rgba(12,27,56,0.06)] hover:-translate-y-1.5 hover:border-[#156E67]/30 transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden">
                    
                    {/* Faint document numbering */}
                    <span className="absolute top-6 right-6 text-xs font-bold tracking-widest text-gray-300 font-heading select-none">
                      {numStr}
                    </span>

                    <div>
                      {/* Outlined Icon Container */}
                      <div className="w-10 h-10 rounded-[10px] bg-[#156E67]/8 group-hover:bg-[#156E67]/15 flex items-center justify-center mb-4 transition-colors duration-300">
                        <Icon className="text-[#156E67]" size={20} strokeWidth={1.5} />
                      </div>

                      <h3 className="text-[#0C1B38] font-extrabold text-xl sm:text-[22px] mb-2 font-heading tracking-tight leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-[480px]">
                        {service.description}
                      </p>

                      <div className="w-full h-px bg-gray-100 my-4" />

                      {/* Capabilities Bullet List */}
                      <ul className="space-y-2.5 mb-2">
                        {service.items.slice(0, 4).map((item) => (
                          <li key={item} className="text-gray-700 text-sm flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#156E67] shrink-0" />
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                        {service.items.length > 4 && (
                          <li className="text-[#156E67] text-xs font-semibold uppercase tracking-wider pl-4.5 pt-1.5">
                            + {service.items.length - 4} More Capabilities
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>

        {/* Mobile/Tablet Sequential Layout (Visible below lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
          {displayed.map((service, index) => {
            if (!service) return null;
            const Icon = iconMap[service.icon] || Search;
            const numStr = (index + 1).toString().padStart(2, "0"); // 01, 02, 03, 04

            return (
              <ScrollReveal key={service.id} delay={index * 100} variant="up">
                <div className="group relative bg-white border border-gray-200/50 rounded-[18px] p-6 shadow-[0_10px_35px_rgba(12,27,56,0.02)] hover:shadow-[0_20px_50px_rgba(12,27,56,0.06)] hover:-translate-y-1.5 hover:border-[#156E67]/30 transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden">
                  
                  {/* Faint document numbering */}
                  <span className="absolute top-6 right-6 text-xs font-bold tracking-widest text-gray-300 font-heading select-none">
                    {numStr}
                  </span>

                  <div>
                    {/* Outlined Icon Container */}
                    <div className="w-10 h-10 rounded-[10px] bg-[#156E67]/8 group-hover:bg-[#156E67]/15 flex items-center justify-center mb-4 transition-colors duration-300">
                      <Icon className="text-[#156E67]" size={20} strokeWidth={1.5} />
                    </div>

                    <h3 className="text-[#0C1B38] font-extrabold text-xl sm:text-[22px] mb-2 font-heading tracking-tight leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-[480px]">
                      {service.description}
                    </p>

                    <div className="w-full h-px bg-gray-100 my-4" />

                    {/* Capabilities Bullet List */}
                    <ul className="space-y-2.5 mb-2">
                      {service.items.slice(0, 4).map((item) => (
                        <li key={item} className="text-gray-700 text-sm flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#156E67] shrink-0" />
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                      {service.items.length > 4 && (
                        <li className="text-[#156E67] text-xs font-semibold uppercase tracking-wider pl-4.5 pt-1.5">
                          + {service.items.length - 4} More Capabilities
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Action button */}
        <ScrollReveal className="text-center mt-12 md:mt-16" variant="up">
          <Link
            href="/services"
            className="inline-flex items-center justify-center h-12 px-8 text-sm font-semibold rounded-[12px] bg-[#156E67] hover:bg-[#1C857D] text-white shadow-[0_4px_14px_rgba(21,110,103,0.15)] hover:shadow-[0_6px_20px_rgba(21,110,103,0.25)] hover:translate-y-[-2px] transition-all duration-[250ms] ease-in-out font-heading"
          >
            Explore All Services →
          </Link>
        </ScrollReveal>

      </div>
    </section>
  );
}
