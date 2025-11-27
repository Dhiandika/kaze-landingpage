import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
<Link
    href="/admin/projects/new"
    className="flex items-center gap-2 px-4 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-lg font-medium hover:opacity-90 transition-opacity"
>
    <Plus size={18} />
    Add Project
</Link>
            </div >

    <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                    <tr>
                        <th className="px-6 py-4 font-medium">Image</th>
                        <th className="px-6 py-4 font-medium">Title</th>
                        <th className="px-6 py-4 font-medium">Category</th>
                        <th className="px-6 py-4 font-medium">Client</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                    {projects.map((project) => (
                        <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4">
                                <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-white/10">
                                    <Image
                                        src={project.imageUrl}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium">
                                <div className="flex flex-col">
                                    <span>{project.title}</span>
                                    <span className="text-xs text-gray-500 font-normal truncate max-w-[200px]">
                                        /{project.slug}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-xs font-medium">
                                    {project.category}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-500">{project.client || "-"}</td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    {project.projectUrl && (
                                        <a
                                            href={project.projectUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 text-gray-400 hover:text-[var(--accent)] transition-colors"
                                            title="Visit Live Site"
                                        >
                                            <ExternalLink size={18} />
                                        </a>
                                    )}
                                    <Link
                                        href={`/admin/projects/${project.id}`}
                                        className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Pencil size={18} />
                                    </Link>
                                    <DeleteProjectButton id={project.id} />
                                </div>
                            </td>
                        </tr>
                    ))}
                    {projects.length === 0 && (
                        <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                No projects found. Create one to get started.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
        </div >
    );
}
