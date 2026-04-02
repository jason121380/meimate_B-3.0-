<template>
    <router-view></router-view>
</template>

<script>
export default {
  name: 'coupon-root',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 發放優惠券',
  },
  data() {
    return {
    };
  },
  methods: {
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
