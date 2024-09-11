// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "nuxt-lucide-icons",
    "@pinia/nuxt"
  ],
  css: ["~/assets/css/main.css"],
  vite: {
    optimizeDeps: {
      exclude: ['vee-validate']
    }
  },
  experimental: {
    typedPages: true
  }
});