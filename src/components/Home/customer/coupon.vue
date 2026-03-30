<template>
  <div class="animate__animated animate__fadeIn animate__fast">
    <div class="animate__animated animate__fadeIn animate__slow">
      <div
        v-if="resultList.length > 0"
        class="flex flex-col gap-4 md:grid md:grid-cols-2 md:justify-evenly"
      >
        <Ticket
          v-for="item in resultList"
          :key="item.ticketOrderId"
          @openRecord="handleOpenRecord($event)"
          :id="item.ticketOrderId"
          :title="item.couponName"
          :canUse="item.totalCount"
          :used="item.usedCount"
          :price="item.singleCouponPrice"
          :totalPrice="item.totalCount * item.singleCouponPrice"
          :time="item.boughtDate"
        />
      </div>

      <div v-else class="card card-body">
        <div
          class="flex h-20 items-center justify-center bg-white text-lg font-bold text-meimate-blue-gray"
        >
          <img src="@/static/images/file.svg" alt="" class="mr-2" />尚無使用紀錄
        </div>
      </div>
    </div>

    <C-Modal-Dialog
      v-model="showRecord"
      @close="showRecord = false"
      :animationCss="'animate__animated animate__flipInY animate__fast'"
      :title="recordDetail.couponName"
    >
      <div class="-mx-9 px-5">
        <table
          v-if="recordDetail.usedCount && recordDetail.usedCount !== 0"
          class="mt-5 w-full text-left text-sm font-semibold"
        >
          <thead class="text-bs-gray-500">
            <tr class="[&>*]:p-2">
              <th class="text-start">項次</th>
              <th>使用日期</th>
              <th class="text-end">使用張數</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, idx) in recordDetail.usageRecord"
              :key="idx"
              class="odd:bg-slate-50 [&>*]:p-2"
            >
              <td class="text-start">{{ idx + 1 }}</td>
              <td>{{ $dayjs(item.usedDate).format("YYYY/MM/DD HH:mm") }}</td>
              <td class="text-end">{{ item.usageCount }}</td>
            </tr>
          </tbody>
        </table>
        <div
          class="mt-10 font-semibold"
          v-if="recordDetail.usedCount && recordDetail.usedCount !== 0"
        >
          <div class="grid w-full grid-cols-12 gap-2 text-sm">
            <div class="col-span-9 text-right text-meimate-pink">
              可用次數 :
            </div>
            <div class="col-span-3 text-end text-meimate-pink">
              {{ recordDetail.totalCount - recordDetail.usedCount }}/{{
                recordDetail.totalCount
              }}
            </div>
            <div class="col-span-9 text-right text-meimate-pink">總金額 :</div>
            <div class="col-span-3 text-end text-meimate-pink">
              ${{ recordDetail.totalCount * recordDetail.singleCouponPrice }}
            </div>
          </div>
        </div>
        <div
          v-else
          class="flex items-center justify-center bg-white text-lg font-bold text-meimate-blue-gray"
        >
          <img
            src="@/static/images/file.svg"
            alt=""
            class="mr-2"
          />此卡券尚無使用紀錄
        </div>
      </div>
    </C-Modal-Dialog>
  </div>
</template>

<script>
import Ticket from '@/components/Home/customer/coupon/ticket.vue';

export default {
  name: 'customer-component-coupon',
  components: {
    Ticket,
  },
  mounted() {
    this.getCoupons();
  },
  data() {
    return {
      resultList: [],
      showRecord: false,
      recordDetail: {},
    };
  },
  methods: {
    handleOpenRecord(id) {
      this.recordDetail = this.resultList.find((item) => item.ticketOrderId === id);
      this.showRecord = true;
    },
    async getCoupons() {
      const res = await this.$api.customerCouponBalanceReport(
        this.$route.query.id,
      );
      const { data } = res;

      this.resultList = data.data.customerCouponBalanceReport[0]
        ? data.data.customerCouponBalanceReport[0].data
        : [];
    },
  },
};
</script>

<style></style>
