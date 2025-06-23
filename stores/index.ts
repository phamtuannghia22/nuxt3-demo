import { defineStore } from "pinia";

export const useStore = defineStore("storeId", {
  // arrow function recommended for full type inference
  state: () => {
    return {
      isMobile: true,
      os: "",
    };
  },
  actions: {
    setIsMobile(value: boolean) {
      this.isMobile = value;
    },
    setOs(value: string) {
      this.os = value;
    },
  },
});
