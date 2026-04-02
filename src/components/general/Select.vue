<template>
  <div
    :class="{
      'form-select-transparent form-select !border-none bg-meimate-white':
        withLabel,
    }"
  >
    <label
      :for="uuid"
      :class="inputClasses"
      @click.stop="isFocus = !isFocus"
      @keypress="isFocus = !isFocus"
    >
      <div
        class="flex w-full flex-nowrap justify-between overflow-hidden rounded-full placeholder:text-stone-600"
        :class="[
          inputClasses,
          {
            'bg-slate-100 text-gray-400 ': disabled,
          },
          withLabel ? 'h-full items-end px-6' : 'h-10 items-center px-3 py-2',
        ]"
      >
        <template>
          <slot></slot>
        </template>
        <div class="truncate font-medium">
          <span
            v-if="value"
            :class="{ 'text-stone-600': valueContext === '請選擇' }"
            >{{ valueContext }}</span
          >
          <span v-else class="text-stone-600">{{ placeholder }}</span>
        </div>
        <i
          v-show="!withLabel"
          @click.stop="isFocus = !isFocus"
          @keypress="isFocus = !isFocus"
          class="bi bi-chevron-down"
        />
      </div>
    </label>
    <input
      :id="uuid"
      :value="value"
      type="text"
      v-click-outside="focusOut"
      :disabled="disabled"
      readonly
      class="sr-only absolute size-0"
    />
    <transition name="slideInDown">
      <div v-if="isFocus" class="relative z-50">
        <ul
          class="absolute mt-2 rounded-lg bg-white shadow-meimate-dropdown"
          :class="{ 'inset-x-0': isFull }"
        >
          <span
            class="mt-2 inline-block max-h-60 overflow-y-auto"
            :class="{ 'w-full': isFull }"
          >
            <template v-if="Array.isArray(list) && list.length > 0">
              <li
                v-for="(item, index) in list"
                :key="`${uuid}${index}`"
                class="px-6 py-3 font-bold"
                :class="[
                  {
                    'bg-gray-200/50': isSeletedItem(item),
                    'pointer-events-none cursor-not-allowed opacity-50':
                      item.hasOwnProperty('disabled') && item.disabled,
                  },
                ]"
                @click="setVal(item)"
                @keypress="setVal(item)"
              >
                {{ itemText ? item[`${itemText}`] : item }}
              </li>
            </template>
            <template v-else>
              <li
                class="pointer-events-none cursor-not-allowed bg-gray-200/50 px-5 py-2 leading-4 opacity-50"
              >
                無資料
              </li>
            </template>
          </span>
        </ul>
      </div>
    </transition>
    <transition name="collapseTransition">
      <p v-if="errorMsgStatus" class="mt-2 text-left text-sm text-meimate-pink">
        <span class="font-medium">{{ errors[0] }}</span>
      </p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'select-root',
  props: {
    value: {
      type: [String, Number, Array, Object],
    },
    placeholder: {
      type: String,
      default: () => '請選擇',
    },
    itemText: {
      type: [String],
    },
    bgc: {
      type: [String],
    },
    itemValue: {
      type: [String],
    },
    list: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
    objectReturn: {
      type: Boolean,
      default: () => false,
    },
    multiple: {
      type: Boolean,
      default: () => false,
    },
    errors: {
      type: [Array],
      default: () => [],
    },
    hideErrors: {
      type: Boolean,
      default: false,
    },
    isFull: {
      type: Boolean,
      default: () => false,
    },
    withLabel: {
      type: Boolean,
      default: () => false,
    },
    inputClasses: {
      type: String,
    },
  },
  data() {
    return {
      uuid: this.$uuid(),
      isFocus: false,
    };
  },
  methods: {
    setVal(value) {
      if (this.itemValue) {
        if (this.objectReturn) {
          this.$emit('input', value);
        } else {
          this.$emit('input', value[`${this.itemValue}`]);
        }
      } else {
        this.$emit('input', value);
      }
    },
    focusOut() {
      this.isFocus = false;
    },
  },
  computed: {
    valueContext() {
      let text = '';
      if (this.itemValue) {
        if (this.objectReturn) {
          text = this.value ? this.value[`${this.itemText}`] : '';
        } else {
          const seletedListItem = this.list.find(
            (listItem) => this.value === listItem[`${this.itemValue}`],
          );
          text = seletedListItem ? seletedListItem[`${this.itemText}`] : '';
        }
      } else {
        text = this.value;
      }
      return text;
    },
    isSeletedItem() {
      return (listItem) => {
        let status = false;
        if (this.itemValue) {
          if (this.objectReturn) {
            status = this.value === listItem;
          } else {
            status = this.value === listItem[`${this.itemValue}`];
          }
        } else {
          status = this.value === listItem;
        }
        return status;
      };
    },
    errorMsgStatus() {
      return !this.hideErrors && this.errors.length > 0;
    },
  },
};
</script>

<style lang="scss"></style>
