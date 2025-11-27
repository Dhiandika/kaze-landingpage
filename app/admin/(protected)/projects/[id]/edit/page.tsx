"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        imageUrl: "",
        description: "",
    });

    useEffect(() => {
        const fetchProject = async () => {
            try {
                // We can fetch from the list API or create a specific GET by ID. 
                // For simplicity, we'll fetch all and find (or better, implement GET by ID in API).
                // Since we didn't implement GET by ID in API yet, let's assume we can pass data or fetch list.
                // Actually, let's implement GET by ID in the API or just fetch list here for now.
                // Better approach: Fetch list and find.
                const res = await fetch("/api/projects");
                const projects = await res.json();
                const project = projects.find((p: any) => p.id === id);

                if (project) {
                    setFormData({
                        title: project.title,
                        category: project.category,
                        imageUrl: project.imageUrl,
                        description: project.description || "",
                    });
                } else {
                    alert("Project not found");
                    router.push("/admin/dashboard");
                }
            } catch (error) {
                console.error("Error fetching project:", error);
            } finally {
                setFetching(false);
            }
        };

        fetchProject();
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/projects", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, ...formData }),
            });

            if (res.ok) {
                router.push("/admin/dashboard");
                router.refresh();
            } else {
                alert("Failed to update project");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-[var(--accent)]" size={32} />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <Link
                    href="/admin/dashboard"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-[var(--accent)] mb-4 transition-colors"
                >
                    <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-[#0F172A] p-8 rounded-3xl border border-gray-200 dark:border-white/10">
                <div>
                    <label className="block text-sm font-medium mb-2">Project Title</label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    >
                        <option value="">Select Category</option>
                        <option value="Ads Performance">Ads Performance</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Branding">Branding</option>
                        <option value="Web Development">Web Development</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Image URL</label>
                    <input
                        type="url"
                        required
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" /> : (
                        <>
                            <Save size={18} />
                            Update Project
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
