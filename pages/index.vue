<template>
  <div class="w-dvw h-dvh grid place-items-center px-3">
    <div class="flex gap-3">
      <Button as-child>
        <NuxtLink to="/auth/signin">Sign in</NuxtLink>
      </Button>
      <Button variant="secondary" as-child>
        <NuxtLink to="/auth/signup">Sign up</NuxtLink>
      </Button>
    </div>
  </div>
</template>
