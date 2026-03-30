<template>
  <!-- 排休清單，沒用到，進入點同新增預約、新增事件 清單 -->
  <C-Main-Block>
    <C-Back-Nav :title="'行事曆'"></C-Back-Nav>
    <section
      class="relative mx-auto mt-20 w-full max-w-screen-md px-5 lg:mt-40 lg:px-10"
    >
      <div class="mb-4 flex items-center justify-between gap-2">
        <C-vc-calendar-select v-model="date"></C-vc-calendar-select>
        <i
          class="bi text-2xl"
          :class="isActiveCalendar ? 'bi-list-ul' : 'bi-calendar-event'"
          @click="isActiveCalendar = !isActiveCalendar"
          @keypress="isActiveCalendar = !isActiveCalendar"
        />
      </div>

      <transition name="collapseTransition">
        <vc-calendar
          v-show="isActiveCalendar"
          is-expanded
          :attributes="attrs"
          class="relative mb-6 mt-[50px]"
        >
          <template
            v-slot:header="{ year, monthLabel, movePrevMonth, moveNextMonth }"
          >
            <div
              class="absolute inset-x-0 top-[-50px] flex items-center justify-between"
            >
              <span
                @click="movePrevMonth"
                @keypress="movePrevMonth"
                class="ml-0 text-xl"
              >
                <i class="bi bi-chevron-left"/>
              </span>
              <div class="flex items-center justify-center">
                <span class="font-bold">{{ year | dateFormat }}年</span>
                <span class="ml-2 text-2xl font-bold">{{ monthLabel }}</span>
              </div>
              <span
                @click="movePrevMonth"
                @keypress="moveNextMonth"
                class="mr-0 text-xl"
              >
                <i class="bi bi-chevron-right"/>
              </span>
            </div>
          </template>

          <template v-slot:header-left-button>
            <div class="hidden"></div>
          </template>

          <template v-slot:header-right-button>
            <div class="hidden"></div>
          </template>
        </vc-calendar>
      </transition>

      <div class="text-left text-sm">
        <div
          class="mb-3 flex cursor-pointer items-center justify-between border-b border-solid border-primary"
        >
          <div class="w-1/6">項次</div>
          <div class="w-2/6">排休日期</div>
          <div class="w-3/6">時段</div>
        </div>
        <div v-if="isReviewResult">
          <!-- eslint-disable-next-line -->
          <div
            v-for="(reviewItem, index) in reviewResult"
            :key="`reviewItem${index}`"
            @click="doRoute(reviewItem)"
            @keypress="doRoute(reviewItem)"
            class="mb-3 flex cursor-pointer items-center justify-between border-b border-solid border-primary/50 py-1"
          >
            <div class="w-1/6">{{ +index + 1 }}</div>
            <div class="w-2/6">{{ reviewItem.date | dateFmtROCMMDDdd }}</div>
            <div class="w-3/6">{{ reviewItem.time }}</div>
          </div>
        </div>
        <div v-else class="my-3 pl-2">尚未有排休資料</div>
      </div>

      <div class="fixed bottom-[100px] w-[calc(100%-24px)]">
        <div
          class="w-full cursor-pointer bg-second px-4 py-2 text-white"
          @click="doRoute({ name: 'ScheduleBreak-List' })"
          @keydown="doRoute({ name: 'ScheduleBreak-List' })"
        >
          排休申請
        </div>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
export default {
  name: 'schedule-index',
  description: '行事曆的排休清單',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 排休清單',
  },
  data() {
    return {
      isActiveCalendar: false,
      searchCtx: '',
      selectedDate: null,
      filteredOptions: {},
      date: new Date(),
      // TODO: reviewResult 跟 orderResult 可能是用 狀態來判斷。若是 調整 computed
      reviewResult: [
        {
          date: '2022-05-22',
          time: '10:00 - 14:00',
        },
        {
          date: '2022-05-21',
          time: '10:00 - 14:00',
        },
        {
          date: '2022-05-20',
          time: '整日',
        },
        {
          date: '2022-05-19',
          time: '整日',
        },
        {
          date: '2022-04-30',
          time: '10:00 - 14:00',
        },
      ],
      attrs: [
        {
          key: 'today',
          dot: {
            color: 'orange',
            fillMode: 'solid',
          },
          color: 'green',
          fillMode: 'solid',
          dates: new Date(),
        },
      ],
    };
  },
  methods: {
    doRoute(item) {
      this.$router.push({ name: item.name });
    },
  },
  computed: {
    filteredOptionsLength() {
      return Object.keys(this.filteredOptions).length;
    },
    isReviewResult() {
      return this.reviewResult.length;
    },
  },
};
</script>
