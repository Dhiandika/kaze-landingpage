import prisma from "@/lib/prisma";
import ProjectForm from "@/components/admin/ProjectForm";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await prisma.portfolio.findUnique({
        where: { id },
    });

    if (!project) {
        notFound();
    }

    return <ProjectForm initialData={project} isEditing />;
}
