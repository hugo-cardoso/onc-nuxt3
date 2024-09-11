<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";
import { useToast } from "~/components/ui/toast";

const formSchema = toTypedSchema(
  z.object({
    firstName: z.string().min(2, "Enter a valid first name"),
    lastName: z.string().min(2, "Enter a valid last name"),
    email: z.string().email(),
    password: z.string().min(6),
  })
);

const router = useRouter();

const form = useForm({
  validationSchema: formSchema,
});

const { toast } = useToast();

const isLoading = ref(false);

const onSubmit = form.handleSubmit(async (values) => {
  console.log(values);

  isLoading.value = true;

  try {
    const response = await $fetch<{ confirmUrl: string }>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      }),
    });

    toast({
      title: "Confirmation",
      description: "Please check your email to confirm your account.",
    });

    router.push(response.confirmUrl);
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
        <CardTitle>Sign up</CardTitle>
      </CardHeader>
      <CardContent class="flex flex-col gap-5">
        <div class="grid sm:grid-cols-2 gap-5">
          <FormField v-slot="{ componentField }" name="firstName">
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Your first name"
                  v-bind="componentField"
                  autocomplete="given-name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="lastName">
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Your last name"
                  v-bind="componentField"
                  autocomplete="family-name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

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
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Create a password"
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription>
              Password must be at least 6 characters
            </FormDescription>
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
          Already have an account?
          <NuxtLink to="/auth/signin" className="underline">Sign in</NuxtLink>
        </div>
      </CardFooter>
    </Card>
  </form>
</template>
