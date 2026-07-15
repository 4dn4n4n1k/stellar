"use client";

import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[640px] md:min-h-screen py-20 md:py-0 flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0 transform-gpu pointer-events-none select-none">
        <picture className="block w-full h-full">
          <source media="(min-width: 1025px)" srcSet="/hero-desktop.jpeg" />
          <source media="(min-width: 768px)" srcSet="/hero-tablet.jpeg" />
          <img
            src="/hero-mobile.jpeg"
            alt="Stellar Associates research and consulting hero background"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
          />
        </picture>
      </div>

      {/* Dark overlay for text readability - lighter on mobile to keep original colors */}
      <div className="absolute inset-0 bg-black/15 md:bg-black/25 z-[1]" />

      {/* Desktop/Tablet Hero Content (Unchanged) */}
      <div className="relative z-10 hidden md:block max-w-[680px] lg:max-w-[900px] mx-auto px-4 text-center mt-2 md:mt-4">
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

      {/* Dedicated Mobile Hero Content (≤767px) */}
      <div className="relative z-10 flex md:hidden flex-col items-center justify-center text-center px-6 w-full max-w-[480px] mx-auto mt-2">
        {/* Headline */}
        <h1 className="heading-display text-[48px] font-black text-white drop-shadow-lg leading-[0.95] text-center flex flex-col mb-[32px]">
          <span className="block animate-fade-slide-up" style={{ animationDelay: '50ms' }}>Evidence.</span>
          <span className="block animate-fade-slide-up" style={{ animationDelay: '180ms' }}>Insight.</span>
          <span className="block animate-fade-slide-up" style={{ animationDelay: '300ms' }}>Impact.</span>
        </h1>

        {/* Supporting paragraph */}
        <p className="text-white/70 text-[16px] leading-relaxed max-w-[285px] mx-auto mb-[36px] drop-shadow-md animate-fade-slide-up text-center" style={{ animationDelay: '380ms' }}>
          Supporting governments, donors, civil society, and private sector partners through research, evaluation, governance, and strategic advisory services.
        </p>

        {/* Stacked CTA Buttons */}
        <div className="flex flex-col gap-[16px] w-full max-w-[290px] mx-auto mb-[40px] animate-fade-slide-up" style={{ animationDelay: '460ms' }}>
          <Link
            href="/services"
            className="group inline-flex items-center justify-center w-full h-[50px] text-[15px] font-semibold rounded-[10px] bg-[#fce057] hover:bg-[#ebd046] text-[#0c1b38] border-0 transition-all duration-[220ms] ease-in-out font-heading shadow-md"
          >
            Our Services
            <ArrowRight size={16} className="ml-2 transition-transform duration-[200ms] group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/about"
            className="group inline-flex items-center justify-center w-full h-[50px] text-[15px] font-semibold rounded-[10px] bg-transparent text-white border border-[#156E67] hover:bg-[#156E67]/10 transition-all duration-[220ms] ease-in-out font-heading"
          >
            About Us
            <ArrowRight size={16} className="ml-2 transition-transform duration-[200ms] group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Trust/Credibility Section */}
        <div className="mb-[48px] text-center w-full animate-fade-slide-up" style={{ animationDelay: '520ms' }}>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-bold mb-3">
            Trusted by professionals working with
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[11px] font-extrabold tracking-widest text-white/45 uppercase font-heading">
            <span>USAID</span>
            <span>United Nations</span>
            <span>GIZ</span>
            <span>European Union</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-1.5 animate-fade-slide-up" style={{ animationDelay: '580ms' }}>
          {/* Mouse Icon */}
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
          </div>
          {/* Explore text and chevron */}
          <div className="flex flex-col items-center gap-0.5 opacity-40 text-white">
            <span className="text-[9px] uppercase tracking-[0.25em] font-bold font-heading">Explore</span>
            <ChevronDown size={14} className="animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
