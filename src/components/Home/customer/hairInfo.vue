<template>
  <div
    class="animate__animated animate__fadeIn animate__fast rounded-[10px] bg-white px-4 py-8 font-sans font-normal"
  >
    <div class="space-y-5" v-if="hairConditionListforSelect">
      <div
        v-for="(value, key) in hairConditionListforSelect"
        :key="key"
        class="grid grid-cols-9 items-center"
      >
        <div class="col-span-4 font-bold text-meimate-blue-gray">
          {{ ConditionName[key] }}
        </div>
        <div class="col-span-4 font-bold">
          {{ formatInfo(value, key) }}
        </div>
        <div
          class="w-fit rounded-lg bg-meimate-beige/50 p-2 shadow-meimate-button"
        >
          <img
            @click="selectModal(key)"
            @keydown="selectModal(key)"
            src="@/static/images/edit.svg"
            alt="pencel"
            class="size-4 object-contain"
          />
        </div>
      </div>
      <C-Modal-Dialog
        v-model="isShowModal"
        @close="isShowModal = false"
        :title="ConditionName[selectKey]"
      >
        <div class="flex flex-wrap gap-2">
          <template v-if="selectKey !== 'hairDyeFormula'">
            <div
              v-for="item in modelSelectList"
              :key="item.id"
              class="card-only-shadow-02 rounded-full px-4 py-1"
              :class="[
                item.isSelect
                  ? ' bg-meimate-yellow font-bold text-white'
                  : ' text-gray-dark bg-white font-medium',
              ]"
              @click="item.isSelect = !item.isSelect"
              @keydown="item.isSelect = !item.isSelect"
            >
              {{ item.name }}
            </div>
          </template>
          <template v-else>
            <label for="hairDyeFormula" class="hidden"></label>
            <input
              type="text"
              id="hairDyeFormula"
              v-model="modelSelectList"
              class="form-control form-control-sm form-control-solid !bg-meimate-white text-stone-600 placeholder:text-stone-900 focus:border-0"
            />
          </template>
        </div>
        <template #footer>
          <div class="card-footer !flex !w-full justify-end gap-2 !py-4">
            <button
              class="w-full rounded-3xl border border-meimate-pink bg-white py-3 text-center text-meimate-pink shadow-meimate-button"
              @click="isShowModal = false"
            >
              取消
            </button>
            <button
              class="w-full rounded-3xl bg-meimate-pink py-3 text-center text-white shadow-meimate-button"
              @click="handleSave"
            >
              確認
            </button>
          </div>
        </template>
      </C-Modal-Dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'customer-component-hairInfo',
  data() {
    return {
      ConditionName: {
        hairProperties: '髮質屬性',
        scalpProperties: '頭皮屬性',
        permAppliance: '燙髮用具',
        permPotion: '燙髮藥水',
        hairColorCategory: '染髮類別',
        hairColor: '染髮色系',
        hairDyeFormula: '染髮配方',
      },
      hairConditionListforSelect: '',
      isShowModal: false,
      selectKey: '',
      modelSelectList: [],
    };
  },
  async mounted() {
    this.setHairConditionForSelect();
  },
  computed: {},
  methods: {
    formatInfo(info, key) {
      if (key === 'hairDyeFormula') {
        return this.hairConditionListforSelect.hairDyeFormula || '無';
      }
      const selectList = info.filter((item) => item.isSelect);
      return selectList.length > 0
        ? selectList.map((item) => item.name).join('、')
        : '無';
    },
    selectModal(key) {
      this.selectKey = key;
      this.modelSelectList = JSON.parse(
        JSON.stringify(this.hairConditionListforSelect[key]),
      );
      this.isShowModal = true;
    },
    async setHairConditionForSelect() {
      try {
        const CustomerResp = await this.$api.getCustomerHairInfo(
          this.$route.query.id,
        );
        const ConditionResp = await this.$api.getMerchantHairCondition(
          this.$route.query.id,
        );
        const CusSelected = CustomerResp.data.data.getCustomerHairInfo;
        const hairCondition = ConditionResp.data.data.getMerchantHairCondition;
        Object.keys(hairCondition).forEach((key) => {
          hairCondition[key].forEach((item, index) => {
            const has = CusSelected[key].find(
              (resultItem) => resultItem === item,
            );
            hairCondition[key][index] = {
              name: item,
              isSelect: !!has,
              id: key + item + index,
            };
          });
        });
        hairCondition.hairDyeFormula = CusSelected.hairDyeFormula;
        // 處理顧客有項目但後台無選項的狀況
        Object.keys(CusSelected).forEach((key) => {
          if (key === 'hairDyeFormula') return;
          CusSelected[key].forEach((item) => {
            if (
              !hairCondition[key].find((resultItem) => resultItem.name === item)
            ) {
              hairCondition[key].push({
                name: item,
                isSelect: true,
                id: key + item,
              });
            }
          });
        });
        this.hairConditionListforSelect = hairCondition;
      } catch (err) { /* ignore */ }
    },
    async handleSave() {
      try {
        this.hairConditionListforSelect[this.selectKey] = this.modelSelectList;
        const result = JSON.parse(
          JSON.stringify(this.hairConditionListforSelect),
        );
        Object.keys(result).forEach((key) => {
          if (key === 'hairDyeFormula') return;
          result[key] = result[key]
            .filter((item) => item.isSelect)
            .map((item) => item.name);
        });
        const data = {
          ...result,
          customerId: this.$route.query.id,
        };
        await this.$api.SetCustomerHairInfo(data);
        this.setHairConditionForSelect();
        this.isShowModal = false;
      } catch (err) { /* ignore */ }
    },
  },
};
</script>
