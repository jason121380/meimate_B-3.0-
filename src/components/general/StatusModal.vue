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
        <div class="card relative z-[-1] max-h-[80vh] w-full max-w-screen-md p-5">
          <div v-show="status != 'none'" class="flex flex-col items-center p-5">
            <span class="text-meimate-yellow" v-if="status == 'success'">
              <svg
                width="72"
                height="72"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  opacity="0.3"
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="10"
                  fill="currentColor"
                />
                <path
                  d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span class="text-danger" v-else>
              <svg
                width="72"
                height="72"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  opacity="0.3"
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="10"
                  fill="currentColor"
                />
                <rect
                  x="11"
                  y="14"
                  width="7"
                  height="2"
                  rx="1"
                  transform="rotate(-90 11 14)"
                  fill="currentColor"
                />
                <rect
                  x="11"
                  y="17"
                  width="2"
                  height="2"
                  rx="1"
                  transform="rotate(-90 11 17)"
                  fill="currentColor"
                />
              </svg>
            </span>
            <div class="text-gray-dark mt-4">{{ content }}</div>
          </div>
          <div v-show="timeout == 0" class="mt-4 pt-5 text-center">
            <button
              @click="closeModal"
              class="rounded-3xl bg-meimate-pink px-10 py-2 text-white"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'StatusModal',
  props: {
    showModal: {
      type: Boolean,
      default: () => false,
    },
    timeout: {
      type: Number,
      default: () => 0,
    },
    content: {
      type: String,
      default: () => '',
    },
    status: {
      type: String,
      default: () => 'success',
    },
  },
  data() {
    return { timeoutId: null };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
  watch: {
    showModal() {
      if (this.timeoutId) clearTimeout(this.timeoutId);
      if (this.showModal && this.timeout !== 0) {
        this.timeoutId = setTimeout(() => {
          this.closeModal();
        }, this.timeout);
      }
    },
  },
  beforeDestroy() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
  },
};
</script>
