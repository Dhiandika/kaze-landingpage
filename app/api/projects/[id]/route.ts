import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await prisma.portfolio.findUnique({
        where: { id },
    });

    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
    return NextResponse.json(project);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    try {
        const body = await req.json();
        const { title, slug, category, imageUrl, description, client, year, projectUrl, problem, solution, result, content, technologies, gallery } = body;

        const project = await prisma.portfolio.update({
            where: { id },
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
        console.error("Update Project Error:", error);
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    try {
        await prisma.portfolio.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete Project Error:", error);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
