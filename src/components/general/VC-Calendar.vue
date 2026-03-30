<template>
  <vc-calendar is-expanded :attributes="attrs" class="relative mt-[50px]">
    <template v-slot:header="{year,monthLabel}">
      <div class="absolute inset-x-0 top-[-50px] w-full">
        <div class="flex items-center justify-center">
          <span>{{year |dateFormat }}年</span>
          <span class="ml-2 text-2xl">{{monthLabel}}</span>
        </div>
      </div>
    </template>

    <template v-slot:header-left-button>
      <i class="bi bi-chevron-left absolute left-0 top-[-46px] text-2xl text-primary"/>
    </template>

    <template v-slot:header-right-button>
      <i class="bi bi-chevron-right absolute right-0 top-[-46px] text-2xl text-primary"/>
    </template>
  </vc-calendar>
</template>

<script>
export default {
  name: 'cus-va-calendar',
  description: '客製化的日曆',
  data() {
    return {
      attrs: [
        {
          key: 'today',
          dot: {
            color: 'orange',
            fillMode: 'solid',
          },
          color: 'green',
          fillMode: 'solid',
          dates: new Date(),
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
