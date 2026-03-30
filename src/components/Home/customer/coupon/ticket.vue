<template>

  <section class="card-only-shadow h-[8.125rem] rounded-2xl">
    <div
      class="grid size-full grid-cols-3 items-center overflow-hidden md:min-w-[325px]"
    >
      <div
        class="flex size-full items-center justify-center gap-0.5 rounded-l-2xl text-white sm:whitespace-nowrap md:gap-1"
        :class="{
          'bg-meimate-pink': canUse > 0,
          'bg-meimate-yellow': canUse === 0,
        }"
      >
        <div class="mt-1 text-xs">NT$</div>
        <div class="font-bold sm:text-lg">{{ price }}</div>
        <div class="text-xs">/</div>
        <div class="text-xs font-bold">次</div>
      </div>
      <div class="col-span-2 flex size-full flex-col gap-1 px-3 py-2">
        <div>
          <h4 class="text-bs-gray-900 line-clamp-1 text-lg font-extrabold">
            {{ title }}
          </h4>
          <span class="text-bs-gray-500 text-xs"
            >可用次數:
            <span class="font-semibold">{{ canUse - used }}/{{ canUse }}</span>
            <span class="text-bs-gray-500 text-xs"
              >(總金額: <span class="font-semibold">{{ totalPrice }})</span>
            </span></span
          >
          <div class="w-full border-b border-b-[#DDD]"></div>
          <p class="text-xs text-meimate-pink">
            購買日期:
            <span class="font-semibold">{{
              $dayjs(time).format("YYYY/MM/DD")
            }}</span>
          </p>
        </div>
        <div
          @click="openRecord(id)"
          @keypress="openRecord(id)"
          class="mt-auto flex w-fit items-center justify-end gap-1 self-end rounded-full p-1"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="circle-info"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="svg-inline--fa fa-circle-info text-xs text-meimate-pink"
          >
            <path
              fill="currentColor"
              d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8V248c0-13.3-10.7-24-24-24H216c-13.3 0-24 10.7-24 24s10.7 24 24 24h24v64H216zm40-144a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
              class=""
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Ticket-index',
  props: {
    id: {
      type: String,
      default: () => '',
    },
    title: {
      type: String,
      default: () => '',
    },
    price: {
      type: Number,
      default: () => 0,
    },
    totalPrice: {
      type: Number,
      default: () => 0,
    },
    canUse: {
      type: Number,
      default: () => 0,
    },
    used: {
      type: Number,
      default: () => 0,
    },
    time: {
      type: Number,
      default: () => 0,
    },
  },
  methods: {
    openRecord(id) {
      this.$emit('openRecord', id);
    },
  },
};
</script>
