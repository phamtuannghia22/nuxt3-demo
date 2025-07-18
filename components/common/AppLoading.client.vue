<script setup lang="ts">
  const props = defineProps({
    color: {
      type: String,
      default: "white",
    },
    size: {
      type: String,
      default: "w-6 h-6",
    },
  });
</script>

<template>
  <div
    class="animate-spin rounded-full border-4 border-t-transparent"
    :class="[props.color, props.size]"
  />
</template>
