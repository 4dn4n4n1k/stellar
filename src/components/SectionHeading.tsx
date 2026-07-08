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
    <ScrollReveal className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}>
      {kicker && (
        <span
          className={`block text-xs md:text-sm font-bold tracking-[0.15em] uppercase mb-3 ${
            light ? "text-teal-100" : "text-teal-700"
          }`}
        >
          {kicker}
        </span>
      )}
      <h2
        className={`heading-section text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 ${
          light ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base md:text-lg max-w-2xl leading-relaxed ${centered ? "mx-auto" : ""} ${
            light ? "text-white/70" : "text-gray-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
