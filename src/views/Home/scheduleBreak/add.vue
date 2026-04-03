<template>
  <C-Main-Block>
    <C-Back-Nav
      :routeTarget="{ name: 'ScheduleBreak' }"
      :title="'新增預約'"
    ></C-Back-Nav>
    <section
      class="relative mx-auto mt-20 w-full max-w-screen-md px-5 lg:mt-24 lg:px-10"
      :class="{'!fixed': customerModal}"
    >
      <ValidationObserver
        ref="orderForm"
        class="card card-body font-sans font-normal"
      >
        <div class="my-2">
          <p class="mb-2 text-sm font-bold text-meimate-blue-gray">預約時間</p>
          <div class="grid grid-cols-2 gap-x-2">
            <ValidationProvider
              ref="orderDate"
              name="日期"
              rules="required"
              v-slot="{ errors }"
            >
              <VCCalendarSelect
                inputClass="!bg-meimate-white"
                :min-date="new Date()"
                :placeholder="'選擇日期'"
                v-model="orderDate"
                :errors="errors"
              >
              </VCCalendarSelect>
            </ValidationProvider>
            <ValidationProvider
              ref="timeList"
              name="時間"
              rules="required"
              v-slot="{ errors }"
            >
              <C-Select
                inputClasses="bg-meimate-white"
                :list="timeList"
                v-model="orderTime"
                :placeholder="'時間'"
                item-text="name"
                item-value="id"
                object-return
                :errors="errors"
              ></C-Select>
            </ValidationProvider>
          </div>
        </div>
        <div class="my-2">
          <p class="mb-2 text-sm font-bold text-meimate-blue-gray">預約時長</p>
          <ValidationProvider
            ref="timeCost"
            name="預約時長"
            rules="required"
            v-slot="{ errors }"
          >
            <label for="timeCostInput"></label>
            <C-Select
              inputClasses="bg-meimate-white"
              :list="timeCostRange"
              v-model="timeCost"
              item-text="label"
              item-value="value"
              :isFull="true"
              object-return
            ></C-Select>
            <div class="error-message" :errors="errors"></div>
          </ValidationProvider>
        </div>

        <div class="my-2">
          <p class="mb-2 text-sm font-bold text-meimate-blue-gray">電話</p>
          <div class="grid w-full grid-cols-12 gap-2">
            <div class="col-span-11">
              <ValidationProvider
                ref="cellphone"
                name="電話"
                rules="required"
                v-slot="{ errors }"
              >
                <C-Input
                  v-model="cellphone"
                  class="!mb-0 rounded-full"
                  :errors="errors"
                  :disabled="!!$route.query.cellphone"
                  :isUnwelcome="isUnwelcome"
                  @inputOnBlur="checkIsUnwelcome"
                  type="tel"
                  maxLength="10"
                  inputClass="border-none rounded-full !bg-meimate-white"
                  @Change="checkIsCustomerExist"
                >
                  <template v-slot:endIcon v-if="!$route.query.cellphone">
                    <i
                      v-if="cellphone !== ''"
                      class="bi bi-x text-2xl text-meimate-pink"
                      @click="emptyPhone"
                      @keypress="emptyPhone"
                    />
                  </template>
                </C-Input>
              </ValidationProvider>
            </div>
            <div @click="openCustomerModal" @keypress="openCustomerModal" class="col-span-1 ml-auto mt-2">
              <i class="bi bi-search text-xl text-meimate-pink"></i>
            </div>
          </div>
        </div>

        <div class="my-2">
          <p class="mb-2 text-sm font-bold text-meimate-blue-gray">姓名</p>
          <ValidationProvider
            ref="name"
            name="姓名"
            rules="required"
            v-slot="{ errors }"
          >
            <C-Input
              v-model="name"
              class="!mb-0 rounded-full"
              :class="{ 'opacity-60': isCustomerExist }"
              :errors="errors"
              divClass="rounded-full"
              :disabled="!!$route.query.name || isCustomerExist"
              inputClass="border-none !rounded-full !bg-meimate-white"
            >
              <template v-slot:endIcon v-if="!$route.query.name">
                <i
                  v-if="isXmarkshow"
                  class="bi bi-x text-2xl text-meimate-pink"
                  @click="name = ''"
                  @keypress="name = ''"
                />
              </template>
            </C-Input>
          </ValidationProvider>
        </div>

        <div class="my-2">
          <p class="mb-2 text-sm font-bold text-meimate-blue-gray">指定預約</p>
          <div
            class="text-prmiary flex items-center gap-2 text-center text-sm font-semibold"
          >
            <div
              class="flex items-center justify-center rounded-full bg-meimate-yellow px-4 py-2 text-white"
              :class="{
                '!bg-meimate-white !text-meimate-blue-gray': !isOrderDesigner,
              }"
              @click="isOrderDesigner = true"
              @keypress="isOrderDesigner = true"
            >
              指定
            </div>
            <div
              class="flex items-center justify-center rounded-full bg-meimate-yellow px-4 py-2 text-white"
              :class="{
                '!bg-meimate-white !text-meimate-blue-gray': isOrderDesigner,
              }"
              @click="isOrderDesigner = false"
              @keypress="isOrderDesigner = false"
            >
              不指定
            </div>
          </div>
        </div>
        <div class="my-2">
          <p class="mb-2 text-sm font-bold text-meimate-blue-gray">服務項目</p>
          <div
            class="flex select-none flex-wrap items-center gap-2 text-center text-sm font-bold"
          >
            <div
              class="relative m-1 rounded-full bg-meimate-yellow px-3 py-2 text-sm font-semibold text-white"
              v-for="item in $store.state.userInfo.selectServiceList"
              :key="item.id"
            >
              <span>{{ item.name }}</span>
              <div
                @click="removeServiceList(item)"
                @keypress="removeServiceList(item)"
                class="absolute right-0 top-0 flex size-4 -translate-y-0.5 translate-x-0.5 items-center justify-center rounded-full bg-gray"
              >
                <i class="bi bi-x text-xl text-white" />
              </div>
            </div>
            <span
              class="flex items-center justify-center rounded-full border border-meimate-yellow bg-meimate-yellow px-4 py-2 text-white"
              @click="doRoute('ScheduleBreak-SelectService')"
              @keypress="doRoute('ScheduleBreak-SelectService')"
            >
              選擇
            </span>
          </div>
        </div>
        <router-view></router-view>
        <div class="my-2">
          <label class="text-sm font-bold text-meimate-blue-gray"
            >留言給顧客</label
          >
          <div class="relative mt-2 flex flex-nowrap">
            <textarea
              name="remark"
              v-model="messageForCustomer"
              rows="3"
              class="block w-full rounded-3xl bg-meimate-white p-4 text-sm outline-none focus:shadow-lg"
            ></textarea>
            <i
              v-if="messageForCustomer"
              class="bi bi-x absolute bottom-1/2 right-2 translate-y-1/2 text-2xl text-meimate-pink"
              @click="messageForCustomer = ''"
              @keypress="messageForCustomer = ''"
            />
          </div>
        </div>

        <div class="my-2">
          <label class="text-sm font-bold text-meimate-blue-gray">備註</label>
          <div class="relative mt-2 flex flex-nowrap">
            <textarea
              name="remark"
              v-model="remark"
              rows="3"
              class="block w-full rounded-3xl bg-meimate-white p-4 text-sm outline-none focus:shadow-lg"
            ></textarea>
            <i
              v-if="remark"
              class="bi bi-x absolute bottom-1/2 right-2 translate-y-1/2 text-2xl text-meimate-pink"
              @click="remark = ''"
              @keypress="remark = ''"
            />
          </div>
        </div>
        <div
          class="my-2 flex gap-2 text-left text-sm font-bold text-meimate-blue-gray"
        >
          <C-Checkbox-Full
            label="服務時間關閉預約"
            v-model="isBookingCostUsing"
            class="!justify-start pb-2 pt-4"
          ></C-Checkbox-Full>
        </div>
        <div
          v-if="cusCheckDisplay"
          class="my-2 flex gap-2 text-left text-sm font-bold text-meimate-blue-gray"
        >
          <C-Checkbox-Full
            label="未來預訂(待確認)"
            v-model="isCusCheckRequired"
            class="!justify-start pb-2"
          ></C-Checkbox-Full>
        </div>
      </ValidationObserver>
      <div
        class="mt-6 w-full rounded-full bg-meimate-pink px-5 py-3 text-center text-sm font-bold text-white shadow-meimate-button"
        @click="doFormValidate"
        @keypress="doFormValidate"
      >
        新增預約
      </div>
      <C-Status-Modal
        :showModal="openModal"
        content="新增成功"
        @close="openModal = false"
        :timeout="1000"
      />
    </section>
    <C-select-customer-modal
      :value='customerModal'
      @input="closeCustomerModal"
      @getCustomer="getCustomer"
    />
  </C-Main-Block>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import store from '@/store/index';
import VCCalendarSelect from '../../../components/general/VC-CalendarSelect.vue';
import allDayTime from '../../../assets/constant/bookingTime';

export default {
  components: { VCCalendarSelect },
  name: 'schedule-add',
  description: '預約的首頁',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 預約',
  },
  async mounted() {
    await this.handleGetIsBookingCusCheckUsing();
    if (this.oppointment.orderDate) {
      this.orderDate = this.oppointment.orderDate;
    }
    const msg = store.state.userInfo.selectServiceList.map((item) => item.name).join('、');
    this.remark = msg;
    this.getIsAllowAllTime();
    this.init();
  },
  data() {
    return {
      openModal: false,
      timeList: [],
      timeCostRange: [
        { label: '請選擇', value: 0 },
        { label: '半小時', value: 1 },
        { label: '一小時', value: 2 },
        { label: '一個半小時', value: 3 },
        { label: '兩小時', value: 4 },
        { label: '兩個半小時', value: 5 },
        { label: '三小時', value: 6 },
        { label: '三個半小時', value: 7 },
        { label: '四小時', value: 8 },
        { label: '四個半小時', value: 9 },
        { label: '五小時', value: 10 },
        { label: '五個半小時', value: 11 },
        { label: '六小時', value: 12 },
        { label: '六個半小時', value: 13 },
        { label: '七小時', value: 14 },
        { label: '七個半小時', value: 15 },
        { label: '八小時', value: 16 },
      ],
      isCustomerExist: false,
      isAllowAllTime: undefined,
      cusCheckDisplay: false,
      customerModal: false,
    };
  },
  methods: {
    async getIsAllowAllTime() {
      const res = await this.$api.getIsBookingTimeNoLimit();
      this.isAllowAllTime = res.data.data.getParameterAboutSettingFunction.isBookingTimeNoLimit;
      this.getTimeList();
    },
    async checkIsUnwelcome() {
      if (this.cellphone) {
        const returnData = await this.$api.checkIsCellphoneUnwelcome({
          cellphone: this.cellphone,
        });
        this.isUnwelcome = returnData.data.data.checkIsCellphoneUnwelcome;
      } else {
        this.isUnwelcome = false;
      }
    },
    // 如果qeury 有姓名與電話則帶入資料
    async init() {
      if (this.$route.query.name) {
        this.name = this.$route.query.name;
      }
      if (this.$route.query.cellphone) {
        this.cellphone = this.$route.query.cellphone;
      }
    },
    doRoute(item) {
      this.$store.commit('userInfo/UPDATE_USER_OPPOINTMENT', {
        orderDate: '',
        orderTime: '',
        status: '',
      });
      this.$router.push({ name: item });
    },
    async doFormValidate() {
      const isValidForm = await this.$refs.orderForm.validate();
      if (!isValidForm) return;
      this.doDelivery();
    },
    async doDelivery() {
      const value = this.timeCost;
      const submitForm = {
        designerId: this.userInfo.user.id,
        dateTime: this.$dayjs(
          `${this.$dayjs(this.orderDate).format('YYYY-MM-DD')} ${
            this.orderTime.name
          }`,
        ).valueOf(),
        timeCost: value,
        cellphone: this.cellphone,
        merchantId: this.currentMechantId,
        name: this.name,
        remark: this.remark,
        isDesignate: this.isOrderDesigner,
        messageForCustomer: this.messageForCustomer,
        isBookingCostUsing: this.isBookingCostUsing,
        designerServiceIds: this.selectServiceIDList,
        isCusCheckRequired: this.isCusCheckRequired,
      };
      const resp = await this.$api.bookingV2(submitForm);
      const { errors } = resp.data;
      if (errors) return;

      this.openModal = true;
      setTimeout(() => {
        store.dispatch('userInfo/SET_RESET_ORDER_DATA');
        this.$store.commit('userInfo/SET_SELECT_SERVICE_LIST', []);
        this.$router.go(-1);
      }, 1000);
    },
    async getTimeList() {
      if (this.isAllowAllTime === undefined) return;
      if (!this.noResetOrderTime) {
        this.orderTime = ''; // 原本設計是只要重打就把時間清除為了把送出成功之後把資料清空
        store.dispatch('userInfo/SET_ORDER_DATA', { key: 'noResetOrderTime', value: false });
      }
      if (this.isAllowAllTime) {
        this.timeList = allDayTime;
      } else {
        // adjust sbbmitForm for different api by isOrderDesigner
        if (this.oppointment.orderDate) {
          this.orderDate = this.oppointment.orderDate;
        }
        const submitForm = () => (this.isOrderDesigner
          ? {
            date: this.$dayjs(this.orderDate).valueOf(),
            storeId: this.currentMechantId,
            designerId: this.userInfo.user.id,
          }
          : {
            storeId: this.currentMechantId,
            date: this.$dayjs(this.orderDate).valueOf(),
          });
        // adjust response schema by isOrderDesigner
        const respDataSchema = 'getBookingTimes';
        const resp = await this.$api[respDataSchema](submitForm());
        const { data, errors } = resp.data;
        if (errors) return;
        this.timeList = Array.isArray(data[respDataSchema])
          ? data[respDataSchema].map((item, index) => ({
            name: this.$dayjs(item.time).isValid()
              ? this.$dayjs(item.time).format('HH:mm')
              : item.time,
            id: `bookingTime${index}`,
            disabled: false,
            // disabled: item.status !== '可預約',
          }))
          : [];
      }
      // 點選行事曆新增預約，要將點擊的日期帶入
      if (this.oppointment.orderDate) {
        const findTime = this.timeList.find(
          (item) => this.oppointment.orderTime === item.name && !item.disabled,
        );
        if (findTime) this.orderTime = findTime;
      }
    },
    updateTimeCost(event) {
      this.timeCost = parseInt(event.target.value, 10);
    },
    async checkIsCustomerExist(value) {
      if (value !== '') {
        const { data } = await this.$api.checkIsCustomerExist({
          cellphone: value,
        });
        const { isExist, customerName } = data.data.checkIsCustomerExist;
        this.isCustomerExist = isExist;
        if (isExist) {
          if (customerName === '') {
            this.name = '此用戶未設定姓名';
          } else {
            this.name = customerName;
          }
        } else {
          if (this.name === '此用戶未設定姓名') this.name = '';
          this.isCustomerExist = false;
        }
      }
    },
    async handleGetIsBookingCusCheckUsing() {
      try {
        const res = await this.$api.getIsBookingCusCheckUsing();
        this.cusCheckDisplay = res.data.data.getIsBookingCusCheckUsing;
      } catch (error) { /* ignore */ }
    },
    emptyPhone() {
      this.cellphone = '';
      this.name = '';
      this.isCustomerExist = false;
      this.isUnwelcome = false;
    },
    removeServiceList({ id }) {
      const filterData = store.state.userInfo.selectServiceList.filter((d) => d.id !== id);
      store.commit('userInfo/SET_SELECT_SERVICE_LIST', filterData);
      const msg = store.state.userInfo.selectServiceList.map((item) => item.name).join('、');
      this.remark = msg;
    },
    openCustomerModal() {
      this.customerModal = true;
    },
    closeCustomerModal(status) {
      this.customerModal = status;
    },
    getCustomer(data) {
      this.customerModal = false;
      if (data) {
        this.cellphone = data.cellphone;
        this.name = data.name;
        this.isCustomerExist = true;
        this.isUnwelcome = data.isUnwelcome;
      }
    },
  },
  computed: {
    ...mapState('userInfo', [
      'userInfo',
      'currentMechantId',
      'oppointment',
      'selectServiceList',
    ]),
    ...mapGetters('userInfo', ['GETTER_MECHANTNAME']),

    // 姓名欄為是否顯示清除icon
    isXmarkshow() {
      if (this.isCustomerExist) return false;
      if (this.name !== '') return true;
      return false;
    },
    selectServiceIDList() {
      return this.selectServiceList.map((item) => item.id);
    },
    orderDate: {
      get() {
        return store.state.userInfo.orderData.orderDate;
      },
      set(value) {
        store.dispatch('userInfo/SET_ORDER_DATA', { key: 'orderDate', value });
      },
    },
    orderTime: {
      get() {
        return store.state.userInfo.orderData.orderTime;
      },
      set(value) {
        store.dispatch('userInfo/SET_ORDER_DATA', { key: 'orderTime', value });
      },
    },
    name: {
      get() {
        return store.state.userInfo.orderData.name;
      },
      set(value) {
        store.dispatch('userInfo/SET_ORDER_DATA', { key: 'name', value });
      },
    },
    cellphone: {
      get() {
        return store.state.userInfo.orderData.cellphone;
      },
      set(value) {
        store.dispatch('userInfo/SET_ORDER_DATA', { key: 'cellphone', value });
      },
    },
    remark: {
      get() {
        return store.state.userInfo.orderData.remark;
      },
      set(value) {
        store.dispatch('userInfo/SET_ORDER_DATA', { key: 'remark', value });
      },
    },
    timeCost: {
      get() {
        return store.state.userInfo.orderData.timeCost;
      },
      set(value) {
        store.dispatch('userInfo/SET_ORDER_DATA', { key: 'timeCost', value });
      },
    },
    isOrderDesigner: {
      get() {
        return store.state.userInfo.orderData.isOrderDesigner;
      },
      set(value) {
        store.dispatch('userInfo/SET_ORDER_DATA', { key: 'isOrderDesigner', value });
      },
    },
    messageForCustomer: {
      get() {
        return store.state.userInfo.orderData.messageForCustomer;
      },
      set(value) {
        store.dispatch('userInfo/SET_ORDER_DATA', { key: 'messageForCustomer', value });
      },
    },
    isBookingCostUsing: {
      get() {
        return store.state.userInfo.orderData.isBookingCostUsing;
      },
      set(value) {
        store.dispatch('userInfo/SET_ORDER_DATA', { key: 'isBookingCostUsing', value });
      },
    },
    isCusCheckRequired: {
      get() {
        return store.state.userInfo.orderData.isCusCheckRequired;
      },
      set(value) {
        store.dispatch('userInfo/SET_ORDER_DATA', { key: 'isCusCheckRequired', value });
      },
    },
    isUnwelcome: {
      get() {
        return store.state.userInfo.orderData.isUnwelcome;
      },
      set(value) {
        store.dispatch('userInfo/SET_ORDER_DATA', { key: 'isUnwelcome', value });
      },
    },
    noResetOrderTime: {
      get() {
        return store.state.userInfo.orderData.noResetOrderTime;
      },
      set(value) {
        store.dispatch('userInfo/SET_ORDER_DATA', { key: 'noResetOrderTime', value });
      },
    },
  },
  watch: {
    cellphone: {
      handler() {
        if (this.cellphone === '') this.emptyPhone();
      },
    },
    orderDate: {
      immediate: true,
      handler() {
        this.getTimeList();
      },
    },
    $route: {
      immediate: true,
      handler() {
        if (this.$route.params.date) {
          const day = this.$dayjs(this.$route.params.date).format();
          this.orderDate = day;
        }
      },
    },
  },
  beforeRouteEnter(to, from, next) {
    next(() => {
      if (from.name !== 'ScheduleBreak-SelectService') {
        store.commit('userInfo/SET_SELECT_SERVICE_LIST', []);
        store.dispatch('userInfo/SET_RESET_ORDER_DATA');
      } else {
        store.dispatch('userInfo/SET_ORDER_DATA', { key: 'noResetOrderTime', value: true });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.item-text {
  @apply text-[#888888] w-1/3;
}
</style>
