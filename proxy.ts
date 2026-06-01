import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/capsules", "/settings"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const currentUrl = request.nextUrl.pathname;

  const isProtected =
    protectedRoutes.some((route) => currentUrl.startsWith(route)) &&
    !currentUrl.startsWith("/capsules/public");
  const isAuthRoute = authRoutes.includes(currentUrl);

  const hasAccessToken = request.cookies.has("access_token");

  if (isProtected && !hasAccessToken && request.method === "GET") {
    const url = new URL("/auth/refresh", request.url);
    url.searchParams.set("redirect", currentUrl);
    return NextResponse.redirect(url);
  }

  const isAuth = hasAccessToken || request.cookies.has("refresh_token");

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
