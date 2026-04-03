<template>
  <C-Main-Block>
    <C-Back-Nav
      :routeTarget="{ name: 'ScheduleBreak' }"
      :title="'選擇服務'"
      @leftIconEvent="Save"
    ></C-Back-Nav>
    <section
      class="relative mx-auto mt-20 w-full max-w-screen-md px-5 lg:mt-24 lg:px-10"
    >
      <div class="card">
        <div
          class="card-body grid grid-cols-3 gap-x-4 !px-4 font-sans font-normal text-primary"
        >
          <ul class="">
            <li
              v-for="category in BookingItemCategory"
              :key="category.id"
              class="flex items-center rounded-full text-sm font-bold text-gray"
              :class="{
                'bg-meimate-yellow !text-white': seletedTab === category.id,
              }"
              @click="handleCategory(category.id)"
              @keypress="handleCategory(category.id)"
            >
              <div class="w-full py-2 text-center">{{ category.name }}</div>
            </li>
          </ul>
          <!-- -------------------------------- -->
          <template v-if="BookingItemCategory.length !== 0">
            <div class="col-span-2">
              <div
                class="flex items-center justify-between gap-2 border-b border-dashed border-b-[#DBDFE9] py-2"
              >
                <div class="text-sm font-bold text-meimate-pink">項目</div>
                <div class="text-sm font-bold text-meimate-pink">售價</div>
              </div>
              <transition-group name="fade" tag="div">
                <div
                  class="relative my-3 flex items-center justify-between"
                  v-for="item in resultList"
                  :key="item.id"
                >
                  <div
                    class="w-50 flex gap-x-2"
                    @click="triggerSelectList(item)"
                    @keypress="triggerSelectList(item)"
                  >
                    <img
                      v-if="isSelect(item.id)"
                      src="@/static/images/minus.svg"
                      alt=""
                    />
                    <img v-else src="@/static/images/add.svg" alt="" />
                    <span
                      class="text-sm font-bold"
                      :class="[
                        item.isUsing ? 'text-gray' : 'text-dark',
                        isSelect(item.id) ? 'text-meimate-yellow' : 'text-gray',
                      ]"
                    >
                      {{ item.name }}
                    </span>
                  </div>
                  <div
                    class="right-0 text-right text-sm font-bold"
                    :class="[
                      item.isUsing ? 'text-gray' : 'text-dark',
                      isSelect(item.id) ? 'text-meimate-yellow' : 'text-gray',
                    ]"
                  >
                    <span>${{ item.showPrice }}</span>
                  </div>
                </div>
              </transition-group>

              <div
                v-show="!resultList.length"
                class="mt-8 text-center text-sm font-bold text-gray"
              >
                <span class="tracking-wider">該類別暫無服務項目</span>
              </div>
            </div>
          </template>
        </div>
        <div v-show="selectList.length != 0" class="card-footer">
          <div class="my-2 select-none font-bold text-gray">已選項目:</div>
          <div class="flex flex-wrap">
            <div
              class="relative m-1 rounded-full bg-meimate-yellow px-3 py-2 text-sm font-semibold text-white"
              v-for="item in selectList"
              :key="item.id"
            >
              <span>{{ item.name }}</span>
              <div
                @click="triggerSelectList(item)"
                @keypress="triggerSelectList(item)"
                class="absolute right-0 top-0 flex size-4 -translate-y-0.5 translate-x-0.5 items-center justify-center rounded-full bg-gray"
              >
                <i
                  class="bi bi-x text-xl text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        @click="comfirmServices"
        @keypress="comfirmServices"
        class="mt-6 w-full rounded-full bg-meimate-pink px-5 py-3 text-center text-sm font-bold text-white shadow-meimate-button"
      >
        確認
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
import store from '@/store/index';

export default {
  name: 'priceList-index',
  description: '價目表的首頁',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 價目表',
  },

  data() {
    return {
      isSelectAll: false,
      enabled: true,
      seletedTab: '',
      BookingItemCategory: [],
      resultList: [],
      selectList: [],
      allItems: [],
    };
  },
  async mounted() {
    await this.getBookingItemCategory();
    if (this.BookingItemCategory.length && store.state.userInfo.selectServiceList.length) {
      const allItemsId = [];
      const selectService = store.state.userInfo.selectServiceList;
      this.BookingItemCategory.forEach(({ bookingItem }) => {
        bookingItem.forEach(({ id }) => allItemsId.push(id));
      });
      const filterData = selectService.filter((d) => allItemsId.includes(d.id));
      this.selectList = filterData;
    }
  },
  methods: {
    // 取得所有項目清單
    async getBookingItemCategory(seletedTab, mxSort) {
      const resp = await this.$api.getBookingItemCategory();
      const { data, errors } = resp.data;
      if (errors) return;
      this.BookingItemCategory = data.getBookingItemCategory;
      if (data.getBookingItemCategory.length === 0) return;
      const minSort = Math.min(...this.BookingItemCategory.map((p) => p.sort));
      const maxSort = mxSort
        ? Math.max(...this.BookingItemCategory.map((p) => p.sort))
        : null;
      this.seletedTab = seletedTab
        || this.BookingItemCategory.filter((item) => (maxSort ? item.sort === maxSort : item.sort === minSort))[0].id;

      const { bookingItem } = this.seletedTab
        ? this.BookingItemCategory.filter(
          (item) => item.id === this.seletedTab,
        )[0]
        : this.BookingItemCategory.filter((item) => item.sort === 0)[0];
      this.handleBookingItem(bookingItem, false);
    },
    // 點擊類別頁籤
    handleCategory(id) {
      this.isSelectAll = false;
      this.seletedTab = id;
      const { bookingItem } = this.BookingItemCategory.filter(
        (Category) => Category.id === id,
      )[0];
      this.handleBookingItem(bookingItem, false);
    },
    // 處理顯示的項目，把打勾清掉、根據高價、低價顯示金額
    handleBookingItem(bookingItem, checked) {
      this.resultList = bookingItem.map((item) => {
        const obj = {};
        let showPrice = 0;
        const up = !!(item.highestPrice === null || item.highestPrice === '');
        if (up) showPrice = `${item.lowestPrice} up`;
        else if (item.highestPrice === item.lowestPrice) showPrice = `${item.lowestPrice}`;
        else showPrice = `${item.lowestPrice} ~ ${item.highestPrice}`;
        obj.id = item.id;
        obj.sort = item.sort;
        obj.bookingItemCategoryId = item.bookingItemCategoryId;
        obj.bookingItemCategoryName = item.bookingItemCategoryName;
        obj.name = item.name;
        obj.lowestPrice = item.lowestPrice;
        obj.highestPrice = item.highestPrice;
        obj.showPrice = showPrice;
        obj.checked = checked;
        obj.isUsing = item.isUsing;
        obj.timeCost = item.timeCost;
        return obj;
      });
    },
    Save() {
      this.$store.commit('userInfo/SET_SELECT_SERVICE_LIST', this.selectList);
    },
    isSelect(id) {
      const item = this.selectList.find((e) => e.id === id);
      return item !== undefined;
    },
    triggerSelectList(item) {
      if (this.isSelect(item.id)) {
        this.selectList = this.selectList.filter((e) => e.id !== item.id);
      } else {
        this.selectList.push(item);
      }
    },
    comfirmServices() {
      this.Save();
      this.$router.go(-1);
    },
  },
  computed: {},
  watch: {
    isSelectAll() {
      this.handleBookingItem(this.resultList, this.isSelectAll);
    },
  },
};
</script>

<style lang="scss" scoped>
.scrollnone {
  &::-webkit-scrollbar {
    display: none !important;
  }
}

.title {
  text-indent: 0.5em;
  position: relative;
}
.title::before {
  content: "";
  width: 2px;
  height: 1em;
  position: absolute;
  background-color: #111827;
  border-radius: 5px;
  top: 0;
  left: 0;
  bottom: 0;
  margin: auto 0;
}
</style>
