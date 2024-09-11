<script lang="ts" setup>
import type { User } from "@/types/User";

definePageMeta({
  layout: "logged",
});

const authStore = useAuthStore();

const user = authStore.user;
</script>

<template>
  <div class="container flex flex-col gap-6">
    <PageBreadcrumb
      :items="[{ text: 'Home', to: '/platform' }, { text: 'User' }]"
    />
    <h1 class="text-xl">User</h1>
    <Card class="w-full sm:w-1/2 md:w-1/3">
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent class="pt-6">
        <div class="w-full flex flex-col gap-5">
          <div class="w-full flex justify-between">
            <strong>Name:</strong>
            {{ user?.firstName }} {{ user?.lastName }}
          </div>
          <div class="w-full flex justify-between">
            <strong>Email:</strong>
            {{ user?.email }}
          </div>
          <div class="w-full flex justify-between">
            <strong>Plan:</strong>
            {{ user?.role }}
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex justify-end gap-3 border-t pt-6">
        <Button class="self-start" variant="outline" as-child>
          <NuxtLink to="/platform/user/plans">Change plan</NuxtLink>
        </Button>
        <Button class="self-start" variant="outline" as-child>
          <NuxtLink to="/platform/user/change-password"
            >Change Password</NuxtLink
          >
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
