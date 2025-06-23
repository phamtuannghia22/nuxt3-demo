// https://nuxt.com/docs/api/configuration/nuxt-config
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
    },
  },
});
