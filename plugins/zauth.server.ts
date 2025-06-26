import type { AuthToken } from "~/types/manual/fqaRes";
import { useStore } from "~/stores";

export default defineNuxtPlugin({
  name: "auth",
  async setup(nuxtApp) {
    const { $repository } = nuxtApp as ReturnType<typeof useNuxtApp>;
    const state = useStore();
    const { getCookie } = useCookieUniversal();
    const auth = getCookie("fqa_auth");
    const token: AuthToken = JSON.parse(JSON.stringify(auth || ""));
    if (token?.access_token) {
      try {
        // const res = await $repository.user.userInfo();
        // if (res.msg.status === "success" && res.msg.code === "2000") {
        //   state.setUserInfo(res.data);
        // }
      } catch (e) {
        console.error("user info server error:", e);
      }
    }
  },
});
