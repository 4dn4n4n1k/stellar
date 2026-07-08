"use client";

import { useState } from "react";
import { publications } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, FileText } from "lucide-react";

const categories = [
  "All",
  ...Array.from(new Set(publications.map((p) => p.category))),
];

export default function PublicationsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? publications
      : publications.filter((p) => p.category === activeCategory);

  return (
    <div className="page-enter">
      {/* Hero Banner */}
      <section className="bg-navy-950 pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        {/* Brand Pattern Background */}
        <svg
          className="absolute -top-20 -right-20 w-[40%] h-[60%] opacity-15 pointer-events-none"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="400" cy="0" r="100" stroke="white" strokeWidth="1" />
          <circle cx="400" cy="0" r="200" stroke="white" strokeWidth="1" />
          <circle cx="400" cy="0" r="300" stroke="white" strokeWidth="1" />
        </svg>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p className="text-teal-100 font-bold text-xs uppercase tracking-[0.15em] mb-3">
            Knowledge Hub
          </p>
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-white font-extrabold mb-6 font-heading">
            Publications
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Research reports, policy briefs, articles, and insights from our
            team of development experts.
          </p>
        </div>
      </section>

      {/* Publications */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-[6px] text-sm font-semibold transition-colors duration-180 border ${
                    activeCategory === cat
                      ? "bg-navy-900 text-white border-navy-900 shadow-sm"
                      : "bg-gray-50 text-gray-900 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Publication Cards */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {filtered.map((pub, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div className="pub-card bg-gray-25 border border-gray-200 rounded-[10px] p-6 flex flex-col md:flex-row md:items-center gap-4 hover:bg-gray-50 transition-colors duration-180 shadow-xs">
                  <div className="w-12 h-12 rounded-[6px] bg-navy-900/5 border border-gray-200 flex items-center justify-center shrink-0">
                    <FileText className="text-navy-900/40" size={22} strokeWidth={1.5} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-navy-900 font-bold text-base mb-1 font-heading">
                      {pub.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {pub.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Badge
                      variant="secondary"
                      className="bg-teal-700/10 text-teal-700 border border-teal-700/20 text-xs shadow-none hover:bg-teal-700/15 font-semibold"
                    >
                      {pub.category}
                    </Badge>
                    <span className="flex items-center gap-1.5 text-gray-600 text-xs font-medium">
                      <Calendar size={12} strokeWidth={1.5} />
                      {pub.date}
                    </span>
                    <button
                      className="w-8 h-8 rounded-[6px] bg-navy-900/5 hover:bg-navy-900 hover:text-white text-navy-900/50 flex items-center justify-center transition-colors duration-180"
                      title="Download (placeholder)"
                    >
                      <Download size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-12 text-gray-600 text-sm italic">
            Publications library will be expanded as new research is completed.
          </div>
        </div>
      </section>
    </div>
  );
}
