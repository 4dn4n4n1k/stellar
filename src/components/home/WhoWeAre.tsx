import Link from "next/link";
import { whoWeAre } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function WhoWeAre() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <ScrollReveal variant="left">
            <div>
              <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-3">
                Who We Are
              </p>
              <h2 className="heading-section text-3xl md:text-4xl text-navy mb-6">
                A Trusted Partner in Development
              </h2>
              <p className="text-warm-grey text-base leading-relaxed mb-8">
                {whoWeAre.intro}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium rounded-lg bg-navy hover:bg-navy-light text-white transition-colors"
              >
                Learn More About Us →
              </Link>
            </div>
          </ScrollReveal>

          {/* Stats Grid */}
          <ScrollReveal variant="right">
            <div className="grid grid-cols-2 gap-6">
              {whoWeAre.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-slate rounded-xl p-6 text-center card-hover-gold"
                >
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <p className="text-warm-grey text-sm font-medium">
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
