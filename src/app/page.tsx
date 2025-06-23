import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { PriceSection } from "@/components/home/PriceSection";
import { MethodsSection } from "@/components/home/MethodsSection";
import { FAQSection } from "@/components/home/FaqSection";
import { Footer } from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <HeroSection/>
      <FeaturesSection/>
      <PriceSection/>
      <MethodsSection/>
      <FAQSection/>
      <Footer/>
    </>
  );
}
