"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Don't track admin pages or api routes
        if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

        const trackPage = async () => {
            try {
                await fetch("/api/analytics", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ path: pathname }),
                });
            } catch (error) {
                console.error("Tracking failed", error);
            }
        };

        trackPage();
    }, [pathname]);

    return null;
}
