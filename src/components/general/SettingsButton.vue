<template>
  <div>123</div>
  <!-- <section class="absolute right-5 top-4 z-20 flex flex-col items-end lg:right-16 lg:top-5">
    <div class="flex h-10 w-10 items-center justify-center" @click="showButtons = !showButtons">
      <span class="duration-500" :class="showButtons ? 'rotate-0' : 'rotate-180'">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
        </svg>
      </span>
    </div>
    <transition name="slide-fade">
      <div v-show="showButtons" class="flex flex-col gap-y-5 rounded-lg border border-white bg-white p-5 shadow-md">
        <div @click="$router.push('/member/info/edit')" class="text-gray-dark flex items-center gap-x-2 text-base">
          <span class="text-meimate-pink">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.28548 15.0861C7.34369 13.1814 9.35142 12 11.5304 12H12.4696C14.6486 12 16.6563 13.1814 17.7145 15.0861L19.3493 18.0287C20.0899 19.3618 19.1259 21 17.601 21H6.39903C4.87406 21 3.91012 19.3618 4.65071 18.0287L6.28548 15.0861Z"
                fill="currentColor" />
              <rect opacity="0.3" x="8" y="3" width="8" height="8" rx="4" fill="currentColor" />
            </svg>
          </span>
          <span class="text-sm font-semibold">修改個人資料</span>
        </div>
        <div @click="openPasswordModal" class="text-gray-dark flex items-center gap-x-2">
          <span class="text-meimate-pink">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.3"
                d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z"
                fill="currentColor" />
              <path
                d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z"
                fill="currentColor" />
            </svg>
          </span>
          <span class="text-sm font-semibold">修改密碼</span>
        </div>
        <div @click="$router.push('/member/setting')" class="text-gray-dark flex items-center gap-x-2">
          <span class="text-meimate-pink">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.3721 4.65439C17.6415 4.23815 16.8052 4 15.9142 4C14.3444 4 12.9339 4.73924 12.003 5.89633C11.0657 4.73913 9.66 4 8.08626 4C7.19611 4 6.35789 4.23746 5.62804 4.65439C4.06148 5.54462 3 7.26056 3 9.24232C3 9.81001 3.08941 10.3491 3.25153 10.8593C4.12155 14.9013 9.69287 20 12.0034 20C14.2502 20 19.875 14.9013 20.7488 10.8593C20.9109 10.3491 21 9.81001 21 9.24232C21.0007 7.26056 19.9383 5.54462 18.3721 4.65439Z"
                fill="currentColor" />
            </svg>
          </span>
          <span class="text-sm font-semibold">偏好設定</span>
        </div>
        <div @click="openLogoutModal" class="text-gray-dark flex items-center gap-x-2">
          <span class="text-meimate-pink">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect opacity="0.3" width="12" height="2" rx="1" transform="matrix(-1 0 0 1 20 11)" fill="currentColor" />
              <path
                d="M18.1313 11.6927L16.3756 10.2297C15.9054 9.83785 15.8732 9.12683 16.306 8.69401C16.6957 8.3043 17.3216 8.28591 17.7336 8.65206L20.6592 11.2526C21.1067 11.6504 21.1067 12.3496 20.6592 12.7474L17.7336 15.3479C17.3216 15.7141 16.6957 15.6957 16.306 15.306C15.8732 14.8732 15.9054 14.1621 16.3756 13.7703L18.1313 12.3073C18.3232 12.1474 18.3232 11.8526 18.1313 11.6927Z"
                fill="currentColor" />
              <path opacity="0.5"
                d="M16 5V6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6C14 5.44772 13.5523 5 13 5H6C5.44771 5 5 5.44772 5 6V18C5 18.5523 5.44771 19 6 19H13C13.5523 19 14 18.5523 14 18C14 17.4477 14.4477 17 15 17C15.5523 17 16 17.4477 16 18V19C16 20.1046 15.1046 21 14 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H14C15.1046 3 16 3.89543 16 5Z"
                fill="currentColor" />
            </svg>
          </span>
          <span class="text-sm font-semibold">登出</span>
        </div>
      </div>
    </transition>
    <PasswordEditModal :showModal="showEditPassword" @close="showEditPassword = false" />
    <LogoutModal :showModal="showLogoutModal" @close="showLogoutModal = false" />
  </section> -->
</template>

<script>
export default {
  name: 'SettingsButton',
  data() {
    return {
      showButtons: false,
      showEditPassword: false,
      showLogoutModal: false,
    };
  },
  methods: {
    // 打開密碼彈窗
    openPasswordModal() {
      this.showEditPassword = true;
      this.showButtons = false;
    },
    // 關閉密碼彈窗
    close() {
      this.showEditPassword = false;
    },
    openLogoutModal() {
      this.showLogoutModal = true;
      this.showButtons = false;
    },
  },
};
</script>
