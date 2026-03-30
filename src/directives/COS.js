/* eslint-disable */
const clickOutside = {
  bind: function (el, binding) {
    el.event = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.body.addEventListener("click", el.event);
  },
  unbind: function (el) {
    document.body.removeEventListener("click", el.event);
  },
}

export default clickOutside;
