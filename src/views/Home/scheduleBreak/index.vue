<template>
  <C-Main-Block>
    <C-Back-Nav
      :title="'預約'"
      rightIcon="bi bi-list-ul"
      @iconEvent="doRoute('Order-list')"
    >
    </C-Back-Nav>

    <div
      class="relative mx-auto mt-20 w-full max-w-screen-md px-5 pb-[100px] lg:mt-40 lg:px-10"
    >
      <div class="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm lg:p-6">
        <div class="flex w-full items-center justify-between pb-4">
          <button
            @click="isActiveFilter = !isActiveFilter"
            class="bg-gmb-orange-50 flex size-9 shrink-0 items-center justify-center rounded-xl text-gmb-orange-500 transition-colors hover:bg-gmb-orange-100"
          >
            <i class="bi bi-funnel-fill text-lg"></i>
          </button>
          <div class="flex items-center rounded-full bg-gray-100 p-1 text-sm">
            <div
              @click="setShowType('0')"
              @keydown="setShowType('0')"
              class="flex cursor-pointer items-center gap-x-1 rounded-full px-3 py-1.5 duration-200"
              :class="{
                'bg-white text-gmb-orange-500 shadow-sm': showType == '0',
                'text-gray-400': showType != '0'
              }"
            >
              <i class="bi bi-calendar3 text-[15px]"></i>
            </div>
            <div
              @click="setShowType('1')"
              @keydown="setShowType('1')"
              class="flex cursor-pointer items-center gap-x-1 rounded-full px-3 py-1.5 duration-200"
              :class="{
                'bg-white text-gmb-orange-500 shadow-sm': showType == '1',
                'text-gray-400': showType != '1'
              }"
            >
              <i class="bi bi-calendar-week text-[15px]"></i>
            </div>
            <div
              @click="setShowType('2')"
              @keydown="setShowType('2')"
              class="flex cursor-pointer items-center gap-x-1 rounded-full px-3 py-1.5 duration-200"
              :class="{
                'bg-white text-gmb-orange-500 shadow-sm': showType == '2',
                'text-gray-400': showType != '2'
              }"
            >
              <i class="bi bi-calendar-event text-[15px]"></i>
            </div>
          </div>
          <div class="flex shrink-0 items-center gap-2">
            <button @click="openToolTip" class="bg-gmb-orange-50 flex size-9 items-center justify-center rounded-full text-gmb-orange-500 transition-colors hover:bg-gmb-orange-100">
              <i class="bi bi-three-dots-vertical text-lg"></i>
            </button>
          </div>

          <!-- Add service by time content (Bottom Sheet) -->
          <C-Modal-Dialog
            v-model="isDirect"
            @close="isDirect = false; isDirectOnCenter = false"
            :title="'快速新增'"
            position="bottom"
            animationCss="animate__animated animate__fadeInUp animate__faster"
            class="z-[60]"
          >
            <div class="flex flex-col gap-2 pb-6">
              <button
                @click="doRoute('ScheduleBreak-Add')"
                class="flex w-full items-center gap-4 rounded-2xl bg-gray-50 p-4 transition-colors hover:bg-gray-100 active:scale-[0.98]"
              >
                <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-gmb-orange-500 shadow-sm">
                  <i class="bi bi-calendar-plus text-lg"></i>
                </span>
                <span class="font-bold text-gray-800">新增預約</span>
              </button>

              <button
                @click="doRoute('ScheduleBreak-Event')"
                class="flex w-full items-center gap-4 rounded-2xl bg-gray-50 p-4 transition-colors hover:bg-gray-100 active:scale-[0.98]"
              >
                <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-gmb-orange-500 shadow-sm">
                  <i class="bi bi-person-walking text-lg"></i>
                </span>
                <span class="font-bold text-gray-800">新增事件</span>
              </button>

              <button
                v-if="isShowAppointment"
                @click="doScheduleBreak()"
                class="flex w-full items-center gap-4 rounded-2xl bg-gray-50 p-4 transition-colors hover:bg-gray-100 active:scale-[0.98]"
              >
                <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-gmb-orange-500 shadow-sm">
                  <i class="bi bi-calendar-x text-lg"></i>
                </span>
                <span class="font-bold text-gray-800">關閉預約</span>
              </button>

              <button
                v-if="!isDirectOnCenter"
                @click="doRoute('ScheduleBreak-List')"
                class="flex w-full items-center gap-4 rounded-2xl bg-gray-50 p-4 transition-colors hover:bg-gray-100 active:scale-[0.98]"
              >
                <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-gmb-orange-500 shadow-sm">
                  <i class="bi bi-calendar-minus text-lg"></i>
                </span>
                <span class="font-bold text-gray-800">我的排休</span>
              </button>
            </div>
          </C-Modal-Dialog>
        </div>

        <!-- 月模式 -->
        <MonthView
          v-if="showType === '0'"
          v-model="monthlyOrdersDate"
          :attributes="filterResult"
          :manaulUpdateFormResult="manaulUpdateFormResult"
          @updateMonth="updateMonth"
          :month="month"
        ></MonthView>

        <!-- 周模式 -->
        <WeekView
          ref="weekViewRef"
          v-if="showType === '1'"
          v-model="period"
          :weekLst="weekLst"
          :attributes="formatResultOfWeek"
          :isRegularHoliday="restructureScheduleTableWithisRegualrHoliday"
          :manaulUpdateFormResult="manaulUpdateFormResult"
          :startTimeOBJ="startTimeOBJ"
          :endTimeOBJ="endTimeOBJ"
          @IsDirect="openToolTipByDate"
          :month="month"
          :isCBRDStylist="isCBRDStylist"
          :setAppointmentData="setAppointmentData"
          @setAppointmentData="setAppointmentData"
        >
        </WeekView>

        <!-- 單日模式 -->
        <DayView
          ref="dayViewRef"
          v-if="showType === '2'"
          v-model="today"
          :period="periodforDay"
          :weekLst="weekLstforDayMode"
          :manaulUpdateFormResult="manaulUpdateFormResult"
          :attributes="handleData"
          :isRegularHoliday="restructureScheduleTableWithisRegualrHoliday"
          :startTimeOBJ="startTimeOBJ"
          :endTimeOBJ="endTimeOBJ"
          @changePeriod="changeDayPeriod"
          @IsDirect="openToolTipByDate"
          :month="month"
          :isCBRDStylist="isCBRDStylist"
          @setAppointmentData="setAppointmentData"
        >
        </DayView>
      </div>
    </div>

    <!-- 過濾條件 -->
    <C-Loading-Overlay
      v-model="isActiveFilter"
      @doFunction="isActiveFilter = !isActiveFilter"
      :layerIndex="10"
    ></C-Loading-Overlay>
    <transition name="fromBottom">
      <div v-show="isActiveFilter">
        <div
          class="!fixed inset-0 !bottom-0 z-[60] mt-[10vh] w-full overflow-hidden rounded-t-[32px] border-t border-gray-100 bg-white"
        >
          <div class="border-b border-gray-100 p-6">
            <h3 class="text-lg font-bold text-gray-900">顯示行事曆類別</h3>
          </div>
          <div class="max-h-[60vh] overflow-y-auto bg-gray-50/30 p-6">
            <div class="grid grid-cols-2 gap-4 gap-x-6 text-[15px] sm:grid-cols-3">
              <C-Button-Check
                v-if="isAuthToAll && isAllDesignerAuthority"
                label="全店行事曆"
                v-model="seletedAll"
              >
              </C-Button-Check>

              <C-Button-Check label="指定預約" v-model="isSpecified">
              </C-Button-Check>

              <C-Button-Check label="不指定預約" v-model="isNotSpecified">
              </C-Button-Check>

              <C-Button-Check label="排休" v-model="isHOLIDAY">
              </C-Button-Check>

              <C-Button-Check label="公休" v-model="isRH"> </C-Button-Check>

              <C-Button-Check label="事件" v-model="isEVENT"> </C-Button-Check>

              <C-Button-Check label="待審核" v-model="isCHECK"> </C-Button-Check>

              <C-Button-Check v-if="cusCheckDisplay" label="待確認" v-model="isCusCheckDisplay"> </C-Button-Check>
            </div>
          </div>
          <div class="border-t border-gray-100 bg-white p-6 pb-10">
            <button
              class="w-full rounded-full bg-gmb-orange-500 py-3 text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-gmb-orange-600 hover:shadow-md"
              @click="isActiveFilter = !isActiveFilter"
              @keypress="isActiveFilter = !isActiveFilter"
            >
              <span>確認套用</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </C-Main-Block>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import store from '@/store/index';
import MonthView from '@/components/Home/scheduleBreak/monthView.vue';
import WeekView from '@/components/Home/scheduleBreak/weekView.vue';
import DayView from '@/components/Home/scheduleBreak/dayView.vue';

export default {
  name: 'schedule-index',
  description: '行事曆的首頁',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 行事曆',
  },
  components: {
    MonthView,
    WeekView,
    DayView,
  },
  data() {
    return {
      // 打開過濾條件
      isActiveFilter: false,
      // 打開新增預約和檢視行事曆的tooltip
      isDirect: false,
      // 打開新增預約和檢視行事曆的tooltip(點擊空白處時modal需置中)
      isDirectOnCenter: false,
      // tooltip中顯示預約選項
      isShowAppointment: false,
      // 是否有權限可以檢視全店的預約內容
      isAuthToAll: false,
      // 打設計師預約清單的 result
      designerBookingList: [],
      // 全店預約
      seletedAll: false,
      isSpecified: true,
      isNotSpecified: true,
      isHOLIDAY: true,
      isRH: true,
      isEVENT: true,
      isCHECK: false,

      // 不同的檢視模式 '0' 月模式 '1' 周模式 '2' 日模式
      showType: '1',
      // 用於周模式中切換 周模式的時間，得以每周每周切換
      period: 0,
      periodforDay: 0,
      // 月模式月份的切換
      monthlyOrdersDate: {
        start: this.$dayjs().startOf('month').valueOf(),
        end: this.$dayjs().endOf('month').valueOf(),
      },

      orderDate: {
        start: null,
        end: null,
      },

      // 日模式日期的切換
      today: this.$dayjs(),
      // 用於月模式的過濾後的內容
      attributes: [],
      formatResult: [],
      timeListOfBookings: [],
      // 畫面是否初始
      isInitialLoad: true,
      monthViewMonth: '',
      // 會根據事件的起始時間變動的起始時間的dayjs物件
      startTimeOBJ: this.getLocalStorageOpenTime(),
      endTimeOBJ: this.getLocalStoragecloseTime(),
      cusCheckDisplay: false,
      isCusCheckDisplay: true,
      isCBRDStylist: false,
      appointmentData: {
        orderDate: '',
        orderTime: '',
        status: '',
      },
    };
  },
  async created() {
    if (!localStorage.getItem('scheduleShowType')) {
      localStorage.setItem('scheduleShowType', this.showType);
    } else {
      this.showType = localStorage.getItem('scheduleShowType');
    }
    await this.getIsCBRDStylist();
    await this.handleGetIsBookingCusCheckUsing();
    this.setDate(this.showType);
    await this.getIsMerchantScheduleDisplay();
  },
  deactivated() {
    this.isDirect = false;
    this.isDirectOnCenter = false;
  },
  methods: {
    // 初始化

    async handleGetIsBookingCusCheckUsing() {
      try {
        const res = await this.$api.getIsBookingCusCheckUsing();
        this.cusCheckDisplay = res.data.data.getIsBookingCusCheckUsing;
      } catch (error) {
        console.log('error: ', error);
      }
    },

    // (留著)取得是否有權限檢視全部的預約
    async getIsMerchantScheduleDisplay() {
      const resp = await this.$api.getIsMerchantScheduleDisplay();
      const { data, errors } = resp.data;
      if (errors) return;
      this.isAuthToAll = data.getIsMerchantScheduleDisplay;
    },

    // (留著)取得是否有權限檢視全部的預約
    async getIsCBRDStylist() {
      const resp = await this.$api.getIsCBRDStylist();
      const { data, errors } = resp.data;
      if (errors) return;
      this.isCBRDStylist = data.getIsCBRDStylist;
    },

    // 是否顯示顧客備註
    /// dateRange {startDate,endDate}, isDADC
    async getDesignerCalendar() {
      const submit = {
        dateRange: {
          startDate: this.orderDate.start,
          endDate: this.orderDate.end,
        },
        isDADC: this.seletedAll,
      };

      const rsp = await this.$api.getDesignerCalendar(submit);
      const data = JSON.parse(JSON.stringify(rsp.data.data.getDesignerCalendar));
      data.forEach(({
        type, startTime, endTime, timeCost, ...rest
      }, i) => {
        // 處理跨天的資料
        // 結束時間超過當天24:00，將拆分成兩筆資料 (24:00依然算一筆)
        if (
          (type === 'RESERVATION' || type === 'EVENT' || type === 'UNCHECK')
          && !this.$dayjs(startTime).isSame(endTime, 'day')
        ) {
          const newStartTime = this.$dayjs(endTime).startOf('day').valueOf();
          const newTimeCost = (endTime - newStartTime) / 1800000;
          // 跨天且跨週的資料後端已拆分，所以不用再處理
          if (
            newStartTime < this.$dayjs(this.orderDate.start).endOf('week').valueOf()
            && newStartTime !== endTime
          ) {
            data.push({
              type,
              startTime: newStartTime,
              endTime,
              timeCost: newTimeCost,
              ...rest,
            });
          }
          data[i].endTime = newStartTime - 1800000;
          data[i].timeCost = timeCost - newTimeCost;
        }
      });

      // 處理各資料的顯示顏色
      const newResult = data.map((item, index) => {
        let className = '';
        switch (item.type) {
          case 'UNCHECK':
            className = 'bg-[#9ec0ef] text-white';
            break;
          case 'RH':
            className = 'bg-meimate-blue-gray text-white';
            break;
          case 'HOLIDAY':
            className = 'bg-meimate-yellow text-white';
            break;
          case 'RESERVATION':
            className = this.designerId === item.designerId ? 'bg-[#969883] text-white' : 'bg-[#98838f]/75 text-white';
            if (item.isDone) {
              className = 'bg-[#5699cf] text-white';
            }
            break;
          case 'EVENT':
            className = 'bg-[#82BC95] text-white';
            break;
          default:
            break;
        }

        if (item.isCusCheckRequired && this.cusCheckDisplay && this.designerId === item.designerId) {
          className = 'bg-[#ff9800] text-white';
        }

        const customData = {
          nameToDisplay: item.nameToDisplay,
          class: className,
          type: item.type,
          designer: this.userInfo.user.name,
          start: item.startTime,
          end: item.endTime,
          timeCost: item.timeCost,
          isDesignate: item.isDesignate,
          isCusCheckRequired: item.isCusCheckRequired,
          designerId: item.designerId,
          designerName: item.designerName,
          nameToDisplayForList: item.nameToDisplayForList,
          remarkForCustomer: item.remarkForCustomer,
        };

        return {
          key: item.ids.length ? item.ids[0] : `${item.type}-${index}`,
          customData,
          dates: item.startTime,
        };
      });
      this.formatResult = [...newResult];
    },
    // 手動更新表單資料
    async manaulUpdateFormResult() {
      await this.getDesignerCalendar();
    },

    // 切換路由
    doRoute(item) {
      store.dispatch('userInfo/SET_RESET_ORDER_DATA');
      this.$store.commit('userInfo/SET_SELECT_SERVICE_LIST', []);
      if (this.isDirectOnCenter && (item === 'ScheduleBreak-Add' || item === 'ScheduleBreak-Event')) {
        this.$store.commit('userInfo/UPDATE_USER_OPPOINTMENT', this.appointmentData);
      } else {
        this.$store.commit('userInfo/UPDATE_USER_OPPOINTMENT', {
          orderDate: '',
          orderTime: '',
          status: '',
        });
      }
      this.$router.push({ name: item });
    },
    setDate(value) {
      switch (value) {
        case '0':
          this.orderDate.start = this.monthlyOrdersDate.start;
          this.orderDate.end = this.monthlyOrdersDate.end;
          break;
        case '1':
          this.orderDate.start = this.weekLst[0].valueOf();
          this.orderDate.end = this.weekLst[6].valueOf();
          break;
        case '2':
          this.orderDate.start = this.$dayjs(this.today).startOf('day').valueOf();
          this.orderDate.end = this.$dayjs(this.today).endOf('day').valueOf();
          break;
        default:
          break;
      }
    },
    // 傳入日期的開始時間
    getLocalStorageOpenTime(date = new Date()) {
      const openingHours = (localStorage.getItem('openingHours') || '10:00:00').split(':')[0];
      const openingMin = (localStorage.getItem('openingHours') || '10:00:00').split(':')[1];
      const openTime = this.$dayjs(date)
        .set('hour', openingHours)
        .set('minute', openingMin)
        .startOf('minute');
      return openTime;
    },
    // 傳入日期的結束時間
    getLocalStoragecloseTime(date = new Date()) {
      const closingHours = (localStorage.getItem('closingHours') || '22:00:00').split(':')[0];
      const closingMin = (localStorage.getItem('closingHours') || '22:00:00').split(':')[1];
      const closeTime = this.$dayjs(date)
        .set('hour', closingHours)
        .set('minute', closingMin)
        .startOf('minute');
      return closeTime;
    },
    // 更改模式 '0' 月模式 '1' 周模式 '2' 日模式
    setShowType(num) {
      localStorage.setItem('scheduleShowType', num);
      this.showType = num;
      if (num !== '2') {
        this.$store.commit('userInfo/UPDATE_USER_OPPOINTMENT_ORDERDATE', '');
      }
    },
    // 日模式更改期間 (一週一週改)
    changeDayPeriod(data) {
      this.periodforDay = data;
    },
    // 開啟ToolTip
    openToolTip() {
      this.isDirect = !this.isDirect;
      if (this.isDirect) {
        this.isDirectOnCenter = false;
        this.isShowAppointment = false;
      } else {
        this.isDirectOnCenter = true;
      }
    },
    openToolTipByDate(TimeStatus) {
      this.isShowAppointment = false;
      if (TimeStatus.designerBookingList) this.isShowAppointment = true;
      this.isDirect = true;
      this.isDirectOnCenter = true;
    },
    async doScheduleBreak() {
      if (this.appointmentData.status.statusComment === null) {
        await this.$api.adminBookingTime({
          designerId: this.userInfo.user.id,
          datetime: new Date(this.appointmentData.orderDate).getTime(),
          appointable: this.appointmentData.status.statusComment !== null,
        });
        await this.getDesignerCalendar();
        if (this.$refs.dayViewRef) this.$refs.dayViewRef.$emit('update');
        if (this.$refs.weekViewRef) this.$refs.weekViewRef.$emit('update');
        this.isDirect = false;
      }
    },
    updateMonth(month) {
      this.monthViewMonth = month;
    },
    resetTime() {
      this.startTimeOBJ = this.getLocalStorageOpenTime();
      this.endTimeOBJ = this.getLocalStoragecloseTime();
    },
    setAppointmentData(data) {
      this.appointmentData = data;
    },
  },

  computed: {
    ...mapState('userInfo', [
      'userInfo',
      'currentMechantId',
      'userAuthorizeList',
      'oppointment',
    ]),
    ...mapGetters('userInfo', ['GETTER_MECHANTNAME']),
    // 判斷是否有權限開啟全店設計師
    isAllDesignerAuthority() {
      return this.userAuthorizeList.find(
        (item) => item.pageName === '全店行事曆',
      )?.authority;
    },
    restructureScheduleTableWithisRegualrHoliday() {
      return this.formatResult.filter((item) => item.customData.type === 'RH');
    },
    filterResult() {
      let data = this.formatResult;
      // 篩選指定
      // 預約以外的事件isDesignate為null，因此要明確判斷是否為true或false
      if (!this.isSpecified) data = data.filter((item) => item.customData.isDesignate !== true);
      // 篩選不指定
      if (!this.isNotSpecified) data = data.filter((item) => item.customData.isDesignate !== false);
      // 篩選公休
      if (!this.isRH) data = data.filter((item) => item.customData.type !== 'RH');
      // 篩選排休
      if (!this.isHOLIDAY) data = data.filter((item) => item.customData.type !== 'HOLIDAY');
      // 篩選事件
      if (!this.isEVENT) data = data.filter((item) => item.customData.type !== 'EVENT');
      // 篩選待審核
      if (!this.isCHECK) data = data.filter((item) => item.customData.type !== 'UNCHECK');
      // 篩選待確認
      if (this.isCusCheckDisplay && this.cusCheckDisplay) {
        const filtData = this.formatResult.filter((item) => item.customData.isCusCheckRequired);
        filtData.forEach((d) => {
          if (!data.find((item) => item.key === d.key)) {
            data.push(d);
          }
        });
      }
      return data;
    },
    // 處理時間重複
    handleOverlapping() {
      // 深拷貝
      let data = JSON.parse(JSON.stringify(this.filterResult));
      const groups = [];
      if (this.showType === '2') {
        data = data.filter(({ customData }) => this.$dayjs(this.today).isSame(this.$dayjs(customData.start), 'day'));
      }
      for (let i = 0; i < data.length; i++) {
        // eslint-disable no-plusplus
        const time1 = data[i];
        if (time1.isProcessed) continue; // 跳過已處理過的時間

        const currentGroup = [time1];
        for (let j = i + 1; j < data.length; j++) {
          const time2 = data[j];
          if (time2.isProcessed) {
            continue;
          } // 跳過已處理過的時間

          if (
            // 判斷時間是否重疊
            (time2.customData.start >= time1.customData.start
              && time2.customData.start < time1.customData.end)
            || (time2.customData.end > time1.customData.start
              && time2.customData.end <= time1.customData.end)
            || (time2.customData.start <= time1.customData.start
              && time2.customData.end >= time1.customData.end)
          ) {
            currentGroup.push(time2);
            time2.isProcessed = true; // 標記已處理過的時間
          }
        }
        groups.push({ data: currentGroup });
      }
      return groups;
    },
    // 處理每筆資料應該長多高、距離時間高度
    // 日模式處理到這裡就好，因為日模式的資料只有一天，所以不用繼續處理下面 splitDay 的問題
    handleData() {
      const data = JSON.parse(JSON.stringify(this.handleOverlapping));
      const HEIGHT = this.isCBRDStylist ? 40 : 20;
      const res = [];
      let localStartTimeOBJ = this.startTimeOBJ;
      let localEndTimeOBJ = this.endTimeOBJ;
      let startTime = localStartTimeOBJ.format('HH:mm:ss');

      // 事件的起始時間若超出localstorge的起始時間，將原始起始時間改為該事件的起始時間
      if (this.filterResult.length) {
        if (this.showType === '1') {
          this.filterResult.forEach((item) => {
            // 將事件的開始與結束時間的年月日設成跟startTimeOBJ、endTimeOBJ一致
            const itemStart = this.$dayjs(item.customData.start)
              .set('y', localStartTimeOBJ.$y)
              .set('M', localStartTimeOBJ.$M)
              .set('D', localStartTimeOBJ.$D);
            const itemEnd = this.$dayjs(item.customData.end)
              .set('y', localEndTimeOBJ.$y)
              .set('M', localEndTimeOBJ.$M)
              .set('D', localEndTimeOBJ.$D);
            // 若事件開始時間早於startTimeOBJ，將startTimeOBJ改為該事件的開始時間
            if (itemStart.isBefore(localStartTimeOBJ)) {
              startTime = itemStart.format('HH:mm:ss');
              localStartTimeOBJ = this.$dayjs(item.customData.start);
            }
            // 事件結束時間若晚於endTimeOBJ，將endTimeOBJ改為該事件的結束時間
            if (itemEnd.isAfter(localEndTimeOBJ)) {
              localEndTimeOBJ = this.$dayjs(item.customData.end);
            }
          });
        } else if (this.showType === '2') {
          const todayStart = this.getLocalStorageOpenTime(this.today);
          this.filterResult.forEach((item) => {
            const itemStart = this.$dayjs(item.customData.start);
            if (
              todayStart.isSame(itemStart, 'day')
              && itemStart.valueOf() < todayStart.valueOf()
            ) {
              startTime = itemStart.format('HH:mm:ss');
            }
          });
        }
      } else {
        this.resetTime();
      }
      data.forEach((item) => {
        const zeroStart = item.data[0].customData.start;
        // 一個單位有多筆的時候
        if (item.data.length > 1) {
          // 定義區塊離頂端有多遠
          // 因為起始時間只知道時間，所以要抓物件第一筆的時間format 時 起始時間寫死，取valueOf 來比較
          item.fatherClass = `top-[${
            (+this.$dayjs(zeroStart).diff(
              this.$dayjs(
                this.$dayjs(zeroStart)
                  .format(`YYYY-MM-DD ${startTime}`)
                  .valueOf(),
              ),
              'minute',
            )
              * HEIGHT)
              / 30
            + 1
          }px]`;
          // item.fatherClass = 'top-20';
          item.data.forEach((dt, i) => {
            if (i === 0) {
              dt.customData.specialClass = `mt-[1px] h-[${
                dt.customData.timeCost * HEIGHT - 3
              }px]`;
            } else {
              dt.customData.specialClass = `mt-[${
                (+this.$dayjs(dt.customData.start).diff(zeroStart, 'minute')
                  * HEIGHT)
                  / 30
                + 1
              }px] h-[${dt.customData.timeCost * HEIGHT - 3}px]`;
            }
          });
          res.push(item);
        }
        // 一個單位只有一筆的時候
        if (item.data.length === 1) {
          item.fatherClass = '';
          const dt = item.data[0];
          // top定義離頂端有多遠 (該物件起始時間 距離startTime 分鐘)
          // 每30分鐘高度為20px，預計會算出30的倍數，乘2除3後會算出高度，
          // h-定義高度，高度算完為了讓物件不要貼邊，-3像素
          dt.customData.specialClass = `
          top-[${
  (+this.$dayjs(dt.customData.start).diff(
    this.$dayjs(
      this.$dayjs(dt.customData.start)
        .format(`YYYY-MM-DD ${startTime}`)
        .valueOf(),
    ),
    'minute',
  )
              * HEIGHT)
              / 30
            + 2
}px] h-[${dt.customData.timeCost * HEIGHT - 3}px]`;
          res.push(item);
        }
      });
      return res;
    },
    // 將資料以星期分類 //預設只有週模式的資料會用到
    splitDay() {
      const sun = [];
      const mon = [];
      const thu = [];
      const wed = [];
      const thir = [];
      const fri = [];
      const sat = [];
      this.handleData.forEach((data) => {
        switch (this.$dayjs(data.data[0].dates).day()) {
          case 0:
            sun.push(data);
            break;
          case 1:
            mon.push(data);
            break;
          case 2:
            thu.push(data);
            break;
          case 3:
            wed.push(data);
            break;
          case 4:
            thir.push(data);
            break;
          case 5:
            fri.push(data);
            break;
          case 6:
            sat.push(data);
            break;
          default:
            break;
        }
      });
      return [sun, mon, thu, wed, thir, fri, sat];
    },
    // 週模式處理資訊
    formatResultOfWeek() {
      const result = [];
      this.splitDay.forEach((data) => {
        // 處理每個星期的資料
        if (data.length) {
          result.push(data);
        } else {
          result.push([]);
        }
      });
      return result;
    },

    // 週模式日期呈現
    weekLst() {
      return [
        this.$dayjs().startOf('day').day(this.period),
        this.$dayjs()
          .startOf('day')
          .day(this.period + 1),
        this.$dayjs()
          .startOf('day')
          .day(this.period + 2),
        this.$dayjs()
          .startOf('day')
          .day(this.period + 3),
        this.$dayjs()
          .startOf('day')
          .day(this.period + 4),
        this.$dayjs()
          .startOf('day')
          .day(this.period + 5),
        this.$dayjs()
          .endOf('day')
          .day(this.period + 6),
      ];
    },
    // 日模式日期呈現
    weekLstforDayMode() {
      return [
        this.$dayjs().startOf('day').day(this.periodforDay),
        this.$dayjs()
          .startOf('day')
          .day(this.periodforDay + 1),
        this.$dayjs()
          .startOf('day')
          .day(this.periodforDay + 2),
        this.$dayjs()
          .startOf('day')
          .day(this.periodforDay + 3),
        this.$dayjs()
          .startOf('day')
          .day(this.periodforDay + 4),
        this.$dayjs()
          .startOf('day')
          .day(this.periodforDay + 5),
        this.$dayjs()
          .endOf('day')
          .day(this.periodforDay + 6),
      ];
    },
    month() {
      if (this.showType === '1') return this.$dayjs(this.weekLst[0]).format('M');
      if (this.showType === '2') {
        if (
          this.$dayjs(this.weekLstforDayMode[0]).format('M')
          !== this.$dayjs(this.weekLstforDayMode[6]).format('M')
        ) {
          if (
            this.$dayjs(this.today).valueOf()
              >= this.$dayjs(this.weekLstforDayMode[0]).valueOf()
            && this.$dayjs(this.today).valueOf()
              <= this.$dayjs(this.weekLstforDayMode[6]).valueOf()
          ) {
            return this.$dayjs(this.today).format('M');
          }
          return this.$dayjs(this.weekLstforDayMode[0]).format('M');
        }
        return this.$dayjs(this.weekLstforDayMode[0]).format('M');
      }
      return this.monthViewMonth;
    },
    designerId() {
      return store.state.userInfo.userInfo.user.id;
    },
  },
  watch: {
    async $route(to) {
      if (to.name === 'ScheduleBreak') {
        await this.getDesignerCalendar();
      }
    },
    seletedAll() {
      this.getDesignerCalendar();
    },

    orderDate: {
      deep: true,
      async handler() {
        // 偵測深度日期如果更變，就主動呼叫API
        await this.getDesignerCalendar();
      },
    },
    monthlyOrdersDate: {
      deep: true,
      handler(value) {
        this.orderDate.start = value.start;
        this.orderDate.end = value.end;
      },
    },
    weekLst: {
      deep: true,
      handler(value) {
        this.orderDate.start = value[0].valueOf();
        this.orderDate.end = value[6].valueOf();
      },
    },
    today: {
      deep: true,
      handler(value) {
        this.orderDate.start = this.$dayjs(value).startOf('day').valueOf();
        this.orderDate.end = this.$dayjs(value).endOf('day').valueOf();
      },
    },
    showType: {
      handler(value) {
        // 切換模式，先把原本資料清掉，不然呼叫api過程，資料會預先呈現在背景
        this.formatResult = [];
        this.setDate(value);
      },
    },
  },
};
</script>

<style scoped>
.center {
  @apply fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2;
}
</style>
