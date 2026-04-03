<template>
  <C-Main-Block>
    <C-Back-Nav
      :routeTarget="{ name: 'Report' }"
      :title="'薪資條'"
    ></C-Back-Nav>

    <section
      class="relative mx-auto mt-20 w-full max-w-screen-md px-5 lg:mt-24 lg:px-10"
    >
      <div class="card card-body text-sm">
        <div class="grid grid-cols-3 gap-2.5">
          <h2 class="col-span-3 text-stone-600">月份選擇</h2>
          <button
            class="col-span-1 rounded-full px-3 py-2"
            :class="
              filterDateType === 'lastmonth'
                ? 'bg-meimate-pink text-white'
                : 'bg-meimate-white text-primary'
            "
            @click="lastMonth"
          >
            上個月
          </button>

          <button
            class="col-span-1 rounded-full px-3 py-2"
            :class="
              filterDateType === 'thismonth'
                ? 'bg-meimate-pink text-white'
                : 'bg-meimate-white text-primary'
            "
            @click="thisMonth"
          >
            本月
          </button>
          <div class="col-span-3 lg:col-span-1">
            <month-picker-input
              lang="zh"
              :input-pre-filled="true"
              :default-month="+this.$dayjs(date).month() + 1"
              :default-year="+$dayjs(date).format('YYYY')"
              @change="dateChange"
              class="!w-full rounded-full bg-meimate-white font-bold"
            />
          </div>
        </div>
      </div>
      <div class="card mt-4 p-5 font-sans font-normal">
        <div v-if="isDataEmpty" class="text-center">
          <div
            class="flex h-20 items-center justify-center text-lg font-bold text-meimate-blue-gray"
          >
            <img src="@/static/images/file.svg" alt="" class="mr-2" />查無資料
          </div>
        </div>
        <template v-else>
          <div class="my-4 text-center text-lg font-bold">
            {{ designerName }}
          </div>
          <div
            v-for="(item, index) in increaseItem"
            :key="index"
            class="flex justify-between p-2.5 text-sm font-medium odd:bg-meimate-beige/50"
          >
            <span>{{ item.itemName }}</span>
            <span>{{ item.price }}</span>
          </div>
          <div
            class="mt-5 border-t border-dashed border-t-meimate-blue-gray pt-5"
          >
            <div
              v-for="(item, index) in decreaseItem"
              :key="index"
              class="flex justify-between p-2.5 text-sm font-medium odd:bg-meimate-beige/50"
            >
              <span>{{ item.itemName }}</span>
              <span>{{ item.price }}</span>
            </div>
          </div>
          <div
            class="mt-5 border-t border-dashed border-t-meimate-blue-gray pt-5"
          >
            <div
              class="flex justify-between p-2.5 text-sm font-medium text-meimate-pink"
            >
              <span>實領薪資</span>
              <span>{{ summary }}</span>
            </div>
            <div
              class="flex justify-between p-2.5 text-sm font-medium even:bg-meimate-beige/50"
            >
              <span>互助獲得(點)</span>
              <span>{{ helperPointRetrieve }}</span>
            </div>
            <div
              class="flex justify-between p-2.5 text-sm font-medium even:bg-meimate-beige/50"
            >
              <span>指定實業績</span>
              <span>{{ designateTruthPerformance }}</span>
            </div>
            <div
              class="flex justify-between p-2.5 text-sm font-medium even:bg-meimate-beige/50"
            >
              <span>不指定實業績</span>
              <span>{{ nonDesignateTruthPerformance }}</span>
            </div>
            <div
              class="flex justify-between p-2.5 text-sm font-medium even:bg-meimate-beige/50"
            >
              <span>特抽總業績</span>
              <span>{{ specialTruthPerformance }}</span>
            </div>
            <div
              class="flex justify-between p-2.5 text-sm font-medium even:bg-meimate-beige/50"
            >
              <span>總實業績</span>
              <span>{{ truthPerformance }}</span>
            </div>
            <div
              class="flex justify-between p-2.5 text-sm font-medium even:bg-meimate-beige/50"
            >
              <span>備註</span>
              <span>{{ remark }}</span>
            </div>
          </div>
        </template>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { MonthPickerInput } from 'vue-month-picker';

export default {
  name: 'salary-report',
  description: '薪資條',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 薪資條',
  },
  components: {
    MonthPickerInput,
  },
  data() {
    return {
      date: this.$dayjs().valueOf(),
      designerName: '',
      increaseItem: [],
      decreaseItem: [],
      summary: 0,
      helperPointRetrieve: 0,
      designateTruthPerformance: 0,
      nonDesignateTruthPerformance: 0,
      specialTruthPerformance: 0,
      truthPerformance: 0,
      remark: '',
      isDataEmpty: true,
      filterDateType: 'thismonth',
    };
  },
  mounted() {
    this.init();
    const { name } = JSON.parse(localStorage.getItem('ML_DESIGN')).user;
    this.designerName = name;
  },
  methods: {
    async init() {
      await this.getUserSalaryReport();
    },
    arrayEmpty(array) {
      return array.length === 0;
    },
    async getUserSalaryReport() {
      const input = {
        date: this.date,
        isCellphone: true,
      };
      const resp = await this.$api.userSalaryReport(input);
      const { data, errors } = JSON.parse(JSON.stringify(resp.data));
      if (errors) return;
      if (!this.arrayEmpty(data.userSalaryReport)) {
        this.isDataEmpty = false;
        this.setData(data.userSalaryReport[0]);
      } else {
        this.isDataEmpty = true;
      }
    },
    setData(data) {
      this.designerName = data.name;
      this.increaseItem = data.increaseItem;
      this.decreaseItem = data.decreaseItem;
      this.summary = data.summary;
      this.helperPointRetrieve = data.helperPointRetrieve;
      this.designateTruthPerformance = data.designateTruthPerformance;
      this.nonDesignateTruthPerformance = data.nonDesignateTruthPerformance;
      this.specialTruthPerformance = data.specialTruthPerformance;
      this.truthPerformance = data.truthPerformance;
      this.remark = data.remark;
    },
    // 本月
    thisMonth() {
      const dt = new Date(Date.now());
      const y = dt.getFullYear();
      const m = dt.getMonth() + 1;
      const firstDay = new Date(y, m - 1, 1);
      this.date = +firstDay;
      this.filterDateType = 'thismonth';
    },
    // // 上個月
    lastMonth() {
      const dt = new Date(Date.now());
      const y = dt.getFullYear();
      const m = dt.getMonth();
      const firstDay = new Date(y, m - 1, 1);
      this.date = +firstDay;
      this.filterDateType = 'lastmonth';
    },
    dateChange(date) {
      this.date = new Date(date.from).getTime();
    },
  },
  watch: {
    date() {
      this.getUserSalaryReport();
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo']),
    ...mapGetters('userInfo', ['GETTER_MECHANTNAME']),
  },
};
</script>

<style scoped>
::v-deep .month-picker-input {
  padding: 0.75rem 1.5rem;
  width: 100%;
  border: none;
  border-radius: 9999px;
  @apply text-base bg-meimate-white;
}

::v-deep .month-picker-input:focus {
  box-shadow: none;
  outline-width: 0px !important;
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
