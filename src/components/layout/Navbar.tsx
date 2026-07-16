"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Transition immediately on scrolling down
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock scroll, manage escape listener, and focus trap when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      // Focus first focusable element inside the drawer
      const focusable = menuRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable && focusable.length > 0) {
        (focusable[0] as HTMLElement).focus();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
          return;
        }

        if (e.key === "Tab") {
          if (!menuRef.current) return;
          const focusableList = Array.from(
            menuRef.current.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          ) as HTMLElement[];

          if (focusableList.length === 0) return;

          const firstEl = focusableList[0];
          const lastEl = focusableList[focusableList.length - 1];

          if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstEl) {
              lastEl.focus();
              e.preventDefault();
            }
          } else {
            // Tab
            if (document.activeElement === lastEl) {
              firstEl.focus();
              e.preventDefault();
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      // Return focus to menu trigger when closed
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  // Dynamic styles for smooth glassmorphism transition on scroll
  const navStyle = {
    backgroundColor: scrolled ? "rgba(255, 255, 255, 0.70)" : "rgba(12, 27, 56, 0)",
    backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
    WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
    borderColor: scrolled ? "rgba(12, 27, 56, 0.08)" : "rgba(255, 255, 255, 0)",
  };

  return (
    <>
      {/* Seamless Transitioning Navbar Container */}
      <div
        style={navStyle}
        className={`fixed left-1/2 -translate-x-1/2 z-50 h-[64px] flex items-center justify-between px-4 md:px-8 border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${scrolled
            ? "top-[20px] md:top-[24px] w-[92%] sm:w-[85%] max-w-[1200px] rounded-full shadow-[0_8px_32px_rgba(12,27,56,0.08),0_2px_8px_rgba(12,27,56,0.04)]"
            : "top-0 w-full rounded-none shadow-none"
          }`}
      >
        {/* Left Area (Logo) */}
        <div className="flex items-center shrink-0">
          <Link href="/" className="flex items-center group gap-2">
            <span className={`font-extrabold text-xl md:text-2xl font-heading tracking-tight transition-colors duration-300 ${
              scrolled ? "text-[#0C1B38]" : "text-white group-hover:text-teal-100"
            }`}>
              Stellar <span className={`font-light transition-colors duration-300 ${
                scrolled ? "text-[#0C1B38]/80" : "text-white/80"
              }`}>Associates</span>
            </span>
          </Link>
        </div>

        {/* Right Area (Desktop Navigation & Mobile Toggle) */}
        <div className="flex items-center gap-4">
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.filter(l => l.href !== "/contact").map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 xl:px-4 py-2 text-[15px] font-semibold transition-colors duration-300 ${
                    scrolled
                      ? isActive
                        ? "text-[#0C1B38]"
                        : "text-[#0C1B38]/70 hover:text-[#0C1B38]"
                      : isActive
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                  } group`}
                >
                  {link.label}
                  {/* Grow-from-center Underline */}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#fce057] transition-transform duration-250 ease-out origin-center ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                  />
                </Link>
              );
            })}

            {/* Desktop Contact CTA Button */}
            <Link
              href="/contact"
              className="ml-2 xl:ml-3 inline-flex items-center justify-center h-[38px] px-5 text-[14px] font-semibold rounded-[10px] bg-[#fce057] hover:bg-[#ebd046] text-[#0c1b38] hover:translate-y-[-1px] transition-all duration-[200ms] ease-in-out font-heading"
            >
              Contact &rarr;
            </Link>
          </nav>

          {/* Mobile Menu Button (Hamburger) */}
          <button
            ref={triggerRef}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            className={`lg:hidden p-3 rounded-full transition-colors duration-180 shrink-0 focus-visible:ring-2 focus-visible:ring-[#156E67] focus-visible:outline-none ${
              scrolled
                ? "text-[#0C1B38] hover:bg-[#0C1B38]/10"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        inert={!isOpen ? true : undefined}
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar drawer */}
        <div
          ref={menuRef}
          className={`absolute right-0 top-0 h-full w-72 bg-[#0C1B38] border-l border-white/10 shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="text-white font-extrabold text-xl font-heading tracking-tight">
                Stellar <span className="font-light text-white/80">Associates</span>
              </span>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="text-white/80 hover:text-white p-3 hover:bg-white/10 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.filter(l => l.href !== "/contact").map((link, i) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 text-base font-semibold rounded-xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#fce057] focus-visible:outline-none ${isActive
                        ? "text-[#fce057] bg-white/5 border-l-4 border-[#fce057]"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                      }`}
                    style={{
                      transitionDelay: isOpen ? `${i * 30}ms` : "0ms",
                      transform: isOpen ? "translateX(0)" : "translateX(12px)",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Mobile Contact CTA Button */}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-4 mx-4 inline-flex items-center justify-center h-11 text-sm font-semibold rounded-xl bg-[#fce057] hover:bg-[#ebd046] text-[#0c1b38] transition-all duration-[200ms] ease-in-out font-heading focus-visible:ring-2 focus-visible:ring-[#fce057] focus-visible:outline-none"
                style={{
                  transitionDelay: isOpen ? `${navLinks.length * 30}ms` : "0ms",
                  transform: isOpen ? "translateX(0)" : "translateX(12px)",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                Contact &rarr;
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
