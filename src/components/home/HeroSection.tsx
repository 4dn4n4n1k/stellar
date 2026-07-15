"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] md:min-h-screen py-20 md:py-0 flex items-center justify-center overflow-hidden">
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

      {/* Overlay — desktop/tablet unchanged, mobile uses a subtle left-side gradient */}
      <div className="absolute inset-0 z-[1] md:bg-black/25 hidden md:block" />
      <div
        className="absolute inset-0 z-[1] md:hidden"
        style={{
          background:
            "linear-gradient(105deg, rgba(5,15,35,0.82) 0%, rgba(5,15,35,0.62) 55%, rgba(5,15,35,0.15) 100%)",
        }}
      />

      {/* Desktop/Tablet Hero Content (Unchanged) */}
      <div className="relative z-10 hidden md:block max-w-[680px] lg:max-w-[900px] mx-auto px-4 text-center mt-2 md:mt-4">
        <h1 className="heading-display text-[32px] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 tracking-tight text-white drop-shadow-lg leading-tight text-center">
          <span className="block sm:inline-block animate-fade-slide-up mr-0 sm:mr-5" style={{ animationDelay: "50ms" }}>Evidence. Insight.</span>
          <span className="block sm:inline-block animate-fade-slide-up mt-2 sm:mt-0" style={{ animationDelay: "180ms" }}>Impact.</span>
        </h1>

        <p className="text-white/85 text-base md:text-lg max-w-4xl mx-auto mb-8 leading-relaxed drop-shadow-md animate-fade-slide-up" style={{ animationDelay: "260ms" }}>
          Supporting governments, donors, civil society, and private sector partners through research,
          <br className="hidden md:inline" /> evaluation, governance, and strategic advisory services.
        </p>

        <div className="flex flex-col sm:flex-row gap-[18px] justify-center items-center animate-fade-slide-up font-heading w-full max-w-md mx-auto sm:max-w-none" style={{ animationDelay: "340ms" }}>
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

      {/* ── Dedicated Mobile Hero Content (≤767px) ── */}
      <div className="relative z-10 flex md:hidden flex-col items-start justify-center w-full px-6 max-w-[420px] self-center">
        {/* Headline — left-aligned, stacked, very large, with coloured accent dots */}
        <h1
          className="heading-display font-black text-white leading-[1.0] mb-6 animate-fade-slide-up"
          style={{ fontSize: "clamp(44px, 13vw, 56px)", animationDelay: "40ms" }}
        >
          <span className="block">
            Evidence<span className="text-[#38c9b0]">.</span>
          </span>
          <span className="block" style={{ animationDelay: "140ms" }}>
            Insight<span className="text-[#38c9b0]">.</span>
          </span>
          <span className="block" style={{ animationDelay: "240ms" }}>
            Impact<span className="text-[#fce057]">.</span>
          </span>
        </h1>

        {/* Supporting paragraph — left-aligned, comfortable width */}
        <p
          className="text-white/75 text-[15px] leading-[1.65] mb-8 animate-fade-slide-up max-w-[300px]"
          style={{ animationDelay: "320ms" }}
        >
          Supporting governments, donors, civil society, and private sector
          partners through research, evaluation, governance, and strategic
          advisory services.
        </p>

        {/* Stacked CTA Buttons */}
        <div
          className="flex flex-col gap-[14px] w-full max-w-[300px] animate-fade-slide-up"
          style={{ animationDelay: "420ms" }}
        >
          {/* Primary — filled yellow */}
          <Link
            href="/services"
            className="group inline-flex items-center justify-between w-full h-[50px] px-5 text-[15px] font-semibold rounded-[10px] bg-[#fce057] hover:bg-[#f5d630] text-[#0c1b38] border-0 transition-all duration-[200ms] ease-in-out font-heading shadow-sm"
          >
            Our Services
            <ArrowRight size={17} className="transition-transform duration-[180ms] group-hover:translate-x-0.5" />
          </Link>

          {/* Secondary — transparent with thin border */}
          <Link
            href="/about"
            className="group inline-flex items-center justify-between w-full h-[50px] px-5 text-[15px] font-semibold rounded-[10px] bg-transparent text-white border border-white/25 hover:bg-white/6 hover:border-white/45 transition-all duration-[200ms] ease-in-out font-heading"
          >
            About Us
            <ArrowRight size={17} className="transition-transform duration-[180ms] group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
