<script setup lang="ts">
  import locationIcon from "@images/location-orange-icon.svg";
  import emailIcon from "@images/email-orange-icon.svg";
  import phoneIcon from "@images/phone-orange-icon.svg";

  const store = useStore();
  const uiLayout = store.appConfig;
  const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <footer>
    <div
      class="min-h-[390px] sm-pc-screen:!bg-none screen-event:bg-cover !bg-[#182537] relative pt-[32px] pb-[15px] flex flex-col justify-center w-full bg-no-repeat"
      :style="{
        'background-color': uiLayout?.footer?.bgFooter?.bgColor ?? '#182537',
      }"
    >
      <nuxt-img
        v-if="uiLayout?.footer?.bgFooter?.bgTop?.url"
        :src="uiLayout?.footer?.bgFooter?.bgTop?.url"
        class="absolute left-0 top-0 w-full screen-event-small:hidden"
        loading="lazy"
      />
      <nuxt-img
        v-if="uiLayout?.footer?.bgFooter?.bgBottom?.url"
        :src="uiLayout?.footer?.bgFooter?.bgBottom?.url"
        class="absolute right-0 left-0 bottom-0 w-full h-full screen-event-small:hidden"
        loading="lazy"
      />
      <div class="mx-auto flex justify-between w-[1272px] screen-event-sm:w-[1172px]">
        <div class="flex flex-col text-[14px]">
          <div class="mb-[15.54px]">
            <client-only>
              <nuxt-img
                width="88"
                height="42"
                :src="uiLayout?.thumbnail?.logoSystem?.url"
                alt="logo footer"
              />
            </client-only>
          </div>
          <div class="leading-[22px] max-w-[390px] mb-[10px] text-white text-[14px]">
            {{ uiLayout?.footer?.description }}
          </div>
          <div class="flex flex-col gap-[14px]">
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
                class="w-5 h-5 mr-[5px]"
                :src="locationIcon"
                alt="location-orange-icon.svg"
              />
              Địa chỉ: {{ uiLayout?.footer?.address }}
            </div>
          </div>
        </div>
        <div class="flex text-[14px] mt-[10px] gap-x-[40px]">
          <div class="flex flex-col">
            <span class="uppercase font-semibold mb-[15px] text-[16px] text-white leading-[32px]"
              >Liên kết</span
            >
            <a
              v-for="link in uiLayout?.footer?.link"
              :key="link?.id"
              :href="link.url"
              :rel="link?.nofollow ? 'nofollow' : ''"
              class="mb-[10px] text-white"
              ><i class="mr-1 text-white">·</i>
              <span class="text-white link"> {{ link?.title }} </span></a
            >
          </div>
          <div class="flex flex-col">
            <span class="uppercase font-semibold mb-[15px] text-[16px] text-white leading-[32px]"
              >hỗ trợ</span
            >
            <a
              v-for="link in uiLayout?.footer?.support"
              :key="link.id"
              :href="link.url"
              :rel="link?.nofollow ? 'nofollow' : ''"
              class="mb-[10px] text-white"
              ><i class="mr-1 text-white">·</i>
              <span class="text-white link"> {{ link.title }} </span></a
            >
          </div>
        </div>
        <div class="flex flex-col text-[14px] text-white mt-[10px] xl-only-footer:mr-[150px]">
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
                  />
                  <span
                    class="text-[14px] text-orange leading-[20px] hover:underline cursor-pointer"
                    >{{ social?.title }}</span
                  >
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div class="font-medium text-[14px] mt-[24px] text-white mb-[16px]">
              Tải ứng dụng FQA
            </div>
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
        </div>
      </div>
      <div
        class="border border-[#393B41] my-4 mx-auto flex justify-between w-[1272px] screen-event-sm:w-[1172px]"
      ></div>
      <div class="mx-auto w-[1272px] screen-event-sm:w-[1172px]">
        <div class="text-white text-[14px] break-words whitespace-pre-wrap mb-[5px]">
          {{ uiLayout?.footer?.information }}
        </div>
        <div class="text-white text-[14px]">{{ uiLayout?.footer?.copyright }}</div>
      </div>
      <div
        class="border border-[#393B41] my-4 mx-auto flex justify-between w-[1272px] screen-event-sm:w-[1172px]"
      ></div>
      <div class="mx-auto flex justify-between w-[1272px] screen-event-sm:w-[1172px]">
        <ul class="flex flex-wrap items-center">
          <li class="text-white text-sm font-semibold">Top từ khóa xu hướng:</li>
          <li
            v-for="topKeywords in uiLayout?.topKeywords"
            :key="topKeywords?.id"
            class="text-white font-semibold border-r px-3 border-[#393B41]"
          >
            <a
              :href="topKeywords?.url"
              target="_self"
              :rel="topKeywords?.nofollow ? 'nofollow' : ''"
            >
              <span
                class="text-white text-[13px] font-normal leading-5 hover:underline hover:!text-orange"
                >{{ topKeywords?.title }}</span
              >
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

