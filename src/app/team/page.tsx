import type { Metadata } from "next";
import { teamMembers, associateExperts } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the leadership team and associate experts at Stellar Associates — experienced development professionals driving impact.",
};

export default function TeamPage() {
  return (
    <div className="page-enter">
      {/* Hero Banner */}
      <section className="bg-navy pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        <div className="hero-arc w-[400px] h-[400px] -top-40 -right-40 opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-3">
            Our People
          </p>
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Our Team
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            A multidisciplinary team of experienced professionals with deep
            expertise across governance, research, labor rights, and inclusive
            development.
          </p>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Leadership Team"
            subtitle="Our founding partners bring decades of combined development experience."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-slate rounded-2xl p-8 text-center card-hover-gold h-full">
                  {/* Placeholder Photo */}
                  <div className="team-photo-placeholder mx-auto mb-6">
                    <User className="text-white/60" size={48} />
                  </div>

                  <h3 className="text-navy font-semibold text-xl mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gold text-sm font-medium mb-4">
                    {member.title}
                  </p>
                  <p className="text-warm-grey text-sm leading-relaxed mb-5">
                    {member.bio}
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.map((exp) => (
                      <Badge
                        key={exp}
                        variant="secondary"
                        className="bg-navy/5 text-navy text-xs"
                      >
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Associate Experts */}
      <section className="py-20 md:py-28 bg-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Associate Experts"
            subtitle="Specialized consultants available for project-specific engagement."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {associateExperts.map((expert, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="bg-white rounded-xl p-6 card-hover-gold h-full flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-navy/5 flex items-center justify-center shrink-0">
                    <User className="text-navy/40" size={24} />
                  </div>
                  <div>
                    <h4 className="text-navy font-semibold text-base">
                      {expert.title}
                    </h4>
                    <p className="text-warm-grey text-sm">
                      {expert.expertise}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
