<script setup lang="ts">
  import { onMounted, useTemplateRef } from "vue";
  import { useStore } from "~/stores";
  import EmitterCom from "~/components/test/EmitterCom.vue";
  
  const runtimeConfig = useRuntimeConfig();
  // if (import.meta.server) {
  //   console.log('API secret:', runtimeConfig.apiSecret);
  // }
  const a = useStore();
  // console.log(a.isMobile);
  // console.log(a.os);
  // reactive state
  // const test1 = useTemplateRef('test1');
  // const test2 = useTemplateRef('test2');
  const { $toast } = useNuxtApp();
  function openPop()  {
    $emitter.emit("open-modal", "auth-modal");
  }
  
  // function openPop2()  {
  //   test2.value?.openModal()
  // }
  //
  const { $dayjs, $emitter } = useNuxtApp(); 
  
  // lifecycle hooks
  onMounted(() => {
    console.log(import.meta.dev);
    console.log(toRaw(a.userInfo));
    console.log(toRaw(a.appConfig));
    const time = $dayjs().subtract(2, 'day').format('YYYY-MM-DD');
    console.log(time);
    $emitter.on('custom-event', (payload) => {
      console.log(payload);
    });
    // console.log(input.value?.openModal());
    console.log(navigator.userAgent);
    console.log(runtimeConfig.public.fqaUrlCdn);
    console.log(runtimeConfig.public.apiAuthenUrl);
  });

  onUnmounted(() => {
    $emitter.off('custom-event');
  });
</script>

<template>
  <div>
    <button v-tooltip="'Bấm vào tôi để bắt đầu'" class="p-2 bg-blue-500 text-white rounded">
      Hover me
    </button>
    <EmitterCom></EmitterCom>
    <button
      @click="openPop()"
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Mở Modal
    </button>
<!--    <Modal-->
<!--      ref="test1"-->
<!--      :is-have-close-btn="true"-->
<!--    >-->
<!--      <p class="text-lg">Đây là nội dung của modal.</p>-->
<!--      <button-->
<!--        @click="openPop2()"-->
<!--        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"-->
<!--      >-->
<!--        Mở Modal-->
<!--      </button>-->
<!--    </Modal>-->
<!--    <Modal-->
<!--      ref="test2"-->
<!--      :is-have-close-btn="true"-->
<!--    >-->
<!--      <p class="text-lg">Đây là nội dung của modal 2.</p>-->
<!--    </Modal>-->
    <AuthModal>
    </AuthModal>
  </div>
</template>
