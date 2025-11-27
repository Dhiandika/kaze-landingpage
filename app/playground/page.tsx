"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";

export default function PlaygroundPage() {
    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <Navbar />
            <main className="pt-32 pb-20 container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">UI Playground</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Experimental components and interactions. A showcase of what's possible.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card 1: 3D Tilt */}
                    <TiltCard />

                    {/* Card 2: Glassmorphism */}
                    <GlassCard />

                    {/* Card 3: Magnetic Button */}
                    <MagneticButtonCard />

                    {/* Card 4: Gradient Border */}
                    <GradientBorderCard />

                    {/* Card 5: Text Reveal */}
                    <TextRevealCard />

                    {/* Card 6: Morphing Blob */}
                    <BlobCard />
                </div>
            </main>
            <Footer />
        </div>
    );
}

function TiltCard() {
    return (
        <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden perspective-1000">
            <motion.div
                whileHover={{ rotateX: 15, rotateY: -15, scale: 1.05 }}
                className="w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl flex items-center justify-center text-white font-bold cursor-pointer"
            >
                3D Tilt
            </motion.div>
        </div>
    );
}

function GlassCard() {
    return (
        <div className="h-64 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070')] bg-cover rounded-3xl overflow-hidden">
            <div className="w-48 h-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                Glassmorphism
            </div>
        </div>
    );
}

function MagneticButtonCard() {
    return (
        <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-200 dark:border-white/10">
            <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold shadow-lg"
            >
                Magnetic
            </motion.button>
        </div>
    );
}

function GradientBorderCard() {
    return (
        <div className="h-64 flex items-center justify-center bg-gray-900 rounded-3xl border border-gray-800">
            <div className="relative p-[2px] rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 overflow-hidden">
                <div className="px-8 py-4 bg-gray-900 rounded-lg text-white font-bold relative z-10">
                    Gradient Border
                </div>
            </div>
        </div>
    );
}

function TextRevealCard() {
    return (
        <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-200 dark:border-white/10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400"
            >
                Text Reveal
            </motion.div>
        </div>
    );
}

function BlobCard() {
    return (
        <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="w-32 h-32 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>
            <span className="relative z-10 font-bold text-xl">Morphing Blobs</span>
        </div>
    );
}
