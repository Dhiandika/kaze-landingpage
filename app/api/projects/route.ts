import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { title, slug, category, imageUrl, description, client, year, projectUrl, problem, solution, result, content, technologies, gallery } = body;

        const project = await prisma.portfolio.create({
            data: {
                title,
                slug,
                category,
                imageUrl,
                description,
                client,
                year,
                projectUrl,
                problem,
                solution,
                result,
                content,
                technologies,
                gallery: JSON.stringify(gallery || []),
            },
        });

        return NextResponse.json(project);
    } catch (error) {
        console.error("Create Project Error:", error);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}

export async function GET() {
    const projects = await prisma.portfolio.findMany({
        orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
}
