import type { Metadata } from "next";
import Link from "next/link";
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
  const paragraphs = whoWeAre.fullIntro.split("\n\n");

  return (
    <div className="page-enter">
      {/* Editorial Hero */}
      <section className="bg-navy-950 pt-24 pb-10 md:pt-28 md:pb-14 relative overflow-hidden">

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="lg:col-span-8 text-left">
              <p 
                className="text-[#fce057] font-bold text-xs uppercase tracking-[0.2em] mb-4 animate-fade-slide-up font-heading"
                style={{ animationDelay: '100ms' }}
              >
                About Us
              </p>
              <h1 
                className="heading-display text-4xl md:text-5xl lg:text-7xl text-white font-extrabold mb-6 tracking-tight leading-tight animate-fade-slide-up"
                style={{ animationDelay: '250ms' }}
              >
                Our Story
              </h1>
              <p 
                className="text-white/80 text-lg md:text-xl leading-relaxed max-w-3xl animate-fade-slide-up"
                style={{ animationDelay: '400ms' }}
              >
                Founded in 2026, Stellar Associates brings together five experienced
                development professionals united by a shared commitment to
                evidence-based, inclusive development.
              </p>
            </div>
            <div className="hidden lg:col-span-4 lg:flex justify-end pr-4 animate-fade-slide-up" style={{ animationDelay: '500ms' }}>
              <div className="border-l border-white/20 pl-8 py-2 space-y-6">
                <div>
                  <span className="text-white text-3xl font-extrabold font-heading block tracking-wide">5</span>
                  <span className="text-white/40 text-[10px] font-mono block uppercase tracking-widest mt-1">Founding Partners</span>
                </div>
                <div>
                  <span className="text-white text-3xl font-extrabold font-heading block tracking-wide">10+</span>
                  <span className="text-white/40 text-[10px] font-mono block uppercase tracking-widest mt-1">Sectors Covered</span>
                </div>
                <div>
                  <span className="text-white text-3xl font-extrabold font-heading block tracking-wide">25+</span>
                  <span className="text-white/40 text-[10px] font-mono block uppercase tracking-widest mt-1">Years Combined Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story - Editorial Composition */}
      <section className="py-14 md:py-24 bg-white overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Narrative Block 1: Paragraph Left / Quote Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center mb-20 md:mb-28">
            <div className="lg:col-span-7">
              <ScrollReveal variant="left">
                <span className="text-[#0e6461] font-bold text-xs uppercase tracking-[0.15em] block mb-4">THE FOUNDATION</span>
                <p className="text-gray-900 text-lg md:text-xl leading-relaxed font-semibold mb-6">
                  {paragraphs[0].split(". With decades")[0]}.
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  With decades{paragraphs[0].split(". With decades")[1]}
                </p>
              </ScrollReveal>
            </div>
            
            <div className="lg:col-span-5 lg:pl-8 lg:border-l border-gray-200">
              <ScrollReveal variant="right" delay={150}>
                <blockquote className="relative my-4">
                  <span className="absolute -top-6 -left-4 text-gray-100 text-7xl font-serif select-none pointer-events-none">“</span>
                  <p className="text-navy-900 text-xl md:text-2xl font-extrabold font-heading leading-snug relative z-10 italic">
                    The Stellar team brings a unique blend of programmatic expertise, strategic advisory capacity, and operational excellence.
                  </p>
                </blockquote>
              </ScrollReveal>
            </div>
          </div>

          {/* Narrative Block 2: Tag Matrix Left / Paragraph Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center mb-20 md:mb-28">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <ScrollReveal variant="left" delay={150}>
                <div className="relative border border-gray-200 rounded-[10px] p-8 bg-gray-50/50 shadow-xs">
                  <div className="absolute top-4 right-4 text-[9px] font-mono text-gray-400 uppercase tracking-widest">Profile</div>
                  <h4 className="font-heading font-extrabold text-navy-900 text-sm mb-6 tracking-wider uppercase">Partner Network</h4>
                  <div className="flex flex-wrap gap-2">
                    {["USAID", "United Nations", "Diplomatic Missions", "Government Ministries", "BGMEA", "BKMEA", "FBCCI", "AmCham", "Civil Society"].map((network) => (
                      <span key={network} className="bg-white border border-gray-200 text-navy-900 text-xs font-semibold px-3 py-2 rounded-sm shadow-2xs">
                        {network}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <ScrollReveal variant="right">
                <span className="text-[#0e6461] font-bold text-xs uppercase tracking-[0.15em] block mb-4">OUR TEAM</span>
                <p className="text-gray-900 text-lg md:text-xl leading-relaxed mb-6 font-semibold">
                  {paragraphs[1]}
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  Our directors bridge global standards with local realities, working across sectors to deliver evidence-driven insights and sustainable impacts.
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* Narrative Block 3: Asymmetric Grid Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
            <div className="lg:col-span-7">
              <ScrollReveal variant="left">
                <span className="text-[#0e6461] font-bold text-xs uppercase tracking-[0.15em] block mb-4">OUR POSITIONING</span>
                <p className="text-gray-900 text-lg md:text-xl leading-relaxed mb-6">
                  {paragraphs[2].split(". The firm")[0]}.
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  The firm{paragraphs[2].split(". The firm")[1]}
                </p>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5 bg-[#0c1b38] text-white rounded-[10px] p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-sm border border-white/5">
              <ScrollReveal variant="right" delay={150}>
                {/* Subtle blueprint line overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                    <circle cx="100" cy="0" r="80" stroke="white" strokeWidth="0.5" />
                    <line x1="20" y1="0" x2="100" y2="80" stroke="white" strokeWidth="0.5" />
                  </svg>
                </div>
                <h4 className="font-heading font-extrabold text-[#fce057] text-xs uppercase tracking-[0.15em] mb-4">Our Commitment</h4>
                <p className="text-white/95 text-base md:text-lg leading-relaxed font-medium italic relative z-10">
                  "{paragraphs[3]}"
                </p>
              </ScrollReveal>
            </div>
          </div>

        </div>
      </section>

      {/* Vision & Mission - Staggered Asymmetric Editorial Layout */}
      <section className="py-14 md:py-24 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Sticky Title */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <ScrollReveal variant="left">
                <span className="text-[#0e6461] font-bold text-xs uppercase tracking-[0.2em] block mb-3">Strategic Direction</span>
                <h2 className="heading-section text-3xl md:text-4xl text-navy-900 font-extrabold tracking-tight mb-4 font-heading">
                  Purpose & Pathway
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                  We integrate global standards with local realities to drive democratic governance, accountability, and inclusive progress across Bangladesh.
                </p>
              </ScrollReveal>
            </div>
            
            {/* Right Column: Staggered Cards */}
            <div className="lg:col-span-8 space-y-12">
              {/* Vision Card */}
              <ScrollReveal variant="right" delay={100}>
                <div className="bg-[#0c1b38] text-white rounded-[10px] p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden border border-white/5">
                  <div className="absolute top-6 right-8 text-6xl font-serif text-white/5 select-none pointer-events-none">01</div>
                  <span className="text-[#fce057] font-bold text-xs uppercase tracking-[0.15em] block mb-3">OUR VISION</span>
                  <h3 className="heading-section text-xl md:text-2xl text-white font-extrabold mb-4 font-heading max-w-xl">
                    Leading home-grown consulting that connects global standards with local expertise.
                  </h3>
                  <p className="text-white/80 leading-relaxed text-base">
                    {vision}
                  </p>
                </div>
              </ScrollReveal>
              
              {/* Mission Card */}
              <ScrollReveal variant="right" delay={200}>
                <div className="bg-[#0c1b38] text-white rounded-[10px] p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden border border-white/5">
                  <div className="absolute top-6 right-8 text-6xl font-serif text-white/5 select-none pointer-events-none">02</div>
                  <span className="text-[#fce057] font-bold text-xs uppercase tracking-[0.15em] block mb-3">OUR MISSION</span>
                  <h3 className="heading-section text-xl md:text-2xl text-white font-extrabold mb-4 font-heading max-w-xl">
                    High-quality advisory and capacity building promoting accountability and sustainable development.
                  </h3>
                  <p className="text-white/80 leading-relaxed text-base">
                    {mission}
                  </p>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values - Uniform Grid */}
      <section className="py-14 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="FEATURED PRINCIPLE"
            title="The principles that guide everything we do"
            subtitle="Deeply embedded values shaping our consulting practice and partnerships."
          />

          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {coreValues.map((value, i) => {
              const Icon = iconMap[value.icon] || Shield;
              return (
                <ScrollReveal
                  key={value.title}
                  delay={i * 80}
                  variant="up"
                  className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 flex flex-col"
                >
                  <div className="bg-gray-50/50 border border-gray-200 rounded-[10px] p-6 sm:p-8 flex flex-col justify-between h-full card-hover-teal shadow-xs">
                    <div>
                      <div className="w-12 h-12 rounded-[6px] bg-navy-900 flex items-center justify-center mb-6 shadow-sm">
                        <Icon className="text-teal-100" size={22} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-navy-900 font-bold text-lg mb-3 font-heading">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Download Profile Card - Mockup Styled (Only Kicker, Title, Subtitle, and Primary Button - Compact Size) */}
      <section className="py-14 md:py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto bg-[#0c1b38] border border-white/5 rounded-[24px] py-12 px-6 md:py-16 md:px-12 text-center relative overflow-hidden shadow-lg">
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
                <p className="text-white/50 text-xs font-bold uppercase tracking-[0.25em] mb-4 font-mono">
                  COMPANY PROFILE
                </p>
                <h3 className="heading-display text-2xl sm:text-3xl md:text-4xl text-white font-extrabold mb-4 font-heading max-w-2xl mx-auto leading-tight">
                  Download Our Company Profile
                </h3>
                <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base mb-8 leading-relaxed font-normal">
                  Get a comprehensive overview of our services, expertise, and team.
                </p>

                <div className="flex justify-center">
                  <a
                    href="/stellar-profile.pdf"
                    download
                    className="inline-flex items-center gap-2 bg-[#fce057] hover:bg-[#ebd04e] text-[#0c1b38] font-semibold h-[48px] px-8 rounded-[10px] shadow-sm transition-all duration-[220ms] hover:translate-y-[-2px]"
                  >
                    <Download size={16} strokeWidth={2} />
                    Download PDF
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
