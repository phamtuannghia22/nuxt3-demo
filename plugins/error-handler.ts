export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.log("errorHandler");
    console.log(error);
  };
  
  nuxtApp.hook("vue:error", (error, instance, info) => {
    console.log("vue:error");
    console.log(error);
    const err = error as { statusCode?: number; statusMessage?: string };
    if (err.statusCode === 404) {
      navigateTo("/404");
    }
  });

  nuxtApp.hook("app:error", (err) => {
    console.log("app:error");
    console.error(err);
  });
});
