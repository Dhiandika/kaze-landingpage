import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/admin/dashboard");
            const isOnLogin = nextUrl.pathname.startsWith("/admin/login");

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isOnLogin) {
                if (isLoggedIn) {
                    return Response.redirect(new URL("/admin/dashboard", nextUrl));
                }
                return true;
            }
            return true;
        },
        async session({ session, token }) {
            if (session?.user && token?.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
