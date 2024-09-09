import { getActivePinia } from "pinia";
import { useAuthStore } from "~/stores/authStore";

export default defineNuxtRouteMiddleware((to) => {
  const toPathSegments = to.path.split("/").filter(Boolean);

  if (toPathSegments.at(0) === "platform") {
    const authStore = useAuthStore();

    if (authStore.isAuthenticated) return;

    const token = useCookie("token");

    console.log(token.value);

    if (token.value) {
      authStore.login();
      return;
    }

    return navigateTo("/auth/signin");
  }
});
