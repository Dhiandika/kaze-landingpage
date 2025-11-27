"use client";

import { motion } from "framer-motion";

const steps = [
    {
        number: "01",
        title: "Discovery",
        description: "Kami mendalami bisnis Anda, memahami target audiens, dan menetapkan KPI yang jelas.",
    },
    {
        number: "02",
        title: "Strategy",
        description: "Merancang roadmap digital marketing yang personal dan data-driven khusus untuk brand Anda.",
    },
    {
        number: "03",
        title: "Execution",
        description: "Implementasi campaign dengan konten kreatif berkualitas tinggi dan setup teknis yang presisi.",
    },
    {
        number: "04",
        title: "Optimization",
        description: "Monitoring performa secara real-time dan melakukan penyesuaian untuk hasil maksimal.",
    },
];

export default function Process() {
    return (
        <section id="process" className="py-24 bg-gray-50 dark:bg-[#0B1120]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">How We Work</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Proses transparan untuk hasil yang terukur.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative p-6"
                        >
                            <div className="text-6xl font-bold text-gray-200 dark:text-white/5 mb-4 absolute -top-4 -left-4 z-0">
                                {step.number}
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
