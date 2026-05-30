import { apiClient } from "@/lib/api";
import {
  Capsule,
  CapsuleWithContent,
  CreateCapsule,
  UpdateCapsule,
} from "@/types";
import { urls } from "@/lib/api.urls";

export const capsulesService = {
  getAll: async () => {
    return apiClient.get<Capsule[]>(urls.capsules.capsules, {
      next: { tags: ["capsules"] },
    });
  },
  getReceived: async () => {
    return apiClient.get<Capsule[]>(urls.capsules.received, {
      next: { tags: ["capsules", "capsules-received"] },
    });
  },
  getById: async (id: string) => {
    return apiClient.get<CapsuleWithContent>(urls.capsules.getId(id), {
      next: { tags: ["capsules", `capsule-${id}`] },
    });
  },
  getByIdEdit: async (id: string) => {
    return apiClient.get<CapsuleWithContent>(urls.capsules.getIdEdit(id), {
      cache: "no-store",
    });
  },
  getBySlug: async (slug: string) => {
    return apiClient.get<CapsuleWithContent>(urls.capsules.getSlug(slug), {
      next: { tags: [`capsule-public-${slug}`] },
    });
  },
  create: async (data: CreateCapsule) => {
    return apiClient.post<Capsule, CreateCapsule>(urls.capsules.capsules, data);
  },
  update: async (id: string, data: UpdateCapsule) => {
    return apiClient.patch<Capsule, UpdateCapsule>(
      urls.capsules.getId(id),
      data,
    );
  },
  delete: async (id: string) => {
    return apiClient.delete<{ message: string }>(urls.capsules.getId(id));
  },
  addRecipient: async (id: string, email: string) => {
    return apiClient.post<{ message: string }, { email: string }>(
      urls.capsules.recipient(id),
      { email },
    );
  },
  removeRecipient: async (id: string, email: string) => {
    return apiClient.delete<{ message: string }>(
      urls.capsules.recipients(id, email),
    );
  },
};
