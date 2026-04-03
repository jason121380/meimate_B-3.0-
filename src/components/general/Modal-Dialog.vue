<template>
    <div v-if="value">
      <div
        class="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
        @click="$emit('input', false)"
        @keypress="$emit('input', false)"
      ></div>
      <div
        class="fixed inset-0 z-[61] flex"
        :class="[
          position === 'bottom' ? 'items-end justify-center' : 'items-center justify-center px-6',
        ]"
        @click.self="$emit('input', false)"
        @keypress.self="$emit('input', false)"
      >
        <div
          class="relative flex flex-col overflow-hidden bg-white shadow-xl"
          :class="[
            position === 'bottom' ? 'max-h-[75vh] w-full max-w-screen-md rounded-t-3xl pb-[env(safe-area-inset-bottom,0px)]' : 'w-full max-w-md rounded-2xl',
            width, height
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
                <i class="bi bi-x-lg text-sm text-gray-400"></i>
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
      default: '',
    },
    height: {
      type: String,
      default: '',
    },
    animationCss: {
      type: String,
      default: '',
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
};
</script>

<style lang="scss" scoped></style>
