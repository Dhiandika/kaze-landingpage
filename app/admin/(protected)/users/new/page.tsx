"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewUserPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("/api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/users");
                router.refresh();
            } else {
                const text = await res.text();
                alert(text || "Failed to create user");
            }
        } catch (error) {
            console.error(error);
            alert("Error creating user");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <Link
                    href="/admin/users"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--accent)] mb-4"
                >
                    <ArrowLeft size={16} />
                    Back to Users
                </Link>
                <h1 className="text-3xl font-bold">Add New Admin</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-white/5 p-8 rounded-2xl border border-gray-200 dark:border-white/10">
                <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                        type="email"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input
                        type="password"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                    {isLoading ? "Saving..." : (
                        <>
                            <Save size={18} />
                            Create Admin
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
