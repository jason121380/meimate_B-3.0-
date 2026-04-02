<template>
  <nav class="fixed inset-x-0 bottom-0 z-50 flex w-full justify-center" style="padding-bottom: env(safe-area-inset-bottom, 0px)">
    <div class="glass-bar mx-3 mb-2 flex w-full max-w-screen-md items-center justify-around rounded-[22px] p-1">
      <div
        v-for="item in tabs"
        :key="item.label"
        @click="goToTab(item.route, item.tab)"
        @keypress.enter="goToTab(item.route, item.tab)"
        role="button"
        tabindex="0"
        class="relative flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-2xl py-2 transition-all duration-150"
        :class="isActive(item) ? 'glass-pill' : ''"
      >
        <i :class="[item.icon, isActive(item) ? 'text-[20px] text-gmb-orange-500' : 'text-[19px] text-gray-400']"></i>
        <span
          class="text-[10px] font-semibold leading-tight transition-all duration-150"
          :class="isActive(item) ? 'text-gmb-orange-500' : 'text-gray-400'"
        >{{ item.label }}</span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'BottomNav',
  data() {
    return {
      tabs: [
        {
          route: 'Home', tab: null, icon: 'bi bi-house-door-fill', label: '首頁',
        },
        {
          route: 'ScheduleBreak', tab: null, icon: 'bi bi-calendar-check', label: '我的預約',
        },
        {
          route: 'Report', tab: null, icon: 'bi bi-clipboard-data', label: '我的報表',
        },
        {
          route: 'Punch', tab: null, icon: 'bi bi-clock', label: '打卡',
        },
        {
          route: 'Home', tab: 'profile', icon: 'bi bi-person-fill', label: '我的',
        },
      ],
    };
  },
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
    isActive(item) {
      if (item.tab === 'profile') return this.isProfileActive;
      if (item.route === 'Home') return this.isHomeActive;
      if (item.route === 'ScheduleBreak') return this.isScheduleBreakActive;
      if (item.route === 'Report') return this.isReportActive;
      if (item.route === 'Punch') return this.isPunchActive;
      return false;
    },
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

<style scoped>
.glass-bar {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow:
    0 4px 30px rgba(0, 0, 0, 0.06),
    0 1px 3px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.glass-pill {
  background: rgba(255, 255, 255, 0.75);
  box-shadow:
    0 1px 8px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}
</style>
