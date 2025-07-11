<script setup lang="ts">
  const runtimeConfig = useRuntimeConfig();
  const isLogin = ref(true);
  const showPass = ref(false);
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
        <input
          placeholder="Tên tài khoản"
          type="text"
          class="w-full rounded-lg px-3 h-12 bg-lightGray border border-grayBland placeholder:text-sm mb-7"
        />
        <div class="mb-5 relative">
          <input
            placeholder="Mật khẩu"
            :type="showPass ? 'text' : 'password'"
            class="w-full rounded-lg pl-3 pr-10 h-12 bg-lightGray border border-grayBland placeholder:text-sm"
          />
          <button
            @click="showPass = !showPass"
            class="absolute right-3 top-[50%] -translate-y-[50%]"
          >
            <img
              v-show="showPass"
              :src="`${runtimeConfig.public.fqaUrlCdn}/images/icon_eye_slash.svg`"
              width="22"
              height="19"
              alt="icon_eye_slash.svg"
            />
            <img
              v-show="!showPass"
              :src="`${runtimeConfig.public.fqaUrlCdn}/images/icon_eye.svg`"
              width="22"
              height="19"
              alt="icon_eye.svg"
            />
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<style scoped></style>
