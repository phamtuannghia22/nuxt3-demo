import Redis from "ioredis";

export default defineNuxtPlugin({
  name: "redis",
  async setup() {
    const config = useRuntimeConfig();

    if (!(globalThis as any).redisClient) {
      const redis = new Redis({
        host: config.public.redisHost,
        port: Number(config.public.redisPort),
        password: config.public.redisPass || undefined,
        db: 10,
        connectTimeout: 3000,
        retryStrategy: () => null,
      });
      redis.on("ready", () => {
        console.log("[Redis] Connected ✔️");
      });

      redis.on("error", (err) => {
        console.error("[Redis Error]", err?.message);
      });

      redis.on("end", () => {
        console.warn("[Redis] Disconnected ❌");
      });

      redis.on("reconnecting", () => {
        console.log("[Redis] Reconnecting... 🔄");
      });

      (globalThis as any).redisClient = redis;
    }

    const redisIo = (globalThis as any).redisClient as Redis;

    if (redisIo.status !== "ready") {
      try {
        if (["end", "close"].includes(redisIo.status)) {
          console.log("[Redis] Forcing manual reconnect...");
          await redisIo.connect();
        }
        await new Promise<void>((resolve) => {
          const timeout = setTimeout(() => {
            resolve();
          }, 3000);

          redisIo.once("ready", () => {
            clearTimeout(timeout);
            resolve();
          });
        });
      } catch (e) {
        console.warn("[Redis] Initial connection failed but will retry in background.");
      }
    }

    return {
      provide: {
        redis: redisIo,
      },
    };
  },
});
