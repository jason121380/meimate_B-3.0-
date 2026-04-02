<template>
    <router-view></router-view>
</template>

<script>

export default {
  name: 'priceList-root',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 價目表',
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
