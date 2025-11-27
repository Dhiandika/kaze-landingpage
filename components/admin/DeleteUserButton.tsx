"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteUserButton({ id }: { id: string }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this admin user?")) return;

        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/users?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh();
            } else {
                const text = await res.text();
                alert(text || "Failed to delete");
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting user");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isLoading}
            className="text-red-500 hover:text-red-600 transition-colors disabled:opacity-50"
            title="Delete User"
        >
            <Trash2 size={20} />
        </button>
    );
}
