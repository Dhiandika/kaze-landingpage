import prisma from "@/lib/prisma";
import { cache } from "react";

export const getSiteSettings = cache(async () => {
    let settings = await prisma.siteSettings.findUnique({
        where: { id: "settings" },
    });

    if (!settings) {
        // Return defaults if not found (should be handled by seed/API, but safe fallback)
        return {
            email: "hello@kazekreativ.my.id",
            phone: "+62 812 3456 7890",
            address: "Jakarta, Indonesia",
            instagram: "https://instagram.com",
            linkedin: "https://linkedin.com",
            github: "https://github.com",
        };
    }

    return settings;
});
