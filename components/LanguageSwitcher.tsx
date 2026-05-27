"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (lang: string) => {
    // Redirecționează către noua rută (ex: /en/page -> /fr/page)
    const newPath = pathname.replace(/^\/(ro|en|fr|de)/, `/${lang}`);
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLanguage('ro')}>Română</DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage('en')}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage('fr')}>Français</DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage('de')}>Deutsch</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}