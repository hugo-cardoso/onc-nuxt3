import { useAuthStore } from "~/stores/authStore";

export default defineNuxtRouteMiddleware(async (to) => {
  const toPathSegments = to.path.split("/").filter(Boolean);

  if (toPathSegments.at(0) === "platform") {
    const authStore = useAuthStore();

    if (authStore.isAuthenticated) return;

    const token = useCookie("token");

    console.log(token.value);

    if (token.value) {
      await authStore.login();

      if (!authStore.user) await authStore.fetchUser();

      return;
    }

    return navigateTo("/auth/signin");
  }
});
