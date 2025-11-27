import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import PortfolioBackground from "../ui/backgrounds/PortfolioBackground";

export default async function Portfolio() {
    const projects = await prisma.portfolio.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
    });

    return (
        <section id="portfolio" className="relative overflow-hidden">
            <PortfolioBackground />
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Selected Works</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                            Lihat bagaimana kami membantu brand mencapai target mereka.
                        </p>
                    </div>
                    <Link href="/projects" className="px-6 py-3 rounded-full border border-[var(--border)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors">
                        View All Projects
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.slug}`}
                            className="group relative overflow-hidden rounded-3xl bg-gray-100 dark:bg-white/5 aspect-[4/3] cursor-pointer"
                        >
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                <span className="text-[var(--accent)] font-medium mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {project.category}
                                </span>
                                <h3 className="text-2xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                    {project.title}
                                </h3>
                                <p className="text-white/80 mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100 line-clamp-2">
                                    {project.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
