import type { Metadata } from "next";
import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { teamMembers as staticTeamMembers } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

// Revalidate page cache every 60 seconds (ISR)
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the leadership team and associate experts at Stellar Associates — experienced development professionals driving impact.",
};

export type FormattedTeamMember = {
  id?: string | number;
  name: string;
  title: string;
  bio: string;
  expertise: string[];
  imageUrl?: string | null;
  imageAlt?: string | null;
  displayOrder?: number | null;
  createdAt?: string;
};

export type FormattedAssociateExpert = {
  id?: string | number;
  title: string;
  expertise: string;
  imageUrl?: string | null;
  imageAlt?: string | null;
  displayOrder?: number | null;
  createdAt?: string;
};

export default async function TeamPage() {
  let cmsTeamMembers: FormattedTeamMember[] = [];
  let cmsAssociateExperts: FormattedAssociateExpert[] = [];

  try {
    const payload = await getPayload({ config: configPromise });

    const [teamMembersRes, associateExpertsRes] = await Promise.all([
      payload.find({
        collection: "team-members",
        where: {
          _status: {
            equals: "published",
          },
        },
        depth: 1,
        sort: ["displayOrder", "createdAt"],
        limit: 100,
      }),
      payload.find({
        collection: "associate-experts",
        where: {
          _status: {
            equals: "published",
          },
        },
        depth: 1,
        sort: ["displayOrder", "createdAt"],
        limit: 100,
      }),
    ]);

    cmsTeamMembers = teamMembersRes.docs.map((doc) => {
      const media =
        doc.profileImage && typeof doc.profileImage === "object"
          ? (doc.profileImage as { url?: string; alt?: string })
          : null;

      const expertiseList = Array.isArray(doc.expertise)
        ? doc.expertise
            .map((item) => {
              if (typeof item === "string") return item;
              if (typeof item === "object" && item && "value" in item) {
                return String((item as { value: string }).value);
              }
              return "";
            })
            .filter(Boolean)
        : [];

      return {
        id: doc.id,
        name: doc.name,
        title: doc.title,
        bio: doc.bio,
        expertise: expertiseList,
        imageUrl: media?.url || null,
        imageAlt: media?.alt || doc.name,
        displayOrder: typeof doc.displayOrder === "number" ? doc.displayOrder : null,
        createdAt: doc.createdAt,
      };
    });

    // Deterministic displayOrder sort with stable fallback to createdAt
    cmsTeamMembers.sort((a, b) => {
      const orderA = typeof a.displayOrder === "number" && !isNaN(a.displayOrder) ? a.displayOrder : 99999;
      const orderB = typeof b.displayOrder === "number" && !isNaN(b.displayOrder) ? b.displayOrder : 99999;
      if (orderA !== orderB) return orderA - orderB;
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeA - timeB;
    });

    cmsAssociateExperts = associateExpertsRes.docs.map((doc) => {
      const media =
        doc.profileImage && typeof doc.profileImage === "object"
          ? (doc.profileImage as { url?: string; alt?: string })
          : null;

      return {
        id: doc.id,
        title: doc.title,
        expertise: doc.expertise,
        imageUrl: media?.url || null,
        imageAlt: media?.alt || doc.title,
        displayOrder: typeof doc.displayOrder === "number" ? doc.displayOrder : null,
        createdAt: doc.createdAt,
      };
    });

    // Deterministic displayOrder sort with stable fallback to createdAt
    cmsAssociateExperts.sort((a, b) => {
      const orderA = typeof a.displayOrder === "number" && !isNaN(a.displayOrder) ? a.displayOrder : 99999;
      const orderB = typeof b.displayOrder === "number" && !isNaN(b.displayOrder) ? b.displayOrder : 99999;
      if (orderA !== orderB) return orderA - orderB;
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeA - timeB;
    });
  } catch (error) {
    // Graceful error logging on server; never leak database or secret details to client
    console.error("Failed to load team data from Payload CMS:", error);
  }

  // Gracefully fall back to verified static data if CMS has no published team members
  const displayTeamMembers: FormattedTeamMember[] =
    cmsTeamMembers.length > 0
      ? cmsTeamMembers
      : staticTeamMembers.map((member, i) => ({
          id: `static-tm-${i}`,
          name: member.name,
          title: member.title,
          bio: member.bio,
          expertise: member.expertise,
          imageUrl: null,
          imageAlt: null,
        }));

  return (
    <div className="page-enter">
      {/* Hero Banner */}
      <section className="bg-navy-950 pt-28 pb-14 md:pt-32 md:pb-18 relative overflow-hidden">
        {/* Brand Pattern Background */}
        <svg
          className="absolute -top-20 -right-20 w-[40%] h-[60%] opacity-15 pointer-events-none"
          viewBox="0 0 400 400"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="400" cy="0" r="100" stroke="white" strokeWidth="1" />
          <circle cx="400" cy="0" r="200" stroke="white" strokeWidth="1" />
          <circle cx="400" cy="0" r="300" stroke="white" strokeWidth="1" />
        </svg>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p 
            className="text-teal-100 font-bold text-xs uppercase tracking-[0.15em] mb-3 animate-fade-slide-up"
            style={{ animationDelay: '100ms' }}
          >
            Our People
          </p>
          <h1 
            className="heading-display text-4xl md:text-5xl lg:text-6xl text-white font-extrabold mb-6 font-heading animate-fade-slide-up"
            style={{ animationDelay: '250ms' }}
          >
            Our Team
          </h1>
          <p 
            className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto animate-fade-slide-up"
            style={{ animationDelay: '400ms' }}
          >
            A multidisciplinary team of experienced professionals with deep
            expertise across governance, research, labor rights, and inclusive
            development.
          </p>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="pt-10 pb-16 md:pt-12 md:pb-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-wrap justify-center gap-8">
            {displayTeamMembers.map((member, i) => (
              <ScrollReveal
                key={member.id || i}
                delay={i * 80}
                className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] shrink-0 flex flex-col"
              >
                <div className="bg-gray-50 border border-gray-200 rounded-[10px] p-6 sm:p-8 text-center card-hover-teal h-full shadow-xs flex flex-col justify-between">
                  <div>
                    {/* Headshot Photo / Avatar Placeholder */}
                    <div className="w-20 h-20 bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-teal-700/10 overflow-hidden">
                      {member.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={member.imageUrl}
                          alt={member.imageAlt || member.name}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      ) : (
                        <User className="text-teal-100" size={32} strokeWidth={1.5} />
                      )}
                    </div>

                    <h3 className="text-navy-900 font-bold text-xl mb-1 font-heading">
                      {member.name}
                    </h3>
                    <p className="text-teal-700 text-sm font-bold mb-4">
                      {member.title}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {member.bio}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.map((exp) => (
                      <Badge
                        key={exp}
                        variant="secondary"
                        className="bg-navy-900/5 text-navy-900 border border-navy-900/10 text-xs font-semibold shadow-none"
                      >
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Associate Experts - Only displayed when records exist in CMS */}
      {cmsAssociateExperts.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-200">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              kicker="Associates"
              title="Associate Experts"
              subtitle="Specialized consultants available for project-specific engagement."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cmsAssociateExperts.map((expert, i) => (
                <ScrollReveal key={expert.id || i} delay={i * 60}>
                  <div className="bg-gray-25 border border-gray-200 rounded-[10px] p-6 card-hover-teal h-full flex items-center gap-4 shadow-xs">
                    <div className="w-12 h-12 rounded-full bg-navy-900/5 border border-navy-900/10 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                      {expert.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={expert.imageUrl}
                          alt={expert.imageAlt || expert.title}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      ) : (
                        <User className="text-navy-900/40" size={20} strokeWidth={1.5} />
                      )}
                    </div>
                    <div>
                      <h4 className="text-navy-900 font-bold text-base font-heading">
                        {expert.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {expert.expertise}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
