"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TextRotate } from "@/components/TextRotate";

export function Hero() {
  return (
    <section 
      className="relative w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-transparent"
    >
      <div className="max-w-4xl z-10">
        {/* Titlul folosește acum text-neutral-900 (negru) pentru Light și text-white pentru Dark */}
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1] text-neutral-900 dark:text-white transition-colors duration-500">
          Make your <br />
          
          <div className="flex flex-col items-center justify-center w-full">
            <span className="text-primary h-[1.2em] flex items-center justify-center">
              <TextRotate
                texts={["website", "platform", "business"]}
                mainClassName="inline-block"
                staggerFrom={"last"}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                elementLevelClassName="inline-block"
              />
            </span>
            <span className="text-primary block">lovely</span>
          </div>
        </h1>
        
        {/* Paragraful se adaptează și el culorii */}
        <p className="text-lg md:text-2xl text-neutral-600 dark:text-white/70 mb-12 max-w-2xl mx-auto transition-colors duration-500">
          Web designer with 3 years of experience, building high-performance digital solutions.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="#portofoliu">
            {/* Butonul va arăta bine pe fundal alb datorită contrastului creat de text-white */}
            <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white font-semibold">
              View Projects
            </Button>
          </Link>
          <Link href="#contact">
            {/* Butonul outline se adaptează border-ului și textului în funcție de temă */}
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full px-8 border-neutral-300 dark:border-white/20 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors duration-500"
            >
              Contact Me
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}