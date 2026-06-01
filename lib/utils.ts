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
    cookieStore.set(cookie.name, cookie.value, {
      httpOnly: cookie.httpOnly,
      secure: cookie.secure,
      sameSite: cookie.sameSite as "lax" | "strict" | "none",
      path: cookie.path,
      maxAge: cookie.maxAge,
      expires: cookie.expires,
    });
  }
}

export function mergeSetCookies(
  currentHeader: string,
  response: Response,
): string {
  const jar = new Map<string, string>();

  for (const pair of currentHeader.split("; ")) {
    if (!pair) continue;
    const eq = pair.indexOf("=");
    if (eq > 0) jar.set(pair.slice(0, eq), pair.slice(eq + 1));
  }

  for (const cookie of setCookieParser.parse(response.headers.getSetCookie())) {
    if (cookie.value === "" || cookie.maxAge === 0) {
      jar.delete(cookie.name);
    } else {
      jar.set(cookie.name, cookie.value);
    }
  }

  return [...jar.entries()]
    .map(([name, value]) => `${name}=${value}`)
    .join("; ");
}
