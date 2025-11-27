import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isOnDashboard = req.nextUrl.pathname.startsWith("/admin/dashboard");
    const isOnLogin = req.nextUrl.pathname.startsWith("/admin/login");

    if (isOnDashboard && !isLoggedIn) {
        return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
    }

    if (isOnLogin && isLoggedIn) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/admin/:path*"],
};
