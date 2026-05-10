import {
  ADMIN_ACCESS_COOKIE,
  JWT_AUD_DEFAULT,
  JWT_ISS_DEFAULT,
} from "@/lib/auth/constants";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

function isPublicAdminLoginPath(pathname: string): boolean {
  return pathname === "/admin" || pathname === "/admin/";
}

function needsAdminJwt(pathname: string): boolean {
  if (!pathname.startsWith("/admin")) {
    return false;
  }
  return !isPublicAdminLoginPath(pathname);
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!needsAdminJwt(pathname)) {
    return NextResponse.next();
  }

  const secretRaw = process.env.JWT_SECRET;
  if (!secretRaw) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  const token = request.cookies.get(ADMIN_ACCESS_COOKIE)?.value;
  try {
    const key = new TextEncoder().encode(secretRaw);
    await jwtVerify(token ?? "", key, {
      issuer: process.env.JWT_ISSUER ?? JWT_ISS_DEFAULT,
      audience: process.env.JWT_AUDIENCE ?? JWT_AUD_DEFAULT,
    });
  } catch {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
