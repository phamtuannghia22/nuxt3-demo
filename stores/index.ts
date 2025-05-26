import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      isMobile: true
    }
  },
  actions: {
    setMobile(value: boolean) {
      this.isMobile = value
    }
  }
})