import Link from "next/link";
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
  // Show first 9 on homepage
  const displayed = expertiseAreas.slice(0, 9);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Areas of Expertise"
          title="Delivering Impact Across Key Sectors"
          subtitle="Providing research, advice, and capacity building support across major development domains."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((area, i) => {
            const Icon = iconMap[area.icon] || Landmark;
            return (
              <ScrollReveal key={area.title} delay={i * 60}>
                <div className="bg-white border border-gray-200 rounded-[10px] p-6 card-hover-teal shadow-sm h-full">
                  <div className="w-12 h-12 rounded-[6px] bg-navy-900 flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="text-teal-100" size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-navy-900 font-bold text-lg mb-2 font-heading">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {area.shortDesc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="text-center mt-10">
          <Link
            href="/expertise"
            className="inline-flex items-center justify-center h-10 px-6 text-sm font-semibold rounded-[6px] border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white shadow-xs transition-colors duration-180"
          >
            Explore All Expertise Areas →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
