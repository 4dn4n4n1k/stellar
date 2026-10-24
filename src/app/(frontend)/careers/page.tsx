import type { Metadata } from "next";
import { getPayload } from "payload";
import configPromise from "@/payload.config";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Users, Briefcase, FileText, MapPin, Calendar, ArrowRight } from "lucide-react";

// Revalidate page cache every 60 seconds (ISR)
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Stellar Associates — explore current opportunities and become part of our expert network.",
};

export type FormattedJobOpening = {
  id: string | number;
  title: string;
  employmentType: string;
  location?: string | null;
  applicationDeadline?: string | null;
  deadlineFormatted?: string | null;
  description: string;
  applicationInstructions?: string | null;
  displayOrder?: number | null;
  createdAt?: string;
};

function formatDeadline(dateStr?: string | null): string | null {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  } catch {
    // fallback
  }
  return dateStr;
}

function getEmploymentTypeBadgeStyle(type: string) {
  switch (type.toLowerCase()) {
    case "contract":
      return "bg-[#eff8ff] text-[#175cd3] border-[#b2ddff]";
    case "part-time":
      return "bg-[#fef6ee] text-[#b54708] border-[#fecdca]";
    case "internship":
      return "bg-[#ecfdf3] text-[#027a48] border-[#a6f4c5]";
    case "full-time":
    case "consultancy":
    default:
      return "bg-[#ecfdf3] text-[#027a48] border-[#a6f4c5]";
  }
}

export default async function CareersPage() {
  let jobOpenings: FormattedJobOpening[] = [];

  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: "job-openings",
      where: {
        _status: {
          equals: "published",
        },
      },
      depth: 0,
      sort: ["displayOrder", "createdAt"],
      limit: 50,
    });

    jobOpenings = res.docs.map((doc) => ({
      id: doc.id,
      title: doc.title,
      employmentType: doc.employmentType || "Consultancy",
      location: doc.location || null,
      applicationDeadline: doc.applicationDeadline || null,
      deadlineFormatted: formatDeadline(doc.applicationDeadline),
      description: doc.description,
      applicationInstructions: doc.applicationInstructions || null,
      displayOrder: typeof doc.displayOrder === "number" ? doc.displayOrder : null,
      createdAt: doc.createdAt,
    }));

    // Deterministic in-memory sort on displayOrder (lower first), fallback to createdAt
    jobOpenings.sort((a, b) => {
      const orderA = typeof a.displayOrder === "number" && !isNaN(a.displayOrder) ? a.displayOrder : 99999;
      const orderB = typeof b.displayOrder === "number" && !isNaN(b.displayOrder) ? b.displayOrder : 99999;
      if (orderA !== orderB) return orderA - orderB;
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeA - timeB;
    });
  } catch (error) {
    // Graceful error logging on server; never leak database or secret details to client
    console.error("Failed to load job openings from Payload CMS:", error);
  }

  return (
    <div className="page-enter">
      {/* Hero Banner */}
      <section className="bg-navy-950 pt-28 pb-14 md:pt-32 md:pb-18 relative overflow-hidden">
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
          <h1
            className="heading-display text-4xl md:text-5xl lg:text-6xl text-white font-extrabold mb-6 font-heading animate-fade-slide-up"
            style={{ animationDelay: '100ms' }}
          >
            Careers
          </h1>
          <p
            className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto animate-fade-slide-up"
            style={{ animationDelay: '400ms' }}
          >
            Be part of a dynamic team shaping the future of development
            practice in Bangladesh.
          </p>
        </div>
      </section>

      {/* Join Our Network */}
      <section className="pt-10 pb-12 md:pt-12 md:pb-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-12">
              <div className="w-12 h-12 rounded-full bg-navy-900 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Users className="text-teal-100" size={20} strokeWidth={2} />
              </div>
              <h2 className="heading-section text-2xl md:text-3xl text-gray-900 font-extrabold mb-3 font-heading">
                Join Our Expert Network
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
                Stellar Associates maintains a roster of qualified professionals across multiple development sectors.<br className="hidden md:inline" />
                We regularly engage short-term and long-term consultants for research, evaluation,<br className="hidden md:inline" />
                training, and advisory assignments.
              </p>
            </div>
          </ScrollReveal>

          {/* What we look for */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Briefcase,
                title: "Sector Experts",
                desc: "Professionals with deep expertise in governance, labor rights, gender, education, or humanitarian sectors.",
              },
              {
                icon: FileText,
                title: "Researchers & Analysts",
                desc: "Experienced researchers, data analysts, and MEL specialists with strong analytical and writing skills.",
              },
              {
                icon: Users,
                title: "Trainers & Facilitators",
                desc: "Skilled facilitators and training designers who can deliver high-quality capacity building programs.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 60}>
                <div className="bg-gray-50 border border-gray-200 rounded-[10px] p-6 text-center card-hover-teal h-full shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-navy-900 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <item.icon className="text-teal-100" size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-navy-900 font-bold text-lg mb-2 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Current Opportunities */}
      <section className="pt-10 pb-16 md:pt-12 md:pb-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Current Opportunities"
            subtitle="Open positions and consultancy assignments."
          />

          {jobOpenings.length === 0 ? (
            /* Safe Fallback: Verified No Current Openings Card */
            <ScrollReveal>
              <div className="bg-gray-25 border border-gray-200 rounded-[10px] p-6 sm:p-8 text-center shadow-xs max-w-xl mx-auto">
                <div className="w-12 h-12 rounded-full bg-navy-900/5 flex items-center justify-center mx-auto mb-3">
                  <Briefcase className="text-navy-900/30" size={22} strokeWidth={1.5} />
                </div>
                <h3 className="text-navy-900 font-bold text-lg mb-2 font-heading">
                  No Current Openings
                </h3>
                <p className="text-gray-500 text-sm sm:text-base mb-3 max-w-md mx-auto">
                  We don&apos;t have any active vacancies at the moment, but we&apos;re always
                  looking for talented professionals to join our network.
                </p>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Please submit your CV to be considered for future opportunities.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            /* Published Job Openings List */
            <div className="space-y-6 max-w-4xl mx-auto">
              {jobOpenings.map((job, i) => (
                <ScrollReveal key={job.id || i} delay={i * 80}>
                  <div className="bg-white border border-gray-200/90 rounded-[20px] p-6 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all duration-200 hover:shadow-md">
                    {/* Top Row: Title, Metadata Tags, and Apply Button */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl sm:text-2xl font-bold font-heading text-navy-950 tracking-tight mb-2.5">
                          {job.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                          {/* Employment Type Badge with Briefcase */}
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs font-semibold border ${getEmploymentTypeBadgeStyle(
                              job.employmentType
                            )}`}
                          >
                            <Briefcase size={13} strokeWidth={2} className="shrink-0" />
                            <span>{job.employmentType}</span>
                          </span>

                          {/* Location Tag (clean icon + text, no background box) */}
                          {job.location && (
                            <span className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-gray-600">
                              <MapPin size={14} className="text-gray-500 shrink-0" strokeWidth={1.8} />
                              <span>{job.location}</span>
                            </span>
                          )}

                          {/* Deadline Tag (with light gray background pill) */}
                          {job.deadlineFormatted && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs text-gray-600 bg-[#f2f4f7] border border-gray-200/40">
                              <Calendar size={13} className="text-gray-600 shrink-0" strokeWidth={1.8} />
                              <span>
                                Deadline: <strong className="font-bold text-gray-900">{job.deadlineFormatted}</strong>
                              </span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Apply Now Button */}
                      <div className="shrink-0 pt-0.5">
                        <a
                          href={`mailto:stellarassociatesbd@gmail.com?subject=${encodeURIComponent(
                            `Application: ${job.title}`
                          )}`}
                          className="inline-flex items-center justify-center gap-1.5 bg-[#fce057] hover:bg-[#ebd04e] text-[#0c1b38] font-bold text-sm h-10 px-5 rounded-[8px] shadow-xs hover:shadow-sm transition-all duration-200 hover:translate-y-[-1px] shrink-0 whitespace-nowrap"
                        >
                          <span>Apply Now</span>
                          <ArrowRight size={15} strokeWidth={2.5} />
                        </a>
                      </div>
                    </div>

                    {/* Description Narrative */}
                    <div className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line my-4">
                      {job.description}
                    </div>

                    {/* How to Apply Box */}
                    {job.applicationInstructions && (
                      <div className="bg-[#f0f7f6] border border-[#dcebe8] rounded-[18px] sm:rounded-[20px] p-5 sm:p-6">
                        <div className="flex items-start gap-2.5">
                          <FileText size={18} className="text-[#0e6461] shrink-0 mt-0.5" strokeWidth={2} />
                          <div className="space-y-1.5">
                            <span className="block font-bold text-xs uppercase tracking-[0.1em] text-[#0e6461] leading-tight">
                              HOW TO APPLY
                            </span>
                            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                              {job.applicationInstructions}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
