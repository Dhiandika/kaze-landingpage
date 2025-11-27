import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import LogoStrip from "@/components/sections/LogoStrip";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Portfolio from "@/components/sections/Portfolio";
import Contact from "@/components/sections/Contact";
import Testimonials from "@/components/sections/Testimonials";
import Stats from "@/components/sections/Stats";
import BlogSection from "@/components/sections/BlogSection";


import GlobalDecorations from "@/components/ui/GlobalDecorations";

import { getSiteSettings } from "@/lib/settings";

export default async function Home() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-[var(--background)] text-[var(--foreground)]">
      <GlobalDecorations />
      <Navbar />
      <main className="flex flex-col w-full">
        {/* Hero - Base Background */}
        <div className="relative">
          <Hero />
          <LogoStrip />
        </div>

        {/* Stats - Base Background */}
        <div className="relative">
          <Stats />
        </div>

        {/* Services - ALT Background (Darker) & Asymmetrical Skew */}
        <div className="relative py-20">
          {/* Skewed Background */}
          <div className="absolute inset-0 bg-slate-200/80 dark:bg-slate-900/50 -skew-y-3 -z-10 scale-y-110 origin-top-left" />
          <Services />
        </div>

        {/* About - Base Background */}
        <div className="relative pt-20 pb-10">
          <About />
        </div>

        {/* Process - Base Background */}
        <div className="relative pb-20">
          <Process />
        </div>

        {/* Portfolio - ALT Background (Darker) & Asymmetrical Skew */}
        <div className="relative py-20">
          {/* Skewed Background */}
          <div className="absolute inset-0 bg-slate-200/80 dark:bg-slate-900 -skew-y-3 -z-10 scale-y-110 origin-top-right" />
          <Portfolio />
        </div>

        {/* Testimonials - Base Background */}
        <div className="relative pt-20 pb-10">
          <Testimonials />
        </div>

        {/* Blog - Base Background */}
        <div className="relative py-20">
          <BlogSection />
        </div>

        {/* Contact - ALT Background (Darker) & Asymmetrical Skew */}
        <div className="relative py-20">
          {/* Skewed Background */}
          <div className="absolute inset-0 bg-slate-200/80 dark:bg-slate-900 -skew-y-3 -z-10 scale-y-110 origin-top-left" />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
