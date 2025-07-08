import Redis from "ioredis";
import { setTimeout as wait } from "timers/promises";

export default defineNuxtPlugin({
  name: "redis",
  async setup() {
    const config = useRuntimeConfig();

    const redis = new Redis({
      host: config.public.redisHost,
      port: Number(config.public.redisPort),
      password: config.public.redisPass || undefined,
      db: 10,
      connectTimeout: 3000,
      retryStrategy: () => null,
    });

    try {
      await Promise.race([
        new Promise<void>((resolve, reject) => {
          redis.on("ready", () => {
            console.log("[Redis] Connected ✔️");
          });
          redis.on("error", (err) => {
            console.error("[Redis Error]", err);
            reject(err);
          });
        }),
        wait(3200).then(() => {
          console.warn("Redis connect timeout after 3s");
        }),
      ]);
    } catch (e) {
      console.log(e);
    }

    return {
      provide: {
        redis,
      },
    };
  },
});
