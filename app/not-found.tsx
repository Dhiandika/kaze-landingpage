import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] p-6 text-center">
            <div className="relative mb-8">
                <div className="text-9xl font-bold text-gray-200 dark:text-white/5 select-none">404</div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                        Page Not Found
                    </div>
                </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mb-4">Lost in the Digital Void?</h1>
            <p className="text-gray-500 max-w-md mb-8">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <div className="flex gap-4">
                <Link
                    href="/"
                    className="flex items-center gap-2 px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-xl font-bold hover:opacity-90 transition-opacity"
                >
                    <Home size={18} />
                    Back Home
                </Link>
                <Link
                    href="/#contact"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-white/10 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                >
                    Contact Support
                </Link>
            </div>
        </div>
    );
}
