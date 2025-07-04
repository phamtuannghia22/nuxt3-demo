<script setup lang="ts">
  const { $emitter } = useNuxtApp();

  const emitEvent = () => {
    $emitter.emit("custom-event", { message: "abc" });
  };
</script>

<template>
  <div>
    Emitterr
    <button @click="emitEvent">Emit</button>
  </div>
</template>

<style scoped></style>
