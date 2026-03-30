<template>
  <div>
    <vc-date-picker
      locale="zh-TW"
      class="custom-calendar max-w-full pt-0"
      is-expanded
      :value="''"
      :attributes="attributesfilterdByCategories"
      :masks="masks"
      @update:to-page="swipeMonth($event)"
    >
      <template v-slot:header="{ year }">
        <div class="py-4 text-center font-sans !text-lg !font-medium">
          <span>{{ year }}</span>
          <span class="pl-4">{{ month }}月 </span>
        </div>
      </template>

      <template v-slot:day-content="{ day, attributes }">
        <div
          class="flex flex-col items-center justify-start truncate"
          @click="dayClick(day.date, attributes)"
          @keypress="dayClick(day.date, attributes)"
        >
          <p
            class="day-label relative my-2 w-full text-center font-arial text-sm font-bold"
            :class="[
              selectedDate === $dayjs(day.date).valueOf()
                ? ' after:contents-[``] text-white  after:absolute  after:inset-0 after:z-[-1]  after:m-auto after:size-[26px]  after:rounded-[50%] after:bg-meimate-pink'
                : '',
            ]"
          >
            {{ day.day }}
          </p>
          <div class="text-center text-xs">
            <span
              v-for="attr in attributes?.slice(0, 3)"
              class="mx-1 mb-1 block max-w-12 truncate rounded-lg p-1 font-bold text-white"
              :class="[
                attr.customData && attr.customData.class
                  ? attr.customData.class
                  : '',
              ]"
              :key="attr.key"
              >{{ attr.customData.nameToDisplay }}</span
            >
            <span
              v-if="attributes?.length > 3"
              class="mb-1 block rounded-[5px] px-2 py-1"
              >+ {{ attributes?.length - 3 }}</span
            >
          </div>
        </div>
      </template>
    </vc-date-picker>

    <C-Modal-Dialog
      v-model="isShowModal"
      @close="isShowModal = false"
      :title="`${getYear}/${month}/${getDay} ${getWeek}`"
    >
      <template #rightButton>
        <div class="relative mt-auto flex justify-end">
          <button
            @click="isDirect = !isDirect"
            @keypress="isDirect = !isDirect"
          >
            <img
              src="@/static/images/more.svg"
              alt="more"
              class="size-9 object-contain"
            />
          </button>
          <div
            class="bdrop"
            v-if="isDirect"
            @click="isDirect = !isDirect"
            @keypress="isDirect = !isDirect"
          ></div>
          <div
            v-if="isDirect"
            class="absolute right-5 top-14 !z-10 mx-auto flex min-w-[7.5rem] justify-end"
          >
            <div class="relative rounded-lg bg-white shadow-meimate-dropdown">
              <div class="text-center text-black">
                <div class="cursor-pointer text-sm">
                  <div
                    @click="doRouteInside({ name: 'ScheduleBreak-Add' })"
                    @keydown="doRouteInside({ name: 'ScheduleBreak-Add' })"
                    class="flex items-center gap-x-2 px-5 py-3 text-black"
                  >
                    <span class="text-meimate-pink">
                      <img
                        src="@/static/images/add_calendar.svg"
                        alt="add_calendar"
                        class="size-4 shrink-0 object-contain"
                      />
                    </span>
                    <span class="text-sm font-semibold">新增預約</span>
                  </div>
                  <div
                    @click="doRouteInside({ name: 'ScheduleBreak-Event' })"
                    @keydown="doRouteInside({ name: 'ScheduleBreak-Event' })"
                    class="flex items-center gap-x-2 px-5 py-3"
                  >
                    <span class="text-meimate-pink">
                      <img
                        src="@/static/images/walking-arrow-right.svg"
                        alt="walking-arrow-right"
                        class="size-4 shrink-0 object-contain"
                      />
                    </span>
                    <span class="text-sm font-semibold">新增事件</span>
                  </div>
                  <div
                    @click="doRouteInside({ name: 'ScheduleBreak-List' })"
                    @keydown="doRouteInside({ name: 'ScheduleBreak-List' })"
                    class="flex items-center gap-x-2 px-5 py-3"
                  >
                    <span class="text-meimate-pink">
                      <img
                        src="@/static/images/day_off_calendar.svg"
                        alt="day_off_calendar"
                        class="size-4 shrink-0 object-contain"
                      />
                    </span>
                    <span class="text-sm font-semibold">我的排休</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <ul class="" v-if="showData.length > 0">
        <li
          v-for="(attr, index) in showData"
          :key="attr.key + index"
          @click="(designerId === attr.customData.designerId) && doRoute(attr)"
          @keypress="(designerId === attr.customData.designerId) && doRoute(attr)"
          class="grid grid-cols-12 items-center py-2.5 odd:bg-meimate-beige/50"
        >
          <div
            class="col-span-4 flex items-center pl-2 text-xs font-bold text-meimate-pink"
          >
            <span>{{ $dayjs(attr.customData.start).format("HH:mm") }}-</span>
            <span>{{ $dayjs(attr.customData.end).format("HH:mm") }}</span>
          </div>

          <div class="col-span-4 truncate text-center text-sm font-bold">
            <span class="color" :class="[attr.customData.class]"></span
            >{{ attr.customData.designerName }}
          </div>
          <div
            class="col-span-3 truncate text-center text-sm font-bold text-meimate-yellow"
          >
            {{ attr.customData.nameToDisplayForList }}
          </div>
          <i
            v-if="designerId === attr.customData.designerId"
            class="bi bi-chevron-right object-contain px-2"
          />
        </li>
      </ul>

      <div
        v-else
        class="flex h-20 items-center justify-center bg-white text-lg font-bold text-meimate-blue-gray"
      >
        <img src="@/static/images/file.svg" alt="" class="mr-2" />無資料
      </div>
    </C-Modal-Dialog>
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
      type: [Object, Array],
    },
    attributes: {
      type: [Array],
      default: () => [],
    },
    manaulUpdateFormResult: {
      type: [Function],
      required: true,
    },
    month: {
      type: [String, Number],
    },
  },
  data() {
    return {
      // 打開新增預約和檢視行事曆的tooltip
      isDirect: false,
      isShowModal: false,
      getDay: null,
      getWeek: null,
      showData: [],
      selectedDate: this.$dayjs().startOf('day').valueOf(),
      masks: {
        weekdays: 'W',
      },
      editHoliday: {
        start: '',
        end: '',
        open: false,
      },
    };
  },
  watch: {
    attributes() {
      if (this.isShowModal) {
        const data = this.attributes.filter((d) => this.$dayjs(this.selectedDate).isSame(d.customData.start, 'day'));
        this.showData = data;
      }
    },
  },
  methods: {
    dayClick(data, attributes) {
      const weekMap = new Map([
        [0, '星期天'],
        [1, '星期一'],
        [2, '星期二'],
        [3, '星期三'],
        [4, '星期四'],
        [5, '星期五'],
        [6, '星期六'],
      ]);

      this.selectedDate = this.$dayjs(data).valueOf();
      this.getDay = this.$dayjs(data).get('date');
      this.getWeek = weekMap.get(this.$dayjs(data).get('day'));
      this.showData = attributes;
      this.isShowModal = !this.isShowModal;
    },
    swipeMonth(e) {
      this.$emit('updateMonth', e.month);
      const starDate = this.$dayjs(`${e.year}/${e.month}/1`)
        .startOf('month')
        .valueOf();
      const endDate = this.$dayjs(`${e.year}/${e.month}/1`)
        .endOf('month')
        .valueOf();
      this.$emit('input', { start: starDate, end: endDate });
    },
    doRouteInside(item) {
      this.$router.push({
        name: item.name,
        params: { date: this.selectedDate },
      });
      this.isDirect = !this.isDirect;
      this.isShowModal = !this.isShowModal;
    },
    doRoute(attr) {
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
            cancelButtonColor: '',
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
              this.showData = this.showData.filter(
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
    preNextMonth(num) {
      this.$emit('input', {
        start: this.$dayjs(
          this.$dayjs(this.propMonthlyOrdersDate.start).add(num, 'month'),
        )
          .startOf('month')
          .format('YYYY-MM-DD'),
        end: this.$dayjs(
          this.$dayjs(this.propMonthlyOrdersDate.end).add(num, 'month'),
        )
          .endOf('month')
          .format('YYYY-MM-DD'),
      });
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
    attributesfilterdByCategories() {
      return this.attributes;
    },
    dayFilter(attr) {
      return attr;
    },
    propMonthlyOrdersDate: {
      get() {
        return this.value;
      },
      set() {
        this.$emit('input', this.propMonthlyOrdersDate);
      },
    },
    designerId() {
      return store.state.userInfo.userInfo.user.id;
    },
    getYear() {
      return this.$dayjs(this.selectedDate).get('year');
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
