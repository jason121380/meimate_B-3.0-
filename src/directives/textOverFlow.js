const vOverflow = {
  componentUpdated: (el, bind) => {
    if (bind.value === bind.oldValue) return;
    if (el.offsetWidth > el.parentNode.offsetWidth) {
      el.style.animation = 'moving 10s infinite linear';
    } else {
      el.style.animation = '';
    }
  },
};
export default vOverflow;
