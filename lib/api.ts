import { getCookieHeader, syncResponseCookies } from "@/lib/utils";
import { redirect } from "next/navigation";
import { urls } from "@/lib/api.urls";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  isRetry = false,
): Promise<{ data: T; headers: Headers }> {
  const url = `${BASE_URL}${endpoint}`;
  const defaultHeaders = {
    "Content-Type": "application/json",
  };
  const cookieHeader = await getCookieHeader();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
      Cookie: cookieHeader,
    },
  });

  if (
    response.status === 401 &&
    !isRetry &&
    endpoint !== urls.auth.login &&
    endpoint !== urls.auth.refresh
  ) {
    const refreshRes = await fetch(`${BASE_URL}${urls.auth.refresh}`, {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
      },
    });

    if (!refreshRes.ok) {
      redirect("/sign-in");
    }

    await syncResponseCookies(refreshRes);

    return apiFetch<T>(endpoint, options, true);
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = Array.isArray(errorData.message)
      ? errorData.message.join(", ")
      : errorData.message || "API Request failed";
    throw new Error(message);
  }

  const data = await response.json();
  await syncResponseCookies(response);
  return { data, headers: response.headers };
}

type FetchOptions = Omit<RequestInit, "method" | "body">;

export const apiClient = {
  get: async <T>(
    url: string,
    options?: FetchOptions,
  ): Promise<{ data: T; headers: Headers }> => {
    return apiFetch<T>(url, { ...options, method: "GET" });
  },

  post: async <T, B = unknown>(
    url: string,
    body?: B,
    options?: FetchOptions,
  ): Promise<{ data: T; headers: Headers }> => {
    return apiFetch<T>(url, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  patch: async <T, B = unknown>(
    url: string,
    body?: B,
    options?: FetchOptions,
  ): Promise<{ data: T; headers: Headers }> => {
    return apiFetch<T>(url, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  delete: async <T>(
    url: string,
    options?: FetchOptions,
  ): Promise<{ data: T; headers: Headers }> => {
    return apiFetch<T>(url, { ...options, method: "DELETE" });
  },
};
