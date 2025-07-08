import { defineStore } from "pinia";
import type { UserInfo } from "@manual-types/fqaRes";
import type { AppConfig } from "@manual-types/appConfig";

export const useStore = defineStore("storeId", {
  state: () => {
    return {
      isMobile: true,
      os: "",
      userInfo: {} as UserInfo,
      loggedIn: false,
      appConfig: {} as AppConfig,
    };
  },
  actions: {
    setIsMobile(value: boolean) {
      this.isMobile = value;
    },
    setOs(value: string) {
      this.os = value;
    },
    setUserInfo(value: UserInfo) {
      this.userInfo = value;
    },
    setLoggedIn(value: boolean) {
      this.loggedIn = value;
    },
    async setAppConfig() {
      const { $qnaFetch, $redis } = useNuxtApp();
      try {
        if ($redis.status === "ready") {
          const pong = await $redis.ping();
          if (pong === "PONG") {
            const cache: any = await $redis.get("layout");
            const config: AppConfig = JSON.parse(cache)?.config;
            this.appConfig = config;
            return;
          }
        }
        const res: AppConfig = await $qnaFetch("config-homepage", {
          method: "GET",
        });
        this.appConfig = res;
      } catch (e) {
        console.error(e);
      }
    },
  },
});
