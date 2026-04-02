<template>
    <router-view></router-view>
</template>

<script>
export default {
  name: 'report-root',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 報表',
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
