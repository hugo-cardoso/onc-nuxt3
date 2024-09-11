<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";
import { useToast } from "~/components/ui/toast";

const formSchema = toTypedSchema(
  z.object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6),
  })
);

definePageMeta({
  layout: "logged",
});

const form = useForm({
  validationSchema: formSchema,
});

const isLoading = ref(false);
const { toast } = useToast();

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true;

  try {
    await useNuxtApp().$api("/api/user/change-password", {
      method: "POST",
      body: JSON.stringify(values),
    });

    toast({
      title: "Success",
      description: "Password changed successfully",
    });

    form.resetForm();
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
  <div class="container flex flex-col gap-6">
    <PageBreadcrumb
      :items="[
        { text: 'Home', to: '/platform' },
        { text: 'User', to: '/platform/user' },
        { text: 'Change Password' },
      ]"
    />
    <div class="flex items-center gap-4">
      <Button variant="outline" size="icon" class="h-7 w-7" as-child>
        <NuxtLink to="/platform/user">
          <LucideChevronLeft class="h-4 w-4" />
          <span class="sr-only">Back</span>
        </NuxtLink>
      </Button>
      <h1 class="text-xl">Change Password</h1>
    </div>
    <form class="w-full sm:w-1/2 md:w-1/3" @submit="onSubmit">
      <Card>
        <CardContent class="pt-6 flex flex-col gap-5">
          <FormField v-slot="{ componentField }" name="oldPassword">
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Your old password"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="newPassword">
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Your new password"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </CardContent>
        <CardFooter>
          <Button type="submit" :disabled="isLoading">
            <LucideLoader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />
            Update
          </Button>
        </CardFooter>
      </Card>
    </form>
  </div>
</template>
