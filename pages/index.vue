<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { useStore } from "~/stores";

  const runtimeConfig = useRuntimeConfig();
  // if (import.meta.server) {
  //   console.log('API secret:', runtimeConfig.apiSecret);
  // }
  const a = useStore();
  console.log(a.isMobile);
  console.log(a.os);
  // reactive state
  const count = ref(0);
  const open = ref(false);

  // functions that mutate state and trigger updates
  function increment() {
    count.value++;
  }

  // lifecycle hooks
  onMounted(() => {
    console.log(navigator.userAgent);
    console.log(runtimeConfig.apiSecret);
    console.log(runtimeConfig.public.baseUrl);
    console.log(runtimeConfig.public.apiAuthenUrl);
  });
</script>

<template>
  <div>
    <button
      @click="open = true"
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Mở Modal
    </button>
    <Modal
      :show="open"
      @close="open = false"
    >
      <p class="text-lg">Đây là nội dung của modal.</p>
    </Modal>
  </div>
</template>
