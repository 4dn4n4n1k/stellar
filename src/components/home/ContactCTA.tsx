import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, Mail } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="py-20 md:py-28 bg-slate">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <div className="bg-white rounded-2xl p-10 md:p-14 shadow-lg shadow-navy/5 relative overflow-hidden">
            {/* Gold accent gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

            <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-3">
              Get In Touch
            </p>
            <h2 className="heading-section text-3xl md:text-4xl text-navy mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-warm-grey text-lg max-w-2xl mx-auto mb-8">
              Whether you need research support, evaluation services, or
              strategic advisory — our team is ready to help you achieve your
              development goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-11 px-8 text-sm font-semibold rounded-lg bg-gradient-to-r from-gold to-gold-light text-navy hover:from-gold-light hover:to-gold shadow-lg shadow-gold/20 transition-all"
              >
                <Mail className="mr-2" size={18} />
                Contact Us
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center h-11 px-8 text-sm font-medium rounded-lg border border-navy text-navy hover:bg-navy hover:text-white transition-all"
              >
                Explore Services
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>

            {/* Clients placeholder */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-warm-grey text-sm italic">
                Experience of team members includes collaboration with
                international donors, UN agencies, civil society organizations,
                government institutions, and private sector actors.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
