<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";
import { useAuthStore } from "~/stores/authStore";
import { useToast } from "~/components/ui/toast";

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const router = useRouter();
const authStore = useAuthStore();
const token = useCookie("token");
const refresh_token = useCookie("refresh_token");

const isLoading = ref(false);

const { toast } = useToast();

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true;

  try {
    const response = await $fetch<{
      accessToken: string;
      refreshToken: string;
    }>("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(values),
    });
    isLoading.value = false;

    authStore.login();
    token.value = response.accessToken;
    refresh_token.value = response.refreshToken;

    router.push("/platform");
  } catch (error) {
    toast({
      title: "Error",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    });
  }

  isLoading.value = false;
});
</script>

<template>
  <form class="w-dvw h-dvh grid place-items-center px-3" @submit="onSubmit">
    <Card class="w-full max-w-[350px]">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent class="flex flex-col gap-5">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Your email address"
                v-bind="componentField"
                autocomplete="email"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <div class="flex justify-between">
              <FormLabel>Password</FormLabel>
              <NuxtLink
                to="/auth/forgot-password"
                className="ml-auto inline-block text-sm underline"
                >Forgot your password?</NuxtLink
              >
            </div>
            <FormControl>
              <Input
                type="password"
                placeholder="Create a password"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </CardContent>
      <CardFooter class="flex flex-col gap-4">
        <Button type="submit" class="w-full" :disabled="isLoading">
          <LucideLoader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />
          Continue
        </Button>
        <div class="text-center text-sm">
          Don't have an account?
          <NuxtLink to="/auth/signup" className="underline">Sign up</NuxtLink>
        </div>
      </CardFooter>
    </Card>
  </form>
</template>
