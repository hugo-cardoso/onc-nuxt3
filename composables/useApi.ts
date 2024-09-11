import type { ArgumentsType } from "@vueuse/core";
import type { UseFetchOptions } from "nuxt/app";

type Paths = ArgumentsType<ReturnType<typeof useNuxtApp>["$api"]>[0];

export function useApi<T>(url: Paths, options?: UseFetchOptions<T>) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api,
  });
}
