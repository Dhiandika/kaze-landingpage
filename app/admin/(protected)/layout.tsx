import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, LogOut, PlusCircle, Settings, MessageSquareQuote, Users, Mail, FileText } from "lucide-react";
import { signOut } from "@/auth";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/admin/login");
    }

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-[#0B1120]">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-[#0F172A] border-r border-gray-200 dark:border-white/10 hidden md:block relative">
                <div className="p-6">
                    <h1 className="text-2xl font-bold tracking-tighter">
                        Kaze<span className="text-[var(--accent)]">Admin</span>
                    </h1>
                </div>
                <nav className="px-4 space-y-2">
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl bg-gray-100 dark:bg-white/5 text-[var(--accent)]"
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/posts"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                        <FileText size={18} />
                        Posts
                    </Link>
                    <Link
                        href="/admin/projects/new"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                        <PlusCircle size={18} />
                        Add Project
                    </Link>
                    <Link
                        href="/admin/testimonials"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                        <MessageSquareQuote size={18} />
                        Testimonials
                    </Link>
                    <Link
                        href="/admin/users"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                        <Users size={18} />
                        Users
                    </Link>
                    <Link
                        href="/admin/messages"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                        <Mail size={18} />
                        Inbox
                    </Link>
                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                        <Settings size={18} />
                        Settings
                    </Link>
                    <div className="px-4 py-2">
                        <ThemeToggle />
                    </div>
                </nav>
                <div className="absolute bottom-6 left-0 right-0 px-6">
                    <form
                        action={async () => {
                            "use server";
                            await signOut();
                        }}
                    >
                        <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors">
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
