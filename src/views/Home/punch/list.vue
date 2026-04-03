<template>
  <C-Main-Block>
    <C-Back-Nav
      :routeTarget="{ name: 'Punch' }"
      :title="'打卡清單'"
    ></C-Back-Nav>
    <section class="mx-auto mt-20 w-full max-w-screen-md px-5 lg:mt-24 lg:px-10">
      <div
        class="month-p relative mb-4 flex items-center justify-between gap-2"
      >
        <month-picker-input
          lang="zh"
          :input-pre-filled="true"
          :default-month="+this.$dayjs().month() + 1"
          :default-year="+$dayjs(new Date()).format('YYYY')"
          @change="showDate"
          class="!w-full font-bold"
          :months="month"
        />
      </div>
      <div class="card card-body">
        <div
          class="text-sm"
          v-if="
            Array.isArray(ListHasResultAttendanceRecords) &&
            ListHasResultAttendanceRecords.length > 0
          "
        >
          <div
            v-for="(item, key) in ListHasResultAttendanceRecords"
            :key="`resultAttendance${key}`"
            class="text-xs"
          >
            <div
              class="relative mb-1 p-2 text-left text-lg font-bold text-meimate-pink"
            >
              {{ item.date | dateFmtMMDDdddot }}
            </div>
            <div
              v-for="(
                clockInRecordItem, clockInRecordIndex
              ) in item.clockInRecord"
              :key="`clockInRecordItem${clockInRecordIndex}`"
              class="mb-2 p-2"
            >
              <!-- {{clockInRecordItem}} -->
              <template v-if="clockInRecordItem.in">
                <div class="section-block bg-meimate-beige/50">
                  <!-- 時間 -->
                  <div class="flex items-center gap-1 font-bold tracking-wider">
                    <img
                      src="@/static/images/work.svg"
                      alt="work"
                      class="size-4 object-contain"
                    />
                    {{ clockInRecordItem.in.time | dateFmtHm }}
                    <p class="">上班</p>
                  </div>
                  <!-- 項目 -->
                  <div class="flex items-center gap-1">
                    <img
                      src="@/static/images/location.svg"
                      alt="location"
                      class="size-4 object-contain"
                    />
                    <span
                      class="min-w-16 truncate"
                      :class="[
                        {
                          'text-meimate-green':
                            clockInRecordItem.in.distanceValue ===
                            'LOWERTHAN25',
                        },
                        {
                          'text-meimate-yellow':
                            clockInRecordItem.in.distanceValue ===
                            'BETWEEN25AND50',
                        },
                        {
                          'text-gray':
                            clockInRecordItem.in.distanceValue === 'NULL',
                        },
                        {
                          'text-rejectText':
                            clockInRecordItem.in.distanceValue === 'MORETHAN50',
                        },
                      ]"
                      >{{ alternate(clockInRecordItem.in.distanceValue) }}</span
                    >
                  </div>
                  <div
                    class="flex items-center gap-1"
                    :class="{ 'text-rejectText': item.lateMinutes > 0 }"
                  >
                    <img
                      src="@/static/images/clock-regular.svg"
                      alt="clock-regular"
                      class="size-4 object-contain"
                    />
                    <p class="min-w-1.25rem">
                      {{
                        clockInRecordIndex === 0
                          ? item.lateMinutes + "分"
                          : "----"
                      }}
                    </p>
                  </div>
                  <div class="">
                    <img
                      src="@/static/images/lateCheck.svg"
                      alt="lateCheck"
                      class="shrink-0 object-contain"
                      v-if="item.isLate"
                    />
                    <img
                      src="@/static/images/successCheck.svg"
                      alt="successCheck"
                      class="shrink-0 object-contain"
                      v-else
                    />
                  </div>
                </div>
              </template>
              <template v-if="clockInRecordItem.breakRecord">
                <template
                  v-for="(
                    breakRecord, breakRecordIndex
                  ) in clockInRecordItem.breakRecord"
                >
                  <div
                    class="section-block"
                    v-if="breakRecord.start"
                    :key="`breakRecordSatrt${breakRecordIndex}`"
                  >
                    <div
                      class="flex items-center gap-1 font-bold tracking-wider"
                    >
                      <img
                        src="@/static/images/walking-arrow-right.svg"
                        alt=""
                        class="size-4 object-contain"
                      />
                      {{ breakRecord.start.time | dateFmtHm }}
                      <p>外出</p>
                    </div>
                    <div class="flex items-center gap-1">
                      <img
                        src="@/static/images/location.svg"
                        alt="location"
                        class="size-4 object-contain"
                      />
                      <span
                        class="min-w-16 truncate"
                        :class="[
                          {
                            'text-meimate-green':
                              breakRecord.start.distanceValue === 'LOWERTHAN25',
                          },
                          {
                            'text-meimate-yellow':
                              breakRecord.start.distanceValue ===
                              'BETWEEN25AND50',
                          },
                          {
                            'text-gray':
                              breakRecord.start.distanceValue === 'NULL',
                          },
                          {
                            'text-rejectText':
                              breakRecord.start.distanceValue === 'MORETHAN50',
                          },
                        ]"
                        >{{ alternate(breakRecord.start.distanceValue) }}</span
                      >
                    </div>
                    <div class="flex items-center gap-1">
                      <img
                        src="@/static/images/clock-regular.svg"
                        alt="clock-regular"
                        class="size-4 object-contain"
                      />
                      <p class="min-w-1.25rem">----</p>
                    </div>
                    <img
                      src="@/static/images/successCheck.svg"
                      class="shrink-0 object-contain"
                      alt="successCheck"
                    />
                  </div>

                  <div
                    class="section-block bg-meimate-beige/50"
                    v-if="breakRecord.end"
                    :key="`breakRecordEnd${breakRecordIndex}`"
                  >
                    <div
                      class="flex items-center gap-1 font-bold tracking-wider"
                    >
                      <img
                        src="@/static/images/walking-arrow-right.svg"
                        alt=""
                        class="size-4 object-contain"
                      />
                      {{ breakRecord.end.time | dateFmtHm }}
                      <p>歸來</p>
                    </div>
                    <div class="flex items-center gap-1">
                      <img
                        src="@/static/images/location.svg"
                        alt="location"
                        class="size-4 object-contain"
                      />
                      <span
                        class="min-w-16 truncate"
                        :class="[
                          {
                            'text-meimate-green':
                              breakRecord.end.distanceValue === 'LOWERTHAN25',
                          },
                          {
                            'text-meimate-yellow':
                              breakRecord.end.distanceValue ===
                              'BETWEEN25AND50',
                          },
                          {
                            'text-gray':
                              breakRecord.end.distanceValue === 'NULL',
                          },
                          {
                            'text-rejectText':
                              breakRecord.end.distanceValue === 'MORETHAN50',
                          },
                        ]"
                        >{{ alternate(breakRecord.end.distanceValue) }}</span
                      >
                    </div>
                    <div class="flex items-center gap-1">
                      <img
                        src="@/static/images/clock-regular.svg"
                        alt="clock-regular"
                        class="size-4 object-contain"
                      />
                      <p class="min-w-1.25rem">----</p>
                    </div>
                    <div class="">
                      <img
                        src="@/static/images/lateCheck.svg"
                        alt="lateCheck"
                        class="shrink-0 object-contain"
                        v-if="breakRecord.end.isLate"
                      />
                      <img
                        src="@/static/images/successCheck.svg"
                        alt="successCheck"
                        class="shrink-0 object-contain"
                        v-else
                      />
                    </div>
                  </div>
                </template>
              </template>
              <template v-if="clockInRecordItem.out">
                <div class="section-block">
                  <div class="flex items-center gap-1 font-bold tracking-wider">
                    <img
                      src="@/static/images/work.svg"
                      alt="work"
                      class="size-4 object-contain"
                    />
                    {{ clockInRecordItem.out.time | dateFmtHm }}
                    <p>下班</p>
                  </div>
                  <div class="flex items-center gap-1">
                    <img
                      src="@/static/images/location.svg"
                      alt="location"
                      class="size-4 object-contain"
                    />
                    <span
                      class="min-w-16 truncate"
                      :class="[
                        {
                          'text-meimate-green':
                            clockInRecordItem.out.distanceValue ===
                            'LOWERTHAN25',
                        },
                        {
                          'text-meimate-yellow':
                            clockInRecordItem.out.distanceValue ===
                            'BETWEEN25AND50',
                        },
                        {
                          'text-gray':
                            clockInRecordItem.out.distanceValue === 'NULL',
                        },
                        {
                          'text-rejectText':
                            clockInRecordItem.out.distanceValue ===
                            'MORETHAN50',
                        },
                      ]"
                      >{{
                        alternate(clockInRecordItem.out.distanceValue)
                      }}</span
                    >
                  </div>
                  <div class="flex items-center gap-1">
                    <img
                      src="@/static/images/clock-regular.svg"
                      alt="clock-regular"
                      class="size-4 object-contain"
                    />
                    <p class="min-w-1.25rem">----</p>
                  </div>
                  <div class="">
                    <img
                      src="@/static/images/lateCheck.svg"
                      alt="lateCheck"
                      class="shrink-0 object-contain"
                      v-if="item.isLeaveEarly"
                    />
                    <img
                      src="@/static/images/successCheck.svg"
                      alt="successCheck"
                      class="shrink-0 object-contain"
                      v-else
                    />
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div v-else class="mt-3">
          <div
            class="flex h-20 items-center justify-center text-lg font-bold text-meimate-blue-gray"
          >
            <img src="@/static/images/file.svg" alt="" class="mr-2" />查無資料
          </div>
        </div>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { MonthPickerInput } from 'vue-month-picker';

export default {
  name: 'punch-list',
  description: '打卡列表',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 打卡',
  },
  components: {
    MonthPickerInput,
  },
  data() {
    return {
      resultAttendance: [],
      date: {
        from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        to: new Date(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      },
    };
  },
  mounted() {
    const ML_DESIGN = JSON.parse(localStorage.getItem('ML_DESIGN'));
    const auth = ML_DESIGN.userAuthorizeList.find(
      (item) => item.pageName === '詳細打卡紀錄',
    );
    if (!auth) this.doRoute();
    this.init();
  },
  methods: {
    async init() {
      await Promise.all([this.getAttendanceRecords()]).then(() => {});
    },
    async getAttendanceRecords() {
      const sumbitAttendanceRecordsForm = {
        userId: this.userInfo.user.id,
        dateRange: {
          startDate: this.$dayjs(this.date.from).startOf('month').valueOf(),
          endDate: this.$dayjs(this.date.to)
            .add(-1, 'day')
            .endOf('month')
            .valueOf(),
        },
        pageLimit: 1000,
      };
      const resp = await this.$api.attendanceRecords(
        sumbitAttendanceRecordsForm,
      );
      const { data, errors } = resp.data;
      if (errors) return;
      const [resultAttendance = {}] = data.attendanceRecords;

      this.resultAttendance = resultAttendance.attendanceRecord
        ? resultAttendance.attendanceRecord
        : [];
    },
    doRoute() {
      this.$router.push({ name: 'Punch' });
    },
    showDate(date) {
      this.date = date;
      this.getAttendanceRecords();
    },
    alternate(data) {
      const actions = new Map([
        ['NULL', '無GPS座標'],
        ['LOWERTHAN25', '距離 < 25m'],
        ['BETWEEN25AND50', '距離 25m-50m'],
        ['MORETHAN50', '距離 > 50m'],
      ]);
      const date = actions.get(data);

      return date;
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo', 'currentMechantId']),
    ...mapGetters('userInfo', ['GETTER_MECHANTNAME']),
    ListHasResultAttendanceRecords() {
      const ListHasResultAttendanceRecords = this.resultAttendance.filter(
        (records) => Array.isArray(records.clockInRecord)
          && records.clockInRecord.length > 0,
      );
      return ListHasResultAttendanceRecords;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .month-picker-input {
  padding: 0.75rem 1.5rem;
  width: 100%;
  border: none;
  border-radius: 9999px;
  @apply text-base;
}

::v-deep .month-picker-input:focus {
  box-shadow: none;
}

::v-deep .month-picker__month {
  border-radius: 100px;
  padding: 0.2rem 0;
  color: #cacaca;
  border: none;
  margin-bottom: 5px;
}

::v-deep .month-picker__month.selected {
  background-color: #222c4c;
  color: #fff;
  box-shadow: none;
}

::v-deep .month-picker__container {
  top: 100%;
  z-index: 1;
  border-radius: 20px;
  box-shadow: 1px 2px 5px rgb(0 0 0 / 10%);
  width: 100%;
  left: 0;
  right: 0;
  margin: auto;
  padding: 1rem;
  background-color: #fff !important;
}

::v-deep .month-picker__container button {
  background-color: #fff;
  border: none;
  top: 21px;
  width: 30px;
}

::v-deep .month-picker__container p {
  background-color: #fcfcfc;
}

::v-deep .month-picker__year {
  box-shadow: none;
}

::v-deep .month-picker {
  border-radius: 0 0 20px 20px;
  box-shadow: none;
}

.section-block {
  @apply mb-2 py-2 grid grid-flow-col gap-1 items-center;
}

.section-block:last-child {
  @apply mb-0 pb-0;
}
</style>
