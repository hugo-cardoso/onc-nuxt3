<script lang="ts" setup>
import type { Plan } from "@/types/Plan";
import { useToast } from "~/components/ui/toast";

definePageMeta({
  layout: "logged",
});

const { toast } = useToast();
const authStore = useAuthStore();

const isLoading = ref(false);

const { data: plans } = await useApi<Plan[]>("/api/plans");

const changePlan = async (id: string) => {
  isLoading.value = true;

  try {
    await useNuxtApp().$api("/api/plans/subscribe", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    await authStore.refreshToken();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await authStore.fetchUser();

    toast({
      title: "Success",
      description: "Plan changed successfully",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    });
  }

  isLoading.value = false;
};
</script>

<template>
  <div class="container flex flex-col gap-6">
    <PageBreadcrumb
      :items="[
        { text: 'Home', to: '/platform' },
        { text: 'User', to: '/platform/user' },
        { text: 'Plans' },
      ]"
    />
    <div class="flex items-center gap-4">
      <Button variant="outline" size="icon" class="h-7 w-7" as-child>
        <NuxtLink to="/platform/user">
          <LucideChevronLeft class="h-4 w-4" />
          <span class="sr-only">Back</span>
        </NuxtLink>
      </Button>
      <h1 class="text-xl">Plans</h1>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-5">
      <Card v-for="plan of plans">
        <CardHeader>
          <CardTitle>{{ plan.name }}</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </CardContent>
        <CardFooter class="border-t pt-6">
          <Button
            variant="outline"
            class="self-start"
            @click="() => changePlan(plan.id)"
            :disabled="plan.id === authStore.user?.role || isLoading"
            >Choose Plan</Button
          >
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
