<template>
  <div class="flex min-h-screen w-full flex-col">
    <header
      class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6"
    >
      <nav
        class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
      >
        <NuxtLink
          to="/platform"
          class="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <LucidePackage2 class="h-6 w-6" />
          <span class="sr-only">Acme Inc</span>
        </NuxtLink>
        <NuxtLink
          to="/platform"
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/platform/about"
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          About
        </NuxtLink>
        <NuxtLink
          to="/platform/user"
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          User
        </NuxtLink>
        <NuxtLink
          to="/auth/logout"
          class="text-red-600 transition-colors hover:text-foreground"
        >
          Logout
        </NuxtLink>
      </nav>
    </header>
    <main
      class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
    >
      <slot />
    </main>
  </div>
</template>
