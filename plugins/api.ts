import type { AuthToken, FQAResponse } from "~/types/manual/fqaRes";

export default defineNuxtPlugin({
  name: "api",
  setup() {
    const config = useRuntimeConfig();
    const auth_cookie = useCookie("fqa_auth", {
      expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365),
      path: "/",
      sameSite: "lax",
      secure: true,
    });
    // console.log(auth_cookie.value);

    const fqaFetch = $fetch.create({
      baseURL: `${config.public.apiUrl}/api/v1`,
      headers: {
        "Content-Type": "application/json",
      },
      onRequest({ options }) {
        // const auth = getCookie("fqa_auth");
        // const token: AuthToken = JSON.parse(JSON.stringify(auth || ""));
        // if (token?.access_token) {
        //   options.headers.set("Authorization", `Bearer ${token.access_token}`);
        // }
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
        // const auth = getCookie("fqa_auth");
        // const token: AuthToken = JSON.parse(`${auth}`);
        // if (token.access_token) {
        //   options.headers.set("Authorization", `Bearer ${token.access_token}`);
        // }
      },
      onResponse({ response }) {
        if (response.url.includes("auth/login")) {
          const res = response._data as FQAResponse<AuthToken>;
          if (res.msg.status === "success" && res.msg.code === "2000") {
            auth_cookie.value = JSON.stringify(res.data);
          }
        }
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
