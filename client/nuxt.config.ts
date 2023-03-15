// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    apiSecret: "",
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
  alias: {
    "@": "/<rootDir>",
  },
  modules: ["@pinia/nuxt"],
  css: ["~/assets/stylesheet/main.scss"],
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/stylesheet/config/index.scss";',
        },
      },
    },
    server: {
      hmr: {
        protocol: "ws",
      },
    },
  },
});
