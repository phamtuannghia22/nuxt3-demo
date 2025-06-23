import repository from "~/repositories/Repository";
import { useStore } from "~/stores";

export default defineNuxtPlugin({
  name: "repositories",
  dependsOn: ["api"],
  setup(nuxtApp) {
    const store = useStore();
    const api = nuxtApp.$api as typeof $fetch;
    return {
      provide: {
        repository: repository(api, store.$state),
      },
    };
  },
});
