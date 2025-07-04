import type { AuthToken } from "@manual-types/fqaRes";
import { useStore } from "~/stores";
import { useUserRepository } from "~/composables/repositories/useUserRepository";

export default defineNuxtPlugin({
  name: "auth",
  dependsOn: ['api'],
  async setup() {
    const state = useStore();
    const auth_cookie = useCookie('fqa_auth');
    const token: AuthToken = JSON.parse(JSON.stringify(auth_cookie.value || ""));
    if (token?.access_token) {
      try {
        const res = await useUserRepository().userInfo();
        if (res.msg.status === "success" && res.msg.code === "2000") {
          state.setUserInfo(res.data);
          state.setLoggedIn(true);
        }
      } catch (e) {
        console.error("user info server error:", e);
      }
    }
  },
});
