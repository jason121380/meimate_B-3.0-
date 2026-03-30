<template>
  <C-Main-Block>
    <C-Back-Nav
      :routeTarget="{ name: 'ScheduleBreak' }"
      :title="'我的排休'"
    ></C-Back-Nav>
    <section
      class="relative mx-auto mt-20 w-full max-w-screen-md px-5 lg:mt-40 lg:px-10"
    >
      <div class="card">
        <div class="card-body !block !p-4">
          <!-- 年月區塊 -->
          <div
            class="flex items-center justify-between pb-4 text-center font-bold"
          >
            <i
              @click="preWeek"
              @keypress="preWeek"
              class="bi bi-chevron-left p-2 text-[#9ca3af]"
            />
            <div class="flex items-center gap-4 text-lg font-medium">
              <span class="">{{ handleShowData("YYYY") }}</span>
              <span class="">{{ handleShowData("MM") }}月 </span>
            </div>
            <i
              @click="nextWeek"
              @keypress="nextWeek"
              class="bi bi-chevron-right p-2 text-[#9ca3af]"
            />
          </div>

          <div>
            <div>
              <div
                class="flex items-center justify-between font-bold text-gray"
              >
                <ul class="mb-2 flex grow items-center justify-end pb-2 pt-4">
                  <li
                    class="w-[12.75%] text-center text-xs"
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
                        $dayjs(item).format('YYYY-MM-DD') ===
                        $dayjs().format('YYYY-MM-DD'),
                    }"
                    class="w-[12.75%] text-center text-xs"
                    v-for="(item, index) in weekLst"
                    :key="`week${index}`"
                  >
                    {{ $dayjs(item).format("D") }}
                  </li>
                </ul>
              </div>
            </div>
            <!-- 勾勾 -->
            <div class="mb-5 flex items-center justify-between">
              <ul class="flex w-full items-center justify-end font-bold">
                <li
                  class="w-[12.75%] text-center"
                  v-for="(_, index) in 7"
                  :key="index + 'val'"
                  @click="toggleAllDate(BreakWrap[index], weekLst[index])"
                  @keypress="toggleAllDate(BreakWrap[index], weekLst[index])"
                >
                  <label for="BreakWrap" class="hidden"></label>
                  <input
                    type="checkbox"
                    :checked="BreakWrap[index] ? true : false"
                    class="pointer-events-none rounded-lg accent-meimate-pink"
                    :name="index"
                  />
                </li>
              </ul>
            </div>
            <!-- body -->

            <ul
              class="time flex w-full flex-1 items-center"
              v-for="(item, index) in restructureScheduleTableWithTimeList"
              :key="`resultItem${index}`"
            >
              <li
                class="h-8 w-[12.75%] min-w-8 shrink-0 -translate-y-1/2 whitespace-nowrap text-center text-xs font-bold leading-8 text-meimate-pink"
              >
                {{ item.isHide ? "" : item.time }}
              </li>
              <li
                class="flex h-8 w-[12.75%] min-w-10 items-center justify-center border-r border-t border-[#d1d5db] last:border-r-0"
                @click="toggle(innerItem, index, innerIndex)"
                @keypress="toggle(innerItem, index, innerIndex)"
                v-for="(innerItem, innerIndex) in item.date"
                :key="`innerItem${innerIndex}`"
              >
                <img
                  src="@/static/images/rest.svg"
                  alt="rest"
                  class="size-6 shrink-0 object-contain"
                  v-if="
                    innerItem &&
                    (innerItem.statusComment === '該時段排休' ||
                      innerItem.statusComment === '該時段公休' ||
                      innerItem.statusComment === '本日公休' ||
                      innerItem.statusComment === '店家不接受預約')
                  "
                />
              </li>
            </ul>
          </div>
        </div>
        <div class="card-footer">
          <div>
            <p class="pb-4 text-lg font-medium">固定公休時間</p>
            <div class="flex flex-wrap gap-2">
              <template v-if="Array.isArray(regularHolidayList.allDay)">
                <ul class="flex flex-wrap items-center gap-2">
                  <li
                    v-for="(holiday, index) in regularHolidayList.allDay"
                    :key="`allholiday${index}`"
                    class="relative rounded-full bg-meimate-yellow px-3 py-2 text-sm text-white"
                  >
                    <div
                      class="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-meimate-blue-gray p-1 font-bold"
                    >
                      <img
                        @click="toggleRemove('remove', holiday, true)"
                        @keypress="toggleRemove('remove', holiday, true)"
                        src="@/static/images/close.svg"
                        alt="close"
                        class="object-contain"
                      />
                    </div>
                    {{ holiday }}
                  </li>
                </ul>
              </template>
              <template v-if="Array.isArray(regularHolidayList.specificTime)">
                <ul class="flex flex-wrap items-center gap-2">
                  <li
                    v-for="(holiday, index) in regularHolidayList.specificTime"
                    :key="`holiday${index}`"
                    class="relative rounded-full bg-meimate-yellow px-3 py-2 text-sm text-white"
                  >
                    <div
                      class="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-meimate-blue-gray p-1 font-bold"
                    >
                      <img
                        @click="toggleRemove('remove', holiday, false)"
                        @keypress="toggleRemove('remove', holiday, false)"
                        src="@/static/images/close.svg"
                        alt="close"
                        class="object-contain"
                      />
                    </div>
                    <span
                      >{{ holiday.week }} {{ holiday.startHour }}:{{
                        holiday.startMinute >= 10
                          ? holiday.startMinute
                          : `0${holiday.startMinute}`
                      }}~{{ holiday.endHour }}:{{
                        holiday.endMinute >= 10
                          ? holiday.endMinute
                          : `0${holiday.endMinute}`
                      }}</span
                    >
                  </li>
                </ul>
              </template>
            </div>
          </div>

          <button
            class="mt-8 w-full rounded-3xl bg-meimate-pink px-5 py-3 text-sm font-bold text-white"
            v-ripple="100"
            @click="toggleSys"
          >
            設定整日／固定公休時間
          </button>
        </div>
      </div>
    </section>

    <C-Modal-Dialog
      @close="dialogStatus = false"
      v-model="dialogStatus"
      :title="'設定整日 / 固定公休日期'"
    >
      <div class="flex w-full justify-center gap-2 pb-5">
        <button
          @click="isAll = true"
          :class="
            isAll
              ? ' border-meimate-pink text-meimate-pink font-bold'
              : 'border-transparent text-meimate-blue-gray font-medium'
          "
          class="w-full border-b-2 pb-1 text-lg"
        >
          整日
        </button>
        <button
          @click="isAll = false"
          :class="
            !isAll
              ? ' border-meimate-pink text-meimate-pink font-bold'
              : 'border-transparent text-meimate-blue-gray font-medium'
          "
          class="w-full border-b-2 pb-1 text-lg"
        >
          時段
        </button>
      </div>
      <div v-if="isAll">
        <C-Select
          inputClasses="bg-meimate-white"
          :list="timeRepeat"
          v-model="seletedTimeRepeat"
          :placeholder="'選擇固定公休星期'"
          item-text="label"
          item-value="value"
          :isFull="true"
        ></C-Select>
      </div>
      <div v-else>
        <C-Select
          inputClasses="bg-meimate-white"
          :list="timeRepeat"
          v-model="unAllSeletedTimeRepeat"
          :placeholder="'選擇固定公休星期'"
          item-text="label"
          item-value="value"
          :isFull="true"
        ></C-Select>
        <div class="my-2 flex justify-between gap-2">
          <C-Select
            inputClasses="bg-meimate-white"
            :list="currentSetAllDatTimeRangeList"
            v-model="startTime"
            :placeholder="'開始時間'"
            :isFull="true"
            class="w-full"
          ></C-Select>
          <C-Select
            inputClasses="bg-meimate-white"
            :list="currentSetAllDatTimeRangeList"
            v-model="endTime"
            :placeholder="'結束時間'"
            :isFull="true"
            class="w-full"
          ></C-Select>
        </div>
      </div>

      <button
        class="mt-8 w-full rounded-3xl bg-meimate-pink px-5 py-3 text-sm font-bold text-white"
        v-ripple="100"
        @click="setRegularHoliday('add')"
      >
        確認
      </button>
    </C-Modal-Dialog>
  </C-Main-Block>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import time from '@/assets/constant/time';

export default {
  name: 'ScheduleBreak-holiday',
  description: '行事曆的排休',
  metaInfo: {
    title: 'Meimate 設計師',
    titleTemplate: '%s | 排休',
  },
  data() {
    return {
      seletedBreak: {
        sunDate: false,
        monDate: false,
        tueDate: false,
        wedDate: false,
        thuDate: false,
        friDate: false,
        satDate: false,
      },
      seletedTimeRepeat: '',
      unAllSeletedTimeRepeat: '',
      timeList: time,
      designerBookingList: [],
      period: 0,
      timeRepeat: [
        { label: '星期日', value: 'SUNDAY' },
        { label: '星期一', value: 'MONDAY' },
        { label: '星期二', value: 'TUESDAY' },
        { label: '星期三', value: 'WEDNESDAY' },
        { label: '星期四', value: 'THURSDAY' },
        { label: '星期五', value: 'FRIDAY' },
        { label: '星期六', value: 'SATURDAY' },
      ],
      weekNo: ['日', '一', '二', '三', '四', '五', '六'],
      isAll: true,
      startTime: '',
      endTime: '',
      regularHolidayList: { allDay: [], specificTime: [] },
      dialogStatus: false,
      seleted: false,
    };
  },
  mounted() {
    this.init();
  },
  activated() {
    this.init();
  },
  methods: {
    async init() {
      await Promise.all([
        this.getDesignerBookingTimesWithRange(),
        this.getRegularHoliday(),
      ]);
    },
    doRoute() {
      this.$router.push({ name: 'Punch' });
    },
    toggleRemove(type, holiday, isAllDay) {
      this.$swal
        .fire({
          html: `
            <div class="pt-8 text-center text-lg text-bold">確定要刪除嗎？</div>
        `,
          confirmButtonText: '確認',
          cancelButtonText: '取消',
          showConfirmButton: true,
          showCancelButton: true,
          showCloseButton: true,
          customClass: {
            confirmButton: '!bg-meimate-pink',
          },
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.setRegularHoliday(type, holiday, isAllDay);
          }
        });
    },
    async setRegularHoliday(type, holiday, isAllDay) {
      const submitForm = {
        designerId: this.userInfo.user.id,
        week: [],
        weekSpecificTime: [],
      };
      if (type === 'remove') {
        if (isAllDay) {
          submitForm.week = this.regularHolidayList.allDay.filter(
            (resultHoliday) => resultHoliday !== holiday,
          );
          submitForm.weekSpecificTime = this.regularHolidayList.specificTime;
        } else {
          submitForm.week = this.regularHolidayList.allDay;
          const weekSpecificTime = JSON.parse(
            JSON.stringify(this.regularHolidayList.specificTime),
          );
          const removeIndex = this.regularHolidayList.specificTime.findIndex(
            (item) => item.week === holiday.week
              && +item.startHour === holiday.startHour
              && +item.startMinute === holiday.startMinute
              && +item.endHour === holiday.endHour
              && +item.endMinute === holiday.endMinute,
          );
          if (removeIndex !== -1) {
            weekSpecificTime.splice(removeIndex, 1);
            submitForm.weekSpecificTime = weekSpecificTime;
          }
        }
      }
      if (type === 'add') {
        if (this.isAll) {
          let week = [];
          if (this.seletedTimeRepeat !== '') {
            week = this.regularHolidayList.allDay.concat(
              this.seletedTimeRepeat,
            );
          } else {
            this.$swal.fire({
              icon: 'warning',
              title: '請選擇星期',
              showConfirmButton: false,
              showCloseButton: true,
              timer: 3000,
              timerProgressBar: true,
            });
            return;
          }
          submitForm.week = [...new Set(week)];
          submitForm.weekSpecificTime = this.regularHolidayList.specificTime;
        } else {
          let weekSpecificTime = JSON.parse(
            JSON.stringify(this.regularHolidayList.specificTime),
          );
          if (
            this.unAllSeletedTimeRepeat !== ''
            && this.startTime !== ''
            && this.endTime !== ''
          ) {
            const weekSpecificTimeTemp = {
              week: this.unAllSeletedTimeRepeat,
              startHour: +this.startTime.split(':')[0],
              startMinute: +this.startTime.split(':')[1],
              endHour: +this.endTime.split(':')[0],
              endMinute: +this.endTime.split(':')[1],
            };
            const status = weekSpecificTime.find(
              (item) => item.week === weekSpecificTimeTemp.week
                && +item.startHour === weekSpecificTimeTemp.startHour
                && +item.startMinute === weekSpecificTimeTemp.startMinute
                && +item.endHour === weekSpecificTimeTemp.endHour
                && +item.endMinute === weekSpecificTimeTemp.endMinute,
            );
            if (!status) {
              weekSpecificTime = weekSpecificTime.concat(weekSpecificTimeTemp);
            }

            submitForm.weekSpecificTime = weekSpecificTime;
            submitForm.week = this.regularHolidayList.allDay;
          } else {
            this.$swal.fire({
              icon: 'warning',
              title: '請選擇星期與時間',
              showConfirmButton: false,
              showCloseButton: true,
              timer: 3000,
              timerProgressBar: true,
            });
            return;
          }
        }
      }
      const resp = await this.$api.setRegularHoliday(submitForm);
      const { data, errors } = resp.data;
      if (errors) return;
      console.log(data);
      this.seletedTimeRepeat = '';
      this.dialogStatus = false;
      this.$swal.fire({
        html: `
          <div class="text-center text-lg text-bold">設定成功</div>
        `,
        icon: 'success',
        showConfirmButton: false,
        showCloseButton: true,
        customClass: {
          confirmButton: '!bg-meimate-pink',
        },
        timerProgressBar: true,
        timer: 2500,
      });
      this.getDesignerBookingTimesWithRange();
      this.getRegularHoliday();
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
    toggleSys() {
      this.dialogStatus = !this.dialogStatus;
    },
    toggleAllDate(status, dateTime) {
      this.$swal
        .fire({
          title: ' ',
          showCloseButton: true,
          showCancelButton: true,
          html: `<div class="text-center text-lg text-bold">
               ${status ? '開啟' : '關閉'}全日預約
            </div>`,
          showConfirmButton: true,
          confirmButtonText: '確認',
          cancelButtonText: '取消',
          customClass: {
            confirmButton: '!bg-meimate-pink',
          },
        })
        .then(async (res) => {
          if (res.isConfirmed) {
            const submitForm = {
              designerId: this.userInfo.user.id,
              datetime: this.$dayjs(
                this.$dayjs(dateTime).format('YYYY-MM-DD'),
              ).valueOf(),
              appointable: status,
            };
            const resp = await this.$api.adminBookingTimeWholeDay(submitForm);
            const { errors } = resp.data;
            if (errors) return;
            await this.getDesignerBookingTimesWithRange();
          }
        });
    },
    toggle(innerItem) {
      // here
      if (!innerItem) return;
      this.$swal
        .fire({
          title: ' ',
          showCloseButton: true,
          html: `
            <div class="text-center text-lg text-bold">我要${
  innerItem.statusComment === null ? '關閉' : '開啟'
}預約</div>
            `,
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '確認',
          cancelButtonText: '取消',
          customClass: {
            confirmButton: '!bg-meimate-pink',
            cancelButton: '',
          },
        })
        .then(async (res) => {
          if (res.isConfirmed) {
            // this.resultList[index].date[innerIndex] = innerItem === '' ? true : '';
            await this.$api.adminBookingTime({
              designerId: this.userInfo.user.id,
              datetime: innerItem.time,
              appointable: innerItem.statusComment !== null,
            });
            await this.getDesignerBookingTimesWithRange();
            // this.$forceUpdate();
          }
        });
    },
    // async doAdminBookingTime() {

    // },
    async getRegularHoliday() {
      const resp = await this.$api.getRegularHolidaySetting({
        userId: this.userInfo.user.id,
      });
      const { data, errors } = resp.data;
      if (errors) return;
      this.regularHolidayList = data.getRegularHolidaySetting;
    },
    preWeek() {
      this.period -= 7;
    },
    nextWeek() {
      this.period += 7;
    },
    setTimeList() {
      // this.designerBookingList.flatMap((designerBookingListItem)=> ())
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
  },
  watch: {
    seletedBreak: {
      handler(value, valuenew) {
        console.log(value, valuenew);
      },
    },
    weekLst: {
      deep: true,
      handler() {
        this.getDesignerBookingTimesWithRange();
      },
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo', 'currentMechantId']),
    ...mapGetters('userInfo', ['GETTER_MECHANTNAME']),
    weekLst() {
      return [
        this.$dayjs(this.$dayjs().format('YYYY-MM-DD 00:00:00')).day(
          this.period,
        ),
        this.$dayjs(this.$dayjs().format('YYYY-MM-DD')).day(this.period + 1),
        this.$dayjs(this.$dayjs().format('YYYY-MM-DD')).day(this.period + 2),
        this.$dayjs(this.$dayjs().format('YYYY-MM-DD')).day(this.period + 3),
        this.$dayjs(this.$dayjs().format('YYYY-MM-DD')).day(this.period + 4),
        this.$dayjs(this.$dayjs().format('YYYY-MM-DD')).day(this.period + 5),
        this.$dayjs(this.$dayjs().format('YYYY-MM-DD 23:59:59')).day(
          this.period + 6,
        ),
      ];
    },
    restructureScheduleTableWithTimeList() {
      let timeList = [];
      let uniqueTimeList = [];
      let restructureScheduleTableWithTimeList = [];
      timeList = this.designerBookingList.flatMap((designerBookingListItem) => (!designerBookingListItem.bookingTimes
        ? []
        : designerBookingListItem.bookingTimes.flatMap((bookingTimesItem) => (!bookingTimesItem
          ? []
          : [
            this.$dayjs(bookingTimesItem.time).isValid()
              ? this.$dayjs(bookingTimesItem.time).format('HH:mm')
              : [],
          ]))));
      uniqueTimeList = [...new Set(timeList)];

      const [sun, mon, tue, wed, thu, fri, sat] = this.designerBookingList;

      restructureScheduleTableWithTimeList = uniqueTimeList.flatMap((HHmm) => {
        let [sunDate, monDate, tueDate, wedDate, thuDate, friDate, satDate] = [];
        sunDate = sun.bookingTimes.find(
          (item) => this.$dayjs(item.time).format('HH:mm') === HHmm,
        );
        monDate = mon.bookingTimes.find(
          (item) => this.$dayjs(item.time).format('HH:mm') === HHmm,
        );
        tueDate = tue.bookingTimes.find(
          (item) => this.$dayjs(item.time).format('HH:mm') === HHmm,
        );
        wedDate = wed.bookingTimes.find(
          (item) => this.$dayjs(item.time).format('HH:mm') === HHmm,
        );
        thuDate = thu.bookingTimes.find(
          (item) => this.$dayjs(item.time).format('HH:mm') === HHmm,
        );
        friDate = fri.bookingTimes.find(
          (item) => this.$dayjs(item.time).format('HH:mm') === HHmm,
        );
        satDate = sat.bookingTimes.find(
          (item) => this.$dayjs(item.time).format('HH:mm') === HHmm,
        );
        return [
          {
            time: HHmm,
            isHide: HHmm.split(':')[1] === '30',
            date: [
              sunDate,
              monDate,
              tueDate,
              wedDate,
              thuDate,
              friDate,
              satDate,
            ],
          },
        ];
      });
      return restructureScheduleTableWithTimeList;
    },
    BreakWrap() {
      const BreakWrap = this.designerBookingList.flatMap((item) => (Array.isArray(item.bookingTimes) && item.bookingTimes.length > 0
        ? [
          item.bookingTimes.every(
            (innerItem) => innerItem.statusComment !== null,
          ),
        ]
        : [false]));
      return BreakWrap;
    },
    currentSetAllDatTimeRangeList() {
      let currentSetAllDatTimeRangeList = [];
      if (Array.isArray(this.restructureScheduleTableWithTimeList)) {
        currentSetAllDatTimeRangeList = this.restructureScheduleTableWithTimeList.map((item) => item.time);
      }

      return currentSetAllDatTimeRangeList;
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  @apply w-[12.5%] border border-solid border-primary text-center;
}

// .time:nth-child(even) .line {
//   @apply border-t border-b border-dashed;
// }

// .time .line {
//   @apply w-[13.275%] border-r first-of-type:w-[2rem] h-8 leading-8 text-center first-of-type:border-t-0 first-of-type:border-b-0 first-of-type:border-r-0 last-of-type:border-r-0 text-meimate-pink  border-[#d1d5db] flex items-center justify-center;
// }

// .time:nth-child(even) .line {
//   @apply border-y border-dashed;
// }

// .time .line {
//   @apply w-[13.275%] border-r first-of-type:w-8 h-8 leading-8 text-center first-of-type:border-y-0 first-of-type:border-r-0 last-of-type:border-r-0 text-meimate-pink border-[#d1d5db] flex items-center justify-center;
// }

// .time .line img {
//   aspect-ratio: 1/1;
//   height: 1.5rem;
// }

// .line:first-of-type {
//   font-size: 10px;
//   transform: translateY(-50%);
// }

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

.regular-rest-time {
  @apply my-4;
  position: relative;
  text-indent: 0.5em;
}

.regular-rest-time::before {
  content: "";
  position: absolute;
  width: 2px;
  top: 3px;
  bottom: 3px;
  left: 0;
  border-radius: 2px;
  background-color: #000;
}

.swal2-styled.swal2-confirm.btn-confirm {
  background-color: #7d9ac5;
  display: block;
  width: 95px;
  margin: 1.5rem auto 1rem;
}
</style>
