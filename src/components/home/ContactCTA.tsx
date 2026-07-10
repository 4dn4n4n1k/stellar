import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { siteConfig } from "@/lib/data";

export default function ContactCTA() {
  return (
    <section className="py-12 md:py-14 bg-[#f7f8fa]">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="bg-[#0C1B38] rounded-[20px] p-8 md:p-10 text-center shadow-lg relative overflow-hidden">
            {/* Background concentric pattern */}
            <svg
              className="absolute inset-y-0 right-0 w-[50%] h-full opacity-5 pointer-events-none"
              viewBox="0 0 400 400"
              fill="none"
            >
              <circle cx="400" cy="200" r="100" stroke="white" strokeWidth="1" />
              <circle cx="400" cy="200" r="200" stroke="white" strokeWidth="1" />
              <circle cx="400" cy="200" r="300" stroke="white" strokeWidth="1" />
              <circle cx="400" cy="200" r="400" stroke="white" strokeWidth="1" />
            </svg>
            <svg
              className="absolute inset-y-0 left-0 w-[50%] h-full opacity-5 pointer-events-none"
              viewBox="0 0 400 400"
              fill="none"
            >
              <circle cx="0" cy="200" r="100" stroke="white" strokeWidth="1" />
              <circle cx="0" cy="200" r="200" stroke="white" strokeWidth="1" />
              <circle cx="0" cy="200" r="300" stroke="white" strokeWidth="1" />
              <circle cx="0" cy="200" r="400" stroke="white" strokeWidth="1" />
            </svg>

            <div className="relative z-10">
              <p className="text-teal-100 font-bold text-xs uppercase tracking-[0.15em] mb-4">
                Work With Us
              </p>
              <h2 className="heading-section text-3xl md:text-4xl text-white font-extrabold mb-4 font-heading max-w-2xl mx-auto leading-tight">
                Let's discuss how we can support your work.
              </h2>
              <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                Tell us about your program, evaluation, or policy question — we'll respond within two business days.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center font-heading">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center h-12 px-8 text-sm font-semibold rounded-[12px] bg-[#156E67] hover:bg-[#1C857D] text-white shadow-sm transition-all duration-180 hover:translate-y-[-1px]"
                >
                  Start a conversation
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center h-12 px-8 text-sm font-semibold rounded-[12px] border border-white/20 text-white hover:bg-white/10 transition-all duration-180 hover:translate-y-[-1px]"
                >
                  Explore our services
                </Link>
              </div>

              {/* Contact info bottom row */}
              <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-center items-center gap-6 text-white/75 text-sm font-semibold">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.email}
                </a>
                <span className="hidden sm:inline text-white/20">•</span>
                <a
                  href={`tel:${siteConfig.phones[0].replace(/[- ]/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.phones[0]}
                </a>
                <span className="hidden sm:inline text-white/20">•</span>
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
