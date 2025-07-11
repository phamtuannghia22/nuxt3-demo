<script setup lang="ts">
  import locationIcon from "@images/location-orange-icon.svg";
  import emailIcon from "@images/email-orange-icon.svg";
  import phoneIcon from "@images/phone-orange-icon.svg";

  const store = useStore();
  const uiLayout = store.appConfig;
  const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <div
    :style="{
      'background-color': uiLayout?.footer?.bgFooter?.bgColor ?? '#182537',
    }"
    class="border-box pt-[24px] px-[12px] pb-[142px] flex flex-col bg-no-repeat bg-cover relative"
  >
    <nuxt-img
      v-if="uiLayout?.footer?.bgFooterWap?.bgTop?.url"
      :src="uiLayout?.footer?.bgFooterWap?.bgTop?.url"
      class="absolute right-0 top-0"
      height="82"
    />
    <nuxt-img
      v-if="uiLayout?.footer?.bgFooterWap?.bgBottom?.url"
      :src="uiLayout?.footer?.bgFooterWap?.bgBottom?.url"
      class="absolute right-0 bottom-0 w-full"
    />
    <div class="mb-[16px]">
      <client-only>
        <nuxt-img
          width="88"
          height="42"
          :src="uiLayout?.thumbnail?.logoSystem?.url"
          loading="lazy"
        />
      </client-only>
    </div>
    <div class="flex flex-col mb-[16px] gap-y-[8px]">
      <span class="flex text-white">
        <img
          class="w-5 h-5 mr-[5px]"
          :src="phoneIcon"
          alt="phone-orange-icon.svg"
        />
        Điện thoại: {{ uiLayout?.footer?.phone }}
      </span>
      <span class="flex text-white">
        <img
          class="w-5 h-5 mr-[5px]"
          :src="emailIcon"
          alt="email-orange-icon.svg"
        />
        Email: {{ uiLayout?.footer?.email }}
      </span>
      <div class="flex text-white max-w-[390px]">
        <img
          class="w-6 h-6 mr-[5px]"
          :src="locationIcon"
          alt="location-orange-icon.svg"
        />
        Địa chỉ: {{ uiLayout?.footer?.address }}
      </div>
    </div>
    <div class="flex flex-col">
      <div class="uppercase font-semibold text-base text-white mb-3">Tìm chúng tôi trên</div>
      <ul class="mt-[12px]">
        <li
          v-for="social in uiLayout?.footer?.Social"
          :key="social?.id"
          class="flex items-center mb-[6px]"
        >
          <a
            :href="social?.url"
            target="_self"
            :rel="social?.nofollow ? 'nofollow' : ''"
            class="flex items-center"
          >
            <nuxt-img
              class="mr-1"
              :src="social?.icon?.url"
              densities="1"
            />
            <span class="text-[14px] text-orange leading-[20px] hover:underline cursor-pointer">{{
              social?.title
            }}</span>
          </a>
        </li>
      </ul>
    </div>

    <div>
      <div class="font-medium text-[14px] mt-[24px] text-white mb-[16px]">Tải ứng dụng FQA</div>
      <div class="flex">
        <client-only>
          <a
            href="https://apps.apple.com/app/fqa/id6445805152"
            target="_blank"
            rel="nofollow"
            class="w-[120px] h-[40px] mr-[12px]"
          >
            <img
              class="w-full h-full object-contain"
              :src="`${runtimeConfig.public.fqaUrlCdn}/images/app_store.svg`"
              alt="app store"
              loading="lazy"
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=vn.fqa.mobile"
            rel="nofollow"
            target="_blank"
            class="w-[136px] h-[40px]"
          >
            <img
              class="w-full h-full object-contain"
              :src="`${runtimeConfig.public.fqaUrlCdn}/images/ch_play.svg`"
              alt="ch play"
              loading="lazy"
            />
          </a>
        </client-only>
      </div>
    </div>

    <h3 class="text-[16px] leading-[32px] font-semibold text-white mt-[16px] mb-[4px]">LIÊN KẾT</h3>
    <ul class="list-disc ml-[18px] mb-[16px]">
      <li
        v-for="link in uiLayout?.footer?.link"
        :key="link?.id"
        class="text-[14px] leading-[32px] font-normal text-white"
      >
        <a
          :href="link?.url"
          :rel="link?.nofollow ? 'nofollow' : ''"
          class="mb-[10px] text-white"
          >{{ link?.title }}</a
        >
      </li>
    </ul>
    <h3 class="text-[16px] leading-[32px] font-semibold text-white mt-[16px] mb-[4px]">HỖ TRỢ</h3>
    <ul class="list-disc ml-[18px] mb-[16px]">
      <li
        v-for="link in uiLayout?.footer?.support"
        :key="link?.id"
        class="text-[14px] leading-[32px] font-normal text-white"
      >
        <a
          :href="link?.url"
          :rel="link?.nofollow ? 'nofollow' : ''"
          class="mb-[10px] text-white"
          >{{ link?.title }}</a
        >
      </li>
    </ul>
    <p class="text-white font-normal">{{ uiLayout?.footer?.description }}</p>
    <div class="border border-[#393B41] my-4 mx-auto w-full"></div>
    <div class="mx-auto w-full">
      <div class="text-white text-[14px] break-words whitespace-pre-wrap mb-[5px]">
        {{ uiLayout?.footer?.information }}
      </div>
      <div class="text-white text-[14px]">{{ uiLayout?.footer?.copyright }}</div>
    </div>
    <div class="border border-[#393B41] my-4 mx-auto w-full"></div>
    <span class="text-white text-sm font-semibold">Top từ khóa xu hướng:</span>
    <ul class="flex flex-wrap items-center">
      <li
        v-for="topKeywords in uiLayout?.topKeywords"
        :key="topKeywords?.id"
        class="text-white font-semibold border-r px-3 border-[#393B41] mt-3"
      >
        <a
          :href="topKeywords?.url"
          target="_self"
          :rel="topKeywords?.nofollow ? 'nofollow' : ''"
        >
          <span
            class="text-[#C0C0C0] text-[13px] font-normal leading-5 hover:underline hover:!text-orange"
            >{{ topKeywords?.title }}</span
          >
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
