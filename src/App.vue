<template>
  <div id="app">
    <router-view></router-view>
    <C-LoaderLay></C-LoaderLay>
  </div>
</template>

<script>
export default {
  name: 'root-instance',
  description: '根組件',
  data() {
    return {
      innerHeight: window.innerHeight,
    };
  },
  mounted() {
    this.$nextTick().then(() => {
      this.safariHacks();
    });
    window.onload = () => {
      document.body.addEventListener('dblclick', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    };
  },
  methods: {
    safariHacks() {
      const updateVH = () => {
        const vh = window.innerHeight / 100;
        document
          .querySelector('#app')
          .style.setProperty('--vh', `${vh}px`);
      };
      updateVH();
      window.addEventListener('resize', updateVH);
    },
  },
  computed: {},
};
</script>

<style lang="scss">
@import 'bootstrap-icons/font/bootstrap-icons.css';
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+TC:wght@100..900&display=swap");
html, body {
  overscroll-behavior-y: none;
  background: #FAFAFA;
}
#app {
  font-family: Inter, "Noto Sans TC", system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

//sweet alert 樣式管理 - 與 swal-theme.css 共存，保留結構性覆寫

.swal2-popup {
  width: 85% !important;
}

.swal2-title {
  font-size: 18px !important;
  font-weight: 600 !important;
  padding: 1rem !important;
  color: #111827 !important;
}

.swal2-input,
.swal2-file,
.swal2-textarea .swal2-close:focus,
.swal2-styled.swal2-confirm:focus,
.swal2-close:focus {
  box-shadow: none !important;
}

.swal2-input:focus,
.swal2-file:focus,
.swal2-textarea:focus {
  border: 1px solid #FF6B2C !important;
}

.swal2-input {
  height: auto !important;
  padding: 0.25rem 1rem !important;
  border: 1px solid #E5E5E5 !important;
}

.swal2-styled.swal2-deny,
.swal2-styled.swal2-confirm,
.swal2-styled.swal2-cancel {
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.5rem 40px 0.5rem 22px !important;
  font-size: 0.875rem !important;
  border-radius: 999px !important;
  font-weight: 500;
}

.swal2-styled.swal2-cancel {
  color: #6B7280 !important;
  background-color: #F3F4F6 !important;
  border: 1px solid #F0F0F0 !important;
}

.swal2-styled.swal2-confirm {
  background-color: #FF6B2C !important;
}

.swal2-styled.swal2-deny {
  background-color: #EF4444 !important;
  border: 1px solid #EF4444 !important;
}

.swal2-styled.swal2-deny::after,
.swal2-styled.swal2-cancel::after,
.swal2-styled.swal2-confirm::before,
.swal2-styled.swal2-confirm::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
}

.swal2-styled.swal2-confirm::before {
  width: 6px;
  height: 3px;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
  transform: rotate(-45deg);
  right: 21px;
}

.swal2-styled.swal2-deny::after,
.swal2-styled.swal2-cancel::after,
.swal2-styled.swal2-confirm::after {
  width: 1rem;
  aspect-ratio: 1/1;
  border: 1px solid #fff;
  border-radius: 50%;
  right: 16px;
}

.swal2-styled.swal2-deny::after,
.swal2-styled.swal2-cancel::after {
  content: "x";
  border-color: #9CA3AF;
  height: 1rem;
  line-height: 0.8;
  font-weight: 100;
}

.swal2-styled.swal2-deny::after {
  border-color: #fff;
}

// *{outline: 1px solid red;}
.month-picker {
  background-color: #fff;
}

.month-picker__month.selected,
.month-picker__month.selected-range-first,
.month-picker__month.selected-range-second {
  background-color: #FF6B2C !important;
  box-shadow: none !important;
  border-radius: 999px !important;
}

@keyframes moving {
  0% {
    transform: translateX(0px);
  }

  30% {
    transform: translateX(calc(12rem - 100%));
  }

  50% {
    transform: translateX(calc(12rem - 100%));
  }

  80% {
    transform: translateX(0px);
  }
}
</style>
