import Link from "next/link";
import { expertiseAreas } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Landmark,
  Scale,
  HardHat,
  HeartHandshake,
  UsersRound,
  GraduationCap,
  Globe,
  Briefcase,
  Megaphone,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Landmark,
  Scale,
  HardHat,
  HeartHandshake,
  UsersRound,
  GraduationCap,
  Globe,
  Briefcase,
  Megaphone,
};

export default function ExpertiseGlance() {
  const displayed = expertiseAreas.slice(0, 9);

  return (
    <section className="py-12 md:py-14 bg-[#f7f8fa] relative overflow-hidden">
      {/* Subtle topographic connection lines overlay */}
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
              Areas of Expertise
            </p>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={50}>
            <h2 className="text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] lg:leading-[1.1] text-[#0C1B38] font-extrabold mb-6 font-heading tracking-tight max-w-[800px] mx-auto">
              Delivering Impact Across Key Sectors
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={100}>
            <p className="text-gray-500 text-[17px] leading-[1.7] max-w-[620px] mx-auto">
              Providing research, advice, and capacity building support across major development domains.
            </p>
          </ScrollReveal>
        </div>

        {/* Symmetric Grid: Exactly 3 boxes per line on tablet/desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {displayed.map((area, i) => {
            const Icon = iconMap[area.icon] || Landmark;
            const numStr = (i + 1).toString().padStart(2, "0");

            return (
              <ScrollReveal key={area.title} delay={i * 30}>
                <div className="group relative bg-white border border-gray-200/60 rounded-[16px] p-5 lg:p-6 shadow-[0_8px_30px_rgba(12,27,56,0.02)] hover:shadow-[0_20px_45px_rgba(12,27,56,0.06)] hover:-translate-y-1.5 hover:border-[#156E67]/30 transition-all duration-300 ease-out h-full flex flex-col justify-between overflow-hidden">
                  
                  {/* Subtle design accent category numbers */}
                  <span className="absolute top-5 right-5 text-xs font-bold tracking-widest text-gray-300 font-heading select-none">
                    {numStr}
                  </span>

                  {/* Card Content */}
                  <div>
                    {/* Icon Container with soft teal background */}
                    <div className="w-10 h-10 rounded-[10px] bg-[#156E67]/8 group-hover:bg-[#156E67]/15 flex items-center justify-center mb-4 transition-colors duration-300">
                      <Icon className="text-[#156E67]" size={20} strokeWidth={1.5} />
                    </div>

                    <h3 className="text-[#0C1B38] font-extrabold text-[19px] sm:text-xl mb-2 font-heading tracking-tight leading-snug">
                      {area.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-[420px]">
                      {area.shortDesc}
                    </p>
                  </div>

                  {/* Decorative abstract SVG backgrounds on larger cards */}
                  {i === 1 && (
                    <div className="absolute right-0 bottom-0 w-28 h-28 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none select-none">
                      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full text-teal-700">
                        <circle cx="50" cy="50" r="40" strokeWidth="1.5" strokeDasharray="3 3" />
                        <circle cx="50" cy="50" r="24" strokeWidth="1.5" />
                        <line x1="50" y1="10" x2="50" y2="90" strokeWidth="1" />
                        <line x1="10" y1="50" x2="90" y2="50" strokeWidth="1" />
                      </svg>
                    </div>
                  )}

                  {i === 2 && (
                    <div className="absolute right-4 bottom-4 w-36 h-20 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none select-none">
                      <svg viewBox="0 0 160 100" fill="none" stroke="currentColor" className="w-full h-full text-[#0C1B38]">
                        <path d="M 10 90 L 40 50 L 70 70 L 110 30 L 150 60" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="10" y1="90" x2="150" y2="90" strokeWidth="1" />
                        <circle cx="110" cy="30" r="3" fill="currentColor" />
                      </svg>
                    </div>
                  )}

                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Centered CTA Action Button */}
        <ScrollReveal className="text-center mt-16 md:mt-20">
          <Link
            href="/expertise"
            className="inline-flex items-center justify-center h-12 px-8 text-sm font-semibold rounded-[12px] bg-[#156E67] hover:bg-[#1C857D] text-white shadow-[0_4px_14px_rgba(21,110,103,0.15)] hover:shadow-[0_6px_20px_rgba(21,110,103,0.25)] hover:translate-y-[-2px] transition-all duration-[250ms] ease-in-out font-heading"
          >
            Explore All Expertise Areas →
          </Link>
        </ScrollReveal>

      </div>
    </section>
  );
}
