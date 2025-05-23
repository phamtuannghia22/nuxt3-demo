<script setup lang="ts">
  import { onMounted, ref } from "vue";

  const runtimeConfig = useRuntimeConfig();
  if (import.meta.server) {
    console.log('API secret:', runtimeConfig.apiSecret)
  }

  // reactive state
  const count = ref(0);

  // functions that mutate state and trigger updates
  function increment() {
    count.value++;
  }

  // lifecycle hooks
  onMounted(() => {
    console.log(runtimeConfig.apiSecret);
    console.log(runtimeConfig.public.baseUrl);
  });
</script>

<template>
  <button
    @click="increment()"
    class="w-full"
  >
    Count is: {{ count }}
  </button>
</template>
