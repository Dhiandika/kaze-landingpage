import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://kazekreativ.my.id"; // Replace with actual domain

    // Static pages
    const routes = [
        "",
        "/blog",
        "/playground",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 1,
    }));

    // Dynamic Projects
    const projects = await prisma.portfolio.findMany({
        select: { slug: true, updatedAt: true },
    });

    const projectRoutes = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: project.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // Dynamic Blog Posts
    const posts = await prisma.post.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
    });

    const postRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [...routes, ...projectRoutes, ...postRoutes];
}
