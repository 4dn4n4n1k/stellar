"use client";

import Link from "next/link";
import ParticleCanvas from "@/components/ParticleCanvas";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-navy overflow-hidden">
      {/* Particle Background */}
      <ParticleCanvas />

      {/* Decorative Arcs */}
      <div className="hero-arc w-[600px] h-[600px] -top-40 -right-40 opacity-30" />
      <div
        className="hero-arc w-[400px] h-[400px] -bottom-20 -left-20 opacity-20"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="hero-arc w-[300px] h-[300px] top-1/4 right-1/4 opacity-10"
        style={{ animationDelay: "-13s" }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-transparent to-navy/80 z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Gold arc decoration above title */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <svg
              width="120"
              height="60"
              viewBox="0 0 120 60"
              fill="none"
              className="opacity-60"
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
                  <stop offset="0%" stopColor="#D4A017" />
                  <stop offset="50%" stopColor="#E8C547" />
                  <stop offset="100%" stopColor="#D4A017" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <h1 className="heading-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6">
          <span className="gold-gradient-text">Evidence.</span>{" "}
          <span className="text-white">Insight.</span>{" "}
          <span className="gold-gradient-text">Impact.</span>
        </h1>

        <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
          Supporting governments, donors, civil society, and private sector
          partners through research, evaluation, governance, and strategic
          advisory services.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/about"
            className="inline-flex items-center justify-center h-11 px-8 text-base font-semibold rounded-lg bg-gradient-to-r from-gold to-gold-light text-navy hover:from-gold-light hover:to-gold shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all duration-300"
          >
            About Us
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center h-11 px-8 text-base font-medium rounded-lg border border-white/30 text-white hover:bg-white/10 hover:border-gold/50 transition-all duration-300"
          >
            Our Services
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-11 px-8 text-base font-medium rounded-lg border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1 h-3 rounded-full bg-gold animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
