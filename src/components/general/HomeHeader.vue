<template>
  <section>
    <div
      class="relative w-full border-none bg-default-color transition-none lg:h-28"
    >
      <div
        v-once
        class="flex items-center justify-between border-none bg-gradient-to-r from-meimate-yellow to-meimate-pink px-[6%] py-4 text-lg text-white lg:mx-10 lg:mt-10 lg:h-[78px] lg:rounded-[2rem] lg:px-6 lg:py-0"
      >
        <div class="flex items-center">
          <button @click="doRoute" class="flex gap-1 pl-2">
            <img
              src="./../../static//logo_meimate.svg"
              alt=""
              class="h-10 w-36 object-contain"
            />
          </button>
        </div>
      </div>
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeHeader',
  methods: {
    doRoute() {
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>
