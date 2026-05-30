import {
  CreateUser,
  LoginUser,
  User,
  UpdatePassword,
  UpdateProfile,
} from "@/types";
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
  getMe: async () => {
    return apiClient.get<User>(urls.users.me);
  },
  updateProfile: async (data: UpdateProfile) => {
    return apiClient.patch<User, UpdateProfile>(urls.users.me, data);
  },
  updatePassword: async (data: UpdatePassword) => {
    console.log("data:", data);
    return apiClient.patch<{ message: string }, UpdatePassword>(
      urls.users.password,
      data,
    );
  },
  deleteAccount: async () => {
    return apiClient.delete<{ message: string }>(urls.users.me);
  },
};
