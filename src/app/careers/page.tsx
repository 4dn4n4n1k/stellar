import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Send, Users, Briefcase, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Stellar Associates — explore current opportunities and become part of our expert network.",
};

export default function CareersPage() {
  return (
    <div className="page-enter">
      {/* Hero Banner */}
      <section className="bg-navy pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        <div className="hero-arc w-[400px] h-[400px] -top-40 -left-40 opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-3">
            Join Us
          </p>
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Careers
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Be part of a dynamic team shaping the future of development
            practice in Bangladesh.
          </p>
        </div>
      </section>

      {/* Join Our Network */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="w-20 h-20 rounded-full bg-navy/5 flex items-center justify-center mx-auto mb-6">
                <Users className="text-gold" size={36} />
              </div>
              <h2 className="heading-section text-3xl md:text-4xl text-navy mb-4">
                Join Our Expert Network
              </h2>
              <p className="text-warm-grey text-lg leading-relaxed max-w-2xl mx-auto">
                Stellar Associates maintains a roster of qualified professionals
                across multiple development sectors. We regularly engage
                short-term and long-term consultants for research, evaluation,
                training, and advisory assignments.
              </p>
            </div>
          </ScrollReveal>

          {/* What we look for */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Briefcase,
                title: "Sector Experts",
                desc: "Professionals with deep expertise in governance, labor rights, gender, education, or humanitarian sectors.",
              },
              {
                icon: FileText,
                title: "Researchers & Analysts",
                desc: "Experienced researchers, data analysts, and MEL specialists with strong analytical and writing skills.",
              },
              {
                icon: Users,
                title: "Trainers & Facilitators",
                desc: "Skilled facilitators and training designers who can deliver high-quality capacity building programs.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="bg-slate rounded-xl p-6 text-center card-hover-gold h-full">
                  <div className="w-14 h-14 rounded-full bg-navy/5 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="text-gold" size={24} />
                  </div>
                  <h3 className="text-navy font-semibold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-warm-grey text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Current Opportunities */}
      <section className="py-20 md:py-28 bg-slate">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Current Opportunities"
            subtitle="Open positions and consultancy assignments."
          />

          <ScrollReveal>
            <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-navy/5 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="text-navy/30" size={28} />
              </div>
              <h3 className="text-navy font-semibold text-xl mb-2">
                No Current Openings
              </h3>
              <p className="text-warm-grey text-base mb-6">
                We don&apos;t have any active vacancies at the moment, but we&apos;re always
                looking for talented professionals to join our network.
              </p>
              <p className="text-warm-grey text-sm">
                Please submit your CV to be considered for future opportunities.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Submit CV CTA */}
      <section className="py-16 bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h3 className="heading-section text-2xl text-white mb-4">
              Submit Your CV
            </h3>
            <p className="text-white/60 mb-6 max-w-xl mx-auto">
              Interested in working with us? Send your CV and a brief cover
              letter to our team.
            </p>
            <a
              href="mailto:stellarassociatesbd@gmail.com?subject=CV Submission — Expert Network"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-gold-light text-navy font-semibold px-8 py-3 rounded-lg hover:from-gold-light hover:to-gold shadow-lg shadow-gold/20 transition-all duration-300"
            >
              <Send size={18} />
              Submit CV via Email
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
