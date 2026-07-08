import type { Metadata } from "next";
import { expertiseAreas } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
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
  Vote,
  Heart,
  Accessibility,
  TreePine,
  Radio,
  BookOpen,
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
  Vote,
  Heart,
  Accessibility,
  TreePine,
  Radio,
  BookOpen,
};

export const metadata: Metadata = {
  title: "Areas of Expertise",
  description:
    "Explore Stellar Associates' 15 areas of expertise spanning democracy, governance, labor rights, humanitarian assistance, and more.",
};

export default function ExpertisePage() {
  return (
    <div className="page-enter">
      {/* Hero Banner */}
      <section className="bg-navy-950 pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        {/* Brand Pattern Background */}
        <svg
          className="absolute -top-20 -right-20 w-[40%] h-[60%] opacity-15 pointer-events-none"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="400" cy="0" r="100" stroke="white" strokeWidth="1" />
          <circle cx="400" cy="0" r="200" stroke="white" strokeWidth="1" />
          <circle cx="400" cy="0" r="300" stroke="white" strokeWidth="1" />
        </svg>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p className="text-teal-100 font-bold text-xs uppercase tracking-[0.15em] mb-3">
            Our Expertise
          </p>
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-white font-extrabold mb-6 font-heading">
            Areas of Expertise
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Deep sector knowledge across 15 critical development areas, backed
            by decades of combined hands-on experience.
          </p>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {expertiseAreas.map((area, i) => {
              const Icon = iconMap[area.icon] || Landmark;
              const isEven = i % 2 === 0;
              return (
                <ScrollReveal key={`${area.title}-${i}`} delay={i * 40}>
                  <div
                    className={`flex flex-col md:flex-row gap-6 md:gap-8 items-start p-6 md:p-8 rounded-[10px] border border-transparent transition-all duration-180 hover:bg-gray-50 hover:border-gray-200 hover:shadow-xs ${
                      isEven ? "" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-[6px] bg-navy-900 flex items-center justify-center shadow-sm">
                        <Icon className="text-teal-100" size={22} strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="heading-section text-xl md:text-2xl text-navy-900 font-extrabold mb-3 font-heading">
                        {area.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-base">
                        {area.fullDesc}
                      </p>
                    </div>
                  </div>
                  {i < expertiseAreas.length - 1 && (
                    <div className="border-t border-gray-200 my-6" />
                  )}
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
