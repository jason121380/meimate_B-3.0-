<template>
    <transition :name="routeMetaTransition">
      <keep-alive :exclude="['customer-userInfo']">
        <router-view></router-view>
      </keep-alive>
    </transition>
</template>

<script>
export default {
  name: 'customer-root',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 客戶資料查詢',
  },
  computed: {
    routeMetaTransition() {
      return this.$route.meta.transition;
    },
  },
};
</script>

<style>

</style>
