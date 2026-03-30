<template>
  <C-Main-Block>
    <C-Back-Nav
      :routeTarget="{ name: 'ScheduleBreak' }"
      :title="'新增事件'"
    ></C-Back-Nav>
    <section
      class="relative mx-auto mt-20 w-full max-w-screen-md px-5 lg:mt-40 lg:px-10"
    >
      <ValidationObserver ref="orderForm" class="card">
        <div class="card-body !px-4">
          <div class="my-2 grid grid-cols-12 items-center gap-x-2">
            <p class="col-span-2 font-bold text-meimate-blue-gray">時間</p>
            <ValidationProvider
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
              ref="timeList"
              name="時間"
              rules="required"
              v-slot="{ errors }"
              class="col-span-4"
            >
              <C-Select
                inputClasses="bg-meimate-white"
                :list="timeList"
                v-model="orderTime"
                :placeholder="'時間'"
                item-text="name"
                item-value="id"
                object-return
                :errors="errors"
              ></C-Select>
            </ValidationProvider>
          </div>

          <!-- 事件時長 -->
          <div class="my-2 grid grid-cols-12 items-center gap-x-2">
            <p class="col-span-2 font-bold text-meimate-blue-gray">時長</p>
            <ValidationProvider
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
          </div>

          <!-- 事件說明 -->

          <div class="my-2 grid grid-cols-12 items-center gap-x-2">
            <label class="col-span-2 font-bold text-meimate-blue-gray">
              說明</label
            >
            <div class="relative col-span-10 flex flex-nowrap gap-1">
              <textarea
                name="remark"
                id=""
                v-model="remark"
                rows="3"
                class="block w-full rounded-3xl bg-meimate-white px-4 py-2 text-sm font-medium outline-none"
              ></textarea>
              <i
                v-if="remark !== ''"
                class="bi bi-x absolute bottom-1/2 right-2 translate-y-1/2 text-2xl text-meimate-pink"
                @click="remark = ''"
                @keypress="remark = ''"
              />
            </div>
          </div>

          <!-- 是否連動排休 -->
          <C-Checkbox-Full
            v-model="isHolidaySync"
            label="是否連動排休"
            class="!justify-start pt-4"
          ></C-Checkbox-Full>
        </div>
        <div class="card-footer !py-4">
          <button
            class="w-full rounded-3xl bg-meimate-pink px-5 py-3 text-sm font-bold text-white"
            @click="doFormValidate"
            @keypress="doFormValidate"
          >
            新增事件
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
  name: 'schedule-event',
  description: '行事曆事件',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 事件',
  },
  async mounted() {
    if (this.oppointment.orderDate) {
      this.orderDate = this.oppointment.orderDate;
      this.orderTime = allDayTime.find(({ name }) => name === this.oppointment.orderTime);
    }
  },
  deactivated() {
    this.$store.commit('userInfo/UPDATE_USER_OPPOINTMENT', {
      orderDate: '',
      orderTime: '',
    });
  },
  data() {
    return {
      orderDate: new Date(),
      orderTime: '',
      name: '',
      cellphone: '',
      remark: '',
      isOrderDesigner: true,
      timeList: allDayTime,
      timeCost: 0,
      isHolidaySync: false,
      isAllowAllTime: undefined,
      timeCostRange: [{ label: '請選擇', value: 0 }],
    };
  },

  methods: {
    doRoute(item) {
      this.$router.push({ name: item.name });
    },
    async doFormValidate() {
      const isValidForm = await this.$refs.orderForm.validate();
      if (!isValidForm) return;
      this.doDelivery();
    },
    async doDelivery() {
      const submitForm = {
        date: this.$dayjs(
          `${this.$dayjs(this.orderDate).format('YYYY-MM-DD')} ${
            this.orderTime.name
          }`,
        ).valueOf(),
        text: this.remark,
        timeCost: this.timeCost === 0 ? 1 : this.timeCost,
        isHolidaySync: this.isHolidaySync,
      };
      const resp = await this.$api.createEvent({ input: submitForm });
      const { errors } = resp.data;
      if (errors) return;
      this.fireSwalToOrder();
    },
    fireSwalToOrder() {
      this.$swal
        .fire({
          title: ' ',
          html: `<div class="text-center text-lg text-bold">新增成功
        </div>`,
          confirmButtonText: '回到列表',
          showConfirmButton: true,
          showCloseButton: true,
          customClass: {
            confirmButton: '!bg-meimate-pink',
          },
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.remark = '';
            this.doRoute({ name: 'ScheduleBreak' });
          }
        });
    },
    updateTimeCost(event) {
      this.timeCost = parseInt(event.target.value, 10);
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo', 'currentMechantId', 'oppointment']),
    ...mapGetters('userInfo', ['GETTER_MECHANTNAME']),
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        if (this.$route.params.date) {
          const day = this.$dayjs(this.$route.params.date).format();
          this.orderDate = day;
        }
      },
    },
    orderTime() {
      if (!this.orderTime || !this.orderTime.name) return;
      const index = allDayTime.findIndex((d) => d.name === this.orderTime.name);
      this.timeCostRange = timeCost.slice(0, 49 - index);
      const findData = this.timeCostRange.find((d) => d.value === this.timeCost);
      if (!findData) {
        this.timeCost = 0;
      }
    },

  },
};
</script>
