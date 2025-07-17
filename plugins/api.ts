import type { AuthToken, FQAResponse, UserInfo } from "@manual-types/fqaRes";
import { useStore } from "~/stores";
import type { NitroFetchOptions } from "nitropack";

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
    const clearAuthState = () => {
      auth_cookie.value = null;
      state.setLoggedIn(false);
      state.setUserInfo({} as UserInfo);
    };
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
          clearAuthState();
        }
      },
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
      async onResponseError({ request, options, response }) {
        if (response.status === 401) {
          const token: AuthToken = JSON.parse(JSON.stringify(auth_cookie.value || ""));
          if (token?.refresh_token) {
            try {
              const resRefreshToken: FQAResponse<AuthToken> = await authFetch(
                `/auth/refresh-token?refreshToken=${token.refresh_token}`,
                {
                  method: "POST",
                },
              );
              if (resRefreshToken.msg.status === "success" && resRefreshToken.msg.code === "2000") {
                auth_cookie.value = JSON.stringify(resRefreshToken.data);
                if (!resRefreshToken.data?.access_token) {
                  return;
                }
                const optionsFetch = {
                  ...options,
                  headers: {
                    ...(options?.headers || {}),
                    authorization: resRefreshToken.data?.access_token,
                  },
                } as NitroFetchOptions<RequestInfo>;
                /* Call api again after refresh token */
                await $fetch(request, optionsFetch);
                return;
              }
            } catch (e) {
              clearAuthState();
              console.log("Error in onResponseError (case 401): ", e);
            }
          }
        }
        console.error("Response error:", response);
      },
    });

    const qnaFetch = $fetch.create({
      baseURL: `${config.public.qnaUrl}`,
      headers: {
        "Content-Type": "application/json",
      },
      onRequest({ options }) {},
      onResponse({ response }) {},
      onRequestError({ error }) {
        console.error("Request error:", error);
      },
      async onResponseError({ request, options, response }) {
        if (response.status === 401) {
          const token: AuthToken = JSON.parse(JSON.stringify(auth_cookie.value || ""));
          if (token?.refresh_token) {
            try {
              const resRefreshToken: FQAResponse<AuthToken> = await authFetch(
                `/auth/refresh-token?refreshToken=${token.refresh_token}`,
                {
                  method: "POST",
                },
              );
              if (resRefreshToken.msg.status === "success" && resRefreshToken.msg.code === "2000") {
                auth_cookie.value = JSON.stringify(resRefreshToken.data);
                if (!resRefreshToken.data?.access_token) {
                  return;
                }
                const optionsFetch = {
                  ...options,
                  headers: {
                    ...(options?.headers || {}),
                    authorization: resRefreshToken.data?.access_token,
                  },
                } as NitroFetchOptions<RequestInfo>;
                /* Call api again after refresh token */
                await $fetch(request, optionsFetch);
                return;
              }
            } catch (e) {
              clearAuthState();
              console.log("Error in onResponseError (case 401): ", e);
            }
          }
        }
        console.error("Response error:", response);
      },
    });

    return {
      provide: {
        fqaFetch: fqaFetch,
        authFetch: authFetch,
        qnaFetch: qnaFetch,
      },
    };
  },
});
