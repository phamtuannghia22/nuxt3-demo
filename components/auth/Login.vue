<script setup lang="ts">
  const runTimeconfig = useRuntimeConfig();
  const { $toast, $emitter } = useNuxtApp();
  const showPass = ref(false);
  const rememberLogin = ref(false);
  const isDirty = ref(false);
  const formLogin = reactive({
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
  });

  function validateForm(form: typeof formLogin): boolean {
    let isValid = true;

    for (const key in form) {
      const field = form[key as keyof typeof formLogin];
      const val = field.value.trim();

      if (!val) {
        field.errMsg = "Trường này không được để trống";
        isValid = false;
      } else if (val.length < field.minLength) {
        field.errMsg = `Phải có ít nhất ${field.minLength} ký tự`;
        isValid = false;
      } else {
        field.errMsg = "";
      }
    }

    return isValid;
  }

  watch([() => formLogin.username.value, () => formLogin.password.value], () => {
    if (isDirty.value) {
      validateForm(formLogin);
    }
  });

  onMounted(() => {
    rememberLogin.value = localStorage.getItem("rememberLogin") === "true" ? true : false;
    const account = localStorage.getItem("userAccount")
      ? JSON.parse(localStorage.getItem("userAccount") || "")
      : "";
    if (account) {
      formLogin.username.value = account?.username || "";
      formLogin.password.value = account?.password || "";
    }
  });

  async function login() {
    isDirty.value = true;
    const qualified = validateForm(formLogin);
    if (!qualified) {
      return;
    }
    try {
      const payload = {
        password: formLogin.password.value,
        username: formLogin.username.value,
        is_first: 0,
        source: 1,
      };
      const res = await useAuthRepository().login(payload);
      if (res.msg.status === "success" && res.msg.code === "2000") {
        $toast.success("Đăng nhập thành công");
        if (rememberLogin.value) {
          localStorage.setItem("rememberLogin", "true");
          localStorage.setItem(
            "userAccount",
            JSON.stringify({
              username: formLogin.username.value,
              password: formLogin.password.value,
            }),
          );
        } else {
          localStorage.setItem("rememberLogin", "false");
          localStorage.setItem("userAccount", "");
        }
        useGetUserInfo();
        $emitter.emit("close-modal", "auth-modal");
      } else {
        throw new Error();
      }
    } catch (e) {
      useLogError(e);
    }
  }
</script>

<template>
  <form @submit.prevent="login()">
    <input
      v-model="formLogin.username.value"
      placeholder="Tên tài khoản"
      type="text"
      class="w-full rounded-lg px-3 h-12 bg-lightGray border border-grayBland placeholder:text-sm"
    />
    <div class="flex items-center text-[12px] h-7 text-redError">
      {{ formLogin.username.errMsg }}
    </div>
    <div class="relative">
      <input
        v-model="formLogin.password.value"
        placeholder="Mật khẩu"
        :type="showPass ? 'text' : 'password'"
        class="w-full rounded-lg pl-3 pr-10 h-12 bg-lightGray border border-grayBland placeholder:text-sm"
      />
      <button
        type="button"
        @click="showPass = !showPass"
        class="absolute right-3 top-[50%] -translate-y-[50%]"
      >
        <img
          v-show="showPass"
          :src="`${runTimeconfig.public.fqaUrlCdn}/images/icon_eye_slash.svg`"
          width="22"
          height="19"
          alt="icon_eye_slash.svg"
        />
        <img
          v-show="!showPass"
          :src="`${runTimeconfig.public.fqaUrlCdn}/images/icon_eye.svg`"
          width="22"
          height="19"
          alt="icon_eye.svg"
        />
      </button>
    </div>
    <div class="flex items-center text-[12px] h-7 text-redError">
      {{ formLogin.password.errMsg }}
    </div>
    <div class="form-group">
      <input
        type="checkbox"
        id="remember-login-check-box"
        v-model="rememberLogin"
      />
      <label for="remember-login-check-box">Lưu tài khoản</label>
    </div>
    <button
      type="submit"
      class="w-full text-white text-sm rounded-xl bg-orangeButton h-[50px] font-semibold"
    >
      Đăng nhập
    </button>
  </form>
</template>

<style scoped>
  @import "@styles/checkbox-custom.css";
</style>
