<script lang="ts" setup>
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
  <div class="flex min-h-screen w-full flex-col">
    <header
      class="w-full sticky top-0 flex justify-between h-16 items-center gap-4 border-b bg-background px-4 md:px-6"
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
          exactActiveClass="!text-foreground"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/platform/about"
          class="text-muted-foreground transition-colors hover:text-foreground"
          activeClass="!text-foreground"
          v-if="user?.permissions.includes('about')"
        >
          About
        </NuxtLink>
        <NuxtLink
          to="/platform/user"
          class="text-muted-foreground transition-colors hover:text-foreground"
          activeClass="!text-foreground"
        >
          User
        </NuxtLink>
      </nav>
      <nav
        class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
      >
        <Button variant="destructive" size="icon" class="shrink-0" as-child>
          <NuxtLink to="/auth/signout">
            <LucideLogOut class="h-5 w-5" />
            <span class="sr-only">Sign out</span>
          </NuxtLink>
        </Button>
      </nav>
      <div class="sm:hidden w-full flex justify-between">
        <Sheet>
          <SheetTrigger as-child>
            <Button variant="outline" size="icon" class="shrink-0 md:hidden">
              <LucideMenu class="h-5 w-5" />
              <span class="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav class="grid gap-6 text-lg font-medium">
              <SheetClose as-child>
                <NuxtLink
                  to="/platform"
                  class="flex items-center gap-2 text-lg font-semibold"
                >
                  <LucidePackage2 class="h-6 w-6" />
                  <span class="sr-only">Acme Inc</span>
                </NuxtLink>
              </SheetClose>
              <SheetClose as-child>
                <NuxtLink
                  to="/platform"
                  class="text-muted-foreground hover:text-foreground"
                >
                  Home
                </NuxtLink>
              </SheetClose>
              <SheetClose as-child>
                <NuxtLink
                  to="/platform/about"
                  class="text-muted-foreground hover:text-foreground"
                  v-if="user?.permissions.includes('about')"
                >
                  About
                </NuxtLink>
              </SheetClose>
              <SheetClose as-child>
                <NuxtLink
                  to="/platform/user"
                  class="text-muted-foreground hover:text-foreground"
                >
                  User
                </NuxtLink>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
        <Button
          variant="destructive"
          size="icon"
          class="shrink-0 md:hidden"
          as-child
        >
          <NuxtLink to="/auth/signout">
            <LucideLogOut class="h-5 w-5" />
            <span class="sr-only">Sign out</span>
          </NuxtLink>
        </Button>
      </div>
    </header>
    <main
      class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 py-4 md:gap-8 md:p-10"
    >
      <NuxtLoadingIndicator />
      <slot />
    </main>
  </div>
</template>
