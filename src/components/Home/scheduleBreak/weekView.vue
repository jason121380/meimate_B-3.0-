<template>
  <div>
    <div class="flex items-center justify-between py-4 text-center font-bold">
      <i
        @click="preNextWeek(-7)"
        @keypress="preNextWeek(-7)"
        class="bi bi-chevron-left p-2 text-[#9ca3af]"
      />
      <div
        @click="backtoToday()"
        @keypress="backtoToday()"
        class="flex items-center gap-4 text-lg font-medium"
      >
        <span>{{ $dayjs(weekLst[0]).format("YYYY") }}</span>
        <span>{{ month }}月 </span>
      </div>
      <i
        @click="preNextWeek(7)"
        @keypress="preNextWeek(7)"
        class="bi bi-chevron-right p-2 text-[#9ca3af]"
      />
    </div>
    <!-- 星期 -->
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

    <!-- 日期 -->
    <div class="mb-2 flex items-center justify-between">
      <ul class="mb-2 flex grow items-center justify-end">
        <li
          :class="{
            dot:
              $dayjs(item).format('YYYY-MM-DD') ===
              $dayjs().format('YYYY-MM-DD'),
          }"
          class="w-[12.8%] text-center font-arial text-[13px] font-bold"
          v-for="(item, index) in weekLst"
          :key="`week${index}`"
        >
          <p>{{ $dayjs(item).format("D") }}</p>
        </li>
      </ul>
    </div>

    <div class="flex">
      <!-- 這裡結束時間是動態抓八小時，如果未來有抽換，要重新處理 -->
      <div class="flex w-[12%] flex-col text-xs font-bold text-meimate-pink">
        <div v-for="(item, index) in formatSideListTime" :key="index + 'clock'">
          <div :class="{ 'spanPosition': isCBRDStylist }" class="time leading-[40px]">
            {{ item }}
            <!--  -->
          </div>
        </div>
      </div>
      <div
        class="relative mt-5 flex w-[13%] flex-col text-xs"
        v-for="(week, iidx) in attributes"
        :key="`week${iidx}`"
      >
        <!-- 畫表格 -->
        <div
          v-if="designerBookingList"
          class="dottedLine flex w-full flex-col text-xs"
        >
          <div v-for="item in formData[iidx]" :key="item.time">
            <div
              @click="createEvent(item)"
              @keydown="createEvent(item)"
              class="clock"
              :class="{
                '!border-r-0': iidx === attributes?.length - 1,
                'bg-zinc-100/50': isBeforeToday(item.time),
                'doubleHeight': isCBRDStylist,
              }"
            ></div>
          </div>
        </div>
        <!-- 資料 -->

        <template v-for="(item, index) in week">
          <template v-if="item.data.length === 1">
            <!--  -->
            <div
              :key="`resultItem${index}`"
              :class="[
                item.data[0].customData.class,
                item.data[0].customData.specialClass,
                {
                  'items-center':
                    item.data[0].customData.nameToDisplay.length < 4,
                },
              ]"
              class="cusName absolute inset-x-1 box-border flex flex-col justify-center overflow-hidden break-all rounded-lg text-center text-xs font-bold"
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
              class="absolute inset-x-1 flex gap-1"
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
                class="cusName flex grow flex-col justify-center overflow-hidden rounded-lg text-center text-xs"
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
      type: [Number, String],
    },
    weekLst: {
      type: [Array],
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
    startTimeOBJ: {
      type: [Object],
      required: true,
    },
    endTimeOBJ: {
      type: [Object],
      required: true,
    },
    month: {
      type: String,
    },
    isCBRDStylist: {
      type: Boolean,
    },
  },
  mounted() {
    this.$on('updateDesignerBooking', () => {
      this.getDesignerBookingTimesWithRange();
    });
  },
  data() {
    return {
      weekNo: ['日', '一', '二', '三', '四', '五', '六'],
      designerBookingList: '',
      editHoliday: {
        start: '',
        end: '',
        open: false,
      },
    };
  },
  methods: {
    morethanone(data) {
      return data.length > 1;
    },

    // 點擊的時候把當天的時間往上傳

    backtoToday() {
      // this.currentDay = this.$dayjs().format('YYYY-MM-DD');
      this.$emit('input', 0);
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
            title: `${attr.customData.nameToDisplay}`,
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
              await this.$api.adminBookingTime({
                designerId: this.userInfo.user.id,
                datetime: attr.customData.start,
                appointable: true,
              });
              await this.manaulUpdateFormResult();
              this.showData = this.showData?.filter(
                (item) => item.key !== attr.key,
              );
            }
          }); */
      } else {
        const path = attr.customData.type === 'EVENT'
          ? 'ScheduleBreak-EventDetail'
          : 'ScheduleBreak-Detail';
        this.$router.push({ name: path, query: { id: attr.key } });
      }
    },
    preNextWeek(num) {
      this.$emit('input', this.value + num);
    },
    // emit事件方法
    createEvent(item) {
      if (!item) return;
      const selectDate = this.$dayjs(item.time);
      if (this.$dayjs(selectDate).isBefore(this.$dayjs(), 'day')) {
        return;
      }
      const designerBooking = item.designerBookingList;
      const selectTime = selectDate.format('HH:mm');
      const oppointment = {
        orderDate: selectDate.$d,
        orderTime: selectTime,
        status: designerBooking,
      };
      this.$emit('setAppointmentData', oppointment);
      this.$emit('IsDirect', item);
    },
    async getDesignerBookingTimesWithRange() {
      const submitForm = {
        designerId: this.userInfo.user.id,
        storeId: this.currentMechantId,
        dateRange: {
          startDate: this.$dayjs(this.weekLst[0]).valueOf(),
          endDate: this.$dayjs(this.weekLst[6]).valueOf(),
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
    formatSideListTime() {
      const newList = [];
      for (let i = 0; i <= this.totalhours * 2 + 1; i += 2) {
        const newTime = this.$dayjs(this.startTimeOBJ)
          .add(i * 30, 'minute')
          .format('HH:mm');
        newList.push(newTime);
      }
      return newList;
    },
    totalhours() {
      const start = this.startTimeOBJ
        .year(this.endTimeOBJ.$y)
        .month(this.endTimeOBJ.$M)
        .date(this.endTimeOBJ.$D);
      let end = this.endTimeOBJ;
      if (
        this.endTimeOBJ.$H === 0
        && this.endTimeOBJ.$m === 0
        && this.endTimeOBJ.$s === 0
      ) {
        end = this.endTimeOBJ.add(1, 'day');
      }
      return end.diff(start, 'hour', true);
    },
    formData() {
      const list = [];
      for (let i = 0; i < this.weekLst.length; i++) {
        let daylist = [];
        const hour = this.startTimeOBJ.$H;
        const min = this.startTimeOBJ.$m;
        const time = this.$dayjs(this.weekLst[i])
          .set('hour', hour)
          .set('minute', min)
          .set('second', 0)
          .set('millisecond', 0)
          .valueOf();
        for (let j = 0; j <= this.totalhours * 2; j++) {
          const eachTime = this.$dayjs(time)
            .add(30 * j, 'minute')
            .valueOf();
          const designerBookingList = this.designerBookingList[
            i
          ].bookingTimes.find((item) => item.time === eachTime);
          const data = {
            time: eachTime,
            designerBookingList,
          };
          daylist.push(data);
        }
        list.push(daylist);
        daylist = [];
      }
      return list;
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

<style>
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
  border-radius: 50%;
  inset: 0;
  margin: auto;
  z-index: -1;
}

.clck {
  transform: translateY(-22px);
  text-align: left;
}

.clock {
  @apply h-[20px] relative border-b-0 border-l-0;
  border-right: 1px solid #f3f4f6;
  line-height: 40px;
}

.doubleHeight {
  @apply !h-[40px]
}

.spanPosition {
  height: 80px;
}

.dottedLine :nth-child(odd) > .clock {
  border-bottom: 1px dashed #f3f4f6;
}

.dottedLine :nth-child(even) > .clock {
  border-bottom: 1px solid #d1d5db;
}

.dottedLine :first-child > .clock {
  border-top: 1px solid #d1d5db;
}

.clock span {
  position: absolute;
  top: -55%;
  left: 0;
  background-color: #fff;
  width: 22px;
}

@media screen and (max-width: 425px) {
  .cusName{
    font-size: .6rem;
  }
}

@media screen and (max-width: 375px) {
  .cusName {
    font-size: .47rem;
  }
  .time {
    word-wrap: initial;
    font-size: .7rem;
  }
}

</style>
