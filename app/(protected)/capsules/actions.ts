"use server";

import { ActionState } from "@/types";
import { capsulesService } from "@/services/capsulesService";
import { revalidateTag } from "next/cache";
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
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT")
      throw error;
    return { error: "Failed to create capsule" };
  }
  revalidateTag("capsules", "default");
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

  const initialRecipientsRaw = formData.get("initialRecipients");
  const initialRecipients = initialRecipientsRaw
    ? JSON.parse(String(initialRecipientsRaw))
    : [];

  if (!capsuleId || !title || !content || !unlockAt) {
    return { error: "Missing required fields" };
  }

  try {
    await capsulesService.update(capsuleId, {
      title: String(title),
      content: String(content),
      unlockAt: String(unlockAt),
      isPublic,
    });

    const initialEmails = new Set<string>(
      initialRecipients.map((r: any) => String(r.email)),
    );
    const newEmails = new Set<string>(
      recipients.map((r: any) => String(r.email)).filter(Boolean),
    );

    const toAdd = [...newEmails].filter((email) => !initialEmails.has(email));
    const toRemove = [...initialEmails].filter(
      (email) => !newEmails.has(email),
    );

    for (const email of toAdd) {
      try {
        await capsulesService.addRecipient(capsuleId, email);
      } catch (err) {
        console.error("Failed to add recipient", email, err);
      }
    }

    for (const email of toRemove) {
      try {
        await capsulesService.removeRecipient(capsuleId, email);
      } catch (err) {
        console.error("Failed to remove recipient", email, err);
      }
    }
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT")
      throw error;
    return { error: "Failed to update capsule" };
  }
  revalidateTag("capsules", "default");
  revalidateTag(`capsule-${capsuleId}`, "default");
  redirect(`/capsules/${capsuleId}`);
}

export async function deleteCapsule(capsuleId: string) {
  if (!capsuleId) {
    return { error: "Missing capsule id" };
  }

  try {
    console.log("Removing capsule");
    const response = await capsulesService.delete(capsuleId);
    console.log("RESPONSE: ", response);

    // return { success: true };
  } catch (error) {
    console.log("ERROROROROR", error);
    if (error instanceof Error && error.message === "NEXT_REDIRECT")
      throw error;
    return { error: "Failed to delete capsule" };
  }
  revalidateTag("capsules", "default");
  revalidateTag(`capsule-${capsuleId}`, "default");
  redirect("/dashboard");
}
