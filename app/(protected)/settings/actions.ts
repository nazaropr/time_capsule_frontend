"use server";

import { ActionState } from "@/types";
import { authService } from "@/services/authService";
import { UnauthorizedError } from "@/lib/errors";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function updateProfileAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name || !email) {
    return { error: "Name and Email are required" };
  }

  try {
    await authService.updateProfile({ name, email });
    revalidatePath("/settings");
    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    if (error instanceof UnauthorizedError) redirect("/sign-in");
    return { error: "Failed to update profile" };
  }
}

export async function updatePasswordAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "All password fields are required" };
  }

  if (newPassword !== confirmPassword) {
    return { error: "New passwords do not match" };
  }

  if (newPassword.length < 8) {
    return { error: "New password must be at least 8 characters long" };
  }

  try {
    await authService.updatePassword({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    revalidatePath("/settings");
    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    if (error instanceof UnauthorizedError) redirect("/sign-in");
    return {
      error:
        error instanceof Error ? error.message : "Failed to update password",
    };
  }
}

export async function deleteAccountAction() {
  try {
    await authService.deleteAccount();
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
  } catch (error) {
    if (error instanceof UnauthorizedError) redirect("/sign-in");
    return { error: "Failed to delete account" };
  }

  redirect("/sign-in");
}
