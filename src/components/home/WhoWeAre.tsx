import Link from "next/link";
import { whoWeAre } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function WhoWeAre() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <ScrollReveal variant="left">
            <div>
              <p className="text-teal-700 font-bold text-xs uppercase tracking-[0.15em] mb-3">
                Who We Are
              </p>
              <h2 className="heading-section text-3xl md:text-4xl text-gray-900 font-extrabold mb-6 font-heading">
                A Trusted Partner in Development
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                {whoWeAre.intro}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center justify-center h-10 px-6 text-sm font-semibold rounded-[6px] bg-navy-900 hover:bg-navy-800 text-white shadow-sm transition-colors duration-180"
              >
                Learn More About Us →
              </Link>
            </div>
          </ScrollReveal>

          {/* Stats Grid */}
          <ScrollReveal variant="right">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {whoWeAre.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white border border-gray-200 rounded-[10px] p-6 text-center card-hover-teal shadow-sm"
                >
                  <div className="text-3xl md:text-4xl font-extrabold mb-2 text-navy-900 font-heading">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <p className="text-gray-600 text-sm font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
