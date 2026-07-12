import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  kicker?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  kicker,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <ScrollReveal className={`mb-10 md:mb-12 ${centered ? "text-center" : ""}`}>
      {kicker && (
        <span
          className={`block text-[11px] font-bold tracking-[0.18em] uppercase mb-2.5 ${
            light ? "text-teal-100" : "text-teal-700"
          }`}
        >
          {kicker}
        </span>
      )}
      <h2
        className={`heading-section text-2xl md:text-3xl lg:text-[38px] leading-tight font-extrabold mb-3.5 ${
          light ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-sm md:text-base max-w-2xl leading-relaxed ${centered ? "mx-auto" : ""} ${
            light ? "text-white/70" : "text-gray-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
