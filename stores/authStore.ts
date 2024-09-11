import { defineStore } from "pinia";
import type { User } from "~/types/User";

type State = {
  user: User | null;
  isAuthenticated: boolean;
};

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: null,
      isAuthenticated: false,
    } as State;
  },
  actions: {
    async login() {
      this.isAuthenticated = true;
    },
    async logout() {
      this.isAuthenticated = false;
    },
    async refreshToken() {
      const token = useCookie("token");
      const refreshToken = useCookie("refresh_token");

      const response = await useNuxtApp().$api<{
        accessToken: string;
        refreshToken: string;
      }>("/api/auth/session/refresh", {
        method: "POST",
        body: JSON.stringify({
          refreshToken: refreshToken.value,
        }),
      });

      token.value = response.accessToken;
      refreshToken.value = response.refreshToken;
    },
    async fetchUser() {
      const user = await useNuxtApp().$api<User>("/api/user/me");

      this.user = user;
    },
  },
});
