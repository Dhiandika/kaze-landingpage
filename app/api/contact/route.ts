import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        // 1. Save to Database
        const savedMessage = await prisma.message.create({
            data: { name, email, message },
        });

        // 2. Send Email Notification (if API Key exists)
        if (process.env.RESEND_API_KEY) {
            try {
                await resend.emails.send({
                    from: "onboarding@resend.dev", // Default Resend test domain
                    to: ["hello@kazekreativ.my.id"], // Send to admin
                    subject: `New Lead: ${name}`,
                    html: `
                        <h1>New Project Inquiry</h1>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Message:</strong></p>
                        <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #ccc;">
                            ${message}
                        </blockquote>
                        <a href="https://kazekreativ.my.id/admin/messages" style="display: inline-block; padding: 10px 20px; background: #000; color: #fff; text-decoration: none; border-radius: 5px;">
                            View in Admin
                        </a>
                    `,
                });
            } catch (emailError) {
                console.error("Failed to send email:", emailError);
            }
        }

        return NextResponse.json(savedMessage);
    } catch (error) {
        console.error("Contact Error:", error);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}
