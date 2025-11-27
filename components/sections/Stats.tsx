"use client";

import { motion } from "framer-motion";

const stats = [
    { label: "Projects Completed", value: "10+" },
    { label: "Happy Clients", value: "15+" },
    { label: "Team Members", value: "5" },
    { label: "Years Experience", value: "5+" },
];

export default function Stats() {
    return (
        <section className="py-20 bg-[var(--card-bg)]">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <h3 className="text-4xl md:text-5xl font-bold text-[var(--accent)] mb-2">
                                {stat.value}
                            </h3>
                            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
