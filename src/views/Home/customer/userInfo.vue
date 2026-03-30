<template>
  <C-Main-Block>
    <C-Back-Nav
      :routeTarget="{ name: 'Customer' }"
      :title="'客戶資料查詢'"
    ></C-Back-Nav>
    <section
      class="relative mx-auto mt-20 w-full max-w-screen-md font-sans lg:mt-40 lg:px-10"
    >
      <ul
        class="mb-4 flex w-full items-center gap-4 overflow-scroll rounded-lg px-5"
      >
        <li
          v-for="item in items"
          :key="item.componentId"
          :class="[
            `${
              seletedTab === item.componentId
                ? 'border-b-2 border-solid border-meimate-pink font-bold text-meimate-pink'
                : 'font-medium text-meimate-blue-gray'
            }`,
          ]"
          @click="seletedTab = item.componentId"
          @keypress="seletedTab = item.componentId"
          class="w-full text-center"
        >
          <p class="whitespace-nowrap py-2.5 text-sm">{{ item.name }}</p>
        </li>
      </ul>
      <div class="mx-auto px-5">
        <keep-alive>
          <component :is="seletedTab"></component>
        </keep-alive>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
import {
  UserInfo,
  Consumption,
  Income,
  Coupon,
  HairInfo,
} from '@/components/Home/customer/index';

export default {
  name: 'customer-userInfo',
  description: '客戶資料查詢的個人資料頁',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 客戶資料查詢',
  },
  components: {
    Consumption,
    Coupon,
    Income,
    UserInfo,
    HairInfo,
  },
  data() {
    return {
      seletedTab: 'UserInfo',
      items: [
        { name: '個人資料', componentId: 'UserInfo' },
        { name: '服務紀錄', componentId: 'Consumption' },
        { name: '入金紀錄', componentId: 'Income' },
        { name: '卡券紀錄', componentId: 'Coupon' },
        { name: '顧客髮況', componentId: 'HairInfo' },
      ],
    };
  },
  methods: {
    doRoute(name) {
      this.$router.push({ name });
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.scrollnone {
  &::-webkit-scrollbar {
    display: none !important;
  }
}
</style>
