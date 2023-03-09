// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    apiSecret: "",
    public: {
      apiBase: "/api",
    },
  },
  alias: {
    "@": "/<rootDir>",
  },
  modules: ["@pinia/nuxt", "@sidebase/nuxt-auth"],
  css: ["~/assets/stylesheet/main.scss"],
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
});
