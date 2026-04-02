<template>
    <router-view></router-view>
</template>

<script>

export default {
  name: 'punch-root',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 打卡',
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
