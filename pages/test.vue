<script setup lang="ts">
  import { onMounted } from "vue";
  import { useStore } from "~/stores";

  const username = ref("nghiapt3");
  const password = ref("@Dmin4123");
  const state = useStore();
  const login = async () => {
    try {
      const payload = {
        password: password.value,
        username: username.value,
        is_first: 0,
        source: 1,
      };
      const res = await useAuthRepository().login(payload);
    } catch (e) {
      console.log(e);
    }
  };
  const info = async () => {
    try {
      const res = await useUserRepository().userInfo();
    } catch (e) {
      console.log(e);
    }
  };
  
  const handleSubmit = async () => {
    login();
  };

  // if (import.meta.server) {
  //   await login();
  // }

  // const { data, error } = await useAsyncData("login", async () => {
  //   const result = await login();
  //   setCookie('fqa', 'assjjjjj');
  //   console.log('căc');
  //   return null;
  // });
  // login();
  onMounted(() => {
    console.log(state.userInfo.accountId);
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
  <div>
<!--    <h1 class="text-3xl font-bold underline text-orange mobile-max:max-laptop-max:hidden">-->
<!--      Hello world!-->
<!--    </h1>-->
    <form @submit.prevent="handleSubmit()">
      <input v-model="username" />
      <input v-model="password" />
      <button type="submit">send</button>
    </form>
    <button @click="info">Info</button>
  </div>
</template>

<style scoped></style>
