<template>
  <C-Main-Block>
    <C-Back-Nav :title="'排班表'"></C-Back-Nav>
    <section class="relative mx-auto mt-20 w-full max-w-screen-md px-5 lg:mt-24 lg:px-10">
      <div class="card card-body !px-2">
        <div
          style="border-color: #aaa"
          class="flex gap-2 overflow-scroll border-b p-1 pb-3"
          v-if="clockInSettings.length"
        >
          <div
            class="w-24 shrink-0 rounded-md text-center text-xs font-bold"
            :class="[`bg-[${item.color}]`, getTextColor(item.color)]"
            :key="item.id"
            v-for="item in clockInSettings"
          >
            <p class="truncate">{{ item.name }}</p>
            <p>{{ scheduleTime(item) }}</p>
          </div>
        </div>
        <vc-date-picker
          locale="zh-TW"
          class="custom-calendar max-w-full pt-0"
          is-expanded
          :value="date"
          :masks="masks"
          @update:to-page="swipeMonth($event)"
        >
          <template v-slot:header="{ year, month }">
            <div class="py-4 text-center font-sans !text-lg !font-medium">
              <span>{{ year }}</span>
              <span class="pl-4">{{ month }}月 </span>
            </div>
          </template>
          <template v-slot:day-content="{ day }">
            <div
              class="flex flex-col items-center justify-start truncate !bg-white"
              @click="dayClick(day.date)"
              @keypress="dayClick(day.date)"
            >
              <p
                :class="[getStyle(day.date)]"
                class="day-label relative z-[1] my-2 w-full text-center font-arial text-sm font-bold"
              >
                {{ day.day }}
              </p>
            </div>
          </template>
        </vc-date-picker>
      </div>
      <C-Modal-Dialog v-model="open" width="w-10/12" @close="open = false" :title="dateTitle">
        <div class="text-gray-dark text-start text-lg">
          <template v-if="modalData.clockInSetting">
            <p>班別名稱：{{ modalData.clockInSetting.name }}</p>
            <p>班別時間：{{ scheduleTime() }}</p>
          </template>
          <p v-else>無班別</p>
          <p>遲到時間：{{ modalData.lateMinutes }}</p>
        </div>
        <template #footer>
          <div class="card-footer item-center flex gap-4 !py-4">
            <button
              @click="open = false"
              @keypress="open = false"
              class="w-full rounded-3xl bg-meimate-pink py-3 font-bold text-white shadow-meimate-button"
            >
              關閉
            </button>
          </div>
        </template>
      </C-Modal-Dialog>
    </section>
  </C-Main-Block>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'employee-schedule-index',
  description: '排班表的首頁',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 排班表',
  },

  data() {
    return {
      masks: {
        weekdays: 'W',
      },
      date: new Date(new Date().getFullYear(), new Date().getMonth()).getTime(),
      open: false,
      clockInSettings: [],
      schedule: [],
      modalData: {},
    };
  },
  mounted() {},
  methods: {
    dayClick(dateTime) {
      const findData = this.schedule.find(({ date }) => date === new Date(dateTime).getTime());
      if (findData) {
        this.modalData = findData;
        this.open = true;
      }
    },
    swipeMonth({ month, year }) {
      this.date = new Date(year, month - 1);
    },
    async handleGetSchedule() {
      const inputData = {
        userId: this.userInfo.user.id,
        dateRange: {
          startDate: this.$dayjs(this.date).startOf('month').valueOf(),
          endDate: this.$dayjs(this.date).endOf('month').valueOf(),
        },
      };
      const res = await this.$api.attendanceRecordsForSchedule(inputData);
      const data = res.data.data.attendanceRecords[0]?.attendanceRecord || [];
      this.schedule = data;
      this.clockInSettings = res.data.data.attendanceRecords[0]?.clockInSettings || [];
    },
    getTextColor(color) {
      const arr = ['#ffc107', '#ffeb3b', '#fbeb61'];
      if (arr.includes(color)) {
        return 'text-black';
      }
      return 'text-white';
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo']),
    getStyle() {
      return (dateTime) => {
        const findData = this.schedule.find(({ date }) => date === new Date(dateTime).getTime());
        if (findData && findData.clockInSetting) {
          const textColor = this.getTextColor(findData.clockInSetting.color);
          return ` after:contents-[''] ${textColor} after:absolute  after:inset-0 after:z-[-1]  after:m-auto after:size-[26px]  after:rounded-[50%] after:bg-[${findData.clockInSetting.color}]`;
        }
        return '';
      };
    },
    dateTitle() {
      if (this.modalData.date) {
        return this.$dayjs(this.modalData.date).format('YYYY年MM月DD日');
      }
      return '';
    },
    scheduleTime() {
      return (data) => {
        const clickData = data || this.modalData.clockInSetting;
        if (!clickData) return '';
        const clockInHour = clickData.clockInHour.toString().padStart(2, '0');
        const clockInMinute = clickData.clockInMinute.toString().padStart(2, '0');
        const clockOutHour = clickData.clockOutHour.toString().padStart(2, '0');
        const clockOutMinute = clickData.clockOutMinute.toString().padStart(2, '0');
        const timeRange = `${clockInHour}:${clockInMinute}~${clockOutHour}:${clockOutMinute}`;
        return timeRange;
      };
    },
  },
  watch: {
    date: {
      handler() {
        this.handleGetSchedule();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .vc-arrows-container {
  padding: 1rem 0 !important;
}

::v-deep.vc-container {
  border: none;
}

::v-deep .vc-arrow:hover {
  background-color: transparent;
}

::v-deep div[class^="vc-weekday"] {
  @apply text-xs text-[#78829d] first:rounded-l-lg py-4;
}

::v-deep .vc-weekday {
  @apply rounded-r-lg;
}

::v-deep .in-next-month {
  display: none;
}

::v-deep .vc-arrow {
  @apply p-[0.0625rem];
}

::v-deep .vc-weeks {
  @apply p-0;
}

::v-deep .vc-day {
  @apply max-w-[3rem];
}

.bdrop {
  position: fixed;
  inset: -900px;
  background-color: #0002;
  z-index: 1;
}
</style>
