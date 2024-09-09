<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";
import { useToast } from "~/components/ui/toast";

const formSchema = toTypedSchema(
  z.object({
    password: z.string().min(6),
  })
);

const route = useRoute();
const router = useRouter();

const token = route.query.token as string;

const form = useForm({
  validationSchema: formSchema,
});

const { toast } = useToast();

const isLoading = ref(false);

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true;

  try {
    await $fetch("/api/auth/password/reset", {
      method: "POST",
      body: JSON.stringify({
        ...values,
        token,
      }),
    });

    toast({
      title: "Password changed",
      description: "Your password has been changed successfully.",
    });

    router.push("/auth/signin");
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
        <CardTitle>Change password</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Enter your new password"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </CardContent>
      <CardFooter class="flex flex-col gap-4">
        <Button class="w-full" type="submit" :loading="isLoading">
          <LucideLoader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />
          Continue
        </Button>
        <NuxtLink to="/" className="text-center text-sm underline"
          >Back</NuxtLink
        >
      </CardFooter>
    </Card>
  </form>
</template>
