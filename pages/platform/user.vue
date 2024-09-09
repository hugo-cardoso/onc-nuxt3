<script lang="ts" setup>
definePageMeta({
  layout: "logged",
});

const token = useCookie("token");

const { data } = await useFetch<{ email: string }>("/api/user/me", {
  headers: {
    Authorization: `Bearer ${token.value}`,
  },
});
</script>

<template>
  <h1>User</h1>
  <p><strong>Email:</strong> {{ data?.email }}</p>
</template>
