<script setup lang="ts">
  const runtimeConfig = useRuntimeConfig();
  const route = useRoute();
  const { $toast, $emitter } = useNuxtApp();
  const listSocial = [
    {
      src: "/images/GoogleLg.svg",
      name: "Google",
      method: "google",
    },
    {
      src: "/images/FacebookLg.svg",
      name: "Facebook",
      method: "facebook",
    },
    {
      src: "/images/appleLg.svg",
      name: "Apple",
      method: "google",
    },
  ];

  async function signMethod(item: any) {
    try {
      // * SET STORAGE
      const source_cookie = useCookie("source", {
        expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365),
        path: "/",
        sameSite: "lax",
        secure: true,
      });
      source_cookie.value = "social";

      // * GET AUTH
      const tasks: any = [import("firebase/auth")];
      tasks.push(!window.isInitedFirebase ? import("firebase/app") : () => ({}));

      const [
        { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider },
        { initializeApp },
      ] = await Promise.all(tasks);
      if (!window.isInitedFirebase) {
        await initializeApp({
          apiKey: runtimeConfig.public.firebaseApiKey,
          authDomain: runtimeConfig.public.firebaseAuthDomain,
          projectId: runtimeConfig.public.firebaseProjectId,
          storageBucket: runtimeConfig.public.firebaseStorrageBucket,
          messagingSenderId: runtimeConfig.public.firebaseMessagingSenderId,
          appId: runtimeConfig.public.firebaseAppId,
          measurementId: runtimeConfig.public.firebaseMeasurementId,
        });
        window.isInitedFirebase = true;
      }
      const $auth = getAuth();

      // * GET PROVIDER
      let provider = null;
      switch (item.name) {
        case "Google":
          provider = new GoogleAuthProvider();
          break;
        case "Facebook":
          provider = new FacebookAuthProvider();
          break;
        case "Apple":
          provider = new OAuthProvider("apple.com");
          break;
      }

      // * EXEC METHOD
      signInWithPopup($auth, provider)
        .then(async (result: any) => {
          const {
            content_id,
            ref,
            utm_medium,
            utm_campaign,
            utm_content,
            gclid,
            utm_term,
            utm_ct,
            utm_source,
          } = route.query;
          const resultData = await useAuthRepository().loginThirdAuthen(
            { idToken: result?.user?.accessToken },
            {
              ...{
                content_id,
                ref,
                utm_medium,
                utm_campaign,
                utm_content,
                gclid,
                utm_term,
                utm_ct,
                utm_source,
              },
            },
          );
          if (resultData?.msg?.status === "success" && resultData?.msg?.code === "2000") {
            $toast.success("Đăng nhập thành công");
            $emitter.emit("close-modal", "auth-modal");
            await useGetUserInfo();
          } else {
            throw new Error();
          }
        })
        .catch((e: any) => {
          useLogError(e);
        });
    } catch (error) {
      useLogError(error);
    }
  }
</script>

<template>
  <div class="flex gap-6">
    <div
      v-for="item in listSocial"
      :key="item.name"
      class="loginsubmitted cursor-pointer"
      @click="signMethod(item)"
    >
      <img
        class="w-[32px] h-[32px] loginsubmitted object-contain"
        :src="`${runtimeConfig.public.fqaUrlCdn}${item.src}`"
        :alt="item.name"
      />
    </div>
  </div>
</template>

<style scoped></style>
