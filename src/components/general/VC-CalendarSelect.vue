<template>
  <span class="w-full">
    <vc-date-picker
      v-model="date"
      :min-date="minDate"
      :masks="masks"
      class="relative flex w-full items-center justify-between"
      is-required
    >
      <template v-slot="{ inputValue, inputEvents }">
        <input
          type="text"
          :name="placeholder"
          class="w-full rounded-full bg-meimate-white px-3 py-2 font-medium outline-none"
          :placeholder="placeholder"
          :value="inputValue"
          v-on="inputEvents"
          :disabled="disabled"
          :class="[
            {
              'border-meimate-pink bg-red-50 text-meimate-pink placeholder:!text-meimate-pink':
                errorMsgStatus,
            },
            { 'bg-slate-100 placeholder:!text-stone-600': disabled },
            inputClass,
          ]"
        />
        <label :for="placeholder" class="hidden"></label>
        <i
          class="bi bi-chevron-down absolute right-3 text-primary"
        />
      </template>
    </vc-date-picker>
  </span>
</template>

<script>
export default {
  name: 'calender-selector',
  props: {
    value: {
      type: [String, Date, Object, Array, Number],
    },
    placeholder: {
      type: String,
      default: '請選擇日期',
    },
    minDate: {
      type: [String, Date],
    },
    errors: {
      type: [Array],
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hideErrors: {
      type: Boolean,
      default: false,
    },
    inputClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      masks: {
        input: 'YYYY-MM-DD',
      },
    };
  },
  computed: {
    date: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    errorMsgStatus() {
      return !this.hideErrors && this.errors.length > 0;
    },
  },
};
</script>
