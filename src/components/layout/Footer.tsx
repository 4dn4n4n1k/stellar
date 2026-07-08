import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/data";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Download,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                <span className="text-navy font-bold text-lg heading-display">
                  S
                </span>
              </div>
              <div>
                <p className="text-white font-semibold text-lg leading-tight">
                  Stellar
                </p>
                <p className="text-gold-light text-[10px] tracking-[0.2em] uppercase">
                  Associates
                </p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              A Bangladesh-based development consultancy providing research,
              evaluation, governance advisory, and technical assistance services.
            </p>
            <a
              href="/stellar-profile.pdf"
              download
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light transition-colors"
            >
              <Download size={16} />
              Download Company Profile
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-6 uppercase tracking-wider text-sm">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/60 hover:text-gold transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-base mb-6 uppercase tracking-wider text-sm">
              Our Services
            </h3>
            <nav className="flex flex-col gap-3">
              {[
                "Research & Assessments",
                "Monitoring, Evaluation & Learning",
                "Governance & Democracy",
                "Labor Rights & Compliance",
                "Capacity Building",
                "Event & Delegation Support",
              ].map((service) => (
                <Link
                  key={service}
                  href="/services"
                  className="text-white/60 hover:text-gold transition-colors text-sm"
                >
                  {service}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-base mb-6 uppercase tracking-wider text-sm">
              Contact Us
            </h3>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-start gap-3 text-white/60 hover:text-gold transition-colors text-sm"
              >
                <Mail size={16} className="mt-0.5 shrink-0" />
                {siteConfig.email}
              </a>
              {siteConfig.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone}`}
                  className="flex items-start gap-3 text-white/60 hover:text-gold transition-colors text-sm"
                >
                  <Phone size={16} className="mt-0.5 shrink-0" />
                  {phone}
                </a>
              ))}
              <div className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                {siteConfig.address}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {siteConfig.founded} Stellar Associates. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-white/40 text-xs">
              Evidence. Insight. Impact.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
