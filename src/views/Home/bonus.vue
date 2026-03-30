<template>
    <transition :name="routeMetaTransition">
      <router-view></router-view>
    </transition>
</template>

<script>

export default {
  name: 'order-root',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 紅利點數',
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
