"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Plus, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProjectFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function ProjectForm({ initialData, isEditing }: ProjectFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [galleryUrl, setGalleryUrl] = useState("");

    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        category: initialData?.category || "",
        imageUrl: initialData?.imageUrl || "",
        description: initialData?.description || "",
        client: initialData?.client || "",
        year: initialData?.year || new Date().getFullYear().toString(),
        projectUrl: initialData?.projectUrl || "",
        problem: initialData?.problem || "",
        solution: initialData?.solution || "",
        result: initialData?.result || "",
        content: initialData?.content || "",
        technologies: initialData?.technologies || "",
        gallery: initialData?.gallery ? JSON.parse(initialData.gallery) : [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Auto-generate slug from title if not editing and slug is empty
        if (name === "title" && !isEditing && !formData.slug) {
            setFormData((prev) => ({
                ...prev,
                slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
            }));
        }
    };

    const handleAddGalleryImage = () => {
        if (!galleryUrl) return;
        setFormData((prev) => ({
            ...prev,
            gallery: [...prev.gallery, galleryUrl],
        }));
        setGalleryUrl("");
    };

    const handleRemoveGalleryImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            gallery: prev.gallery.filter((_: any, i: number) => i !== index),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEditing ? `/api/projects/${initialData.id}` : "/api/projects";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/projects");
                router.refresh();
            } else {
                alert("Failed to save project");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/projects"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {isEditing ? "Edit Project" : "New Project"}
                    </h1>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    Save Project
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 space-y-6">
                        <h2 className="text-lg font-bold border-b border-gray-100 dark:border-white/10 pb-4">Basic Info</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title</label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                    placeholder="Project Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Slug</label>
                                <input
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                    placeholder="project-slug"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                placeholder="Short description for the card..."
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Client</label>
                                <input
                                    name="client"
                                    value={formData.client}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                    placeholder="Client Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Year</label>
                                <input
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                    placeholder="2024"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Live Project URL</label>
                            <input
                                name="projectUrl"
                                value={formData.projectUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                placeholder="https://example.com"
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 space-y-6">
                        <h2 className="text-lg font-bold border-b border-gray-100 dark:border-white/10 pb-4">Case Study Details</h2>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Problem</label>
                            <textarea
                                name="problem"
                                value={formData.problem}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                placeholder="What was the challenge?"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Solution</label>
                            <textarea
                                name="solution"
                                value={formData.solution}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                placeholder="How did we solve it?"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Result</label>
                            <textarea
                                name="result"
                                value={formData.result}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                placeholder="What was the outcome?"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Content (Markdown)</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows={10}
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] font-mono text-sm"
                                placeholder="# Deep Dive..."
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 space-y-6">
                        <h2 className="text-lg font-bold border-b border-gray-100 dark:border-white/10 pb-4">Media & Tech</h2>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <input
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                placeholder="e.g. Fintech, E-Commerce"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Technologies</label>
                            <input
                                name="technologies"
                                value={formData.technologies}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                placeholder="React, Next.js, Tailwind"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Cover Image URL</label>
                            <input
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                placeholder="https://..."
                            />
                            {formData.imageUrl && (
                                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                                    <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 space-y-6">
                        <h2 className="text-lg font-bold border-b border-gray-100 dark:border-white/10 pb-4">Gallery</h2>

                        <div className="flex gap-2">
                            <input
                                value={galleryUrl}
                                onChange={(e) => setGalleryUrl(e.target.value)}
                                className="flex-1 px-4 py-2 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-sm"
                                placeholder="Image URL"
                            />
                            <button
                                type="button"
                                onClick={handleAddGalleryImage}
                                className="p-2 bg-[var(--accent)] text-white rounded-lg"
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {formData.gallery.map((url: string, index: number) => (
                                <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                                    <Image src={url} alt={`Gallery ${index}`} fill className="object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveGalleryImage(index)}
                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
