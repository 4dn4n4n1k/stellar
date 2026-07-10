import Link from "next/link";
import { whoWeAre } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function WhoWeAre() {
  return (
    <section className="py-14 md:py-16 bg-[#f7f8fa] relative overflow-hidden">
      {/* Subtle dot pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none select-none" 
        style={{ 
          backgroundImage: "radial-gradient(#156E67 1px, transparent 1px)", 
          backgroundSize: "24px 24px" 
        }} 
      />

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <ScrollReveal variant="left">
              <div>
                <p className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] mb-4">
                  Who We Are
                </p>
                <h2 className="text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] lg:leading-[1.1] text-navy-brand font-extrabold mb-8 font-heading tracking-tight">
                  A Trusted Partner in Development
                </h2>
                <p className="text-gray-600 text-[17px] leading-[1.75] mb-10 max-w-[580px]">
                  {whoWeAre.intro}
                </p>
                <div>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center h-12 px-8 text-sm font-semibold rounded-[12px] bg-[#156E67] hover:bg-[#1C857D] text-white shadow-[0_4px_14px_rgba(21,110,103,0.15)] hover:shadow-[0_6px_20px_rgba(21,110,103,0.25)] hover:translate-y-[-2px] transition-all duration-[250ms] ease-in-out font-heading"
                  >
                    Learn More About Us →
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Serially aligned horizontal cards */}
          <div className="lg:col-span-6 w-full">
            <ScrollReveal variant="right">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
                
                {/* Metric 1: Founding Partners */}
                <div className="bg-white border border-gray-200/50 rounded-[20px] px-4 py-6 text-center shadow-[0_10px_25px_rgba(21,110,103,0.04)] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(21,110,103,0.08)] transition-all duration-300 flex flex-col justify-center min-h-[160px]">
                  <div className="text-4xl sm:text-5xl font-extrabold text-[#156E67] mb-3 font-heading tracking-tight">
                    <AnimatedCounter value="5" />
                  </div>
                  <p className="text-gray-500 font-bold text-[11px] uppercase tracking-wider leading-snug">
                    Founding Partners
                  </p>
                </div>

                {/* Metric 2: Sectors Covered */}
                <div className="bg-white border border-gray-200/50 rounded-[20px] px-4 py-6 text-center shadow-[0_12px_30px_rgba(12,27,56,0.05)] hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(12,27,56,0.1)] transition-all duration-300 flex flex-col justify-center min-h-[160px]">
                  <div className="text-4xl sm:text-5xl font-extrabold text-navy-brand mb-3 font-heading tracking-tight">
                    <AnimatedCounter value="10+" />
                  </div>
                  <p className="text-gray-500 font-bold text-[11px] uppercase tracking-wider leading-snug">
                    Sectors Covered
                  </p>
                </div>

                {/* Metric 3: Years Combined Experience */}
                <div className="bg-white border border-gray-200/50 rounded-[20px] px-4 py-6 text-center shadow-[0_12px_30px_rgba(21,110,103,0.05)] hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(21,110,103,0.1)] transition-all duration-300 flex flex-col justify-center min-h-[160px]">
                  <div className="text-4xl sm:text-5xl font-extrabold text-[#156E67] mb-3 font-heading tracking-tight">
                    <AnimatedCounter value="25+" />
                  </div>
                  <p className="text-gray-500 font-bold text-[11px] uppercase tracking-wider leading-snug">
                    Years Combined Experience
                  </p>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
