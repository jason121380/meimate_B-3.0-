<template>
  <div :class="divClass">
    <input
      type="checkbox"
      :id="uuid"
      :value="value"
      :checked="value"
      @change="$emit('input', value)"
    />
    <label :for="uuid" class="flex items-center text-left">
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'default-checkbox',
  props: {
    value: {
      type: [Object, Boolean, Array],
    },
    label: {
      type: [String],
    },
    divClass: {
      type: [String],
    },
  },
  data() {
    return {
      uuid: this.$uuid(),
    };
  },
};
</script>
