<template>
  <div class="animate__animated animate__fadeIn animate__fast">
    <!-- 訂單列表 -->
    <h2
      v-if="reviewResult.orders && reviewResult.orders.length > 0"
      class="mb-3 mt-5 px-4 text-center text-xl font-bold text-meimate-pink"
    >
      訂單列表
    </h2>
    <div class="">
      <div
        v-if="reviewResult.orders && reviewResult.orders.length === 0"
        class="card card-body"
      >
        <div
          class="flex h-20 items-center justify-center bg-white text-lg font-bold text-meimate-blue-gray"
        >
          <img
            src="@/static/images/file.svg"
            alt=""
            class="mr-2"
          />此客戶尚無服務紀錄
        </div>
      </div>
      <ul class="flex flex-col gap-4">
        <li v-for="item in reviewResult.orders" :key="item.id" class="">
          <div
            v-if="reviewResult.orders && reviewResult.orders.length > 0"
            @click="item.isOpen = !item.isOpen"
            @keypress="item.isOpen = !item.isOpen"
            class="card card-body !flex-row justify-between bg-white text-sm font-bold text-black"
          >
            <div class="grid w-full grid-cols-6">
              <div>
                <span
                  class="w-fit rounded-full bg-meimate-light-gray p-1 text-black"
                  >#{{ item.no }}</span
                >
              </div>
              <span class="col-span-3 text-meimate-pink">{{ item.designer.nameForCustomerSide  }}</span>
              <span class="col-span-2 text-meimate-blue-gray">
                {{ item.date }}
              </span>
            </div>
            <div class="self-end">
              <i
                :class="{ 'rotate-180': item.isOpen }"
                class="bi bi-chevron-up block cursor-pointer text-lg text-meimate-pink duration-200"
              />
            </div>
          </div>
          <div class="card card-body duration-200" v-show="item.isOpen">
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
            <div class="my-4 text-lg font-bold text-meimate-pink">詳細資料</div>
            <div class="overflow-x-scroll">
              <table class="w-full">
                <thead>
                  <tr class="text-meimate-blue-gray">
                    <th class="w-full min-w-16">設計師</th>
                    <th class="w-full min-w-[6.5rem]">項目</th>
                    <th class="w-full min-w-[6.5rem]">價格</th>
                    <th class="w-full min-w-[6.5rem]">互助人</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(staticItem, idx) in item.staticDetail"
                    :key="idx"
                    class="font-medium text-black odd:bg-meimate-beige/50"
                    :class="{
                      'py-1.5 pb-2': idx !== item.staticDetail.length - 1,
                    }"
                  >
                    <td class="truncate p-1.5">
                      {{ staticItem.designerName }}
                    </td>
                    <td class="w-full min-w-[6.5rem] p-1.5">
                      {{ staticItem.itemName }}
                    </td>
                    <td class="p-1.5">${{ staticItem.price.toFixed(2) }}</td>
                    <td class="p-1.5">
                      <p
                        v-for="(helperItem, idx2) in staticItem.helperList"
                        :key="idx2"
                      >
                        {{ helperItem.helperName }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'customer-component-consumption',
  mounted() {
    this.getOrders();
  },
  deactivated() {
    window.removeEventListener('scroll', this.scrollGetOrders);
  },
  activated() {
    if (!this.isEnd) window.addEventListener('scroll', this.scrollGetOrders);
  },
  data() {
    return {
      resultList: [],
      reviewResult: {},
      submitForm: {
        pageLimit: 10,
        pageOffset: 0,
      },
      totalPage: 0,
      isEnd: false,
      isGetting: false,
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
    // 取得服務紀錄
    async getOrders() {
      const submitForm = {
        customerId: this.$route.query.id ? this.$route.query.id : '',
        pageLimit: this.submitForm.pageLimit,
        pageOffset: this.submitForm.pageOffset,
        isReserved: false,
      };

      const res = await this.$api.designerOrders(submitForm);
      const { data } = res.data;

      if (data.orders.orders.length > 0) {
        /* eslint-disable */
        data.orders.orders.forEach((item, idx) => {
          item["isOpen"] = false;
          if (idx === data.orders.orders.length - 1) {
            let newOrders = data.orders.orders.map((item) => {
              const timeStamp = item.date;
              const date = new Date(timeStamp);
              const dateFormate = `${date.getFullYear()}/${
                date.getMonth() + 1
              }/${date.getDate()}`;
              item.date = dateFormate;
              return item;
            });
            data.orders.orders = newOrders;

            console.log('data.orders: ', data.orders);
            this.reviewResult = data.orders;
          }
        });
        /* eslint-disable */
      } else this.reviewResult = data.orders;

      this.totalPage = Math.ceil(data.orders.totalCount / 10) - 1;
      this.isEnd = Math.ceil(data.orders.totalCount / 10) === 1;
      // this.resultList = data.orders.orders;

      if (this.submitForm.pageOffset < this.totalPage)
        window.addEventListener("scroll", this.scrollGetOrders);
    },
    // 滾動加載服務紀錄
    async scrollGetOrders() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;

      if (
        !this.isEnd &&
        !this.isGetting &&
        scrollTop + windowHeight >= scrollHeight - 50
      ) {
        this.isGetting = true;
        this.submitForm.pageOffset += 1;

        if (this.submitForm.pageOffset >= this.totalPage) {
          this.isEnd = true;
          window.removeEventListener("scroll", this.scrollGetOrders);
        }

        const submitForm = {
          customerId: this.$route.query.id ? this.$route.query.id : "",
          pageLimit: 10,
          pageOffset: this.submitForm.pageOffset,
        };

        const res = await this.$api.designerOrders(submitForm);
        const { data } = res.data;

        this.isGetting = false;

        if (data.orders.orders.length > 0) {
          /* eslint-disable */
          data.orders.orders.forEach((item, idx) => {
            item["isOpen"] = false;
            if (idx === data.orders.orders.length - 1) {
              let newOrders = data.orders.orders.map((item) => {
                const timeStamp = item.date;
                const date = new Date(timeStamp);
                const dateFormate = `${date.getFullYear()}/${
                  date.getMonth() + 1
                }/${date.getDate()}`;
                item.date = dateFormate;
                return item;
              });
              this.reviewResult.orders =
                this.reviewResult.orders.concat(newOrders);
            }
          });
          /* eslint-disable */
        }
      }
    },
  },
};
</script>

<style></style>
