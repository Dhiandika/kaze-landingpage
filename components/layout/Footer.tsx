import Link from "next/link";
import { getSiteSettings } from "@/lib/settings";

export default async function Footer() {
    const settings = await getSiteSettings();

    return (
        <footer className="bg-[var(--card-bg)] text-[var(--foreground)] py-12 border-t border-[var(--border)]">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold tracking-tighter mb-2">
                            Kaze<span className="text-[var(--accent)]">Kreativ</span>
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {settings.address} <br />
                            {settings.email}
                        </p>
                    </div>

                    <div className="flex gap-6 text-sm font-medium">
                        <Link href={settings.instagram} target="_blank" className="text-gray-600 dark:text-gray-300 hover:text-[var(--accent)] transition-colors">
                            Instagram
                        </Link>
                        <Link href={settings.linkedin} target="_blank" className="text-gray-600 dark:text-gray-300 hover:text-[var(--accent)] transition-colors">
                            LinkedIn
                        </Link>
                        <Link href="/admin/login" className="text-gray-600 dark:text-gray-300 hover:text-[var(--accent)] transition-colors">
                            Admin
                        </Link>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-[var(--border)] text-center text-xs text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} Kaze Kreativ. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
