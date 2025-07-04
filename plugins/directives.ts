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

const vTooltip: Directive = {
  mounted(el, binding) {
    const tooltipText = binding.value || ''
    const tooltipEl = document.createElement('div')
    tooltipEl.textContent = tooltipText
    tooltipEl.style.position = 'absolute'
    tooltipEl.style.background = '#333'
    tooltipEl.style.color = '#fff'
    tooltipEl.style.padding = '4px 8px'
    tooltipEl.style.borderRadius = '4px'
    tooltipEl.style.fontSize = '12px'
    tooltipEl.style.pointerEvents = 'none'
    tooltipEl.style.whiteSpace = 'nowrap'
    tooltipEl.style.zIndex = '9999'
    tooltipEl.style.transition = 'opacity 0.2s'
    tooltipEl.style.opacity = '0'

    tooltipEl.classList.add('v-tooltip')

    document.body.appendChild(tooltipEl)

    function showTooltip(e: MouseEvent) {
      tooltipEl.style.left = e.pageX + 10 + 'px'
      tooltipEl.style.top = e.pageY + 10 + 'px'
      tooltipEl.style.opacity = '1'
    }

    function hideTooltip() {
      tooltipEl.style.opacity = '0'
    }

    el.__tooltipHandlers__ = { showTooltip, hideTooltip, tooltipEl }

    el.addEventListener('mouseenter', showTooltip)
    el.addEventListener('mousemove', showTooltip)
    el.addEventListener('mouseleave', hideTooltip)
  },
  unmounted(el) {
    const { showTooltip, hideTooltip, tooltipEl } = el.__tooltipHandlers__ || {}
    el.removeEventListener('mouseenter', showTooltip)
    el.removeEventListener('mousemove', showTooltip)
    el.removeEventListener('mouseleave', hideTooltip)
    tooltipEl?.remove()
    delete el.__tooltipHandlers__
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("click-outside", vClickOutside);
  nuxtApp.vueApp.directive('tooltip', vTooltip);
});
