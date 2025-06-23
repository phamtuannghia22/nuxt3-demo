import { UAParser } from "ua-parser-js";
import { useStore } from "~/stores";

export default defineNuxtPlugin({
  name: "detect-device",
  async setup(nuxtApp) {
    const ua = nuxtApp.ssrContext?.event?.node?.req?.headers["user-agent"] || "";
    const parser = new UAParser(ua);
    const result = parser.getResult();
    const state = useStore();
    state.setIsMobile(result?.device?.type === "mobile");
    state.setOs(result?.os?.name?.toLowerCase() || "");
  },
});
