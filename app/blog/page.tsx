import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/layout/Footer";

export const metadata = {
    title: "Blog | Kaze Kreativ",
    description: "Insights, tutorials, and updates from the Kaze Kreativ team.",
};

export default async function BlogPage() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        include: { author: true },
    });

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <main className="max-w-7xl mx-auto px-6 py-24">
                <div className="mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-[var(--accent)] transition-colors mb-6"
                    >
                        <ArrowLeft size={20} />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Insights & <span className="text-[var(--accent)]">Stories</span>
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl">
                        Exploring the intersection of design, technology, and creative problem solving.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl overflow-hidden hover:border-[var(--accent)]/50 transition-all hover:shadow-2xl hover:shadow-[var(--accent)]/10"
                        >
                            {/* Image */}
                            <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-white/5">
                                {post.coverImage ? (
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="text-sm text-[var(--accent)] font-medium mb-2">
                                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </div>
                                <h2 className="text-xl font-bold mb-3 group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                                    {post.title}
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                                    {post.excerpt || "No excerpt available."}
                                </p>
                                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-white/10">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-xs font-bold">
                                        {post.author?.name?.charAt(0) || "K"}
                                    </div>
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                        {post.author?.name || "Kaze Team"}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No posts published yet. Check back soon!</p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
