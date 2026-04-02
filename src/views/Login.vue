<template>
  <section class="login-page flex min-h-screen flex-col justify-center">
    <!-- 主內容區 -->
    <div class="mx-auto flex w-full max-w-screen-md flex-1 flex-col justify-center px-6 pb-8 md:px-8">
      <!-- 歡迎語 -->
      <div class="login-animate login-animate-1 mb-8">
        <h1 class="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl">Hi,</h1>
        <h2 class="mt-1 text-lg leading-relaxed text-gray-400 md:text-xl">歡迎回來，設計師</h2>
      </div>

      <!-- 表單卡片 -->
      <div class="login-animate login-animate-2">
        <h3 class="mb-4 text-lg font-semibold text-gray-900">設計師登入</h3>
        <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <ValidationObserver ref="loginForm">
            <form>
              <ValidationProvider
                ref="form.userAccount"
                name="帳號"
                rules="required"
                v-slot="{ errors }"
              >
                <label class="mb-2 block text-sm font-medium text-gray-500">帳號</label>
                <div class="form-group relative mb-6">
                  <input
                    type="tel"
                    v-model="form.userAccount"
                    placeholder="請輸入帳號"
                    class="w-full rounded-full border border-gray-300 bg-gray-50 px-5 py-3.5 text-sm text-gray-700 transition-colors placeholder:text-gray-300 focus:border-gmb-orange-400 focus:outline-none focus:ring-1 focus:ring-gmb-orange-200"
                    :class="{ '!border-red-400': errors.length > 0 }"
                    @keyup.enter="$refs.pwdInput && $refs.pwdInput.focus()"
                  />
                  <span v-if="errors.length > 0" class="absolute -bottom-5 left-3 text-xs text-red-400">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <ValidationProvider
                ref="form.userpwd"
                name="密碼"
                rules="required"
                v-slot="{ errors }"
              >
                <label class="mb-2 block text-sm font-medium text-gray-500">密碼</label>
                <div class="form-group relative mb-6">
                  <input
                    ref="pwdInput"
                    :type="inputType"
                    v-model="form.userpwd"
                    placeholder="請輸入密碼"
                    class="w-full rounded-full border border-gray-300 bg-gray-50 px-5 py-3.5 text-sm text-gray-700 transition-colors placeholder:text-gray-300 focus:border-gmb-orange-400 focus:outline-none focus:ring-1 focus:ring-gmb-orange-200"
                    :class="{ '!border-red-400': errors.length > 0 }"
                    @keyup.enter="doLogin"
                  />
                  <button
                    type="button"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                    @click="togglePwd"
                  >
                    <i
                      class="bi text-lg"
                      :class="inputType === 'text' ? 'bi-eye-slash-fill' : 'bi-eye-fill'"
                    />
                  </button>
                  <span v-if="errors.length > 0" class="absolute -bottom-5 left-3 text-xs text-red-400">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <div class="flex justify-end py-1">
                <C-Checkbox
                  v-model="form.isKeepLogin"
                  class="flex items-center gap-2 [&>input]:order-2 [&>label]:order-1"
                  label="保持登入"
                ></C-Checkbox>
              </div>

              <button
                @click.prevent="doLogin"
                v-ripple="100"
                type="button"
                class="mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-gmb-orange-500 py-3.5 text-base font-semibold text-white shadow-lg shadow-gmb-orange-200 transition-colors duration-300 hover:bg-gmb-orange-600"
              >
                登入
              </button>
            </form>
          </ValidationObserver>
        </div>
      </div>

      <!-- 頁尾 -->
      <div class="login-animate login-animate-3 mt-12 text-center">
        <p class="text-xs text-gray-300">v3.0 powered by BOS</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { isJSON } from '@/utils/index';

export default {
  name: 'login-page',
  metaInfo: {
    title: 'Meimate Stylist',
  },
  data() {
    return {
      form: {
        userAccount: '',
        userpwd: '',
        isKeepLogin: true,
      },
      inputType: 'password',
      merchantIdentity: {},
      merchantAuthorities: [],
    };
  },

  methods: {
    ...mapActions('userInfo', [
      'SET_USER_PROFILE',
      'SET_USER_CURRENT_MERCHANTID',
      'SET_USER_AUTHORIZELIST',
    ]),
    async doLogin() {
      const isValidForm = await this.$refs.loginForm.validate();
      if (!isValidForm) return;
      this.$api
        .userLoginV2({
          cellphone: this.form.userAccount,
          password: this.form.userpwd,
          isKeepLogin: this.form.isKeepLogin,
          isCellphoneLogin: true,
        })
        .then(async (res) => {
          const { data, errors } = res.data;
          if (errors) return;
          const isSetUserProfile = await this.SET_USER_PROFILE(
            data.userLoginV2,
          );
          const { merchants } = data.userLoginV2.user;
          if (!merchants || merchants.length === 0) {
            this.$swal.fire({ icon: 'error', title: '此帳號無可用商戶', showConfirmButton: true });
            return;
          }
          await this.SET_USER_CURRENT_MERCHANTID(
            merchants[0].id,
          );
          await this.getMe();
          await this.getMerchantAuthorities();
          const permissionReportList = await this.permissionReportList();
          await this.SET_USER_AUTHORIZELIST(permissionReportList);
          if (isSetUserProfile) {
            this.$router.replace('/');
          }
        });
    },
    async getMe() {
      const resp = await this.$api.me();
      const { data, errors } = resp.data;
      if (errors) return;
      try {
        this.merchantIdentity = data.me.merchantIdentity;
      } catch {
        this.merchantIdentity = {};
      }
    },
    async getMerchantAuthorities() {
      const resp = await this.$api.getMerchantAuthorities();
      const { data, errors } = resp.data;
      if (errors) return;
      try {
        this.merchantAuthorities = data.getMerchantAuthorities;
      } catch {
        this.merchantAuthorities = [];
      }
    },
    permissionReportList() {
      return new Promise((resolve) => {
        const identityAuthorities = this.merchantAuthorities.find(
          (item) => item.id === this.merchantIdentity.authorityId,
        );
        const authorityList = identityAuthorities && isJSON(identityAuthorities.authoritySettings)
          ? JSON.parse(identityAuthorities.authoritySettings)
          : [];
        const reportList = authorityList.flatMap((authority) => (authority.pageTitle !== '設計師手機版 權限設定'
          ? []
          : authority.pageAuthority));
        const permissionReportList = reportList.filter(
          (item) => item.authority,
        );
        resolve(permissionReportList);
      });
    },
    togglePwd() {
      if (this.inputType === 'text') {
        this.inputType = 'password';
      } else {
        this.inputType = 'text';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-page {
  background-color: #FAFAFA;
  font-family: Inter, "Noto Sans TC", system-ui, -apple-system, sans-serif;
}

/* Fade-up 進場動畫 */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-animate {
  opacity: 0;
  animation: fadeUp 0.6s ease-out forwards;
}

.login-animate-1 {
  animation-delay: 0s;
}

.login-animate-2 {
  animation-delay: 0.2s;
}

.login-animate-3 {
  animation-delay: 0.4s;
}
</style>
