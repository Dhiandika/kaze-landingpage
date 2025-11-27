"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewPostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        published: false,
    });

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData((prev) => ({
            ...prev,
            title,
            slug: generateSlug(title),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/posts");
                router.refresh();
            } else {
                alert("Failed to create post");
            }
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Error creating post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/posts"
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold">New Post</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Write something amazing.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 p-8 space-y-6">
                    {/* Title & Slug */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={handleTitleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                placeholder="Enter post title"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Slug</label>
                            <input
                                type="text"
                                required
                                value={formData.slug}
                                onChange={(e) =>
                                    setFormData({ ...formData, slug: e.target.value })
                                }
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                placeholder="post-url-slug"
                            />
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Excerpt</label>
                        <textarea
                            rows={3}
                            value={formData.excerpt}
                            onChange={(e) =>
                                setFormData({ ...formData, excerpt: e.target.value })
                            }
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
                            placeholder="Brief summary for SEO and previews..."
                        />
                    </div>

                    {/* Cover Image */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Cover Image URL</label>
                        <input
                            type="url"
                            value={formData.coverImage}
                            onChange={(e) =>
                                setFormData({ ...formData, coverImage: e.target.value })
                            }
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {/* Content (Simple Text Area for now, Rich Text later) */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Content (Markdown)</label>
                        <textarea
                            required
                            rows={15}
                            value={formData.content}
                            onChange={(e) =>
                                setFormData({ ...formData, content: e.target.value })
                            }
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent)] font-mono text-sm"
                            placeholder="# Write your content here..."
                        />
                    </div>

                    {/* Publishing */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-white/10">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.published}
                                onChange={(e) =>
                                    setFormData({ ...formData, published: e.target.checked })
                                }
                                className="w-5 h-5 rounded border-gray-300 text-[var(--accent)] focus:ring-[var(--accent)]"
                            />
                            <span className="text-sm font-medium">Publish immediately</span>
                        </label>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-3 bg-[var(--primary)] text-white dark:bg-white dark:text-black rounded-full font-medium hover:opacity-90 transition-all disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <Save size={20} />
                        )}
                        Save Post
                    </button>
                </div>
            </form>
        </div>
    );
}
