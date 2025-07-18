import type { AuthToken } from "@manual-types/fqaRes";
import { useStore } from "~/stores";

export default defineNuxtPlugin({
  name: "auth",
  dependsOn: ["api"],
  async setup() {
    await useGetUserInfo();
  },
});
