<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";
import { useToast } from "~/components/ui/toast";

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    code: z.string().length(6),
  })
);

const route = useRoute();
const email = route.query.email as string;

const { toast } = useToast();

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    email,
  },
  keepValuesOnUnmount: true,
});

const isLoading = ref(false);
const isLoadingResendCode = ref(false);

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true;

  try {
    await $fetch("/api/auth/signup/validate", {
      method: "POST",
      body: JSON.stringify(values),
    });
  } catch (error) {
    toast({
      title: "Something went wrong",
      description: "Please try again later",
    });
  }

  isLoading.value = false;
});

const resendCode = async () => {
  isLoadingResendCode.value = true;

  try {
    await $fetch("/api/auth/signup/send-validation-code", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  } catch (error) {
    toast({
      title: "Something went wrong",
      description: "Please try again later",
    });
  }

  isLoadingResendCode.value = false;
};
</script>

<template>
  <form class="w-dvw h-dvh grid place-items-center px-3" @submit="onSubmit">
    <Card class="w-full max-w-[350px]">
      <CardHeader>
        <CardTitle>Confirm E-mail</CardTitle>
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
                disabled
                readonly
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="code">
          <FormItem>
            <FormLabel>Code</FormLabel>
            <FormControl>
              <div class="flex w-full max-w-sm items-center gap-2">
                <Input
                  type="text"
                  placeholder="Your code"
                  v-bind="componentField"
                />
                <Button
                  type="button"
                  variant="secondary"
                  @click="resendCode"
                  :disabled="isLoadingResendCode"
                >
                  <LucideLoader2
                    class="w-4 h-4 mr-2 animate-spin"
                    v-if="isLoadingResendCode"
                  />
                  Resend Code
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </CardContent>
      <CardFooter>
        <Button type="submit" class="w-full" :disabled="isLoading">
          <LucideLoader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />
          Continue
        </Button>
      </CardFooter>
    </Card>
  </form>
</template>
