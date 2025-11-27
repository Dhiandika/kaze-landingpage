"use client";

import { motion } from "framer-motion";

const logos = [
    "TechCorp",
    "InnovateLabs",
    "FutureScale",
    "AlphaWave",
    "BrightPath",
    "NextGen",
    "Elevate",
    "Zenith",
];

export default function LogoStrip() {
    return (
        <section className="py-10 border-y border-gray-100 dark:border-white/5 bg-white/50 dark:bg-white/5 backdrop-blur-sm overflow-hidden">
            <div className="container mx-auto px-6 mb-6 text-center">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Trusted by Innovative Companies</p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-16 px-8">
                    {logos.map((logo, idx) => (
                        <span key={idx} className="text-2xl font-bold text-gray-300 dark:text-gray-600 select-none">
                            {logo}
                        </span>
                    ))}
                    {logos.map((logo, idx) => (
                        <span key={`dup-${idx}`} className="text-2xl font-bold text-gray-300 dark:text-gray-600 select-none">
                            {logo}
                        </span>
                    ))}
                    {logos.map((logo, idx) => (
                        <span key={`dup2-${idx}`} className="text-2xl font-bold text-gray-300 dark:text-gray-600 select-none">
                            {logo}
                        </span>
                    ))}
                </div>

                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />
            </div>
        </section>
    );
}
