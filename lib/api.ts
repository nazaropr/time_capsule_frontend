import {
  getCookieHeader,
  syncResponseCookies,
  mergeSetCookies,
} from "@/lib/utils";
import { UnauthorizedError } from "@/lib/errors";
import { urls } from "@/lib/api.urls";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type ApiContext = {
  canWriteCookies?: boolean;
  isRetry?: boolean;
  cookieOverride?: string;
};

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  ctx: ApiContext = {},
): Promise<{ data: T; headers: Headers }> {
  const { canWriteCookies = false, isRetry = false, cookieOverride } = ctx;

  const cookieHeader = cookieOverride ?? (await getCookieHeader());
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
      Cookie: cookieHeader,
    },
  });

  const isAuthEndpoint =
    endpoint === urls.auth.login || endpoint === urls.auth.refresh;

  if (response.status === 401 && !isRetry && !isAuthEndpoint) {
    if (!canWriteCookies) {
      throw new UnauthorizedError();
    }

    const refreshRes = await fetch(`${BASE_URL}${urls.auth.refresh}`, {
      method: "POST",
      headers: { Cookie: cookieHeader },
    });

    if (!refreshRes.ok) {
      throw new UnauthorizedError();
    }

    await syncResponseCookies(refreshRes);

    const refreshedHeader = mergeSetCookies(cookieHeader, refreshRes);

    return apiFetch<T>(endpoint, options, {
      canWriteCookies,
      isRetry: true,
      cookieOverride: refreshedHeader,
    });
  }

  if (response.status === 401 && !isAuthEndpoint) {
    throw new UnauthorizedError();
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = Array.isArray(errorData.message)
      ? errorData.message.join(", ")
      : errorData.message || "API Request failed";
    throw new Error(message);
  }

  const text = await response.text();
  const data = text ? (JSON.parse(text) as T) : ({} as T);
  if (canWriteCookies) {
    await syncResponseCookies(response);
  }
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
    return apiFetch<T>(
      url,
      {
        ...options,
        method: "POST",
        body: body ? JSON.stringify(body) : undefined,
      },
      { canWriteCookies: true },
    );
  },

  patch: async <T, B = unknown>(
    url: string,
    body?: B,
    options?: FetchOptions,
  ): Promise<{ data: T; headers: Headers }> => {
    return apiFetch<T>(
      url,
      {
        ...options,
        method: "PATCH",
        body: body ? JSON.stringify(body) : undefined,
      },
      { canWriteCookies: true },
    );
  },

  delete: async <T>(
    url: string,
    options?: FetchOptions,
  ): Promise<{ data: T; headers: Headers }> => {
    return apiFetch<T>(
      url,
      { ...options, method: "DELETE" },
      { canWriteCookies: true },
    );
  },
};
