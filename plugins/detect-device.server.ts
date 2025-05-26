import { UAParser } from 'ua-parser-js'
import { useStore } from "~/stores";

export default defineNuxtPlugin((nuxtApp) => {
  const ua = nuxtApp.ssrContext?.event?.node?.req?.headers['user-agent'] || ''
  const parser = new UAParser(ua)
  const result = parser.getResult()
  const state = useStore();
  state.setMobile(result.device.type === 'mobile')
})
