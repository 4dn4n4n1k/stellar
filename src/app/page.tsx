import HeroSection from "@/components/home/HeroSection";
import WhoWeAre from "@/components/home/WhoWeAre";
import ExpertiseGlance from "@/components/home/ExpertiseGlance";
import ServicesSnapshot from "@/components/home/ServicesSnapshot";
import WhyStellar from "@/components/home/WhyStellar";
import ContactCTA from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <div className="page-enter">
      <HeroSection />
      <WhoWeAre />
      <ExpertiseGlance />
      <ServicesSnapshot />
      <WhyStellar />
      <ContactCTA />
    </div>
  );
}
