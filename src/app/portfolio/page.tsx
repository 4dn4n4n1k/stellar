"use client";

import { useState } from "react";
import { portfolioProjects } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Calendar, Building2, FolderOpen } from "lucide-react";

const sectors = [
  "All",
  ...Array.from(new Set(portfolioProjects.map((p) => p.sector))),
];

export default function PortfolioPage() {
  const [activeSector, setActiveSector] = useState("All");

  const filtered =
    activeSector === "All"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.sector === activeSector);

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
            Our Work
          </p>
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-white font-extrabold mb-6 font-heading">
            Portfolio
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Selected projects showcasing our impact across governance, labor
            rights, research, and capacity building.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sector Filters */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {sectors.map((sector) => (
                <button
                  key={sector}
                  onClick={() => setActiveSector(sector)}
                  className={`px-4 py-2 rounded-[6px] text-sm font-semibold transition-colors duration-180 border ${
                    activeSector === sector
                      ? "bg-navy-900 text-white border-navy-900 shadow-sm"
                      : "bg-gray-50 text-gray-900 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="bg-gray-50 border border-gray-200 rounded-[10px] p-6 card-hover-teal h-full flex flex-col shadow-xs">
                  {/* Placeholder image area */}
                  <div className="h-40 rounded-[6px] bg-navy-900/5 border border-gray-200/50 flex items-center justify-center mb-5">
                    <FolderOpen className="text-navy-900/20" size={40} strokeWidth={1.5} />
                  </div>

                  <Badge className="w-fit mb-3 bg-teal-700/10 text-teal-700 border border-teal-700/20 hover:bg-teal-700/15 transition-colors shadow-none font-semibold">
                    {project.sector}
                  </Badge>

                  <h3 className="text-navy-900 font-bold text-lg mb-2 font-heading">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-600 pt-4 border-t border-gray-200">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Building2 size={14} strokeWidth={1.5} />
                      {project.client}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar size={14} strokeWidth={1.5} />
                      {project.year}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Placeholder notice */}
          <div className="text-center mt-12 text-gray-600 text-sm italic">
            Project details will be updated as new engagements are completed.
          </div>
        </div>
      </section>
    </div>
  );
}
