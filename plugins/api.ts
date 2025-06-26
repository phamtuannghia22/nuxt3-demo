export default defineNuxtPlugin({
  name: "api",
  setup() {
    const config = useRuntimeConfig();
    const { getCookie } = useCookieUniversal();

    const fqaApi = $fetch.create({
      baseURL: `${config.public.baseURL}/api/v1`,
      headers: {
        Authorization: "Bearer token_cứng",
        "Content-Type": "application/json",
      },
      onRequest({ options }) {
        console.log("Request:", options);
      },
      onResponse({ response }) {},
      onRequestError({ error }) {
        console.error("Request error:", error);
      },
      onResponseError({ response }) {
        console.error("Response error:", response);
        if (response.status === 401) {
          // await nuxtApp.runWithContext(() => navigateTo('/login'))
        }
      },
    });

    const authFetch = $fetch.create({
      baseURL: `${config.public.apiAuthenUrl}/api/v1`,
      headers: {
        "Content-Type": "application/json",
      },
      onRequest({ options }) {
        const auth = getCookie("fqa_auth");
        if (auth) {
          options.headers.set("Authorization", `Bearer ${auth}`);
        }
      },
      onResponse({ response }) {
        console.log("Response:", response);
      },
      onRequestError({ error }) {
        // console.error("Request error:", error);
      },
      onResponseError({ response }) {
        if (response.status === 401) {
          // await nuxtApp.runWithContext(() => navigateTo('/login'))
        }
      },
    });

    return {
      provide: {
        fqaApi: fqaApi,
        authFetch: authFetch,
      },
    };
  },
});
