"use server";

import { CreateUser, LoginUser } from "@/types";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { authService } from "@/services/authService";

export type AuthActionResult = {
  error?: string;
  success: boolean;
};

export async function signIn(
  data: LoginUser,
  redirectTo?: string | null,
): Promise<AuthActionResult> {
  try {
    await authService.signIn(data);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { error: e.message, success: false };
    }
    return { error: "Invalid Credentials", success: false };
  }
  redirect(redirectTo || "/dashboard");
}

export async function signUp(data: CreateUser): Promise<AuthActionResult> {
  try {
    await authService.signUp(data);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { error: e.message, success: false };
    }
    return { error: "Failed to create account", success: false };
  }
  redirect("/sign-in");
}

export async function signOut(): Promise<AuthActionResult> {
  try {
    await authService.signOut();
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
  } catch (e: unknown) {}
  redirect("/sign-in");
}
