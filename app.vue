<script lang="ts" setup>

useHead({
  htmlAttrs: {
    class: "dark",
  }
})

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
