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
      <section className="bg-navy pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        <div className="hero-arc w-[400px] h-[400px] -top-40 -right-40 opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-3">
            Knowledge Hub
          </p>
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Publications
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Research reports, policy briefs, articles, and insights from our
            team of development experts.
          </p>
        </div>
      </section>

      {/* Publications */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-navy text-white shadow-lg shadow-navy/20"
                      : "bg-slate text-charcoal hover:bg-navy/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Publication Cards */}
          <div className="space-y-4">
            {filtered.map((pub, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="pub-card bg-white rounded-xl p-6 border border-gray-100 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-navy/5 flex items-center justify-center shrink-0">
                    <FileText className="text-navy/40" size={22} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-navy font-semibold text-base mb-1">
                      {pub.title}
                    </h3>
                    <p className="text-warm-grey text-sm leading-relaxed">
                      {pub.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Badge
                      variant="secondary"
                      className="bg-gold/10 text-gold border-gold/20 text-xs"
                    >
                      {pub.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-warm-grey text-xs">
                      <Calendar size={12} />
                      {pub.date}
                    </span>
                    <button
                      className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center hover:bg-navy hover:text-white text-navy/40 transition-all"
                      title="Download (placeholder)"
                    >
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-12 text-warm-grey text-sm italic">
            Publications library will be expanded as new research is completed.
          </div>
        </div>
      </section>
    </div>
  );
}
