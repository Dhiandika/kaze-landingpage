"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, MapPin, Send } from "lucide-react";
import ContactBackground from "../ui/backgrounds/ContactBackground";

interface ContactProps {
    settings?: {
        email: string;
        phone: string;
        address: string;
    };
}

export default function Contact({ settings }: ContactProps) {
    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <ContactBackground />
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's Grow Together</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg">
                            Siap untuk meningkatkan performa bisnis Anda? Hubungi kami untuk konsultasi gratis mengenai strategi digital yang tepat untuk Anda.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-white/5 flex items-center justify-center text-[var(--accent)]">
                                    <MessageCircle size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">WhatsApp</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-2">Chat langsung dengan tim kami.</p>
                                    <a href={`https://wa.me/${settings?.phone.replace(/[^0-9]/g, "")}`} className="text-[var(--accent)] font-medium hover:underline">
                                        {settings?.phone || "+62 812 3456 7890"}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-white/5 flex items-center justify-center text-[var(--accent)]">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">Email</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-2">Kirim brief project Anda.</p>
                                    <a href={`mailto:${settings?.email}`} className="text-[var(--accent)] font-medium hover:underline">
                                        {settings?.email || "hello@kazekreativ.com"}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-white/5 flex items-center justify-center text-[var(--accent)]">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">Office</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {settings?.address || "Denpasar, Bali, Indonesia"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-50 dark:bg-white/5 p-8 rounded-3xl border border-gray-100 dark:border-white/10"
                    >
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const formData = new FormData(form);
                            const data = {
                                name: formData.get("name"),
                                email: formData.get("email"),
                                message: formData.get("message"),
                            };

                            try {
                                const res = await fetch("/api/contact", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(data),
                                });

                                if (res.ok) {
                                    alert("Message sent successfully!");
                                    form.reset();
                                } else {
                                    alert("Failed to send message.");
                                }
                            } catch (error) {
                                alert("Something went wrong.");
                            }
                        }} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all resize-none"
                                    placeholder="Tell us about your project..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 rounded-xl bg-[var(--primary)] text-white dark:bg-white dark:text-black font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                            >
                                Send Message <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
