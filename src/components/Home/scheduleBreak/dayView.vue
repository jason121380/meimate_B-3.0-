<template>
  <div class="">
    <div class="flex items-center justify-between py-4 text-center font-bold">
      <i
        @click="preNextDay(-7)"
        @keypress="preNextDay(-7)"
        class="bi bi-chevron-left p-2 text-[#9ca3af]"
      />
      <div
        @click="backtoToday()"
        @keypress="backtoToday()"
        class="flex items-center gap-4 text-lg font-medium"
      >
        <span class="">{{ handleShowData("YYYY") }}</span>
        <span class="">{{ month }}月 </span>
      </div>
      <i
        @click="preNextDay(7)"
        @keypress="preNextDay(7)"
        class="bi bi-chevron-right p-2 text-[#9ca3af]"
      />
    </div>

    <div class="flex items-center justify-between font-bold text-gray">
      <ul class="mb-2 flex grow items-center justify-end pb-2 pt-4">
        <li
          class="w-[12.8%] text-center text-xs"
          v-for="(week, index) in weekNo"
          :key="index + 'weekNo'"
        >
          {{ week }}
        </li>
      </ul>
    </div>
    <div class="mb-2 flex items-center justify-between">
      <ul class="mb-2 flex grow items-center justify-end">
        <li
          :class="{
            dot:
              $dayjs(week).format('YYYY-MM-DD') ===
              $dayjs(currentDay).format('YYYY-MM-DD'),
          }"
          class="w-[12.8%] text-center text-xs font-bold"
          v-for="(week, index) in weekLst"
          @click="clickSelectDay(week)"
          @keypress="clickSelectDay(week)"
          :key="index"
        >
          {{ $dayjs(week).format("D") }}
        </li>
      </ul>
    </div>

    <div class="mt-8 block">
      <!-- 表格身體測試 -->
      <div v-if="formData" class="relative flex flex-col text-xs">
        <!-- 時間 -->
        <div
          class="clock"
          v-for="(item, index) in formData"
          :key="index + 'clock'"
          :class="{ 'bg-zinc-100/50': isBeforeToday(item.time), 'doubleHeight spanPosition': isCBRDStylist }"
          @click="createEvent(item)"
          @keydown="createEvent(item)"
        >
          <span v-if="index % 2 === 0" class="font-bold text-meimate-pink">{{
            item.format
          }}</span>
        </div>

        <!-- top-0 h-[40px] -->
        <template v-for="(item, index) in attributes">
          <template v-if="item.data.length === 1">
            <div
              :key="`resultItem${index}`"
              :class="[
                item.data[0].customData.class,
                item.data[0].customData.specialClass,
              ]"
              class="absolute left-14 right-5 flex flex-col items-center justify-center overflow-hidden break-all rounded-lg px-4 py-1 text-center text-xs font-bold"
              @click="doRoute(item.data[0])"
              @keypress="doRoute(item.data[0])"
            >
              <p>
                {{ item.data[0].startTime }}
                {{ item.data[0].customData.nameToDisplay }}
              </p>
              <p v-if="isCBRDStylist">
                {{ item.data[0].customData.remarkForCustomer }}
              </p>
            </div>
          </template>

          <template v-if="morethanone(item.data)">
            <div
              :class="item.fatherClass"
              class="absolute left-14 right-5 flex gap-1"
              :key="index"
            >
              <div
                v-for="(order, i) in item.data"
                :key="`attributes-${i}`"
                :class="[
                  order.customData.class,
                  order.customData.specialClass,
                  `w-1/${item.data.length}`,
                ]"
                class="flex flex-col items-center justify-center overflow-hidden rounded-[10px] text-center"
                @click="doRoute(order)"
                @keypress="doRoute(order)"
              >
                <p>
                  {{ order.customData.nameToDisplay }}
                </p>
                <p v-if="isCBRDStylist">
                  {{ order.customData.remarkForCustomer }}
                </p>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
    <C-edit-holiday-dialog
      v-if="editHoliday.open"
      :start="editHoliday.start"
      :end="editHoliday.end"
      @close="(e) => modalClose(e)"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import store from '@/store/index';

export default {
  props: {
    value: {
      type: [String, Date, Object],
      required: true,
    },
    weekLst: {
      type: [Array],
    },
    period: {
      type: Number,
    },
    attributes: {
      type: [Array],
      default: () => [],
    },
    isRegularHoliday: {
      type: [Array],
      default: () => [],
    },
    manaulUpdateFormResult: {
      type: [Function],
      required: true,
    },
    month: {
      type: String,
    },
    isCBRDStylist: {
      type: Boolean,
    },
  },
  data() {
    return {
      weekNo: ['日', '一', '二', '三', '四', '五', '六'],
      startTime: localStorage.getItem('openingHours')
        ? localStorage.getItem('openingHours')
        : '10:00:00',
      designerBookingList: [],
      editHoliday: {
        start: '',
        end: '',
        open: false,
      },
    };
  },
  mounted() {
    this.$on('updateDesignerBooking', () => {
      this.getDesignerBookingTimesWithRange();
    });
    this.$store.commit('userInfo/UPDATE_USER_OPPOINTMENT_ORDERDATE', this.$dayjs(this.currentDay).$d);
  },
  // beforeDestroy() {
  //   this.$emit('input', this.$dayjs().format('YYYY-MM-DD'));
  // },
  methods: {
    morethanone(data) {
      return data.length > 1;
    },
    doRoute(attr) {
      if (attr.customData.designerId !== this.designerId) return;
      const unRouteList = ['RH', 'HOLIDAY'];
      if (unRouteList.includes(attr.customData.type)) {
        const { start, end } = attr.customData;
        this.editHoliday.start = start;
        this.editHoliday.end = end;
        this.editHoliday.open = true;
        /* // 確認按鈕字樣，如果為"事件"，顯示刪除事件，預設為開放預約
        let confirmButtonText = '';
        let iconColor = '';
        let confirmButton = '';
        switch (attr.customData.type) {
          // 排休
          case 'HOLIDAY':
            confirmButtonText = '開放預約';
            iconColor = '#F4BF73';
            confirmButton = '!bg-meimate-pink';
            break;
          default: // 時段公休、整日公休
            confirmButtonText = '開放預約';
            iconColor = '#F4BF73';
            confirmButton = '!bg-meimate-pink';
            break;
        }
        this.$swal
          .fire({
            icon: 'warning',
            iconColor,
            title: attr.customData.nameToDisplay,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText,
            cancelButtonText: '關閉',
            customClass: {
              confirmButton,
              cancelButton: '',
            },
          })
          .then(async (res) => {
            if (res.isConfirmed) {
              switch (attr.customData.type) {
                case 'RH':
                case 'HOLIDAY':
                  await this.$api.adminBookingTime({
                    designerId: this.userInfo.user.id,
                    datetime: attr.customData.start,
                    appointable: true,
                  });
                  break;
                case 'EVENT':
                  await this.$api.deleteEvent({ eventId: attr.key });
                  break;
                default: // 時段公休、整日公休
                  break;
              }
              await this.manaulUpdateFormResult();
            }
          }); */
      } else {
        const path = attr.customData.type === 'EVENT'
          ? 'ScheduleBreak-EventDetail'
          : 'ScheduleBreak-Detail';
        this.$router.push({ name: path, query: { id: attr.key } });
      }
    },
    preNextDay(num) {
      // this.currentDay = this.$dayjs(this.$dayjs(this.currentDay).add(num, 'days')).format(
      //   'YYYY-MM-DD',
      // );
      this.$emit('changePeriod', this.period + num);
    },
    clickSelectDay(data) {
      this.currentDay = this.$dayjs(data).format('YYYY-MM-DD');
      this.$store.commit('userInfo/UPDATE_USER_OPPOINTMENT_ORDERDATE', this.$dayjs(data).$d);
    },
    backtoToday() {
      this.currentDay = this.$dayjs().format('YYYY-MM-DD');
      this.$emit('changePeriod', 0);
    },
    handleShowData(dt) {
      // 如果顯示的區間 頭尾月份不同時
      // 判斷選擇的日期日不是在這區間，是的話顯示 選擇日期月份，不是的話顯示 區間第一天的月份
      // 預設回傳區間第一天的月份
      if (
        this.$dayjs(this.weekLst[0]).format(dt)
        !== this.$dayjs(this.weekLst[6]).format(dt)
      ) {
        if (
          this.$dayjs(this.value).valueOf()
            >= this.$dayjs(this.weekLst[0]).valueOf()
          && this.$dayjs(this.value).valueOf()
            <= this.$dayjs(this.weekLst[6]).valueOf()
        ) {
          return this.$dayjs(this.value).format(dt);
        }
        this.$dayjs(this.weekLst[0]).format(dt);
      }
      return this.$dayjs(this.weekLst[0]).format(dt);
    },
    createEvent(item) {
      if (!item) return;
      const selectDate = this.$dayjs(item.time);
      if (this.$dayjs(selectDate).isBefore(this.$dayjs(), 'day')) {
        return;
      }
      const selectTime = selectDate.format('HH:mm');
      const oppointment = {
        orderDate: selectDate.$d,
        orderTime: selectTime,
        status: item.designerBookingList,
      };
      this.$emit('setAppointmentData', oppointment);
      this.$emit('IsDirect', item);
    },
    async getDesignerBookingTimesWithRange() {
      const submitForm = {
        designerId: this.userInfo.user.id,
        storeId: this.currentMechantId,
        dateRange: {
          startDate: this.$dayjs(this.currentDay).startOf('date').valueOf(),
          endDate: this.$dayjs(this.currentDay).endOf('date').valueOf(),
        },
      };
      const resp = await this.$api.getDesignerBookingTimesWithRange(submitForm);
      const { data, errors } = resp.data;
      if (errors) return;
      this.designerBookingList = data.getDesignerBookingTimesWithRange;
    },
    isBeforeToday(day) {
      return this.$dayjs(day).isBefore(this.$dayjs(), 'day');
    },
    modalClose(updateData) {
      this.editHoliday.open = false;
      if (updateData) {
        this.manaulUpdateFormResult();
      }
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo', 'currentMechantId']),

    currentDay: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    openTime() {
      const openingHours = localStorage.getItem('openingHours').split(':')[0];
      const openingMin = localStorage.getItem('openingHours').split(':')[1];
      let openTime = this.$dayjs(this.value)
        .set('hour', openingHours)
        .set('minute', openingMin)
        .startOf('minute');

      this.attributes.forEach(({ data }) => {
        data.forEach(({ customData }) => {
          if (
            this.$dayjs(openTime).isSame(customData.start, 'day')
            && customData.start < openTime.valueOf()
          ) {
            openTime = this.$dayjs(customData.start);
          }
        });
      });
      return openTime;
    },
    closeTime() {
      const closingHours = localStorage.getItem('closingHours').split(':')[0];
      const closingMin = localStorage.getItem('closingHours').split(':')[1];
      let closeTime = this.$dayjs(this.value)
        .set('hour', closingHours)
        .set('minute', closingMin)
        .startOf('minute');
      this.attributes.forEach(({ data }) => {
        data.forEach(({ customData }) => {
          if (
            closeTime.isSame(customData.end, 'day')
            && customData.end > closeTime.valueOf()
          ) {
            closeTime = this.$dayjs(customData.end);
          }
        });
      });
      return closeTime;
    },
    totalhours() {
      return this.closeTime.diff(this.openTime, 'hour', true);
    },
    selectDayValueOf() {
      return this.$dayjs(this.value).startOf('date').valueOf();
    },
    formData() {
      if (!this.designerBookingList.length) {
        return [];
      }
      const daylist = [];
      const hour = this.openTime.$H;
      const min = this.openTime.$m;
      const time = this.$dayjs(this.selectDayValueOf)
        .set('hour', hour)
        .set('minute', min)
        .valueOf();
      const currentDesignerBooking = this.designerBookingList[0];
      if (!currentDesignerBooking) return [];
      for (let j = 0; j <= this.totalhours * 2; j++) {
        const eachTime = this.$dayjs(time).add(30 * j, 'minute');
        const designerBookingList = currentDesignerBooking.bookingTimes.find(
          (item) => item.time === eachTime.valueOf(),
        );
        const data = {
          format: eachTime.format('HH:mm'),
          time: eachTime.valueOf(),
          designerBookingList,
        };
        daylist.push(data);
        if (eachTime.format('HH:mm') === '23:30') {
          daylist.push({
            format: '00:00',
            time: eachTime.valueOf() + 1800000,
            designerBookingList: [],
          });
        }
      }
      return daylist;
    },
    designerId() {
      return store.state.userInfo.userInfo.user.id;
    },
  },
  watch: {
    value: {
      handler() {
        this.getDesignerBookingTimesWithRange();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.clock {
  @apply h-[20px] w-full ml-auto border border-[#f3f4f6] border-x-0 relative border-b-0;
  line-height: 40px;
}

.doubleHeight {
  @apply !h-[40px]
}

.spanPosition {
  span {
    top: -59%;
    height: 64px;
  }
}

.clock span {
  position: absolute;
  top: -118%;
  right: 100%;
  background-color: #fff;
  width: 3em;
  height: 4em;
  z-index: 1;
}

.dot {
  /* color: white; */
  position: relative;
  z-index: 1;
  color: #fff;
}

.dot::before {
  content: "";
  width: 2em;
  aspect-ratio: 1/1;
  position: absolute;
  background-color: #FF6B2C;
  border-radius: 100%;
  inset: 0;
  margin: auto;
  z-index: -1;
}
</style>
