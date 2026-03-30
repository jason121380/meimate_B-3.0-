<template>
  <C-Main-Block>
    <C-Back-Nav
      :routeTarget="{ name: 'Report' }"
      :title="'設計師業績分析報表'"
    ></C-Back-Nav>

    <section
      class="relative mx-auto mt-20 w-full max-w-screen-md px-5 lg:mt-40 lg:px-10"
    >
      <div class="card card-body text-sm">
        <div class="flex flex-col gap-4 overflow-y-scroll px-4">
          <h2 class="text-stone-600">日期選擇</h2>
          <div class="grid grid-cols-3 gap-2.5 lg:grid-cols-5">
            <button
              class="col-span-1 rounded-full px-3 py-2"
              :class="
                filterDateType === 'currentmonth'
                  ? 'bg-meimate-pink text-white'
                  : 'bg-meimate-white text-primary'
              "
              @click="setMonth(0)"
            >
              本月
            </button>
            <button
              class="col-span-1 rounded-full px-3 py-2"
              :class="
                filterDateType === 'lastmonth'
                  ? 'bg-meimate-pink text-white'
                  : 'bg-meimate-white text-primary'
              "
              @click="setMonth(1)"
            >
              上個月
            </button>
            <button
              class="col-span-1 rounded-full px-3 py-2"
              :class="
                filterDateType === 'lastday'
                  ? 'bg-meimate-pink text-white'
                  : 'bg-meimate-white text-primary'
              "
              @click="setDay(2)"
            >
              前天
            </button>
            <button
              class="col-span-1 rounded-full px-3 py-2"
              :class="
                filterDateType === 'yesterday'
                  ? 'bg-meimate-pink text-white'
                  : 'bg-meimate-white text-primary'
              "
              @click="setDay(1)"
            >
              昨天
            </button>
            <button
              class="col-span-1 rounded-full px-3 py-2"
              :class="
                filterDateType === 'today'
                  ? 'bg-meimate-pink text-white'
                  : 'bg-meimate-white text-primary'
              "
              @click="setDay(0)"
            >
              今天
            </button>
          </div>
          <div class="grid grid-cols-2 gap-2.5">
            <vc-date-picker
              is-required
              v-model="startDate"
              mode="date"
              :max-date="$dayjs().format('YYYY-MM-DD')"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <label class="text-sm text-stone-600">起始日</label>
                <input
                  type="text"
                  name="起始日"
                  class="mt-2.5 w-full rounded-full bg-meimate-white px-3 py-2 font-medium outline-none"
                  placeholder="起始日"
                  :value="inputValue"
                  v-on="inputEvents"
                />
                <label for="起始日" class="hidden"></label>
              </template>
            </vc-date-picker>
            <vc-date-picker
              is-required
              v-model="endDate"
              mode="date"
              :max-date="$dayjs().format('YYYY-MM-DD')"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <label class="text-sm text-stone-600">結束日</label>
                <input
                  class="mt-2.5 w-full rounded-full bg-meimate-white px-3 py-2 font-medium outline-none"
                  :value="inputValue"
                  placeholder="結束日"
                  v-on="inputEvents"
                  type="text"
                  name="結束日"
                />
                <label for="結束日" class="hidden"></label>
              </template>
            </vc-date-picker>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <h2 class="col-span-3 text-sm text-stone-600">虛實業績</h2>
            <button
              class="col-span-1 rounded-full px-3 py-2"
              :class="
                displayReference === 'TRUTH'
                  ? 'bg-meimate-pink text-white'
                  : 'bg-meimate-white text-primary'
              "
              @click="setDsplyRef('TRUTH')"
            >
              實業績
            </button>
            <button
              class="col-span-1 rounded-full px-3 py-2"
              :class="
                displayReference === 'FAKE'
                  ? 'bg-meimate-pink text-white'
                  : 'bg-meimate-white text-primary'
              "
              @click="setDsplyRef('FAKE')"
            >
              虛業績
            </button>
          </div>
        </div>
      </div>
      <div class="card mt-4 p-5">
        <div class="text-center text-lg font-semibold text-black">
          {{ dReport?.designerName }}
        </div>
        <div class="font-medium">
          <div class="mt-4 flex justify-between bg-meimate-beige/50 p-1.5">
            <span>總業績</span>
            <span>{{ Math.round(dReport.totalPerformance) }}</span>
          </div>

          <div class="flex justify-between p-1.5">
            <span>總客數</span>
            <span>{{ Math.round(dReport.totalOrderCount) }}</span>
          </div>

          <div class="flex justify-between bg-meimate-beige/50 p-1.5">
            <span>平均客單價</span>
            <span>{{ Math.round(dReport.orderAveragePrice) }}</span>
          </div>

          <div class="flex justify-between p-1.5">
            <span>指定數</span>
            <span>{{ Math.round(dReport.orderDesignateCount) }}</span>
          </div>

          <div class="flex justify-between bg-meimate-beige/50 p-1.5">
            <span>指定數%</span>
            <span>{{ Math.round(dReport.orderDesignatePercentage) }}%</span>
          </div>

          <div class="flex justify-between p-1.5">
            <span>不指定數</span>
            <span>{{ Math.round(dReport.orderNonDesignateCount) }}</span>
          </div>

          <div class="flex justify-between bg-meimate-beige/50 p-1.5">
            <span>不指定%</span>
            <span
              >{{
                secondDecimalPoint(dReport.orderNonDesignatePercentage)
              }}%</span
            >
          </div>

          <div class="flex justify-between p-1.5">
            <span>店販業績</span>
            <span>{{ Math.round(dReport.productPerformance) }}</span>
          </div>

          <div class="flex justify-between bg-meimate-beige/50 p-1.5">
            <span>店販業績比%</span>
            <span
              >{{
                secondDecimalPoint(dReport.productPerformancePercentage)
              }}%</span
            >
          </div>

          <div class="flex justify-between p-1.5">
            <span>會員卡業績</span>
            <span>{{ Math.round(dReport.membershipPerformance) }}</span>
          </div>

          <div class="flex justify-between bg-meimate-beige/50 p-1.5">
            <span>會員卡業績比%</span>
            <span
              >{{
                secondDecimalPoint(dReport.membershipPerformancePercentage)
              }}%</span
            >
          </div>
        </div>
        <!-- 第二部分 -->
        <div
          v-if="serviceTypeAnalyzeList.length > 0"
          class="mt-10 overflow-x-auto text-left font-sans text-sm font-normal"
        >
          <div class="w-[768px] overflow-x-auto break-words md:w-full">
            <div
              class="flex justify-between rounded-md bg-meimate-pink p-2.5 font-medium text-white"
            >
              <div class="w-1/12">項目</div>
              <div class="w-1/12">客數</div>
              <div class="w-1/12">客數比%</div>
              <div class="w-1/12">指定數</div>
              <div class="w-1/12">指定數%</div>
              <div class="w-1/12">不指定數</div>
              <div class="w-1/12">不指定%</div>
              <div class="w-1/12">單項業績</div>
              <div class="w-1/12">業績比%</div>
              <div class="w-1/12">平均單價</div>
            </div>
            <template>
              <div
                class="flex justify-between p-2.5 text-black odd:bg-meimate-beige/50"
                v-for="serviceTypeAnalyze in serviceTypeAnalyzeList"
                :key="serviceTypeAnalyze.typeName"
              >
                <div class="w-1/12">{{ serviceTypeAnalyze.typeName }}</div>
                <div class="w-1/12">
                  {{ serviceTypeAnalyze.orderTypeCount }}
                </div>
                <div class="w-1/12">
                  {{
                    secondDecimalPoint(serviceTypeAnalyze.orderTypePercentage)
                  }}%
                </div>
                <div class="w-1/12">
                  {{ serviceTypeAnalyze.orderTypeDesignateCount }}
                </div>
                <div class="w-1/12">
                  {{
                    secondDecimalPoint(
                      serviceTypeAnalyze.orderTypeDesignatePercentage
                    )
                  }}%
                </div>
                <div class="w-1/12">
                  {{ serviceTypeAnalyze.orderTypeNonDesignateCount }}
                </div>
                <div class="w-1/12">
                  {{
                    secondDecimalPoint(
                      serviceTypeAnalyze.orderTypeNonDesignatePercentage
                    )
                  }}%
                </div>
                <div class="w-1/12">
                  {{
                    Math.round(serviceTypeAnalyze.currentOrderTypePerformance)
                  }}
                </div>
                <div class="w-1/12">
                  {{
                    secondDecimalPoint(
                      serviceTypeAnalyze.currentOrderTypePerformancePercentage
                    )
                  }}%
                </div>
                <div class="w-1/12">
                  {{
                    Math.round(serviceTypeAnalyze.currentOrderTypeAveragePrice)
                  }}
                </div>
              </div>
              <!-- 合計 -->
              <div
                class="flex justify-between p-2.5 text-lg font-bold text-meimate-pink"
              >
                <div class="w-1/12"><strong>合計</strong></div>
                <!-- 客數 -->
                <div class="w-1/12">
                  {{ countTotal("orderTypeCount", false) }}
                </div>
                <!-- 客數比% -->
                <div class="w-1/12">100%</div>
                <!-- 指定數 -->
                <div class="w-1/12">
                  {{ countTotal("orderTypeDesignateCount", false) }}
                </div>
                <!-- 指定數% -->
                <div class="w-1/12">
                  {{
                    designatePercentageTotal("orderTypeDesignateCount").toFixed(
                      1
                    )
                  }}
                  %
                </div>
                <!-- 不指定數 -->
                <div class="w-1/12">
                  {{ countTotal("orderTypeNonDesignateCount", false) }}
                </div>
                <!-- 不指定% -->
                <div class="w-1/12">
                  {{
                    designatePercentageTotal(
                      "orderTypeNonDesignateCount"
                    ).toFixed(1)
                  }}%
                </div>
                <!-- 單項業績 -->
                <div class="w-1/12">
                  {{ countTotal("currentOrderTypePerformance", false) }}
                </div>
                <!-- 業績比 -->
                <div class="w-1/12">100%</div>
                <!-- 平均單價 -->
                <div class="w-1/12">
                  {{ countTotal("currentOrderTypeAveragePrice", false) }}
                </div>
              </div>
            </template>
          </div>
        </div>
        <div v-else class="mt-4">
          <div
            class="flex h-10 items-center justify-center bg-white text-lg font-bold text-meimate-blue-gray"
          >
            <img src="@/static/images/file.svg" alt="" class="mr-2" />尚無資料
          </div>
        </div>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'analysis-report',
  description: '報表的設計師業績分析報表',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 設計師業績分析表',
  },
  data() {
    return {
      startDate: this.$dayjs().valueOf(),
      endDate: this.$dayjs().valueOf(),
      displayReference: 'TRUTH',
      serviceTypeAnalyzeList: [],
      dReport: {},
      isActiveFilter: false,
      filterDateType: 'today',
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.getDesignerPerforamnceAnalyzeReport();
    },
    setMonth(count) {
      if (count === 0) {
        this.filterDateType = 'currentmonth';
      } else {
        this.filterDateType = 'lastmonth';
      }
      this.startDate = this.$dayjs()
        .subtract(count, 'month')
        .startOf('month')
        .valueOf();
      this.endDate = this.$dayjs()
        .subtract(count, 'month')
        .endOf('month')
        .valueOf();
    },
    setDay(count) {
      if (count === 0) {
        this.filterDateType = 'today';
      } else if (count === 1) {
        this.filterDateType = 'yesterday';
      } else {
        this.filterDateType = 'lastday';
      }
      this.startDate = this.$dayjs().subtract(count, 'day').valueOf();
      this.endDate = this.$dayjs().subtract(count, 'day').valueOf();
    },
    async getDesignerPerforamnceAnalyzeReport() {
      const submit = {
        input: {
          startDate: this.$dayjs(this.startDate).valueOf(),
          endDate: this.$dayjs(this.endDate).valueOf(),
        },
        displayReference: this.displayReference,
        designerIds: this.userInfo.user.id,
      };
      const resp = await this.$api.designerPerforamnceAnalyzeReport(submit);
      const { data, errors } = JSON.parse(JSON.stringify(resp.data));
      if (errors) return;
      this.dReport = data?.designerPerforamnceAnalyzeReport[0];
      this.serviceTypeAnalyzeList = data?.designerPerforamnceAnalyzeReport[0]
        ? data?.designerPerforamnceAnalyzeReport[0].serviceTypeAnalyze
        : [];
    },
    // 虛實業績設定：預設實 -TRUTH , 虛- FAKE
    setDsplyRef(data) {
      this.displayReference = data;
      this.getDesignerPerforamnceAnalyzeReport();
    },
    // 取到小數點第二位
    secondDecimalPoint(val) {
      const result = Math.round((val + Number.EPSILON) * 100) / 100;
      return result;
    },
    /**
     * propertyKey：欲累加的變數名稱
     * isSecondDecimalPoint：傳出結果是否需要取到小數第二位，若否取到整數
     */
    countTotal(propertyKey, isSecondDecimalPoint) {
      const result = this.serviceTypeAnalyzeList.reduce(
        (p, n) => ({ [propertyKey]: p[propertyKey] + n[propertyKey] }),
        { [propertyKey]: 0 },
      )[propertyKey];
      return isSecondDecimalPoint
        ? this.secondDecimalPoint(result)
        : Math.round(result);
    },

    // designate：指定數或不指定數的參數，指定數輸入orderTypeDesignateCount，不指定數輸入orderTypeNonDesignateCount
    // 公式：(指定數or不指定數 / (指定數+ 不指定數))*100
    designatePercentageTotal(designate) {
      const denominator = this.countTotal('orderTypeDesignateCount', false)
        + this.countTotal('orderTypeNonDesignateCount', false);
      if (denominator === 0) return 0;
      const result = (this.countTotal(designate, false) / denominator) * 100;
      return this.secondDecimalPoint(result);
    },
  },
  watch: {
    startDate() {
      if (!this.startDate) return;
      console.log(this.$dayjs(this.startDate).valueOf());
      this.getDesignerPerforamnceAnalyzeReport();
    },
    endDate() {
      if (!this.endDate) return;
      console.log(this.$dayjs(this.endDate).valueOf());
      this.getDesignerPerforamnceAnalyzeReport();
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo']),
    ...mapGetters('userInfo', ['GETTER_MECHANTNAME']),
  },
};
</script>
<style scoped>
.btn-class {
  @apply rounded border px-2 py-1  focus:outline-none;
}
.sheet {
  @apply mb-1 flex items-center justify-between border-b border-dashed border-gray p-2;
}

.bg-ml.sheet,
.sheet:last-of-type,
.sheet:nth-child(2) {
  @apply border-0;
}
</style>
