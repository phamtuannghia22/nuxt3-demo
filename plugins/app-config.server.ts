export default defineNuxtPlugin({
  name: "app-config",
  dependsOn: ["api", "redis"],
  async setup() {
    const state = useStore();
    await state.setAppConfig();
  },
});