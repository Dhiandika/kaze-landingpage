import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { ArrowLeft, ExternalLink, Calendar, User, Code2, Layers } from "lucide-react";
import Footer from "@/components/layout/Footer";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/layout/Navbar";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await prisma.portfolio.findUnique({
        where: { slug },
    });

    if (!project) return { title: "Project Not Found" };

    return {
        title: `${project.title} | Kaze Kreativ`,
        description: project.description,
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await prisma.portfolio.findUnique({
        where: { slug },
    });

    if (!project) {
        notFound();
    }

    const gallery = project.gallery ? JSON.parse(project.gallery) : [];

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover brightness-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-7xl mx-auto">
                    <Link
                        href="/#portfolio"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Portfolio
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 rounded-full bg-[var(--accent)] text-white text-sm font-bold">
                            {project.category}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        {project.title}
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl">
                        {project.description}
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Sidebar Stats */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <Layers size={20} className="text-[var(--accent)]" />
                                Project Details
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
                                        <User size={16} /> Client
                                    </div>
                                    <div className="font-medium">{project.client || "Confidential"}</div>
                                </div>

                                <div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
                                        <Calendar size={16} /> Year
                                    </div>
                                    <div className="font-medium">{project.year || "2024"}</div>
                                </div>

                                <div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
                                        <Code2 size={16} /> Tech Stack
                                    </div>
                                    <div className="font-medium leading-relaxed">
                                        {project.technologies || "Next.js, Tailwind CSS"}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/10">
                                {project.projectUrl ? (
                                    <a
                                        href={project.projectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-3 bg-[var(--foreground)] text-[var(--background)] rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                    >
                                        Visit Live Site <ExternalLink size={18} />
                                    </a>
                                ) : (
                                    <button disabled className="w-full py-3 bg-gray-200 dark:bg-white/10 text-gray-400 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2">
                                        Live Site Unavailable
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* The Story Grid */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/20">
                                <h3 className="text-red-600 dark:text-red-400 font-bold mb-2">The Problem</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {project.problem || "Defining the core challenge faced by the client."}
                                </p>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/20">
                                <h3 className="text-blue-600 dark:text-blue-400 font-bold mb-2">The Solution</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {project.solution || "Our strategic approach and technical implementation."}
                                </p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-2xl border border-green-100 dark:border-green-900/20">
                                <h3 className="text-green-600 dark:text-green-400 font-bold mb-2">The Result</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {project.result || "Measurable impact and success metrics achieved."}
                                </p>
                            </div>
                        </div>

                        {/* Deep Dive Content */}
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <ReactMarkdown>{project.content || ""}</ReactMarkdown>
                        </div>

                        {/* Gallery */}
                        {gallery.length > 0 && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold">Project Gallery</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {gallery.map((img: string, idx: number) => (
                                        <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/5">
                                            <Image
                                                src={img}
                                                alt={`${project.title} screenshot ${idx + 1}`}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
