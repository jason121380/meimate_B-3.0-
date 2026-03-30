<template>
  <section>
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed left-0 top-0 z-40 h-screen w-screen bg-black opacity-25"
      ></div>
    </transition>
    <transition name="fade">
      <div
        v-if="showModal"
        class="cancel fixed left-0 top-0 z-40 flex size-full items-center justify-center px-[5%] shadow-[0px_2px_2px_rgba(0,0,0,0.25)]"
      >
        <div class="card relative mx-auto w-full max-w-screen-md bg-white">
          <!-- 關閉按鈕 -->
          <div
            class="flex shrink-0 place-content-between items-center border-b border-[#e5e7eb] px-7 py-5"
          >
            <p class="text-xl font-bold">提醒</p>
            <button @click="closeModal">
              <span class="cancel text-3xl">
                <img
                  src="@/static/images/close-icon.svg"
                  alt="close"
                  class="size-5 object-contain"
                />
              </span>
            </button>
          </div>
          <div class="card-body !px-9 !py-5">
            <div class="text-gray-dark text-center text-lg font-bold">
              確定要登出嗎?
            </div>
          </div>
          <div class="card-footer flex w-full justify-end gap-2 !py-4">
            <button
              @click="closeModal"
              class="w-full rounded-3xl border border-meimate-pink bg-white py-3 text-center text-meimate-pink shadow-meimate-button"
            >
              取消
            </button>
            <button
              @click="confirm"
              class="w-full rounded-3xl bg-meimate-pink py-3 text-center text-white shadow-meimate-button"
            >
              登出
            </button>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'LogoutModal',
  props: {
    showModal: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      showSuccessModal: false,
    };
  },
  methods: {
    closeModal() {
      this.showSuccessModal = false;
      this.$emit('close');
    },
    confirm() {
      this.$emit('confirm');
    },
  },
};
</script>
