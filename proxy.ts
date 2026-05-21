import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/dashboard", "/capsules", "/settings"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const currentUrl = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) =>
    currentUrl.startsWith(route),
  );
  const isAuthRoute = authRoutes.includes(currentUrl);

  const hasAccessToken = request.cookies.has("access_token");
  const hasRefreshToken = request.cookies.has("refresh_token");
  console.log("hasRefreshToken", hasRefreshToken);
  console.log("cookie", request.cookies.get("refresh_token"));

  const isAuth = hasAccessToken || hasRefreshToken;

  if (isProtected && !isAuth) {
    const url = new URL("/sign-in", request.url);
    url.searchParams.set("from", currentUrl);
    return NextResponse.redirect(new URL(url));
  }

  if (isAuth && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/capsules/:path*",
    "/settings/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
