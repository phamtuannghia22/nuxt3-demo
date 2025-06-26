import type { AuthToken } from "~/types/manual/fqaRes";

export default defineNuxtPlugin({
  name: "api",
  setup() {
    const config = useRuntimeConfig();
    const { getCookie } = useCookieUniversal();

    const fqaFetch = $fetch.create({
      baseURL: `${config.public.apiUrl}/api/v1`,
      headers: {
        "Content-Type": "application/json",
      },
      onRequest({ options }) {
        const auth = getCookie("fqa_auth");
        const token: AuthToken = JSON.parse(JSON.stringify(auth || ""));
        if (token?.access_token) {
          options.headers.set("Authorization", `Bearer ${token.access_token}`);
        }
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
        const token: AuthToken = JSON.parse(`${auth}`);
        if (token.access_token) {
          options.headers.set("Authorization", `Bearer ${token.access_token}`);
        }
      },
      onResponse({ response }) {
        // console.log("Response:", response);
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
        fqaFetch: fqaFetch,
        authFetch: authFetch,
      },
    };
  },
});
