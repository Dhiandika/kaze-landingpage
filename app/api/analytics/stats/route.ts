import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        // 1. Total Views
        if (!prisma.analytics) {
            throw new Error("Prisma Client is out of sync. Please restart the dev server.");
        }
        const totalViews = await prisma.analytics.count();

        // 2. Top Pages (Group by path)
        const topPagesRaw = await prisma.analytics.groupBy({
            by: ["path"],
            _count: {
                path: true,
            },
            orderBy: {
                _count: {
                    path: "desc",
                },
            },
            take: 5,
        });

        const topPages = topPagesRaw.map((item: { path: string; _count: { path: number } }) => ({
            path: item.path,
            count: item._count.path,
        }));

        // 3. Daily Stats (Last 7 days)
        // Since SQLite doesn't support complex date grouping easily in Prisma,
        // we'll fetch the last 7 days of data and group in JS.
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentViews = await prisma.analytics.findMany({
            where: {
                createdAt: {
                    gte: sevenDaysAgo,
                },
            },
            select: {
                createdAt: true,
            },
        });

        const dailyStatsMap = new Map<string, number>();

        // Initialize last 7 days with 0
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
            dailyStatsMap.set(dateStr, 0);
        }

        // Fill with data
        recentViews.forEach((view: { createdAt: Date }) => {
            const dateStr = new Date(view.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
            if (dailyStatsMap.has(dateStr)) {
                dailyStatsMap.set(dateStr, (dailyStatsMap.get(dateStr) || 0) + 1);
            }
        });

        // Convert to array and reverse to show oldest to newest
        const dailyStats = Array.from(dailyStatsMap.entries())
            .map(([date, views]) => ({ date, views }))
            .reverse();

        return NextResponse.json({
            totalViews,
            uniqueVisitors: totalViews, // Mock for now
            topPages,
            dailyStats,
        });
    } catch (error) {
        console.error("Stats Error Detailed:", error);
        return NextResponse.json({
            error: "Failed to fetch stats",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
