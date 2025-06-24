import repository from "~/repositories/Repository";
import { useStore } from "~/stores";

export default defineNuxtPlugin({
  name: "repositories",
  dependsOn: ["api"],
  setup(nuxtApp) {
    const store = useStore();
    const api = nuxtApp.$api as typeof $fetch;
    const authFetch = nuxtApp.$authFetch as typeof $fetch;
    return {
      provide: {
        repository: repository(api, authFetch, store.$state),
      },
    };
  },
});
