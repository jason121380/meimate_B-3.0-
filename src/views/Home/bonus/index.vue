<template>
 <C-Main-Block>
    <C-Back-Nav :title="'發紅利點數'"></C-Back-Nav>
    <section class="relative p-4">
      <div class="mb-4 text-right">
        <div
          class="inline-block w-fit cursor-pointer rounded-[10px] bg-primary px-2 py-1 text-white"
          @click="doRoute({ name: 'Bonus-History' })"
          @keypress="doRoute({ name: 'Bonus-History' })"
        >
          <span class="mr-[6px]">歷史紀錄</span>
          <i class="bi bi-clock-history"/>
        </div>
      </div>

      <p class="my-4 text-center">選擇紅利點數</p>

      <div class="flex items-center border-b border-solid border-primary/50 text-left">
        <div class="w-1/6">選取</div>
        <div class="w-4/6">優惠券名稱</div>
        <div class="w-1/6">點數</div>
      </div>

      <div
        v-for="(item, index) in resultList"
        class="flex items-center border-b border-solid border-primary/50 text-left"
        :key="`bonus${index}`"
      >
        <div class="w-1/6">
          <C-Checkbox v-model="seleted"></C-Checkbox>
        </div>
        <div class="w-4/6">{{ item.name }}</div>
        <div class="w-1/6">{{ item.value }} P</div>
      </div>

      <div class="fixed bottom-[100px] w-[calc(100%-24px)]">
        <div
          class="w-full cursor-pointer bg-second px-4 py-2 text-white"
          @click="doRoute({ name: 'Bonus-Delivery' })"
          @keypress="doRoute({ name: 'Bonus-Delivery' })"
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
  description: '發紅利點數的首頁',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 發紅利點數',
  },
  data() {
    return {
      seleted: [],
      resultList: [
        { name: '首次新客', id: '111', value: '100' },
        { name: '燙髮折抵', id: '222', value: '200' },
        { name: '好友邀請優惠', id: '333', value: '300' },
        { name: '染髮', id: '444', value: '400' },
        { name: '生日禮', id: '555', value: '500' },
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
