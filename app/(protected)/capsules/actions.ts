"use server";

import { ActionState } from "@/types";
import { capsulesService } from "@/services/capsulesService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCapsule(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const title = formData.get("title");
  const content = formData.get("content");
  const unlockAt = formData.get("unlockAt");
  const isPublic = formData.get("isPublic") === "on";

  const recipientsRaw = formData.get("recipients");
  const recipients = recipientsRaw ? JSON.parse(String(recipientsRaw)) : [];

  if (!title || !content || !unlockAt) {
    return { error: "Missing required fields" };
  }

  try {
    await capsulesService.create({
      title: String(title),
      content: String(content),
      unlockAt: String(unlockAt),
      isPublic,
      recipients,
    });

    // return { success: true };
  } catch {
    return { error: "Failed to create capsule" };
  }
  revalidatePath("/dashboard");
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateCapsule(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const capsuleId = formData.get("capsuleId") as string;
  const title = formData.get("title");
  const content = formData.get("content");
  const unlockAt = formData.get("unlockAt");
  const isPublic = formData.get("isPublic") === "on";

  const recipientsRaw = formData.get("recipients");
  const recipients = recipientsRaw ? JSON.parse(String(recipientsRaw)) : [];

  if (!capsuleId || !title || !content || !unlockAt) {
    return { error: "Missing required fields" };
  }

  try {
    await capsulesService.update(capsuleId, {
      title: String(title),
      content: String(content),
      unlockAt: String(unlockAt),
      isPublic,
      recipients,
    });
  } catch {
    return { error: "Failed to update capsule" };
  }
  revalidatePath("/dashboard");
  revalidatePath(`/capsules/${capsuleId}`);
  redirect(`/capsules/${capsuleId}`);
}

export async function deleteCapsule(capsuleId: string) {
  if (!capsuleId) {
    return { error: "Missing capsule id" };
  }

  try {
    await capsulesService.delete(capsuleId);

    // return { success: true };
  } catch {
    return { error: "Failed to delete capsule" };
  }
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
