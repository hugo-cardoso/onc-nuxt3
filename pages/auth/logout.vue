<script lang="ts" setup>
const router = useRouter();
const token = useCookie("token");

const authStore = useAuthStore();

authStore.logout();
token.value = null;

await useFetch("/api/auth/logout", {
  headers: {
    Authorization: `Bearer ${token.value}`,
  },
});

router.replace("/");
</script>

<template>
  <div class="w-dvw h-dvh grid place-items-center px-3">
    <Card class="w-full max-w-[350px]">
      <CardHeader>
        <CardTitle>Logout</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="w-full flex justify-center items-center square">
          <LucideLoader2 class="w-10 h-10 animate-spin" />
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.square {
  aspect-ratio: 1 / 1;
}
</style>
