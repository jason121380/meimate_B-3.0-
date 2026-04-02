<template>
  <transition name="fade">
    <div v-if="showLoader" class="fixed left-0 top-0 z-[9999] flex size-full items-center justify-center bg-black/10 backdrop-blur-[1px]">
      <div class="fixed inset-0 z-[10000] m-auto size-10 animate-spin rounded-full border-4 border-gray-200 border-t-gmb-orange-500"></div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Loader-Lay',
  data() {
    return {
      showLoader: false,
      timer: null,
    };
  },
  computed: {
    ...mapState('config', ['loadingArray']),
    isLoading() {
      return this.loadingArray.length > 0;
    },
  },
  watch: {
    isLoading(val) {
      if (val) {
        // Only show spinner after 350ms delay - fast requests won't trigger it
        this.timer = setTimeout(() => {
          if (this.isLoading) {
            this.showLoader = true;
          }
        }, 350);
      } else {
        clearTimeout(this.timer);
        this.showLoader = false;
      }
    },
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
};
</script>
<style lang="scss" scoped>
</style>
