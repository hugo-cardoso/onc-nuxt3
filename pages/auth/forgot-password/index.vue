<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";
import { useToast } from "~/components/ui/toast";

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const { toast } = useToast();

const isLoading = ref(false);

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true;

  try {
    await $fetch("/api/auth/password/reset/send-link", {
      method: "POST",
      body: JSON.stringify(values),
    });

    toast({
      title: "Reset link sent",
      description: "Please, check your email for the reset link.",
    });
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
        <CardTitle>Forgot password</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
      <CardFooter class="flex flex-col gap-4">
        <Button class="w-full" type="submit" :loading="isLoading">
          <LucideLoader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />
          Send reset link
        </Button>
        <NuxtLink to="/" className="text-center text-sm underline"
          >Back</NuxtLink
        >
      </CardFooter>
    </Card>
  </form>
</template>
