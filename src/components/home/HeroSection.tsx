"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-[640px] md:min-h-screen py-20 md:py-0 flex items-center justify-center overflow-hidden">
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
      <div className="absolute inset-0 bg-black/35 sm:bg-black/25 z-[1]" />

      <div className="relative z-10 max-w-[680px] lg:max-w-[900px] mx-auto px-4 text-center mt-2 md:mt-4">
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
    </section>
  );
}
