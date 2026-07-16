import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] md:min-h-screen md:py-0 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 transform-gpu pointer-events-none select-none">
        <picture className="block w-full h-full">
          <source media="(min-width: 1025px)" srcSet="/hero-desktop.webp" />
          <source media="(min-width: 768px)" srcSet="/hero-tablet.webp" />
          <img
            src="/hero-mobile.webp"
            alt="Stellar Associates research and consulting hero background"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
          />
        </picture>
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(105deg, rgba(5,15,35,0.55) 0%, rgba(5,15,35,0.35) 55%, rgba(5,15,35,0.0) 100%)",
        }}
      />
      {/* Removing extra desktop overlay to keep it bright */}

      {/* Desktop / Tablet Hero Content */}
      <div className="relative z-10 hidden md:block max-w-[680px] lg:max-w-[900px] mx-auto px-4 text-center md:mt-4">
        <h1 className="heading-display text-[32px] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 tracking-tight text-white drop-shadow-lg leading-tight text-center">
          <span className="block sm:inline-block animate-fade-slide-up mr-0 sm:mr-5" style={{ animationDelay: "50ms" }}>Evidence. Insight.</span>
          <span className="block sm:inline-block animate-fade-slide-up mt-2 sm:mt-0" style={{ animationDelay: "180ms" }}>Impact.</span>
        </h1>

        <p className="text-white/85 text-base md:text-lg max-w-4xl mx-auto mb-8 leading-relaxed drop-shadow-md animate-fade-slide-up" style={{ animationDelay: "260ms" }}>
          Supporting governments, donors, civil society, and private sector partners through research,
          <br className="hidden md:inline" /> evaluation, governance, and strategic advisory services.
        </p>

        <div className="flex flex-col sm:flex-row gap-[18px] justify-center items-center animate-fade-slide-up font-heading w-full max-w-md mx-auto sm:max-w-none" style={{ animationDelay: "340ms" }}>
          <Link
            href="/about"
            className="inline-flex items-center justify-center w-full sm:w-auto h-12 lg:h-[46px] px-[28px] text-[15px] font-semibold rounded-[10px] bg-transparent text-white border border-[rgba(255,255,255,0.28)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.55)] hover:translate-y-[-2px] transition-all duration-[220ms] ease-in-out"
          >
            About Us
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center w-full sm:w-auto h-12 lg:h-[46px] px-[28px] text-[15px] font-semibold rounded-[10px] bg-[#fce057] hover:bg-[#ebd046] text-[#0c1b38] border-0 hover:translate-y-[-2px] transition-all duration-[220ms] ease-in-out"
          >
            Our Services
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center w-full sm:w-auto h-12 lg:h-[46px] px-[28px] text-[15px] font-semibold rounded-[10px] bg-transparent text-white border border-[rgba(255,255,255,0.28)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.55)] hover:translate-y-[-2px] transition-all duration-[220ms] ease-in-out"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Mobile Hero Content (≤767px) */}
      <div className="relative z-10 flex md:hidden flex-col items-start justify-center w-full px-6 max-w-[420px]">
        <h1
          className="heading-display font-black text-white leading-[1.0] mb-6 animate-fade-slide-up"
          style={{ fontSize: "clamp(44px, 13vw, 56px)", animationDelay: "40ms" }}
        >
          <span className="block">
            Evidence.
          </span>
          <span className="block" style={{ animationDelay: "140ms" }}>
            Insight.
          </span>
          <span className="block" style={{ animationDelay: "240ms" }}>
            Impact.
          </span>
        </h1>

        <p
          className="text-white/75 text-[15px] leading-[1.65] mb-8 animate-fade-slide-up max-w-[300px]"
          style={{ animationDelay: "320ms" }}
        >
          Supporting governments, donors, civil society, and private sector
          partners through research, evaluation, governance, and strategic
          advisory services.
        </p>

        <div
          className="animate-fade-slide-up"
          style={{ animationDelay: "420ms" }}
        >
          <a
            href="/stellar-profile.pdf"
            download
            className="inline-flex items-center justify-center gap-2 h-[52px] px-8 text-[15px] font-semibold rounded-full bg-[#fce057] hover:bg-[#f5d630] text-[#0c1b38] transition-all duration-[200ms] ease-in-out font-heading shadow-sm"
          >
            Download Company Profile
          </a>
        </div>
      </div>
    </section>
  );
}
