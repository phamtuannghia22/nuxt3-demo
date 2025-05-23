<script setup>
   import { onMounted, ref } from "vue";

   // reactive state
   const count = ref(0);

   // functions that mutate state and trigger updates
   function increment() {
      count.value++;
   }

   // lifecycle hooks
   onMounted(() => {
      console.log(`The initial count is ${count.value}. acva`);
   });
</script>

<template>
   <button @click="increment()" class="w-full">Count is: {{ count }}</button>
</template>
