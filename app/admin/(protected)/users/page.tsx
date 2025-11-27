import prisma from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle, User } from "lucide-react";
import DeleteUserButton from "@/components/admin/DeleteUserButton";
import { auth } from "@/auth";

export default async function UsersPage() {
    const session = await auth();
    let users = [];
    try {
        users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
        });
    } catch (error) {
        console.error("Users DB Error:", error);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Users</h1>
                <Link
                    href="/admin/users/new"
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                    <PlusCircle size={20} />
                    Add Admin
                </Link>
            </div>

            <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                        <tr>
                            <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Name</th>
                            <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Email</th>
                            <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Created At</th>
                            <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                        {users.map((user: any) => (
                            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                                            <User size={16} />
                                        </div>
                                        <span className="font-medium">{user.name || "No Name"}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{user.email}</td>
                                <td className="px-6 py-4 text-gray-500 text-sm">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {session?.user?.email !== user.email && (
                                        <DeleteUserButton id={user.id} />
                                    )}
                                    {session?.user?.email === user.email && (
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">You</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No users found.</div>
                )}
            </div>
        </div>
    );
}
