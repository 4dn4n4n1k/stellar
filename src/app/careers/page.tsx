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
      <section className="bg-navy-950 pt-28 pb-14 md:pt-32 md:pb-18 relative overflow-hidden">
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
          <p 
            className="text-teal-100 font-bold text-xs uppercase tracking-[0.15em] mb-3 animate-fade-slide-up"
            style={{ animationDelay: '100ms' }}
          >
            Join Us
          </p>
          <h1 
            className="heading-display text-4xl md:text-5xl lg:text-6xl text-white font-extrabold mb-6 font-heading animate-fade-slide-up"
            style={{ animationDelay: '250ms' }}
          >
            Careers
          </h1>
          <p 
            className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto animate-fade-slide-up"
            style={{ animationDelay: '400ms' }}
          >
            Be part of a dynamic team shaping the future of development
            practice in Bangladesh.
          </p>
        </div>
      </section>

      {/* Join Our Network */}
      <section className="pt-10 pb-12 md:pt-12 md:pb-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-12">
              <div className="w-12 h-12 rounded-full bg-navy-900 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Users className="text-teal-100" size={20} strokeWidth={2} />
              </div>
              <h2 className="heading-section text-2xl md:text-3xl text-gray-900 font-extrabold mb-3 font-heading">
                Join Our Expert Network
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
                Stellar Associates maintains a roster of qualified professionals across multiple development sectors.<br className="hidden md:inline" />
                We regularly engage short-term and long-term consultants for research, evaluation,<br className="hidden md:inline" />
                training, and advisory assignments.
              </p>
            </div>
          </ScrollReveal>

          {/* What we look for */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <ScrollReveal key={item.title} delay={i * 60}>
                <div className="bg-gray-50 border border-gray-200 rounded-[10px] p-6 text-center card-hover-teal h-full shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-navy-900 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <item.icon className="text-teal-100" size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-navy-900 font-bold text-lg mb-2 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Current Opportunities */}
      <section className="pt-10 pb-8 md:pt-12 md:pb-10 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Opportunities"
            title="Current Opportunities"
            subtitle="Open positions and consultancy assignments."
          />

          <ScrollReveal>
            <div className="bg-gray-25 border border-gray-200 rounded-[10px] p-6 sm:p-8 text-center shadow-xs max-w-xl mx-auto">
              <div className="w-12 h-12 rounded-full bg-navy-900/5 flex items-center justify-center mx-auto mb-3">
                <Briefcase className="text-navy-900/30" size={22} strokeWidth={1.5} />
              </div>
              <h3 className="text-navy-900 font-bold text-lg mb-2 font-heading">
                No Current Openings
              </h3>
              <p className="text-gray-500 text-sm sm:text-base mb-3 max-w-md mx-auto">
                We don&apos;t have any active vacancies at the moment, but we&apos;re always
                looking for talented professionals to join our network.
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">
                Please submit your CV to be considered for future opportunities.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Submit CV CTA - Mockup Styled */}
      <section className="pt-4 pb-12 md:pt-6 md:pb-16 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto bg-[#0c1b38] border border-white/5 rounded-[24px] py-8 px-6 md:py-10 md:px-10 text-center relative overflow-hidden shadow-lg">
              {/* Subtle circular overlay graphics to match the mockup */}
              <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
                <svg className="w-full h-full" viewBox="0 0 1000 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="0" cy="200" r="180" stroke="white" strokeWidth="1" />
                  <circle cx="0" cy="200" r="300" stroke="white" strokeWidth="0.5" />
                  <circle cx="1000" cy="200" r="180" stroke="white" strokeWidth="1" />
                  <circle cx="1000" cy="200" r="300" stroke="white" strokeWidth="0.5" />
                </svg>
              </div>

              <div className="relative z-10">
                <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.25em] mb-3 font-mono">
                  JOIN OUR NETWORK
                </p>
                <h3 className="heading-display text-xl sm:text-2xl md:text-3xl text-white font-extrabold mb-3 font-heading max-w-2xl mx-auto leading-tight">
                  Submit Your CV
                </h3>
                <p className="text-white/60 max-w-xl mx-auto text-xs sm:text-sm mb-6 leading-relaxed font-normal">
                  Interested in working with us? Send your CV and a brief cover letter to our team.
                </p>

                <div className="flex justify-center">
                  <a
                    href="mailto:stellarassociatesbd@gmail.com?subject=CV Submission — Expert Network"
                    className="inline-flex items-center gap-2 bg-[#fce057] hover:bg-[#ebd04e] text-[#0c1b38] font-semibold h-[42px] px-6 rounded-[8px] text-sm shadow-sm transition-all duration-[220ms] hover:translate-y-[-2px]"
                  >
                    <Send size={15} strokeWidth={2} />
                    Submit CV via Email
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
