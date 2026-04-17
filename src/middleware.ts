import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/cart", "/checkout", "/orders", "/wishlist", "/account", "/products", "/categories", "/blog", "/posts", "/comments", "/tags"];


export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("token")?.value || null;
    const isAuthenticated = !!token;
    const isProtectedRoute = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

    if (isProtectedRoute && !isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}