<script setup lang="ts">
  import Footer from "~/components/layout/Footer.vue";
</script>

<template>
  <div>
    <p>Some default layout content shared across all pages</p>
    <slot />
    <Footer />
  </div>
</template>

<style scoped>

</style>