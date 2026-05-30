export const urls = {
  auth: {
    login: "/auth/sign-in",
    register: "/auth/sign-up",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },
  users: {
    me: `/users/me`,
    password: "/users/me/password",
  },
  capsules: {
    capsules: "/capsules",
    received: "/capsules/received",
    getSlug: (slug: string): string =>
      `${urls.capsules.capsules}/public/${slug}`,
    getId: (id: string): string => `${urls.capsules.capsules}/${id}`,
    getIdEdit: (id: string): string => `${urls.capsules.capsules}/${id}/edit`,
    recipient: (id: string): string => `/capsule/${id}/recipients`,
    recipients: (id: string, email: string): string =>
      `/capsule/${id}/recipients/${email}`,
  },
};
