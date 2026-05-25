import { apiClient } from "@/lib/api";
import { Capsule } from "@/types";
import { urls } from "@/lib/api.urls";

export const capsulesService = {
  getAll: async () => {
    return apiClient.get<Capsule[]>(urls.capsules.capsules);
  },
};
