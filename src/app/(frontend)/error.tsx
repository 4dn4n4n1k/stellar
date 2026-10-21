"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to the console
    console.error(error);
  }, [error]);

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
        <p className="text-red-400 font-bold text-xs uppercase tracking-[0.25em] mb-4 font-heading">
          System Error
        </p>
        <h1 className="heading-display text-4xl sm:text-5xl text-white font-extrabold mb-6 font-heading tracking-tight leading-tight">
          Something went wrong
        </h1>
        <p className="text-white/70 text-base leading-relaxed mb-10">
          An unexpected error occurred while loading this page. Our technical team has been notified.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto h-12 px-8 text-sm font-semibold rounded-[12px] bg-[#fce057] hover:bg-[#ebd04e] text-[#0c1b38] border-0 transition-all duration-[220ms] hover:translate-y-[-2px] shadow-sm font-heading focus-visible:ring-2 focus-visible:ring-[#fce057]"
          >
            Try Again
          </Button>
          <a
            href="/"
            className="inline-flex items-center justify-center w-full sm:w-auto h-12 px-8 text-sm font-semibold rounded-[12px] border border-white/20 text-white hover:bg-white/10 transition-all duration-180 hover:translate-y-[-2px] font-heading"
          >
            Return Home &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
