"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-white/10 bg-transparent backdrop-blur-md transition-colors duration-500">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl tracking-wider text-primary">{"{>}"} MLD</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {/* Am adăugat clasele dinamice pentru ambele teme */}
            <Link 
              href="#portofoliu" 
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-white/70 dark:hover:text-white transition-colors"
            >
              Portfolio
            </Link>
            <Link 
              href="#despre" 
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-white/70 dark:hover:text-white transition-colors"
            >
              About
            </Link>
            <Link 
              href="#contact" 
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-white/70 dark:hover:text-white transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}