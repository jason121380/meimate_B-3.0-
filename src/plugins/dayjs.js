import Vue from 'vue';
import dayjs from 'dayjs';
import zhTW from 'dayjs/locale/zh-tw';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.locale(zhTW);
dayjs.extend(duration);
dayjs.extend(isBetween);

const timePlugin = {
  install: () => { Vue.prototype.$dayjs = dayjs; },
};

Vue.use(timePlugin);
