import Vue from 'vue';
import axios from 'axios';
import store from '@/store/index';
import router from '@/router/index';
import { uuidMehtod } from '@/plugins/uuid';

const axiosInstance = axios.create({
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Apollo-Require-Preflight': 'true',
  },
  baseURL: process.env.VUE_APP_BASE_API ? process.env.VUE_APP_BASE_API : 'https://apibeautyos.mlgroup.vip/graphql',
  timeout: 50000,
});

const { CancelToken } = axios;
let cancel;

axiosInstance.interceptors.request.use(
  async (config) => {
    const { userInfo, currentMechantId } = store.state.userInfo;
    const { headers, ...others } = config;
    if (userInfo) {
      headers.accesstoken = userInfo.token;
      headers.usermerchantid = currentMechantId;
    }
    const cancelToken = new CancelToken(((c) => { cancel = c; }));
    const uuid = uuidMehtod();
    if (config.data.query) {
      if ((config.baseURL.includes('graphql') && !config.data.query.includes('checkIsCellphoneUnwelcome')) || !config.baseURL.includes('graphql')) {
        store.dispatch('config/ADD_LOADING', { url: config.url, uuid });
        store.dispatch('config/ADD_REQUEST', { cancel, ...config });
      }
    }
    return {
      headers, uuid, cancelToken, ...others,
    };
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  async (response) => {
    const { data } = response;

    if (data.errors) {
      Vue.swal.fire({
        icon: 'error',
        title: data.errors[0].message,
        showClass: {
          popup: 'animate__animated animate__bounceIn',
        },
        timerProgressBar: true,
        showConfirmButton: false,
        timer: 2500,
      });
      const errorsMessageList = Array.isArray(data.errors) ? data.errors.map((errItem) => (errItem.message)) : [];
      const validLogoutKeywordList = ['登入時效過期，請重新登入', '登入憑證無效，請重新登入'];
      const hasLogoutKeyword = errorsMessageList.find((errMsg) => validLogoutKeywordList.includes(errMsg)); // return String or undefined
      if (typeof hasLogoutKeyword === 'string') {
        await store.dispatch('userInfo/SET_USER_PROFILE', null);
        router.push('/login');
      } else if (errorsMessageList.includes('查無事件')) {
        router.push('/ScheduleBreak');
      }
    }
    if (response) {
      store.dispatch('config/REMOVE_LOADING', { url: response.config.url, uuid: response.config.uuid });
      store.dispatch('config/REMOVE_REQUEST', { uuid: response.config.uuid });
    }
    return response;
  },
  (error) => {
    const { response, config } = error;
    if (response) {
      store.dispatch('config/REMOVE_REQUEST', { uuid: response.config.uuid });
      store.dispatch('config/REMOVE_LOADING', { url: response.config.url, uuid: response.config.uuid });
      return Promise.reject(error);
    }
    Vue.swal.fire({
      icon: 'error',
      title: error.message,
      showClass: {
        popup: 'animate__animated animate__bounceIn',
      },
      timerProgressBar: true,
      showConfirmButton: false,
      timer: 2500,
    });
    if (response) {
      store.dispatch('config/REMOVE_REQUEST', { uuid: config.uuid });
      store.dispatch('config/REMOVE_LOADING', { url: config.url, uuid: config.uuid });
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
