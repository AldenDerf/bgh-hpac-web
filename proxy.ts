import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/utils/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("session")?.value;

  // Define protected routes
  const isAdminRoute = pathname.startsWith("/admin");
  const isHpacRoute = pathname.startsWith("/hpac");
  const isEmployeeRoute = pathname.startsWith("/employee");

  if (isAdminRoute || isHpacRoute || isEmployeeRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const payload = await decrypt(session);
      const userType = payload.user.userType;

      // Admin can access everything
      if (userType === "ADMIN") {
        return NextResponse.next();
      }

      // HPAC member can access /hpac and /employee
      if (userType === "HPAC_MEMBER") {
        if (isAdminRoute) {
          return NextResponse.redirect(new URL("/hpac", request.url));
        }
        return NextResponse.next();
      }

      // Employee user can only access /employee
      if (userType === "EMPLOYEE") {
        if (isAdminRoute || isHpacRoute) {
          return NextResponse.redirect(new URL("/employee", request.url));
        }
        return NextResponse.next();
      }

      // Fallback for unknown role
      return NextResponse.redirect(new URL("/login", request.url));
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Redirect to dashboard if logged in and trying to access /login
  if (pathname === "/login" && session) {
    try {
      const payload = await decrypt(session);
      const userType = payload.user.userType;
      if (userType === "ADMIN") return NextResponse.redirect(new URL("/admin", request.url));
      if (userType === "HPAC_MEMBER") return NextResponse.redirect(new URL("/hpac", request.url));
      return NextResponse.redirect(new URL("/employee", request.url));
    } catch (error) {
      // Session invalid, continue to login
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/hpac/:path*", "/employee/:path*", "/login"],
};
