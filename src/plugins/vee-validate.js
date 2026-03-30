import Vue from 'vue';

import {
  ValidationProvider, ValidationObserver, extend, localize,
} from 'vee-validate';

import { // eslint-disable-next-line
  required, email, max, min, alpha_num, alpha, numeric,
} from 'vee-validate/dist/rules';

import zh_TW from 'vee-validate/dist/locale/zh_TW.json';// eslint-disable-line

localize({ zh_TW }); // eslint-disable-line
localize('zh_TW');
extend('required', required);
extend('email', email);
extend('alpha_num', alpha_num);
extend('max', max);
extend('min', min);
extend('alpha', alpha);
extend('numeric', numeric);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
