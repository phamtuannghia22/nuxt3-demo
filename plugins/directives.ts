import type { Directive } from "vue";

const vClickOutside: Directive = {
  mounted(el, binding) {
    el.__clickOutsideHandler__ = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener("click", el.__clickOutsideHandler__);
  },
  unmounted(el) {
    document.removeEventListener("click", el.__clickOutsideHandler__);
    delete el.__clickOutsideHandler__;
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("click-outside", vClickOutside);
});
