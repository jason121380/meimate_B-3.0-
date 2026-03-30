<template>
  <label class="mb-6 block">
    <p v-if="label" class="mb-2 block text-left text-sm font-bold" :class="[{'text-red-700': isHasError},{'dark:text-red-500': isHasError}]">{{label}}:</p>
    <div class=" flex items-center rounded-md border border-primary/50 bg-white" :class="[{' border-red-500 bg-red-50 text-red-500 dark:border-red-400 dark:bg-red-100': isHasError},{ 'drop-shadow-lg': isOnfocus}]">
      <span v-if="$slots.preIcon" class="ml-2 inline-block">
        <slot name="preIcon"></slot>
      </span>
      <input
        :value="value" @input="$emit('input',$event.target.value)" @focus="toggleFocus('focus')" @blur="toggleFocus('blur')" :type="type" :placeholder="placeholder"
        class="block w-full border-0 bg-transparent p-1.5 text-sm outline-none focus:border-0"
        :class="[{' text-red-900 placeholder:text-red-700':isHasError},inputClass]"
      >
      <span v-if="$slots.endIcon" class="mr-2 inline-block">
        <slot name="endIcon"></slot>
      </span>
    </div>
    <transition name="collapseTransition">
      <p v-if="errorMsgStatus" class="mt-2 text-left text-sm text-red-600 dark:text-red-500"><span class="font-medium">{{errors[0]}}</span> </p>
    </transition>
  </label>
</template>

<script>
export default {
  name: 'input-componenet',
  data() {
    return {
      isOnfocus: false,
    };
  },
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    label: {
      type: [String, Number],
    },
    placeholder: {
      type: [String, Number],
      default: '',
    },
    errors: {
      type: [Array],
      default: () => [],
    },
    hideErrors: {
      type: [Boolean],
      default: false,
    },
    type: {
      type: [String],
      default: 'text',
    },
    inputClass: [String],
  },
  methods: {
    toggleFocus(action) {
      if (action === 'blur') {
        this.isOnfocus = false;
      } else {
        this.isOnfocus = true;
      }
    },
  },
  computed: {
    errorMsgStatus() {
      return !this.hideErrors && this.errors.length > 0;
    },
    isHasError() {
      return this.errors.length > 0;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
