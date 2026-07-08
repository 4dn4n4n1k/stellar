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
    <section className="py-20 md:py-28 bg-slate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Areas of Expertise"
          subtitle="Delivering impact across critical development sectors."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((area, i) => {
            const Icon = iconMap[area.icon] || Landmark;
            return (
              <ScrollReveal key={area.title} delay={i * 80}>
                <div className="bg-white rounded-xl p-6 card-hover-gold h-full">
                  <div className="w-12 h-12 rounded-lg bg-navy/5 flex items-center justify-center mb-4">
                    <Icon className="text-gold" size={24} />
                  </div>
                  <h3 className="text-navy font-semibold text-lg mb-2">
                    {area.title}
                  </h3>
                  <p className="text-warm-grey text-sm leading-relaxed">
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
            className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium rounded-lg border border-navy text-navy hover:bg-navy hover:text-white transition-all"
          >
            Explore All Expertise Areas →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
