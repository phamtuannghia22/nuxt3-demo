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

      redis.once("ready", () => {
        console.log("[Redis] Connected ✔️");
      });

      redis.on("error", (err) => {
        console.error("[Redis Error]", err);
      });

      (globalThis as any).redisClient = redis;
    }

    const redisClient = (globalThis as any).redisClient as Redis;

    if (redisClient.status !== "ready") {
      await new Promise<void>((resolve, reject) => {
        redisClient.once("ready", () => resolve());
        redisClient.once("error", (err) => reject(err));
      });
    }

    return {
      provide: {
        redis: redisClient,
      },
    };
  },
});
