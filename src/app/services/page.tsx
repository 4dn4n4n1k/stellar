"use client";

import { useState } from "react";
import { servicesData } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Search,
  BarChart3,
  Landmark,
  HardHat,
  GraduationCap,
  CalendarDays,
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

  // Custom editorial layout for each active service category
  const renderActiveServiceDetails = (serviceId: string) => {
    const service = servicesData.find((s) => s.id === serviceId);
    if (!service) return null;

    switch (serviceId) {
      case "research":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="text-[#0e6461] font-bold text-xs uppercase tracking-[0.15em] block mb-3">
                Flagship Capability
              </span>
              <h3 className="text-3xl font-extrabold text-[#0c1b38] font-heading mb-6 leading-tight">
                Research & Assessments
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
                Generating rigorous, evidence-based insights to inform program design, policy development, and strategic interventions.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Stellar Associates deploys quantitative, qualitative, and mixed-methods research designs tailored to complex development contexts. We bridge international research standards with localized on-the-ground execution.
              </p>
              
              <div className="border-t border-gray-200 pt-6">
                <span className="text-gray-400 text-[10px] font-mono block uppercase tracking-widest mb-3">
                  Methodologies & Frameworks
                </span>
                <div className="flex flex-wrap gap-2">
                  {["Mixed-Methods", "Randomized Sampling", "Key Informant Interviews", "Focus Groups", "PEA Frameworks"].map((m) => (
                    <span key={m} className="bg-gray-100 text-gray-800 text-[11px] font-semibold px-2.5 py-1 rounded">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pl-12 lg:border-l border-gray-200">
              <h4 className="text-sm font-bold text-[#0c1b38] font-heading uppercase tracking-wider mb-6">
                Core Capabilities
              </h4>
              
              <div className="space-y-8">
                <div>
                  <h5 className="text-[#0e6461] font-semibold text-xs uppercase tracking-wider mb-3">
                    Evaluation Studies
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Baseline Studies", "Midline Studies", "Endline Studies"].map((item) => (
                      <div key={item} className="flex items-center gap-3 bg-gray-50 border border-gray-150 rounded-[8px] p-3.5 hover:border-gray-300 transition-colors duration-185">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0e6461]" />
                        <span className="text-gray-900 text-sm font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[#0e6461] font-semibold text-xs uppercase tracking-wider mb-3">
                    Sector & Policy Analysis
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Political Economy Analysis", "Sector Assessments", "Compliance Assessments"].map((item) => (
                      <div key={item} className="flex items-center gap-3 bg-gray-50 border border-gray-150 rounded-[8px] p-3.5 hover:border-gray-300 transition-colors duration-185">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0e6461]" />
                        <span className="text-gray-900 text-sm font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[#0e6461] font-semibold text-xs uppercase tracking-wider mb-3">
                    Market & Public Surveys
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Labour Market Studies", "Public Opinion Surveys"].map((item) => (
                      <div key={item} className="flex items-center gap-3 bg-gray-50 border border-gray-150 rounded-[8px] p-3.5 hover:border-gray-300 transition-colors duration-185">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0e6461]" />
                        <span className="text-gray-900 text-sm font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-gray-150 flex flex-wrap gap-x-8 gap-y-2 text-xs">
                <div>
                  <span className="text-gray-400 font-mono block uppercase tracking-wider mb-0.5">Typical Deliverables</span>
                  <span className="text-gray-800 font-semibold">Technical Reports, Policy Briefs, Datasets</span>
                </div>
                <div>
                  <span className="text-gray-400 font-mono block uppercase tracking-wider mb-0.5">Applications</span>
                  <span className="text-gray-800 font-semibold">Project Design, Policy Formulation</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "mel":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-7 lg:pr-12 lg:border-r border-gray-200">
              <h4 className="text-sm font-bold text-[#0c1b38] font-heading uppercase tracking-wider mb-6">
                Monitoring & Evaluation Capabilities
              </h4>

              <div className="space-y-8">
                <div>
                  <h5 className="text-[#0e6461] font-semibold text-xs uppercase tracking-wider mb-3">
                    Frameworks & Design
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Performance Monitoring", "Evaluation Design", "Indicator Development"].map((item) => (
                      <div key={item} className="flex items-center gap-3 bg-gray-50 border border-gray-150 rounded-[8px] p-3.5 hover:border-gray-300 transition-colors duration-185">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0e6461]" />
                        <span className="text-gray-900 text-sm font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[#0e6461] font-semibold text-xs uppercase tracking-wider mb-3">
                    Evaluations & Learning
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Data Quality Assessments", "Learning Agendas", "Impact Evaluations"].map((item) => (
                      <div key={item} className="flex items-center gap-3 bg-gray-50 border border-gray-150 rounded-[8px] p-3.5 hover:border-gray-300 transition-colors duration-185">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0e6461]" />
                        <span className="text-gray-900 text-sm font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-gray-150 flex flex-wrap gap-x-8 gap-y-2 text-xs">
                <div>
                  <span className="text-gray-400 font-mono block uppercase tracking-wider mb-0.5">Typical Deliverables</span>
                  <span className="text-gray-800 font-semibold">MEL Plans, Indicator Matrices, DQA Reports</span>
                </div>
                <div>
                  <span className="text-gray-400 font-mono block uppercase tracking-wider mb-0.5">Focus Areas</span>
                  <span className="text-gray-800 font-semibold">Adaptive Management, Donor Compliance</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <span className="text-[#0e6461] font-bold text-xs uppercase tracking-[0.15em] block mb-3">
                Evidence & Learning
              </span>
              <h3 className="text-3xl font-extrabold text-[#0c1b38] font-heading mb-6 leading-tight">
                Monitoring, Evaluation & Learning
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
                Tracking progress, ensuring data integrity, and designing systematic learning agendas for adaptive program management.
              </p>
              
              <div className="bg-gray-50 border border-gray-150 rounded-[10px] p-6 mt-6">
                <span className="text-[#0c1b38] font-extrabold text-xs uppercase tracking-wider block mb-2">
                  Adaptive Management
                </span>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We move beyond simple checklist monitoring to create robust learning feedback loops. This ensures programs adapt in real-time to changing contextual realities and implementation data.
                </p>
              </div>
            </div>
          </div>
        );

      case "governance":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="text-[#0e6461] font-bold text-xs uppercase tracking-[0.15em] block mb-3">
                Systemic Reform
              </span>
              <h3 className="text-3xl font-extrabold text-[#0c1b38] font-heading mb-6 leading-tight">
                Governance & Democracy Support
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
                Providing strategic advisory and technical support to strengthen democratic institutions, enhance public transparency, and empower civil society.
              </p>
              
              <div className="border-t border-gray-200 pt-6 mt-8">
                <span className="text-gray-400 text-[10px] font-mono block uppercase tracking-widest mb-2">
                  Organizations Served
                </span>
                <p className="text-gray-900 text-sm font-semibold">
                  Government Ministries, Civil Society Coalitions, Diplomatic Missions
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pl-12 lg:border-l border-gray-200">
              <h4 className="text-sm font-bold text-[#0c1b38] font-heading uppercase tracking-wider mb-6">
                Core Service Domains
              </h4>

              <div className="space-y-8">
                <div>
                  <h5 className="text-[#0e6461] font-semibold text-xs uppercase tracking-wider mb-3">
                    Democratic Governance & Integrity
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Democratic Governance", "Accountability Systems", "Anti-Corruption"].map((item) => (
                      <div key={item} className="flex items-center gap-3 bg-gray-50 border border-gray-150 rounded-[8px] p-3.5 hover:border-gray-300 transition-colors duration-185">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0e6461]" />
                        <span className="text-gray-900 text-sm font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[#0e6461] font-semibold text-xs uppercase tracking-wider mb-3">
                    Process & Rights Participation
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Electoral Processes", "Civic Participation", "Human Rights"].map((item) => (
                      <div key={item} className="flex items-center gap-3 bg-gray-50 border border-gray-150 rounded-[8px] p-3.5 hover:border-gray-300 transition-colors duration-185">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0e6461]" />
                        <span className="text-gray-900 text-sm font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "labor":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="text-[#0e6461] font-bold text-xs uppercase tracking-[0.15em] block mb-3">
                Supply Chain & Compliance
              </span>
              <h3 className="text-3xl font-extrabold text-[#0c1b38] font-heading mb-6 leading-tight">
                Labor Rights & Social Compliance
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
                Ensuring workplace rights, occupational health safety, and social standard compliance across industrial sectors and global supply chains.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Stellar Associates helps enterprises, industry bodies, and development partners align with ILO core conventions, buyer codes of conduct, and international ESG (Environmental, Social, and Governance) expectations.
              </p>

              <div className="border-t border-gray-200 pt-6">
                <span className="text-gray-400 text-[10px] font-mono block uppercase tracking-widest mb-2">
                  Compliance Frameworks
                </span>
                <p className="text-gray-900 text-sm font-semibold">
                  ILO Standards, ESG Materiality, Brand Code Audits, Bangladesh Labor Act
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pl-12 lg:border-l border-gray-200">
              <h4 className="text-sm font-bold text-[#0c1b38] font-heading uppercase tracking-wider mb-6">
                Compliance & Wellbeing Capabilities
              </h4>

              <div className="space-y-8">
                <div>
                  <h5 className="text-[#0e6461] font-semibold text-xs uppercase tracking-wider mb-3">
                    Safety & Assessment Auditing
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Workplace Assessments", "Occupational Safety & Health", "ESG Assessments"].map((item) => (
                      <div key={item} className="flex items-center gap-3 bg-gray-50 border border-gray-150 rounded-[8px] p-3.5 hover:border-gray-300 transition-colors duration-185">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0e6461]" />
                        <span className="text-gray-900 text-sm font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[#0e6461] font-semibold text-xs uppercase tracking-wider mb-3">
                    Wellbeing & Equity Operations
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Worker Wellbeing", "Grievance Mechanisms", "Gender Equality"].map((item) => (
                      <div key={item} className="flex items-center gap-3 bg-gray-50 border border-gray-150 rounded-[8px] p-3.5 hover:border-gray-300 transition-colors duration-185">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0e6461]" />
                        <span className="text-gray-900 text-sm font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-gray-150 flex flex-wrap gap-x-8 gap-y-2 text-xs">
                <div>
                  <span className="text-gray-400 font-mono block uppercase tracking-wider mb-0.5">Typical Deliverables</span>
                  <span className="text-gray-800 font-semibold">Compliance Roadmaps, Audit Reports, ESG Disclosures</span>
                </div>
                <div>
                  <span className="text-gray-400 font-mono block uppercase tracking-wider mb-0.5">Target Sectors</span>
                  <span className="text-gray-800 font-semibold">RMG, Manufacturing, Leather & Footwear</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "capacity":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-7 lg:pr-12 lg:border-r border-gray-200">
              <h4 className="text-sm font-bold text-[#0c1b38] font-heading uppercase tracking-wider mb-6">
                Training & Development Clusters
              </h4>

              <div className="space-y-8">
                <div>
                  <h5 className="text-[#0e6461] font-semibold text-xs uppercase tracking-wider mb-3">
                    Institutional Capability
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Training Design", "Leadership Development", "Organizational Development"].map((item) => (
                      <div key={item} className="flex items-center gap-3 bg-gray-50 border border-gray-150 rounded-[8px] p-3.5 hover:border-gray-300 transition-colors duration-185">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0e6461]" />
                        <span className="text-gray-900 text-sm font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[#0e6461] font-semibold text-xs uppercase tracking-wider mb-3">
                    CSO & Youth Support
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["CSO Strengthening", "Youth Leadership"].map((item) => (
                      <div key={item} className="flex items-center gap-3 bg-gray-50 border border-gray-150 rounded-[8px] p-3.5 hover:border-gray-300 transition-colors duration-185">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0e6461]" />
                        <span className="text-gray-900 text-sm font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-gray-150 flex flex-wrap gap-x-8 gap-y-2 text-xs">
                <div>
                  <span className="text-gray-400 font-mono block uppercase tracking-wider mb-0.5">Typical Deliverables</span>
                  <span className="text-gray-800 font-semibold">Training Modules, OD Action Plans, Mentorship Frameworks</span>
                </div>
                <div>
                  <span className="text-gray-400 font-mono block uppercase tracking-wider mb-0.5">Target Groups</span>
                  <span className="text-gray-800 font-semibold">CSO Staff, Youth Leaders, Mid-level Managers</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <span className="text-[#0e6461] font-bold text-xs uppercase tracking-[0.15em] block mb-3">
                Empowerment & Growth
              </span>
              <h3 className="text-3xl font-extrabold text-[#0c1b38] font-heading mb-6 leading-tight">
                Capacity Building
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
                Designing training curricula and institutional frameworks to foster sustainable capability and local leadership.
              </p>
              
              <div className="bg-gray-50 border border-gray-150 rounded-[10px] p-6 mt-6">
                <span className="text-[#0c1b38] font-extrabold text-xs uppercase tracking-wider block mb-2">
                  Sustainable Ownership
                </span>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our training methodologies emphasize practical skill acquisition, system design, and institutionalization, ensuring organizations sustain performance gains independently over time.
                </p>
              </div>
            </div>
          </div>
        );

      case "events":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="text-[#0e6461] font-bold text-xs uppercase tracking-[0.15em] block mb-3">
                Logistics & Forums
              </span>
              <h3 className="text-3xl font-extrabold text-[#0c1b38] font-heading mb-6 leading-tight">
                Event & Delegation Support
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
                End-to-end coordination and management for high-level conferences, workshops, international delegations, and study tours.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Stellar Associates ensures seamless operational, translation, and logistics planning for foreign visitors, development agency reps, and bilateral meetings.
              </p>

              <div className="border-t border-gray-200 pt-6">
                <span className="text-gray-400 text-[10px] font-mono block uppercase tracking-widest mb-2">
                  Specialized Services
                </span>
                <p className="text-gray-900 text-sm font-semibold">
                  Interpretation Support, B2B Meeting Facilitation, Site Visit Logistical Setup
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pl-12 lg:border-l border-gray-200">
              <h4 className="text-sm font-bold text-[#0c1b38] font-heading uppercase tracking-wider mb-6">
                Logistical & Forum Capabilities
              </h4>

              <div className="space-y-8">
                <div>
                  <h5 className="text-[#0e6461] font-semibold text-xs uppercase tracking-wider mb-3">
                    Exchanges & Study Programs
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Study Tours", "International Delegations", "Interpretation Support"].map((item) => (
                      <div key={item} className="flex items-center gap-3 bg-gray-50 border border-gray-150 rounded-[8px] p-3.5 hover:border-gray-300 transition-colors duration-185">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0e6461]" />
                        <span className="text-gray-900 text-sm font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[#0e6461] font-semibold text-xs uppercase tracking-wider mb-3">
                    Forum & Workshop Planning
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Conferences", "Workshops"].map((item) => (
                      <div key={item} className="flex items-center gap-3 bg-gray-50 border border-gray-150 rounded-[8px] p-3.5 hover:border-gray-300 transition-colors duration-185">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0e6461]" />
                        <span className="text-gray-900 text-sm font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-gray-150 flex flex-wrap gap-x-8 gap-y-2 text-xs">
                <div>
                  <span className="text-gray-400 font-mono block uppercase tracking-wider mb-0.5">Typical Deliverables</span>
                  <span className="text-gray-800 font-semibold">Event Proceedings, Tour Itineraries, Briefing Books</span>
                </div>
                <div>
                  <span className="text-gray-400 font-mono block uppercase tracking-wider mb-0.5">Applications</span>
                  <span className="text-gray-800 font-semibold">Knowledge Sharing, Bilateral Collaborations</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page-enter">
      {/* Hero Banner with Geometric/Architectural Blueprint */}
      <section className="bg-navy-950 pt-32 pb-20 md:pt-44 md:pb-28 relative overflow-hidden">
        {/* Subtle geometric/architectural lines representing research and precision */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none select-none">
          <svg className="w-full h-full" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80 H1440 M0 200 H1440 M0 320 H1440" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
            <path d="M160 0 V400 M480 0 V400 M800 0 V400 M1120 0 V400 M1280 0 V400" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
            
            <circle cx="1200" cy="200" r="150" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
            <circle cx="1200" cy="200" r="90" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
            <circle cx="1200" cy="200" r="30" stroke="white" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />
            
            <path d="M1195 200h10M1200 195v10" stroke="white" strokeWidth="1" />
            
            <line x1="900" y1="50" x2="1350" y2="350" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="900" y1="350" x2="1350" y2="50" stroke="white" strokeWidth="1.5" strokeOpacity="0.2" />
            
            <circle cx="1012" cy="125" r="4" fill="white" fillOpacity="0.6" />
            <circle cx="1125" cy="200" r="4" fill="white" fillOpacity="0.6" />
            <circle cx="1237" cy="275" r="4" fill="white" fillOpacity="0.6" />
          </svg>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p 
            className="text-teal-100 font-bold text-xs uppercase tracking-[0.15em] mb-4 animate-fade-slide-up font-heading"
            style={{ animationDelay: '100ms' }}
          >
            What We Do
          </p>
          <h1 
            className="heading-display text-4xl md:text-5xl lg:text-7xl text-white font-extrabold mb-6 font-heading animate-fade-slide-up leading-tight"
            style={{ animationDelay: '250ms' }}
          >
            Our Capabilities
          </h1>
          <p 
            className="text-white/80 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto animate-fade-slide-up font-normal"
            style={{ animationDelay: '400ms' }}
          >
            Structured development advisory spanning rigorous research, program evaluation, labor rights, and capacity building.
          </p>
        </div>
      </section>

      {/* Services Tabs / Detail Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* McKinsey-Style Tab Navigation */}
          <ScrollReveal>
            <div className="border-b border-gray-200 mb-16 overflow-x-auto scrollbar-none">
              <div className="flex min-w-max md:min-w-0 md:justify-center gap-1 md:gap-4 pb-[1px]">
                {servicesData.map((service, index) => {
                  const isActive = activeTab === service.id;
                  return (
                    <button
                      key={service.id}
                      onClick={() => setActiveTab(service.id)}
                      className={`flex items-center gap-2.5 py-4 px-3 md:px-5 border-b-2 text-sm font-semibold transition-all duration-200 select-none ${
                        isActive
                          ? "border-[#0e6461] text-[#0c1b38]"
                          : "border-transparent text-gray-500 hover:text-[#0c1b38] hover:border-gray-300"
                      }`}
                    >
                      <span className={`text-[10px] font-mono tracking-widest ${isActive ? "text-[#0e6461]" : "text-gray-400"}`}>
                        0{index + 1}
                      </span>
                      <span>{service.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Active Tab Content (Dynamic Alternating Layouts) */}
          <ScrollReveal key={activeTab}>
            <div className="bg-white">
              {renderActiveServiceDetails(activeTab)}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
