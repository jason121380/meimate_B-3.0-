<template>
  <div class="checkbox">
    <input
      type="checkbox"
      :id="uuid"
      :value="inputValue"
      v-model="model"
      :disabled="disabled"
      class="sr-only"
    />
    <label
      :for="uuid"
      class="flex w-full cursor-pointer items-center justify-center rounded-3xl py-2.5 transition-all"
      :class="
        typeof value === 'object'
          ? model.includes(inputValue)
            ? 'border border-gmb-orange-500 font-bold text-gmb-orange-500 shadow-sm bg-white'
            : 'border border-gray-100 font-medium text-gray-400 bg-gray-50'
          : model
          ? 'border border-gmb-orange-500 font-bold text-gmb-orange-500 shadow-sm bg-white'
          : 'border border-gray-100 font-medium text-gray-400 bg-gray-50'
      "
    >
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'default-button-check',
  props: {
    value: {
      type: [Array, Boolean],
    },
    label: {
      type: [String],
    },
    inputValue: {
      type: [String, Object, Boolean],
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
    labelClass: {
      type: [String, Object],
    },
  },
  data() {
    return {
      uuid: this.$uuid(),
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
