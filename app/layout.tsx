import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import { BeamsBackground } from "@/components/BeamsBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MLD Webworks",
  description: "Web development & design services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Am setat dark implicit pentru a se potrivi cu Beams
          enableSystem
          disableTransitionOnChange
        >
          <BeamsBackground>
            <Navbar />
            <main>{children}</main>
          </BeamsBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}