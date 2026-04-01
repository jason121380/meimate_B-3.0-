<template>
  <!-- 控制首頁的頁尾   中間 animate__animated animate__fadeIn animate__slow animate__delay-2-->
  <div class="relative w-full" style="padding-bottom: calc(66px + env(safe-area-inset-bottom, 0px))">
    <router-view></router-view>
    <C-Bottom-Nav v-if="!hideBottomNav" />
    <C-Loading-Overlay v-model="isloading" :layerIndex="10"></C-Loading-Overlay>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'home-root',
  metaInfo: {
    title: 'Meimate Stylist',
  },
  mounted() { },
  data() {
    return {
      isloading: false,
    };
  },
  methods: {
    doRoute(routName) {
      this.isloading = false;
      this.$router.push({ name: routName });
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo', 'currentMechantId', 'userAuthorizeList']),
    isAuthority() {
      return (name) => this.userAuthorizeList.find((item) => item.pageName === name && item.authority);
    },
    isHome() {
      return this.$route.name !== 'Home';
    },
    routeMetaTransition() {
      return this.$route.meta.transition;
    },
    hideBottomNav() {
      // You can implement logic to hide bottom nav on sub-detail pages if needed
      return false;
    },
  },
};
</script>

<style lang="scss"></style>
