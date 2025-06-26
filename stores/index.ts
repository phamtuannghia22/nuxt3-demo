import { defineStore } from "pinia";
import type  { UserInfo } from "~/types/manual/fqaRes";

export const useStore = defineStore("storeId", {
  // arrow function recommended for full type inference
  state: () => {
    return {
      isMobile: true,
      os: "",
      userInfo: {} as UserInfo,
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
  },
});
