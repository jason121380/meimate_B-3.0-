<template>
  <div class="animate__animated animate__fadeIn animate__fast card">
    <div
      class="card-body !flex flex-col gap-y-4 [&>*]:mb-2.5 [&>*]:flex [&>*]:flex-col [&>*]:text-base [&>*]:md:grid [&>*]:md:grid-cols-2"
      v-if="resultData"
    >
      <div>
        <div class="font-bold text-meimate-blue-gray">姓名</div>
        <div class="flex justify-between">
          <div class="flex flex-row font-medium text-gray-800">{{ resultData.name }}</div>
          <button
            @click="copy(resultData.name, 'name')"
            class="rounded-md border border-meimate-pink bg-white p-1 text-sm text-meimate-pink"
          >
            複製{{ copyName ? "成功" : "" }}
          </button>
        </div>
      </div>
      <div>
        <div class="font-bold text-meimate-blue-gray">電話</div>
        <div class="flex justify-between">
          <div class="font-medium text-gray-800">{{ resultData.cellphone }}</div>
          <button
            @click="copy(resultData.cellphone, 'phone')"
            class="rounded-md border border-meimate-pink bg-white p-1 text-sm text-meimate-pink"
          >
            複製{{ copyPhone ? "成功" : "" }}
          </button>
        </div>
      </div>
      <div>
        <div class="font-bold text-meimate-blue-gray">客戶暱稱</div>
        <div class="font-medium text-gray-800">{{ resultData.nickName }}</div>
      </div>
      <div>
        <div class="font-bold text-meimate-blue-gray">性別</div>
        <div class="font-medium text-gray-800">{{ resultData.gender }}</div>
      </div>
      <div>
        <div class="font-bold text-meimate-blue-gray">Email</div>
        <div class="font-medium text-gray-800">{{ resultData.email }}</div>
      </div>
      <div>
        <div class="font-bold text-meimate-blue-gray">Line ID</div>
        <div class="font-medium text-gray-800">{{ resultData.lineId }}</div>
      </div>
      <div>
        <div class="font-bold text-meimate-blue-gray">生日</div>
        <div class="font-medium text-gray-800">
          <template v-if="resultData.birthday">
            {{
              resultData.birthday.year && resultData.birthday.year !== "0"
                ? `${resultData.birthday.year} / `
                : ""
            }}{{
              resultData.birthday.month && resultData.birthday.month !== "0"
                ? `${resultData.birthday.month} / `
                : "--."
            }}{{
              resultData.birthday.day && resultData.birthday.day !== "0"
                ? resultData.birthday.day
                : "--"
            }}
          </template>
        </div>
      </div>
      <div>
        <div class="font-bold text-meimate-blue-gray">地址</div>
        <div class="font-medium text-gray-800">{{ resultData.address }}</div>
      </div>
      <div>
        <div class="font-bold text-meimate-blue-gray">客戶來源</div>
        <div class="font-medium text-gray-800">{{ resultData.source }}</div>
      </div>
    </div>

    <div class="card-footer flex items-center gap-4 !py-4">
      <button
        class="w-full rounded-full bg-meimate-pink px-5 py-3 text-center text-sm font-bold text-white shadow-meimate-button"
        @click="doRouter()"
      >
        新增預約
      </button>
      <button
        v-if="resultData"
        class="w-full rounded-full bg-meimate-pink px-5 py-3 text-center text-sm font-bold text-white shadow-meimate-button"
        @click="isUnwelcomeSetting()"
      >
        {{ resultData.isUnwelcome ? "解除黑名單" : "加入黑名單" }}
      </button>
    </div>
  </div>
</template>

<script>
import store from '@/store/index';

export default {
  name: 'customer-component-userInfo',
  data() {
    return {
      resultData: null,
      copyName: false,
      copyPhone: false,
    };
  },
  activated() {
    this.copyName = false;
    this.copyPhone = false;
  },
  mounted() {
    this.getCustomer();
  },
  methods: {
    async getCustomer() {
      const resp = await this.$api.customer({ id: this.$route.query.id });
      const { data, errors } = resp.data;
      if (errors) return;
      this.resultData = data.customer;
    },

    doRouter() {
      this.$router.push({
        name: 'ScheduleBreak-Add',
        query: {
          name: this.resultData.name,
          cellphone: this.resultData.cellphone,
        },
      });
    },

    async isUnwelcomeSetting() {
      const isUnwelcome = !this.resultData.isUnwelcome;
      const resp = await this.$api.setCustomerIsUnwelcome({
        id: this.resultData.id,
        isUnwelcome,
      });
      const { errors } = resp.data;
      if (errors) return;
      this.resultData.isUnwelcome = isUnwelcome;
      const obj = {
        userId: this.resultData.id,
        isUnwelcome,
      };
      store.commit('userInfo/SET_USER_UNWELCOME', obj);
    },
    copy(text, type) {
      navigator.clipboard.writeText(text).then(() => {
        if (type === 'name') {
          this.copyName = true;
        } else {
          this.copyPhone = true;
        }
      });
    },
  },
};
</script>

<style></style>
