<template>
  <nav class="fixed inset-x-0 bottom-0 z-50 w-full border-t border-gray-100 bg-white" style="padding-bottom: env(safe-area-inset-bottom, 0px)">
    <div class="mx-auto flex h-14 w-full max-w-screen-md items-center justify-around">
    <div @click="goToTab('Home')" @keypress.enter="goToTab('Home')" role="button" tabindex="0" class="flex h-full flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 transition-colors duration-200" :class="isHomeActive ? 'text-gmb-orange-500' : 'text-gray-300'">
      <i class="bi bi-house-door text-xl"></i>
      <span class="text-[10px] font-medium">首頁</span>
    </div>
    <div @click="goToTab('ScheduleBreak')" @keypress.enter="goToTab('ScheduleBreak')" role="button" tabindex="0" class="flex h-full flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 transition-colors duration-200" :class="isScheduleBreakActive ? 'text-gmb-orange-500' : 'text-gray-300'">
      <i class="bi bi-calendar text-xl"></i>
      <span class="text-[10px] font-medium">我的預約</span>
    </div>
    <div @click="goToTab('Report')" @keypress.enter="goToTab('Report')" role="button" tabindex="0" class="flex h-full flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 transition-colors duration-200" :class="isReportActive ? 'text-gmb-orange-500' : 'text-gray-300'">
      <i class="bi bi-clipboard-check text-xl"></i>
      <span class="text-[10px] font-medium">我的報表</span>
    </div>
    <div @click="goToTab('Punch')" @keypress.enter="goToTab('Punch')" role="button" tabindex="0" class="flex h-full flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 transition-colors duration-200" :class="isPunchActive ? 'text-gmb-orange-500' : 'text-gray-300'">
      <i class="bi bi-clock-history text-xl"></i>
      <span class="text-[10px] font-medium">打卡</span>
    </div>
    <div @click="goToTab('Home', 'profile')" @keypress.enter="goToTab('Home', 'profile')" role="button" tabindex="0" class="flex h-full flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 transition-colors duration-200" :class="isProfileActive ? 'text-gmb-orange-500' : 'text-gray-300'">
      <i class="bi bi-person text-xl"></i>
      <span class="text-[10px] font-medium">我的</span>
    </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'BottomNav',
  computed: {
    isHomeActive() {
      return this.$route.name === 'Home' && this.$route.query.tab !== 'profile';
    },
    isProfileActive() {
      return this.$route.name === 'Home' && this.$route.query.tab === 'profile';
    },
    isScheduleBreakActive() {
      return this.$route.name && this.$route.name.includes('ScheduleBreak');
    },
    isReportActive() {
      return this.$route.name && this.$route.name.includes('Report');
    },
    isPunchActive() {
      return this.$route.name && this.$route.name.includes('Punch');
    },
  },
  methods: {
    goToTab(routeName, tab = null) {
      if (tab) {
        if (this.$route.name !== routeName || this.$route.query.tab !== tab) {
          this.$router.push({ name: routeName, query: { tab } });
        }
      } else if (this.$route.name !== routeName || this.$route.query.tab) {
        this.$router.push({ name: routeName });
      }
    },
  },
};
</script>

<style scoped></style>
