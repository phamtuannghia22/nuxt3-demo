import { useStore } from "~/stores";
import type { AuthToken } from "@manual-types/fqaRes";

export default async function() {
  const state = useStore();
  const auth_cookie = useCookie("fqa_auth");
  const token: AuthToken = JSON.parse(JSON.stringify(auth_cookie.value || ""));
  if (token?.access_token) {
    try {
      console.log('ngu');
      const res = await useUserRepository().userInfo();
      if (res.msg.status === "success" && res.msg.code === "2000") {
        state.setUserInfo(res.data);
        state.setLoggedIn(true);
      }
    } catch (e) {
      if (import.meta.server) {
        console.error("user info server error:", e);
      } else {
        console.error(e);
      }
    }
  }
}