"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    quote: string;
    imageUrl: string | null;
}

export default function TestimonialsList({ testimonials }: { testimonials: Testimonial[] }) {
    return (
        <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[var(--card-bg)] p-8 rounded-3xl border border-[var(--border)] relative group hover:border-[var(--accent)] transition-colors flex flex-col"
                >
                    <Quote className="text-[var(--accent)] mb-6 opacity-50" size={40} />
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 italic flex-grow">
                        "{item.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                        {item.imageUrl && (
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        )}
                        <div>
                            <h4 className="font-bold text-lg">{item.name}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.role}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
