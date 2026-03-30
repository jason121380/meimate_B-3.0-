<template>
  <div
    class="fixed inset-x-0 top-0 z-40 w-full"
    :class="bgClass"
  >
    <div
      class="relative mx-auto flex h-[68px] w-full max-w-screen-md items-center justify-between px-6 pt-2 text-gray-900"
    >
      <div class="flex flex-1 items-center gap-4">
        <button v-if="!['ScheduleBreak', 'Report', 'Punch'].includes($route.name)" @click="doRoute" class="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm transition-colors hover:bg-gray-50 active:scale-95">
          <i class="bi bi-chevron-left text-[14px] text-gray-500" />
        </button>
        <div class="line-clamp-1 text-xl font-bold text-gmb-orange-500">
          {{ title }}
        </div>
      </div>

      <div class="flex shrink-0 items-center justify-end gap-2 text-right">
        <slot name="right">
          <button v-if="rightIcon" @click="$emit('iconEvent')" class="px-1 text-gray-900 transition-colors hover:text-gmb-orange-500">
            <i :class="rightIcon" class="text-[26px]" />
          </button>
        </slot>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'back-nav',
  description: '返回上一頁',
  props: {
    title: {
      type: [String],
    },
    routeTarget: {
      type: [String, Object],
      default: null,
    },
    rightIcon: {
      type: [String, Object],
      default: null,
    },
    bgClass: {
      type: String,
      default: 'bg-[#FAFAFA]',
    },
  },
  methods: {
    doRoute() {
      this.$emit('leftIconEvent');
      const checkData = [
        'ScheduleBreak', 'Report', 'Customer',
        'Punch', 'PriceList', 'EmployeeSchedule',
      ];
      if (checkData.includes(this.$route.name)) {
        this.$router.push({ name: 'Home' });
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
