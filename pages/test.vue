<script setup lang="ts">
  import { onMounted } from "vue";
  import { useAsyncData } from "#app";

  const { $api, $repository } = useNuxtApp();
  const payload = {
    utm_source: '',
    utm_campaign: '',
    utm_medium: '',
    is_first: false,

  }
  const a = $repository.user.login(payload);
  onMounted(() => {
    // const error = createError({
    //   statusCode: 500,
    //   statusMessage: 'Page Not Found'
    // })
    // showError(error)
    // throw createError({
    //   statusCode: 404,
    //   statusMessage: 'abc'
    // })
  });

  // throw createError({
  //   statusCode: 500,
  //   statusMessage: "abc",
  // });
</script>

<template>
  <div>test</div>
</template>

<style scoped></style>
