import type { Metadata } from "next";
import { whoWeAre, vision, mission, coreValues } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Download, Shield, Users, Lightbulb, Handshake, Award } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Users,
  Lightbulb,
  Handshake,
  Award,
};

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Stellar Associates — our story, vision, mission, and core values driving inclusive development in Bangladesh.",
};

export default function AboutPage() {
  return (
    <div className="page-enter">
      {/* Hero Banner */}
      <section className="bg-navy pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        <div className="hero-arc w-[400px] h-[400px] -top-40 -right-40 opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-3">
            About Us
          </p>
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Our Story
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Founded in 2026, Stellar Associates brings together five experienced
            development professionals united by a shared commitment to
            evidence-based, inclusive development.
          </p>
        </div>
      </section>

      {/* Full Intro */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="prose prose-lg max-w-none">
              {whoWeAre.fullIntro.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-charcoal leading-relaxed mb-6 text-base"
                >
                  {para}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 md:py-28 bg-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal variant="left">
              <div className="bg-white rounded-2xl p-8 md:p-10 h-full shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center mb-6">
                  <svg
                    className="text-gold"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <h3 className="heading-section text-2xl text-navy mb-4">
                  Our Vision
                </h3>
                <p className="text-charcoal leading-relaxed">{vision}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="right">
              <div className="bg-white rounded-2xl p-8 md:p-10 h-full shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center mb-6">
                  <svg
                    className="text-gold"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className="heading-section text-2xl text-navy mb-4">
                  Our Mission
                </h3>
                <p className="text-charcoal leading-relaxed">{mission}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Core Values"
            subtitle="The principles that guide everything we do."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreValues.map((value, i) => {
              const Icon = iconMap[value.icon] || Shield;
              return (
                <ScrollReveal key={value.title} delay={i * 100}>
                  <div className="bg-slate rounded-xl p-6 text-center card-hover-gold h-full">
                    <div className="w-14 h-14 rounded-full bg-navy/5 flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-gold" size={24} />
                    </div>
                    <h3 className="text-navy font-semibold text-base mb-2">
                      {value.title}
                    </h3>
                    <p className="text-warm-grey text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Download Profile */}
      <section className="py-16 bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h3 className="heading-section text-2xl text-white mb-4">
              Download Our Company Profile
            </h3>
            <p className="text-white/60 mb-6">
              Get a comprehensive overview of our services, expertise, and team.
            </p>
            <a
              href="/stellar-profile.pdf"
              download
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-gold-light text-navy font-semibold px-8 py-3 rounded-lg hover:from-gold-light hover:to-gold shadow-lg shadow-gold/20 transition-all duration-300"
            >
              <Download size={18} />
              Download PDF
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
