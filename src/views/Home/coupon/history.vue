<template>
   <C-Main-Block>
    <C-Back-Nav :title="'發放優惠券'" :routeTarget="{ name: 'Coupon' }"></C-Back-Nav>
    <section class="relative p-4">
      <div class="text-sm">
        <!-- header -->
        <div class="flex flex-nowrap gap-1 border-b border-solid border-primary text-left">
          <div class="w-2/6">日期</div>
          <div class="w-1/6">時間</div>
          <div class="w-2/6">發送優惠券</div>
          <div class="w-1/6 text-center">發送對象</div>
        </div>
        <!-- body -->
        <div v-for="(item, key) in resultList" :key="`result${key}`">
          <div
            class="my-2 flex flex-nowrap gap-1 border-b border-solid border-primary text-left"
            v-for="(innerItem, innerIndex) in item.orderList"
            :key="`resultInnerItem${innerIndex}`"
            @click="doRoute({ name: 'Coupon-Delivery-History' })"
            @keypress="doRoute({ name: 'Coupon-Delivery-History' })"
          >
            <div class="w-2/6">{{ item.dateTime }}</div>
            <div class="w-1/6">{{ innerItem.time }}</div>
            <div class="w-2/6">{{ innerItem.totalUsers }}張</div>
            <div class="flex w-1/6 items-center justify-between">
              <span>{{ innerItem.totalCount }}位</span>
              <span>
                <i class="bi bi-chevron-right"/>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="fixed bottom-[100px] flex w-[calc(100%-24px)] items-center gap-4">
        <div
          class="w-full cursor-pointer bg-second px-4 py-2 text-white"
          @click="doRoute({ name: 'Coupon' })"
          @keypress="doRoute({ name: 'Coupon' })"
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
  description: '發放優惠券的歷史紀錄',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 發放優惠券',
  },
  data() {
    return {
      resultList: [
        {
          dateTime: '2022/04/27',
          orderList: [
            {
              time: '10:25',
              totalUsers: 2,
              totalCount: 2,
            },
            {
              time: '19:25',
              totalUsers: 2,
              totalCount: 2,
            },
          ],
        },
        {
          dateTime: '2022/04/26',
          orderList: [
            {
              time: '10:30',
              totalUsers: 2,
              totalCount: 2,
            },
            {
              time: '19:35',
              totalUsers: 2,
              totalCount: 2,
            },
          ],
        },
        {
          dateTime: '2022/04/25',
          orderList: [
            {
              time: '10:25',
              totalUsers: 2,
              totalCount: 2,
            },
            {
              time: '19:35',
              totalUsers: 2,
              totalCount: 2,
            },
          ],
        },
        {
          dateTime: '2022/04/24',
          orderList: [
            {
              time: '10:25',
              totalUsers: 2,
              totalCount: 2,
            },
            {
              time: '14:25',
              totalUsers: 2,
              totalCount: 2,
            },
            {
              time: '15:40',
              totalUsers: 2,
              totalCount: 2,
            },
            {
              time: '19:25',
              totalUsers: 2,
              totalCount: 2,
            },
          ],
        },
        {
          dateTime: '2022/04/23',
          orderList: [
            {
              time: '10:25',
              totalUsers: 2,
              totalCount: 2,
            },
            {
              time: '19:35',
              totalUsers: 2,
              totalCount: 2,
            },
          ],
        },
        {
          dateTime: '2022/04/22',
          orderList: [
            {
              time: '10:25',
              totalUsers: 2,
              totalCount: 2,
            },
            {
              time: '19:35',
              totalUsers: 2,
              totalCount: 2,
            },
          ],
        },
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
