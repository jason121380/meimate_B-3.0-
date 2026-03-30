<template>
  <C-Main-Block>
    <C-Back-Nav
      :routeTarget="{ name: 'Order' }"
      :title="'預約紀錄'"
      bgClass="bg-white"
    ></C-Back-Nav>
    <section class="mt-[68px] w-full bg-white pb-24">
      <!-- Tabs -->
      <div class="flex w-full bg-transparent text-center text-[15px] font-medium text-gray-400">
        <div
          @click="selectTab = '未完成'"
          @keypress.enter="selectTab = '未完成'"
          role="button"
          tabindex="0"
          class="relative flex-1 cursor-pointer py-3.5 transition-colors"
          :class="selectTab === '未完成' ? 'text-gmb-orange-500 font-bold' : ''"
        >
          未完成
          <div v-if="selectTab === '未完成'" class="absolute bottom-0 left-1/2 h-[2px] w-[80px] -translate-x-1/2 bg-gmb-orange-500"></div>
        </div>
        <div
          @click="selectTab = '已結束'"
          @keypress.enter="selectTab = '已結束'"
          role="button"
          tabindex="0"
          class="relative flex-1 cursor-pointer py-3.5 transition-colors"
          :class="selectTab === '已結束' ? 'text-gmb-orange-500 font-bold' : ''"
        >
          已結束
          <div v-if="selectTab === '已結束'" class="absolute bottom-0 left-1/2 h-[2px] w-[80px] -translate-x-1/2 bg-gmb-orange-500"></div>
        </div>
      </div>
      <!-- Tab Separator Line -->
      <div class="h-px w-full bg-gray-100"></div>

      <div class="px-4 pt-4">
        <!-- 未完成 -->
        <div v-if="selectTab === '未完成'">
          <div v-if="isReviewResult" class="flex flex-col gap-3">
            <div
              v-for="(reviewItem, index) in reviewResult"
              :key="`reviewItem${index}`"
              @click="doRoute(reviewItem, true)"
              @keypress="doRoute(reviewItem, true)"
              class="flex w-full items-center justify-between rounded-xl bg-white p-4 shadow-sm"
            >
              <div class="flex flex-col gap-1">
                <div class="text-[15px] font-bold text-gray-800">{{ reviewItem.customerName || "--" }}</div>
                <div class="text-xs text-gray-400">{{ reviewItem.orderDate | dateFmtROCMMDD }} {{ reviewItem.orderDate | dateFmtHm }}</div>
              </div>
              <div class="flex items-center gap-3">
                <span class="rounded-full bg-meimate-pink/10 px-2 py-1 text-[11px] text-meimate-pink">{{ reviewItem.status }}</span>
                <i class="bi bi-chevron-right text-gray-300"></i>
              </div>
            </div>
          </div>
          <!-- Empty State -->
          <div v-else class="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-gray-200 py-16">
            <div class="mb-5 flex size-[60px] items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <i class="bi bi-file-earmark-text text-[22px] text-gray-300"></i>
            </div>
            <div class="text-[15px] font-bold text-gray-800">目前無資料</div>
            <div class="mt-1 text-xs text-gray-400">該分類下沒有預約紀錄</div>
          </div>
        </div>

        <!-- 已結束 -->
        <div v-else>
          <div v-if="isOrderResult" class="flex flex-col gap-3">
            <div
              v-for="(reviewItem, index) in orderResult"
              :key="`reviewItem${index}`"
              @click="doRoute(reviewItem, false)"
              @keypress="doRoute(reviewItem, false)"
              class="flex w-full items-center justify-between rounded-xl bg-white p-4 shadow-sm"
            >
              <div class="flex flex-col gap-1">
                <div class="text-[15px] font-bold text-gray-800">{{ reviewItem.customerName || "--" }}</div>
                <div class="text-xs text-gray-400">{{ reviewItem.orderDate | dateFmtROCMMDD }} {{ reviewItem.orderDate | dateFmtHm }}</div>
              </div>
              <div class="flex items-center gap-3">
                <span
                  class="rounded-full px-2 py-1 text-[11px]"
                  :class="{
                    'bg-meimate-pink/10 text-meimate-pink': reviewItem.status === '取消',
                    'bg-meimate-green/10 text-meimate-green': reviewItem.status === '成功',
                  }"
                >{{ reviewItem.status }}</span>
                <i class="bi bi-chevron-right text-gray-300"></i>
              </div>
            </div>
          </div>
          <!-- Empty State -->
          <div v-else class="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-gray-200 py-16">
            <div class="mb-5 flex size-[60px] items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <i class="bi bi-file-earmark-text text-[22px] text-gray-300"></i>
            </div>
            <div class="text-[15px] font-bold text-gray-800">目前無資料</div>
            <div class="mt-1 text-xs text-gray-400">該分類下沒有預約紀錄</div>
          </div>
        </div>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
export default {
  name: 'order-list',
  description: '預約的首頁',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 預約列表查詢',
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      selectTab: '未完成',
      searchData: '',
      isEarlierRecordDisplay: false,
      today: {
        start: this.$dayjs().startOf('d').valueOf(),
        end: this.$dayjs().endOf('d').valueOf(),
      },
      resultData: [],
    };
  },
  methods: {
    async init() {
      await this.getMonthlyOrders(this.isEarlierRecordDisplay, this.searchData);
    },
    async getMonthlyOrders(isEarlierRecordDisplay, customerKeyword) {
      const submit = {
        customerKeyword,
        isEarlierRecordDisplay,
      };
      const resp = await this.$api.getDesignerReservation(submit);
      const { data } = resp.data;
      this.resultData = data.getDesignerReservation;
    },
    async getOrders(clear = false) {
      this.searchData = clear ? '' : this.searchData;
      await this.getMonthlyOrders(this.isEarlierRecordDisplay, this.searchData);
    },
    doRoute(item, isReview) {
      console.log(item);
      this.$router.push({
        name: 'ScheduleBreak-Detail',
        query: { id: item.orderId, isReview },
      });
    },
  },
  computed: {
    reviewResult() {
      return this.resultData.length >= 1
        ? this.resultData.filter((order) => order.status === '待審核')
        : [];
    },
    orderResult() {
      return this.resultData.length >= 1
        ? this.resultData.filter((order) => order.status !== '待審核')
        : [];
    },
    isReviewResult() {
      return this.reviewResult.length;
    },
    isOrderResult() {
      return this.orderResult.length;
    },
  },
  watch: {
    isEarlierRecordDisplay(val) {
      this.getMonthlyOrders(val, this.searchData);
    },
  },
};
</script>

<style lang="scss" scoped>
.sect {
  @apply flex flex-col rounded-[10px] bg-white px-[1rem] py-[2rem] relative;
}

.sect h2 {
  @apply p-4 text-left text-[#111827] font-[700] text-[19px];
}

/* 功能選單 */
.sect .lists {
  @apply flex w-full flex-wrap;
}

.sect .lists li {
  @apply flex flex-col items-center w-[22.7138643068%] mb-[6%] mx-[5.3097345133%];
}

.sect .lists span {
  @apply select-none whitespace-nowrap text-sm font-[500] text-[#111827];
}

@media screen and (min-width: 768px) {
  .sect .lists li {
    @apply w-[19.5355191%] mx-[2.7322404%];
  }
}

.sect .lists li .pic {
  @apply flex aspect-square w-full items-center justify-center rounded-full bg-[#F7F7F7] mb-2;
}

/* 預約明細類 */
.sect h3 {
  @apply text-left ml-4 relative text-[#111827] font-[500] text-[14px] before:content-[''] before:absolute before:top-[5px] before:left-[-8px] before:w-[3px] before:h-[70%] before:bg-[#111827] before:rounded-[5px];
}

.sect p {
  @apply mb-3 ml-[2em] pl-2 text-left text-[13px] font-[500] text-[#888];
}

.sect .content {
  @apply mb-2 select-none text-[13px] font-[500] text-[#111827] my-2 flex items-center justify-between rounded-lg bg-[#F7F7F7] p-2;
}

.sect .content .item {
  @apply flex w-3/12 items-center justify-center;
}

.sect .content .number {
  @apply font-[700] font-['Arial'];
}

.sect .content .text {
  @apply font-[500] justify-start;
}

.sect .content .status {
  @apply w-3/12 font-[500] overflow-hidden text-ellipsis whitespace-nowrap;
}

.sect .content img {
  @apply mr-1 w-[15px];
}

.sect .content .arrow {
  @apply w-[7px];
}
</style>
