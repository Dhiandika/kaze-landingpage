import prisma from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import DeleteTestimonialButton from "@/components/admin/DeleteTestimonialButton";

export default async function TestimonialsPage() {
    const testimonials = await prisma.testimonial.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Testimonials</h1>
                <Link
                    href="/admin/testimonials/new"
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                    <PlusCircle size={20} />
                    Add Testimonial
                </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {testimonials.map((t) => (
                    <div key={t.id} className="bg-white dark:bg-white/5 p-6 rounded-xl border border-gray-200 dark:border-white/10">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                {t.imageUrl && (
                                    <img src={t.imageUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                                )}
                                <div>
                                    <h3 className="font-bold">{t.name}</h3>
                                    <p className="text-sm text-gray-500">{t.role}</p>
                                </div>
                            </div>
                            <DeleteTestimonialButton id={t.id} />
                        </div>
                        <p className="italic text-gray-600 dark:text-gray-300">"{t.quote}"</p>
                    </div>
                ))}
                {testimonials.length === 0 && (
                    <div className="col-span-2 text-center py-12 text-gray-500">
                        No testimonials found. Add one to get started.
                    </div>
                )}
            </div>
        </div>
    );
}
