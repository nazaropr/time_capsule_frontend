import { NextRequest, NextResponse } from "next/server";
import { urls } from "@/lib/api.urls";
import * as setCookieParser from "set-cookie-parser";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function GET(request: NextRequest) {
  const redirectTo =
    request.nextUrl.searchParams.get("redirect") || "/dashboard";
  const url = new URL(redirectTo, request.url);

  const refreshToken = request.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url), 303);
  }

  const refreshRes = await fetch(`${API_URL}${urls.auth.refresh}`, {
    method: "POST",
    headers: {
      Cookie: `refresh_token=${refreshToken}`,
    },
  });

  if (!refreshRes.ok) {
    const response = NextResponse.redirect(new URL("/sign-in", request.url), 303);
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  }

  const response = NextResponse.redirect(url, 303);

  for (const cookie of setCookieParser.parse(refreshRes.headers.getSetCookie())) {
    response.cookies.set(cookie.name, cookie.value, {
      httpOnly: cookie.httpOnly,
      secure: cookie.secure,
      sameSite: cookie.sameSite as "lax" | "strict" | "none",
      path: cookie.path,
      maxAge: cookie.maxAge,
      expires: cookie.expires,
    });
  }
  return response;
}

export const POST = GET;
