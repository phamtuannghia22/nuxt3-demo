<script setup lang="ts">
  import SocialLogin from "~/components/auth/SocialLogin.vue";
  import Login from "~/components/auth/Login.vue";

  const runtimeConfig = useRuntimeConfig();
  const isLogin = ref(true);
</script>

<template>
  <Modal
    :is-have-close-btn="true"
    name="auth-modal"
    classes="w-[414px]"
  >
    <div v-show="isLogin">
      <p class="text-center text-[32px] mb-5 font-semibold">Đăng nhập</p>
      <div class="p-3">
        <Login class="mb-6" />
        <div class="w-full flex justify-center mb-4">
          <button class="text-orange text-sm">Quên mật khẩu ?</button>
        </div>
        <p class="text-center text-sm mb-4">Hoặc đăng nhập với</p>
        <div class="mb-4 w-full flex justify-center">
          <SocialLogin />
        </div>
        <p class="text-center text-sm">
          Bạn chưa có tài khoản?
          <button class="text-orange underline">Đăng ký ngay</button>
        </p>
      </div>
    </div>
  </Modal>
</template>
