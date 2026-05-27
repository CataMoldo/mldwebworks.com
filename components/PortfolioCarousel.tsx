"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const portfolioData = [
  {
    id: "corp-landing",
    title: "Corporate Landing Page",
    description: "A modern digital presence for a company, featuring fluid animations and perfect optimization.",
    href: "#",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1080&auto=format&fit=crop",
  },
  {
    id: "digital-store",
    title: "Digital Assets Web Store",
    description: "Custom platform optimized for fast and secure sales of digital products and scripts.",
    href: "#",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1080&auto=format&fit=crop",
  },
  {
    id: "dashboard",
    title: "Analytics Dashboard",
    description: "Complex interface for real-time data visualization, offering an intuitive user experience.",
    href: "#",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1080&auto=format&fit=crop",
  },
];

export function PortfolioCarousel() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section id="portofoliu" className="py-24 bg-transparent transition-colors duration-500">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-neutral-900 dark:text-white transition-colors">Recent Projects</h2>
            <p className="mt-4 text-neutral-600 dark:text-white/60 max-w-xl transition-colors">
              Discover a selection of the highest-performing platforms developed recently.
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <Button variant="outline" size="icon" onClick={() => carouselApi?.scrollPrev()} disabled={!canScrollPrev} className="rounded-full border-neutral-300 dark:border-white/20 bg-transparent text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors">
              <ArrowLeft className="size-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => carouselApi?.scrollNext()} disabled={!canScrollNext} className="rounded-full border-neutral-300 dark:border-white/20 bg-transparent text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors">
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
        
        <Carousel setApi={setCarouselApi} opts={{ align: "start" }} className="w-full">
          <CarouselContent className="-ml-4">
            {portfolioData.map((item) => (
              <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <a href={item.href} className="group block h-full">
                  <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-100/50 dark:bg-white/5 backdrop-blur-sm transition-all hover:bg-neutral-200/50 dark:hover:bg-white/10">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-80" 
                    />
                    {/* Gradient adaptat pentru ambele teme */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="mb-2 text-2xl font-bold text-white">{item.title}</h3>
                      <p className="text-white/70 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}