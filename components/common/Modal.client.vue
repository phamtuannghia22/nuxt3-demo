<script setup>
  import { ref } from "vue";
  import iconClose from "@images/icon-close-cirlce.svg";

  const showModal = ref(false);
  const showContent = ref(false);
  const props = defineProps({
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

  function handleClickToClose() {
    if (props.clickToClose) {
      closeModal();
    }
  }

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
          class="bg-white rounded-lg p-6 phone:px-3 phone:pb-3 phone:pt-6 min-w-[360px] shadow-2xl relative"
          :class="`${classes}`"
        >
          <slot />
          <button
            v-if="props.isHaveCloseBtn"
            @click="closeModal()"
            class="top-1 right-1 absolute"
          >
            <NuxtImg
              :src="iconClose"
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
