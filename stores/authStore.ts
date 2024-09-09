import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    async login() {
      this.isAuthenticated = true;
    },
    async logout() {
      this.isAuthenticated = false;
    },
  },
});
