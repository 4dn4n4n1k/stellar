"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

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

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/35 sm:bg-black/25 z-[1]" />

      {/* Desktop/Tablet Hero Content (Unchanged) */}
      <div className="relative z-10 hidden sm:block max-w-[680px] lg:max-w-[900px] mx-auto px-4 text-center mt-2 md:mt-4">
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

      {/* Dedicated Mobile Hero Content */}
      <div className="relative z-10 flex sm:hidden flex-col items-center justify-center text-center px-6 w-full max-w-[480px] mx-auto mt-4">
        {/* Headline */}
        <h1 className="heading-display text-[42px] font-extrabold mb-8 tracking-tight text-white drop-shadow-lg leading-[1.15] text-center flex flex-col gap-2">
          <span className="block animate-fade-slide-up" style={{ animationDelay: '50ms' }}>Evidence.</span>
          <span className="block animate-fade-slide-up" style={{ animationDelay: '180ms' }}>Insight.</span>
          <span className="block animate-fade-slide-up" style={{ animationDelay: '300ms' }}>Impact.</span>
        </h1>

        {/* Supporting paragraph */}
        <p className="text-white/85 text-[15px] leading-relaxed max-w-[285px] mx-auto mb-12 drop-shadow-md animate-fade-slide-up" style={{ animationDelay: '380ms' }}>
          Supporting governments, donors, civil society, and private sector partners through research, evaluation, governance, and strategic advisory services.
        </p>

        {/* Stacked CTA Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-[290px] mx-auto mb-16 animate-fade-slide-up" style={{ animationDelay: '460ms' }}>
          <Link
            href="/services"
            className="inline-flex items-center justify-center w-full h-[50px] text-[15px] font-semibold rounded-[12px] bg-[#fce057] hover:bg-[#ebd046] text-[#0c1b38] border-0 transition-all duration-[220ms] ease-in-out font-heading shadow-md"
          >
            Our Services
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center w-full h-[50px] text-[15px] font-semibold rounded-[12px] bg-transparent text-white border border-[rgba(255,255,255,0.28)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.55)] transition-all duration-[220ms] ease-in-out font-heading"
          >
            About Us
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce flex flex-col items-center gap-1.5 opacity-50 text-white mt-2 animate-fade-slide-up" style={{ animationDelay: '540ms' }}>
          <ChevronDown size={20} strokeWidth={2.5} />
        </div>
      </div>
    </section>
  );
}
