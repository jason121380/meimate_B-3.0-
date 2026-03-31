<template>
  <div>
    <C-Loading-Overlay
      :value="value"
      @input="$emit('input', !value)"
      @doFunction="$emit('input', !value)"
      :layerIndex="20"
    ></C-Loading-Overlay>

    <transition name="fromBottom">
      <div v-show="value">
        <div
          class="card !fixed inset-0 z-50 mt-20 w-full overflow-visible !rounded-b-none !px-0 !pb-0"
        >
          <div class="flex items-center p-4 shadow-meimate-dropdown">
            <C-Input
              v-model="submitForm.searchInput"
              @input="doInitSearch"
              :placeholder="'搜尋姓名、手機、代號'"
              class="!my-0 grow"
              :inputClass="'!bg-meimate-white'"
            >
              <template v-slot:endIcon>
                <i
                  v-if="submitForm.searchInput !== ''"
                  @click="(submitForm.searchInput = ''), doInitSearch(true)"
                  @keypress="(submitForm.searchInput = ''), doInitSearch(true)"
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
          <div ref="cardBody" class="flex grow flex-col overflow-y-scroll px-4 pt-6">
            <template v-if="resultList.length > 0">
              <div
                v-for="item in resultList"
                :key="item.id"
                class="grid grid-cols-12 items-center justify-between gap-2 py-4 font-bold odd:bg-meimate-beige/50"
                @click="selectCustomerId(item)"
                @keypress="selectCustomerId(item)"
              >
                <div
                  :class="{ 'text-meimate-pink': item.isUnwelcome }"
                  class="col-span-5 truncate pl-2 text-sm"
                >
                  {{ item.name ? item.name : "------" }}
                </div>
                <div class="col-span-5 text-sm">{{ item.cellphone }}</div>
                <i
                  v-if="selectCustomer && item.id === selectCustomer.id"
                  class="bi bi-check-circle text-bold col-span-2 ml-auto animate-zoom pr-1 text-sucessText"
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

          <div
            class="card-footer flex w-full justify-between gap-3 !rounded-none bg-white !py-4 shadow-meimate-dropdown"
          >
            <button
              @click="$emit('input', false)"
              @keypress="$emit('input', false)"
              class="w-full rounded-3xl border border-meimate-pink bg-white px-5 py-3 text-sm font-bold text-meimate-pink"
            >
              <span>取消</span>
            </button>
            <button
              @click="$emit('getCustomer', selectCustomer)"
              @keypress="$emit('getCustomer', selectCustomer)"
              class="w-full rounded-3xl bg-meimate-pink px-5 py-3 text-sm font-bold text-white"
            >
              <span>確認</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'select-customer-modal',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      resultList: [],
      pageLimit: '',
      totalCount: 0,
      totalPage: 0,
      selectCustomer: null,
      submitForm: {
        searchInput: '',
        pageOffset: 0,
        isEnd: false,
      },
    };
  },
  methods: {
    async doSearch() {
      const resp = await this.$api.customersWithoutSorting({
        keyword: this.submitForm.searchInput,
        pageOffset: this.submitForm.pageOffset,
        pageLimit: 20,
        designerSearchWay: 'OR',
      });
      const { data, errors } = resp.data;
      if (errors) return;
      this.pageLimit = data.customersWithoutSorting.pageLimit;
      this.totalCount = data.customersWithoutSorting.totalCount;
      this.totalPage = Math.ceil(data.customersWithoutSorting.totalCount / 20) - 1;
      this.submitForm.isEnd = Math.ceil(data.customersWithoutSorting.totalCount / 20) === 1;
      this.resultList = data.customersWithoutSorting.customers;

      if (this.submitForm.pageOffset < this.totalPage) this.$refs.cardBody.addEventListener('scroll', this.scrollDoSearch);
      this.isActiveFilter = false;
    },
    doInitSearch(type) {
      const lastTimeVal = this.submitForm.searchInput;
      const isBoolean = typeof type === 'boolean';
      setTimeout(
        () => {
          if (lastTimeVal === this.submitForm.searchInput) {
            this.submitForm.pageOffset = 0;
            this.doSearch();
          }
        },
        isBoolean ? 0 : 800,
      );
    },
    async scrollDoSearch() {
      const { scrollTop } = this.$refs.cardBody;
      const windowHeight = this.$refs.cardBody.clientHeight;
      const { scrollHeight } = this.$refs.cardBody;

      if (
        !this.submitForm.isEnd
        && !this.isGetting
        && scrollTop + windowHeight >= scrollHeight - 50
      ) {
        this.isGetting = true;
        this.submitForm.pageOffset += 1;

        if (this.submitForm.pageOffset >= this.totalPage) {
          this.submitForm.isEnd = true;
          this.$refs.cardBody.removeEventListener('scroll', this.scrollDoSearch);
        }

        const resp = await this.$api.customersWithoutSorting({
          keyword: this.submitForm.searchInput,
          pageOffset: this.submitForm.pageOffset,
          pageLimit: 20,
          designerSearchWay: 'OR',
        });
        const { data, errors } = resp.data;

        if (errors) {
          this.isGetting = false;
          return;
        }

        this.isGetting = false;
        this.resultList = this.resultList.concat(data.customersWithoutSorting.customers);
      }
    },
    selectCustomerId(data) {
      this.selectCustomer = (this.selectCustomer && data.id === this.selectCustomer.id) ? null : data;
    },
    resetData() {
      this.resultList = [];
      this.pageLimit = '';
      this.totalCount = 0;
      this.totalPage = 0;
      this.selectCustomer = '';
      this.submitForm = {
        searchInput: '',
        pageOffset: 0,
        isEnd: false,
      };
    },
  },
  watch: {
    value() {
      if (this.value) {
        this.doSearch();
      } else {
        this.resetData();
      }
    },
  },
};
</script>
