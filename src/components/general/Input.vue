<template>
  <label class="mb-4 block">
    <div class="flex flex-col gap-2.5">
      <p
        v-if="label"
        class="text-gray-dark text-md"
        :class="{ 'text-red-700 dark:text-red-500': isHasError }"
      >
        {{ label }}：
      </p>
      <div
        class="relative flex items-center"
        :class="[
          {
            'drop-shadow-lg': isOnfocus,
            'bg-slate-100': disabled,
          },
          divClass,
        ]"
      >
        <span v-if="$slots.preIcon" class="absolute left-2">
          <slot name="preIcon"></slot>
        </span>
        <input
          :value="value"
          ref="inputVal"
          @input="$emit('input', $event.target.value)"
          @change="$emit('Change', $event.target.value)"
          @keyup.enter="doFunction"
          @focus="toggleFocus('focus')"
          @blur="toggleFocus('blur')"
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readOnly"
          class="form-control form-control-sm form-control-solid text-stone-600 placeholder:text-stone-900 focus:border-0"
          :class="[{ 'border-danger border': isHasError }, inputClass]"
          :maxlength="maxLength"
        />
        <span v-if="$slots.endIcon" class="absolute right-2">
          <slot name="endIcon"></slot>
        </span>
      </div>
    </div>
    <transition name="collapseTransition">
      <div>
        <p
          v-if="errorMsgStatus"
          class="mt-2 text-left text-sm text-red-600 dark:text-red-500"
        >
          <span class="font-medium">{{ errors[0] }}</span>
        </p>
        <p
          v-if="isUnwelcome"
          class="mt-2 text-left text-sm text-red-600 dark:text-red-500"
        >
          <span class="font-medium">此客資已列入黑名單</span>
        </p>
      </div>
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
    disabled: {
      type: Boolean,
      default: () => false,
    },
    readOnly: {
      type: Boolean,
      default: () => false,
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
    divClass: {
      type: String,
      default: 'border-[#F1F1F1]',
    },
    maxLength: {
      type: [Number, String],
      default: () => '',
    },
    isUnwelcome: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleFocus(action) {
      if (action === 'blur') {
        this.isOnfocus = false;
        this.$emit('inputOnBlur');
      } else {
        this.isOnfocus = true;
      }
    },
    doFunction() {
      this.$refs.inputVal.blur();
      this.$emit('doFunction');
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

<style lang="scss" scoped></style>
