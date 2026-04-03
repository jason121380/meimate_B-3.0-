<template>
  <C-Main-Block>
    <C-Back-Nav :title="'報表'"></C-Back-Nav>
    <section class="mx-auto mt-[68px] w-full max-w-screen-md pb-24">
      <div class="flex flex-col text-[15px]">
        <template v-for="(item, index) in reportList">
          <div
            v-if="isAuthority(item.label)"
            :key="`reportList${index}`"
            @click="doRoute(item.name)"
            @keypress="doRoute(item.name)"
            class="flex cursor-pointer items-center justify-between border-b border-gray-50 px-6 py-4"
          >
            <div class="flex items-center gap-3">
              <i :class="item.icon" class="text-xl text-gray-400"></i>
              <span class="font-medium text-gray-800">{{ item.label }}</span>
            </div>
            <i class="bi bi-chevron-right text-gray-300"/>
          </div>
        </template>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'priceList-index',
  description: '報表的首頁',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 報表',
  },
  data() {
    return {
      reportList: [
        { label: '設計師日報表', name: 'Report-daily-report', icon: 'bi-file-earmark-text' },
        { label: '訂單紀錄', name: 'Report-bill', icon: 'bi-receipt' },
        { label: '抽成報表', name: 'Report-profit-cut', icon: 'bi-pie-chart' },
        { label: '互助日報表', name: 'Report-emp-earn', icon: 'bi-people' },
        { label: '設計師業績分析表', name: 'Report-analysis', icon: 'bi-graph-up' },
        { label: '薪資條', name: 'Report-salary', icon: 'bi-cash-coin' },
        { label: '店販抽成明細', name: 'Report-draw-detail', icon: 'bi-bag' },
      ],
    };
  },
  mounted() {},
  methods: {
    doRoute(name) {
      this.$router.push({ name });
    },
  },
  computed: {
    ...mapState('userInfo', ['userAuthorizeList']),
    isAuthority() {
      return (name) => this.userAuthorizeList.find(
        (item) => item.pageName === name && item.authority,
      );
    },
  },
};
</script>

<style></style>
