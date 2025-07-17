<script setup lang="ts">
  const runtimeConfig = useRuntimeConfig();
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
</script>

<template>
  <div class="flex gap-6">
    <div
      v-for="item in listSocial"
      :key="item.name"
      class="loginsubmitted cursor-pointer"
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
