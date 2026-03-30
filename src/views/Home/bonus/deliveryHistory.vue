<template>
 <C-Main-Block>
    <C-Back-Nav :title="'發紅利點數'" :routeTarget="{ name: 'Bonus-History' }"></C-Back-Nav>
    <section class="relative p-4">
      <div class="text-left text-sm">
        <p
          class="before:contents-[''] relative my-3 pl-2 before:absolute before:inset-0 before:h-full before:w-1 before:bg-primary"
        >
          發送的紅利點數({{ isReviewResult }})張
        </p>
        <div>
          <p class="pl-2">紅利點數名稱</p>

          <div
            v-for="(reviewItem, index) in reviewResult"
            :key="`reviewItem${index}`"
            @click="doRoute(reviewItem)"
            @keypress="doRoute(reviewItem)"
            class="mb-3 flex cursor-pointer items-center justify-between border-b border-solid border-primary/50 py-1 pl-2"
          >
            <div>
              <span>{{ reviewItem.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="text-left text-sm">
        <p
          class="before:contents-[''] relative my-3 pl-2 before:absolute before:inset-0 before:h-full before:w-1 before:bg-primary"
        >
          發送對象({{ isOrderResult }})位
        </p>
        <div class="flex pl-2">
          <div class="w-1/3">姓名</div>
          <div class="w-1/3">手機</div>
          <div class="w-1/3">代號</div>
        </div>
        <div>
          <div
            v-for="(reviewItem, index) in orderResult"
            :key="`reviewItem${index}`"
            @click="doRoute(reviewItem)"
            @keypress="doRoute(reviewItem)"
            class="mb-3 flex cursor-pointer items-center justify-between border-b border-solid border-primary/50 py-1 pl-2"
          >
            <div class="w-1/3">
              <span>{{ reviewItem.name }}</span>
            </div>
            <div class="w-1/3">
              <span>{{ reviewItem.phone }}</span>
            </div>
            <div class="w-1/3">
              <span>{{ reviewItem.userId }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="fixed bottom-[100px] w-[calc(100%-24px)]">
        <div
          class="w-full cursor-pointer bg-second px-4 py-2 text-white"
          @click="doRoute({ name: 'Bonus-History' })"
          @keypress="doRoute({ name: 'Bonus-History' })"
        >
          回上一頁
        </div>
      </div>
    </section>
 </C-Main-Block>
</template>

<script>
export default {
  name: 'priceList-index',
  description: '發紅利點數的發送紀錄',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 發紅利點數',
  },
  data() {
    return {
      reviewResult: [{ name: '週年慶9折' }, { name: '好友邀請優惠500' }],
      orderResult: [
        {
          name: '崔育菁',
          phone: '0912345678',
          userId: 'A001',
        },
        {
          name: '吳佳依',
          phone: '0912345678',
          userId: 'A002',
        },
      ],
    };
  },
  methods: {
    doRoute(item) {
      this.$router.push({ name: item.name });
    },
  },
  computed: {
    isReviewResult() {
      return this.reviewResult.length;
    },
    isOrderResult() {
      return this.orderResult.length;
    },
  },
};
</script>

<style></style>
