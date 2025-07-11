<script setup lang="ts">
  import { defineAsyncComponent } from "vue";

  const store = useStore();
  const { isMobile } = store;

  const Footer = defineAsyncComponent(() => import("~/components/layout/Footer.vue"));

  const FooterMobile = defineAsyncComponent(() => import("~/components/layout/FooterMobile.vue"));
</script>

<template>
  <div>
    <p>Some default layout content shared across all pages</p>
    
    <slot />

    <FooterMobile v-if="isMobile" />
    <Footer v-else />
  </div>
</template>
