// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: "src",
  build: {
    transpile: ["vuetify"],
  },
  runtimeConfig: {
    GAS_URL: "",
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  css: ["~/assets/css/style.css"],
  ssr: true,
  routeRules: {
    "/map": { ssr: false },
    "/server/api/**": { ssr: false },
  },
});
