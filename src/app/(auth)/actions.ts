"use server";

import { ActionState } from "@/types";
import { apiFetch } from "@/lib/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

interface LoginResponse {
  message: string;
}

export async function loginAction(
  prevState: ActionState | null,
  formData: FormData,
) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log("email", email);
    const { data, headers } = await apiFetch<LoginResponse>("/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    console.log("headers", headers);
    console.log("data", data);
    const cookieStore = await cookies();
    console.log("refresh cookie", cookieStore.get("refresh_token"));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Sign in error";
    return { error: message };
  }
  redirect("/dashboard");
}
