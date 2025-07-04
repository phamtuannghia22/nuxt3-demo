import type { Emitter } from "mitt";
import mitt from "mitt";

export default defineNuxtPlugin((nuxtApp) => {
  type Events = Record<string, unknown>;
  const emitter: Emitter<Events> = mitt();
  return {
    provide: {
      emitter,
    },
  };
});
