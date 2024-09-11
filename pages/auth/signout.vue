<script lang="ts" setup>
const router = useRouter();
const token = useCookie("token");

const authStore = useAuthStore();

await useApi("/api/auth/signout");

authStore.logout();
token.value = null;

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
