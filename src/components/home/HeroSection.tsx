"use client";

import Link from "next/link";
import ParticleCanvas from "@/components/ParticleCanvas";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-navy-900 overflow-hidden">
      {/* Brand Pattern Background */}
      <ParticleCanvas />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-transparent to-navy-900/80 z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Teal arc decoration above title */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <svg
              width="120"
              height="60"
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

        <h1 className="heading-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight text-white">
          Evidence. Insight. Impact.
        </h1>

        <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
          Supporting governments, donors, civil society, and private sector
          partners through research, evaluation, governance, and strategic
          advisory services.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/about"
            className="inline-flex items-center justify-center h-11 px-8 text-sm font-semibold rounded-[6px] border border-teal-700 text-teal-100 hover:bg-teal-700/20 transition-colors duration-180"
          >
            About Us
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center h-11 px-8 text-sm font-semibold rounded-[6px] bg-teal-700 hover:bg-teal-800 text-white shadow-sm transition-colors duration-180"
          >
            Our Services
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-11 px-8 text-sm font-semibold rounded-[6px] border border-teal-700 text-teal-100 hover:bg-teal-700/20 transition-colors duration-180"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
