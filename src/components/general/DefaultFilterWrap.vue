<template>
  <div>
    <C-Loading-Overlay
      :value="value"
      @input="$emit('input', !value)"
      @doFunction="$emit('input', !value)"
      :layerIndex="60"
    ></C-Loading-Overlay>

    <transition name="fromBottom">
      <div v-show="value">
        <div
          class="card !fixed inset-0 z-[70] mt-10 w-full overflow-visible !rounded-b-none bg-white !px-0 !pb-0"
        >
          <div class="card-body flex flex-col gap-4 overflow-y-scroll px-4">
            <div class="flex flex-col gap-2">
              <p class="text-gray-dark text-sm font-bold">生日</p>
              <div class="grid grid-cols-3 gap-2.5">
                <div
                  v-click-outside="showYear"
                  class="month-picker-input-container"
                >
                  <C-Input
                    v-model="propsSearchAdvanceCtx.year"
                    placeholder="年份 (民國)"
                    inputClass="!bg-meimate-white"
                    type="tel"
                    max-length="3"
                  >
                    <template v-slot:endIcon>
                      <i
                        v-if="propsSearchAdvanceCtx.year !== ''"
                        @click="propsSearchAdvanceCtx.year = ''"
                        @keyPress="propsSearchAdvanceCtx.year = ''"
                        class="bi bi-x text-2xl text-meimate-pink"
                      />
                    </template>
                  </C-Input>
                </div>
                <div
                  v-click-outside="showMonth"
                  class="month-picker-input-container col-span-2"
                >
                  <label
                    @click="isMonthToggle = true"
                    @keypress="isMonthToggle = true"
                  >
                    <C-Input
                      v-model="propsSearchAdvanceCtx.month"
                      inputClass="!bg-meimate-white"
                      placeholder="請選擇月"
                      :readOnly="true"
                    >
                      <template v-slot:endIcon>
                        <i
                          v-if="propsSearchAdvanceCtx.month !== ''"
                          @click="propsSearchAdvanceCtx.month = ''"
                          @keyPress="propsSearchAdvanceCtx.month = ''"
                          class="bi bi-x text-2xl text-meimate-pink"
                        />
                      </template>
                    </C-Input>
                    <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
                    <input
                      type="text"
                      placeholder="請選擇月"
                      readonly
                      class="month-picker-input hidden"
                    />
                  </label>
                  <month-picker
                    v-show="isMonthToggle"
                    @change="showDateMonth"
                    :no-default="true"
                    :show-year="false"
                    lang="zh"
                    class="z-50"
                  ></month-picker>
                </div>
              </div>
            </div>

            <div class="flex w-full justify-center gap-2 pt-2">
              <button
                @click="seletedTab = 1"
                :class="
                  seletedTab === 1
                    ? ' border-meimate-pink text-meimate-pink font-bold'
                    : 'border-transparent text-meimate-blue-gray font-medium'
                "
                class="w-full border-b-2 pb-1 text-lg"
              >
                消費區間
              </button>
              <button
                @click="seletedTab = 2"
                :class="
                  seletedTab === 2
                    ? ' border-meimate-pink text-meimate-pink font-bold'
                    : 'border-transparent text-meimate-blue-gray font-medium'
                "
                class="w-full border-b-2 pb-1 text-lg"
              >
                基準日期
              </button>
            </div>

            <div
              class="animate__animated animate__fadeIn animate__fast flex flex-col gap-2.5 pt-4"
              v-if="seletedTab === 1"
            >
              <p class="text-gray-dark text-sm font-bold">區間</p>
              <C-Select
                inputClasses="bg-meimate-white"
                :list="custRange"
                v-model="dateRecent"
                :disabled="
                  baseDate !== null ||
                  aheadbackSelected !== '' ||
                  dateNunm !== ''
                "
                item-text="label"
                item-value="value"
                :isFull="true"
                object-return
              ></C-Select>
            </div>

            <div
              class="animate__animated animate__fadeIn animate__fast flex flex-col gap-2.5 pt-4"
              v-if="seletedTab === 2"
            >
              <p class="text-gray-dark text-sm font-bold">基準日期</p>
              <div class="flex gap-2">
                <C-vc-calendar-select
                  inputClass="!rounded-full !bg-meimate-white"
                  :placeholder="'選擇日期'"
                  v-model="baseDate"
                  :disabled="dateRecent.value !== 0"
                ></C-vc-calendar-select>
              </div>
              <p class="text-gray-dark text-sm font-bold">往前往後</p>
              <div>
                <C-Select
                  inputClasses="bg-meimate-white"
                  :list="aheadback"
                  :isFull="true"
                  v-model="aheadbackSelected"
                  :disabled="dateRecent.value !== 0"
                  item-text="label"
                  item-value="value"
                ></C-Select>
              </div>
              <p class="text-gray-dark text-sm font-bold">天數</p>
              <div>
                <C-Input
                  class="!mb-0 w-full"
                  inputClass="!bg-meimate-white"
                  type="tel"
                  v-model="dateNunm"
                  :placeholder="'請輸入消費區間的天數'"
                  :disabled="dateRecent.value !== 0"
                ></C-Input>
              </div>
            </div>

            <template v-if="isAllCusDisplay">
              <div class="flex flex-col gap-4">
                <p class="text-gray-dark text-sm font-bold">偏好設計師</p>
                <C-Select
                  inputClasses="bg-meimate-white"
                  :isFull="true"
                  :list="preferDesigner"
                  v-model="preferDesignerSelected"
                  item-text="name"
                  item-value="id"
                ></C-Select>
                <p class="text-gray-dark text-sm font-bold">最近設計師</p>
                <C-Select
                  inputClasses="bg-meimate-white"
                  :isFull="true"
                  :list="latestDesigner"
                  v-model="latestDesignerSelected"
                  item-text="name"
                  item-value="id"
                ></C-Select>
              </div>
            </template>

            <div class="flex flex-col gap-2.5">
              <p class="text-gray-dark text-sm font-bold">黑名單篩選</p>
              <C-Select
                inputClasses="bg-meimate-white"
                :isFull="true"
                :list="isUnwelcomeOpt"
                v-model="isUnwelcome"
                item-text="label"
                item-value="value"
              ></C-Select>
            </div>

            <div class="flex flex-col gap-2.5">
              <p class="text-gray-dark text-sm font-bold">來店消費</p>
              <div class="flex gap-2">
                <input
                  type="radio"
                  id="all"
                  :value="null"
                  v-model="propsSearchAdvanceCtx.customerIsCome"
                  class="accent-meimate-pink"
                />
                <label for="all" class="text-gray-dark text-sm font-bold"
                  >全部</label
                >
                <br />
                <input
                  type="radio"
                  id="had"
                  :value="true"
                  v-model="propsSearchAdvanceCtx.customerIsCome"
                  class="accent-meimate-pink"
                />
                <label for="had" class="text-gray-dark text-sm font-bold"
                  >有</label
                >
                <br />
                <input
                  type="radio"
                  id="havent"
                  :value="false"
                  v-model="propsSearchAdvanceCtx.customerIsCome"
                  class="accent-meimate-pink"
                />
                <label for="havent" class="text-gray-dark text-sm font-bold"
                  >無</label
                >
              </div>
              <br />
            </div>
            <!-- 最近服務 -->
            <template v-if="propsSearchAdvanceCtx.customerIsCome != null">
              <div class="flex flex-col gap-2">
                <p class="text-gray-dark text-sm font-bold">最近服務</p>
                <div class="text-gray-dark my-2 grid grid-cols-3 gap-4 text-sm">
                  <C-Button-Check
                    v-for="(item, index) in allServiceAttributions"
                    :key="index"
                    :label="item"
                    :inputValue="item"
                    v-model="propsSearchAdvanceCtx.serviceAttributions"
                  >
                  </C-Button-Check>
                </div>
                <br />
              </div>
            </template>
          </div>

          <div
            class="card-footer flex w-full justify-between gap-3 !rounded-none bg-white !py-4 shadow-meimate-dropdown"
          >
            <button
              class="w-full rounded-3xl border border-meimate-pink bg-white px-5 py-3 text-sm font-bold text-meimate-pink"
              @click="clearFunction"
            >
              <span>清除所有搜尋</span>
            </button>
            <button
              class="w-full rounded-3xl bg-meimate-pink px-5 py-3 text-sm font-bold text-white"
              @click="doFunction"
            >
              <span>搜尋</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { MonthPicker } from 'vue-month-picker';

export default {
  name: 'DefaultFilterWrap',
  components: { MonthPicker },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    searchAdvanceCtx: {
      type: Object,
      required: true,
    },
    allServiceAttributions: {
      type: Array,
    },
    isAllCusDisplay: {
      type: Boolean,
      required: true,
    },
  },
  beforeUpdate() {
    if (this.propsSearchAdvanceCtx && this.propsSearchAdvanceCtx.designer) {
      this.latestDesigner = this.propsSearchAdvanceCtx.designer.latestDesigner;
      this.preferDesigner = this.propsSearchAdvanceCtx.designer.preferDesigner;
      this.isUnwelcome = this.propsSearchAdvanceCtx.isUnwelcome;
    }
  },
  data() {
    return {
      seletedTab: 1,
      isYearToggle: false,
      isMonthToggle: false,
      baseDate: null,
      dateNunm: '',
      dateYYYY: '',
      dateMM: '',
      aheadbackSelected: '',
      dateRecent: { label: '請選擇', value: 0 },
      custRange: [
        { label: '請選擇', value: 0 },
        { label: '最近三個月', value: 1 },
        { label: '最近六個月', value: 2 },
        { label: '最近十二個月', value: 3 },
      ],
      aheadback: [
        { label: '請選擇', value: '' },
        { label: '往前', value: 'LESSTHAN' },
        { label: '往後', value: 'GREATERTHAN' },
      ],
      isUnwelcomeOpt: [
        { label: '顯示全部', value: 'ALL' },
        { label: '顯示黑名單', value: 'UNWELCOME' },
        { label: '排除黑名單', value: 'WELCOME' },
      ],
      latestDesignerSelected: '',
      latestDesigner: [],
      preferDesignerSelected: '',
      preferDesigner: [],
      isUnwelcome: 'ALL',
    };
  },
  methods: {
    doFunction() {
      if (
        this.baseDate !== null
        || this.aheadbackSelected !== ''
        || this.dateNunm !== ''
      ) {
        if (
          this.baseDate !== null
          && this.aheadbackSelected !== ''
          && this.dateNunm !== ''
        ) {
          this.$emit('doFunction');
        } else {
          const errMsgList = [
            `${this.baseDate === null ? '基準日期' : ''}`,
            `${this.aheadbackSelected === '' ? '往前往後' : ''}`,
            `${this.dateNunm === '' ? '天數' : ''}`,
          ];
          const errMsg = errMsgList
            .filter((item) => item !== '')
            .join('/');
          this.$swal.fire({
            icon: 'info',
            title: `請選擇 ${errMsg}`,
            showConfirmButton: false,
            showCloseButton: true,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      } else {
        this.$emit('doFunction');
      }
    },
    clearFunction() {
      this.dateNunm = '';
      this.baseDate = null;
      this.aheadbackSelected = '';
      this.latestDesignerSelected = '';
      this.preferDesignerSelected = '';
      this.isUnwelcome = 'ALL';
      this.dateRecent = { label: '請選擇', value: 0 };
      this.$forceUpdate();
      this.$emit('clearFunction');
    },
    showYear() {
      this.isYearToggle = false;
    },
    showMonth() {
      this.isMonthToggle = false;
    },
    showDateYear(date) {
      this.propsSearchAdvanceCtx.year = date.year;
    },
    showDateMonth(date) {
      this.propsSearchAdvanceCtx.month = date.month;
      this.showMonth();
    },
  },
  watch: {
    dateRecent: {
      deep: true,
      handler(item) {
        const currentFirstDay = this.$dayjs().startOf('month');
        const actions = new Map([
          [0, { startDate: '', endDate: '' }],
          [
            1,
            {
              endDate: this.$dayjs(currentFirstDay).valueOf(),
              startDate: this.$dayjs(currentFirstDay)
                .add(-3, 'month')
                .valueOf(),
            },
          ],
          [
            2,
            {
              endDate: this.$dayjs(currentFirstDay).valueOf(),
              startDate: this.$dayjs(currentFirstDay)
                .add(-6, 'month')
                .valueOf(),
            },
          ],
          [
            3,
            {
              endDate: this.$dayjs(currentFirstDay).valueOf(),
              startDate: this.$dayjs(currentFirstDay)
                .add(-12, 'month')
                .valueOf(),
            },
          ],
        ]);
        this.propsSearchAdvanceCtx.consumptionRange.startDate = actions.get(
          item.value,
        ).startDate;
        this.propsSearchAdvanceCtx.consumptionRange.endDate = actions.get(
          item.value,
        ).endDate;
      },
    },
    baseDate() {
      this.propsSearchAdvanceCtx.baseDateRange.baseDate = this.$dayjs(
        this.baseDate,
      ).isValid()
        ? this.$dayjs(this.$dayjs(this.baseDate).startOf('day')).valueOf()
        : '';
    },
    aheadbackSelected(value) {
      this.propsSearchAdvanceCtx.baseDateRange.toDate = value;
    },
    dateNunm(value) {
      this.propsSearchAdvanceCtx.baseDateRange.dayNumber = value;
    },
    seletedTab() {
      this.clearFunction();
    },
    latestDesignerSelected(value) {
      this.propsSearchAdvanceCtx.designer.latestDesignerSelected = value;
    },
    preferDesignerSelected(value) {
      this.propsSearchAdvanceCtx.designer.preferDesignerSelected = value;
    },
    isUnwelcome(value) {
      this.propsSearchAdvanceCtx.isUnwelcome = value;
    },
  },
  computed: {
    propsSearchAdvanceCtx: {
      get() {
        return this.searchAdvanceCtx;
      },
      set() {
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.month-picker-input-container {
  position: relative;
}

.month-picker-input {
  padding: 0.5em 0.5em;
  font-size: 0.85em;
  border-radius: 5px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.5);
  transition: all 350ms cubic-bezier(0.165, 0.84, 0.44, 1);
}

.month-picker-input:focus {
  border-color: rgba(0, 0, 0, 0.25);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.month-picker__container {
  position: absolute;
  top: 3.5em;
}
</style>
