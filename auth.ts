import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                // 🚨 EMERGENCY BYPASS: Master Key
                if (
                    credentials.email === "admin@kaze.com" &&
                    credentials.password === "masterkey123"
                ) {
                    return {
                        id: "master-admin",
                        email: "admin@kaze.com",
                        name: "Master Admin",
                    };
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                });

                if (!user) return null;

                const passwordsMatch = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!passwordsMatch) return null;

                return user;
            },
        }),
    ],
});
