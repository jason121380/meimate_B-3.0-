<template>
  <C-Main-Block>
    <!-- GETTER_MECHANTNAME -->
    <C-Back-Nav></C-Back-Nav>
    <section class="relative p-4">
      <div class="relative mb-4 flex">
        <i
          @click="$router.push({ name: 'Order-list' })"
          @keypress="$router.push({ name: 'Order-list' })"
          class="bi bi-list-ul absolute left-4 text-xl"
        />
        <h1 class="m-auto font-bold">預約總覽</h1>
        <i
          @click="$router.push({ name: 'ScheduleBreak-Add' })"
          @keypress="$router.push({ name: 'ScheduleBreak-Add' })"
          class="bi bi-plus-circle absolute right-4 text-xl"
        />
      </div>
      <!-- locale="zh-TW" -->
      <transition name="collapseTransition">
        <vc-date-picker locale="en" @update:to-page="swipeMonth($event)" :select-attribute="selectedAttribute" is-expanded
          v-model="selectedDate" :attributes="attrs" :masks="masks" class="order relative text-center">
          <template v-slot:header="{ year, month }">
            <div class="relative    px-4 pt-4">
                <span class="font-bold">{{ year  }}年 {{ month }}月</span>
            </div>
          </template>
          <!-- 左箭頭 -->
          <template v-slot:header-left-button>
            <i
              @click="preNextMonth(-1)"
              @keypress="preNextMonth(-1)"
              class="bi bi-chevron-left my-3"
            />
          </template>
          <!-- 右箭頭 -->
          <template v-slot:header-right-button>
            <i
              @click="preNextMonth(1)"
              @keypress="preNextMonth(1)"
              class="bi bi-chevron-right my-3"
            />
          </template>

          <!-- eslint-disable-next-line vue/no-unused-vars -->
          <template v-slot:day-content="{ day, attributes }">
            <!-- 每個日期自己排版 -->
            <div class="flex flex-col" @click="setSelectDate(day.date)"
              @keypress="setSelectDate(day.date)">
              <div class="text-primary">
                <p class="day-label relative my-2 flex flex-col text-sm" :class="{'before:contents-[``] !text-white before:absolute  before:inset-x-0 before:-top-px before:z-[-1] before:m-auto before:inline-block before:size-[24px] before:rounded-[50%] before:bg-second': $dayjs(selectedDate).valueOf()===$dayjs(day.date).startOf('d').valueOf()}">

                  {{ day.day }}
                    <!-- <button @click="show(day.day)">btn</button> -->
                </p>
              </div>
              <!-- @click="searchForm.selectedDate = day.date" -->
              <div class="m-auto inline-block h-6">
                <!-- 每個點點自己排版 attributes從day-content提供，hasOnlyOrder判斷當天有資料並且剔除手動點擊的點點-->
                <span v-if="hasOnlyOrder(attributes)"
                  class="m-[2px] inline-block size-[5px] rounded-[50%] bg-second"></span>
              </div>

            </div>
            <!-- <button @click="show(attributes)">btn</button> -->
          </template>
        </vc-date-picker>

      </transition>

      <!-- data picker 結束!!!!! -->
      <section class="sect">
        <h2 class="!pb-2">預約明細</h2>
        <h3>待審查({{ isReviewResult }})</h3>
          <p v-if="!isReviewResult" class="tracking-wider">目前沒有待審查的預約</p>
          <div v-else class="content" v-for="(reviewItem, index) in reviewResult" :key="`reviewItem${index}`"
          @click="doRoute(reviewItem, true)" @keypress="doRoute(reviewItem, true)">
          <div class="number item">
            <img src="@/static/images/calendar-days-regular.svg" alt="calander" />
            <span>{{ reviewItem.orderDate | dateFmtROCMMDD }}</span>
          </div>
          <div class="number item">
            <img src="@/static/images/clock-regular.svg" alt="calander" />
            <span>{{ reviewItem.orderDate | dateFmtHm }}</span>
          </div>
          <div class="text item">
            <img src="@/static/images/users-light.svg" alt="calander" />
            <span class="truncate">{{
              reviewItem.customerName || "--"
            }}</span>
          </div>
          <div class="status">
            <span>{{ reviewItem.status }}</span>
          </div>
          <div>
            <img src="@/static/images/arrow.svg" alt="arrow" class="arrow" />
          </div>
        </div>

        <h3>預約明細({{ isOrderResult }})</h3>

        <p v-if="!isOrderResult" class="tracking-wider">目前沒有待審查的預約</p>
        <div v-else class="content" v-for="(reviewItem, index) in orderResult" :key="`reviewItem${index}`"
          @click="doRoute(reviewItem, false)" @keypress="doRoute(reviewItem, false)">
          <div class="number item">
            <img src="@/static/images/calendar-days-regular.svg" alt="calander" />
            <span>{{ reviewItem.orderDate | dateFmtROCMMDD }}</span>
          </div>
          <div class="number item !w-1/5">
            <img src="@/static/images/clock-regular.svg" alt="calander" />
            <span>{{ reviewItem.orderDate | dateFmtHm }}</span>
          </div>
          <div class="text item !w-1/5">
            <img src="@/static/images/users-light.svg" alt="calander" />
            <span class="truncate">{{
              reviewItem.customerName || "--"
            }}</span>
          </div>
          <div class="status">
            <span>{{ reviewItem.status }}</span>
          </div>
          <div>
            <img src="@/static/images/arrow.svg" alt="arrow" class="arrow" />
          </div>
        </div>
      </section>
    </section>
  </C-Main-Block>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'order-index',
  description: '預約的首頁',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 預約',
  },
  data() {
    return {
      count: 1,
      masks: {
        weekdays: 'WWW',
      },
      selectedDate: this.$dayjs().startOf('day').valueOf(), // 紀錄選到的日期
      monthDate: {
        // 記錄整月的開始與結束
        start: this.$dayjs().startOf('M').valueOf(),
        end: this.$dayjs().endOf('M').valueOf(),
      },
      monthlyData: [], // 整月的資料紀錄
      attrs: [],
      selectedAttribute: {
        // 日曆選定的日期樣式
        highlight: {
          style: {
            // 預設變透明，要手刻顏色與大小
            background: 'transparent',
          },
          fillMode: 'solid',
        },
      },
    };
  },
  async created() {
    await this.getMonthlyOrders();
  },
  methods: {
    // 測試用
    show(data) {
      console.log(data);
    },
    setSelectDate(date) {
      this.selectedDate = this.$dayjs(date).startOf('d').valueOf();
    },
    async getMonthlyOrders() {
      const submit = {
        dateRange: {
          startDate: this.monthDate.start,
          endDate: this.monthDate.end,
        },
        customerKeyword: '',
        isEarlierRecordDisplay: null,
      };
      const resp = await this.$api.getDesignerReservation(submit);
      const { data } = resp.data;
      this.monthlyData = data.getDesignerReservation;
      this.attrs = data.getDesignerReservation.map((item) => ({ key: item.orderId, dates: item.orderDate }));
    },
    doRoute(item, isReview) {
      this.$router.push({ name: 'ScheduleBreak-Detail', query: { id: item.orderId, isReview } });
    },
    preNextMonth(num) {
      this.monthDate.start = this.$dayjs(this.monthDate.start).add(num, 'M').startOf('M').valueOf();
      this.monthDate.end = this.$dayjs(this.monthDate.end).add(num, 'M').endOf('M')
        .valueOf();
    },
    swipeMonth(e) {
      // this.count = e;
      // const { year } = e;
      // const { month } = e;
      this.monthDate.start = this.$dayjs(`${e.year}/${e.month}/1`).startOf('month').valueOf();
      this.monthDate.end = this.$dayjs(`${e.year}/${e.month}/1`).endOf('month').valueOf();
      // const y = e.year;
      // const m = e.month - 1;
      // const firstDay = new Date(y, m, 1);
      // const lastDay = new Date(y, m + 1, 0);
      // const starDate = this.$dayjs(firstDay).valueOf();
      // const endDate = this.$dayjs(lastDay).valueOf();
      // this.monthDate.start = starDate;
      // this.monthDate.end = endDate;
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo', 'currentMechantId']),
    ...mapGetters('userInfo', ['GETTER_MECHANTNAME']),
    isReviewResult() {
      return this.reviewResult.length;
    },
    isOrderResult() {
      return this.orderResult.length;
    },
    hasOnlyOrder() {
      return (attr) => {
        let status = false;
        // 選擇的日期，預設attribute也會有資料，差異在多了highlight屬性
        // 如果資料只有一筆，額外判斷那一筆是否有highlight屬性，是的話回傳false
        if (Array.isArray(attr) && attr.length === 1) {
          status = !attr[0].highlight;
        }
        if (Array.isArray(attr) && attr.length > 1) {
          status = true;
        }
        return status;
      };
    },
    getOrder() {
      return this.monthlyData ? this.monthlyData.filter(
        (order) => this.$dayjs(order.orderDate).startOf('day').valueOf() === this.$dayjs(this.selectedDate).startOf('day').valueOf(),
      ) : [];
    },
    reviewResult() {
      return this.getOrder.length >= 1 ? this.getOrder.filter((order) => order.status === '待審核') : [];
    },
    orderResult() {
      return this.getOrder.length >= 1 ? this.getOrder.filter((order) => order.status !== '待審核') : [];
    },
  },
  watch: {
    monthDate: {
      deep: true,
      handler() {
        this.getMonthlyOrders();
        if (this.$dayjs().month() === this.$dayjs(this.monthDate.start).month()) {
          this.selectedDate = this.$dayjs().startOf('d').valueOf();
        } else {
          this.selectedDate = this.$dayjs(this.monthDate.start).startOf('d').valueOf();
        }
      },
    },
  },
};
</script>

<style scoped>
::v-deep .vc-arrow{
  width: 44px;
}
::v-deep .vc-arrow:hover {
  background-color: transparent;
}
::v-deep .order div[class*="vc-weeks"] {
  @apply p-4;
}

::v-deep .order div[class*="vc-weekday"] {
  @apply pb-4 mb-3;
  border-bottom: 2px solid #eee;
}

::v-deep .in-next-month {
  display: none;
}

.vc-container {
  @apply rounded-[10px] mb-3;
  border: none;
}

.sect {
  @apply flex flex-col rounded-[10px] bg-white mb-3 pb-[10px] relative;
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
  @apply flex aspect-square w-full items-center !justify-center rounded-full bg-[#F7F7F7] mb-2;
}

/* 預約明細類 */
.sect h3 {
  @apply text-left ml-8 relative text-[#111827] font-[500]  before:absolute before:top-[5px] before:left-[-8px] before:w-[3px] before:h-[70%] before:bg-[#111827] before:rounded-[5px];
}
.sect h3::before{
  content: '';
}

.sect p {
  @apply mb-3 ml-[2em] pl-2 text-left text-[13px] font-[500] text-[#888];
}

.sect .content {
  @apply mb-2 select-none text-[13px] font-[500] text-[#111827] mx-4 my-2 flex items-center justify-between rounded-lg bg-[#F7F7F7] p-2;
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
