"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-24 bg-white dark:bg-[#0F172A]">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2"
                    >
                        <div className="relative aspect-square rounded-3xl overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                                alt="Our Team"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            More Than Just An Agency.
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">
                            Kaze (風) berarti "Angin" dalam bahasa Jepang. Seperti angin, kami bergerak dinamis, tak terlihat namun dampaknya nyata.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                            Kami percaya bahwa setiap brand memiliki cerita unik yang layak didengar. Misi kami adalah memperkuat suara tersebut melalui strategi digital yang cerdas dan eksekusi kreatif yang memukau.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                <h3 className="text-2xl font-bold text-[var(--accent)] mb-1">2020</h3>
                                <p className="text-sm text-gray-500">Established</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                <h3 className="text-2xl font-bold text-[var(--accent)] mb-1">Bali</h3>
                                <p className="text-sm text-gray-500">Based HQ</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
