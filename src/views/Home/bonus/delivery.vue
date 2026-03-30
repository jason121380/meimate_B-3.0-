<template>
 <C-Main-Block>
    <C-Back-Nav :title="'發紅利點數'" :routeTarget="{ name: 'Bonus' }"></C-Back-Nav>
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

      <p class="my-4 text-center">選擇發送對象</p>

      <div class="mb-4 flex items-center justify-between">
        <C-Input v-model="searchCtx" :placeholder="'搜尋姓名、手機、代號'" class="mb-0 mr-2 w-full">
          <template v-slot:endIcon>
            <i class="bi bi-search"/>
          </template>
        </C-Input>
        <i
          class="bi bi-funnel"
          @click="isActiveFilter = !isActiveFilter"
          @keypress="isActiveFilter = !isActiveFilter"
        />
      </div>

      <div class="flex items-center border-b border-solid border-primary/50 text-left">
        <div class="w-2/12">選取</div>
        <div class="w-3/12">姓名</div>
        <div class="w-5/12">手機</div>
        <div class="w-2/12">代號</div>
      </div>

      <div
        v-for="(item, index) in resultList"
        class="flex items-center border-b border-solid border-primary/50 text-left"
        :key="`bonus${index}`"
      >
        <div class="w-2/12">
          <C-Checkbox v-model="seleted"></C-Checkbox>
        </div>
        <div class="w-3/12">{{ item.name }}</div>
        <div class="w-5/12">{{ item.phone }}</div>
        <div class="w-2/12">{{ item.userId }}</div>
      </div>

      <div class="fixed bottom-[100px] flex w-[calc(100%-24px)] items-center gap-4">
        <div
          class="w-full cursor-pointer bg-second px-4 py-2 text-white"
          @click="doRoute({ name: 'Bonus' })"
          @keypress="doRoute({ name: 'Bonus' })"
        >
          上一步
        </div>
        <div
          class="w-full cursor-pointer bg-second px-4 py-2 text-white"
          @click="doDelivery"
          @keypress="doDelivery"
        >
          發送
        </div>
      </div>
    </section>

    <C-Filter-Wrap v-model="isActiveFilter" :searchAdvanceCtx="searchAdvanceCtx"></C-Filter-Wrap>
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
      dateYYYY: '',
      dateMM: '',
      isActiveFilter: false,
      searchCtx: '',
      seleted: [],
      searchAdvanceCtx: {
        year: '',
        month: '',
        day: '',
      },
      resultList: [
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
        { name: '黃姿穎', phone: '0912345678', userId: 'A001' },
      ],
    };
  },
  methods: {
    doRoute(item) {
      this.$router.push({ name: item.name });
    },
    doDelivery() {
      this.$swal
        .fire({
          showCloseButton: true,
          html: `<div class="flex items-center justify-center my-10">
              <img src="/stylist/assets/images/success.svg" alt="" class="inline-block mr-1" /><span>發送成功</span>
            </div>`,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        .then(() => {
          this.doRoute({ name: 'Bonus-Delivery-Res' });
        });
    },
  },
  computed: {},
};
</script>

<style></style>
