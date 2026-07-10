import { whyStellar } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";
import { Brain, MapPin, LineChart, CheckCircle } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Brain,
  MapPin,
  LineChart,
  CheckCircle,
};

export default function WhyStellar() {
  return (
    <section className="py-8 md:py-10 bg-[#f7f8fa] relative overflow-hidden">
      
      {/* Background topographic network connection lines (below 3% opacity) */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.02] z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.2" fill="#156E67" />
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#156E67" strokeWidth="0.5" strokeDasharray="3 3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          {/* Decorative geometric connection paths */}
          <path d="M-100,200 Q200,100 500,400 T1200,100" fill="none" stroke="#156E67" strokeWidth="1.5" />
          <path d="M200,600 Q500,450 800,700 T1500,500" fill="none" stroke="#156E67" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header Block with high visual hierarchy */}
        <div className="text-center mb-10 md:mb-12 flex flex-col items-center">
          <ScrollReveal variant="up">
            <p className="text-[#156E67] font-bold text-xs uppercase tracking-[0.25em] mb-4">
              Why Stellar
            </p>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={100}>
            <h2 className="text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] lg:leading-[1.1] text-[#0C1B38] font-extrabold mb-6 font-heading tracking-tight max-w-[850px] mx-auto">
              Why Stellar Associates
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={200}>
            <p className="text-gray-500 text-[17px] leading-[1.7] max-w-[600px] mx-auto">
              What sets us apart in the development consultancy landscape.
            </p>
          </ScrollReveal>
        </div>

        {/* Premium Architectural 4-Column Grid Layout (All boxes in one line on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 items-stretch">
          
          {/* Card 1: Deep Sector Expertise */}
          <ScrollReveal delay={100} className="h-full">
            <div className="group relative bg-white border border-gray-200/50 rounded-[22px] p-6 lg:p-7 shadow-[0_15px_40px_rgba(12,27,56,0.02)] hover:shadow-[0_20px_50px_rgba(12,27,56,0.06)] hover:-translate-y-1.5 hover:border-[#156E67]/30 transition-all duration-300 ease-out flex flex-col justify-between h-full overflow-hidden">
              {/* Decorative governance network SVG in bottom right */}
              <div className="absolute bottom-4 right-4 w-[160px] h-[160px] opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-105 transition-all duration-500 pointer-events-none select-none">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-[#156E67]" strokeWidth="0.8">
                  <circle cx="50" cy="50" r="40" />
                  <circle cx="50" cy="50" r="25" strokeDasharray="2 2" />
                  <circle cx="50" cy="50" r="10" />
                  <line x1="50" y1="10" x2="50" y2="90" />
                  <line x1="10" y1="50" x2="90" y2="50" />
                  <line x1="22" y1="22" x2="78" y2="78" />
                  <line x1="22" y1="78" x2="78" y2="22" />
                </svg>
              </div>

              <div>
                <div className="w-10 h-10 rounded-[10px] bg-[#156E67]/8 group-hover:bg-[#156E67]/15 flex items-center justify-center mb-4 transition-all duration-300 border border-[#156E67]/10">
                  <Brain className="text-[#156E67]" size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-[#0C1B38] font-extrabold text-xl sm:text-[22px] mb-2 font-heading tracking-tight">
                  {whyStellar[0].title}
                </h3>
                <p className="text-gray-500 text-[15px] leading-relaxed">
                  {whyStellar[0].description}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Strong Field Presence */}
          <ScrollReveal delay={200} className="h-full">
            <div className="group relative bg-white border border-gray-200/50 rounded-[22px] p-6 lg:p-7 shadow-[0_15px_40px_rgba(12,27,56,0.02)] hover:shadow-[0_20px_50px_rgba(12,27,56,0.06)] hover:-translate-y-1.5 hover:border-[#156E67]/30 transition-all duration-300 ease-out flex flex-col justify-between h-full overflow-hidden">
              {/* Decorative map coordinate SVG overlay */}
              <div className="absolute bottom-4 right-4 w-[120px] h-[120px] opacity-[0.04] group-hover:opacity-[0.08] transition-all duration-500 pointer-events-none select-none">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-[#156E67]" strokeWidth="0.8">
                  <path d="M20,80 Q50,40 80,30" />
                  <circle cx="20" cy="80" r="3" fill="#156E67" />
                  <circle cx="80" cy="30" r="3" fill="#156E67" />
                  <circle cx="50" cy="53" r="3.5" fill="#156E67" />
                  <circle cx="50" cy="53" r="9" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
                </svg>
              </div>

              <div>
                <div className="w-10 h-10 rounded-[10px] bg-[#156E67]/8 group-hover:bg-[#156E67]/15 flex items-center justify-center mb-4 transition-all duration-300 border border-[#156E67]/10">
                  <MapPin className="text-[#156E67]" size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-[#0C1B38] font-extrabold text-xl sm:text-[22px] mb-2 font-heading tracking-tight">
                  {whyStellar[1].title}
                </h3>
                <p className="text-gray-500 text-[15px] leading-relaxed">
                  {whyStellar[1].description}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: Evidence-Based Approaches */}
          <ScrollReveal delay={150} className="h-full">
            <div className="group relative bg-white border border-gray-200/50 rounded-[22px] p-6 lg:p-7 shadow-[0_15px_40px_rgba(12,27,56,0.02)] hover:shadow-[0_20px_50px_rgba(12,27,56,0.06)] hover:-translate-y-1.5 hover:border-[#156E67]/30 transition-all duration-300 ease-out flex flex-col justify-between h-full overflow-hidden">
              {/* Decorative charts graphics overlay */}
              <div className="absolute bottom-6 right-6 w-[120px] h-[80px] opacity-[0.03] group-hover:opacity-[0.06] transition-all duration-500 pointer-events-none select-none">
                <svg viewBox="0 0 120 80" fill="none" className="w-full h-full stroke-[#156E67]" strokeWidth="0.8">
                  <path d="M 0 70 L 120 70" />
                  <path d="M 10 70 L 30 40 L 55 55 L 80 20 L 110 35" />
                  <circle cx="80" cy="20" r="3" fill="#156E67" />
                  <line x1="80" y1="20" x2="80" y2="70" strokeDasharray="1 1" />
                </svg>
              </div>

              <div>
                <div className="w-10 h-10 rounded-[10px] bg-[#156E67]/8 group-hover:bg-[#156E67]/15 flex items-center justify-center mb-4 transition-all duration-300 border border-[#156E67]/10">
                  <LineChart className="text-[#156E67]" size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-[#0C1B38] font-extrabold text-xl sm:text-[22px] mb-2 font-heading tracking-tight">
                  {whyStellar[2].title}
                </h3>
                <p className="text-gray-500 text-[15px] leading-relaxed">
                  {whyStellar[2].description}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4: International Quality Standards */}
          <ScrollReveal delay={250} className="h-full">
            <div className="group relative bg-white border border-gray-200/50 rounded-[22px] p-6 lg:p-7 shadow-[0_15px_40px_rgba(12,27,56,0.02)] hover:shadow-[0_20px_50px_rgba(12,27,56,0.06)] hover:-translate-y-1.5 hover:border-[#156E67]/30 transition-all duration-300 ease-out flex flex-col justify-between h-full overflow-hidden">
              {/* Decorative document badge SVG overlay */}
              <div className="absolute bottom-4 right-4 w-[150px] h-[150px] opacity-[0.03] group-hover:opacity-[0.06] group-hover:rotate-12 transition-all duration-500 pointer-events-none select-none">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-[#156E67]" strokeWidth="0.8">
                  <rect x="25" y="15" width="50" height="70" rx="3" />
                  <line x1="35" y1="30" x2="65" y2="30" />
                  <line x1="35" y1="42" x2="65" y2="42" />
                  <line x1="35" y1="54" x2="55" y2="54" />
                  <circle cx="62" cy="65" r="8" />
                  <path d="M59,72 L55,85 L62,80 L69,85 L65,72" />
                </svg>
              </div>

              <div>
                <div className="w-10 h-10 rounded-[10px] bg-[#156E67]/8 group-hover:bg-[#156E67]/15 flex items-center justify-center mb-4 transition-all duration-300 border border-[#156E67]/10">
                  <CheckCircle className="text-[#156E67]" size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-[#0C1B38] font-extrabold text-xl sm:text-[22px] mb-2 font-heading tracking-tight">
                  {whyStellar[3].title}
                </h3>
                <p className="text-gray-500 text-[15px] leading-relaxed">
                  {whyStellar[3].description}
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>


      </div>
    </section>
  );
}
