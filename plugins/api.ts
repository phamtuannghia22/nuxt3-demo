import type { AuthToken, FQAResponse, UserInfo } from "~/types/manual/fqaRes";
import { useStore } from "~/stores";

export default defineNuxtPlugin({
  name: "api",
  setup() {
    const config = useRuntimeConfig();
    const state = useStore();
    const auth_cookie = useCookie("fqa_auth", {
      expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365),
      path: "/",
      sameSite: "lax",
      secure: true,
    });

    const fqaFetch = $fetch.create({
      baseURL: `${config.public.apiUrl}/api/v1`,
      headers: {
        "Content-Type": "application/json",
      },
      onRequest({ options }) {
        const token: AuthToken = JSON.parse(JSON.stringify(auth_cookie.value || ""));
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
      onResponse({ response }) {
        if (response.url.includes("auth/login")) {
          const res = response._data as FQAResponse<AuthToken>;
          if (res.msg.status === "success" && res.msg.code === "2000") {
            auth_cookie.value = JSON.stringify(res.data);
            state.setLoggedIn(true);
          }
        }
      },
      onRequestError({ error }) {
        console.error("Request error:", error);
      },
      onResponseError({ response }) {
        if (response.status === 401) {
          auth_cookie.value = null;
          state.setLoggedIn(false);
          state.setUserInfo({} as UserInfo);
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
