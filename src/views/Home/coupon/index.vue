<template>
 <C-Main-Block>
    <C-Back-Nav :title="'發放優惠券'"></C-Back-Nav>
    <section class="relative p-4">
      <div class="mb-4 text-right">
        <div
          class="inline-block w-fit cursor-pointer rounded-[10px] bg-primary px-2 py-1 text-white"
          @click="doRoute({ name: 'Coupon-History' })"
          @keypress="doRoute({ name: 'Coupon-History' })"
        >
          <span class="mr-[6px]">歷史紀錄</span>
          <i class="bi bi-clock-history"/>
        </div>
      </div>

      <p class="my-4 text-center">選擇優惠券</p>

      <div class="flex items-center border-b border-solid border-primary/50 text-left">
        <div class="w-1/6">選取</div>
        <div class="w-5/6">優惠券名稱</div>
      </div>

      <div
        v-for="(item, index) in resultList"
        class="flex items-center border-b border-solid border-primary/50 text-left"
        :key="`coupon${index}`"
      >
        <div class="w-1/6">
          <C-Checkbox v-model="seleted"></C-Checkbox>
        </div>
        <div class="w-5/6">{{ item.name }}</div>
      </div>

      <div class="fixed bottom-[100px] w-[calc(100%-24px)]">
        <div
          class="w-full cursor-pointer bg-second px-4 py-2 text-white"
          @click="doRoute({ name: 'Coupon-Delivery' })"
          @keypress="doRoute({ name: 'Coupon-Delivery' })"
        >
          下一步
        </div>
      </div>
    </section>
 </C-Main-Block>
</template>

<script>
export default {
  name: 'priceList-index',
  description: '發放優惠券的首頁',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 發放優惠券',
  },
  data() {
    return {
      seleted: [],
      resultList: [
        { name: '週年慶九折', id: '111', value: '111' },
        { name: '燙髮折九折', id: '222', value: '222' },
        { name: '好友邀請優惠500', id: '333', value: '333' },
        { name: '燙髮85折', id: '444', value: '444' },
        { name: '滿2000折100', id: '555', value: '555' },
      ],
    };
  },
  methods: {
    doRoute(item) {
      this.$router.push({ name: item.name });
    },
  },
  computed: {},
};
</script>

<style></style>
