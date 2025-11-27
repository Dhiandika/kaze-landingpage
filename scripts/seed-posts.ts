import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Force git update

async function main() {
    console.log("🌱 Seeding dummy posts...");

    // Ensure a user exists to be the author
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const user = await prisma.user.upsert({
        where: { email: "demo@kazekreativ.com" },
        update: {
            password: hashedPassword,
            name: "Kaze Demo" // Ensure name is consistent
        },
        create: {
            email: "demo@kazekreativ.com",
            password: hashedPassword,
            name: "Kaze Demo",
        },
    });
    console.log("✅ Admin user ready:", user.email);

    // Seed Posts
    const posts = [
        {
            title: "The Future of Web Design in 2025",
            slug: "future-web-design-2025",
            excerpt: "Explore the upcoming trends in web design, from AI-generated layouts to immersive 3D experiences.",
            content: `
# The Future of Web Design

Web design is evolving rapidly. As we approach 2025, several key trends are emerging that will define the digital landscape.

## 1. AI-Driven Layouts
Artificial Intelligence is no longer just a buzzword. It's actively helping designers create more personalized and dynamic layouts.

## 2. Immersive 3D Experiences
With the rise of WebGL and easier access to 3D libraries like Three.js, the web is becoming more spatial.

## 3. Micro-Interactions
Small animations that respond to user actions are becoming standard. They add life and feedback to static interfaces.

> "Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs
      `,
            coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
            published: true,
            authorId: user.id,
        },
        {
            title: "Why Your Business Needs a Custom Website",
            slug: "why-custom-website",
            excerpt: "Stop using generic templates. Learn why a custom-built website is the best investment for your brand identity.",
            content: `
# Custom vs. Template

In the world of digital business, your website is your storefront. While templates are easy, they lack the soul of your brand.

## The Problem with Templates
- **Generic Look**: Your site looks like thousands of others.
- **Bloated Code**: Often slow and poorly optimized for SEO.
- **Limited Flexibility**: You're stuck with what the theme offers.

## The Custom Advantage
A custom website is built *for you*. It solves your specific business problems and speaks directly to your audience.
      `,
            coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
            published: true,
            authorId: user.id,
        },
        {
            title: "Mastering React Server Components",
            slug: "mastering-rsc",
            excerpt: "A deep dive into Next.js and React Server Components. How to build faster, more efficient web applications.",
            content: `
# React Server Components (RSC)

RSC is a paradigm shift in how we build React applications. By moving logic to the server, we reduce the bundle size sent to the client.

## Key Benefits
1. **Zero Bundle Size**: Server components don't add to the JS bundle.
2. **Direct Database Access**: Query your DB directly inside your component.
3. **Automatic Code Splitting**: Next.js handles this out of the box.

\`\`\`tsx
async function BlogPost({ id }) {
  const post = await db.post.findUnique({ where: { id } });
  return <h1>{post.title}</h1>;
}
\`\`\`
      `,
            coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
            published: true,
            authorId: user.id,
        },
    ];

    for (const post of posts) {
        const existing = await prisma.post.findUnique({ where: { slug: post.slug } });
        if (!existing) {
            await prisma.post.create({ data: post });
            console.log(`Created post: ${post.title}`);
        }
    }

    // Seed Projects (Portfolio)
    const projects = [
        {
            title: "Neon Finance App",
            slug: "neon-finance-app",
            category: "Fintech",
            imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
            description: "A futuristic banking dashboard with real-time crypto tracking.",
            client: "NeonBank",
            year: "2024",
            problem: "Traditional banking apps are boring and cluttered. NeonBank wanted a dashboard that felt like a sci-fi movie interface while remaining functional.",
            solution: "We designed a dark-mode-first UI with neon accents and glassmorphism. Used WebSockets for real-time data updates without page reloads.",
            result: "User engagement increased by 40%, and the app won the 'Best Fintech Design' award at WebSummit 2024.",
            content: "# Neon Finance App\n\n## The Challenge\nNeonBank is a challenger bank targeting Gen Z. They needed a mobile app that didn't look like a spreadsheet.\n\n## The Solution\nWe used React Native for cross-platform performance and Reanimated 2 for buttery smooth 60fps animations.\n\n## Key Features\n- **Real-time Crypto**: Live charts using D3.js.\n- **Voice Commands**: Integrated AI assistant for transfers.\n- **Biometric Security**: FaceID integration.",
            technologies: "React Native, TypeScript, Node.js, PostgreSQL",
            gallery: JSON.stringify([
                "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=2064&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2070&auto=format&fit=crop"
            ])
        },
        {
            title: "EcoTravel Platform",
            slug: "ecotravel-platform",
            category: "Travel",
            imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
            description: "Sustainable travel booking platform connecting eco-conscious travelers.",
            client: "GreenEarth",
            year: "2023",
            problem: "Travelers want to reduce their carbon footprint but lack reliable data on eco-friendly accommodations.",
            solution: "We built a booking engine that calculates the carbon offset of every trip. Integrated with Google Maps API for visual route planning.",
            result: "Over 10,000 trips booked in the first month. Featured in National Geographic.",
            content: "# EcoTravel Platform\n\n## Overview\nEcoTravel is more than just a booking site; it's a movement. We helped them build a platform that educates users while they book.\n\n## Tech Stack\nBuilt with Next.js for SEO and Vercel for global edge deployment.",
            technologies: "Next.js, Prisma, PlanetScale, Stripe",
            gallery: JSON.stringify([
                "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
            ])
        },
        {
            title: "Cyberpunk E-Commerce",
            slug: "cyberpunk-ecommerce",
            category: "E-Commerce",
            imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
            description: "High-performance fashion store with 3D product previews.",
            client: "CyberWear",
            year: "2024",
            problem: "Online fashion shopping lacks the tactile experience of a physical store.",
            solution: "We implemented Three.js to allow users to rotate and zoom in on 3D models of the clothing. Used Shopify Headless API for backend management.",
            result: "Returns decreased by 25% due to better product visualization.",
            content: "# Cyberpunk E-Commerce\n\n## The Vision\nCyberWear wanted a website that looked like it came from the year 2077.\n\n## 3D Integration\nWe optimized GLTF models to ensure fast load times even on mobile devices.",
            technologies: "Shopify Hydrogen, React Three Fiber, Tailwind CSS",
            gallery: JSON.stringify([
                "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1620641788427-b11e69631d7f?q=80&w=2065&auto=format&fit=crop"
            ])
        },
    ];

    for (const project of projects) {
        const existing = await prisma.portfolio.findUnique({ where: { slug: project.slug } });
        if (!existing) {
            await prisma.portfolio.create({ data: project });
            console.log(`Created project: ${project.title}`);
        }
    }

    // Seed Testimonials
    const testimonials = [
        {
            name: "Sarah Jenkins",
            role: "CEO at TechFlow",
            quote: "Kaze Kreativ transformed our digital presence. The attention to detail and technical expertise is unmatched.",
            imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
        },
        {
            name: "Michael Chen",
            role: "Founder of StartUpX",
            quote: "The best development team we've worked with. They delivered a complex platform ahead of schedule.",
            imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
        },
        {
            name: "Jessica Lee",
            role: "Marketing Director",
            quote: "Our conversion rates doubled after the redesign. The new site is fast, beautiful, and effective.",
            imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
        },
    ];

    for (const testimonial of testimonials) {
        const existing = await prisma.testimonial.findFirst({ where: { name: testimonial.name } });
        if (!existing) {
            await prisma.testimonial.create({ data: testimonial });
            console.log(`Created testimonial: ${testimonial.name}`);
        }
    }

    console.log("✅ Seeding complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
