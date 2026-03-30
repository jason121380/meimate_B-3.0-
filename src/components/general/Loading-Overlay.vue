<template>
  <transition name="faInOut">
    <!-- eslint-disable-next-line -->
    <div
      class="fixed inset-0 size-full bg-black/40"
      v-if="value"
      @click="$emit('input', false)"
      @keypress="$emit('input', false)"
      :class="[`z-${layerIndex}`]"
    ></div>
  </transition>
</template>

<script>
export default {
  name: 'Loading-Overlay',
  description: 'Loading-Overlay',
  props: {
    layerIndex: {
      type: [Number],
      default: 1,
    },
    value: {
      type: [Boolean],
    },
  },
  methods: {
    emitParentFun() {
      this.$emit('doFunction');
    },
  },
};
</script>

<style lang="scss" scoped></style>
