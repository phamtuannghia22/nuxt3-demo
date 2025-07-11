<script setup>
  import { ref } from "vue";
  import closeIcon from "@images/close-circle-icon.svg";

  const { $emitter } = useNuxtApp();
  const showModal = ref(false);
  const showContent = ref(false);
  const props = defineProps({
    name: {
      type: String,
      default: 'modal',
      required: true,
    },
    isHaveCloseBtn: {
      type: Boolean,
      default: false,
    },
    clickToClose: {
      type: Boolean,
      default: true,
    },
    classes: {
      type: String,
      default: '',
    }
  });

  function openModal() {
    showModal.value = true;
    setTimeout(() => {
      showContent.value = true;
    }, 120);
  }

  function closeModal() {
    showContent.value = false;
    setTimeout(() => {
      showModal.value = false;
    }, 500);
  }
  
  function handleCloseModal(modalName) {
    if (props.name === modalName) {
      closeModal();
    }
  }
  
  function handleOpenModal(modalName) {
    if (props.name === modalName) {
      openModal();
    }
  }
  
  function handleClickToClose() {
    if (props.clickToClose) {
      closeModal();
    }
  }

  onMounted(() => {
    $emitter.on('open-modal', handleOpenModal);
    $emitter.on('close-modal', handleCloseModal);
  });

  onUnmounted(() => {
    $emitter.off('open-modal', handleOpenModal);
    $emitter.off('close-modal', handleCloseModal);
  })

  defineEmits(["close"]);
  defineExpose({
    openModal,
    closeModal,
  });
</script>

<template>
  <Teleport to="body">
    <div
      v-if="showModal"
      @click="handleClickToClose()"
      class="fixed inset-0 z-50 flex items-center justify-center bg-modalBackdrop"
    >
      <Transition name="bounce">
        <div
          v-if="showContent"
          @click.stop="() => true"
          class="bg-white rounded-lg pt-6 min-w-[360px] shadow-2xl relative"
          :class="`${classes}`"
        >
          <slot />
          <button
            v-if="props.isHaveCloseBtn"
            @click="closeModal()"
            class="top-1 right-1 absolute"
          >
            <NuxtImg
              :src="closeIcon"
              width="24"
              height="24"
              alt="icon-close-cirlce.svg"
            />
          </button>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped>
  .bounce-enter-active {
    animation: bounce-in 300ms;
  }

  .bounce-leave-active {
    animation: bounce-in 300ms reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
