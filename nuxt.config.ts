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
      redisPass: "",
      fqaUrlCdn: "",
      firebaseApiKey: "",
      firebaseAuthDomain: "",
      firebaseProjectId: "",
      firebaseStorrageBucket: "",
      firebaseMessagingSenderId: "",
      firebaseAppId: "",
      firebaseMeasurementId: "",
    },
  },
  imports: {
    dirs: ["composables/repositories/**"],
  },
  css: ["~/assets/styles/main.css", "~/assets/styles/common.scss"],
  components: [{ path: "~/components/common/" }],
  image: {
    screens: {
      mobile: 767,
      tablet: 1023,
      laptop: 1279,
    },
    domains: [
      "minio.dev.ftech.ai",
      "play.google.com",
      "apps.apple.com",
      "minio.ftech.ai",
      "static.fqa.vn",
    ],
  },
  alias: {
    "@images": fileURLToPath(new URL("./assets/images", import.meta.url)),
    "@manual-types": fileURLToPath(new URL("./shared/types/manual", import.meta.url)),
    "@styles": fileURLToPath(new URL("./assets/styles", import.meta.url)),
  },
});
