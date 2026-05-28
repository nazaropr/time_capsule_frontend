import { CreateUser, LoginUser, User } from "@/types";
import { apiClient } from "@/lib/api";
import { urls } from "@/lib/api.urls";

export const authService = {
  signIn: async (data: LoginUser) => {
    return apiClient.post<{ message: string }, LoginUser>(
      urls.auth.login,
      data,
    );
  },
  signUp: async (data: CreateUser) => {
    return apiClient.post<User, CreateUser>(urls.auth.register, data);
  },
  signOut: async () => {
    return apiClient.post(urls.auth.logout);
  },
};
