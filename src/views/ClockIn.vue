<template>
  <main>
    <section>
      <div class="relative w-full border-none bg-default-color transition-none lg:h-28">
        <div
          v-once
          class="flex items-center justify-between border-none bg-gradient-to-r from-meimate-yellow to-meimate-pink px-[6%] py-4 text-lg text-white lg:mx-10 lg:mt-10 lg:h-[78px] lg:rounded-[2rem] lg:px-6 lg:py-0"
        >
          <div class="flex items-center">
            <div class="flex gap-1 pl-2">
              <img src="@/static/logo_meimate.svg" alt="" class="h-10 w-36 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="mx-auto mt-10 w-full max-w-screen-md px-4 md:px-0">
      <template v-if="success">
        <div class="mt-[75px] flex flex-col items-center justify-center gap-2">
          <i class="bi bi-calendar-check text-[100px] text-green-500"></i>
          <span class="text-xl">打卡成功</span>
        </div>
      </template>
      <template v-else>
        <div class="text-gray-dark py-5 text-center text-2xl font-bold">設計師打卡</div>
        <div class="card mt-4 flex w-full flex-col justify-start p-5 md:p-9">
          <ValidationObserver ref="loginForm">
            <form>
              <ValidationProvider
                ref="form.userAccount"
                name="帳號"
                rules="required"
                v-slot="{ errors }"
              >
                <C-Input
                  @doFunction="$refs.code.$el.focus()"
                  type="tel"
                  v-bind="{ label: '帳號' }"
                  v-model="form.userAccount"
                  :errors="errors"
                ></C-Input>
              </ValidationProvider>
              <ValidationProvider
                ref="form.userpwd"
                name="密碼"
                rules="required"
                v-slot="{ errors }"
              >
                <C-Input
                  @doFunction="doClockIn"
                  v-bind="{ label: '密碼', type: inputType }"
                  ref="code"
                  v-model="form.userpwd"
                  :errors="errors"
                >
                  <template v-slot:endIcon>
                    <i
                      class="bi mr-1 text-xl"
                      :class="inputType === 'text' ? 'bi-eye-slash-fill' : 'bi-eye-fill'"
                      @click="togglePwd"
                      @keypress="togglePwd"
                    />
                  </template>
                </C-Input>
              </ValidationProvider>

              <button
                @click.prevent="doClockIn"
                v-ripple="100"
                type="button"
                class="mx-auto flex w-full items-center justify-center gap-3 rounded-3xl bg-meimate-pink py-3 text-sm text-white shadow-md duration-300 md:max-w-[450px]"
              >
                打卡
              </button>
            </form>
          </ValidationObserver>
        </div>
      </template>
    </section>
  </main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'check-in-page',
  metaInfo: {
    title: 'Meimate Stylist',
  },
  data() {
    return {
      form: {
        userAccount: '',
        userpwd: '',
      },
      inputType: 'password',
      success: false,
    };
  },

  methods: {
    ...mapActions('userInfo', [
      'SET_USER_PROFILE',
      'SET_USER_CURRENT_MERCHANTID',
      'SET_USER_AUTHORIZELIST',
    ]),
    async doClockIn() {
      const isValid = await this.$refs.loginForm.validate();
      if (!isValid) return;
      const { storeId, key, status } = this.$route.query;
      const inputData = {
        storeId,
        key,
        status,
        password: this.form.userpwd,
        cellphone: this.form.userAccount,
      };
      try {
        const res = await this.$api.userLoginAndQrcodeClockIn(inputData);
        if (!res.data.errors) {
          this.success = true;
        }
      } catch (error) { /* ignore */ }
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
