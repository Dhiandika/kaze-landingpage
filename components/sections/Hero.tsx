"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Particles from "../ui/Particles";
import HeroBackground from "../ui/backgrounds/HeroBackground";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            <HeroBackground />

            {/* Background Particles */}
            <Particles />

            <div className="container mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-5xl mx-auto pt-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-[var(--border)] bg-white/50 dark:bg-white/5 backdrop-blur-sm text-sm font-medium text-gray-600 dark:text-gray-300"
                    >
                        <Sparkles size={14} className="text-[var(--accent)]" />
                        <span>Digital Marketing Agency in Bali</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1] bg-clip-text text-transparent bg-gradient-to-b from-[var(--foreground)] to-gray-500 dark:to-gray-400">
                        Scale Up Your Brand <br />
                        <span className="text-[var(--accent)]">Strategically.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Kami membantu bisnis Anda tumbuh melalui strategi Ads yang terukur,
                        Social Media Management yang kreatif, dan Branding yang memukau.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link
                            href="#contact"
                            className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-[var(--primary)] dark:bg-gray-200 dark:text-black rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-[var(--accent)]/20"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Start Your Growth <ArrowRight size={18} />
                            </span>
                        </Link>

                        <Link
                            href="#portfolio"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-gray-700 dark:text-gray-300 bg-transparent border border-[var(--border)] rounded-full hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                        >
                            View Portfolio
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
