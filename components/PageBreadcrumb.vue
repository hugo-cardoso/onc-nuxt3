<script lang="ts" setup>
import type { ArgumentsType } from "@vueuse/core";
import type { RouteLocationRaw } from "vue-router";

type Paths = ArgumentsType<ReturnType<typeof useRouter>["push"]>[0];

defineProps<{
  items: { text: string; to?: Paths }[];
}>();
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <template v-for="(item, index) of items">
        <BreadcrumbLink :as-child="!!item.to">
          <NuxtLink :to="item.to as RouteLocationRaw" v-if="item.to">{{
            item.text
          }}</NuxtLink>
          <template v-else>{{ item.text }}</template>
        </BreadcrumbLink>
        <BreadcrumbSeparator v-if="index !== items.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
