import Vue from 'vue';
import dayjs from 'dayjs';

Vue.filter('dateFormat', (value) => value - 1911);
Vue.filter('dateFmtYYYYMMDD', (value, inputFormat = 'YYYY-MM-DD HH:mm:ss', outputFormat = 'YYYY/MM/DD') => { // TODO: 有機會再翻掉，或者寫dayjs的extend
  const date = dayjs(value, inputFormat);
  let [dateFormat, dateFormatROC] = [];
  if (date.isValid()) {
    dateFormat = date.format(outputFormat);
    const [ROC, MM, DD] = dateFormat.split('/');
    dateFormatROC = `${ROC}/${MM}/${DD}`;
  } else {
    dateFormatROC = value;
  }
  return dateFormatROC;
});
Vue.filter('dateFmtROCMMDD', (value, inputFormat = 'YYYY-MM-DD HH:mm:ss', outputFormat = 'YYYY/MM/DD') => { // TODO: 有機會再翻掉，或者寫dayjs的extend
  const date = dayjs(value, inputFormat);
  let [dateFormat, dateFormatROC] = [];
  if (date.isValid()) {
    dateFormat = date.format(outputFormat);
    const [ROC, MM, DD] = dateFormat.split('/');
    dateFormatROC = `${ROC - 1911}/${MM}/${DD}`;
  } else {
    dateFormatROC = value;
  }
  return dateFormatROC;
});

Vue.filter('dateFmtdot', (value, inputFormat = 'YYYY-MM-DD HH:mm:ss', outputFormat = 'YYYY.MM.DD') => { // TODO: 有機會再翻掉，或者寫dayjs的extend
  const date = dayjs(value, inputFormat);
  let [dateFormat, dateFormatROC] = [];
  if (date.isValid()) {
    dateFormat = date.format(outputFormat);
    const [ROC, MM, DD] = dateFormat.split('.');
    dateFormatROC = `${ROC}.${MM}.${DD}`;
  } else {
    dateFormatROC = value;
  }
  return dateFormatROC;
});

Vue.filter('dateFmtROCMMDDdd', (value, inputFormat = 'YYYY-MM-DD HH:mm:ss', outputFormat = 'YYYY/MM/DD (dd)') => { // TODO: 有機會再翻掉，或者寫dayjs的extend
  const date = dayjs(value, inputFormat);
  let [dateFormat, dateFormatROC] = [];
  if (date.isValid()) {
    dateFormat = date.format(outputFormat);
    const [ROC, MM, DD] = dateFormat.split('/');
    dateFormatROC = `${ROC - 1911}/${MM}/${DD}`;
  } else {
    dateFormatROC = value;
  }
  return dateFormatROC;
});
Vue.filter('dateFmtMMDDdd', (value, inputFormat = 'YYYY-MM-DD HH:mm:ss', outputFormat = 'YYYY/MM/DD (dd)') => { // TODO: 有機會再翻掉，或者寫dayjs的extend
  const date = dayjs(value, inputFormat);
  let [dateFormat, dateFormatROC] = [];
  if (date.isValid()) {
    dateFormat = date.format(outputFormat);
    const [, MM, DD] = dateFormat.split('/');
    dateFormatROC = `${MM}/${DD}`;
  } else {
    dateFormatROC = value;
  }
  return dateFormatROC;
});
Vue.filter('dateFmtMMDDdddot', (value, inputFormat = 'YYYY-MM-DD HH:mm:ss', outputFormat = 'YYYY/MM/DD (dd)') => { // TODO: 有機會再翻掉，或者寫dayjs的extend
  const date = dayjs(value, inputFormat);
  let [dateFormat, dateFormatROC] = [];
  if (date.isValid()) {
    dateFormat = date.format(outputFormat);
    const [, MM, DD] = dateFormat.split('/');
    dateFormatROC = `${MM}.${DD}`;
  } else {
    dateFormatROC = value;
  }
  return dateFormatROC;
});

Vue.filter('dateFmtdd', (value, inputFormat = 'YYYY-MM-DD HH:mm:ss', outputFormat = '(dd)') => { // TODO: 有機會再翻掉，或者寫dayjs的extend
  const date = dayjs(value, inputFormat);
  let dateFormat = '';
  if (date.isValid()) {
    dateFormat = date.format(outputFormat);
  }
  return dateFormat;
});

Vue.filter('dateFmtHm', (value, inputFormat = 'YYYY-MM-DD HH:mm:ss', outputFormat = 'HH:mm') => { // TODO: 有機會再翻掉，或者寫dayjs的extend
  const date = dayjs(value, inputFormat);
  let dateFormat = '--';
  if (date.isValid()) {
    dateFormat = date.format(outputFormat);
  }
  return dateFormat;
});
