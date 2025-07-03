import type { Emitter } from "mitt";
import mitt from "mitt";

type Events = Record<string, unknown>;

const emitter: Emitter<Events> = mitt();

export default emitter;
