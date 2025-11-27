import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/layout/Footer";
import ReactMarkdown from "react-markdown";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await prisma.post.findUnique({
        where: { slug },
    });

    if (!post) return { title: "Post Not Found" };

    return {
        title: `${post.title} | Kaze Kreativ`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await prisma.post.findUnique({
        where: { slug },
        include: { author: true },
    });

    if (!post || !post.published) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <main className="max-w-4xl mx-auto px-6 py-24">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-[var(--accent)] transition-colors mb-8"
                >
                    <ArrowLeft size={20} />
                    Back to Blog
                </Link>

                {/* Header */}
                <header className="mb-12 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-[var(--accent)] font-medium mb-4">
                        <span>
                            {new Date(post.createdAt).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                        <span>•</span>
                        <span>{post.author?.name || "Kaze Team"}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                        {post.title}
                    </h1>
                    {post.excerpt && (
                        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                            {post.excerpt}
                        </p>
                    )}
                </header>

                {/* Cover Image */}
                {post.coverImage && (
                    <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 bg-gray-100 dark:bg-white/5">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Content */}
                <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-[var(--accent)] prose-img:rounded-2xl">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </article>
            </main>
            <Footer />
        </div>
    );
}
