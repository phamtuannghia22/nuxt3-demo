<script setup lang="ts">
  import { onMounted, useTemplateRef } from "vue";
  import { useStore } from "~/stores";

  const runtimeConfig = useRuntimeConfig();
  // if (import.meta.server) {
  //   console.log('API secret:', runtimeConfig.apiSecret);
  // }
  const a = useStore();
  // console.log(a.isMobile);
  // console.log(a.os);
  // reactive state
  const test1 = useTemplateRef('test1');
  const test2 = useTemplateRef('test2');

  function openPop()  {
    test1.value?.openModal()
  }
  
  function openPop2()  {
    test2.value?.openModal()
  }
  
  // lifecycle hooks
  onMounted(() => {
    // console.log(input.value?.openModal());
    console.log(navigator.userAgent);
    console.log(runtimeConfig.apiSecret);
    console.log(runtimeConfig.public.baseUrl);
    console.log(runtimeConfig.public.apiAuthenUrl);
  });
</script>

<template>
  <div>
    <button
      @click="openPop()"
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Mở Modal
    </button>
    <Modal
      ref="test1"
    >
      <p class="text-lg">Đây là nội dung của modal.</p>
      <button
        @click="openPop2()"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Mở Modal
      </button>
    </Modal>
    <Modal
      ref="test2"
      :is-have-close-btn="true"
    >
      <p class="text-lg">Đây là nội dung của modal 2.</p>
    </Modal>
  </div>
</template>
