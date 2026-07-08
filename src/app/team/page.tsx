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
            Our People
          </p>
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-white font-extrabold mb-6 font-heading">
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
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Leadership"
            title="Leadership Team"
            subtitle="Our founding partners bring decades of combined development experience."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="bg-gray-50 border border-gray-200 rounded-[10px] p-8 text-center card-hover-teal h-full shadow-xs flex flex-col justify-between">
                  <div>
                    {/* Premium Placeholder Photo */}
                    <div className="w-20 h-20 bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-teal-700/10">
                      <User className="text-teal-100" size={32} strokeWidth={1.5} />
                    </div>

                    <h3 className="text-navy-900 font-bold text-xl mb-1 font-heading">
                      {member.name}
                    </h3>
                    <p className="text-teal-700 text-sm font-bold mb-4">
                      {member.title}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {member.bio}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.map((exp) => (
                      <Badge
                        key={exp}
                        variant="secondary"
                        className="bg-navy-900/5 text-navy-900 border border-navy-900/10 text-xs font-semibold shadow-none"
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
      <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Associates"
            title="Associate Experts"
            subtitle="Specialized consultants available for project-specific engagement."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {associateExperts.map((expert, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="bg-gray-25 border border-gray-200 rounded-[10px] p-6 card-hover-teal h-full flex items-center gap-4 shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-navy-900/5 border border-navy-900/10 flex items-center justify-center shrink-0 shadow-sm">
                    <User className="text-navy-900/40" size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-navy-900 font-bold text-base font-heading">
                      {expert.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
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
