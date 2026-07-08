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
      <section className="bg-navy pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        <div className="hero-arc w-[400px] h-[400px] -top-40 -left-40 opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-3">
            Our Work
          </p>
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Portfolio
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Selected projects showcasing our impact across governance, labor
            rights, research, and capacity building.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sector Filters */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {sectors.map((sector) => (
                <button
                  key={sector}
                  onClick={() => setActiveSector(sector)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSector === sector
                      ? "bg-navy text-white shadow-lg shadow-navy/20"
                      : "bg-slate text-charcoal hover:bg-navy/10"
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
              <ScrollReveal key={i} delay={i * 80}>
                <div className="bg-slate rounded-xl p-6 card-hover-gold h-full flex flex-col">
                  {/* Placeholder image area */}
                  <div className="h-40 rounded-lg bg-navy/5 flex items-center justify-center mb-5">
                    <FolderOpen className="text-navy/20" size={40} />
                  </div>

                  <Badge className="w-fit mb-3 bg-gold/10 text-gold border-gold/20">
                    {project.sector}
                  </Badge>

                  <h3 className="text-navy font-semibold text-lg mb-2">
                    {project.title}
                  </h3>
                  <p className="text-warm-grey text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-warm-grey pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1.5">
                      <Building2 size={14} />
                      {project.client}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {project.year}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Placeholder notice */}
          <div className="text-center mt-12 text-warm-grey text-sm italic">
            Project details will be updated as new engagements are completed.
          </div>
        </div>
      </section>
    </div>
  );
}
