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
            About Us
          </p>
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-white font-extrabold mb-6 font-heading">
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
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="prose prose-lg max-w-none">
              {whoWeAre.fullIntro.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-gray-900 leading-relaxed mb-6 text-base"
                >
                  {para}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-24 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal variant="left">
              <div className="bg-gray-25 border border-gray-200 rounded-[10px] p-8 md:p-10 h-full shadow-xs">
                <div className="w-12 h-12 rounded-[6px] bg-navy-900 flex items-center justify-center mb-6 shadow-sm">
                  <svg
                    className="text-teal-100"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <h3 className="heading-section text-2xl text-navy-900 font-extrabold mb-4 font-heading">
                  Our Vision
                </h3>
                <p className="text-gray-600 leading-relaxed">{vision}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="right">
              <div className="bg-gray-25 border border-gray-200 rounded-[10px] p-8 md:p-10 h-full shadow-xs">
                <div className="w-12 h-12 rounded-[6px] bg-navy-900 flex items-center justify-center mb-6 shadow-sm">
                  <svg
                    className="text-teal-100"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className="heading-section text-2xl text-navy-900 font-extrabold mb-4 font-heading">
                  Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed">{mission}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Core Values"
            title="The principles that guide everything we do"
            subtitle="Deeply embedded values shaping our consulting practice and partnerships."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreValues.map((value, i) => {
              const Icon = iconMap[value.icon] || Shield;
              return (
                <ScrollReveal key={value.title} delay={i * 60}>
                  <div className="bg-gray-50 border border-gray-200 rounded-[10px] p-6 text-center card-hover-teal shadow-xs h-full">
                    <div className="w-12 h-12 rounded-full bg-navy-900 flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <Icon className="text-teal-100" size={22} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-navy-900 font-bold text-base mb-2 font-heading">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
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
      <section className="py-16 bg-navy-950 border-t border-navy-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h3 className="heading-section text-2xl text-white font-extrabold mb-4 font-heading">
              Download Our Company Profile
            </h3>
            <p className="text-white/60 mb-6">
              Get a comprehensive overview of our services, expertise, and team.
            </p>
            <a
              href="/stellar-profile.pdf"
              download
              className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold px-8 py-3 rounded-[6px] shadow-sm transition-colors duration-180"
            >
              <Download size={18} strokeWidth={1.5} />
              Download PDF
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
