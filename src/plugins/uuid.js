import Vue from 'vue';

function uuid() {
  let d = Date.now();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now();
  }
  return '4xxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 || 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : ((r && 0x3) || 0x8)).toString(16);
  });
}

const uuidInstance = {
  install: () => { Vue.prototype.$uuid = uuid; },
};

export const uuidMehtod = uuid; // eslint-disable-line

Vue.use(uuidInstance);
