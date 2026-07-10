"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
      <div className="absolute inset-0 bg-black/25 z-[1]" />

      {/* Center Content */}
      <div className="relative z-10 max-w-[680px] lg:max-w-[780px] mx-auto px-4 text-center -mt-12 md:-mt-20">
        {/* Teal arc decoration above title */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <svg
              width="100"
              height="50"
              viewBox="0 0 120 60"
              fill="none"
              className="opacity-80"
            >
              <path
                d="M10 55 Q60 -10 110 55"
                stroke="url(#arc-grad)"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M20 55 Q60 0 100 55"
                stroke="url(#arc-grad)"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M30 55 Q60 10 90 55"
                stroke="url(#arc-grad)"
                strokeWidth="1.5"
                fill="none"
              />
              <defs>
                <linearGradient
                  id="arc-grad"
                  x1="0"
                  y1="0"
                  x2="120"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#0E6461" />
                  <stop offset="50%" stopColor="#D9EAE9" />
                  <stop offset="100%" stopColor="#0E6461" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <h1 className="heading-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 tracking-tight text-white drop-shadow-lg leading-tight text-center">
          <span className="inline-block animate-fade-slide-up mr-3 md:mr-5" style={{ animationDelay: '100ms' }}>Evidence. Insight.</span>
          <span className="inline-block animate-fade-slide-up" style={{ animationDelay: '350ms' }}>Impact.</span>
        </h1>

        <p className="text-white/85 text-base md:text-lg max-w-4xl mx-auto mb-8 leading-relaxed drop-shadow-md animate-fade-slide-up" style={{ animationDelay: '500ms' }}>
          Supporting governments, donors, civil society, and private sector partners
          <br className="hidden md:inline" /> through research, evaluation, governance, and strategic advisory services.
        </p>

        <div className="flex flex-col sm:flex-row gap-[18px] justify-center items-center animate-fade-slide-up font-heading" style={{ animationDelay: '650ms' }}>
          <Link
            href="/about"
            className="inline-flex items-center justify-center h-[46px] px-[28px] text-[15px] font-semibold rounded-[10px] bg-transparent text-white border border-[rgba(255,255,255,0.28)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.55)] hover:translate-y-[-2px] transition-all duration-[220ms] ease-in-out"
          >
            About Us
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center h-[46px] px-[28px] text-[15px] font-semibold rounded-[10px] bg-[#156E67] hover:bg-[#1C857D] text-white border-0 shadow-[0_8px_24px_rgba(21,110,103,0.2)] hover:shadow-[0_10px_28px_rgba(21,110,103,0.3)] hover:translate-y-[-2px] transition-all duration-[220ms] ease-in-out"
          >
            Our Services
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-[46px] px-[28px] text-[15px] font-semibold rounded-[10px] bg-transparent text-white border border-[rgba(255,255,255,0.28)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.55)] hover:translate-y-[-2px] transition-all duration-[220ms] ease-in-out"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* World Map SVG Overlay (bottom center) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[3] w-[50%] max-w-[650px] opacity-10 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 800 400" fill="none" className="w-full h-auto">
          {/* Simplified world map dots */}
          <g fill="white" opacity="0.6">
            {/* North America */}
            <circle cx="160" cy="120" r="1.5" />
            <circle cx="170" cy="110" r="1.5" />
            <circle cx="180" cy="115" r="1.5" />
            <circle cx="150" cy="130" r="1.5" />
            <circle cx="165" cy="135" r="1.5" />
            <circle cx="175" cy="125" r="1.5" />
            <circle cx="185" cy="130" r="1.5" />
            <circle cx="190" cy="120" r="1.5" />
            <circle cx="155" cy="140" r="1.5" />
            <circle cx="170" cy="145" r="1.5" />
            <circle cx="200" cy="140" r="1.5" />
            <circle cx="195" cy="135" r="1.5" />
            <circle cx="145" cy="125" r="1.5" />
            <circle cx="210" cy="150" r="1.5" />
            {/* Central America */}
            <circle cx="195" cy="165" r="1.5" />
            <circle cx="205" cy="170" r="1.5" />
            {/* South America */}
            <circle cx="230" cy="200" r="1.5" />
            <circle cx="240" cy="210" r="1.5" />
            <circle cx="245" cy="225" r="1.5" />
            <circle cx="240" cy="240" r="1.5" />
            <circle cx="235" cy="255" r="1.5" />
            <circle cx="250" cy="230" r="1.5" />
            <circle cx="255" cy="245" r="1.5" />
            <circle cx="245" cy="260" r="1.5" />
            <circle cx="235" cy="270" r="1.5" />
            <circle cx="230" cy="285" r="1.5" />
            <circle cx="240" cy="280" r="1.5" />
            {/* Europe */}
            <circle cx="380" cy="100" r="1.5" />
            <circle cx="390" cy="95" r="1.5" />
            <circle cx="400" cy="100" r="1.5" />
            <circle cx="385" cy="110" r="1.5" />
            <circle cx="395" cy="105" r="1.5" />
            <circle cx="405" cy="110" r="1.5" />
            <circle cx="410" cy="100" r="1.5" />
            <circle cx="375" cy="115" r="1.5" />
            <circle cx="415" cy="115" r="1.5" />
            <circle cx="420" cy="105" r="1.5" />
            {/* Africa */}
            <circle cx="395" cy="170" r="1.5" />
            <circle cx="405" cy="180" r="1.5" />
            <circle cx="400" cy="195" r="1.5" />
            <circle cx="410" cy="190" r="1.5" />
            <circle cx="415" cy="205" r="1.5" />
            <circle cx="405" cy="215" r="1.5" />
            <circle cx="410" cy="230" r="1.5" />
            <circle cx="400" cy="240" r="1.5" />
            <circle cx="395" cy="250" r="1.5" />
            {/* Asia */}
            <circle cx="470" cy="100" r="1.5" />
            <circle cx="480" cy="95" r="1.5" />
            <circle cx="500" cy="105" r="1.5" />
            <circle cx="520" cy="110" r="1.5" />
            <circle cx="540" cy="100" r="1.5" />
            <circle cx="550" cy="115" r="1.5" />
            <circle cx="560" cy="105" r="1.5" />
            <circle cx="530" cy="120" r="1.5" />
            <circle cx="510" cy="130" r="1.5" />
            <circle cx="490" cy="125" r="1.5" />
            <circle cx="500" cy="140" r="1.5" />
            <circle cx="520" cy="145" r="1.5" />
            <circle cx="540" cy="135" r="1.5" />
            <circle cx="555" cy="130" r="1.5" />
            {/* South Asia / Bangladesh area */}
            <circle cx="530" cy="155" r="2" />
            <circle cx="535" cy="160" r="2" />
            <circle cx="525" cy="165" r="1.5" />
            {/* Southeast Asia */}
            <circle cx="560" cy="170" r="1.5" />
            <circle cx="575" cy="175" r="1.5" />
            <circle cx="585" cy="185" r="1.5" />
            {/* Australia */}
            <circle cx="590" cy="260" r="1.5" />
            <circle cx="600" cy="265" r="1.5" />
            <circle cx="610" cy="255" r="1.5" />
            <circle cx="605" cy="270" r="1.5" />
            <circle cx="615" cy="265" r="1.5" />
          </g>
          {/* Connection lines */}
          <g stroke="white" strokeWidth="0.5" opacity="0.3">
            <line x1="175" y1="130" x2="390" y2="105" />
            <line x1="390" y1="105" x2="530" y2="155" />
            <line x1="530" y1="155" x2="600" y2="260" />
            <line x1="240" y1="230" x2="400" y2="200" />
            <line x1="400" y1="200" x2="530" y2="155" />
          </g>
        </svg>
      </div>
    </section>
  );
}
