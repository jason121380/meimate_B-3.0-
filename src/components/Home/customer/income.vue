<template>
  <div class="animate__animated animate__fadeIn animate__fast">
    <div class="card card-body !py-8 text-center">
      <p
        class="mx-auto mb-1 w-fit rounded-full bg-meimate-pink px-2 py-1 text-center text-sm text-white"
      >
        入金餘額
      </p>
      <h3 class="text-4xl font-bold">${{ walletCash }}</h3>
    </div>
    <div class="mb-3 mt-4 flex w-full items-center">
      <button
        @click="(seletedTab = 1), switchAddEventListener()"
        :class="
          seletedTab === 1
            ? 'text-meimate-yellow border-b-2 border-meimate-yellow font-bold'
            : 'text-meimate-blue-gray font-medium'
        "
        class="w-full pb-2 text-lg"
      >
        入金儲值
      </button>
      <button
        @click="(seletedTab = 2), switchAddEventListener()"
        :class="
          seletedTab === 2
            ? 'text-meimate-yellow border-b-2 border-meimate-yellow font-bold'
            : 'text-meimate-blue-gray font-medium'
        "
        class="w-full pb-2 text-lg"
      >
        入金使用
      </button>
    </div>
    <!-- 入金紀錄列表 -->
    <div
      class="animate__animated animate__fadeIn animate__slow"
      v-show="seletedTab === 1"
    >
      <div
        class="card mb-4"
        v-for="(item, index) in resultList"
        :key="`consumption1${index}`"
      >
        <div class="card-body grid grid-cols-5 !p-6">
          <span class="col-span-3 text-sm text-gray">{{
            $dayjs(item.date).format("YYYY/MM/DD")
          }}</span>
          <span
            class="text-gray-dark col-span-2 truncate text-right text-sm font-medium"
            >{{ item.Maker.name }}</span
          >
          <div
            class="col-span-3 mt-4 size-fit rounded-full bg-meimate-light-gray p-1.5 text-sm font-medium text-black"
          >
            {{ item.payType }}
          </div>
          <div
            class="col-span-2 mt-4 text-right text-xl font-semibold text-meimate-pink"
          >
            <span>${{ item.money }}</span>
          </div>
        </div>
      </div>
      <div v-if="resultList.length === 0" class="card card-body">
        <div
          class="flex h-20 items-center justify-center bg-white text-lg font-bold text-meimate-blue-gray"
        >
          <img src="@/static/images/file.svg" alt="" class="mr-2" /><span
            >此客戶尚無入金儲值</span
          >
        </div>
      </div>
    </div>

    <!-- 使用紀錄列表 -->
    <div
      class="animate__animated animate__fadeIn animate__slow"
      v-show="seletedTab === 2"
    >
      <div
        v-for="(item, index) in resultUseList"
        :key="`consumption${index}`"
        class="card mb-4"
      >
        <div class="card-body grid grid-cols-5 !p-6">
          <span class="col-span-3 text-sm text-gray">{{
            $dayjs(item.date).format("YYYY/MM/DD")
          }}</span>
          <span class="text-gray-dark col-span-2 truncate text-right text-sm">{{
            item.Designer.name
          }}</span>
          <div
            class="col-span-3 mt-4 size-fit rounded-full bg-meimate-light-gray p-1 text-sm font-medium text-black"
          >
            # {{ item.orderNo }}
          </div>
          <div
            class="col-span-2 mt-4 text-right text-xl font-semibold text-meimate-pink"
          >
            <span>${{ item.money }}</span>
          </div>
        </div>
      </div>
      <div v-if="resultUseList.length === 0" class="card card-body">
        <div
          class="flex h-20 items-center justify-center bg-white text-lg font-bold text-meimate-blue-gray"
        >
          <img src="@/static/images/file.svg" alt="" class="mr-2" /><span
            >此客戶尚無入金使用紀錄</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'customer-component-income',
  mounted() {
    this.getWalletDepositRecords();
    this.getWallet();
  },
  // 元件離開時取消監聽
  deactivated() {
    window.removeEventListener('scroll', this.scrollGetAddRecords);
    window.removeEventListener('scroll', this.scrollGetUseRecords);
  },
  activated() {
    if (!this.addRecordsForm.isEnd && this.seletedTab === 1) window.addEventListener('scroll', this.scrollGetAddRecords);
    if (!this.usedRecordsForm.isEnd && this.seletedTab === 2) window.addEventListener('scroll', this.scrollGetUseRecords);
  },
  data() {
    return {
      seletedTab: 1,
      addRecordsForm: {
        pageOffset: 0,
        totalPage: 0,
        isEnd: false,
        isGetting: false,
      },
      usedRecordsForm: {
        pageOffset: 0,
        totalPage: 0,
        isEnd: false,
        isGetting: false,
      },
      resultList: [],
      resultUseList: [],
      walletCash: 0,
    };
  },
  methods: {
    // 切換 tab 時判斷是否需要監聽 scroll
    switchAddEventListener() {
      if (this.seletedTab === 1) {
        window.removeEventListener('scroll', this.scrollGetUseRecords);
        if (!this.addRecordsForm.isEnd) window.addEventListener('scroll', this.scrollGetAddRecords);
      } else {
        if (!this.usedRecordsForm.isEnd && this.resultUseList.length !== 0) window.addEventListener('scroll', this.scrollGetUseRecords);
        if (!this.usedRecordsForm.isEnd && this.resultUseList.length === 0) this.walletUseRecords();
        window.removeEventListener('scroll', this.scrollGetAddRecords);
      }
    },
    // 取得儲值紀錄
    async getWalletDepositRecords() {
      if (this.resultList.length === 0 && this.addRecordsForm.isEnd) return;

      const submitForm = {
        customerId: this.$route.query.id ? this.$route.query.id : '',
        pageLimit: 10,
        pageOffset: this.addRecordsForm.pageOffset,
        payType: [],
      };

      const res = await this.$api.walletDepositRecord(submitForm);
      const { data } = res.data;

      this.addRecordsForm.totalPage = Math.ceil(data.walletDepositRecord.totalCount / 10) - 1;
      this.addRecordsForm.isEnd = Math.ceil(data.walletDepositRecord.totalCount / 10) === 1;
      this.resultList = data.walletDepositRecord.record;

      if (this.addRecordsForm.pageOffset < this.addRecordsForm.totalPage) window.addEventListener('scroll', this.scrollGetAddRecords);
    },
    // 滾動加載儲值紀錄
    async scrollGetAddRecords() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

      if (
        !this.addRecordsForm.isEnd
        && !this.addRecordsForm.isGetting
        && scrollTop + windowHeight >= scrollHeight - 50
      ) {
        this.addRecordsForm.isGetting = true;
        this.addRecordsForm.pageOffset += 1;

        if (this.addRecordsForm.pageOffset >= this.addRecordsForm.totalPage) {
          this.addRecordsForm.isEnd = true;
          window.removeEventListener('scroll', this.scrollGetAddRecords);
        }

        const input = {
          customerId: this.$route.query.id ? this.$route.query.id : '',
          pageLimit: 10,
          pageOffset: this.addRecordsForm.pageOffset,
          payType: [],
        };

        const res = await this.$api.walletDepositRecord(input);
        const { data } = res.data;

        this.addRecordsForm.isGetting = false;
        this.resultList = this.resultList.concat(
          data.walletDepositRecord.record,
        );
      }
    },
    // 取得使用紀錄
    async walletUseRecords() {
      if (this.resultUseList.length === 0 && this.usedRecordsForm.isEnd) return;

      const submitForm = {
        customerId: this.$route.query.id ? this.$route.query.id : '',
        pageLimit: 10,
        pageOffset: this.usedRecordsForm.pageOffset,
        payType: [],
      };

      const res = await this.$api.walletUseRecord(submitForm);
      const { data } = res.data;

      this.usedRecordsForm.totalPage = Math.ceil(data.walletUseRecord.totalCount / 10) - 1;
      this.usedRecordsForm.isEnd = Math.ceil(data.walletUseRecord.totalCount / 10) === 1;
      this.resultUseList = data.walletUseRecord.record;

      if (this.usedRecordsForm.pageOffset < this.usedRecordsForm.totalPage) window.addEventListener('scroll', this.scrollGetUseRecords);
    },
    // 滾動加載使用紀錄
    async scrollGetUseRecords() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

      if (
        !this.usedRecordsForm.isEnd
        && !this.usedRecordsForm.isGetting
        && scrollTop + windowHeight >= scrollHeight - 50
      ) {
        this.usedRecordsForm.isGetting = true;
        this.usedRecordsForm.pageOffset += 1;

        if (this.usedRecordsForm.pageOffset >= this.usedRecordsForm.totalPage) {
          this.usedRecordsForm.isEnd = true;
          window.removeEventListener('scroll', this.scrollGetUseRecords);
        }

        const submitForm = {
          customerId: this.$route.query.id ? this.$route.query.id : '',
          pageLimit: 10,
          pageOffset: this.usedRecordsForm.pageOffset,
          payType: [],
        };

        const res = await this.$api.walletUseRecord(submitForm);
        const { data } = res.data;

        this.usedRecordsForm.isGetting = false;
        this.resultUseList = this.resultUseList.concat(
          data.walletUseRecord.record,
        );
      }
    },
    // 取得剩餘入金
    async getWallet() {
      const submitForm = {
        customerId: this.$route.query.id ? this.$route.query.id : '',
      };

      const res = await this.$api.customerWallet(submitForm);
      const { data } = res.data;

      this.walletCash = data.customerWallet;
    },
  },
};
</script>

<style></style>
