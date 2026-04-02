<template>
  <!-- 測試資料日期 選擇 2022/12/13 如後端清掉資料，再聯繫名留工程師 -->
  <C-Main-Block>
    <C-Back-Nav
      :routeTarget="{ name: 'Report' }"
      :title="'互助日報表'"
    ></C-Back-Nav>
    <section class="mx-auto mt-20 w-full max-w-screen-md px-5 lg:mt-40 lg:px-10">
      <vc-date-picker
        is-required
        v-model="searchDate"
        mode="date"
        :max-date="$dayjs().format('YYYY-MM-DD')"
      >
        <template v-slot="{ inputValue, inputEvents }">
          <input
            type="text"
            name="互助日報表"
            class="w-full rounded-full px-6 py-3 font-bold tracking-wider text-black focus:outline-none"
            :value="inputValue"
            v-on="inputEvents"
          />
          <label for="互助日報表" class="hidden"></label>
        </template>
      </vc-date-picker>
      <div class="card card-body mt-4">
        <div class="break-words text-sm" v-if="reportResult">
          <div class="mx-auto my-4 text-primary">
            <p class="text-center text-lg font-semibold">
              {{ userInfo.user.name }}
            </p>
          </div>

          <div class="overflow-x-scroll" v-if="reportResult">
            <table class="w-full border-collapse">
              <thead>
                <tr class="text-left text-meimate-blue-gray">
                  <th class="min-w-16 p-1.5">#</th>
                  <th class="min-w-16 p-1.5">項目</th>
                  <th class="min-w-16 p-1.5">設計師</th>
                  <th class="min-w-16 p-1.5">金額</th>
                  <th class="min-w-16 p-1.5">點</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(hpRecord, index) in reportResult.helperRecord"
                  :key="`hpRecord${index}`"
                  class="font-medium text-black odd:bg-meimate-beige/50"
                >
                  <td class="truncate p-1.5">#{{ hpRecord.orderNo }}</td>
                  <td class="truncate p-1.5">{{ hpRecord.itemName }}</td>
                  <td class="truncate p-1.5">
                    {{ hpRecord.designer?.nameForReport }}
                  </td>
                  <td class="truncate p-1.5">
                    {{
                      handlePrice(
                        hpRecord.point,
                        hpRecord.price,
                        hpRecord.designer
                      )
                    }}
                  </td>
                  <td class="truncate p-1.5">{{ hpRecord.point }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            class="mt-2.5 grid grid-cols-12 p-2 text-lg font-bold text-meimate-pink"
          >
            <div class="col-span-5">合計</div>
            <div class="col-span-4 text-right">
              {{ reportResult.helperRecordPriceSummary }}
            </div>
            <div class="col-span-3 text-right">
              {{ reportResult.helperRecordPointSummary }}
            </div>
          </div>
          <div
            class="mt-2.5 grid grid-cols-12 rounded-[5px] bg-meimate-pink p-2 font-semibold text-white"
          >
            <div class="col-span-6"></div>
            <div class="col-span-3 text-right">日合計</div>
            <div class="col-span-3 text-right">累計</div>
          </div>
          <div class="text-sm font-medium" v-if="reportResult">
            <div class="grid grid-cols-12 bg-meimate-beige/50 p-2">
              <div class="col-span-6">互助獲得金額(不含點)</div>
              <div class="col-span-3 text-right">
                {{ reportResult.summaryCurrentDay.priceRetrieveWithoutPoint }}
              </div>
              <div class="col-span-3 text-right">
                {{ reportResult.summaryTillNow.priceRetrieveWithoutPoint }}
              </div>
            </div>
            <div class="grid grid-cols-12 p-2">
              <div class="col-span-6">
                互助獲得(點)點數<span v-if="isHelperPointPriceDisplay"
                  >/換算金額</span
                >
              </div>
              <div class="col-span-3 text-right">
                <span>{{
                  reportResult.summaryCurrentDay.priceRetrieveFromPoint
                }}</span>
                <span v-if="isHelperPointPriceDisplay"
                  >/{{ reportResult.summaryCurrentDay.point }}</span
                >
              </div>
              <div class="col-span-3 text-right">
                <span>{{
                  reportResult.summaryTillNow.priceRetrieveFromPoint
                }}</span>
                <span v-if="isHelperPointPriceDisplay"
                  >/{{ reportResult.summaryTillNow.point }}</span
                >
              </div>
            </div>
            <div class="grid grid-cols-12 bg-meimate-beige/50 p-2">
              <div class="col-span-6">店販業績</div>
              <div class="col-span-3 text-right">
                {{
                  checkMathRound(
                    reportResult.summaryCurrentDay.productPerformance
                  )
                }}
              </div>
              <div class="col-span-3 text-right">
                {{
                  checkMathRound(reportResult.summaryTillNow.productPerformance)
                }}
              </div>
            </div>
            <div class="grid grid-cols-12 p-2">
              <div class="col-span-6">店販抽成</div>
              <div class="col-span-3 text-right">
                {{ checkMathRound(reportResult.summaryCurrentDay.productRake) }}
              </div>
              <div class="col-span-3 text-right">
                {{ checkMathRound(reportResult.summaryTillNow.productRake) }}
              </div>
            </div>
            <div class="grid grid-cols-12 bg-meimate-beige/50 p-2">
              <div class="col-span-6">會員卡業績</div>
              <div class="col-span-3 text-right">
                {{
                  checkMathRound(
                    reportResult.summaryCurrentDay.membershipPerformance
                  )
                }}
              </div>
              <div class="col-span-3 text-right">
                {{
                  checkMathRound(
                    reportResult.summaryTillNow.membershipPerformance
                  )
                }}
              </div>
            </div>
            <div class="grid grid-cols-12 p-2">
              <div class="col-span-6">會員卡抽成</div>
              <div class="col-span-3 text-right">
                {{
                  checkMathRound(reportResult.summaryCurrentDay.membershipRake)
                }}
              </div>
              <div class="col-span-3 text-right">
                {{ checkMathRound(reportResult.summaryTillNow.membershipRake) }}
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div
            class="flex h-20 items-center justify-center text-lg font-bold text-meimate-blue-gray"
          >
            <img src="@/static/images/file.svg" alt="" class="mr-2" />查無資料
          </div>
        </div>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'emp-Earn',
  description: '報表的互助日報表',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 互助日報表',
  },
  data() {
    return {
      searchDate: this.$dayjs().valueOf(),
      reportResult: null,
      isUsingMathRoundInDesignerDailyReport: false,
      isHelperPointPriceDisplay: null,
      isRefresh: true,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await Promise.all([
        this.getIsUsingMathRoundInDesignerDailyReport(),
        this.getPriceDisplayOnDailyReportDefault(),
      ]).then(async () => {
        await this.getHelperDailyReport();
      });
    },
    // 日報表是否顯示「金額」欄位 取isHelperPointPriceDisplay
    async getPriceDisplayOnDailyReportDefault() {
      const resp = await this.$api.getPriceDisplayOnDailyReportDefault();
      const { data, errors } = resp.data;
      if (errors) return;
      this.isHelperPointPriceDisplay = data.getPriceDisplayOnDailyReportDefault.isHelperPointPriceDisplay;
    },
    // 取得互助日資料
    async getHelperDailyReport() {
      const submitForm = {
        input: {
          helperIds: this.userInfo.user.id,
          date: this.$dayjs(this.searchDate).valueOf(),
        },
      };
      const resp = await this.$api.helperDailyReport(submitForm);
      const { data, errors } = JSON.parse(JSON.stringify(resp.data));
      if (errors) return;
      this.reportResult = data?.helperDailyReport[0];
    },
    // 取得是否使用四捨五入到整數
    async getIsUsingMathRoundInDesignerDailyReport() {
      const resp = await this.$api.getIsUsingMathRoundInDesignerDailyReport();
      const { data, errors } = resp.data;
      if (errors) return;
      this.isUsingMathRoundInDesignerDailyReport = data.getIsUsingMathRoundInDesignerDailyReport;
    },
    checkMathRound(value) {
      return this.isUsingMathRoundInDesignerDailyReport
        ? Math.round(value)
        : value;
    },
    isMatchPriceDsply(point, price) {
      // 加個否定成顯示條件  //isHelperPointPriceDisplay=false且 點數!=0 、金額=0，隱藏
      return !(!this.isHelperPointPriceDisplay && point && !price);
    },
    isPriceUsingMathRound(designer) {
      // 如果沒有designer 且 要MathRound為真時 ，要四捨五入金額
      return !designer && this.isUsingMathRoundInDesignerDailyReport;
    },
    handlePrice(point, price, designer) {
      // 先處理不顯示金額的狀況
      if (!this.isMatchPriceDsply(point, price)) return '';
      if (this.isPriceUsingMathRound(designer)) return this.checkMathRound(price);

      return price;
    },
  },
  watch: {
    searchDate() {
      if (!this.searchDate) return;
      this.getHelperDailyReport();
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo']),
  },
};
</script>

<style>
.base-item {
  @apply flex items-center justify-between p-2 border-b border-dashed border-gray pb-2;
}

.base-item.total {
  @apply border-0;
}

.base-item.bg-txt {
  @apply border-0;
}

.bg-txt {
  @apply bg-ml p-2 text-white rounded-[5px];
}
</style>
