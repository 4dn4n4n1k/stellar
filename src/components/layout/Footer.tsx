import Link from "next/link";
import Image from "next/image";
import { navLinks, siteConfig } from "@/lib/data";
import {
  Mail,
  Phone,
  MapPin,
  Download,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white border-t border-white/5">
      {/* Main Footer */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-8">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-4 mb-6 group">
              <Image
                src="/logo.png"
                alt="Stellar Associates Logo"
                width={72}
                height={72}
                className="rounded-xl object-cover shrink-0"
              />
              <div className="flex flex-col justify-center leading-[1.1]">
                <span className="text-white font-extrabold text-xl font-heading tracking-tight transition-colors duration-180 group-hover:text-teal-100">
                  Stellar
                </span>
                <span className="text-white/80 font-light text-base font-heading tracking-tight transition-colors duration-180 group-hover:text-teal-100">
                  Associates
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              A Bangladesh-based development consultancy providing research,
              evaluation, governance advisory, and technical assistance services.
            </p>

            <div className="flex flex-col gap-4 mb-6">
              <a
                href="/stellar-profile.pdf"
                download
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors duration-180 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
              >
                <Download size={16} />
                Download Company Profile
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all duration-180 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all duration-180 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all duration-180 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all duration-180 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163c-.272-1.018-1.074-1.819-2.091-2.091C19.56 3.75 12 3.75 12 3.75s-7.56 0-9.407.522c-1.017.272-1.819 1.073-2.091 2.091C0 8.01 0 12 0 12s0 3.99.502 5.837c.272 1.018 1.074 1.819 2.091 2.091C4.44 20.25 12 20.25 12 20.25s7.56 0 9.407-.522c1.017-.272 1.819-1.073 2.091-2.091C24 15.99 24 12 24 12s0-3.99-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-5 rounded-full bg-red-600 block shrink-0" />
              <h3 className="text-white font-bold text-lg font-heading">
                Quick Links
              </h3>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/60 hover:text-white transition-colors duration-180 text-sm flex items-center gap-2 group py-1.5 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
                >
                  <span className="text-white/30 group-hover:text-teal-400 transition-colors duration-180">•</span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Us Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-5 rounded-full bg-[#fce057] block shrink-0" />
              <h3 className="text-white font-bold text-lg font-heading">
                Contact Us
              </h3>
            </div>
            <div className="flex flex-col gap-5">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[8px] bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={18} className="text-[#fce057]" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold uppercase tracking-wider mb-1">
                    Location
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {siteConfig.address}
                  </p>
                </div>
              </div>

              {/* Email */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-start gap-4 group focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none rounded-lg"
              >
                <div className="w-10 h-10 rounded-[8px] bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors duration-180 mt-0.5">
                  <Mail size={18} className="text-[#fce057]" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <p className="text-white/60 text-sm group-hover:text-white transition-colors duration-180">
                    {siteConfig.email}
                  </p>
                </div>
              </a>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[8px] bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone size={18} className="text-[#fce057]" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold uppercase tracking-wider mb-1">
                    Phone
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {siteConfig.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone}`}
                        className="text-white/60 text-sm hover:text-white transition-colors duration-180 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Services Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-5 rounded-full bg-teal-400 block shrink-0" />
              <h3 className="text-white font-bold text-lg font-heading">
                Our Services
              </h3>
            </div>
            <nav className="flex flex-col gap-1">
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
                  className="text-white/60 hover:text-white transition-colors duration-180 text-sm flex items-center gap-2 group py-1.5 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
                >
                  <span className="text-white/30 group-hover:text-teal-400 transition-colors duration-180">•</span>
                  {service}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {siteConfig.founded} Stellar Associates. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
