<template>
  <transition name="fade">
    <div v-if="loadingArray.length > 0" class="fixed left-0 top-0 z-[9999] flex size-full items-center justify-center bg-black/10 backdrop-blur-[1px]">
      <div class="fixed inset-0 z-[10000] m-auto size-10 animate-spin rounded-full border-4 border-gray-200 border-t-gmb-orange-500"></div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Loading-Async',
  computed: {
    ...mapState('config', ['loadingArray']),
    isReportPage() {
      const reportPageList = ['Report-daily-report', 'Report-bill', 'Report-profit-cut', 'Report-emp-earn'];
      return reportPageList.includes(this.$route.name);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
