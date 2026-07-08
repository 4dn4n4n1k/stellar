"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { servicesData } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import {
  Search,
  BarChart3,
  Landmark,
  HardHat,
  GraduationCap,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Search,
  BarChart3,
  Landmark,
  HardHat,
  GraduationCap,
  CalendarDays,
};

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState(servicesData[0].id);

  return (
    <div className="page-enter">
      {/* Hero Banner */}
      <section className="bg-navy pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        <div className="hero-arc w-[400px] h-[400px] -top-40 -left-40 opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-3">
            What We Do
          </p>
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Our Services
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Comprehensive development solutions spanning research, evaluation,
            governance, labor rights, capacity building, and operational support.
          </p>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {servicesData.map((service) => {
                const Icon = iconMap[service.icon] || Search;
                const isActive = activeTab === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveTab(service.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-navy text-white shadow-lg shadow-navy/20"
                        : "bg-slate text-charcoal hover:bg-navy/10"
                    }`}
                  >
                    <Icon size={16} />
                    <span className="hidden sm:inline">{service.title}</span>
                    <span className="sm:hidden">
                      {service.title.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Active Tab Content */}
          {servicesData.map((service) => {
            if (service.id !== activeTab) return null;
            const Icon = iconMap[service.icon] || Search;
            return (
              <div key={service.id} className="max-w-4xl mx-auto">
                <div className="bg-slate rounded-2xl p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-navy flex items-center justify-center shrink-0">
                      <Icon className="text-gold" size={30} />
                    </div>
                    <div>
                      <h2 className="heading-section text-2xl md:text-3xl text-navy">
                        {service.title}
                      </h2>
                      <p className="text-warm-grey text-base mt-1">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    {service.items.map((item, i) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 bg-white rounded-lg p-4 card-hover-gold"
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gold to-gold-light shrink-0" />
                        <span className="text-charcoal text-sm font-medium">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* All Services Overview */}
      <section className="py-20 md:py-28 bg-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Complete Service Overview"
            subtitle="All our service categories at a glance."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, i) => {
              const Icon = iconMap[service.icon] || Search;
              return (
                <ScrollReveal key={service.id} delay={i * 80}>
                  <div
                    className="bg-white rounded-xl p-6 card-hover cursor-pointer h-full"
                    onClick={() => {
                      setActiveTab(service.id);
                      window.scrollTo({ top: 300, behavior: "smooth" });
                    }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-navy flex items-center justify-center mb-4">
                      <Icon className="text-gold" size={22} />
                    </div>
                    <h3 className="text-navy font-semibold text-lg mb-2">
                      {service.title}
                    </h3>
                    <p className="text-warm-grey text-sm mb-4">
                      {service.description}
                    </p>
                    <p className="text-gold text-sm font-medium">
                      {service.items.length} specialized services →
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
