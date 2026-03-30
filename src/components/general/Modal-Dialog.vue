<template>
  <transition>
    <div v-if="value">
      <div
        class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        @click="$emit('input', false)"
        @keypress="$emit('input', false)"
      ></div>
      <div
        class="fixed inset-0 z-50 flex"
        :class="[
          position === 'bottom' ? 'items-end justify-center' : 'items-center justify-center px-6',
          width, height
        ]"
      >
        <div
          class="relative flex w-full flex-col overflow-hidden bg-white shadow-xl transition-all duration-300"
          :class="[
            position === 'bottom' ? 'pb-safe max-h-[75vh] max-w-screen-md rounded-t-3xl' : 'mx-auto max-w-md rounded-2xl',
            animationCss
          ]"
        >
          <div
            class="flex shrink-0 items-center justify-between px-6 py-5"
          >
            <p class="text-lg font-bold text-gray-900">{{ title }}</p>
            <slot name="rightButton">
              <button
                @click.prevent="$emit('close')"
                class="flex size-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
              >
                <img
                  src="@/static/images/close-icon.svg"
                  alt="close"
                  class="size-4 object-contain opacity-50"
                />
              </button>
            </slot>
          </div>
          <div class="overflow-y-auto px-6 pb-6">
            <slot></slot>
          </div>
          <div class="shrink-0">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal-dialog',
  description: '客製話彈窗',
  props: {
    layerIndex: {
      type: Number,
      default: 10,
    },
    value: {
      type: Boolean,
      default: () => false,
    },
    width: {
      type: String,
      default: 'w-fit',
    },
    height: {
      type: String,
      default: 'h-fit',
    },
    animationCss: {
      type: String,
      default: 'animate__animated animate__fadeIn animate__fast',
    },
    position: {
      type: String,
      default: 'center', // 'center' or 'bottom'
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
