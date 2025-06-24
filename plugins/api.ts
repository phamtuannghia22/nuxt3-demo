import { useCookieUniversal } from "~/composables/useCookieUniversal";

export default defineNuxtPlugin({
  name: "api",
  setup() {
    const config = useRuntimeConfig();

    const fqaApi = $fetch.create({
      baseURL: `${config.public.baseURL}/api/v1`,
      headers: {
        Authorization: "Bearer token_cứng",
        "Content-Type": "application/json",
      },
      onRequest({ options }) {
        console.log("Request:", options);
      },
      onResponse({ response }) {
        console.log("Response:", response);
      },
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
        const { getCookie } = useCookieUniversal();
        const fqa_auth = getCookie("fqa_auth");
        if (fqa_auth) {
          options.headers.set("Authorization", `Bearer ${fqa_auth}`);
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
