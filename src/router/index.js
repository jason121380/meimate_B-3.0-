import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import ClockIn from '../views/ClockIn.vue';

const Home = () => import('../views/Home.vue');
const HomeIndex = () => import('../views/Home/index.vue');

const Order = () => import('../views/Home/order.vue');
const OrderIndex = () => import('../views/Home/order/index.vue');
const OrderList = () => import('../views/Home/order/list.vue');

const Punch = () => import('../views/Home/punch.vue');
const PunchIndex = () => import('../views/Home/punch/index.vue');
const PunchList = () => import('../views/Home/punch/list.vue');

const ScheduleBreak = () => import('../views/Home/scheduleBreak.vue');
const ScheduleBreakIndex = () => import('../views/Home/scheduleBreak/index.vue');
const ScheduleBreakDuotone = () => import('../views/Home/scheduleBreak/duotone.vue');
const ScheduleBreakList = () => import('../views/Home/scheduleBreak/list.vue');
const ScheduleBreakAdd = () => import('../views/Home/scheduleBreak/add.vue');
const ScheduleBreakSelectService = () => import('../views/Home/scheduleBreak/selectService.vue');
const ScheduleBreakEvent = () => import('../views/Home/scheduleBreak/event.vue');
const ScheduleBreakEventDetail = () => import('../views/Home/scheduleBreak/eventDetail.vue');
const ScheduleBreakDetail = () => import('../views/Home/scheduleBreak/detail.vue');
const ScheduleBreakDaily = () => import('../views/Home/scheduleBreak/daily.vue');

const PriceList = () => import('../views/Home/priceList.vue');
const PriceListIndex = () => import('../views/Home/priceList/index.vue');

const Coupon = () => import('../views/Home/coupon.vue');
const CouponIndex = () => import('../views/Home/coupon/index.vue');
const CouponHistory = () => import('../views/Home/coupon/history.vue');
const CouponDelivery = () => import('../views/Home/coupon/delivery.vue');
const CouponDeliveryHistory = () => import('../views/Home/coupon/deliveryHistory.vue');
const CouponDeliveryRes = () => import('../views/Home/coupon/deliveryRes.vue');

const Bonus = () => import('../views/Home/bonus.vue');
const BonusIndex = () => import('../views/Home/bonus/index.vue');
const BonusHistory = () => import('../views/Home/bonus/history.vue');
const BonusDelivery = () => import('../views/Home/bonus/delivery.vue');
const BonusDeliveryHistory = () => import('../views/Home/bonus/deliveryHistory.vue');
const BonusDeliveryRes = () => import('../views/Home/bonus/deliveryRes.vue');

const Report = () => import('../views/Home/report.vue');
const ReportIndex = () => import('../views/Home/report/index.vue');
const ReportAnalysis = () => import('../views/Home/report/analysis.vue');
const ReportSalary = () => import('../views/Home/report/salary.vue');
const ReportDailyReport = () => import('../views/Home/report/dailyReport.vue');
const ReportBill = () => import('../views/Home/report/bill.vue');
const ReportEmpEarn = () => import('../views/Home/report/empEarn.vue');
const ReportProfitCut = () => import('../views/Home/report/profitCut.vue');
const ReportDrawDetail = () => import('../views/Home/report/drawDetail.vue');

const Customer = () => import('../views/Home/customer.vue');
const CustomerIndex = () => import('../views/Home/customer/index.vue');
const CustomerUserInfo = () => import('../views/Home/customer/userInfo.vue');

const EmployeeSchedule = () => import('../views/Home/employeeSchedule.vue');
const EmployeeScheduleIndex = () => import('../views/Home/employeeSchedule/index.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/clock-in',
    name: 'ClockIn',
    component: ClockIn,
  },
  { path: '/line/receive', redirect: '/stylist' },
  {
    path: '/',
    component: Home,
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeIndex,
        meta: {
          requireAuth: true,
        },
      },
      {
        // 預約總覽
        path: 'Order',
        component: Order,
        meta: {
          requireAuth: true,
        },
        children: [
          {
            path: '',
            name: 'Order',
            component: OrderIndex,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'list',
            name: 'Order-list',
            component: OrderList,
            meta: {
              requireAuth: true,
            },
          },
        ],
      },
      {
        // 打卡
        path: 'Punch',
        component: Punch,
        meta: {
          requireAuth: true,
        },
        children: [
          {
            path: '',
            name: 'Punch',
            component: PunchIndex,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'list',
            name: 'Punch-list',
            component: PunchList,
            meta: {
              requireAuth: true,
            },
          },
        ],
      },
      {
        // 行事曆
        path: 'ScheduleBreak',
        component: ScheduleBreak,
        meta: {
          requireAuth: true,
        },
        children: [
          {
            path: '',
            name: 'ScheduleBreak',
            component: ScheduleBreakIndex,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'duotone',
            name: 'ScheduleBreak-Duotone',
            component: ScheduleBreakDuotone,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'list',
            name: 'ScheduleBreak-List',
            component: ScheduleBreakList,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'add',
            name: 'ScheduleBreak-Add',
            component: ScheduleBreakAdd,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'event',
            name: 'ScheduleBreak-Event',
            component: ScheduleBreakEvent,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'eventDetail',
            name: 'ScheduleBreak-EventDetail',
            component: ScheduleBreakEventDetail,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'detail',
            name: 'ScheduleBreak-Detail',
            component: ScheduleBreakDetail,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'daily',
            name: 'ScheduleBreak-Daily',
            component: ScheduleBreakDaily,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'SelectService',
            name: 'ScheduleBreak-SelectService',
            component: ScheduleBreakSelectService,
            meta: {
              requireAuth: true,
            },
          },
        ],
      },
      {
        // 價目表
        path: 'PriceList',
        component: PriceList,
        meta: {
          requireAuth: true,
        },
        children: [
          {
            path: '',
            name: 'PriceList',
            component: PriceListIndex,
            meta: {
              requireAuth: true,
            },
          },
        ],
      },
      {
        path: 'Coupon',
        component: Coupon,
        meta: {
          requireAuth: true,
        },
        children: [
          {
            path: '',
            name: 'Coupon',
            component: CouponIndex,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'history',
            name: 'Coupon-History',
            component: CouponHistory,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'delivery',
            name: 'Coupon-Delivery',
            component: CouponDelivery,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'delivery-history',
            name: 'Coupon-Delivery-History',
            component: CouponDeliveryHistory,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'delivery-res',
            name: 'Coupon-Delivery-Res',
            component: CouponDeliveryRes,
            meta: {
              requireAuth: true,
            },
          },
        ],
      },
      {
        path: 'Bonus',
        component: Bonus,
        meta: {
          requireAuth: true,
        },
        children: [
          {
            path: '',
            name: 'Bonus',
            component: BonusIndex,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'history',
            name: 'Bonus-History',
            component: BonusHistory,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'delivery',
            name: 'Bonus-Delivery',
            component: BonusDelivery,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'delivery-history',
            name: 'Bonus-Delivery-History',
            component: BonusDeliveryHistory,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'delivery-res',
            name: 'Bonus-Delivery-Res',
            component: BonusDeliveryRes,
            meta: {
              requireAuth: true,
            },
          },
        ],
      },
      {
        // 報表
        path: 'Report',
        component: Report,
        meta: {
          requireAuth: true,
        },
        children: [
          {
            path: '',
            name: 'Report',
            component: ReportIndex,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'analysis',
            name: 'Report-analysis',
            component: ReportAnalysis,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'salary',
            name: 'Report-salary',
            component: ReportSalary,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'daily-report',
            name: 'Report-daily-report',
            component: ReportDailyReport,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'bill',
            name: 'Report-bill',
            component: ReportBill,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'emp-earn',
            name: 'Report-emp-earn',
            component: ReportEmpEarn,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'profit-cut',
            name: 'Report-profit-cut',
            component: ReportProfitCut,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'draw-detail',
            name: 'Report-draw-detail',
            component: ReportDrawDetail,
            meta: {
              requireAuth: true,
            },
          },
        ],
      },
      {
        path: 'Customer',
        component: Customer,
        meta: {
          requireAuth: true,
        },
        children: [
          {
            path: '',
            name: 'Customer',
            component: CustomerIndex,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'user-info',
            name: 'Customer-UserInfo',
            component: CustomerUserInfo,
            meta: {
              requireAuth: true,
            },
          },
        ],
      },
      {
        path: 'EmployeeSchedule',
        component: EmployeeSchedule,
        meta: {
          requireAuth: true,
        },
        children: [
          {
            path: '',
            name: 'EmployeeSchedule',
            component: EmployeeScheduleIndex,
            meta: {
              requireAuth: true,
            },
          },
        ],
      },
    ],
  },
];
// 路由導向本身的時候接住錯誤
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
// 每個路由都增加openExternalBrowser=1參數
// router.beforeEach((to, from, next) => {
//   if (!to.query.openExternalBrowser) {
//     next({ ...to, query: { ...to.query, openExternalBrowser: 1 } });
//   } else {
//     next();
//   }
// });
export default router;
