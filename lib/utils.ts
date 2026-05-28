import { cookies } from "next/headers";
import * as setCookieParser from "set-cookie-parser";

export async function getCookieHeader() {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}

export async function syncResponseCookies(response: Response) {
  const setCookieHeader = response.headers.getSetCookie();
  if (!setCookieHeader || setCookieHeader.length === 0) return;

  const cookieStore = await cookies();
  const parsedCookies = setCookieParser.parse(setCookieHeader);

  for (const cookie of parsedCookies) {
    try {
      cookieStore.set(cookie.name, cookie.value, {
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite as "lax" | "strict" | "none",
        path: cookie.path,
        maxAge: cookie.maxAge,
        expires: cookie.expires,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
