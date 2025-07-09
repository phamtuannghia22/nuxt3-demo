import type { Emitter } from "mitt";
import mitt from "mitt";

export default defineNuxtPlugin({
  name: "emitter",
  setup() {
    type Events = Record<string, unknown>;
    const emitter: Emitter<Events> = mitt();
    return {
      provide: {
        emitter,
      },
    };
  },
});
