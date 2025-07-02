// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from 'url';

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: ["@nuxt/fonts", "@nuxt/image", "@nuxt/scripts", "@pinia/nuxt"],
  $development: {
    devtools: { enabled: true },
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: "",
    // Keys within public are also exposed client-side
    public: {
      baseUrl: "",
      apiAuthenUrl: "",
      apiUrl: "",
    },
  },
  imports: {
    dirs: ["composables/repositories/**"],
  },
  css: ["~/assets/styles/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  components: [{ path: "~/components/common/" }],
  image: {
    screens: {
      "mobile": 767,
      "tablet": 1023,
      "laptop": 1279,
    },
  },
  alias: {
    '@images': fileURLToPath(new URL('./assets/images', import.meta.url)),
  }
});
