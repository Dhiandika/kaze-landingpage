import prisma from "@/lib/prisma";
import TestimonialsList from "./TestimonialsList";
import TestimonialBackground from "../ui/backgrounds/TestimonialBackground";

export default async function Testimonials() {
    const testimonials = await prisma.testimonial.findMany({
        orderBy: { createdAt: "desc" },
        take: 3, // Only show latest 3 on homepage
    });

    if (testimonials.length === 0) return null;

    return (
        <section className="relative overflow-hidden">
            <TestimonialBackground />
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">What They Say</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Dengarkan pengalaman klien kami yang telah tumbuh bersama Kaze Kreativ.
                    </p>
                </div>

                <TestimonialsList testimonials={testimonials} />
            </div>
        </section>
    );
}
