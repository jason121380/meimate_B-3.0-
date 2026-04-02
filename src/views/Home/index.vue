<template>
  <main class="mx-auto w-full max-w-screen-md font-sans text-gray-800">
    <div v-show="currentMainTab === 'home'">
    <!-- Header Section -->
    <header class="flex h-[68px] items-center px-6 pt-2">
      <h1 class="text-xl font-bold tracking-wide text-gmb-orange-500">首頁</h1>
    </header>

    <!-- Profile Section -->
    <section class="flex items-center justify-between px-6 py-4 pt-2">
      <div class="flex items-center gap-4">
        <!-- Avatar -->
        <div
          class="flex size-[64px] shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200"
          role="button"
          tabindex="0"
          @click="toggleAvatar()"
          @keypress.enter="toggleAvatar()"
        >
          <img v-if="userAvatarImgUrl" :src="userAvatarImgUrl" class="size-full object-cover" alt="avatar" />
          <span v-else-if="formatName || (userInfo && userInfo.user && userInfo.user.name)" class="text-[22px] font-medium text-gray-500">
            {{ (formatName || userInfo.user.name).charAt(0).toUpperCase() }}
          </span>
          <i v-else class="bi bi-person text-[32px] text-gray-400"></i>
        </div>

        <!-- Info -->
        <div class="ml-2 flex flex-col items-start justify-center gap-1">
          <span class="text-2xl font-bold leading-none tracking-tight text-gray-950">
            {{ formatName || (userInfo && userInfo.user ? userInfo.user.name : '') || '設計師' }}
          </span>
          <div v-show="merchantName !== '-'" class="mt-1 rounded-full border border-gmb-orange-500 px-3 py-1 text-[12px] font-semibold tracking-wide text-gmb-orange-500">
            {{ merchantName }}
          </div>
        </div>
      </div>

    </section>

    <!-- Quick Actions / CTA Section -->
    <section class="px-6 py-4">
      <button
        @click="doRoute('ScheduleBreak')"
        class="flex w-full items-center justify-between rounded-full bg-gmb-orange-500 px-5 py-3 text-[15px] font-semibold text-white transition-all hover:bg-gmb-orange-600"
      >
        <div class="flex items-center gap-3">
          <div class="flex size-10 items-center justify-center rounded-full bg-white/20">
            <i class="bi bi-calendar-check text-xl"></i>
          </div>
          <span class="text-lg font-bold">我的預約</span>
        </div>
        <i class="bi bi-chevron-right text-white/70"></i>
      </button>
    </section>

    <!-- Announcement (Small Ticker) -->
    <div v-if="MerchantNewsTicker" class="mx-6 my-2 flex items-center gap-3 rounded-[12px] bg-gray-50 px-4 py-3">
      <i class="bi bi-megaphone text-gray-400"></i>
      <div class="truncate text-[13px] font-medium text-gray-500">{{ MerchantNewsTicker }}</div>
    </div>

    <!-- Info Grid Section Removed in favor of List -->

    <!-- Navigation List Section -->
    <section class="mt-2">
        <!-- Line Binding -->
        <div
          @click="getBindLineLink"
          @keypress.enter="getBindLineLink"
          role="button"
          tabindex="0"
          class="flex cursor-pointer items-center justify-between border-b border-gray-100 px-6 py-[18px] transition-colors active:bg-gray-50"
        >
          <div class="flex items-center gap-4">
            <i class="bi bi-link-45deg text-[22px] text-[#00B900]"></i>
            <span class="text-[15px] font-medium text-gray-800">Line 綁定推播通知</span>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="isBindingLine" class="rounded-full border border-green-200 bg-green-50/50 px-3 py-1 text-xs font-semibold tracking-wide text-[#00B900]">已綁定</span>
            <i v-else class="bi bi-chevron-right text-[13px] text-gray-300"></i>
          </div>
        </div>

        <!-- Price List -->
        <div
          @click="doRoute('PriceList')"
          @keypress.enter="doRoute('PriceList')"
          role="button"
          tabindex="0"
          class="flex cursor-pointer items-center justify-between border-b border-gray-100 px-6 py-[18px] transition-colors active:bg-gray-50"
        >
          <div class="flex items-center gap-4">
            <i class="bi bi-file-earmark-text text-[18px] text-[#9ca3af]"></i>
            <span class="text-[15px] font-medium text-gray-800">價目表設定</span>
          </div>
          <i class="bi bi-chevron-right text-[13px] text-gray-300"></i>
        </div>

        <!-- Customer -->
        <div
          @click="doRoute('Customer')"
          @keypress.enter="doRoute('Customer')"
          role="button"
          tabindex="0"
          class="flex cursor-pointer items-center justify-between border-b border-gray-100 px-6 py-[18px] transition-colors active:bg-gray-50"
        >
          <div class="flex items-center gap-4">
            <i class="bi bi-people text-[18px] text-[#9ca3af]"></i>
            <span class="text-[15px] font-medium text-gray-800">客資查詢</span>
          </div>
          <i class="bi bi-chevron-right text-[13px] text-gray-300"></i>
        </div>

        <!-- Switch Store -->
        <div
          v-if="merchentList && merchentList.length > 1"
          @click="isStoreChange = true"
          @keypress.enter="isStoreChange = true"
          role="button"
          tabindex="0"
          class="flex cursor-pointer items-center justify-between px-6 py-[18px] transition-colors active:bg-gray-50"
        >
          <div class="flex items-center gap-4">
            <i class="bi bi-shop text-[18px] text-[#9ca3af]"></i>
            <span class="text-[15px] font-medium text-gray-800">切換店家</span>
          </div>
          <i class="bi bi-chevron-right text-[13px] text-gray-300"></i>
        </div>
    </section>

    <!-- Version string -->
    <div class="mt-8 pb-4 text-center text-xs font-semibold tracking-wider text-gray-300">
      v3.0 powered by BOS
    </div>

    <!-- Close currentMainTab === 'home' -->
    </div>

    <!-- Tab: Edit Profile (Replicating Left Image) -->
    <div v-show="currentMainTab === 'editProfile'" class="flex min-h-screen flex-col bg-[#FAFAFA] pb-24">
      <header class="relative mt-2 flex h-16 items-center gap-4 px-6">
        <div class="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm transition-colors hover:bg-gray-50 active:scale-95" @click="currentMainTab = 'profile'" @keypress.enter="currentMainTab = 'profile'" role="button" tabindex="0">
          <i class="bi bi-chevron-left text-[14px] text-gray-500"></i>
        </div>
        <h1 class="line-clamp-1 text-xl font-bold text-gmb-orange-500">修改個人資料</h1>
      </header>

      <div class="mt-4 flex flex-col gap-6 px-6">
        <div class="flex flex-col gap-6 rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm">
          <!-- 姓名 -->
          <div>
            <label class="mb-2 block text-[13px] font-bold text-gray-800">姓名 <span class="ml-0.5 text-gmb-orange-500">*</span></label>
            <div class="flex gap-3">
              <input type="text" v-model="userifo.lastName" class="w-2/5 rounded-xl border border-transparent bg-gray-50 px-4 py-3 text-[15px] text-gray-900 transition-all focus:border-gmb-orange-500 focus:bg-white focus:outline-none" placeholder="姓" />
              <input type="text" v-model="userifo.firstName" class="w-3/5 rounded-xl border border-transparent bg-gray-50 px-4 py-3 text-[15px] text-gray-900 transition-all focus:border-gmb-orange-500 focus:bg-white focus:outline-none" placeholder="名" />
            </div>
          </div>
          <!-- 電話 -->
          <div>
            <label class="mb-2 block text-[13px] font-bold text-gray-800">電話</label>
            <div class="w-full rounded-xl bg-gray-50 px-4 py-3 text-[15px] text-gray-500">
              {{ merchantPhone }}
            </div>
          </div>
          <!-- 暱稱 -->
          <div>
            <label class="mb-2 block text-[13px] font-bold text-gray-800">暱稱</label>
            <input type="text" v-model="userifo.nickName" class="w-full rounded-xl border border-transparent bg-gray-50 px-4 py-3 text-[15px] text-gray-900 transition-all focus:border-gmb-orange-500 focus:bg-white focus:outline-none" />
          </div>
          <!-- 性別 -->
          <div>
            <label class="mb-2 block text-[13px] font-bold text-gray-800">性別 <span class="ml-0.5 text-gmb-orange-500">*</span></label>
            <div class="mt-2 flex items-center gap-8 px-1">
              <label class="flex cursor-pointer items-center gap-2">
                <input type="radio" value="MALE" v-model="userifo.gender" class="size-[18px] border-gray-300 text-gray-800 focus:ring-gmb-orange-500">
                <span class="text-[15px] font-medium text-gray-800">男</span>
              </label>
              <label class="flex cursor-pointer items-center gap-2">
                <input type="radio" value="FEMALE" v-model="userifo.gender" class="size-[18px] border-gray-300 text-gray-800 focus:ring-gmb-orange-500">
                <span class="text-[15px] font-medium text-gray-800">女</span>
              </label>
            </div>
          </div>
          <!-- 生日 -->
          <div>
            <label class="mb-2 block text-[13px] font-bold text-gray-800">生日 <span class="ml-0.5 text-gmb-orange-500">*</span></label>
            <div class="h-[46px] w-full *:h-full">
              <VCCalendarSelect v-model="userifo.birthday" :placeholder="'選擇生日'" class="rounded-xl border border-transparent bg-gray-50 text-[15px] text-gray-900 focus:border-gmb-orange-500"></VCCalendarSelect>
            </div>
          </div>
        </div>

        <!-- 儲存按鈕 -->
        <button @click="saveAllProfileAndGoBack()" class="w-full rounded-full bg-gmb-orange-500 py-[14px] text-[15px] font-bold text-white shadow-md transition-all hover:bg-gmb-orange-600 active:scale-[0.98]">
          確定修改
        </button>
      </div>
    </div>
    <!-- Tab: Profile Center (Replicating Member UI) -->
    <div v-show="currentMainTab === 'profile'">
      <!-- Header -->
      <header class="flex h-[68px] items-center px-6 pt-2">
        <h1 class="line-clamp-1 text-xl font-bold text-gmb-orange-500">個人中心</h1>
      </header>

      <!-- Info Card -->
      <section class="mt-4 px-6">
        <div class="overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-sm">
          <ul class="flex flex-col text-[15px]">
            <li class="flex items-center border-b border-gray-50 px-5 py-4">
              <span class="w-[80px] shrink-0 font-medium text-gray-400">姓名</span>
              <span class="font-bold text-gray-900">{{ formatName || (userInfo && userInfo.user && userInfo.user.name) || '-' }}</span>
            </li>
            <li class="flex items-center border-b border-gray-50 px-5 py-4">
              <span class="w-[80px] shrink-0 font-medium text-gray-400">電話</span>
              <span class="font-bold text-gray-900">{{ merchantPhone }}</span>
            </li>
            <li class="flex items-center border-b border-gray-50 px-5 py-4">
              <span class="w-[80px] shrink-0 font-medium text-gray-400">暱稱</span>
              <span class="font-bold text-gray-900">{{ userifo.nickName || '-' }}</span>
            </li>
            <li class="flex items-center border-b border-gray-50 px-5 py-4">
              <span class="w-[80px] shrink-0 font-medium text-gray-400">性別</span>
              <span class="font-bold text-gray-900">{{ userifo.gender === "FEMALE" ? "女" : "男" }}</span>
            </li>
            <li class="flex items-center px-5 py-4">
              <span class="w-[80px] shrink-0 font-medium text-gray-400">生日</span>
              <span class="font-bold text-gray-900">{{ userifo.birthday ? $dayjs(userifo.birthday).format('YYYY/MM/DD') : '-' }}</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- Actions -->
      <section class="mt-8 flex flex-col gap-3 px-6 pb-12">
        <button @click="currentMainTab = 'editProfile'" class="w-full rounded-full bg-gmb-orange-500 py-3 text-[15px] font-bold text-white shadow-sm transition-all hover:bg-gmb-orange-600 hover:shadow">
          修改個人資料
        </button>
        <button @click="isPasswordEdit = true" class="hover:bg-gmb-orange-50 w-full rounded-full border border-gmb-orange-500 bg-white py-3 text-[15px] font-bold text-gmb-orange-500 transition-all">
          修改密碼
        </button>
        <button @click="doLogout" class="mt-2 w-full py-3 text-[15px] font-bold text-gray-400 transition-colors hover:text-gray-500">
          登出
        </button>
      </section>
    </div>

    <!-- Original Modals (Kept for functionality) -->
    <!-- Old '修改個人資料' form modal was removed in favor of full screen view -->

    <!-- 修改密碼 -->
    <C-Modal-Dialog
      v-model="isPasswordEdit"
      @close="isPasswordEdit = false"
      :title="'修改密碼'"
    >
      <ul>
        <li class="my-4">
          <ValidationProvider
            ref="newPassword"
            rules="required"
            v-slot="{ errors }"
          >
            <label for="newPassword" class="text-md font-bold text-black"
              >新密碼 :</label
            >
            <input
              id="newPassword"
              type="password"
              v-model="userifo.newPassword"
              :errors="errors"
              class="form-control form-control-sm form-control-solid mt-4 !bg-meimate-white"
              :class="{ 'border-danger !border': errors[0] }"
            />
          </ValidationProvider>
        </li>
        <li class="my-4">
          <ValidationProvider
            ref="newPasswordCheck"
            rules="required"
            v-slot="{ errors }"
          >
            <label for="newPasswordCheck" class="text-md font-bold text-black"
              >確認密碼 :</label
            >
            <input
              id="newPasswordCheck"
              type="password"
              v-model="userifo.newPasswordCheck"
              :errors="errors"
              class="form-control form-control-sm form-control-solid mt-4 !bg-meimate-white"
              :class="{ 'border-danger !border': errors[0] }"
            />
          </ValidationProvider>
        </li>
      </ul>
      <template #footer>
        <div class="card-footer flex w-full justify-end !py-4">
          <button
            type="submit"
            class="rounded-full bg-meimate-pink px-10 py-3 font-bold text-white shadow-meimate-button"
            @click="changePasswordForCellphone()"
          >
            確認
          </button>
        </div>
      </template>
    </C-Modal-Dialog>

    <!-- 切換店家 -->
    <C-Modal-Dialog
      v-model="isStoreChange"
      @close="isStoreChange = false"
      :title="'切換店家'"
      position="bottom"
      animationCss="animate__animated animate__fadeInUp animate__faster"
    >
      <template #rightButton>
        <div class="flex items-center gap-2">
          <span class="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-400">{{ merchentList.length }} 間</span>
          <button
            @click.prevent="isStoreChange = false"
            class="flex size-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
          >
            <img
              src="@/static/images/close-icon.svg"
              alt="close"
              class="size-4 object-contain opacity-50"
            />
          </button>
        </div>
      </template>
      <div class="flex flex-col gap-1.5">
        <button
          v-for="store in merchentList"
          :key="store.id"
          @click="switchStore(store.id)"
          class="group flex w-full items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-200 active:scale-[0.98]"
          :class="selected === store.id
            ? 'border-gmb-orange-500 bg-gmb-orange-50 shadow-sm'
            : 'border-transparent bg-gray-50 hover:bg-gray-100'"
        >
          <div
            class="flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
            :class="selected === store.id
              ? 'bg-gmb-orange-500 text-white'
              : 'bg-gray-200 text-gray-500'"
          >
            {{ store.name ? store.name.charAt(0) : '?' }}
          </div>
          <span class="flex-1 truncate text-[15px] font-semibold"
            :class="selected === store.id ? 'text-gmb-orange-500' : 'text-gray-700'">
            {{ store.name }}
          </span>
          <i
            v-if="selected === store.id"
            class="bi bi-check-circle-fill text-lg text-gmb-orange-500"
          ></i>
          <i
            v-else
            class="bi bi-circle text-lg text-gray-200 group-hover:text-gray-300"
          ></i>
        </button>
      </div>
    </C-Modal-Dialog>

    <!--更換大頭貼 -->
    <C-Modal-Dialog v-model="isAvatar" @close="toggleAvatar" title="修改大頭照">
      <form @submit.prevent="handleSubmitAvatar" class="space-y-4">
        <div v-if="filechange" class="relative max-h-[50vh] max-w-[50vh]">
          <img :src="imageBlob" ref="image" alt="" />
        </div>
        <div class="flex w-full items-center justify-center">
          <label
            for="uploading"
            @click="doRoute"
            @keypress="doRoute"
            class="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-400"
          >
            <div class="flex items-center justify-center gap-2 py-4">
              <img
                src="@/static/images/upload.svg"
                alt="upload"
                class="size-6 object-contain"
              />
              <p class="text-sm font-semibold text-zinc-400">上傳大頭照</p>
            </div>
            <input
              type="file"
              id="uploading"
              @change="uploadFile"
              class="hidden"
            />
          </label>
        </div>
        <C-Checkbox-Full
          label="上傳至所有店家"
          v-model="isGlobal"
          class="!justify-start font-bold"
        ></C-Checkbox-Full>
        <div class="flex w-full items-center justify-between gap-2">
          <button
            @click="toggleAvatar"
            class="w-full rounded-3xl border border-meimate-pink bg-white py-3 text-center text-meimate-pink shadow-meimate-button"
          >
            關閉
          </button>
          <button
            type="submit"
            class="w-full whitespace-nowrap rounded-3xl bg-meimate-pink py-3 font-bold text-white shadow-meimate-button"
            :disabled="!imageBlob"
          >
            確認上傳
          </button>
        </div>
      </form>
    </C-Modal-Dialog>

    <!-- 登出 -->
    <C-Logout-Modal
      :showModal="isLogout"
      @close="isLogout = false"
      @confirm="logout"
    />

    <!-- 登出成功 -->
    <C-Status-Modal
      :showModal="showStatusModal"
      :content="statusContent"
      @close="showStatusModal = !showStatusModal"
      :timeout="2000"
    />
  </main>
</template>

<script>
import {
  mapActions, mapState, mapGetters, mapMutations,
} from 'vuex';
import Cropper from 'cropperjs';
import store from '@/store/index';
import { isJSON } from '@/utils/index';
import VCCalendarSelect from '@/components/general/VC-CalendarSelect.vue';
import 'cropperjs/dist/cropper.css';

export default {
  components: { VCCalendarSelect },
  name: 'home-index',
  metaInfo: {
    title: 'Meimate 設計師',
  },
  data() {
    return {
      currentMainTab: 'home',
      isAvatar: false,
      isUserInfo: false,
      isNameEdit: false,
      isNickNameEdit: false,
      isGenderEdit: false,
      isBirthEdit: false,
      isPasswordEdit: false,
      isStoreChange: false,
      isLogout: false,
      dropdownButton: false,
      showStatusModal: false,
      statusContent: '',
      displayStatus: 'success',
      userifo: {
        displayLastName: '',
        displayFirstName: '',
        lastName: '',
        firstName: '',
        nickName: '',
        gender: '',
        birthday: new Date(0),
        newPassword: '',
        newPasswordCheck: '',
      },
      myCropper: null,
      afterImg: '',
      afterImgFile: null,
      selected: '',
      imageBlob: '',
      filechange: false,
      userAvatarImgUrl: '',
      isGlobal: false,
      merchentList: [],
      MerchantNewsTicker: '',
      isBindingLine: false,
      reviewResult: [],
      orderResult: [],
      servicesList: [
        {
          itemName: '預約總覽',
          routeName: 'ScheduleBreak',
          iconSrc: require('@/static/images/calendar-days-regular.svg'),
        },
        {
          itemName: '報表',
          routeName: 'Report',
          iconSrc: require('@/static/images/chart-mixed-solid.svg'),
        },
        {
          itemName: '客資查詢',
          routeName: 'Customer',
          iconSrc: require('@/static/images/users-light.svg'),
        },
        {
          itemName: '打卡',
          routeName: 'Punch',
          iconSrc: require('@/static/images/clock-regular.svg'),
        },
        {
          itemName: '價目表',
          routeName: 'PriceList',
          iconSrc: require('@/static/images/file-invoice-dollar-regular.svg'),
        },
        {
          itemName: '排班表',
          routeName: 'EmployeeSchedule',
          iconSrc: require('@/static/images/calendar-home.svg'),
        },
      ],
      extraLink: [],
      unCheckedOrder: 0,
    };
  },
  computed: {
    ...mapState('userInfo', [
      'userInfo',
      'currentMechantId',
      'userAuthorizeList',
    ]),
    ...mapGetters('userInfo', ['GETTER_MECHANTNAME']),
    isAuthority() {
      return (name) => this.userAuthorizeList.find((item) => {
        if (name === '報表') {
          const reportList = [
            '設計師日報表',
            '訂單紀錄',
            '抽成報表',
            '互助日報表',
            '設計師業績分析表',
            '薪資條',
            '店販抽成明細',
            '排班表',
          ];
          for (let i = 0; i < reportList.length; i++) {
            if (item.pageName === reportList[i] && item.authority) {
              return true;
            }
          }
        }
        return item.pageName === name && item.authority;
      });
    },
    isReviewResult() {
      return this.reviewResult.length;
    },
    isOrderResult() {
      return this.orderResult.length;
    },
    merchantOpen() {
      return this.merchentList.filter(
        (merchent) => merchent.id === this.selected,
      )[0]?.openingHours;
    },
    merchantClose() {
      return this.merchentList.filter(
        (merchent) => merchent.id === this.selected,
      )[0]?.closingHours;
    },
    merchantPayload() {
      return {
        open: this.merchantOpen,
        close: this.merchantClose,
      };
    },
    formatName() {
      const name = `${this.userifo.displayLastName} ${this.userifo.displayFirstName}`.trim(); return name || '';
    },
    merchantPhone() {
      const merchants = this.userInfo && this.userInfo.user && this.userInfo.user.merchants;
      const merchantObj = merchants ? merchants.find((item) => item.id === this.currentMechantId) : null;
      if (merchantObj && (merchantObj.phone || merchantObj.cellphone || merchantObj.tel)) {
        return merchantObj.phone || merchantObj.cellphone || merchantObj.tel;
      }
      const user = this.userInfo && this.userInfo.user;
      return user ? (user.cellphone || user.phone || user.account || '-') : '-';
    },
    merchantName() {
      const merchants = this.userInfo && this.userInfo.user && this.userInfo.user.merchants;
      const merchantObj = merchants ? merchants.find((item) => item.id === this.currentMechantId) : null;
      return merchantObj && merchantObj.name ? merchantObj.name : '-';
    },
    settingAuth() {
      return (page) => {
        const findAuth = this.userAuthorizeList.find(({ pageName }) => pageName === page);
        return findAuth ? findAuth.authority : false;
      };
    },
  },
  mounted() {
    this.init();
    this.getExtraLink();
    this.handleGeUnCheckedReservationCount();
  },
  methods: {
    ...mapMutations(['setOPandED']),
    ...mapActions('userInfo', [
      'SET_USER_PROFILE',
      'SET_USER_CURRENT_MERCHANTID',
      'SET_USER_AUTHORIZELIST',
    ]),
    async init() {
      const [firstUserMerchant] = this.userInfo.user.merchants;
      this.selected = this.currentMechantId || firstUserMerchant.id || '';
      this.getMechants();
      this.getMe();
      this.getMerchantAuthorities();
      this.getMerchantNewsTicker();
    },
    async bindingLine() {
      let data = '';
      let errors = '';
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.has('code') ? urlParams.get('code') : null;
      if (code !== null && !this.isBindingLine) {
        const resp = await this.$api.userBindWithLine({ code });
        data = resp.data;
        errors = resp.errors;
        if (errors) return;
        if (data.data.userBindWithLine) {
          await this.getMe();
          this.$swal
            .fire({
              icon: 'success',
              html: '<p>Line 帳號綁定成功<br>畫面將重新載入</p>',
              showConfirmButton: false,
              showCancelButton: false,
              showClass: {
                popup: 'animate__animated animate__fadeInDown',
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp animate__faster',
              },
              customClass: {
                container: '!z-[99999]',
              },
              timer: 3000,
              timerProgressBar: true,
            })
            .then(() => {
              window.location.href = new URL(process.env.BASE_URL || '/', window.location.href);
            });
        }
      }
    },
    async saveAllProfileAndGoBack() {
      try {
        // Update name
        const submitLastName = { lastName: this.userifo.lastName };
        const submitFirstName = { firstName: this.userifo.firstName };
        await Promise.all([
          this.$api.userUpdateLastName(submitLastName),
          this.$api.userUpdateFirstName(submitFirstName),
        ]);
        this.userifo.displayLastName = this.userifo.lastName;
        this.userifo.displayFirstName = this.userifo.firstName;
        const dt = JSON.parse(localStorage.getItem('ML_DESIGN'));
        dt.user.name = this.userifo.lastName + this.userifo.firstName;
        localStorage.setItem('ML_DESIGN', JSON.stringify(dt));
        const userInfo = localStorage.getItem('ML_DESIGN');
        store.dispatch('userInfo/SET_USER_PROFILE', JSON.parse(userInfo));

        // Update nickname
        const submitNickName = { nickName: this.userifo.nickName };
        await this.$api.userUpdateNickName(submitNickName);

        // Update gender
        const submitGender = { gender: this.userifo.gender };
        await this.$api.userUpdateGender(submitGender);

        // Update birthday
        const submitBirthday = { birthday: this.$dayjs(this.userifo.birthday).valueOf() };
        await this.$api.userUpdateBirthday(submitBirthday);

        this.currentMainTab = 'profile';
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: error.message || '儲存失敗',
          showClass: {
            popup: 'animate__animated animate__bounceIn',
          },
          timerProgressBar: true,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    },
    async userUpdateName() {
      const isNameValid = await this.$refs.lastName.validate();
      const isfirstNameValid = await this.$refs.firstName.validate();
      if (!isNameValid.valid || !isfirstNameValid.valid) return;
      this.isNameEdit = !this.isNameEdit;
      const submitLastName = { lastName: this.userifo.lastName };
      const submitFirstName = { firstName: this.userifo.firstName };
      await Promise.all([
        this.$api.userUpdateLastName(submitLastName),
        this.$api.userUpdateFirstName(submitFirstName),
      ]);
      this.userifo.displayLastName = this.userifo.lastName;
      this.userifo.displayFirstName = this.userifo.firstName;

      const dt = JSON.parse(localStorage.getItem('ML_DESIGN'));
      dt.user.name = this.userifo.lastName + this.userifo.firstName;
      localStorage.setItem('ML_DESIGN', JSON.stringify(dt));
      const userInfo = localStorage.getItem('ML_DESIGN');
      store.dispatch('userInfo/SET_USER_PROFILE', JSON.parse(userInfo));
    },
    async userUpdateNickName() {
      const isValidForm = await this.$refs.nickName.validate();
      if (!isValidForm.valid) return;
      this.isNickNameEdit = !this.isNickNameEdit;
      const submit = { nickName: this.userifo.nickName };
      await this.$api.userUpdateNickName(submit);
    },

    async userUpdateGender() {
      const isValidForm = await this.$refs.gender.validate();
      if (!isValidForm.valid) return;
      this.isGenderEdit = !this.isGenderEdit;
      const submit = { gender: this.userifo.gender };
      await this.$api.userUpdateGender(submit);
    },
    async userUpdateBirthday() {
      const isValidForm = await this.$refs.birthday.validate();
      if (!isValidForm.valid) return;
      this.isBirthEdit = !this.isBirthEdit;
      const submit = { birthday: this.$dayjs(this.userifo.birthday).valueOf() };
      await this.$api.userUpdateBirthday(submit);
    },
    async changePasswordForCellphone() {
      const newPassword = await this.$refs.newPassword.validate();
      const newPasswordCheck = await this.$refs.newPasswordCheck.validate();
      if (!newPassword.valid || !newPasswordCheck.valid) return;

      this.isPasswordEdit = !this.isPasswordEdit;
      const submit = {
        input: {
          newPassword: this.userifo.newPassword,
          newPasswordCheck: this.userifo.newPasswordCheck,
        },
      };
      const resp = await this.$api.changePasswordForCellphone(submit);
      const { data } = resp.data;
      this.userifo.newPassword = '';
      this.userifo.newPasswordCheck = '';
      if (data.changePasswordForCellphone) {
        this.statusContent = '密碼更新成功';
        this.displayStatus = 'success';
        this.showStatusModal = true;
      }
    },

    async uploadFile(e) {
      this.filechange = false;
      const reader = new FileReader();

      reader.addEventListener(
        'load',
        () => {
          // convert image file to base64 string
          this.imageBlob = reader.result;
          this.filechange = true;
          this.$nextTick().then(() => {
            this.initCropper();
          });
        },
        false,
      );

      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    toggleAvatar() {
      this.isAvatar = !this.isAvatar;
      if (this.imageBlob !== '' && this.imageBlob !== null && this.isAvatar) {
        this.$nextTick().then(() => {
          this.initCropper();
        });
      } else {
        this.imageBlob = '';
        this.filechange = false;
      }
    },
    initCropper() {
      if (this.myCropper) { this.myCropper.destroy(); }
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false,
        toggleDragModeOnDblclick: true,
      });
    },
    async handleSubmitAvatar() {
      this.afterImg = await this.myCropper
        .getCroppedCanvas({
          maxWidth: 300,
          maxHeight: 300,
          fillColor: '#fff',
          imageSmoothingQuality: 'high',
        })
        .toDataURL('image/jpeg');
      const res = await fetch(this.afterImg);
      const blob = await res.blob();
      this.afterImgFile = new File([blob], 'avatar.jpeg', {
        type: 'image/jpeg',
      });
      const resp = await this.$api.setUserAvatar(
        this.afterImgFile,
        this.isGlobal,
      );

      const { errors } = resp.data;
      if (errors) return;

      this.afterImg = '';
      this.afterImgFile = null;
      await this.getMechants();
      this.toggleAvatar();
    },

    async shareLink() {
      // const url = `${window.location.protocol}//${window.location.hostname}/login/?merchantId=${this.currentMechantId}&designerId=${this.userInfo.user.id}&openExternalBrowser=1&to=appointment`;
      const url = `${window.location.protocol}//${window.location.hostname}/member/line?merchantId=${this.currentMechantId}&designerId=${this.userInfo.user.id}`;

      if (navigator.share) {
        await navigator
          .share({
            title: '點選下方連結 預約我唷',
            url,
          })
          .then(() => console.log('success'))
          .catch((err) => {
            window.open(url);
            console.error(err);
          });
      } else {
        window.open(url);
      }
    },
    async getMonthlyOrders() {
      const submit = {
        dateRange: {
          startDate: this.$dayjs().startOf('day').valueOf(),
          endDate: this.$dayjs().endOf('day').valueOf(),
        },
        customerKeyword: '',
        isEarlierRecordDisplay: false,
      };
      const resp = await this.$api.getDesignerReservation(submit);
      const { data } = resp.data;
      this.reviewResult = data.getDesignerReservation.filter(
        (order) => order.status === '待審核',
      );
      this.orderResult = data.getDesignerReservation.filter(
        (order) => order.status !== '待審核',
      );
    },
    doRoute(routName) {
      this.$router.push({ name: routName });
    },
    doRouteOrder(item, isReview) {
      this.$router.push({
        name: 'ScheduleBreak-Detail',
        query: { id: item.orderId, isReview },
      });
    },

    async getMechants() {
      const res = await this.$api.user({ id: this.userInfo.user.id });
      const { data, errors } = res.data;
      if (errors) return;
      this.merchentList = data.user.merchants;
      this.userAvatarImgUrl = data.user.avatar;
      this.isBindingLine = !!data.user.isLineBinded;
    },
    doLogout() {
      this.dropdownButton = !this.dropdownButton;
      this.isLogout = !this.isLogout;
    },
    async logout() {
      const resp = await this.$api.userLogout();
      const { data, errors } = resp.data;
      if (errors) return;
      if (!data.userLogout) return;
      await this.SET_USER_PROFILE(null);
      this.statusContent = '會員已登出';
      this.displayStatus = 'success';
      this.showStatusModal = true;
      setTimeout(() => {
        this.$router.replace({ name: 'Login' });
      }, 2100);
    },
    async getMe() {
      const resp = await this.$api.me();
      const { data, errors } = resp.data;
      if (errors) return;
      try {
        this.merchantIdentity = data.me.merchantIdentity;
        this.isBindingLine = !!data.me.isLineBinded;
        this.userifo.displayLastName = data.me.lastName;
        this.userifo.lastName = data.me.lastName;
        this.userifo.displayFirstName = data.me.firstName;
        this.userifo.firstName = data.me.firstName;
        this.userifo.nickName = data.me.nickName;
        this.userifo.gender = data.me.gender;
        this.userifo.birthday = data.me.birthday
          ? new Date(data.me.birthday)
          : new Date(0);
      } catch {
        this.merchantIdentity = {};
      }
    },
    async getMerchantAuthorities() {
      const resp = await this.$api.getMerchantAuthorities();
      const { data, errors } = resp.data;
      if (errors) return;
      try {
        this.merchantAuthorities = data.getMerchantAuthorities;
      } catch {
        this.merchantAuthorities = [];
      }
    },
    async getMerchantNewsTicker() {
      const resp = await this.$api.getMerchantNewsTicker();
      const { data, errors } = resp.data;
      if (errors) return;
      try {
        this.MerchantNewsTicker = data.getMerchantNewsTicker;
      } catch {
        this.MerchantNewsTicker = '';
      }
    },

    permissionReportList() {
      return new Promise((resolve) => {
        const identityAuthorities = this.merchantAuthorities.find(
          (item) => item.id === this.merchantIdentity.authorityId,
        );
        const authorityList = identityAuthorities && isJSON(identityAuthorities.authoritySettings)
          ? JSON.parse(identityAuthorities.authoritySettings)
          : [];
        const reportList = authorityList.flatMap((authority) => (authority.pageTitle !== '設計師手機版 權限設定'
          ? []
          : authority.pageAuthority));
        const permissionReportList = reportList.filter(
          (item) => item.authority,
        );
        resolve(permissionReportList);
      });
    },
    async swtichAuthority(value) {
      await Promise.all([
        this.bindingLine(),
        this.SET_USER_CURRENT_MERCHANTID(value),
        this.getMe(),
        this.getMerchantAuthorities(),
        this.getMerchantNewsTicker(),
        this.getMechants(),
        this.getExtraLink(),
      ]).then(async () => {
        // 設定店家開始與結束時間 (時間從computed篩出來)
        this.setOPandED(this.merchantPayload);
        const permissionReportList = await this.permissionReportList();
        permissionReportList.push({
          pageName: '排班表',
          authority: true,
        });
        this.SET_USER_AUTHORIZELIST(permissionReportList);
      });
    },
    switchStore(storeId) {
      if (storeId === this.selected) return;
      this.selected = storeId;
      this.isStoreChange = false;
      this.swtichAuthority(storeId);
    },
    async getExtraLink() {
      const res = await this.$api.getDesignerExternalLink();
      const link = res.data.data.getDesignerExternalLink;
      this.extraLink = link;
    },
    goExtraLink(link) {
      window.open(link, '_blank', 'noreferrer');
    },
    toggleDropdown(key) {
      console.log(key);
      switch (key) {
        case 'userInfo':
          this.isUserInfo = !this.isUserInfo;
          this.dropdownButton = !this.dropdownButton;
          break;
        case 'password':
          this.isPasswordEdit = !this.isPasswordEdit;
          this.dropdownButton = !this.dropdownButton;
          break;
        case 'changeStore':
          this.isStoreChange = !this.isStoreChange;
          this.dropdownButton = !this.dropdownButton;
          break;
        default:
          break;
      }
    },
    async handleGeUnCheckedReservationCount() {
      const res = await this.$api.getUnCheckedReservationCount();
      this.unCheckedOrder = res.data.data.unCheckedReservationCount;
    },
    async getBindLineLink() {
      const ML_DESIGN = JSON.parse(localStorage.getItem('ML_DESIGN'));
      try {
        const res = await this.$api.getLineBindLinkForDesigner(ML_DESIGN.currentMechantId);
        const { data, errors } = res;
        if (errors) return;
        window.location.assign(data.data.getLineBindLinkForDesigner);
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: error.message,
          showClass: {
            popup: 'animate__animated animate__bounceIn',
          },
          timerProgressBar: true,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    },
  },
  watch: {
    '$route.query.tab': {
      immediate: true,
      handler(val) {
        if (val === 'profile') {
          this.currentMainTab = 'profile';
        } else {
          this.currentMainTab = 'home';
        }
      },
    },
  },
};
</script>

<style scoped>
.main-header .info {
  @apply w-[70.796460%];
  /* @apply w-60; */
}

.main-header .avatar {
  @apply ml-auto w-[22.12389%] max-w-[90px] md:w-[15%] aspect-square self-center overflow-hidden rounded-full bg-slate-300 object-cover shadow-[3px_3px_3px_0_#ccc];
}

/* 區塊共用 */
.sect {
  @apply flex flex-col rounded-[20px] bg-white mb-3 pb-[10px] relative;
}

.sect h2 {
  @apply p-4 text-left text-[#111827] font-[700] text-[19px];
}

/* 功能選單 */
.sect .lists {
  @apply flex w-full flex-wrap;
}

.sect .lists li {
  @apply flex flex-col items-center w-[22.7138643068%] mb-[6%] mx-[5.3097345133%];
}

.sect .lists span {
  @apply select-none whitespace-nowrap text-sm font-[500] text-[#111827] tracking-wider;
}

@media screen and (min-width: 768px) {
  .sect .lists li {
    @apply w-[19.5355191%] mx-[2.7322404%];
  }
}

.sect .lists li .pic {
  @apply flex aspect-square w-full items-center !justify-center rounded-full bg-[#F7F7F7] mb-2;
}

/* 預約明細類 */
.sect h3 {
  @apply text-left ml-8 relative text-[#111827] font-[500] before:content-[''] before:absolute before:top-[5px] before:left-[-8px] before:w-[3px] before:h-[70%] before:bg-[#111827] before:rounded-[5px];
}

.sect p {
  @apply mb-3 ml-[2em] pl-2 text-left text-[13px] font-[500] text-[#888];
}

.sect .content {
  @apply mb-2 select-none text-[13px] font-[500] text-[#111827] mx-4 my-2 flex items-center justify-between rounded-lg bg-[#F7F7F7] p-2;
}

.sect .content .item {
  @apply flex w-3/12 items-center justify-center;
}

.sect .content .number {
  @apply font-[700] font-['Arial'];
}

.sect .content .text {
  @apply font-[500] overflow-hidden text-ellipsis whitespace-nowrap justify-start;
}

.sect .content .status {
  @apply w-3/12 font-[500] overflow-hidden text-ellipsis whitespace-nowrap;
}

.sect .content img {
  @apply mr-1 w-[15px];
}

.sect .content .arrow {
  @apply w-[7px];
}

.user-info-list .avatar {
  @apply absolute inset-x-0 top-[-50px] m-auto h-[120px] w-[120px] overflow-hidden rounded-full bg-slate-300 object-cover shadow-[3px_3px_3px_0_#ccc];
}

.user-info-list h2 {
  @apply pt-16 pb-4 text-[1.75rem] font-[700] text-[#111827];
}

.user-info-list .avatar .icon {
  @apply mt-[calc(50%-1.25rem)] text-4xl;
}

.user-info-list li,
.psword li span {
  @apply mb-4 px-3 py-2 flex bg-[#F7F7F7] rounded-[0.75rem] justify-start items-center;
}

.user-info-list li > label {
  @apply mr-3 w-1/4 text-left;
}

.user-info-list li .icon {
  @apply ml-auto;
}

.user-info-list li .fix {
  @apply text-[#111827] font-[700] py-0 px-[2px] border-b-[2px] border-transparent;
}

.user-info-list li input,
.psword li input {
  @apply bg-inherit border-b-[2px] border-[#ccc] px-0 w-full;
}

.user-info-list li input[type="radio"],
.user-info-list li input[type="radio"] + label {
  @apply mr-[10px] w-auto;
}

.user-info-list li input,
.psword li input {
  @apply focus:outline-none;
}

.user-info-list button {
  @apply my-4 ml-auto rounded-full border border-[#eee] py-[9px] px-[26px] text-sm flex items-center justify-center text-[#888888];
}

.psword {
  @apply mb-[30px];
}

.psword h2 {
  @apply pb-4 text-[19px] font-[700] text-[#111827];
}

.psword li label {
  @apply w-3/5 text-left text-[#888] font-[500];
}

.psword button {
  @apply m-auto flex items-center justify-center rounded-full bg-[#222D4D] px-[23px] py-[6px] text-[12px] text-white;
}

.newsTicker {
  @apply mb-8 flex w-full items-center rounded-[10px] bg-white py-1 px-4 text-left;
}

.newsTickerText {
  @apply w-full relative self-start h-[28px] overflow-hidden whitespace-nowrap text-left;
}

.newsTickerText span {
  @apply absolute pl-[100%] text-[13px] text-[#888] font-[700] leading-[28px] animate-[marquee_15s_linear_infinite];
}

.upload-avatar button {
  @apply rounded-full border border-solid border-[#EEEEEF] bg-white py-2 px-6 text-sm leading-tight text-primary shadow-md;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}

@keyframes moving {
  0% {
    transform: translateX(0px);
  }

  30% {
    transform: translateX(calc(8rem - 100%));
  }

  50% {
    transform: translateX(calc(8rem - 100%));
  }

  80% {
    transform: translateX(0px);
  }
}
</style>
