import type { Metadata } from "next";
import { expertiseAreas } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Landmark,
  Scale,
  HardHat,
  HeartHandshake,
  UsersRound,
  GraduationCap,
  Globe,
  Briefcase,
  Megaphone,
  Vote,
  Heart,
  Accessibility,
  TreePine,
  Radio,
  BookOpen,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Landmark,
  Scale,
  HardHat,
  HeartHandshake,
  UsersRound,
  GraduationCap,
  Globe,
  Briefcase,
  Megaphone,
  Vote,
  Heart,
  Accessibility,
  TreePine,
  Radio,
  BookOpen,
};

export const metadata: Metadata = {
  title: "Areas of Expertise",
  description:
    "Explore Stellar Associates' 15 areas of expertise spanning democracy, governance, labor rights, humanitarian assistance, and more.",
};

export default function ExpertisePage() {
  // Mapping index references of the 15 items in data.ts with highly punchy, condensed text
  const democracyGovernance = {
    ...expertiseAreas[0],
    desc: "We strengthen democratic institutions and civil society capacity, enhancing accountability, public administration, and governance systems to align with international standards."
  };
  const politicalElectoral = {
    ...expertiseAreas[9],
    desc: "We provide voter education, political party support, and election observation methodologies to strengthen credible, inclusive democratic transitions."
  };
  const mediaCommunications = {
    ...expertiseAreas[8],
    desc: "We design strategic communication campaigns, build journalist capacity, and leverage digital platforms to promote transparent public discourse."
  };
  const publicPolicyReform = {
    title: "Public Policy & Institutional Reform",
    icon: "Scale",
    desc: "We provide advisory services on policy drafting, regulatory frameworks, and public sector reforms to enhance institutional capacity and service delivery."
  };

  const humanRightsCivic = {
    ...expertiseAreas[1],
    desc: "We advance rights protection and civic participation through evidence-based advocacy, community mobilization, and dialogues that amplify marginalized voices."
  };
  const youthGender = {
    ...expertiseAreas[4],
    desc: "We integrate gender equality and youth leadership programs into development sectors, ensuring meaningful participation in governance and economic life."
  };
  const disabilityInclusion = {
    ...expertiseAreas[11],
    desc: "We conduct accessibility assessments and build program frameworks to integrate persons with disabilities as active participants and beneficiaries."
  };
  const mediaAdvocacy = {
    ...expertiseAreas[13],
    desc: "We build coalition networks and design targeted advocacy campaigns to influence public policy and drive sustainable social transformation."
  };

  const laborRightsCompliance = {
    ...expertiseAreas[2],
    desc: "We audit and improve workplace standards, occupational safety, and social compliance across global supply chains, specializing in Bangladesh's garment sector."
  };
  const workerWellbeing = {
    ...expertiseAreas[10],
    desc: "We implement holistic worker wellness programs covering health, financial literacy, and social protection to improve overall quality of life."
  };
  const privateSectorEngagement = {
    ...expertiseAreas[7],
    desc: "We connect business interests with social impact goals, designing public-private partnerships that drive sustainable corporate and development outcomes."
  };
  const csr = {
    ...expertiseAreas[12],
    desc: "We design CSR strategies, materiality assessments, and impact reporting systems aligned with global standards like GRI and the SDGs."
  };

  const educationLivelihoodsGrad = {
    ...expertiseAreas[5],
    desc: "We design skills development and vocational training programs that directly link learning outcomes with market demand and employment opportunities."
  };
  const vocationalPathways = {
    title: "Vocational Pathways & Apprenticeships",
    icon: "BookOpen",
    desc: "We design skills development and apprenticeship programs that bridge the gap between formal learning and economic self-sufficiency."
  };
  const financialInclusion = {
    title: "Financial Inclusion & Market Systems",
    icon: "Briefcase",
    desc: "We conduct market systems analysis and design financial literacy and inclusion strategies for youth, women, and vulnerable groups."
  };
  const digitalCitizenship = {
    ...expertiseAreas[6],
    desc: "We build digital literacy, safety curricula, and inclusive online security frameworks to protect user rights in a rapidly expanding digital landscape."
  };

  const humanitarianAssistance = {
    ...expertiseAreas[3],
    desc: "We deliver rapid crisis response, disaster risk reduction, and recovery planning, ensuring all interventions align with global humanitarian standards."
  };

  return (
    <div className="page-enter">
      {/* Hero Banner with Geometric SVG overlay */}
      <section className="bg-navy-950 pt-28 pb-14 md:pt-32 md:pb-18 relative overflow-hidden">

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p 
            className="text-teal-100 font-bold text-xs uppercase tracking-[0.15em] mb-4 animate-fade-slide-up font-heading"
            style={{ animationDelay: '100ms' }}
          >
            Our Expertise
          </p>
          <h1 
            className="heading-display text-4xl md:text-5xl lg:text-7xl text-white font-extrabold mb-6 font-heading animate-fade-slide-up leading-tight"
            style={{ animationDelay: '250ms' }}
          >
            Areas of Expertise
          </h1>
          <p 
            className="text-white/80 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto animate-fade-slide-up font-normal"
            style={{ animationDelay: '400ms' }}
          >
            Deep technical and advisory capability across 15 specialized development sectors, structured to drive sustainable, systemic change.
          </p>
        </div>
      </section>

      {/* Editorial Introduction Section */}
      <section className="bg-white pt-8 pb-8 border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-base leading-relaxed font-medium">
            Stellar Associates operates at the intersection of institutional reform, social equity, and compliant supply chains. Our team partners with governments, bilateral donors, and industry coalitions, delivering specialized insights grouped across five core pillars.
          </p>
        </div>
      </section>

      {/* Cluster 1: Governance & Institutions */}
      <section className="pt-10 pb-20 md:pt-14 md:pb-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-[#0e6461] font-mono text-xs uppercase tracking-widest block mb-2">01 / PUBLIC SYSTEM INTEGRITY</span>
            <h2 className="heading-section text-3xl md:text-4xl text-[#0c1b38] font-extrabold font-heading">Governance & Institutions</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Flagship Highlight Area */}
            <div className="lg:col-span-5">
              <ScrollReveal>
                <div className="bg-gray-50 border border-gray-200 rounded-[12px] p-8 md:p-10 relative">
                  <div className="w-12 h-12 rounded-[6px] bg-[#0c1b38] flex items-center justify-center mb-6 shadow-sm">
                    <Landmark className="text-teal-100" size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#0c1b38] font-heading mb-4">
                    {democracyGovernance.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {democracyGovernance.desc}
                  </p>
                  <blockquote className="border-l-2 border-[#0e6461] pl-4 py-1 text-xs italic text-gray-500 font-medium">
                    "Participatory policy-making and accountability frameworks form the bedrock of robust state systems."
                  </blockquote>
                </div>
              </ScrollReveal>
            </div>

            {/* Supporting Areas */}
            <div className="lg:col-span-7 lg:pl-6 space-y-6">
              <h4 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider mb-2 font-semibold">Related Capabilities</h4>
              
              <div className="space-y-6">
                {[politicalElectoral, mediaCommunications, publicPolicyReform].map((area, index) => {
                  const Icon = iconMap[area.icon] || Landmark;
                  return (
                    <ScrollReveal key={area.title} delay={index * 50}>
                      <div className="flex gap-4 items-start pb-6 border-b border-gray-150 last:border-b-0 last:pb-0">
                        <div className="w-10 h-10 rounded-[6px] bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                          <Icon className="text-[#0e6461]" size={18} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h5 className="text-lg font-bold text-[#0c1b38] font-heading mb-2">{area.title}</h5>
                          <p className="text-gray-600 text-sm leading-relaxed">{area.desc}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cluster 2: Social Development & Rights */}
      <section className="py-20 md:py-28 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-[#0e6461] font-mono text-xs uppercase tracking-widest block mb-2">02 / EQUITABLE INCLUSION</span>
            <h2 className="heading-section text-3xl md:text-4xl text-[#0c1b38] font-extrabold font-heading">Social Development & Rights</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Supporting Areas First for Layout Alteration */}
            <div className="lg:col-span-7 lg:pr-6 space-y-6 order-2 lg:order-1">
              <h4 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider mb-2 font-heading font-semibold">Empowerment Systems</h4>
              
              <div className="space-y-6">
                {[youthGender, disabilityInclusion, mediaAdvocacy].map((area, index) => {
                  const Icon = iconMap[area.icon] || Scale;
                  return (
                    <ScrollReveal key={area.title} delay={index * 50}>
                      <div className="flex gap-4 items-start pb-6 border-b border-gray-150 last:border-b-0 last:pb-0">
                        <div className="w-10 h-10 rounded-[6px] bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                          <Icon className="text-[#0e6461]" size={18} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h5 className="text-lg font-bold text-[#0c1b38] font-heading mb-2">{area.title}</h5>
                          <p className="text-gray-600 text-sm leading-relaxed">{area.desc}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>

            {/* Flagship Highlight Area */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <ScrollReveal>
                <div className="bg-white border border-gray-200 rounded-[12px] p-8 md:p-10 relative">
                  <div className="w-12 h-12 rounded-[6px] bg-[#0c1b38] flex items-center justify-center mb-6 shadow-sm">
                    <Scale className="text-teal-100" size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#0c1b38] font-heading mb-4">
                    {humanRightsCivic.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {humanRightsCivic.desc}
                  </p>
                  <blockquote className="border-l-2 border-[#0e6461] pl-4 py-1 text-xs italic text-gray-500 font-medium">
                    "Advancing human rights requires embedding accountability structures at both grassroots and institutional levels."
                  </blockquote>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Cluster 3: Economic & Labor Systems */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-[#0e6461] font-mono text-xs uppercase tracking-widest block mb-2">03 / GLOBAL COMPLIANCE & ESG</span>
            <h2 className="heading-section text-3xl md:text-4xl text-[#0c1b38] font-extrabold font-heading">Economic & Labor Systems</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Flagship Highlight Area */}
            <div className="lg:col-span-5">
              <ScrollReveal>
                <div className="bg-gray-50 border border-gray-200 rounded-[12px] p-8 md:p-10 relative">
                  <div className="w-12 h-12 rounded-[6px] bg-[#0c1b38] flex items-center justify-center mb-6 shadow-sm">
                    <HardHat className="text-teal-100" size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#0c1b38] font-heading mb-4">
                    {laborRightsCompliance.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {laborRightsCompliance.desc}
                  </p>
                  <blockquote className="border-l-2 border-[#0e6461] pl-4 py-1 text-xs italic text-gray-500 font-medium">
                    "Workplace compliance and worker rights are pivotal drivers of ethical business growth in globally integrated supply chains."
                  </blockquote>
                </div>
              </ScrollReveal>
            </div>

            {/* Supporting Areas */}
            <div className="lg:col-span-7 lg:pl-6 space-y-6">
              <h4 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider mb-2 font-heading font-semibold">Value Chain & Welfare</h4>
              
              <div className="space-y-6">
                {[workerWellbeing, privateSectorEngagement, csr].map((area, index) => {
                  const Icon = iconMap[area.icon] || HardHat;
                  return (
                    <ScrollReveal key={area.title} delay={index * 50}>
                      <div className="flex gap-4 items-start pb-6 border-b border-gray-150 last:border-b-0 last:pb-0">
                        <div className="w-10 h-10 rounded-[6px] bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                          <Icon className="text-[#0e6461]" size={18} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h5 className="text-lg font-bold text-[#0c1b38] font-heading mb-2">{area.title}</h5>
                          <p className="text-gray-600 text-sm leading-relaxed">{area.desc}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cluster 4: Education, Skills & Innovation */}
      <section className="py-20 md:py-28 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-[#0e6461] font-mono text-xs uppercase tracking-widest block mb-2">04 / KNOWLEDGE & DIGITAL LITERACY</span>
            <h2 className="heading-section text-3xl md:text-4xl text-[#0c1b38] font-extrabold font-heading">Education, Skills & Innovation</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Supporting Areas First for Layout Alteration */}
            <div className="lg:col-span-7 lg:pr-6 space-y-6 order-2 lg:order-1">
              <h4 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider mb-2 font-heading font-semibold">Empowerment Systems</h4>
              
              <div className="space-y-6">
                {[vocationalPathways, financialInclusion, digitalCitizenship].map((area, index) => {
                  const Icon = iconMap[area.icon] || Globe;
                  return (
                    <ScrollReveal key={area.title} delay={index * 50}>
                      <div className="flex gap-4 items-start pb-6 border-b border-gray-150 last:border-b-0 last:pb-0">
                        <div className="w-10 h-10 rounded-[6px] bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                          <Icon className="text-[#0e6461]" size={18} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h5 className="text-lg font-bold text-[#0c1b38] font-heading mb-2">{area.title}</h5>
                          <p className="text-gray-600 text-sm leading-relaxed">{area.desc}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>

            {/* Flagship Highlight Area */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <ScrollReveal>
                <div className="bg-white border border-gray-200 rounded-[12px] p-8 md:p-10 relative">
                  <div className="w-12 h-12 rounded-[6px] bg-[#0c1b38] flex items-center justify-center mb-6 shadow-sm">
                    <GraduationCap className="text-teal-100" size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#0c1b38] font-heading mb-4">
                    {educationLivelihoodsGrad.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {educationLivelihoodsGrad.desc}
                  </p>
                  <blockquote className="border-l-2 border-[#0e6461] pl-4 py-1 text-xs italic text-gray-500 font-medium">
                    "Education and livelihood systems must bridge the gap between formal learning outcomes and market-driven skills development."
                  </blockquote>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Cluster 5: Humanitarian & Resilience */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-[#0e6461] font-mono text-xs uppercase tracking-widest block mb-2">05 / RISK REDUCTION & RESPONSE</span>
            <h2 className="heading-section text-3xl md:text-4xl text-[#0c1b38] font-extrabold font-heading">Humanitarian & Resilience</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Flagship Highlight Area */}
            <div className="lg:col-span-5">
              <ScrollReveal>
                <div className="bg-gray-50 border border-gray-200 rounded-[12px] p-8 md:p-10 relative">
                  <div className="w-12 h-12 rounded-[6px] bg-[#0c1b38] flex items-center justify-center mb-6 shadow-sm">
                    <HeartHandshake className="text-teal-100" size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#0c1b38] font-heading mb-4">
                    {humanitarianAssistance.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {humanitarianAssistance.desc}
                  </p>
                  <blockquote className="border-l-2 border-[#0e6461] pl-4 py-1 text-xs italic text-gray-500 font-medium">
                    "Emergency responses must be timely, inclusive, and strictly aligned with international humanitarian standards."
                  </blockquote>
                </div>
              </ScrollReveal>
            </div>

            {/* Supporting Areas */}
            <div className="lg:col-span-7 lg:pl-6 space-y-6">
              <h4 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider mb-2 font-heading">Action Areas</h4>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Disaster Risk Reduction",
                    desc: "Strengthening community-level resilience, early warning networks, and localized vulnerability mapping to mitigate disaster impact."
                  },
                  {
                    title: "Crisis Coordination Setup",
                    desc: "Establishing integrated coordination frameworks and rapid-response operations between local partners, government agencies, and bilateral donors."
                  },
                  {
                    title: "Humanitarian Principles Audit",
                    desc: "Ensuring emergency response actions adhere strictly to global humanitarian principles, protection mainstreaming, and localization mandates."
                  }
                ].map((area, index) => {
                  return (
                    <ScrollReveal key={area.title} delay={index * 50}>
                      <div className="flex gap-4 items-start pb-6 border-b border-gray-150 last:border-b-0 last:pb-0">
                        <div className="w-10 h-10 rounded-[6px] bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                          <HeartHandshake className="text-[#0e6461]" size={18} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h5 className="text-lg font-bold text-[#0c1b38] font-heading mb-2">{area.title}</h5>
                          <p className="text-gray-600 text-sm leading-relaxed">{area.desc}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
