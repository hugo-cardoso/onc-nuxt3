<script lang="ts" setup>
useHead({
  htmlAttrs: {
    class: "dark",
  },
});

const { $api } = useNuxtApp();
const { data: modules } = await useAsyncData("modules", () => $api("/modules"));
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
      <ClientOnly>
        <Toaster />
      </ClientOnly>
    </NuxtLayout>
  </div>
</template>
