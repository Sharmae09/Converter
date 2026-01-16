// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  ssr: true,
  build: {
    transpile: ["vuetify"],
  },
  nitro: {
    preset: "static",
  },
  app: {
    head: {
      title: "ImageFC",
      link: [{ rel: "icon", type: "image/png", href: "/icon.jpg" }],
      meta: [
        { name: "robots", content: "index, follow" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
});
