<template>
    <transition :name="routeMetaTransition">
      <router-view></router-view>
    </transition>
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
