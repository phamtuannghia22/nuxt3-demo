import { defineStore } from "pinia";
import type  { UserInfo } from "@manual-types/fqaRes";

export const useStore = defineStore("storeId", {
  state: () => {
    return {
      isMobile: true,
      os: "",
      userInfo: {} as UserInfo,
      loggedIn: false,
      appConfig: {}
    };
  },
  actions: {
    setIsMobile(value: boolean) {
      this.isMobile = value;
    },
    setOs(value: string) {
      this.os = value;
    },
    setUserInfo(value: UserInfo ) {
      this.userInfo = value;
    },
    setLoggedIn(value: boolean) {
      this.loggedIn = value;
    },
    setAppConfig() {
      
    }
  },
});
