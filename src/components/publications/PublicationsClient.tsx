"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, FileText } from "lucide-react";

export type FormattedPublication = {
  id: string | number;
  title: string;
  description: string;
  category: string;
  date: string;
  documentUrl?: string | null;
  documentFilename?: string | null;
};

interface PublicationsClientProps {
  publications: FormattedPublication[];
}

export default function PublicationsClient({
  publications,
}: PublicationsClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(publications.map((p) => p.category))),
  ];

  const filtered =
    activeCategory === "All"
      ? publications
      : publications.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Category Tabs */}
      {categories.length > 1 && (
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`h-12 md:h-auto md:py-2 px-4 rounded-[6px] text-sm font-semibold transition-colors duration-180 border flex items-center justify-center cursor-pointer ${
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
      )}

      {/* Publications List */}
      {filtered.length > 0 ? (
        <div className="space-y-4 max-w-4xl mx-auto">
          {filtered.map((pub, i) => (
            <ScrollReveal key={pub.id || i} delay={i * 50}>
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

                <div className="flex flex-wrap items-center gap-3 md:shrink-0">
                  <Badge
                    variant="secondary"
                    className="bg-teal-700/10 text-teal-700 border border-teal-700/20 text-xs shadow-none hover:bg-teal-700/15 font-semibold"
                  >
                    {pub.category}
                  </Badge>
                  {pub.date && (
                    <span className="flex items-center gap-1.5 text-gray-600 text-xs font-medium">
                      <Calendar size={12} strokeWidth={1.5} />
                      {pub.date}
                    </span>
                  )}
                  {pub.documentUrl ? (
                    <a
                      href={pub.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={pub.documentFilename || true}
                      className="w-12 h-12 md:w-8 md:h-8 rounded-[6px] bg-navy-900/5 hover:bg-navy-900 hover:text-white text-navy-900/50 flex items-center justify-center transition-colors duration-180 focus-visible:ring-2 focus-visible:ring-[#156E67] focus-visible:outline-none"
                      title={`Download ${pub.title}`}
                      aria-label={`Download ${pub.title}`}
                    >
                      <Download className="w-[16px] h-[16px] md:w-[14px] md:h-[14px]" strokeWidth={1.5} />
                    </a>
                  ) : null}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 px-4 rounded-[10px] bg-gray-50 border border-gray-200 max-w-xl mx-auto shadow-xs">
          <div className="w-12 h-12 rounded-full bg-navy-900/5 flex items-center justify-center mx-auto mb-3">
            <FileText className="text-navy-900/40" size={24} strokeWidth={1.5} />
          </div>
          <h3 className="text-navy-900 font-bold text-lg mb-1 font-heading">
            No Publications Found
          </h3>
          <p className="text-gray-600 text-sm">
            {activeCategory === "All"
              ? "There are currently no published publications available. Please check back soon."
              : `There are currently no published publications under "${activeCategory}".`}
          </p>
        </div>
      )}
    </>
  );
}
