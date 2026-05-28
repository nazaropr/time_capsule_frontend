import { NextRequest, NextResponse } from "next/server";
import { urls } from "@/lib/api.urls";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function GET(request: NextRequest) {
  const redirectTo =
    request.nextUrl.searchParams.get("redirect") || "/dashboard";
  const url = new URL(redirectTo, request.url);

  const refreshToken = request.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const refreshRes = await fetch(`${API_URL}${urls.auth.refresh}`, {
    method: "POST",
    headers: {
      Cookie: `refresh_token=${refreshToken}`,
    },
  });

  if (!refreshRes.ok) {
    const response = NextResponse.redirect(new URL("/sign-in", request.url));
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  }

  const response = NextResponse.redirect(url);

  const setCookieHeader = refreshRes.headers.get("set-cookie");

  if (setCookieHeader) {
    response.headers.set("set-cookie", setCookieHeader);
  }
  return response;
}
