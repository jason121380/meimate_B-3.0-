<template>
    <router-view></router-view>
</template>

<script>

export default {
  name: 'employee-schedule-root',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 排班表',
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
