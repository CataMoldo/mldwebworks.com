import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { PortfolioCarousel } from "@/components/PortfolioCarousel";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <About />
      <PortfolioCarousel />
      <Contact />
    </div>
  );
}