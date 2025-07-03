<script setup lang="ts">
  const emitEvent = () => {
    emitter.emit('custom-event', { message: 'abc' });
  };
</script>

<template>
  <div>
    Emitter
    <button @click="emitEvent">
      Emit
    </button>
  </div>
</template>

<style scoped>

</style>