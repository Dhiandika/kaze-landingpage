import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    let settings = await prisma.siteSettings.findUnique({
        where: { id: "settings" },
    });

    if (!settings) {
        settings = await prisma.siteSettings.create({
            data: { id: "settings" },
        });
    }

    return NextResponse.json(settings);
}

export async function PUT(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const settings = await prisma.siteSettings.upsert({
            where: { id: "settings" },
            update: body,
            create: { id: "settings", ...body },
        });
        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}
