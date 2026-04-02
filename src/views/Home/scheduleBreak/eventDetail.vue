<template>
  <C-Main-Block>
    <C-Back-Nav
      :routeTarget="{ name: 'ScheduleBreak' }"
      :title="'事件明細'"
    ></C-Back-Nav>
    <section
      class="relative mx-auto mt-20 w-full max-w-screen-md px-5 lg:mt-40 lg:px-10"
    >
      <ValidationObserver ref="orderForm" class="card">
        <div class="card-body !px-4">
          <div class="my-2 grid grid-cols-12 items-center gap-x-2">
            <p class="col-span-2 font-bold text-meimate-blue-gray">時間</p>
            <ValidationProvider
              v-if="isEdit"
              ref="orderDate"
              name="日期"
              rules="required"
              v-slot="{ errors }"
              class="col-span-6"
            >
              <VCCalendarSelect
                :min-date="new Date()"
                :placeholder="'選擇日期'"
                v-model="orderDate"
                :errors="errors"
              >
              </VCCalendarSelect>
            </ValidationProvider>
            <ValidationProvider
              v-if="isEdit"
              ref="timeList"
              name="時間"
              rules="required"
              v-slot="{ errors }"
              class="col-span-4"
            >
              <C-Select
                inputClasses=" bg-meimate-white"
                :list="timeList"
                v-model="orderTime"
                :placeholder="'時間'"
                item-text="name"
                item-value="id"
                object-return
                :errors="errors"
              ></C-Select>
            </ValidationProvider>
            <template v-else>
              <p class="text-dark col-span-5 px-3 font-medium">
                {{
                  orderDate ? this.$dayjs(orderDate).format("YYYY-MM-DD") : ""
                }}
              </p>
              <p class="text-dark col-span-5 px-3 font-medium">
                {{ orderTime.name }}
              </p>
            </template>
          </div>

          <!-- 事件時長 -->
          <div class="my-2 grid grid-cols-12 items-center gap-x-2">
            <p class="col-span-2 font-bold text-meimate-blue-gray">時長</p>
            <ValidationProvider
              v-if="isEdit"
              ref="timeCost"
              name="事件時長"
              rules="required"
              v-slot="{ errors }"
              class="col-span-10"
            >
              <label for="timeCostInput"></label>
              <select
                id="timeCostInput"
                class="h-10 w-full rounded-full border-r-8 border-transparent bg-meimate-white px-3 py-2 font-medium outline-none placeholder:text-stone-600"
                :value="timeCost"
                @input="updateTimeCost"
              >
                <option
                  v-for="option in timeCostRange"
                  :value="option.value"
                  :key="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
              <div class="error-message" :errors="errors"></div>
            </ValidationProvider>
            <p class="text-dark col-span-10 px-3 font-medium" v-else>
              {{ timeCostRange[timeCost] ? timeCostRange[timeCost].label : "" }}
            </p>
          </div>

          <!-- 事件說明 -->

          <div class="my-2 grid grid-cols-12 items-center gap-x-2">
            <label class="col-span-2 font-bold text-meimate-blue-gray"
              >說明</label
            >
            <div class="relative col-span-10 flex flex-nowrap gap-1">
              <textarea
                :disabled="!isEdit"
                :style="{ resize: isEdit ? 'horizontal' : 'none' }"
                name="text"
                id=""
                v-model="text"
                rows="3"
                class="block w-full rounded-3xl bg-meimate-white px-4 py-2 text-sm font-medium outline-none"
              ></textarea>
              <i
                v-if="isEdit && text !== ''"
                @click="text = ''"
                @keypress="text = ''"
                class="bi bi-x absolute bottom-1/2 right-2 translate-y-1/2 text-2xl text-meimate-pink"
              />
            </div>
          </div>

          <!-- 是否連動排休 -->
          <C-Checkbox-Full
            v-model="isHolidaySync"
            :disabled="!isEdit"
            label="是否連動排休"
            class="!justify-start pt-4"
          ></C-Checkbox-Full>
        </div>
        <div class="card-footer flex items-center gap-2 !py-4">
          <button
            class="w-full rounded-3xl border border-meimate-pink bg-white px-5 py-3 text-sm font-bold text-meimate-pink"
            @click="handleClickCancel"
            @keypress="handleClickCancel"
          >
            <span>{{ isEdit ? "取消" : "刪除事件" }}</span>
          </button>
          <button
            class="w-full rounded-3xl bg-meimate-pink px-5 py-3 text-sm font-bold text-white"
            @click="handleClickEdit"
            @keypress="handleClickEdit"
          >
            <span>{{ isEdit ? "儲存" : "修改事件" }}</span>
          </button>
        </div>
      </ValidationObserver>
    </section>
  </C-Main-Block>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import VCCalendarSelect from '@/components/general/VC-CalendarSelect.vue';
import allDayTime from '../../../assets/constant/bookingTime';
import timeCost from '../../../assets/constant/timeCost';

export default {
  components: { VCCalendarSelect },
  name: 'event-detail',
  description: '行事曆事件',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 事件',
  },
  data() {
    return {
      id: '',
      orderDate: '',
      orderTime: '',
      text: '',
      isOrderDesigner: true,
      timeList: [],
      timeCost: 0,
      isHolidaySync: false,
      isEdit: false,
      timeCostRange: [
        { label: '請選擇', value: 0 },
        { label: '半小時', value: 1 },
        { label: '一小時', value: 2 },
        { label: '一個半小時', value: 3 },
        { label: '兩小時', value: 4 },
        { label: '兩個半小時', value: 5 },
        { label: '三小時', value: 6 },
        { label: '三個半小時', value: 7 },
        { label: '四小時', value: 8 },
        { label: '四個半小時', value: 9 },
        { label: '五小時', value: 10 },
        { label: '五個半小時', value: 11 },
        { label: '六小時', value: 12 },
        { label: '六個半小時', value: 13 },
        { label: '七小時', value: 14 },
        { label: '七個半小時', value: 15 },
        { label: '八小時', value: 16 },
      ],
    };
  },
  methods: {
    handleDeleteComfirm() {
      this.$swal
        .fire({
          title: ' ',
          html: `<div class="text-center text-lg text-bold">
        確定要刪除嗎？
        </div>`,
          confirmButtonText: '刪除',
          cancelButtonText: '取消',
          showConfirmButton: true,
          showCancelButton: true,
          showCloseButton: true,
          customClass: {
            confirmButton: '!bg-meimate-pink',
          },
        })
        .then(({ isConfirmed }) => {
          if (isConfirmed) {
            this.deleteEvent();
          }
        });
    },
    async deleteEvent() {
      await this.$api.deleteEvent({
        eventId: this.id,
        isHolidaySync: this.isHolidaySync,
      });
      this.$swal
        .fire({
          title: ' ',
          html: `<div class="text-center text-lg text-bold">刪除成功
        </div>`,
          confirmButtonText: '回到列表',
          showConfirmButton: true,
          showCloseButton: true,
          customClass: {
            confirmButton: '!bg-meimate-pink',
          },
          timer: 3000,
          timerProgressBar: true,
        })
        .then(() => {
          this.$router.push({ name: 'ScheduleBreak' });
        });
    },
    async updateEvent() {
      await this.$api.updateEvent({
        input: {
          date: this.$dayjs(
            `${this.$dayjs(this.orderDate).format('YYYY-MM-DD')} ${
              this.orderTime.name
            }`,
          ).valueOf(),
          eventId: this.id,
          isHolidaySync: this.isHolidaySync,
          text: this.text,
          timeCost: this.timeCost,
        },
      });
      this.$swal
        .fire({
          title: ' ',
          html: `<div class="text-center text-lg text-bold">修改成功
        </div>`,
          confirmButtonText: '回到列表',
          showConfirmButton: true,
          showCloseButton: true,
          customClass: {
            confirmButton: '!bg-meimate-pink',
          },
          timer: 3000,
          timerProgressBar: true,
        })
        .then(() => {
          this.$router.push({ name: 'ScheduleBreak' });
        });
    },
    async getTimeList() {
      this.timeList = allDayTime;
    },
    async getEvent() {
      const res = await this.$api.getEvent({ getEventId: this.id });
      const { data } = res.data;
      if (!data) return;
      if (data.getEvent) {
        [this.orderDate] = data.getEvent.dates;
        this.text = data.getEvent.text;
        this.isHolidaySync = data.getEvent.isHolidaySync;
        this.timeCost = data.getEvent.timeCost;
        const orderDate = this.$dayjs(this.orderDate).format('HH:mm');
        const index = allDayTime.findIndex((d) => d.name === orderDate);
        const timeCostArr = timeCost.slice(0, 49 - index);
        const checkIndex = timeCostArr.findIndex((d) => d.name === orderDate);
        if (checkIndex === -1) {
          const filterData = timeCost.filter((d) => d.value <= this.timeCost);
          this.timeCostRange = filterData;
        } else {
          this.timeCostRange = timeCostArr;
        }
      }
    },
    updateTimeCost(event) {
      this.timeCost = parseInt(event.target.value, 10);
    },
    async handleClickEdit() {
      if (this.isEdit) {
        const isValidForm = await this.$refs.orderForm.validate();
        if (isValidForm) {
          this.updateEvent();
        }
      } else {
        this.isEdit = !this.isEdit;
      }
    },
    handleClickCancel() {
      if (this.isEdit) {
        this.isEdit = false;
      } else {
        this.handleDeleteComfirm();
      }
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo', 'currentMechantId']),
    ...mapGetters('userInfo', ['GETTER_MECHANTNAME']),
    combined() {
      return `${this.orderTime}|${this.timeList}`;
    },
  },
  watch: {
    orderDate: {
      handler() {
        this.getTimeList();
      },
    },
    $route: {
      immediate: true,
      handler() {
        if (this.$route.query.id) {
          this.id = this.$route.query.id;
        }
      },
    },
    combined: {
      immediate: true,
      handler() {
        if (this.timeList.length > 0 && this.orderDate) {
          const findData = this.timeList.find(
            (d) => d.name === this.$dayjs(this.orderDate).format('HH:mm'),
          );
          this.orderTime = findData;
        }
      },
    },
    orderTime: {
      immediate: true,
      handler() {
        if (!this.orderTime || !this.orderTime.name) return;
        const index = allDayTime.findIndex((d) => d.name === this.orderTime.name);
        this.timeCostRange = timeCost.slice(0, 49 - index);
        const findData = this.timeCostRange.find((d) => d.value === this.timeCost);
        if (!findData) {
          this.timeCost = 0;
        }
      },
    },
  },
  activated() {
    this.id = this.$route.query.id;
    this.getEvent();
  },
  deactivated() {
    this.isEdit = false;
  },
};
</script>
