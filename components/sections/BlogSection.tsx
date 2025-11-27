import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { ArrowRight } from "lucide-react";

export default async function BlogSection() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        take: 3,
        include: { author: true },
    });

    if (posts.length === 0) return null;

    return (
        <section id="blog" className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        Latest <span className="text-[var(--accent)]">Insights</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xl text-lg">
                        Thoughts on design, technology, and the future of digital experiences.
                    </p>
                </div>
                <Link
                    href="/blog"
                    className="group flex items-center gap-2 text-[var(--accent)] font-medium hover:text-[var(--accent-glow)] transition-colors"
                >
                    View All Articles
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
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
                            <div className="text-xs text-[var(--accent)] font-bold mb-2 uppercase tracking-wider">
                                Article
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                                {post.excerpt || "No excerpt available."}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-400 font-medium mt-auto">
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>{post.author?.name || "Kaze Team"}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
