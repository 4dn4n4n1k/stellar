"use client";

import Link from "next/link";
import Image from "next/image";
import { Users, Briefcase, Award } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100vh] sm:min-h-[110vh] md:min-h-screen flex items-stretch md:items-center md:justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0 transform-gpu pointer-events-none select-none">
        <Image
          src="/hero_bg.jpeg"
          alt=""
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 sm:bg-black/25 z-[1]" />

      {/* Desktop Hero Layout (Visible on md and up) */}
      <div className="hidden md:block relative z-10 max-w-[680px] lg:max-w-[900px] mx-auto px-4 text-center mt-2 md:mt-4">
        <h1 className="heading-display text-[32px] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 tracking-tight text-white drop-shadow-lg leading-tight text-center">
          <span className="block sm:inline-block animate-fade-slide-up mr-0 sm:mr-5" style={{ animationDelay: '50ms' }}>Evidence. Insight.</span>
          <span className="block sm:inline-block animate-fade-slide-up mt-2 sm:mt-0" style={{ animationDelay: '180ms' }}>Impact.</span>
        </h1>

        <p className="text-white/85 text-base md:text-lg max-w-4xl mx-auto mb-8 leading-relaxed drop-shadow-md animate-fade-slide-up" style={{ animationDelay: '260ms' }}>
          Supporting governments, donors, civil society, and private sector partners through research,
          <br className="hidden md:inline" /> evaluation, governance, and strategic advisory services.
        </p>

        <div className="flex flex-col sm:flex-row gap-[18px] justify-center items-center animate-fade-slide-up font-heading w-full max-w-md mx-auto sm:max-w-none" style={{ animationDelay: '340ms' }}>
          <Link
            href="/about"
            className="inline-flex items-center justify-center w-full sm:w-auto h-12 lg:h-[46px] px-[28px] text-[15px] font-semibold rounded-[10px] bg-transparent text-white border border-[rgba(255,255,255,0.28)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.55)] hover:translate-y-[-2px] transition-all duration-[220ms] ease-in-out"
          >
            About Us
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center w-full sm:w-auto h-12 lg:h-[46px] px-[28px] text-[15px] font-semibold rounded-[10px] bg-[#fce057] hover:bg-[#ebd046] text-[#0c1b38] border-0 hover:translate-y-[-2px] transition-all duration-[220ms] ease-in-out"
          >
            Our Services
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center w-full sm:w-auto h-12 lg:h-[46px] px-[28px] text-[15px] font-semibold rounded-[10px] bg-transparent text-white border border-[rgba(255,255,255,0.28)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.55)] hover:translate-y-[-2px] transition-all duration-[220ms] ease-in-out"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Mobile Hero Layout (Visible on screens < md) */}
      <div className="md:hidden flex flex-col justify-between w-full min-h-[100vh] sm:min-h-[110vh] pt-[92px] pb-10 px-5 relative z-10">
        
        {/* 2. Floating Analytics Cards */}
        <div className="w-full flex-none mt-2">
          <div className="flex gap-3 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x snap-mandatory -mx-5 px-5">
            {/* Card 1 */}
            <div className="snap-center shrink-0 min-w-[220px] bg-white/10 backdrop-blur-md border border-white/15 rounded-[16px] p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.18)] flex items-center gap-3.5 animate-fade-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="w-10 h-10 rounded-xl bg-teal-800/40 flex items-center justify-center shrink-0 border border-teal-500/20">
                <Users className="text-[#fce057]" size={20} />
              </div>
              <div>
                <div className="text-xl font-extrabold text-white leading-tight font-heading">5</div>
                <div className="text-[10px] text-white/70 font-semibold uppercase tracking-wider">Founding Partners</div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="snap-center shrink-0 min-w-[220px] bg-white/10 backdrop-blur-md border border-white/15 rounded-[16px] p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.18)] flex items-center gap-3.5 animate-fade-slide-up" style={{ animationDelay: '180ms' }}>
              <div className="w-10 h-10 rounded-xl bg-teal-800/40 flex items-center justify-center shrink-0 border border-teal-500/20">
                <Briefcase className="text-[#fce057]" size={20} />
              </div>
              <div>
                <div className="text-xl font-extrabold text-white leading-tight font-heading">10+</div>
                <div className="text-[10px] text-white/70 font-semibold uppercase tracking-wider">Sectors Covered</div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="snap-center shrink-0 min-w-[220px] bg-white/10 backdrop-blur-md border border-white/15 rounded-[16px] p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.18)] flex items-center gap-3.5 animate-fade-slide-up" style={{ animationDelay: '260ms' }}>
              <div className="w-10 h-10 rounded-xl bg-teal-800/40 flex items-center justify-center shrink-0 border border-teal-500/20">
                <Award className="text-[#fce057]" size={20} />
              </div>
              <div>
                <div className="text-xl font-extrabold text-white leading-tight font-heading">25+</div>
                <div className="text-[10px] text-white/70 font-semibold uppercase tracking-wider">Years Combined</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content stack */}
        <div className="flex-1 flex flex-col justify-end gap-5 mb-2">
          {/* 3. Hero Heading */}
          <h1 className="heading-display text-4xl sm:text-5xl font-black tracking-tight text-white leading-[1.1] drop-shadow-lg text-left animate-fade-slide-up" style={{ animationDelay: '340ms' }}>
            Evidence.<br />
            Insight.<br />
            <span className="text-[#fce057]">Impact.</span>
          </h1>
          
          {/* 4. Supporting Paragraph */}
          <p className="text-white/85 text-[15px] sm:text-base leading-relaxed drop-shadow-md animate-fade-slide-up text-left max-w-sm" style={{ animationDelay: '420ms' }}>
            Supporting governments, donors, civil society, and private sector partners through research, evaluation, governance, and strategic advisory services.
          </p>

          {/* 5. CTA Buttons */}
          <div className="flex flex-col gap-3 w-full mt-1 animate-fade-slide-up" style={{ animationDelay: '500ms' }}>
            <Link
              href="/services"
              className="inline-flex items-center justify-center w-full h-[50px] text-[15px] font-bold rounded-[12px] bg-[#fce057] hover:bg-[#ebd046] text-[#0c1b38] border-0 transition-all duration-[220ms] ease-in-out font-heading shadow-md"
            >
              Our Services
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/about"
                className="inline-flex items-center justify-center h-[46px] text-[14px] font-semibold rounded-[12px] bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-[220ms] ease-in-out font-heading"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-[46px] text-[14px] font-semibold rounded-[12px] bg-transparent text-white border border-white/20 hover:bg-white/10 transition-all duration-[220ms] ease-in-out font-heading"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
