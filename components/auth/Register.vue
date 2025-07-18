<script setup lang="ts">
  import AppLoadingClient from "~/components/common/AppLoading.client.vue";
  import type { RegisterPayload } from "@manual-types/fqaPayload";

  const runTimeconfig = useRuntimeConfig();
  const { $toast, $emitter } = useNuxtApp();
  const isDirty = ref(false);
  const loading = ref(false);
  const formRegister = reactive({
    username: {
      value: "",
      minLength: 6,
      errMsg: "",
    },
    password: {
      value: "",
      minLength: 6,
      errMsg: "",
    },
    passwordConfirmation: {
      value: "",
      minLength: 6,
      errMsg: "",
    },
    codeReferral: {
      value: "",
      maxLength: 100,
    },
  });
  const showPass1 = ref(false);
  const showPass2 = ref(false);
  const acceptPolicy = ref(false);

  watch([() => formRegister.username.value, () => formRegister.password.value, () => formRegister.passwordConfirmation.value], () => {
    if (isDirty.value) {
      validateForm(formRegister);
    }
  });

  function validateForm(form: typeof formRegister): boolean {
    let isValid = true;

    for (const key in form) {
      const field = form[key as keyof typeof formRegister];
      const val = field.value.trim();
      
      // Xử lý errMsg nếu có
      if ('errMsg' in field) field.errMsg = ""
      
      // Nếu có minLength mà rỗng → lỗi "bắt buộc"
      if ("minLength" in field && !val) {
        if ("errMsg" in field) field.errMsg = "Trường này không được để trống";
        isValid = false;
        continue;
      }

      // Check minLength
      if ("minLength" in field && val.length < field.minLength) {
        if ("errMsg" in field) field.errMsg = `Phải có ít nhất ${field.minLength} ký tự`;
        isValid = false;
      }

      // Check maxLength
      if ("maxLength" in field && val.length > field.maxLength) {
        if ("errMsg" in field) field.errMsg = `Không được quá ${field.maxLength} ký tự`;
        isValid = false;
      }
    }

    // So sánh password và passwordConfirmation nếu đều có
    if (
      "password" in form &&
      "passwordConfirmation" in form &&
      form.passwordConfirmation.value.trim() !== form.password.value.trim()
    ) {
      form.passwordConfirmation.errMsg = "Mật khẩu nhập lại không khớp";
      isValid = false;
    }
    return isValid;
  }

  async function register() {
    isDirty.value = true;
    loading.value = true;

    const qualified = validateForm(formRegister);
    if (!qualified) {
      loading.value = false;
      return;
    }
    try {
      const res = await useAuthRepository().registerAuthen({
        password: formRegister.password.value.trim(),
        username: formRegister.username.value.trim(),
        email: null,
        codeRegId: formRegister.codeReferral.value.trim()
      })
      if (res.msg.status === "success" && res.msg.code === "2000") {
        $toast.success("Đăng ký thành công!");
      } else {
        throw new Error();
      }
    } catch (e) {
      useLogError(e);
    }
  }
</script>

<template>
  <form @submit.prevent="register()">
    <input
      v-model="formRegister.username.value"
      placeholder="Tên tài khoản*"
      type="text"
      class="w-full rounded-lg px-3 h-12 bg-lightGray border border-grayBland placeholder:text-sm"
    />
    <div class="flex items-center text-[12px] h-7 text-redError">
      {{ formRegister.username.errMsg }}
    </div>
    <div class="relative">
      <input
        v-model="formRegister.password.value"
        placeholder="Mật khẩu*"
        :type="showPass1 ? 'text' : 'password'"
        class="w-full rounded-lg pl-3 pr-10 h-12 bg-lightGray border border-grayBland placeholder:text-sm"
      />
      <button
        type="button"
        @click="showPass1 = !showPass1"
        class="absolute right-3 top-[50%] -translate-y-[50%]"
      >
        <img
          v-show="showPass1"
          :src="`${runTimeconfig.public.fqaUrlCdn}/images/icon_eye_slash.svg`"
          width="22"
          height="19"
          alt="icon_eye_slash.svg"
        />
        <img
          v-show="!showPass1"
          :src="`${runTimeconfig.public.fqaUrlCdn}/images/icon_eye.svg`"
          width="22"
          height="19"
          alt="icon_eye.svg"
        />
      </button>
    </div>
    <div class="flex items-center text-[12px] h-7 text-redError">
      {{ formRegister.password.errMsg }}
    </div>
    <div class="relative">
      <input
        v-model="formRegister.passwordConfirmation.value"
        placeholder="Nhập lại mật khẩu"
        :type="showPass2 ? 'text' : 'password'"
        class="w-full rounded-lg pl-3 pr-10 h-12 bg-lightGray border border-grayBland placeholder:text-sm"
      />
      <button
        type="button"
        @click="showPass2 = !showPass2"
        class="absolute right-3 top-[50%] -translate-y-[50%]"
      >
        <img
          v-show="showPass2"
          :src="`${runTimeconfig.public.fqaUrlCdn}/images/icon_eye_slash.svg`"
          width="22"
          height="19"
          alt="icon_eye_slash.svg"
        />
        <img
          v-show="!showPass2"
          :src="`${runTimeconfig.public.fqaUrlCdn}/images/icon_eye.svg`"
          width="22"
          height="19"
          alt="icon_eye.svg"
        />
      </button>
    </div>
    <div class="flex items-center text-[12px] h-7 text-redError">
      {{ formRegister.passwordConfirmation.errMsg }}
    </div>
    <input
      v-model="formRegister.codeReferral.value"
      placeholder="Nhập mã giới thệu"
      type="text"
      :maxlength="formRegister.codeReferral.maxLength"
      class="w-full rounded-lg px-3 h-12 bg-lightGray border border-grayBland placeholder:text-sm mb-7"
    />
    <div class="form-group">
      <input
        type="checkbox"
        id="accept-policy-check-box"
        v-model="acceptPolicy"
      />
      <label
        for="accept-policy-check-box"
        class="text-[12px]"
        >Bằng cách nhấp vào Tạo tài khoản, bạn đồng ý với
        <a
          class="text-orange"
          :href="`${runTimeconfig.public.baseUrl}/dieu-khoan-dich-vu.html`"
          >Điều khoản & chính sách</a
        >
        của chúng tôi.</label
      >
    </div>
    <LoadingButton
      type="submit"
      :disabled="!acceptPolicy"
      :loading="loading"
      class="w-full text-white text-sm rounded-xl bg-orangeButton h-[50px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Tạo tài khoản
    </LoadingButton>
  </form>
</template>

<style scoped>
  @import "@styles/checkbox-custom.css";
</style>