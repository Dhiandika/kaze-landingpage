"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, PenTool, ArrowRight } from "lucide-react";
import ServicesBackground from "../ui/backgrounds/ServicesBackground";

const services = [
    {
        icon: <TrendingUp size={24} />,
        title: "Ads Performance",
        description: "Meta Ads & Google Ads dengan strategi targeting presisi untuk memaksimalkan ROI bisnis Anda.",
        className: "md:col-span-2",
    },
    {
        icon: <Users size={24} />,
        title: "Social Media Management",
        description: "Konten kreatif, scheduling, dan community engagement.",
        className: "md:col-span-1",
    },
    {
        icon: <PenTool size={24} />,
        title: "Branding & Creative",
        description: "Visual identity, logo, dan copywriting yang kuat.",
        className: "md:col-span-3",
    },
];

export default function Services() {
    return (
        <section id="services" className="py-24 relative overflow-hidden">
            <ServicesBackground />
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Services</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Solusi komprehensif untuk pertumbuhan digital bisnis Anda.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group p-8 rounded-3xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--accent)]/50 transition-all duration-500 ${service.className}`}
                        >
                            <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/5 dark:bg-white/10 text-[var(--foreground)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                {service.description}
                            </p>
                            <a href="#contact" className="inline-flex items-center text-sm font-medium text-gray-500 group-hover:text-[var(--accent)] transition-colors">
                                Learn more <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
