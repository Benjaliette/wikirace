// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: "",
    public: {
      apiBase: "/api",
    },
  },
  alias: {
    "@": "/<rootDir>",
  },
  css: ["~/assets/stylesheet/main.scss"],
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
});
