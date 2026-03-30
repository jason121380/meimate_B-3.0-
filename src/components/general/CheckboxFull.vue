<template>
  <div class="flex items-center gap-x-2">
    <input
      type="checkbox"
      :id="uuid"
      :value="inputValue"
      v-model="model"
      :disabled="disabled"
      class="rounded accent-meimate-pink"
    />
    <label
      :for="uuid"
      class="text-dark truncate text-left text-sm font-medium"
      :class="labelClass"
    >
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'default-checkbox-full',
  props: {
    value: {
      type: [Array, Boolean],
    },
    label: {
      type: [String],
    },
    inputValue: {
      type: [String, Object],
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
