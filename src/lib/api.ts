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

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  console.log("response status:", response.status);

  if (
    response.status === 401 &&
    !isRetry &&
    endpoint !== `${urls.auth.login}` &&
    endpoint !== `${urls.auth.refresh}`
  ) {
    console.log("i am heeerreee");
    try {
      const refreshRes = await fetch(`${BASE_URL}${urls.auth.refresh}`, {
        method: "POST",
        credentials: "include",
      });
      console.log("refresh res status:", refreshRes);

      if (refreshRes.ok) {
        return apiFetch<T>(endpoint, options, true);
      }
    } catch (e) {
      console.error("Token refresh failed", e);
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = Array.isArray(errorData.message)
      ? errorData.message.join(", ")
      : errorData.message || "API Request failed";
    throw new Error(message);
  }

  const data = await response.json();
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
