<template>
  <C-Modal-Dialog v-model="open" width="w-10/12" @close="$emit('close')" title="編輯休假">
    <div class="flex max-h-[280px] flex-wrap gap-2 overflow-scroll">
      <div
        class="rounded-md px-2 py-1 text-sm text-white"
        :class="time.select ? 'bg-[#66bb6a]' : 'bg-slate-400'"
        v-for="(time, index) in options"
        :key="time.label"
        @click="clickBreakTime(index, time.select)"
        @keyPress="clickBreakTime(index, time.select)"
      >
        {{ time.label }}
      </div>
    </div>
    <template #footer>
      <div class="card-footer item-center flex gap-4 !py-4">
        <button
          :disabled="isClick"
          @click="$emit('close')"
          @keyPress="$emit('close')"
          class="w-full rounded-3xl border-meimate-pink py-3 font-bold text-meimate-pink shadow-meimate-button"
        >
          關閉
        </button>
        <button
          :disabled="isClick"
          @click="updateBookingTime"
          @keyPress="updateBookingTime"
          class="w-full rounded-3xl bg-meimate-pink py-3 font-bold text-white shadow-meimate-button"
        >
          確認
        </button>
      </div>
    </template>
  </C-Modal-Dialog>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'edit-holiday-dialog',
  props: {
    start: {
      type: Number,
      required: true,
    },
    end: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      open: true,
      options: [],
      isClick: false,
    };
  },
  mounted() {
    const options = [];
    for (let i = this.start; i < this.end; i += 1800000) {
      options.push({
        time: i,
        select: true,
        label: this.$dayjs(i).format('HH:mm'),
      });
    }
    this.options = options;
  },

  methods: {
    clickBreakTime(index, select) {
      this.options[index].select = !select;
    },
    async updateBookingTime() {
      const datetimes = [];
      this.options.forEach(({ time, select }) => {
        if (!select) datetimes.push(time);
      });
      const inputData = {
        designerId: this.userInfo.user.id,
        datetimes,
        appointable: true,
      };
      await this.$api.adminBookingTimes(inputData);
      this.$swal
        .fire({
          showCloseButton: true,
          icon: 'success',
          title: '編輯成功',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        .then(() => {
          this.$emit('close', true);
        });
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo']),
  },
};
</script>
