import FeaturedBooks from "@/components/FeaturedBooks";
import HeroSection from "@/components/HeroSection";
import PopularCategories from "@/components/PopularCategories";
import TopLibrarians from "@/components/TopLibrarians";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <HeroSection />
    <FeaturedBooks/>
    <TopLibrarians/>
    <PopularCategories/>
    </>
  );
}
