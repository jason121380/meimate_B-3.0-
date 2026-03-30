<template>
  <C-Main-Block>
    <C-Back-Nav
      :title="'預約'"
      :routeTarget="{ name: 'ScheduleBreak' }"
    ></C-Back-Nav>
    <section class="relative p-4">
      <p class="my-2 text-center">新增預約</p>

      <div class="my-2 flex items-center gap-2 text-left">
        <p class="w-2/6">預約時間</p>
        <div class="flex w-4/6 gap-1">
          <VCCalendarSelect :placeholder="'選擇日期'"></VCCalendarSelect>
          <C-Select
            inputClasses="bg-meimate-white"
            :list="timeList"
            v-model="dateMM"
            :placeholder="'選擇時間'"
            :itemText="'label'"
          ></C-Select>
        </div>
      </div>

      <div class="my-2 flex items-center gap-2 text-left">
        <p class="w-2/6">姓名</p>
        <div class="w-4/6">
          <C-Input v-model="name" class="mb-0"></C-Input>
        </div>
      </div>

      <div class="my-2 flex items-center gap-2 text-left">
        <p class="w-2/6">電話</p>
        <div class="w-4/6">
          <C-Input v-model="phone" class="mb-0"></C-Input>
        </div>
      </div>
      <div class="my-2 flex items-center gap-2 text-left">
        <p class="w-2/6">服務類別</p>
        <div class="flex w-4/6 flex-nowrap gap-1">
          <VCCalendarSelect :placeholder="'選擇類別'"></VCCalendarSelect>
          <C-Select
            inputClasses="bg-meimate-white"
            :list="timeList"
            v-model="dateMM"
            :placeholder="'選擇項目'"
            :itemText="'label'"
          ></C-Select>
        </div>
      </div>

      <div class="fixed bottom-[100px] w-[calc(100%-24px)]">
        <div
          class="w-full cursor-pointer bg-second px-4 py-2 text-white"
          @click="doDelivery"
          @keypress="doDelivery"
        >
          新增預約
        </div>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
import VCCalendarSelect from '../../../components/general/VC-CalendarSelect.vue';

export default {
  components: { VCCalendarSelect },
  name: 'order-add',
  description: '預約的首頁',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 預約',
  },
  data() {
    return {
      dateMM: '',
      name: '',
      phone: '',
      timeList: [
        { label: '10:00', value: 1 },
        { label: '10:30', value: 2 },
        { label: '11:00', value: 3 },
        { label: '11:30', value: 4 },
        { label: '12:00', value: 5 },
        { label: '12:30', value: 6 },
        { label: '13:00', value: 7 },
        { label: '13:30', value: 8 },
        { label: '14:00', value: 9 },
        { label: '14:30', value: 10 },
        { label: '15:00', value: 11 },
        { label: '15:30', value: 12 },
      ],
    };
  },
  methods: {
    doRoute(item) {
      this.$router.push({ name: item.name });
    },
    doDelivery() {
      this.$swal
        .fire({
          showCloseButton: true,
          html: `<div class="flex items-center justify-center my-10">
              <img src="/stylist/assets/images/success.svg" alt="" class="inline-block mr-1" /><span>新增成功</span>
            </div>`,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        .then(() => {
          // this.doRoute();
        });
    },
  },
};
</script>
