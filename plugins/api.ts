export default defineNuxtPlugin({
  name: 'api',
  setup (nuxtApp) {
    const config = useRuntimeConfig();

    const customFetch = $fetch.create({
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

    return {
      provide: {
        api: customFetch,
      },
    };
  }
})