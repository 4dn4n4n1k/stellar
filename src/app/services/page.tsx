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
            What We Do
          </p>
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-white font-extrabold mb-6 font-heading">
            Our Services
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Comprehensive development solutions spanning research, evaluation,
            governance, labor rights, capacity building, and operational support.
          </p>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
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
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-[6px] text-sm font-semibold transition-colors duration-180 border ${
                      isActive
                        ? "bg-navy-900 text-white border-navy-900 shadow-sm"
                        : "bg-gray-50 text-gray-900 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={16} strokeWidth={1.5} />
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
                <div className="bg-gray-50 border border-gray-200 rounded-[10px] p-8 md:p-12 shadow-xs">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-[6px] bg-navy-900 flex items-center justify-center shrink-0 shadow-sm">
                      <Icon className="text-teal-100" size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="heading-section text-2xl md:text-3xl text-navy-900 font-extrabold font-heading">
                        {service.title}
                      </h2>
                      <p className="text-gray-600 text-base mt-1">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    {service.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 bg-gray-25 border border-gray-200 rounded-[6px] p-4 card-hover-teal shadow-xs"
                      >
                        <div className="w-2 h-2 rounded-full bg-teal-700 shrink-0" />
                        <span className="text-gray-900 text-sm font-semibold">
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
      <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Services overview"
            title="Complete Service Overview"
            subtitle="All our service categories at a glance."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, i) => {
              const Icon = iconMap[service.icon] || Search;
              return (
                <ScrollReveal key={service.id} delay={i * 60}>
                  <div
                    className="bg-gray-25 border border-gray-200 rounded-[10px] p-6 hover:translate-y-[-2px] hover:shadow-hover transition-all duration-180 cursor-pointer h-full flex flex-col justify-between shadow-xs"
                    onClick={() => {
                      setActiveTab(service.id);
                      window.scrollTo({ top: 300, behavior: "smooth" });
                    }}
                  >
                    <div>
                      <div className="w-12 h-12 rounded-[6px] bg-navy-900 flex items-center justify-center mb-4 shadow-sm">
                        <Icon className="text-teal-100" size={22} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-navy-900 font-bold text-lg mb-2 font-heading">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <p className="text-teal-700 text-sm font-bold mt-2">
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
