<template>
  <!-- 測試資料 2022/12/26 -->
  <C-Main-Block>
    <C-Back-Nav
      :routeTarget="{ name: 'Report' }"
      :title="'設計師日報表'"
    ></C-Back-Nav>
    <section class="mx-auto mt-20 w-full max-w-screen-md px-5 lg:mt-24 lg:px-10">
      <vc-date-picker is-required v-model="searchDate" mode="date">
        <template v-slot="{ inputValue, inputEvents }">
          <input
            type="text"
            name="設計師日報表"
            class="w-full rounded-full px-6 py-3 font-bold tracking-wider text-black focus:outline-none"
            :value="inputValue"
            v-on="inputEvents"
          />
          <label for="設計師日報表" class="hidden"></label>
        </template>
      </vc-date-picker>
      <div v-for="(item, idx) in reviewResult" :key="idx" class="text-left">
        <div class="card mt-4 p-5 text-sm">
          <div class="mx-auto mb-4 text-primary">
            <p class="mt-2 text-lg font-semibold">{{ item.user.name }}</p>
          </div>
          <div class="overflow-x-scroll" v-if="item.orderRecord.length > 0">
            <table class="w-full table-fixed">
              <thead>
                <tr class="text-meimate-blue-gray">
                  <th class="w-16 p-1.5">單號</th>
                  <th class="w-[6.25rem] p-1.5 pl-0">類別</th>
                  <th class="w-[6.5rem] p-1.5 pl-0">項目</th>
                  <th class="w-20 p-1.5 pl-0">金額</th>
                  <th class="w-20 p-1.5 pl-0">業績</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(orderRecordItem, index) in item.orderRecord"
                  :key="`orderRecordItem-${index}`"
                  class="font-medium text-black odd:bg-meimate-beige/50"
                >
                  <td class="p-1.5">
                    {{ orderRecordItem.orderNo
                    }}<span v-if="orderRecordItem.designation">*</span>
                  </td>
                  <td class="p-1.5 pl-0">{{ orderRecordItem.category }}</td>
                  <td class="p-1.5 pl-0">{{ orderRecordItem.itemName }}</td>
                  <td class="p-1.5 pl-0">
                    {{ mathRound(orderRecordItem.fakePerformance) }}
                  </td>
                  <td class="p-1.5 pl-0">
                    {{ mathRound(orderRecordItem.truthPerformance) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 合計 -->
          <div v-if="idx === reviewResult.length - 1" class="mt-2.5">
            <ul>
              <li
                class="grid grid-cols-12 rounded-[5px] p-2 font-semibold text-meimate-pink"
              >
                <div class="col-span-6">合計</div>
                <div class="col-span-3 pr-2 text-right">
                  <span
                    v-if="
                      priceDisplayOnDailyReportDefault.isPriceDisplayOnDailyReport
                    "
                  >
                    {{ mathRound(item.currentFakeSummary) }}
                  </span>
                </div>
                <div class="col-span-3 pr-2 text-right">
                  {{ mathRound(item.currentTruthSummary) }}
                </div>
              </li>
            </ul>
            <div class="mt-2.5">
              <ul>
                <li
                  class="grid grid-cols-12 rounded-[5px] bg-meimate-pink p-2 font-semibold text-white"
                >
                  <div class="col-span-6"></div>
                  <div class="col-span-3 pr-2 text-right">日合計</div>
                  <div class="col-span-3 pr-2 text-right">累計</div>
                </li>
              </ul>

              <ul>
                <li
                  class="grid grid-cols-12 p-2 font-medium odd:bg-meimate-beige/50"
                  v-if="
                    priceDisplayOnDailyReportDefault.isPriceDisplayOnDailyReport &&
                    !(
                      item.currentDay.performanceFakeTotal === 0 &&
                      item.tillNow.performanceFakeTotal === 0
                    )
                  "
                >
                  <div class="col-span-6">金額(虛)</div>
                  <div class="col-span-3 pr-2 text-right">
                    {{ mathRound(item.currentDay.performanceFakeTotal) }}
                  </div>
                  <div class="col-span-3 pr-2 text-right">
                    {{ mathRound(item.tillNow.performanceFakeTotal) }}
                  </div>
                </li>
                <li
                  class="grid grid-cols-12 p-2 font-medium odd:bg-meimate-beige/50"
                  v-if="
                    isZeroValueHiddenOnDailyReport
                      ? !(
                          item.currentDay.performanceTruthTotal === 0 &&
                          item.tillNow.performanceTruthTotal === 0
                        )
                      : true
                  "
                >
                  <div class="col-span-6">實業績</div>
                  <div class="col-span-3 pr-2 text-right">
                    {{ mathRound(item.currentDay.performanceTruthTotal) }}
                  </div>
                  <div class="col-span-3 pr-2 text-right">
                    {{ mathRound(item.tillNow.performanceTruthTotal) }}
                  </div>
                </li>
                <li
                  class="grid grid-cols-12 p-2 font-medium odd:bg-meimate-beige/50"
                  v-if="
                    isZeroValueHiddenOnDailyReport
                      ? !(
                          item.currentDay.performanceDesignateTruthTotal ===
                            0 &&
                          item.tillNow.performanceDesignateTruthTotal === 0
                        )
                      : true
                  "
                >
                  <div class="col-span-6">指定實業績</div>
                  <div class="col-span-3 pr-2 text-right">
                    {{
                      mathRound(item.currentDay.performanceDesignateTruthTotal)
                    }}
                  </div>
                  <div class="col-span-3 pr-2 text-right">
                    {{ mathRound(item.tillNow.performanceDesignateTruthTotal) }}
                  </div>
                </li>
                <li
                  class="grid grid-cols-12 p-2 font-medium odd:bg-meimate-beige/50"
                >
                  <div class="col-span-6">特殊抽成</div>
                  <div class="col-span-3 pr-2 text-right">
                    {{ mathRound(item.currentDay.performanceWithSpecialRake) }}
                  </div>
                  <div class="col-span-3 pr-2 text-right">
                    {{ mathRound(item.tillNow.performanceWithSpecialRake) }}
                  </div>
                </li>
                <li
                  class="grid grid-cols-12 p-2 font-medium odd:bg-meimate-beige/50"
                >
                  <div class="col-span-6">店販金額</div>
                  <div class="col-span-3 pr-2 text-right">
                    {{ mathRound(item.currentDay.productFakeTotal) }}
                  </div>
                  <div class="col-span-3 pr-2 text-right">
                    {{ mathRound(item.tillNow.productFakeTotal) }}
                  </div>
                </li>
                <li
                  class="grid grid-cols-12 p-2 font-medium odd:bg-meimate-beige/50"
                >
                  <div class="col-span-6">店販抽成</div>
                  <div class="col-span-3 pr-2 text-right">
                    {{ mathRound(item.currentDay.productRake) }}
                  </div>
                  <div class="col-span-3 pr-2 text-right">
                    {{ mathRound(item.tillNow.productRake) }}
                  </div>
                </li>
                <li
                  class="grid grid-cols-12 p-2 font-medium odd:bg-meimate-beige/50"
                >
                  <div class="col-span-6">互助使用(不含點)</div>
                  <div class="col-span-3 pr-2 text-right">
                    {{ mathRound(item.currentDay.helperPaidPrice) }}
                  </div>
                  <div class="col-span-3 pr-2 text-right">
                    {{ mathRound(item.tillNow.helperPaidPrice) }}
                  </div>
                </li>
                <li
                  class="grid grid-cols-12 p-2 font-medium odd:bg-meimate-beige/50"
                >
                  <div class="col-span-6">互助使用(點)</div>
                  <div class="col-span-3 pr-2 text-right">
                    <span>{{
                      mathRound(item.currentDay.helperPaidPoint)
                    }}</span>
                    <template
                      v-if="
                        priceDisplayOnDailyReportDefault.isHelperPointPriceDisplay
                      "
                    >
                      /
                      <span>{{
                        mathRound(item.currentDay.helperPaidPriceFromPoint * -1)
                      }}</span>
                    </template>
                  </div>
                  <div class="col-span-3 pr-2 text-right">
                    <span>{{ mathRound(item.tillNow.helperPaidPoint) }}</span>
                    <template
                      v-if="
                        priceDisplayOnDailyReportDefault.isHelperPointPriceDisplay
                      "
                    >
                      /
                      <span>{{
                        mathRound(item.tillNow.helperPaidPriceFromPoint * -1)
                      }}</span>
                    </template>
                  </div>
                </li>
                <li
                  class="grid grid-cols-12 p-2 font-medium odd:bg-meimate-beige/50"
                  v-if="
                    isDisplayHelperRetrieveInDailyReport &&
                    !(
                      item.currentDay.helpGetNoPoint === 0 &&
                      item.tillNow.helpGetNoPoint === 0
                    )
                  "
                >
                  <div class="col-span-6">互助獲得金額(不含點)</div>
                  <div class="col-span-3 pr-2 text-right">
                    <!-- 1 -->
                    <template
                      v-if="
                        priceDisplayOnDailyReportDefault.isHelperPointPriceDisplay
                      "
                    >
                      <span>
                        {{ mathRound(item.currentDay.helpGetNoPoint) }}
                      </span>
                    </template>
                    <template v-else> 0 </template>
                  </div>
                  <div class="col-span-3 pr-2 text-right">
                    <!-- 4 -->
                    <template
                      v-if="
                        priceDisplayOnDailyReportDefault.isHelperPointPriceDisplay
                      "
                    >
                      <span>
                        {{ mathRound(item.tillNow.helpGetNoPoint) }}
                      </span>
                    </template>
                    <template v-else> 0 </template>
                  </div>
                </li>
                <li
                  class="grid grid-cols-12 p-2 font-medium odd:bg-meimate-beige/50"
                  v-if="
                    isDisplayHelperRetrieveInDailyReport &&
                    !(
                      item.currentDay.helperRetrievePoint === 0 &&
                      item.tillNow.helperRetrievePoint === 0
                    )
                  "
                >
                  <div class="col-span-6">互助獲得(點)點數/換算金額</div>
                  <div class="col-span-3 pr-2 text-right">
                    <span>{{
                      mathRound(item.currentDay.helperRetrievePoint)
                    }}</span>
                    <template
                      v-if="
                        priceDisplayOnDailyReportDefault.isHelperPointPriceDisplay
                      "
                    >
                      /
                      <span>
                        {{
                          mathRound(item.currentDay.helperRetrievePrice)
                        }}</span
                      >
                    </template>
                  </div>
                  <div class="col-span-3 pr-2 text-right">
                    <span>{{
                      mathRound(item.tillNow.helperRetrievePoint)
                    }}</span>
                    <template
                      v-if="
                        priceDisplayOnDailyReportDefault.isHelperPointPriceDisplay
                      "
                    >
                      /
                      <span>{{
                        mathRound(item.tillNow.helperRetrievePrice)
                      }}</span>
                    </template>
                  </div>
                </li>
                <li
                  class="grid grid-cols-12 p-2 font-medium odd:bg-meimate-beige/50"
                  v-if="
                    isZeroValueHiddenOnDailyReport
                      ? !(
                          item.currentDay.orderTotalCount === 0 &&
                          item.tillNow.orderTotalCount === 0
                        )
                      : true
                  "
                >
                  <div class="col-span-6">總客數</div>
                  <div class="col-span-3 pr-2 text-right">
                    {{ mathRound(item.currentDay.orderTotalCount) }}
                  </div>
                  <div class="col-span-3 pr-2 text-right">
                    {{ mathRound(item.tillNow.orderTotalCount) }}
                  </div>
                </li>
                <li
                  class="grid grid-cols-12 p-2 font-medium odd:bg-meimate-beige/50"
                  v-if="
                    isZeroValueHiddenOnDailyReport
                      ? !(
                          item.currentDay.designateOrderCount === 0 &&
                          item.tillNow.designateOrderCount === 0
                        )
                      : true
                  "
                >
                  <div class="col-span-6">指定客</div>
                  <div class="col-span-3 pr-2 text-right">
                    {{ mathRound(item.currentDay.designateOrderCount) }}
                  </div>
                  <div class="col-span-3 pr-2 text-right">
                    {{ mathRound(item.tillNow.designateOrderCount) }}
                  </div>
                </li>
                <li
                  class="grid grid-cols-12 p-2 font-medium odd:bg-meimate-beige/50"
                  v-if="
                    isZeroValueHiddenOnDailyReport
                      ? !(
                          item.currentDay.nonDesignateOrderCount === 0 &&
                          item.tillNow.nonDesignateOrderCount === 0
                        )
                      : true
                  "
                >
                  <div class="col-span-6">不指定客</div>
                  <div class="col-span-3 pr-2 text-right">
                    {{ mathRound(item.currentDay.nonDesignateOrderCount) }}
                  </div>
                  <div class="col-span-3 pr-2 text-right">
                    {{ mathRound(item.tillNow.nonDesignateOrderCount) }}
                  </div>
                </li>
                <li
                  class="grid grid-cols-12 p-2 font-medium odd:bg-meimate-beige/50"
                  v-if="
                    isZeroValueHiddenOnDailyReport
                      ? !(
                          !countMath(
                            item.currentDay.performanceFakeTotal,
                            item.currentDay.orderTotalCount
                          ) &&
                          !countMath(
                            item.tillNow.performanceFakeTotal,
                            item.tillNow.orderTotalCount
                          )
                        )
                      : true
                  "
                >
                  <div class="col-span-6">客單價</div>
                  <div class="col-span-3 pr-2 text-right">
                    {{
                      countMath(
                        item.currentDay.performanceFakeTotal,
                        item.currentDay.orderTotalCount
                      )
                    }}
                  </div>
                  <div class="col-span-3 pr-2 text-right">
                    {{
                      countMath(
                        item.tillNow.performanceFakeTotal,
                        item.tillNow.orderTotalCount
                      )
                    }}
                  </div>
                </li>
                <li
                  class="grid grid-cols-12 p-2 font-medium odd:bg-meimate-beige/50"
                  v-if="
                    isZeroValueHiddenOnDailyReport
                      ? !(
                          item.currentDay.orderTypeCount === 0 &&
                          item.tillNow.orderTypeCount === 0
                        )
                      : true
                  "
                >
                  <div class="col-span-6">客項次(服務)</div>
                  <div class="col-span-3 pr-2 text-right">
                    <span>{{ mathRound(item.currentDay.orderTypeCount) }}</span>
                  </div>
                  <div class="col-span-3 pr-2 text-right">
                    {{ mathRound(item.tillNow.orderTypeCount) }}
                  </div>
                </li>
                <li
                  class="grid grid-cols-12 p-2 font-medium odd:bg-meimate-beige/50"
                  v-if="
                    isZeroValueHiddenOnDailyReport
                      ? !(
                          !countMath(
                            item.currentDay.performanceFakeTotal,
                            item.currentDay.orderTypeCount
                          ) &&
                          !countMath(
                            item.tillNow.performanceFakeTotal,
                            item.tillNow.orderTypeCount
                          )
                        )
                      : true
                  "
                >
                  <div class="col-span-6">平均項次單價</div>
                  <div class="col-span-3 pr-2 text-right">
                    {{
                      countMath(
                        item.currentDay.performanceFakeTotal,
                        item.currentDay.orderTypeCount
                      )
                    }}
                  </div>
                  <div class="col-span-3 pr-2 text-right">
                    {{
                      countMath(
                        item.tillNow.performanceFakeTotal,
                        item.tillNow.orderTypeCount
                      )
                    }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!reviewResult.length" class="card mt-4 p-5">
        <div
          class="flex h-20 items-center justify-center text-lg font-bold text-meimate-blue-gray"
        >
          <img src="@/static/images/file.svg" alt="" class="mr-2" />查無資料
        </div>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'daily-Report',
  description: '報表的設計師日報表',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 設計師日報表',
  },
  data() {
    return {
      date: '',
      searchDate: this.$dayjs().valueOf(),
      reviewResult: [],
      currentTruthSummary: 0,
      isDisplayHelperRetrieveInDailyReport: false,
      isUsingMathRoundInDesignerDailyReport: false,
      isZeroValueHiddenOnDailyReport: false,
      priceDisplayOnDailyReportDefault: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await Promise.all([
        this.getIsDisplayHelperRetrieveInDailyReport(),
        this.getIsUsingMathRoundInDesignerDailyReport(),
        this.getIsZeroValueHiddenOnDailyReport(),
        this.getPriceDisplayOnDailyReportDefault(),
      ]).then(() => {});
      await this.getDesignerDailyReport();
    },
    async getIsDisplayHelperRetrieveInDailyReport() {
      const resp = await this.$api.getIsDisplayHelperRetrieveInDailyReport();
      const { data, errors } = resp.data;
      if (errors) return;
      this.isDisplayHelperRetrieveInDailyReport = data.getIsDisplayHelperRetrieveInDailyReport;
    },
    // 是否四捨五入
    async getIsUsingMathRoundInDesignerDailyReport() {
      const resp = await this.$api.getIsUsingMathRoundInDesignerDailyReport();
      const { data, errors } = resp.data;
      if (errors) return;
      this.isUsingMathRoundInDesignerDailyReport = data.getIsUsingMathRoundInDesignerDailyReport;
    },
    async getIsZeroValueHiddenOnDailyReport() {
      const resp = await this.$api.getIsZeroValueHiddenOnDailyReport();
      const { data, errors } = resp.data;
      if (errors) return;
      this.isZeroValueHiddenOnDailyReport = data.getIsZeroValueHiddenOnDailyReport;
    },
    async getPriceDisplayOnDailyReportDefault() {
      const resp = await this.$api.getPriceDisplayOnDailyReportDefault();
      const { data, errors } = resp.data;
      if (errors) return;
      this.priceDisplayOnDailyReportDefault = data.getPriceDisplayOnDailyReportDefault;
    },
    doRoute() {
      this.$router.push({ name: 'Punch' });
    },
    async getDesignerDailyReport() {
      this.totalFakePerformance = 0;
      this.totalTruthPerformance = 0;

      const resp = await this.$api.designerDailyReport({
        date: this.$dayjs(this.searchDate).valueOf(),
        designerIds: [this.userInfo.user.id],
      });
      const { data, errors } = resp.data;

      if (errors) return [];

      this.reviewResult = Array.isArray(data.designerDailyReport)
        ? data.designerDailyReport
        : [];

      if (this.reviewResult.length > 0) {
        this.reviewResult = this.reviewResult.map((resultItem) => {
          let {
            totalFakePerformance = 0,
            totalTruthPerformance = 0,
            ...others // eslint-disable-line
          } = resultItem; // eslint-disable-line

          others.orderRecord.forEach((orderItem) => {
            totalFakePerformance += orderItem.fakePerformance;
            totalTruthPerformance += orderItem.truthPerformance;
          });

          return {
            totalFakePerformance,
            totalTruthPerformance,
            ...others,
          };
        });
      }

      return resp;
    },
    // 四捨五入到小數點第一位
    countMath(parameter1, parameter2) {
      if (+parameter2 === 0) return 0;
      return this.isUsingMathRoundInDesignerDailyReport
        ? Math.round(+parameter1 / +parameter2)
        : (+parameter1 / +parameter2).toFixed(1);
    },
    // 四捨五入到小數點第二位
    mathRound(data) {
      return this.isUsingMathRoundInDesignerDailyReport
        ? Math.round(+data)
        : Math.round((+data + Number.EPSILON) * 100) / 100;
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo']),
    totalCount() {
      return (item) => {
        const reducer = (accumulator, curr) => +accumulator + +curr;
        const priceList = item.map((itemPrice) => itemPrice.price);
        return priceList.length > 0 ? priceList.reduce(reducer) : 0;
      };
    },

    currentMM() {
      let currentMonth = '';
      if (this.searchDate) {
        currentMonth = this.$dayjs(this.searchDate).format('MM');
      } else {
        currentMonth = this.$dayjs(new Date()).format('MM');
      }
      return currentMonth;
    },
    currentDD() {
      let currentDay = '';
      if (this.searchDate) {
        currentDay = this.$dayjs(this.searchDate).format('DD');
      } else {
        currentDay = this.$dayjs(new Date()).format('DD');
      }
      return currentDay;
    },
  },
  watch: {
    searchDate() {
      this.getDesignerDailyReport();
    },
  },
};
</script>

<style></style>
