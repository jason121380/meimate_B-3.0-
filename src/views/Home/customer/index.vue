<template>
  <C-Main-Block>
    <C-Back-Nav
      :title="`客戶資料查詢(${resultList.length}/${totalCount})`"
    ></C-Back-Nav>
    <section
      class="relative mx-auto mt-20 w-full max-w-screen-md px-5 lg:mt-40 lg:px-10"
    >
      <div class="mb-4 flex items-center justify-between gap-2">
        <button
          @click="isActiveFilter = !isActiveFilter"
          class="rounded-lg bg-meimate-pink/10 p-2"
        >
          <img
            src="@/static/images/filter.svg"
            alt="search"
            class="size-5 object-contain"
          />
        </button>
        <C-Input
          v-model="submitForm.searchInput"
          @input="doInitSearch"
          :placeholder="'搜尋姓名、手機、代號'"
          class="!my-0 grow"
        >
          <template v-slot:endIcon>
            <i
              v-if="submitForm.searchInput !== ''"
              @click="(submitForm.searchInput = ''), doInitSearch()"
              @keypress="(submitForm.searchInput = ''), doInitSearch()"
              class="bi bi-x text-2xl text-meimate-pink"
            />
            <img
              v-else
              src="@/static/images/search_icon.svg"
              alt="search"
              class="size-5 object-contain"
            />
          </template>
        </C-Input>
      </div>
      <!-- eslint-disable-next-line -->
      <div
        class="card card-body bg-white"
        :class="{
          'overflow-hidden': this.isActiveFilter,
          'h-96': this.isActiveFilter,
        }"
      >
        <template v-if="resultList.length > 0">
          <div
            v-for="(item, index) in resultList"
            :key="`result${index}`"
            class="mb-2 grid grid-cols-6 items-center justify-between gap-2 py-2 font-bold odd:bg-meimate-beige/50"
            @click="doRoute(item)"
            @keypress="doRoute(item)"
          >
            <div
              :class="{ 'text-meimate-pink': item.isUnwelcome }"
              class="col-span-2 truncate pl-2"
            >
              {{ item.name ? item.name : "------" }}
            </div>
            <div class="col-span-3">{{ item.cellphone }}</div>
            <i
              class="bi bi-chevron-right ml-auto pr-2"
            />
          </div>
        </template>
        <div
          v-else
          class="flex h-20 items-center justify-center text-lg font-bold text-meimate-blue-gray"
        >
          <img src="@/static/images/file.svg" alt="" class="mr-2" />查無資料
        </div>
      </div>
    </section>

    <C-Filter-Wrap
      v-model="isActiveFilter"
      :searchAdvanceCtx="searchAdvanceCtx"
      :allServiceAttributions="allServiceAttributions"
      :isAllCusDisplay="isAllCusDisplay"
      @doFunction="doInitSearch(true)"
      @clearFunction="clearSearchAdvanceCtx"
    ></C-Filter-Wrap>
  </C-Main-Block>
</template>

<script>
import { mapState } from 'vuex';
// eslint-disable-next-line no-unused-vars
import month from '@/assets/constant/month';
import store from '@/store/index';

const searchAdvanceCtxTemplate = {
  year: '',
  month: '',
  day: '',
  customerIsCome: null,
  consumptionRange: {
    startDate: '',
    endDate: '',
  },
  baseDateRange: {
    baseDate: '',
    toDate: '',
    dayNumber: '',
  },
  designer: {
    latestDesignerSelected: '',
    latestDesigner: [{ name: '請選擇', id: '' }],
    preferDesignerSelected: '',
    preferDesigner: [{ name: '請選擇', id: '' }],
  },
  serviceAttributions: [],
};
export default {
  name: 'customer-index',
  description: '客戶資料查詢的首頁',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 客戶資料查詢',
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollDoSearch);
  },
  // keep-alive離開頁面取消監聽事件
  deactivated() {
    window.removeEventListener('scroll', this.scrollDoSearch);
  },
  // keep-alive進入頁面啟動監聽事件
  async activated() {
    if (this.submitForm.pageOffset < this.totalPage) window.addEventListener('scroll', this.scrollDoSearch);
    const unwelcomeData = store.state.userInfo.userIsUnwelcome;
    if (unwelcomeData.userId !== null) {
      const result = JSON.parse(JSON.stringify(this.resultList));
      result.forEach((d) => {
        if (d.id === unwelcomeData.userId) {
          d.isUnwelcome = unwelcomeData.isUnwelcome;
        }
      });
      this.resultList = result;
    }
    store.commit('userInfo/CLEAR_USER_UNWELCOME');
  },
  data() {
    return {
      isActiveFilter: false,
      pageLimit: '',
      totalCount: 0,
      submitForm: {
        searchInput: '',
        pageOffset: 0,
        isEnd: false,
      },
      totalPage: 0,
      isGetting: false,
      searchAdvanceCtx: {
        year: '',
        month: '',
        day: '',
        customerIsCome: null,
        consumptionRange: {
          startDate: '',
          endDate: '',
        },
        baseDateRange: {
          baseDate: '',
          toDate: '',
          dayNumber: '',
        },
        designer: {
          latestDesignerSelected: '',
          latestDesigner: [],
          preferDesignerSelected: '',
          preferDesigner: [],
        },
        serviceAttributions: [],
        isUnwelcome: 'ALL',
      },
      resultList: [],
      isloading: false,
      allServiceAttributions: [],
      isAllCusDisplay: false,
    };
  },
  methods: {
    async init() {
      this.doSearch();
      this.getAllDesigner();
      this.getServiceAttributions();
      this.getIsAllCusDisplay();
    },
    async clearSearchAdvanceCtx() {
      this.searchAdvanceCtx = JSON.parse(
        JSON.stringify(searchAdvanceCtxTemplate),
      );
    },
    doRoute(item) {
      this.$router.push({ name: 'Customer-UserInfo', query: { id: item.id } });
    },
    // 搜尋框搜尋
    doInitSearch(type) {
      const lastTimeVal = this.submitForm.searchInput;
      setTimeout(
        () => {
          if (lastTimeVal === this.submitForm.searchInput) {
            this.submitForm.pageOffset = 0;
            this.doSearch();
          }
        },
        type ? 0 : 500,
      );
    },
    async filterSearch() {
      const submitForm = {
        keyword: this.submitForm.searchInput,
        pageOffset: this.submitForm.pageOffset,
        pageLimit: 20,
        customerIsCome: this.searchAdvanceCtx.customerIsCome,
        preferDesigner: this.searchAdvanceCtx.designer.preferDesignerSelected,
        latestDesigner: this.searchAdvanceCtx.designer.latestDesignerSelected,
        category: this.searchAdvanceCtx.serviceAttributions,
        isUnwelcome: this.searchAdvanceCtx.isUnwelcome,
        designerSearchWay: 'OR',
      };
      if (
        this.searchAdvanceCtx.year !== ''
        || this.searchAdvanceCtx.month !== ''
      ) {
        submitForm.birthday = {};
        submitForm.birthday.year = `${this.searchAdvanceCtx.year}`;
        submitForm.birthday.month = month.find(
          (item) => item.label === this.searchAdvanceCtx.month,
        )
          ? month.find((item) => item.label === this.searchAdvanceCtx.month)
            .value
          : '';
        submitForm.birthday.day = '';
      }

      if (this.searchAdvanceCtx.consumptionRange.startDate !== '') {
        submitForm.consumptionRange = {};
        submitForm.consumptionRange.startDate = this.searchAdvanceCtx.consumptionRange.startDate;
        submitForm.consumptionRange.endDate = this.searchAdvanceCtx.consumptionRange.endDate;
      }
      if (this.searchAdvanceCtx.baseDateRange.baseDate !== '') {
        submitForm.baseDateRange = {};
        submitForm.baseDateRange.baseDate = this.searchAdvanceCtx.baseDateRange.baseDate;
      }
      if (this.searchAdvanceCtx.baseDateRange.toDate !== '') {
        if (submitForm.baseDateRange) {
          submitForm.baseDateRange.toDate = this.searchAdvanceCtx.baseDateRange.toDate;
        } else {
          submitForm.baseDateRange = {};
          submitForm.baseDateRange.toDate = this.searchAdvanceCtx.baseDateRange.toDate;
        }
      }
      if (this.searchAdvanceCtx.baseDateRange.dayNumber !== '') {
        if (submitForm.baseDateRange) {
          submitForm.baseDateRange.dayNumber = Number(
            this.searchAdvanceCtx.baseDateRange.dayNumber,
          );
        } else {
          submitForm.baseDateRange = {};
          submitForm.baseDateRange.dayNumber = Number(
            this.searchAdvanceCtx.baseDateRange.dayNumber,
          );
        }
      }
      const resp = await this.$api.customersWithoutSorting(submitForm);
      return resp;
    },
    async doSearch() {
      const resp = await this.filterSearch();
      const { data, errors } = resp.data;
      if (errors) return;
      this.pageLimit = data.customersWithoutSorting.pageLimit;
      this.totalCount = data.customersWithoutSorting.totalCount;
      this.totalPage = Math.ceil(data.customersWithoutSorting.totalCount / 20) - 1;
      this.submitForm.isEnd = Math.ceil(data.customersWithoutSorting.totalCount / 20) === 1;
      this.resultList = data.customersWithoutSorting.customers;

      if (this.submitForm.pageOffset < this.totalPage) window.addEventListener('scroll', this.scrollDoSearch);
      this.isActiveFilter = false;
    },
    // 滾動加載
    async scrollDoSearch() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

      if (
        !this.submitForm.isEnd
        && !this.isGetting
        && scrollTop + windowHeight >= scrollHeight - 50
      ) {
        this.isGetting = true;
        this.submitForm.pageOffset += 1;

        if (this.submitForm.pageOffset >= this.totalPage) {
          this.submitForm.isEnd = true;
          window.removeEventListener('scroll', this.scrollDoSearch);
        }

        const resp = await this.filterSearch();
        const { data, errors } = resp.data;

        if (errors) {
          this.isGetting = false;
          return;
        }

        this.isGetting = false;
        this.resultList = this.resultList.concat(
          data.customersWithoutSorting.customers,
        );
      }
    },
    async getAllDesigner() {
      const ML_DESIGN = JSON.parse(localStorage.getItem('ML_DESIGN'));
      const auth = ML_DESIGN.userAuthorizeList.filter(
        (item) => item.pageName === '可查詢全店客資',
      );
      const input = {
        MerchantId: ML_DESIGN.currentMechantId,
        usagelimit: 'EMPLOYEE_LIST',
      };
      const thisUser = [
        { id: '', name: '請選擇' },
        {
          id: ML_DESIGN.user.id,
          name: ML_DESIGN.user.name,
        },
      ];
      if (!auth[0] || !auth[0].authority) {
        this.searchAdvanceCtx.designer.latestDesigner = thisUser;
        this.searchAdvanceCtx.designer.preferDesigner = thisUser;
        searchAdvanceCtxTemplate.designer.latestDesigner = thisUser;
        searchAdvanceCtxTemplate.designer.preferDesigner = thisUser;
      } else {
        const resp = await this.$api.users(input);
        const { data, errors } = resp.data;
        if (errors) return;
        data.users.users.unshift({ id: '', name: '請選擇' });
        this.searchAdvanceCtx.designer.latestDesigner = data.users.users;
        this.searchAdvanceCtx.designer.preferDesigner = data.users.users;
        searchAdvanceCtxTemplate.designer.latestDesigner = data.users.users;
        searchAdvanceCtxTemplate.designer.preferDesigner = data.users.users;
      }
    },
    async getServiceAttributions() {
      const resp = await this.$api.getServiceAttributions();
      const { data, errors } = resp.data;
      if (errors) return;
      this.allServiceAttributions = data.serviceAttributions;
    },
    async getIsAllCusDisplay() {
      const resp = await this.$api.getIsAllCusDisplay();
      const { data, errors } = resp.data;
      if (errors) return;
      this.isAllCusDisplay = data.isAllCusDisplay;
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo', 'currentMechantId']),
    isReviewResult() {
      return this.reviewResult.length;
    },
    isOrderResult() {
      return this.orderResult.length;
    },
  },
};
</script>

<style></style>
