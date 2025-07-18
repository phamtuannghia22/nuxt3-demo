<script setup lang="ts">
  const props = defineProps({
    loading: {
      type: Boolean,
      default: false,
      required: true,
    },
  });
</script>

<template>
  <button :class="{ 'pointer-events-none': loading }">
    <AppLoading
      class="m-auto"
      v-if="props.loading"
    />
    <slot v-else />
  </button>
</template>
