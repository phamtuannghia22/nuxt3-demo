<script setup>
  defineProps({
    show: Boolean,
  })
  defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-modalBackdrop">
      <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <slot />
        <div class="mt-4 text-right">
          <button @click="$emit('close')" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Đóng
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>


