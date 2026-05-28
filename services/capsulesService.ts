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
    return apiClient.get<Capsule[]>(urls.capsules.capsules);
  },
  getById: async (id: string) => {
    return apiClient.get<CapsuleWithContent>(urls.capsules.getId(id));
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
};
