"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-navy-950 text-white h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <h1 className="text-4xl font-extrabold mb-4 font-heading">System Error</h1>
        <p className="text-white/70 mb-8 max-w-md">
          A critical system error occurred. Please try reloading the application.
        </p>
        <button
          onClick={() => reset()}
          className="h-12 px-8 rounded-xl bg-[#fce057] text-[#0c1b38] font-semibold hover:bg-[#ebd04e] transition-colors"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
