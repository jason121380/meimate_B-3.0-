<template>
  <C-Main-Block>
    <C-Back-Nav
      :routeTarget="{ name: 'Report' }"
      :title="'設計師抽成報表'"
    ></C-Back-Nav>
    <section class="mx-auto mt-20 w-full max-w-screen-md px-5 lg:mt-40 lg:px-10">
      <month-picker-input
        lang="zh"
        :input-pre-filled="true"
        :default-month="+this.$dayjs().month() + 1"
        :default-year="+$dayjs(new Date()).format('YYYY')"
        @change="showDate"
        :month="month"
        class="!w-full font-bold"
      />
      <div class="card card-body mt-4 pt-4">
        <p
          v-if="reviewResult.length > 0"
          class="my-4 text-center text-lg font-semibold"
        >
          {{ userInfo.user.name }}
        </p>
        <div
          v-for="(reviewItem, index) in reviewResult"
          :key="`reviewItem${index}`"
          class="!pt-3"
        >
          <div
            v-for="(item, reportIndex) in reportItems"
            :key="`reportItem${reportIndex}`"
          >
            <div
              v-if="item['primary']"
              class="text-dark my-2 flex justify-between border-b border-dashed border-meimate-blue-gray pb-1 font-medium"
            >
              <div>{{ item["text"] }}</div>
              <div v-if="item['key']">
                {{ reviewItem.salesAnalytics[item["key"]].toFixed(2) }}
              </div>
              <div v-else>
                {{
                  item["key3"]
                    ? (
                        reviewItem.salesAnalytics[item["key1"]] +
                        reviewItem.salesAnalytics[item["key2"]] +
                        reviewItem.salesAnalytics[item["key3"]]
                      ).toFixed(2)
                    : `${reviewItem.salesAnalytics[item["key1"]]} / ${
                        reviewItem.salesAnalytics[item["key2"]]
                      }`
                }}
              </div>
            </div>
            <div
              v-else
              class="flex justify-between py-1 text-sm font-medium text-meimate-blue-gray"
              :class="{ 'bg-meimate-beige/50': item['odd'] }"
            >
              <div class="ml-4">{{ item["text"] }}</div>
              <div v-if="item['key']">
                {{ reviewItem.salesAnalytics[`${item["key"]}`].toFixed(2) }}
              </div>
            </div>
          </div>
          <div
            class="flex justify-between py-2 text-xl font-bold text-meimate-pink"
          >
            <div class="">總應領薪資</div>
            <div>
              {{ reviewItem.salesAnalytics.totalSalaryShouldBePaid.toFixed(2) }}
            </div>
          </div>
        </div>
        <div v-if="reviewResult.length === 0">
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
import { MonthPickerInput } from 'vue-month-picker';

export default {
  name: 'profit-cut',
  description: '報表的設計師抽成報表',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 設計師抽成報表',
  },
  components: {
    MonthPickerInput,
  },
  data() {
    return {
      date: {
        from: null,
        to: null,
        month: null,
        year: 2022,
      },
      reviewResult: [],
      reportItems: [
        /* {
          text: '服務虛業績',
          key: 'servicePerformanceFakeTotal',
          primary: true,
        },
        {
          text: '扣業績 - 付款手續費',
          key: 'serviceThirdPartHandlingFeeOnSales',
          primary: false,
          odd: true,
        },
        {
          text: '扣業績 - 扣項',
          key: 'servicePerformanceDecountItem',
          primary: false,
        }, */
        {
          text: '服務實業績',
          key: 'truthPerformanceWithoutHelper',
          primary: true,
        },
        {
          text: '實業績 - 指定',
          key: 'servicePerformanceDesignateTruthTotalBeforeHelperDecount',
          primary: false,
          odd: true,
        },
        {
          text: '實業績 - 不指定',
          key: 'servicePerformanceNonDesignateTruthTotalBeforeHelperDecount',
          primary: false,
        },
        {
          text: '扣業績 - 使用互助',
          key: 'servicePerformanceDecountHelperUsagePrice',
          primary: false,
          odd: true,
        },
        {
          text: '服務實業績 - 扣使用互助',
          key: 'servicePerformanceTruthTotal',
          primary: true,
        },
        {
          text: '指定(實) - 扣互助',
          key: 'servicePerformanceDesignateTruthTotal',
          primary: false,
          odd: true,
        },
        {
          text: '不指定(實) - 扣互助',
          key: 'servicePerformanceNonDesignateTruthTotal',
          primary: false,
        },
        {
          text: '服務換算抽成',
          key: 'servicePerformanceRake',
          primary: true,
        },
        {
          text: '指定抽成',
          key: 'servicePerformanceDesignateRake',
          primary: false,
          odd: true,
        },
        {
          text: '不指定抽成',
          key: 'servicePerformanceNonDesignateRake',
          primary: false,
        },
        {
          text: '特殊抽成',
          key: 'specialRake',
          primary: false,
          odd: true,
        },
        {
          text: '扣薪水 - 付款手續費',
          key: 'serviceThirdPartHandlingFeeOnSalary',
          primary: false,
        },
        {
          text: '扣薪水 - 扣項',
          key: 'serviceSalaryDecountItem',
          primary: false,
          odd: true,
        },
        {
          text: '扣薪水 - 使用互助',
          key: 'serviceSalaryDecountHelperUsagePrice',
          primary: false,
        },
        {
          text: '服務應領金額',
          key: 'serviceSalaryShouldBePaid',
          primary: true,
        },
        {
          text: '店販業績',
          key: 'productPerformanceFakeTotal',
          primary: true,
        },
        {
          text: '扣業績 - 付款手續費',
          key: 'productThirdPartHandlingFeeOnSales',
          primary: false,
          odd: true,
        },
        {
          text: '店販業績 扣手續費',
          key: 'productPerformanceTruthTotal',
          primary: false,
        },
        {
          text: '店販抽成',
          key1: 'productRakeByCost',
          key2: 'productRakeByFixed',
          key3: 'productRakeByPrice',
          primary: true,
        },
        {
          text: '扣薪水 - 付款手續費',
          key: 'productThirdPartHandlingFeeOnSalary',
          primary: false,
          odd: true,
        },
        {
          text: '互助獲得 - 金額',
          key: 'helperRetrievePriceNoPoint',
          primary: true,
        },
        {
          text: '互助獲得 - 點數/換算金額',
          key1: 'helperRetrievePoint',
          key2: 'helperRetrievePriceOnlyPoint',
          primary: true,
        },
        {
          text: '互助獲得 - 點數',
          key: 'helperPointPaid',
          primary: true,
        },
        {
          text: '互助獲得 - 金額',
          key: 'helperPricePaid',
          primary: true,
        },
        {
          text: '扣入金手續費',
          key: 'walletDepositHandlingFeeByDesigner',
          primary: true,
        },
      ],
      month: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
    };
  },
  mounted() {
    const ML_DESIGN = JSON.parse(localStorage.getItem('ML_DESIGN'));
    const auth = ML_DESIGN.userAuthorizeList.find(
      (item) => item.pageName === '抽成報表(顯示虛業績)',
    );

    if (auth && auth.authority) {
      this.reportItems.unshift(
        {
          text: '服務虛業績',
          key: 'servicePerformanceFakeTotal',
          primary: true,
        },
        {
          text: '扣業績 - 付款手續費',
          key: 'serviceThirdPartHandlingFeeOnSales',
          primary: false,
          odd: true,
        },
        {
          text: '扣業績 - 扣項',
          key: 'servicePerformanceDecountItem',
          primary: false,
        },
      );
    }
  },
  methods: {
    async getUserRakeReport() {
      if (!this.date.from || !this.date.to) return;
      const submitForm = {
        date: {
          startDate: this.$dayjs(this.date.from).startOf('month').valueOf(),
          endDate: this.$dayjs(this.date.to)
            .add(-1, 'day')
            .endOf('month')
            .valueOf(),
        },
        designerIds: [this.userInfo.user.id],
      };
      const resp = await this.$api.userRakeReport(submitForm);
      const { data, errors } = resp.data;
      if (errors) return;
      this.reviewResult = data.userRakeReport;
      console.log(data.userRakeReport);
    },
    showDate(date) {
      this.date = date;
    },
    doRoute() {
      this.$router.push({ name: 'Punch' });
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo']),
    totalCount() {
      return (item) => {
        const reducer = (accumulator, curr) => +accumulator + +curr;
        const priceList = item.map((itemPrice) => itemPrice.price);
        return priceList.reduce(reducer);
      };
    },
    currentMM() {
      let currentMonth = '';
      currentMonth = this.$dayjs(this.date.from).format('MM');
      return currentMonth;
    },
    currentYYYY() {
      let currentYYYY = '';
      currentYYYY = this.$dayjs(this.date.from).format('YYYY');
      return currentYYYY;
    },
  },
  watch: {
    date: {
      deep: true,
      handler() {
        this.getUserRakeReport();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .month-picker-input {
  width: 100%;
  border-radius: 9999px;
  padding: 0.75rem 1.5rem;
  border: none;
  @apply text-base;
}

::v-deep .month-picker__container {
  border-radius: 1.5rem;
}

::v-deep .month-picker__year {
  border-radius: 1.5rem 1.5rem 0 0;
}

::v-deep .month-picker__year button {
  background-color: #fcfcfc;
  border: none;
  top: 4px;
}

::v-deep .month-picker {
  border-radius: 0 0 1.5rem 1.5rem;
}

::v-deep .month-picker-input:focus {
  outline-width: 0px !important;
  @apply shadow-none ring-0;
}

::v-deep .month-picker__month {
  border-radius: 100px;
  padding: 0.2rem 0;
  color: #cacaca;
  border: none;
  margin-bottom: 5px;
}

::v-deep .month-picker__month.selected {
  background-color: #222c4c;
  color: #fff;
  box-shadow: none;
}

::v-deep .month-picker__container {
  top: 100%;
  z-index: 1;
  border-radius: 20px;
  box-shadow: 1px 2px 5px rgb(0 0 0 / 10%);
  width: 100%;
  left: 0;
  right: 0;
  margin: auto;
  padding: 1rem;
  background-color: #fff !important;
}

::v-deep .month-picker__container button {
  background-color: #fff;
  border: none;
  top: 21px;
  width: 30px;
}

::v-deep .month-picker__container p {
  background-color: #fcfcfc;
}

::v-deep .month-picker__year {
  box-shadow: none;
}

::v-deep .month-picker {
  border-radius: 0 0 20px 20px;
  box-shadow: none;
}
</style>
