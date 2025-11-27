import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { path } = body;

        const headersList = await headers();
        const userAgent = headersList.get("user-agent") || "unknown";
        // In a real app, we'd hash the IP. For this demo, we'll just store "anonymous" or a mock hash.
        // Getting real IP in dev/prod varies (x-forwarded-for, etc.)
        const ip = "anonymous-hash";

        const isMobile = /mobile/i.test(userAgent);
        const device = isMobile ? "mobile" : "desktop";

        await prisma.analytics.create({
            data: {
                path,
                userAgent,
                ip,
                device,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Analytics Error:", error);
        return NextResponse.json({ error: "Failed to track" }, { status: 500 });
    }
}
