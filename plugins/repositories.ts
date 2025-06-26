import repository from "~/repositories/Repository";
import { useStore } from "~/stores";

export default defineNuxtPlugin({
  name: "repositories",
  dependsOn: ["api"],
  setup(nuxtApp) {
    const store = useStore();
    const { $fqaFetch, $authFetch } = nuxtApp;
    return {
      provide: {
        repository: repository(
          $fqaFetch as typeof $fetch,
          $authFetch as typeof $fetch,
          store.$state,
        ),
      },
    };
  },
});
