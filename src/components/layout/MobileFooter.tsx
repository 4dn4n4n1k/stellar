"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks, siteConfig } from "@/lib/data";
import { ChevronDown, MapPin, Mail, Phone, ArrowRight } from "lucide-react";

export default function MobileFooter() {
  const [linksOpen, setLinksOpen] = useState(false);

  return (
    <footer className="bg-navy-950 text-white border-t border-white/5 px-5 pt-10 pb-8">

      {/* Section 1 — Company */}
      <div className="flex items-center gap-4 mb-10">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.webp"
            alt="Stellar Associates Logo"
            width={64}
            height={64}
            className="rounded-xl object-cover"
          />
        </Link>
        <div>
          <Link href="/" className="block mb-1">
            <span className="text-white font-extrabold text-lg font-heading tracking-tight">Stellar </span>
            <span className="text-white/80 font-light text-lg font-heading tracking-tight">Associates</span>
          </Link>
          <p className="text-white/50 text-[13px] leading-snug max-w-[220px]">
            Evidence-based development consulting for governments, donors and civil society.
          </p>
        </div>
      </div>

      {/* Section 2 — Download Company Profile Card */}
      <a
        href="/stellar-profile.pdf"
        download
        className="group flex items-center gap-4 w-full rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] hover:-translate-y-0.5 transition-all duration-[200ms] ease-in-out px-4 py-4 mb-10"
      >
        {/* PDF Icon */}
        <div className="w-12 h-12 rounded-xl bg-white/8 border border-white/10 flex flex-col items-center justify-center shrink-0 gap-0.5">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/70 fill-current">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
          </svg>
          <span className="text-[9px] font-bold tracking-widest text-white/50 uppercase font-heading">PDF</span>
        </div>
        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-[14px] font-heading mb-0.5">Download Company Profile</p>
          <p className="text-white/40 text-[12px]">PDF • 3 MB</p>
        </div>
        {/* Arrow */}
        <ArrowRight size={18} className="text-[#38c9b0] shrink-0 transition-transform duration-[180ms] group-hover:translate-x-0.5" />
      </a>

      {/* Section 3 — Follow Us */}
      <div className="mb-10">
        <p className="text-white font-semibold text-[15px] font-heading mb-4">Follow Us</p>
        <div className="flex items-center gap-3">
          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-11 h-11 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 hover:scale-105 flex items-center justify-center text-white/60 hover:text-white transition-all duration-[180ms]"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-11 h-11 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 hover:scale-105 flex items-center justify-center text-white/60 hover:text-white transition-all duration-[180ms]"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          {/* X / Twitter */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="w-11 h-11 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 hover:scale-105 flex items-center justify-center text-white/60 hover:text-white transition-all duration-[180ms]"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          {/* YouTube */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-11 h-11 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 hover:scale-105 flex items-center justify-center text-white/60 hover:text-white transition-all duration-[180ms]"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.163c-.272-1.018-1.074-1.819-2.091-2.091C19.56 3.75 12 3.75 12 3.75s-7.56 0-9.407.522c-1.017.272-1.819 1.073-2.091 2.091C0 8.01 0 12 0 12s0 3.99.502 5.837c.272 1.018 1.074 1.819 2.091 2.091C4.44 20.25 12 20.25 12 20.25s7.56 0 9.407-.522c1.017-.272 1.819-1.073 2.091-2.091C24 15.99 24 12 24 12s0-3.99-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-white/[0.07] mb-10" />

      {/* Section 4 — Contact */}
      <div className="mb-10">
        <p className="text-white font-semibold text-[15px] font-heading mb-4">Contact</p>
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <MapPin size={15} className="text-[#38c9b0] shrink-0 mt-0.5" />
            <span className="text-white/60 text-[13px] leading-snug">Dhaka, Bangladesh</span>
          </div>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 group"
          >
            <Mail size={15} className="text-[#38c9b0] shrink-0" />
            <span className="text-white/60 text-[13px] group-hover:text-white transition-colors duration-[150ms]">
              {siteConfig.email}
            </span>
          </a>
          <a
            href={`tel:${siteConfig.phones[0]}`}
            className="flex items-center gap-3 group"
          >
            <Phone size={15} className="text-[#38c9b0] shrink-0" />
            <span className="text-white/60 text-[13px] group-hover:text-white transition-colors duration-[150ms]">
              {siteConfig.phones[0]}
            </span>
          </a>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-white/[0.07] mb-4" />

      {/* Section 5 — Quick Links Accordion */}
      <div className="mb-10">
        <button
          onClick={() => setLinksOpen((o) => !o)}
          aria-expanded={linksOpen}
          className="w-full flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38c9b0]"
        >
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#38c9b0] fill-none stroke-current" strokeWidth={1.8}>
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
            <span className="text-white font-semibold text-[14px] font-heading">Quick Links</span>
          </div>
          <ChevronDown
            size={18}
            className={`text-[#38c9b0] transition-transform duration-[250ms] ${linksOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Accordion body */}
        <div
          className={`overflow-hidden transition-all duration-[300ms] ease-in-out ${linksOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <nav className="px-4 pt-3 pb-1 flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/55 hover:text-white text-[14px] py-2 flex items-center gap-2 group transition-colors duration-[150ms]"
              >
                <span className="text-white/20 group-hover:text-[#38c9b0] transition-colors duration-[150ms]">›</span>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-white/[0.07] mb-6" />

      {/* Section 6 — Copyright */}
      <div className="text-center">
        <p className="text-white/35 text-[12px]">
          © {siteConfig.founded} Stellar Associates
        </p>
      </div>
    </footer>
  );
}
