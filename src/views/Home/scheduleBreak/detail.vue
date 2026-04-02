<template>
  <C-Main-Block>
    <C-Back-Nav
      :routeTarget="{ name: 'ScheduleBreak' }"
      :title="$route.query.isReview ? '預約內容' : '預約明細'"
    ></C-Back-Nav>
    <section
      v-if="resultItem"
      class="relative mx-auto mt-20 w-full max-w-screen-md px-5 lg:mt-40 lg:px-10"
    >
      <div class="card card-body font-medium">
        <div class="my-2 grid grid-cols-5 items-center">
          <p class="col-span-2 font-medium text-meimate-blue-gray">預約時間</p>
          <p v-if="isEdit" class="col-span-3">
            <vc-date-picker
              is-required
              v-model="resultItem.date"
              mode="dateTime"
              :minute-increment="30"
              :valid-hours="
                isAllowAllTime
                  ? { min: 0, max: 23 }
                  : { min: this.openingHours, max: this.closingHours }
              "
              is24hr
              :min-date="$dayjs().format('YYYY-MM-DD')"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <input
                  class="form-control form-control-sm form-control-solid !bg-meimate-white"
                  placeholder="請選擇日期"
                  :value="inputValue"
                  v-on="inputEvents"
                />
              </template>
            </vc-date-picker>
          </p>
          <div v-else class="col-span-3 flex gap-x-2">
            <p>{{ resultItem.date | dateFmtROCMMDD }}</p>
            <p>{{ resultItem.date | dateFmtHm }}</p>
          </div>
        </div>
        <div class="my-2 grid grid-cols-5 items-center">
          <p class="col-span-2 font-medium text-meimate-blue-gray">預約時長</p>
          <C-Select
            v-if="isEdit"
            inputClasses="bg-meimate-white"
            :list="timeCostRange"
            v-model="resultItem.timeCost"
            item-text="label"
            item-value="value"
            :isFull="true"
            object-return
            class="col-span-3"
          ></C-Select>

          <p class="col-span-3" v-else>{{ resultItem.timeCost.label }}</p>
        </div>

        <div
          class="my-2 grid grid-cols-5 items-center"
          :class="{ 'mb-0': isEdit }"
        >
          <p class="col-span-2 font-medium text-meimate-blue-gray">電話</p>
          <C-Input
            v-if="isEdit"
            v-model="resultItem.customer.cellphone"
            :placeholder="'輸入客戶電話'"
            class="col-span-3"
            :isUnwelcome="resultItem.customer.isUnwelcome"
            @inputOnBlur="checkIsUnwelcome"
            type="tel"
            maxLength="10"
            inputClass="border-none !rounded-full !bg-meimate-white"
            @Change="checkIsCustomerExist"
          >
            <template v-slot:endIcon>
              <i
                v-if="resultItem.customer.cellphone !== ''"
                class="bi bi-x text-2xl text-meimate-pink"
                @click="emptyPhone"
                @keypress="emptyPhone"
              />
            </template>
          </C-Input>
          <template v-else>
            <p class="col-span-2">{{ resultItem.customer.cellphone }}</p>
            <button
              @click="copy(resultItem.customer.cellphone, 'phone')"
              class="col-span-1 -mr-2 ml-auto w-fit rounded-md border border-meimate-pink bg-white p-1 text-sm text-meimate-pink"
              :class="{'!text-[12px]': copyPhone}"
            >複製{{ copyPhone ? '成功' : '' }}</button>
          </template>
        </div>

        <div class="my-2 grid grid-cols-5 items-center">
          <p class="col-span-2 font-medium text-meimate-blue-gray">姓名</p>
          <C-Input
            :disabled="isCustomerExist"
            v-if="isEdit"
            v-model="resultItem.customer.name"
            :placeholder="'輸入客戶姓名'"
            class="col-span-3 !mb-0"
            inputClass="border-none !rounded-full !bg-meimate-white"
            divClass="rounded-full"
          ></C-Input>
          <div v-else class="col-span-3 flex items-center gap-x-4">
            <p class="truncate">{{ resultItem.customer.name }}</p>
            <div class="flex items-center" v-if="!isEdit">
              <img
                src="@/static/images/users-light.svg"
                alt="users"
                class="inline size-6 cursor-pointer object-contain"
                @keypress="doRouteCustomer(resultItem.customer)"
                @click="doRouteCustomer(resultItem.customer)"
              />
              <i
                class="bi bi-hand-thumbs-down-fill text-xl text-meimate-pink"
                v-if="resultItem.customer.isUnwelcome"
              />
            </div>
          </div>
        </div>

        <div class="my-2 grid grid-cols-5 items-center">
          <p class="col-span-2 font-medium text-meimate-blue-gray">設計師</p>
          <p class="col-span-3 break-words">
            {{
              resultItem.designer
                ? resultItem.designer.name
                : resultItem.designer
            }}
          </p>
        </div>
        <div class="my-2 grid grid-cols-5 items-center">
          <p class="col-span-2 font-medium text-meimate-blue-gray">指定預約</p>
          <div v-if="isEdit" class="col-span-3 space-x-2">
            <span
              class="inline-block w-20 select-none rounded-full bg-meimate-yellow py-1.5 text-center text-sm font-bold text-white"
              :class="{
                '!bg-meimate-white !text-meimate-blue-gray': !isDesignate,
              }"
              @click="setDesignate(true)"
              @keypress="setDesignate(true)"
            >
              指定
            </span>
            <span
              class="inline-block w-20 select-none rounded-full bg-meimate-yellow py-1.5 text-center text-sm font-bold text-white"
              :class="{
                '!bg-meimate-white !text-meimate-blue-gray': isDesignate,
              }"
              @click="setDesignate(false)"
              @keypress="setDesignate(false)"
            >
              不指定
            </span>
          </div>
          <p class="col-span-3" v-else>
            {{ resultItem.isDesignate ? "指定" : "不指定" }}
          </p>
        </div>
        <div class="my-2 grid grid-cols-5 items-center">
          <p class="col-span-2font-medium col-span-2 text-meimate-blue-gray">
            同行人數
          </p>
          <p class="col-span-3 break-words">
            {{ resultItem.companionCount }}
          </p>
        </div>
        <div class="my-2 grid grid-cols-5 items-center">
          <label class="col-span-2 font-medium text-meimate-blue-gray"
            >我的備註</label
          >
          <div class="relative col-span-3">
            <textarea
              v-if="isEdit"
              name="remark"
              v-model="resultItem.remark"
              rows="3"
              class="block w-full rounded-3xl bg-meimate-white px-4 py-2 text-sm font-medium outline-none"
            ></textarea>
            <p v-else class="col-span-3 break-words">
              {{ resultItem.remark ? resultItem.remark : "無" }}
            </p>
            <i
              v-if="resultItem.remark !== '' && isEdit"
              @click="resultItem.remark = ''"
              @keypress="resultItem.remark = ''"
              class="bi bi-x absolute bottom-1/2 right-2 translate-y-1/2 text-2xl text-meimate-pink"
            />
          </div>
        </div>
        <div class="my-2 grid grid-cols-5 items-center">
          <label class="col-span-2 font-medium text-meimate-blue-gray"
            >顧客備註
          </label>
          <div class="relative col-span-3">
            <p name="remark" class="w-full break-words">
              {{
                resultItem.remarkForCustomer
                  ? resultItem.remarkForCustomer
                  : "無"
              }}
            </p>
          </div>
        </div>
        <div
          class="my-2 grid grid-cols-5 items-center"
          :class="{ '!border-0': !isEdit }"
        >
          <label class="col-span-2 font-medium text-meimate-blue-gray"
            >留言給顧客</label
          >
          <div class="relative col-span-3">
            <textarea
              v-if="isEdit"
              name="messageForCustomer"
              v-model="resultItem.messageForCustomer"
              rows="3"
              class="block w-full rounded-3xl bg-meimate-white px-4 py-2 text-sm font-medium outline-none"
            ></textarea>
            <p class="col-span-3" v-else>
              {{
                resultItem.messageForCustomer
                  ? resultItem.messageForCustomer
                  : "無"
              }}
            </p>
            <i
              v-if="resultItem.messageForCustomer !== '' && isEdit"
              @click="resultItem.messageForCustomer = ''"
              @keypress="resultItem.messageForCustomer = ''"
              class="bi bi-x absolute bottom-1/2 right-2 translate-y-1/2 text-2xl text-meimate-pink"
            />
          </div>
        </div>
        <div v-if="isEdit">
          <C-Checkbox-Full
            label="服務時間關閉預約"
            v-model="resultItem.isBookingCostUsing"
            class="!justify-start pb-2 pt-4"
            :disabled="!isEdit"
          ></C-Checkbox-Full>
        </div>
        <div
          v-else-if="resultItem.isBookingCostUsing"
          class="!justify-start pb-2 pt-4 text-sm"
        >
          此預約期間占用一名名額
        </div>
        <div v-if="isEdit">
          <C-Checkbox-Full
            label="未來預訂(待確認)"
            v-model="resultItem.isCusCheckRequired"
            class="!justify-start pb-2 pt-4"
            :disabled="!isEdit"
          ></C-Checkbox-Full>
        </div>
        <div
          v-else-if="resultItem.isCusCheckRequired"
          class="!justify-start pb-2 pt-4 text-sm"
        >
        未來預訂(待確認)
        </div>

        <div
          class="mt-4"
          v-if="
            resultItem.status !== '待審查' &&
            resultItem.status !== '已完成' &&
            isEdit
          "
        >
          <div class="m-auto flex items-center gap-x-4 p-2">
            <div
              class="flex w-full items-center justify-center gap-2 rounded-full bg-meimate-white px-4 py-2 text-sm font-bold text-meimate-blue-gray"
              :class="{
                '!bg-meimate-yellow text-white':
                  resultItem.status === '預約成功',
              }"
              @click="clickStatus(true, '預約成功')"
              @keypress="clickStatus(true, '預約成功')"
            >
              <img
                src="@/static/images/check.svg"
                alt="check"
                class="animate__animated animate__heartBeat animate__fast inline size-6 cursor-pointer object-contain"
                v-if="resultItem.status === '預約成功'"
              />
              <span>接單</span>
            </div>
            <div
              class="flex w-full items-center justify-center gap-2 rounded-full bg-meimate-white px-4 py-2 text-sm font-bold text-meimate-blue-gray"
              :class="{
                '!bg-meimate-yellow text-white':
                  resultItem.status === '設計師已取消',
              }"
              @click="clickStatus(false, '設計師已取消')"
              @keypress="clickStatus(false, '設計師已取消')"
            >
              <img
                src="@/static/images/check.svg"
                alt="check"
                class="animate__animated animate__heartBeat animate__fast inline size-6 cursor-pointer object-contain"
                v-if="resultItem.status === '設計師已取消'"
              />
              <span>拒絕</span>
            </div>
          </div>
        </div>

        <!-- 非修改預約狀態 -->
        <div
          class="mt-4"
          v-if="
            resultItem.status !== '待審查' &&
            resultItem.status !== '已完成' &&
            !isEdit
          "
        >
          <div class="m-auto flex items-center gap-x-4 p-2">
            <div
              class="flex w-full cursor-pointer items-center justify-center gap-1 rounded-full bg-meimate-white px-4 py-2 text-sm font-bold text-meimate-blue-gray"
              :class="{
                '!bg-meimate-yellow text-white':
                  resultItem.status === '預約成功',
              }"
              @click="updateVerifyBookingInput(true)"
              @keypress="updateVerifyBookingInput(true)"
            >
              <img
                src="@/static/images/check.svg"
                alt="check"
                class="animate__animated animate__heartBeat animate__fast inline size-6 cursor-pointer object-contain"
                v-if="resultItem.status === '預約成功'"
              />
              <span>接單</span>
            </div>
            <div
              class="flex w-full cursor-pointer items-center justify-center gap-1 rounded-full bg-meimate-white px-4 py-2 text-sm font-bold text-meimate-blue-gray"
              :class="{
                '!bg-meimate-yellow text-white':
                  resultItem.status === '設計師已取消',
              }"
              @click="updateVerifyBookingInput(false)"
              @keypress="updateVerifyBookingInput(false)"
            >
              <img
                src="@/static/images/check.svg"
                alt="check"
                class="animate__animated animate__heartBeat animate__fast inline size-6 cursor-pointer object-contain"
                v-if="resultItem.status === '設計師已取消'"
              />
              <span>拒絕</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4" v-if="resultItem.status === '待審查'">
        <p class="text-center text-lg font-semibold">選擇審查狀態</p>
        <div class="m-auto flex items-center justify-between p-2">
          <div
            class="w-full rounded-full bg-[#82BC94] px-3 py-2 text-sm text-white"
            @click="toggleDialog('accept')"
            @keypress="toggleDialog('accept')"
          >
            接單
          </div>
          <div
            class="w-full rounded-full bg-meimate-pink px-3 py-2 text-sm text-white"
            @click="toggleDialog('reject')"
            @keypress="toggleDialog('reject')"
          >
            拒絕
          </div>
        </div>
      </div>

      <!-- 修改預約狀態 -->

      <!-- 修改預約狀態 -->

      <div
        class="mx-auto my-5 flex max-w-[475px] justify-around"
        v-if="resultItem.status !== '0'"
      >
        <div
          class="w-full rounded-full bg-meimate-pink px-5 py-3 text-center text-sm font-bold text-white shadow-meimate-button"
          @click="doSubmitEdit(), (isEdit = !isEdit)"
          @keypress="doSubmitEdit(), (isEdit = !isEdit)"
        >
          {{ isEdit ? "儲存預約" : "修改預約" }}
        </div>
      </div>
      <C-Status-Modal
        :showModal="openModal"
        content="修改成功"
        @close="openModal = false"
        :timeout="1000"
      />
    </section>
  </C-Main-Block>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'schedule-edit',
  description: '預約單的審查',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 預約',
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      isEdit: false,
      resultItem: null,
      isDesignate: true,
      isApproval: null,
      isAllowAllTime: true,
      openModal: false,
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
      timeCost: 0,
      isUnwelcome: false,
      isCustomerExist: true,
      cusCheckDisplay: false,
      openingHours: (localStorage.getItem('openingHours') || '10:00:00').split(':')[0],
      closingHours: (localStorage.getItem('closingHours') || '22:00:00').split(':')[0],
      copyName: false,
      copyPhone: false,
    };
  },
  activated() {
    this.init();
    this.copyName = false;
    this.copyPhone = false;
  },
  deactivated() {
    this.isEdit = false;
  },
  methods: {
    transdata(data) {
      if (data === 1) {
        return '半小時';
      }
      if (data === 2) {
        return '一個小時';
      }
      if (data === 3) {
        return '一個半小時';
      }
      if (data === 4) {
        return '兩個小時';
      }
      if (data === 5) {
        return '兩個半小時';
      }
      if (data === 6) {
        return '三個小時';
      }
      if (data === 7) {
        return '三個半小時';
      }
      if (data === 8) {
        return '四個小時';
      }
      if (data === 9) {
        return '四個半小時';
      }
      if (data === 10) {
        return '五個小時';
      }
      if (data === 11) {
        return '五個半小時';
      }
      if (data === 12) {
        return '六個小時';
      }
      if (data === 13) {
        return '六個半小時';
      }
      if (data === 14) {
        return '七個小時';
      }
      if (data === 15) {
        return '七個半小時';
      }
      if (data === 16) {
        return '八個小時';
      }
      return '';
    },
    setDesignate(data) {
      this.isDesignate = data;
    },
    async init() {
      const res = await this.$api.getIsBookingTimeNoLimit();
      this.isAllowAllTime = res.data.data.getParameterAboutSettingFunction.isBookingTimeNoLimit;
      await this.handleGetIsBookingCusCheckUsing();
      await this.getOrder(this.$route.query.id);
    },
    doRoute() {
      // this.$router.push({ name: 'ScheduleBreak' });
      this.$router.go(-1);
    },
    doRouteCustomer(item) {
      this.$router.push({ name: 'Customer-UserInfo', query: { id: item.id } });
    },
    async getOrder(orderId) {
      const res = await this.$api.order({ orderId });
      const { data, errors } = res.data;
      if (errors) return {};
      if (data.order.status === '待審核') {
        this.isApproval = null;
      } else if (data.order.status === '預約成功') {
        this.isApproval = true;
      } else {
        this.isApproval = false;
      }
      const option = this.timeCostRange.find(
        (e) => e.value === data.order.timeCost,
      );
      this.resultItem = data.order;
      this.resultItem.timeCost = option;
      this.isDesignate = data.order.isDesignate;
      this.isnotDesignate = !this.isDesignate;
      return res;
    },
    async handleGetIsBookingCusCheckUsing() {
      try {
        const res = await this.$api.getIsBookingCusCheckUsing();
        this.cusCheckDisplay = res.data.data.getIsBookingCusCheckUsing;
      } catch (error) { /* ignore */ }
    },
    async doSubmitEdit() {
      if (!this.isEdit) return;
      const { value } = this.resultItem.timeCost;
      const submit = {
        id: this.$route.query.id,
        remark: this.resultItem.remark,
        isDesignate: this.isDesignate,
        messageForCustomer: this.resultItem.messageForCustomer,
        date: new Date(this.resultItem.date).getTime(),
        customerCellphone: this.resultItem.customer.cellphone,
        customerName: this.resultItem.customer.name,
        timeCost: value,
        isBookingCostUsing: this.resultItem.isBookingCostUsing,
        isCusCheckRequired: this.resultItem.isCusCheckRequired,
      };
      const resp = await this.$api.updateBooking(submit, true);
      const { data, errors } = resp.data;
      if (errors) return;
      const option = this.timeCostRange.find(
        (e) => e.value === data.updateBooking.timeCost,
      );
      this.resultItem = data.updateBooking;
      this.resultItem.timeCost = option;
      let defulatValue = null;
      if (this.resultItem.status === '預約成功') {
        defulatValue = true;
      } else {
        defulatValue = false;
      }

      if (this.isApproval !== defulatValue) {
        await this.updateVerifyBookingInput(this.isApproval);
      }

      this.openModal = true;
    },
    toggleDialog(actionType) {
      this.$swal
        .fire({
          input: 'text',
          title: ' ',
          html: `<div class="flex items-center justify-center">
          ${
  actionType === 'accept'
    ? `<img src="${process.env.BASE_URL}assets/images/success.svg" alt="" class="inline-block mr-1" /><span>確認接單</span>`
    : `<img src="${process.env.BASE_URL}assets/images/error.svg" alt="" class="inline-block mr-1" /><span>已拒絕</span>`
}
        </div>`,
          inputPlaceholder: '請輸入備註說明',
          confirmButtonText: '送出',
          showConfirmButton: true,
          showCloseButton: true,
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp animate__faster',
          },
          customClass: {
            confirmButton:
              '!w-[144px] !rounded !bg-second !px-[14px] !py-2 !text-sm !text-white',
          },
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.$swal
              .fire({
                showCloseButton: true,
                html: `<div class="flex items-center justify-center my-10">
              ${
  actionType === 'accept'
    ? `<img src="${process.env.BASE_URL}assets/images/success.svg" alt="" class="inline-block mr-1" /><span>接單成功</span>`
    : `<img src="${process.env.BASE_URL}assets/images/error.svg" alt="" class="inline-block mr-1" /><span>拒絕成功</span>`
}
            </div>`,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
              })
              .then(() => {
                this.doRoute();
              });
          }
        });
    },
    clickStatus(isApproval, status) {
      this.isApproval = isApproval;
      this.resultItem.status = status;
    },
    async updateVerifyBookingInput(isApproval) {
      const submit = { orderId: this.resultItem.id, isApproval };
      const res = await this.$api.VerifyBookingInput(submit);
      const { errors } = res.data;
      if (errors) return;
      await this.getOrder(this.$route.query.id);
    },
    updateTimeCost(event) {
      this.resultItem.timeCost = parseInt(event.target.value, 10);
    },
    async checkIsUnwelcome() {
      if (this.resultItem.customer.cellphone) {
        const returnData = await this.$api.checkIsCellphoneUnwelcome({
          cellphone: this.resultItem.customer.cellphone,
        });
        this.resultItem.customer.isUnwelcome = returnData.data.data.checkIsCellphoneUnwelcome;
      } else {
        this.resultItem.customer.isUnwelcome = false;
      }
    },
    async checkIsCustomerExist(value) {
      if (value !== '') {
        const { data } = await this.$api.checkIsCustomerExist({
          cellphone: value,
        });
        const { isExist, customerName } = data.data.checkIsCustomerExist;
        this.isCustomerExist = isExist;
        if (isExist) {
          if (customerName === '') this.resultItem.customer.name = '此用戶未設定姓名';
          else this.resultItem.customer.name = customerName;
        } else {
          if (this.resultItem.customer.name === '此用戶未設定姓名') this.resultItem.customer.name = '';
          this.isCustomerExist = false;
        }
      }
    },
    emptyPhone() {
      this.resultItem.customer.cellphone = '';
      this.resultItem.customer.name = '';
      this.isCustomerExist = false;
    },
    copy(text, type) {
      navigator.clipboard.writeText(text)
        .then(() => {
          if (type === 'name') {
            this.copyName = true;
          } else {
            this.copyPhone = true;
          }
        });
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo']),
  },
};
</script>

<style lang="scss" scoped>
.item-row {
  @apply my-2 p-2 flex items-center border-b border-solid border-[#F1F1F1];
}

.text-title {
  @apply text-[#888] font-normal;
}

.text-area {
  @apply block w-full rounded-md border bg-white border-[#F1F1F1] p-1.5 text-sm outline-none focus:shadow-lg;
}
</style>
