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
      <section className="bg-navy pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        <div className="hero-arc w-[500px] h-[500px] -top-60 -right-60 opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-3">
            Our Expertise
          </p>
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Areas of Expertise
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Deep sector knowledge across 15 critical development areas, backed
            by decades of combined hands-on experience.
          </p>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {expertiseAreas.map((area, i) => {
              const Icon = iconMap[area.icon] || Landmark;
              const isEven = i % 2 === 0;
              return (
                <ScrollReveal key={`${area.title}-${i}`} delay={i * 50}>
                  <div
                    className={`flex flex-col md:flex-row gap-6 md:gap-8 items-start p-6 md:p-8 rounded-2xl transition-colors duration-300 hover:bg-slate ${
                      isEven ? "" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-navy flex items-center justify-center">
                        <Icon className="text-gold" size={28} />
                      </div>
                    </div>
                    <div>
                      <h3 className="heading-section text-xl md:text-2xl text-navy mb-3">
                        {area.title}
                      </h3>
                      <p className="text-charcoal leading-relaxed text-base">
                        {area.fullDesc}
                      </p>
                    </div>
                  </div>
                  {i < expertiseAreas.length - 1 && (
                    <div className="section-divider" />
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
