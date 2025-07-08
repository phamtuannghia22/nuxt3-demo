// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "url";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: ["@nuxt/fonts", "@nuxt/image", "@nuxt/scripts", "@pinia/nuxt", "@unocss/nuxt"],
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
      qnaUrl: "",
      redisPort: "",
      redisHost: "",
      redisPass: ""
    },
  },
  imports: {
    dirs: ["composables/repositories/**"],
  },
  css: ["~/assets/styles/main.css"],
  components: [{ path: "~/components/common/" }],
  image: {
    screens: {
      mobile: 767,
      tablet: 1023,
      laptop: 1279,
    },
  },
  alias: {
    "@images": fileURLToPath(new URL("./assets/images", import.meta.url)),
    "@manual-types": fileURLToPath(new URL("./shared/types/manual", import.meta.url)),
  },
});
