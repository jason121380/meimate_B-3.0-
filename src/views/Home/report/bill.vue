<template>
  <C-Main-Block>
    <C-Back-Nav
      :routeTarget="{ name: 'Report' }"
      :title="'帳單列表'"
    ></C-Back-Nav>
    <section class="mx-auto mt-20 w-full max-w-screen-md px-5 lg:mt-40 lg:px-10">
      <vc-date-picker
        locale="zh"
        is-required
        @input="getOrders()"
        v-model="searchDate"
        mode="date"
        :model-config="modelConfig"
        class="is-expanded"
      >
        <template v-slot="{ inputValue, inputEvents }">
          <input
            type="text"
            name="$dayjs(reviewResult.currentDate).format('YYYY/MM/DD')"
            :placeholder="$dayjs(reviewResult.currentDate).format('YYYY/MM/DD')"
            class="w-full rounded-full px-6 py-3 font-bold tracking-wider text-black focus:outline-none"
            :value="inputValue"
            v-on="inputEvents"
          />
          <label
            :for="$dayjs(reviewResult.currentDate).format('YYYY/MM/DD')"
            class="hidden"
          ></label>
        </template>
      </vc-date-picker>

      <div class="text-left text-sm">
        <!-- 上方資訊 -->
        <div
          class="card card-body mt-4 !pt-0"
          v-if="reviewResult.orders && reviewResult.orders.length > 0"
        >
          <div class="mx-auto my-4 text-black">
            <p class="mt-2 text-lg font-semibold">{{ userInfo.user.name }}</p>
            <p class="mt-2 text-center text-lg font-semibold text-meimate-pink">
              總覽
            </p>
          </div>
          <div
            class=" "
            v-if="
              reviewResult.intervalSummary && reviewResult.orders.length > 0
            "
          >
            <div
              v-for="billItem in billItems"
              :key="`user_${billItem['key']}`"
              class="flex justify-between p-1.5 font-medium odd:bg-meimate-beige/50"
            >
              <span>{{ billItem["text"] }}</span>
              <span
                >${{
                  reviewResult.intervalSummary[billItem["key"]]
                    ? reviewResult.intervalSummary[billItem["key"]].toFixed(2)
                    : "0"
                }}</span
              >
            </div>
          </div>
        </div>

        <!-- 訂單列表 -->
        <h2
          v-if="reviewResult.orders && reviewResult.orders.length > 0"
          class="mb-3 mt-5 px-4 text-center text-[17px] font-bold text-black"
        >
          訂單列表
        </h2>
        <div>
          <ul v-if="reviewResult.orders && reviewResult.orders.length > 0">
            <li v-for="item in reviewResult.orders" :key="item.id">
              <ul class="mb-4 mt-1">
                <div
                  @click="item.isOpen = !item.isOpen"
                  @keypress="item.isOpen = !item.isOpen"
                  class="card card-body !flex-row justify-between bg-white text-sm font-bold text-black"
                >
                  <div class="grid w-full grid-cols-4">
                    <div>
                      <span
                        class="w-fit rounded-full bg-meimate-light-gray p-1 text-black"
                        >#{{ item.no }}</span
                      >
                    </div>
                    <span class="col-span-2 text-meimate-pink"
                      >{{ item.customer.name }}</span
                    >
                    <span class="text-meimate-blue-gray">{{ $dayjs(item.date).format("HH:mm") }}</span>
                  </div>
                  <div class="self-end">
                    <i
                      class="bi bi-chevron-up block cursor-pointer text-lg text-meimate-pink duration-200"
                      :class="{ 'rotate-180': item.isOpen }"
                    />
                  </div>
                </div>
                <ul v-show="item.isOpen" class="card card-body duration-200">
                  <li>
                    <div
                      v-for="reportItem in reportItems"
                      :key="`${item.id}${reportItem['key']}`"
                      class="flex justify-between py-1 text-sm text-black odd:bg-meimate-beige/50"
                    >
                      <span class="font-medium">{{ reportItem["text"] }}</span>
                      <span
                        >${{
                          item[reportItem["key"]]
                            ? item[reportItem["key"]].toFixed(2)
                            : "0"
                        }}</span
                      >
                    </div>
                    <div class="my-4 text-lg font-bold text-meimate-pink">
                      詳細資料
                    </div>
                    <div class="overflow-x-scroll">
                      <table class="w-full border-collapse">
                        <thead>
                          <tr class="text-meimate-blue-gray">
                            <th class="min-w-[6.25rem]">設計師</th>
                            <th class="min-w-[6.25rem]">項目</th>
                            <th class="min-w-[6.25rem]">價格</th>
                            <th class="min-w-[6.25rem]">互助人</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(staticItem, idx) in item.staticDetail"
                            :key="idx"
                            class="font-medium text-black odd:bg-meimate-beige/50"
                            :class="{
                              'py-1.5 pb-2':
                                idx !== item.staticDetail.length - 1,
                            }"
                          >
                            <td class="truncate p-1.5">
                              {{ staticItem.designerName }}
                            </td>
                            <td class="truncate p-1.5">
                              {{ staticItem.itemName }}
                            </td>
                            <td class="truncate p-1.5">
                              ${{ staticItem.price.toFixed(2) }}
                            </td>
                            <td class="truncate p-1.5">
                              <p
                                v-for="(
                                  helperItem, idx2
                                ) in staticItem.helperList"
                                :key="idx2"
                              >
                                {{ helperItem.helperName }}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </li>
                </ul>
              </ul>
            </li>
          </ul>
          <div
            v-if="!reviewResult.orders || reviewResult.orders.length === 0"
            class="card mt-4 p-5"
          >
            <div
              class="flex h-20 items-center justify-center text-lg font-bold text-meimate-blue-gray"
            >
              <img src="@/static/images/file.svg" alt="" class="mr-2" />查無資料
            </div>
          </div>
        </div>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'bill-report',
  description: '報表的帳單列表',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 帳單列表',
  },
  mounted() {
    this.getOrders();
  },
  data() {
    return {
      modelConfig: {
        start: {
          timeAdjust: '00:00:00',
        },
        end: {
          timeAdjust: '23:59:59',
        },
      },
      pageOffset: 0,
      // searchDate: this.$dayjs('2022,11,16').add(0, 'month').format('YYYY-MM-DD'),//測試日期
      searchDate: this.$dayjs().add(0, 'month').format('YYYY-MM-DD'),
      date: '',
      reviewResult: {},
      showDetail: [],
      billItems: [
        {
          text: '服務消費',
          key: 'service',
        },
        {
          text: '店販消費',
          key: 'product',
        },
        {
          text: '卡券使用(入業績)',
          key: 'usedTicket',
        },
        {
          text: '卡券販賣(入業績)',
          key: 'ticketSellIntoPerformance',
        },
        {
          text: '業績收入',
          key: 'performanceIncome',
        },
        {
          text: '卡券販賣(不入業績)',
          key: 'ticketSellNotIntoPerformance',
        },
        {
          text: '卡券使用(-)',
          key: 'usedTicketForDecount',
        },
        {
          text: '第三方卡券(-)',
          key: 'thirdPartTicketForDecount',
        },
        {
          text: '其他付款方式(-)',
          key: 'otherPayWayForDecount',
        },
        {
          text: '入金使用(-)',
          key: 'walletUsedForDecount',
        },
        {
          text: '入金儲值',
          key: 'walletDeposit',
        },
        {
          text: '營業現金應收',
          key: 'businessCash',
        },
      ],
      reportItems: [
        {
          text: '服務消費',
          key: 'serviceFakeTotal',
        },
        {
          text: '店販消費',
          key: 'productFakeTotal',
        },
        {
          text: '卡券使用(入業績)',
          key: 'useTicketTotal',
        },
        {
          text: '卡券販賣(入業績)',
          key: 'ticketSellIntoPerformance',
        },
        {
          text: '業績收入',
          key: 'performanceIncome',
        },
        {
          text: '卡券販賣(不入業績)',
          key: 'ticketSellNotIntoPerformance',
        },
        {
          text: '卡券使用(-)',
          key: 'usedTicketForDecount',
        },
        {
          text: '第三方卡券(-)',
          key: 'thirdPartTicketForDecount',
        },
        {
          text: '其他付款方式(-)',
          key: 'otherPayWayForDecount',
        },
        {
          text: '入金使用(-)',
          key: 'walletUsedForDecount',
        },
        {
          text: '營業現金應收',
          key: 'businessCash',
        },
      ],
    };
  },
  methods: {
    doRoute() {
      this.$router.push({ name: 'Punch' });
    },
    async getOrders() {
      if (!this.searchDate) return;
      const orderForCellPhoneResponse = await this.$api.getIsDisplayAllOrderForCellphone();
      const isGetIsDisplayAllOrderForCellphone = orderForCellPhoneResponse.data.data.getIsDisplayAllOrderForCellphone;
      const submitForm = {
        startDate: new Date(this.searchDate).getTime(),
        endDate: new Date(this.searchDate).getTime(),
        pageLimit: 20,
        pageOffset: this.pageOffset,
        isReserved: false,
      };

      if (!isGetIsDisplayAllOrderForCellphone) {
        submitForm.employeeId = this.userInfo.user.id;
      }

      const res = await this.$api.designerOrders(submitForm);
      const { data } = res.data;

      if (data.orders.orders.length > 0) {
        /* eslint-disable */
        data.orders.orders.forEach((item, idx) => {
          // 新增isopen資料
          item["isOpen"] = false;
          if (idx === data.orders.orders.length - 1)
            this.reviewResult = data.orders;
        });
        /* eslint-disable */
      } else this.reviewResult = data.orders;

      this.reviewResult["currentDate"] = this.searchDate;
    },
    timestampGetTime(timestamp) {
      const date = new Date(parseInt(timestamp, 10));
      return `${date.getHours()}:${date.getMinutes()}`;
    },
  },
  computed: {
    ...mapState("userInfo", ["userInfo"]),
    isReviewResult() {
      return this.reviewResult.length;
    },
    showMonth() {
      return `${this.$dayjs(this.reviewResult.currentDate).format("MM")}`;
    },
    showYear() {
      return `${this.$dayjs(this.reviewResult.currentDate).format("YYYY")}`;
    },
    // totalCount() {
    //   return (item) => {
    //     const reducer = (accumulator, curr) => +accumulator + +curr;
    //     const priceList = item.map((itemPrice) => itemPrice.price);
    //     return priceList.reduce(reducer);
    //   };
    // },
    currentMM() {
      let currentMonth = "";
      if (this.date) {
        currentMonth = this.$dayjs(this.date).format("MM");
      } else {
        currentMonth = this.$dayjs(new Date()).format("MM");
      }
      return currentMonth;
    },
    currentYYYY() {
      let currentYear = "";
      if (this.date) {
        currentYear = this.$dayjs(this.date).format("YYYY");
      } else {
        currentYear = this.$dayjs(new Date()).format("YYYY");
      }
      return currentYear;
    },
  },
};
</script>
