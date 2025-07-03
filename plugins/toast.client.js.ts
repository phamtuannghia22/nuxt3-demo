// https://vue3-toastify.js-bridge.com/usage/nuxt.html
import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, { autoClose: 1000 });

  return {
    provide: { toast },
  };
});