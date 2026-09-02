import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

/**
 * Gate everything under /admin except the login page itself.
 *
 * The signature is verified here rather than merely checking that a cookie
 * exists, so a forged cookie is rejected at the edge. Server actions verify
 * again — the middleware is the first line, not the only one.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (await verifySession(token, secret)) return NextResponse.next();

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
