import FeaturedBooks from "@/components/FeaturedBooks";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import PopularCategories from "@/components/PopularCategories";
import Testimonials from "@/components/Testimonials";
import TopLibrarians from "@/components/TopLibrarians";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <HeroSection />
    <FeaturedBooks/>
    <TopLibrarians/>
    <PopularCategories/>
    <Testimonials/>
    <HowItWorks/>
    <WhyChooseUs/>
    </>
  );
}
