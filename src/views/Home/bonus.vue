<template>
    <router-view></router-view>
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
