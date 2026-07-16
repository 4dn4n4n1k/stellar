"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-navy-950 px-6 text-center overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="50%" r="200" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="50%" cy="50%" r="350" stroke="white" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 max-w-md mx-auto mt-12">
        <p className="text-[#fce057] font-bold text-xs uppercase tracking-[0.25em] mb-4 font-heading">
          Error 404
        </p>
        <h1 className="heading-display text-4xl sm:text-5xl text-white font-extrabold mb-6 font-heading tracking-tight leading-tight">
          Page Not Found
        </h1>
        <p className="text-white/70 text-base leading-relaxed mb-10">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 px-8 text-sm font-semibold rounded-[12px] bg-[#fce057] hover:bg-[#ebd04e] text-[#0c1b38] transition-all duration-[220ms] hover:translate-y-[-2px] shadow-sm font-heading"
          >
            Return Home &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
