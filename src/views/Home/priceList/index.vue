<template>
  <C-Main-Block>
    <C-Back-Nav :title="this.desStatus === 'noDes' ? '不指定價目表' : '個人價目表'">
      <template #right v-if="desChangeDisplay">
        <div
          @click="desChange"
          @keyPress="desChange"
          :class="[this.desStatus === 'noDes' ? 'bg-[#62cb5e]' : 'bg-meimate-yellow']"
          class="flex cursor-pointer items-center justify-center rounded-full px-3 py-1 text-[13px] font-bold text-white transition-opacity active:opacity-80"
        >
          {{ desStatus === "noDes" ? "切換為個人" : "切換為不指定" }}
        </div>
      </template>
    </C-Back-Nav>
    <section class="relative mx-auto mt-20 w-full max-w-screen-md px-5 lg:mt-40 lg:px-10">
      <div class="card card-body !px-2">
        <div class="grid grid-cols-3 gap-x-2">
          <!-----------------類別檢視----------------- -->
          <ul v-if="BookingItemCategory.length > 0" v-show="!(editable || sortable)" class="mt-1">
            <li
              class="mb-2 flex items-center rounded-full px-2.5 py-2"
              :class="{ 'bg-meimate-yellow': seletedTab === 'ALL' }"
              @click="handleCategory('ALL')"
              @keypress="handleCategory('ALL')"
            >
              <p
                class="w-full text-center text-sm font-semibold text-meimate-blue-gray"
                :class="{ 'text-white': seletedTab === 'ALL' }"
              >
                全部
              </p>
            </li>
            <li
              v-for="category in BookingItemCategory"
              :key="category.id"
              class="mb-2 flex items-center rounded-full px-2.5 py-2"
              :class="{ 'bg-meimate-yellow': seletedTab === category.id }"
              @click="handleCategory(category.id)"
              @keypress="handleCategory(category.id)"
            >
              <p
                class="w-full text-center text-sm font-semibold text-meimate-blue-gray"
                :class="{ 'text-white': seletedTab === category.id }"
              >
                {{ category.name }}
              </p>
            </li>
          </ul>
          <p v-else-if="!editable" class="py2 col-span-3 text-center">無資料</p>
          <!------------------類別編輯---------------- -->
          <ul class="col-span-1" v-show="editable">
            <li class="mb-4 mt-1">
              <div
                class="flex items-center pt-1"
                @click="openCategoryModal('create')"
                @keypress="openCategoryModal('create')"
              >
                <img
                  src="@/static/images/add.svg"
                  alt="add"
                  class="size-5 object-contain"
                />
                <span class="ml-2 text-sm font-bold text-meimate-pink"
                  >新增類別</span
                >
              </div>
            </li>
            <li
              v-for="category in BookingItemCategory"
              :key="category.id"
              class="mb-4 flex items-center justify-between gap-0.5 last:mb-0"
              @click="handleCategory(category.id)"
              @keypress="handleCategory(category.id)"
            >
              <p
                class="w-full truncate rounded-full px-1 py-1.5 text-center text-base font-semibold text-meimate-blue-gray"
                :class="{
                  'bg-meimate-yellow text-white': seletedTab === category.id,
                }"
              >
                <span>{{ category.name }}</span>
              </p>
              <div class="flex w-fit items-center gap-x-1">
                <img
                  src="@/static/images/edit.svg"
                  @click="openCategoryModal('update', category)"
                  @keypress="openCategoryModal('update', category)"
                  alt="pencel"
                  class="size-4 shrink-0 object-contain"
                />
                <img
                  src="@/static/images/price-trash.svg"
                  alt="trash"
                  class="size-4 shrink-0 object-contain"
                  @click="openDeleteModal('category', category.id)"
                  @keypress="openDeleteModal('category', category.id)"
                />
              </div>
            </li>
          </ul>
          <!--------------------類別排序-------------- -->
          <ul class="" v-show="sortable">
            <C-Draggable
              handle=".moveable"
              v-model="BookingItemCategory"
              :disabled="!enabled"
              class="list-group scrollnone list-none items-center overflow-x-auto pl-0"
              ghost-class="ghost"
              @change="bookingItemCategoryMove"
              @start="dragging = true"
              @end="dragging = false"
            >
              <li
                v-for="category in BookingItemCategory"
                :key="category.id"
                class="mb-4 flex items-center rounded-full px-2.5 py-2 text-center text-base last:mb-0"
                :class="{ 'bg-meimate-yellow': seletedTab === category.id }"
                @click="handleCategory(category.id)"
                @keypress="handleCategory(category.id)"
              >
                <p
                  class="flex w-full items-center gap-x-2 text-sm font-semibold text-meimate-blue-gray"
                  :class="{ 'text-white': seletedTab === category.id }"
                >
                  <i
                    class="bi bi-grip-vertical moveable w-5 text-meimate-blue-gray"
                    :class="{ 'text-white': seletedTab === category.id }"
                  />
                  <span>{{ category.name }}</span>
                </p>
              </li>
            </C-Draggable>
          </ul>
          <!---------------------------------- -->
          <div class="col-span-2">
            <template v-if="BookingItemCategory.length !== 0">
              <div class="select-none">
                <div
                  class="flex justify-between border-b border-dashed border-gray p-2 text-sm font-bold text-meimate-pink"
                >
                  <span>項目</span>
                  <span>售價</span>
                </div>
                <div v-if="editable">
                  <div class="flex justify-between py-2 pl-2">
                    <C-Checkbox-Full
                      v-if="resultList.length > 0"
                      v-model="isSelectAll"
                      label="全選"
                      labelClass="!text-sm"
                    ></C-Checkbox-Full>
                    <div class="flex items-center justify-end gap-2">
                      <div
                        v-if="!isSelectAll"
                        @click="openItemCreateUpdateModal('create')"
                        @keypress="openItemCreateUpdateModal('create')"
                      >
                        <img
                          src="@/static/images/add.svg"
                          alt="add"
                          class="size-5 object-contain"
                        />
                      </div>
                      <div
                        v-if="
                          resultList.filter((v) => v.checked === true).length >
                            0 || isSelectAll
                        "
                        class="flex items-center gap-1"
                      >
                        <img
                          src="@/static/images/price-upload.svg"
                          alt="upload"
                          class="size-5 object-contain"
                          @click="changeBookingItemUsing(resultList, true)"
                          @keypress="changeBookingItemUsing(resultList, true)"
                        />

                        <img
                          src="@/static/images/price-download.svg"
                          alt="download"
                          class="size-5 object-contain"
                          @click="changeBookingItemUsing(resultList, false)"
                          @keypress="changeBookingItemUsing(resultList, false)"
                        />

                        <img
                          src="@/static/images/price-trash.svg"
                          alt="trash"
                          class="size-5 object-contain"
                          @click="openDeleteModal('multiItems')"
                          @keypress="openDeleteModal('multiItems')"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!-----------------項目排序----------------- -->
                <div v-if="sortable">
                  <C-Draggable
                    handle=".moveable"
                    :list="resultList"
                    :disabled="!enabled"
                    class="list-group select-none"
                    ghost-class="ghost"
                    @change="bookingItemMove"
                    @start="dragging = true"
                    @end="dragging = false"
                  >
                    <div
                      class="flex items-center justify-between py-2"
                      v-for="item in resultList"
                      :key="item.id"
                    >
                      <div class="moveable flex items-center">
                        <i
                          class="bi bi-grip-vertical moveable mr-1 w-5 text-meimate-blue-gray"
                          :class="{ 'text-meimate-blue-gray': !item.isUsing }"
                        />
                        <div class="ml-2 text-sm font-medium text-black">
                          <span
                            :class="{ 'text-meimate-blue-gray': !item.isUsing }"
                            >{{ item.name }}</span
                          >
                        </div>
                      </div>

                      <div class="text-sm font-medium text-black">
                        <span
                          :class="{ 'text-meimate-blue-gray': !item.isUsing }"
                          >${{ item.showPrice }}</span
                        >
                      </div>
                    </div>
                  </C-Draggable>
                </div>
                <div v-if="editable">
                  <div
                    class="flex items-center justify-between py-2"
                    v-for="item in resultList"
                    :key="item.id"
                  >
                    <div class="w-2/5 pl-2 text-sm font-medium text-black">
                      <C-Checkbox-Full
                        v-model="item.checked"
                        :label="item.name"
                        :labelClass="{
                          'text-meimate-blue-gray': !item.isUsing,
                          truncate: true,
                        }"
                      ></C-Checkbox-Full>
                    </div>
                    <div
                      class="flex gap-x-1 truncate text-sm font-medium text-black"
                    >
                      <span
                        class="truncate text-sm"
                        :class="{ 'text-meimate-blue-gray': !item.isUsing }"
                        >${{ item.showPrice }}</span
                      >
                      <div
                        @click="openItemCreateUpdateModal('update', item)"
                        @keypress="openItemCreateUpdateModal('update', item)"
                      >
                        <img
                          src="@/static/images/edit.svg"
                          alt="pencel"
                          class="size-4 object-contain"
                        />
                      </div>
                      <div
                        @click="openDeleteModal('singleItem', item.id)"
                        @keypress="openDeleteModal('singleItem', item.id)"
                      >
                        <img
                          src="@/static/images/price-trash.svg"
                          alt="trash"
                          class="size-4 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="!editable && !sortable">
                  <div v-if="resultList.length > 0">
                    <div
                      class="flex items-center justify-between py-2 text-sm font-medium text-black"
                      v-for="item in resultList"
                      :key="item.id"
                    >
                      <div v-if="item.isUsing" class="w-2/5 truncate">
                        {{ item.name }}
                      </div>
                      <div v-if="item.isUsing" class="text-right text-sm">
                        <span>${{ item.showPrice }}</span>
                      </div>
                    </div>
                  </div>
                  <p v-else class="py-2 text-center">無資料</p>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <div v-if="editable">
          <p
            class="text-dark flex items-center p-2 text-sm font-semibold tracking-wider"
          >
            點擊
            <img
              src="@/static/images/add.svg"
              alt="add"
              class="mx-1 size-4 object-contain"
            />
            新增類別/項目
          </p>
        </div>
        <div v-if="sortable">
          <p class="text-dark p-2 text-sm font-semibold tracking-wider">
            拖曳<i
              class="bi bi-grip-vertical moveable mx-1 w-5 text-meimate-blue-gray"
            />符號變更順序
          </p>
        </div>
      </div>
      <div v-if="!(editable || sortable)" class="mt-4 flex gap-4">
        <button
          @click="sortable = !sortable"
          class="w-full rounded-full bg-meimate-pink px-5 py-3 text-sm font-bold text-white shadow-meimate-button"
        >
          編輯排序
        </button>
        <button
          @click="editable = !editable"
          class="w-full rounded-full bg-meimate-pink px-5 py-3 text-sm font-bold text-white shadow-meimate-button"
        >
          編輯項目
        </button>
      </div>
      <div v-else class="mt-4">
        <div class="flex flex-col gap-2" v-if="editable">
          <button
            @click="editable = !editable"
            class="w-full rounded-full bg-meimate-pink px-5 py-3 text-sm font-bold text-white shadow-meimate-button"
          >
            儲存
          </button>
          <button
            v-if="editable"
            @click="editable = !editable"
            class="w-full rounded-full bg-meimate-yellow px-5 py-3 text-sm font-bold text-white shadow-meimate-button"
          >
            返回
          </button>
        </div>
        <div class="flex flex-col gap-2" v-if="sortable">
          <button
            @click="sortable = !sortable"
            class="w-full rounded-full bg-meimate-pink px-5 py-3 text-sm font-bold text-white shadow-meimate-button"
          >
            儲存
          </button>
          <button
            @click="sortable = !sortable"
            class="w-full rounded-full bg-meimate-yellow px-5 py-3 text-sm font-bold text-white shadow-meimate-button"
          >
            返回
          </button>
        </div>
      </div>

      <!-- 新增/編輯項目 -->
      <C-Modal-Dialog
        v-model="openItemModal"
        @close="openItemModal = false"
        :title="titleItemModal"
      >
        <div class="flex flex-col gap-4">
          <div class="">
            <label class="text-gray-dark text-sm font-bold" for="name"
              >項目名稱 <sup class="text-red-500">*</sup></label
            >
            <input
              v-model="formItem.name"
              class="form-control form-control-sm form-control-solid mt-2 !bg-meimate-white text-stone-600 placeholder:text-stone-900 focus:border-0"
            />
          </div>
          <div class="">
            <label class="text-gray-dark text-sm font-bold" for="lowestPrice"
              >最低價 <sup class="text-red-500">*</sup></label
            >
            <div class="mt-2 grid grid-cols-3 gap-x-2">
              <div class="col-span-2">
                <input
                  v-model="formItem.lowestPrice"
                  class="form-control form-control-sm form-control-solid !bg-meimate-white text-stone-600 placeholder:text-stone-900 focus:border-0"
                />
              </div>
              <div class="flex items-center gap-x-2">
                <input
                  v-model="formItem.up"
                  type="checkbox"
                  id="up"
                  class="rounded border border-gray p-2 accent-meimate-pink"
                />
                <label class="inline-block text-sm" for="up">元起</label>
              </div>
            </div>
          </div>
          <div class="w-full space-y-2">
            <label class="text-gray-dark py-2 text-sm font-bold" for="name"
              >預約時長 <sup class="text-red-500">*</sup></label
            >
            <C-Select
              inputClasses="bg-meimate-white"
              :list="timeCostOptions"
              v-model="formItem.timeCost"
              item-text="label"
              item-value="value"
              :isFull="true"
            ></C-Select>
          </div>
          <div class="flex w-full items-center gap-2">
            <input
              type="checkbox"
              v-model="formItem.isHighestPrice"
              id="isHighestPrice"
              class="w-4 rounded border border-gray p-2 align-middle accent-meimate-pink"
            />
            <label class="text-sm" for="isHighestPrice">輸入最高價</label>
          </div>
          <div v-if="formItem.isHighestPrice">
            <label
              class="text-gray-dark py-2 text-sm font-bold"
              for="highestPrice"
              >最高價</label
            >
            <input
              v-model="formItem.highestPrice"
              id="highestPrice"
              class="form-control form-control-sm form-control-solid mt-2 !bg-meimate-white text-stone-600 placeholder:text-stone-900 focus:border-0"
            />
          </div>
          <div
            v-if="titleItemModal === '編輯項目'"
            class="flex items-center gap-2"
          >
            <input
              type="checkbox"
              v-model="formItem.isUsing"
              id="isUsing"
              class="w-4 rounded border border-gray p-2 align-middle accent-meimate-pink"
            />
            <label class="text-sm" for="isUsing">上架</label>
          </div>
        </div>
        <template #footer>
          <div class="card-footer !flex gap-4 !py-4">
            <button
              class="w-full rounded-3xl border border-meimate-pink bg-white py-3 font-bold text-meimate-pink shadow-meimate-button"
              @click="openItemModal = false"
            >
              取消
            </button>
            <button
              class="w-full rounded-3xl bg-meimate-pink py-3 font-bold text-white shadow-meimate-button"
              @click="submitItemModal"
            >
              確認
            </button>
          </div>
        </template>
      </C-Modal-Dialog>

      <!-- 新增/編輯類別 -->
      <C-Modal-Dialog
        v-model="categoryModal.open"
        width="w-10/12"
        @close="categoryModal.open = false"
        :title="categoryModal.title"
      >
        <div class="w-full">
          <input
            v-model="categoryModal.value"
            class="form-control form-control-sm form-control-solid !bg-meimate-white text-stone-600 placeholder:text-stone-900 focus:border-0"
          />
        </div>
        <template #footer>
          <div class="card-footer !flex gap-4 !py-4">
            <button
              class="w-full rounded-full border border-meimate-pink bg-white py-3 font-bold text-meimate-pink shadow-meimate-button"
              @click="categoryModal.open = false"
            >
              取消
            </button>
            <button
              class="w-full rounded-full bg-meimate-pink py-3 font-bold text-white shadow-meimate-button"
              @click="submitCategoryModal"
            >
              確認
            </button>
          </div>
        </template>
      </C-Modal-Dialog>

      <!-- 刪除 -->
      <C-Modal-Dialog
        v-model="deleteModal.open"
        width="w-10/12"
        @close="deleteModal.open = false"
        title="提醒"
      >
        <div class="text-gray-dark text-center text-lg font-bold">
          確定要刪除嗎?
        </div>
        <template #footer>
          <div class="card-footer item-center flex gap-4 !py-4">
            <button
              class="w-full rounded-3xl border border-meimate-pink bg-white py-3 font-bold text-meimate-pink shadow-meimate-button"
              @click="deleteModal.open = false"
            >
              取消
            </button>
            <button
              class="w-full rounded-3xl bg-meimate-pink py-3 font-bold text-white shadow-meimate-button"
              @click="submitDeleteModal"
            >
              確認
            </button>
          </div>
        </template>
      </C-Modal-Dialog>
      <!-- 成功視窗 -->
      <C-Status-Modal
        :showModal="statusModal.open"
        :content="statusModal.content"
        @close="statusModal.open = false"
        :timeout="2000"
      />
    </section>
  </C-Main-Block>
</template>

<script>
const apiKey = {
  user: {
    getCategory: 'getBookingItemCategory',
    getItem: 'getBookingItem',
    createCategory: 'createBookingItemCategory',
    updateCategory: 'updateBookingItemCategory',
    updateCategorySorting: 'updateBookingItemCategorySorting',
    deleteCategory: 'deleteBookingItemCategory',
    createItem: 'createBookingItem',
    updateItem: 'updateBookingItem',
    updateItemSorting: 'updateBookingItemSorting',
    deleteItem: 'deleteBookingItem',
  },
  noDes: {
    getCategory: 'getNDBookingItemCategory',
    getItem: 'getNDBookingItem',
    createCategory: 'createNDBookingItemCategory',
    updateCategory: 'updateNDBookingItemCategory',
    updateCategorySorting: 'updateNDBookingItemCategorySorting',
    deleteCategory: 'deleteNDBookingItemCategory',
    createItem: 'createNDBookingItem',
    updateItem: 'updateNDBookingItem',
    updateItemSorting: 'updateNDBookingItemSorting',
    deleteItem: 'deleteNDBookingItem',
  },
};

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
      editable: false,
      sortable: false,
      openItemModal: false,
      titleItemModal: '',
      formItem: {
        id: '',
        name: '',
        timeCost: '1',
        up: false,
        lowestPrice: 0,
        isHighestPrice: false,
        highestPrice: 0,
        isUsing: false,
      },
      timeCostOptions: [
        { label: '請選擇', value: '0' },
        { label: '半小時', value: '1' },
        { label: '一小時', value: '2' },
        { label: '一個半小時', value: '3' },
        { label: '兩小時', value: '4' },
        { label: '兩個半小時', value: '5' },
        { label: '三小時', value: '6' },
        { label: '三個半小時', value: '7' },
        { label: '四小時', value: '8' },
        { label: '四個半小時', value: '9' },
        { label: '五小時', value: '10' },
        { label: '五個半小時', value: '11' },
        { label: '六小時', value: '12' },
        { label: '六個半小時', value: '13' },
        { label: '七小時', value: '14' },
        { label: '七個半小時', value: '15' },
        { label: '八小時', value: '16' },
      ],
      categoryModal: {
        open: false,
        title: '',
        name: '',
        id: '',
      },
      deleteModal: {
        open: false,
        id: 0,
        type: '',
      },
      statusModal: {
        open: false,
        content: '',
      },
      desStatus: 'user', // user noDes
      desChangeDisplay: false,
    };
  },
  mounted() {
    const ML_DESIGN = JSON.parse(localStorage.getItem('ML_DESIGN'));
    const auth = ML_DESIGN.userAuthorizeList.find(
      (item) => item.pageName === '可編輯不指定價目表',
    );
    this.desChangeDisplay = auth ? auth.authority : false;
    this.getBookingItemCategory();
  },
  methods: {
    // 取得所有項目清單
    async getBookingItemCategory(seletedTab) {
      const storeId = JSON.parse(localStorage.getItem('ML_DESIGN')).currentMechantId;
      const resp = await this.$api[apiKey[this.desStatus].getCategory](storeId);
      const { data, errors } = resp.data;
      if (errors) return;
      this.BookingItemCategory = data[apiKey[this.desStatus].getCategory];
      if (data[apiKey[this.desStatus].getCategory].length === 0) return;
      this.seletedTab = seletedTab || 'ALL';
      if (this.seletedTab === 'ALL') {
        const cloneCategory = [...this.BookingItemCategory];
        const allItems = cloneCategory.map(({ bookingItem }) => bookingItem).flat();
        this.handleBookingItem(allItems, false);
      } else {
        const { bookingItem } = this.BookingItemCategory.filter(
          (item) => item.id === this.seletedTab,
        )[0];
        this.handleBookingItem(bookingItem, false);
      }
    },
    openCategoryModal(action, item) {
      if (action === 'create') {
        this.categoryModal.title = '新增項目類別';
        this.categoryModal.value = '';
        this.categoryModal.id = '';
        this.categoryModal.open = true;
      } else {
        this.categoryModal.title = '編輯項目類別';
        this.categoryModal.value = item.name;
        this.categoryModal.id = item.id;
        this.categoryModal.open = true;
      }
    },
    submitCategoryModal() {
      if (this.categoryModal.title === '新增項目類別') {
        this.createBookingItemCategory();
      } else {
        this.updateBookingItemCategory();
      }
    },
    // 新增類別
    async createBookingItemCategory() {
      if (this.categoryModal.value === '') this.$swal.showValidationMessage('請輸入名稱');
      const input = {
        name: this.categoryModal.value,
      };
      const resp = await this.$api[apiKey[this.desStatus].createCategory](input);
      const { data, errors } = resp.data;
      if (errors) return '';
      if (data[apiKey[this.desStatus].createCategory]) {
        await this.getBookingItemCategory();
      }
      this.categoryModal.open = false;
      this.statusModal.content = '新增成功';
      this.statusModal.open = true;
      return '';
    },
    async updateBookingItemCategory() {
      if (this.categoryModal.id !== this.seletedTab) return;
      const submit = {
        input: {
          bookingItemCategoryId: this.categoryModal.id,
          name: this.categoryModal.value,
        },
      };
      const resp = await this.$api[apiKey[this.desStatus].updateCategory](submit);
      const { data, errors } = resp.data;
      if (errors) return;
      if (data[apiKey[this.desStatus].updateCategory]) {
        await this.getBookingItemCategory(this.seletedTab);
      }
      this.categoryModal.open = false;
      this.statusModal.content = '編輯成功';
      this.statusModal.open = true;
    },
    openDeleteModal(type, id) {
      if (type !== 'multiItems') {
        this.deleteModal.id = id;
      }
      this.deleteModal.type = type;
      this.deleteModal.open = true;
    },
    submitDeleteModal() {
      if (this.deleteModal.type === 'category') {
        this.deleteBookingItemCategory();
      } else if (this.deleteModal.type === 'singleItem') {
        this.deleteSingleBookingItem();
      } else {
        this.deleteBookingItem();
      }
    },
    async deleteBookingItemCategory() {
      const input = {
        bookingItemCategoryId: this.deleteModal.id,
      };
      const resp = await this.$api[apiKey[this.desStatus].deleteCategory](input);
      const { data, errors } = resp.data;
      if (errors) return;

      if (data[apiKey[this.desStatus].deleteCategory]) {
        await this.getBookingItemCategory();
      }
      this.deleteModal.open = false;
      this.statusModal.content = '刪除成功';
      this.statusModal.open = true;
    },
    openItemCreateUpdateModal(action, item) {
      if (action === 'create') {
        this.titleItemModal = '新增項目';
        this.formItem = {
          name: '',
          timeCost: '1',
          up: false,
          lowestPrice: 0,
          isHighestPrice: false,
          highestPrice: 0,
        };
      } else {
        this.titleItemModal = '編輯項目';
        const showHighestPrice = item.highestPrice === null
          || item.highestPrice === ''
          || item.highestPrice === item.lowestPrice
          ? ''
          : true;
        const up = item.highestPrice === null || item.highestPrice === '' ? true : '';
        this.formItem = {
          id: item.id,
          name: item.name,
          timeCost: String(item.timeCost),
          up,
          lowestPrice: item.lowestPrice,
          isHighestPrice: showHighestPrice,
          highestPrice: item.highestPrice ? item.highestPrice : '',
          isUsing: item.isUsing,
        };
      }
      this.openItemModal = true;
    },
    submitItemModal() {
      if (this.titleItemModal === '新增項目') {
        this.createBookingItem();
      } else {
        this.updateBookingItem();
      }
    },
    // 新增預約項目
    async createBookingItem() {
      // 新增預約項目
      if (!this.formItem.isHighestPrice && this.formItem.highestPrice !== '') this.formItem.highestPrice = '';
      this.examInput(
        this.formItem.name,
        this.formItem.lowestPrice,
        this.formItem.highestPrice,
      );
      let form = {};
      if (this.formItem.highestPrice === '' && !this.formItem.up) {
        form = {
          name: this.formItem.name,
          lowestPrice: Number(this.formItem.lowestPrice),
          highestPrice: Number(this.formItem.lowestPrice),
          timeCost: this.formItem.timeCost,
        };
      } else {
        form = {
          name: this.formItem.name,
          lowestPrice: Number(this.formItem.lowestPrice),
          highestPrice: this.formItem.highestPrice,
          timeCost: this.formItem.timeCost,
        };
      }

      if (form) {
        const highestPrice = form.highestPrice === '' ? null : +form.highestPrice;
        const submit = {
          input: {
            bookingItemCategoryId: this.seletedTab,
            name: form.name,
            lowestPrice: form.lowestPrice,
            highestPrice,
            timeCost: Number(form.timeCost),
          },
        };
        const resp = await this.$api[apiKey[this.desStatus].createItem](submit);
        const { data, errors } = resp.data;
        if (errors) return '';
        if (data[apiKey[this.desStatus].createItem]) {
          await this.getBookingItemCategory(this.seletedTab);
        }
        this.openItemModal = false;
        this.statusModal.content = '新增成功';
        this.statusModal.open = true;
      }
      return '';
    },

    // 修改單一預約項目
    async updateBookingItem() {
      if (!this.formItem.isHighestPrice && this.formItem.highestPrice !== '') this.formItem.highestPrice = '';
      this.examInput(
        this.formItem.name,
        this.formItem.lowestPrice,
        this.formItem.highestPrice,
      );
      let form = {};
      if (this.formItem.highestPrice === '' && !this.formItem.up) {
        form = {
          name: this.formItem.name,
          lowestPrice: Number(this.formItem.lowestPrice),
          highestPrice: Number(this.formItem.lowestPrice),
          isUsing: this.formItem.isUsing,
          timeCost: this.formItem.timeCost,
        };
      } else {
        form = {
          name: this.formItem.name,
          lowestPrice: Number(this.formItem.lowestPrice),
          highestPrice: this.formItem.highestPrice,
          isUsing: this.formItem.isUsing,
          timeCost: this.formItem.timeCost,
        };
      }
      if (form) {
        const highestPrice = form.highestPrice === '' ? null : +form.highestPrice;
        const submit = {
          input: {
            bookingItemId: this.formItem.id,
            name: form.name,
            lowestPrice: form.lowestPrice,
            highestPrice,
            bookingItemCategoryId: this.seletedTab,
            isUsing: form.isUsing,
            timeCost: Number(form.timeCost),
          },
        };
        const resp = await this.$api[apiKey[this.desStatus].updateItem](submit);
        const { data, errors } = resp.data;
        if (errors) return '';
        if (data[apiKey[this.desStatus].updateItem]) {
          await this.getBookingItemCategory(this.seletedTab);
        }
        this.openItemModal = false;
        this.statusModal.content = '編輯成功';
        this.statusModal.open = true;
      }

      return '';
    },
    // 刪除單一項目
    async deleteSingleBookingItem() {
      // 打刪除API
      const input = {
        bookingItemId: this.deleteModal.id,
      };
      const resp = await this.$api[apiKey[this.desStatus].deleteItem](input);
      const { data, errors } = resp.data;
      if (errors) return;

      if (data[apiKey[this.desStatus].deleteItem]) {
        await this.getBookingItemCategory(this.seletedTab);
      }
      this.deleteModal.open = false;
      this.statusModal.content = '刪除成功';
      this.statusModal.open = true;
    },
    // 刪除多個項目
    async deleteBookingItem() {
      const checkItem = this.resultList.filter((itm) => itm.checked === true);
      if (checkItem.length === 0) {
        this.$swal.fire({
          icon: 'warning',
          html: '<p class="py-3 text-lg">請至少勾選一個項目</p>',
          showConfirmButton: false,
          showCloseButton: true,
          timer: 1500,
          timerProgressBar: true,
        });
        return;
      }
      const deleteBookingItemID = this.resultList
        .filter((el) => el.checked === true)
        .map((el) => el.id);
      // 打刪除API
      const input = {
        bookingItemId: deleteBookingItemID,
      };
      const resp = await this.$api[apiKey[this.desStatus].deleteItem](input);
      const { data, errors } = resp.data;
      if (errors) return;

      if (data[apiKey[this.desStatus].deleteItem]) {
        await this.getBookingItemCategory(this.seletedTab);
      }
      this.deleteModal = false;
      this.statusModal.content = '刪除成功';
      this.statusModal.open = true;
      this.isSelectAll = false;
    },
    // 上架/下架項目
    async changeBookingItemUsing(bookingItem, using) {
      const checkItem = bookingItem.filter((itm) => itm.checked === true);
      if (checkItem.length === 0) {
        this.$swal.fire({
          icon: 'warning',
          html: '<p class="py-3 text-lg">請至少勾選一個項目</p>',
          showConfirmButton: false,
          showCloseButton: true,
          timer: 1500,
          timerProgressBar: true,
        });
        return;
      }
      this.$swal
        .fire({
          icon: 'warning',
          html: `<p class="py-3 text-lg">確定要${
            using ? '上架' : '下架'
          }勾選的項目嗎？</p>`,
          confirmButtonText: '確認',
          showConfirmButton: true,
          showCloseButton: true,
          customClass: {
            confirmButton:
              '!w-[144px] !rounded !bg-second !px-sm !py-2 !text-sm !text-white',
          },
        })
        .then(async (res) => {
          if (res.isConfirmed) {
            const input = checkItem.map((itm) => ({
              bookingItemId: itm.id,
              name: itm.name,
              lowestPrice: itm.lowestPrice,
              highestPrice: itm.highestPrice,
              bookingItemCategoryId: itm.bookingItemCategoryId,
              isUsing: using,
            }));

            const submit = { input };
            const resp = await this.$api[apiKey[this.desStatus].updateItem](submit);
            const { data, errors } = resp.data;
            if (errors) return '';
            if (data[apiKey[this.desStatus].updateItem]) {
              await this.getBookingItemCategory(this.seletedTab);
              this.statusModal.content = '編輯成功';
              this.statusModal.open = true;
              this.isSelectAll = false;
            }
          }
          return '';
        });
    },
    // 移動類別
    async bookingItemCategoryMove() {
      const newBookingItemCategory = this.BookingItemCategory.map((i) => i.id);
      const submit = {
        input: newBookingItemCategory,
      };
      const resp = await this.$api[apiKey[this.desStatus].updateCategorySorting](submit);
      const { errors } = resp.data;
      if (errors) return '';
      await this.getBookingItemCategory(this.seletedTab);
      return '';
    },
    // 移動項目
    async bookingItemMove() {
      const newBookingItemList = this.resultList.map((i) => i.id);
      const submit = {
        input: newBookingItemList,
      };
      const resp = await this.$api[apiKey[this.desStatus].updateBookingItemSorting](submit);
      const { errors } = resp.data;
      if (errors) return '';
      await this.getBookingItemCategory(this.seletedTab);
      return '';
    },

    // 點擊類別頁籤
    handleCategory(id) {
      this.isSelectAll = false;
      this.seletedTab = id;
      const cloneCategory = [...this.BookingItemCategory];
      if (id === 'ALL') {
        const allItems = cloneCategory.map(({ bookingItem }) => bookingItem).flat();
        this.handleBookingItem(allItems, false);
      } else {
        const { bookingItem } = this.BookingItemCategory.filter(
          (Category) => Category.id === id,
        )[0];
        this.handleBookingItem(bookingItem, false);
      }
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
    isNumeric(val) {
      return /^-?\d+$/.test(val);
    },
    examInput(name, lowestPrice, highestPrice) {
      if (
        name === ''
        || name === null
        || lowestPrice === ''
        || lowestPrice === null
      ) {
        this.$swal.showValidationMessage('項目名稱、最低價為必填');
      } else if (!this.isNumeric(lowestPrice)) {
        this.$swal.showValidationMessage('請輸入正確的最低價');
      } else if (highestPrice !== '' && highestPrice !== null) {
        if (!this.isNumeric(highestPrice)) this.$swal.showValidationMessage('請輸入正確的最高價');
        else if (+highestPrice < +lowestPrice) this.$swal.showValidationMessage('最高價格不能小於最低價格');
      }
    },
    async desChange() {
      this.desStatus = this.desStatus === 'user' ? 'noDes' : 'user';
      this.editable = false;
      this.sortable = false;
      this.seletedTab = '';
      await this.getBookingItemCategory();
      this.$swal.fire({
        icon: 'info',
        title: this.desStatus === 'noDes' ? '目前為不指定價目表' : '目前為個人價目表',
        // showConfirmButton: false,
        timerProgressBar: true,
      });
    },
  },
  computed: {},
  watch: {
    isSelectAll() {
      this.handleBookingItem(this.resultList, this.isSelectAll);
    },
    editable() {
      if (this.editable && this.seletedTab === 'ALL') {
        this.seletedTab = this.BookingItemCategory[0].id;
        this.handleCategory(this.seletedTab);
      }
    },
    sortable() {
      if (this.sortable && this.seletedTab === 'ALL') {
        this.seletedTab = this.BookingItemCategory[0].id;
        this.handleCategory(this.seletedTab);
      }
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
