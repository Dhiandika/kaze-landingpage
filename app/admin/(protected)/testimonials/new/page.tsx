"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewTestimonialPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        quote: "",
        imageUrl: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("/api/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/testimonials");
                router.refresh();
            } else {
                alert("Failed to create testimonial");
            }
        } catch (error) {
            console.error(error);
            alert("Error creating testimonial");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <Link
                    href="/admin/testimonials"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--accent)] mb-4"
                >
                    <ArrowLeft size={16} />
                    Back to Testimonials
                </Link>
                <h1 className="text-3xl font-bold">Add New Testimonial</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-white/5 p-8 rounded-2xl border border-gray-200 dark:border-white/10">
                <div>
                    <label className="block text-sm font-medium mb-2">Client Name</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Role / Company</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Quote</label>
                    <textarea
                        required
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent"
                        value={formData.quote}
                        onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Photo URL</label>
                    <input
                        type="url"
                        placeholder="https://example.com/photo.jpg"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    />
                    <p className="text-xs text-gray-500 mt-1">Provide a direct link to the client's photo.</p>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                    {isLoading ? "Saving..." : (
                        <>
                            <Save size={18} />
                            Save Testimonial
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
