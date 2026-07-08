import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <ScrollReveal className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}>
      <h2
        className={`heading-section text-3xl md:text-4xl lg:text-5xl mb-4 ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg max-w-2xl ${centered ? "mx-auto" : ""} ${
            light ? "text-white/70" : "text-warm-grey"
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-gold to-gold-light ${
          centered ? "mx-auto" : ""
        }`}
      />
    </ScrollReveal>
  );
}
