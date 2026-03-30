import Vue from 'vue';
import axiosInstancePackage from './axiosInstancePackage';

import userLoginV2 from './services/userLoginV2';
import services from './services/services';
import userLogout from './services/userLogout';
import orders from './services/orders';
import order from './services/order';
import user from './services/user';
import VerifyBookingInput from './services/VerifyBookingInput';
import bookingV2 from './services/bookingV2';
import getBookingTimes from './services/getBookingTimes';
import unspecifiedBookingTimes from './services/unspecifiedBookingTimes';
import customers from './services/customers';
import customer from './services/customer';
import getBookingItemCategory from './services/getBookingItemCategory';
import designerDailyReport from './services/designerDailyReport';
import nonDesignationBooking from './services/nonDesignationBooking';
import updateBooking from './services/updateBooking';
import me from './services/me';
import getMerchantAuthorities from './services/getMerchantAuthorities';
import dailyClockInRecord from './services/dailyClockInRecord';
import attendanceRecords from './services/attendanceRecords';
import userClockIn from './services/userClockIn';
import getDesignerBookingTimesWithRange from './services/getDesignerBookingTimesWithRange';
import adminBookingTime from './services/adminBookingTime';
import adminBookingTimeWholeDay from './services/adminBookingTimeWholeDay';
import getRegularHoliday from './services/getRegularHoliday';
import getRegularHolidaySetting from './services/getRegularHolidaySetting';
import setRegularHoliday from './services/setRegularHoliday';
import walletDepositRecord from './services/walletDepositRecord';
import walletUseRecord from './services/walletUseRecord';
import designerOrders from './services/designerOrders';
import customerWallet from './services/customerWallet';
import getUserHelperRetrieve from './services/getUserHelperRetrieve';
import customersWithoutSorting from './services/customersWithoutSorting';
import userRakeReport from './services/userRakeReport';
import getAllBookingTimesWithRange from './services/getAllBookingTimesWithRange';
import getIsMerchantScheduleDisplay from './services/getIsMerchantScheduleDisplay';
import customerCouponBalanceReport from './services/customerCouponBalanceReport';
import getIsDisplayHelperRetrieveInDailyReport from './services/getIsDisplayHelperRetrieveInDailyReport';
import getIsUsingMathRoundInDesignerDailyReport from './services/getIsUsingMathRoundInDesignerDailyReport';
import getIsZeroValueHiddenOnDailyReport from './services/getIsZeroValueHiddenOnDailyReport';
import getPriceDisplayOnDailyReportDefault from './services/getPriceDisplayOnDailyReportDefault';
import checkGPSStatus from './services/checkGPSStatus';
import setUserAvatar from './services/setUserAvatar';
import getMerchantNewsTicker from './services/getMerchantNewsTicker';
import designerPerforamnceAnalyzeReport from './services/designerPerforamnceAnalyzeReport';
import users from './services/users';
import userSalaryReport from './services/userSalaryReport';
import createBookingItemCategory from './services/createBookingItemCategory';
import updateBookingItemCategory from './services/updateBookingItemCategory';
import deleteBookingItemCategory from './services/deleteBookingItemCategory';
import createBookingItem from './services/createBookingItem';
import updateBookingItem from './services/updateBookingItem';
import deleteBookingItem from './services/deleteBookingItem';
import updateBookingItemSorting from './services/updateBookingItemSorting';
import updateBookingItemCategorySorting from './services/updateBookingItemCategorySorting';
import userBindWithLine from './services/userBindWithLine';
import createEvent from './services/createEvent';
import deleteEvent from './services/deleteEvent';
import getEvent from './services/getEvent';
import updateEvent from './services/updateEvent';
import helperDailyReport from './services/helperDailyReport';
import products from './services/products';
import productOrdersWithoutPaging from './services/productOrdersWithoutPaging';
import getIsDisplayAllOrderForCellphone from './services/getIsDisplayAllOrderForCellphone';
import userUpdateLastName from './services/userUpdateLastName';
import userUpdateFirstName from './services/userUpdateFirstName';
import userUpdateNickName from './services/userUpdateNickName';
import userUpdateGender from './services/userUpdateGender';
import userUpdateBirthday from './services/userUpdateBirthday';
import changePasswordForCellphone from './services/changePasswordForCellphone';
import getDesignerCalendar from './services/getDesignerCalendar';
import getDesignerReservation from './services/getDesignerReservation';
import checkIsCustomerExist from './services/checkIsCustomerExist';
import getServiceAttributions from './services/getServiceAttributions';
import setCustomerIsUnwelcome from './services/setCustomerIsUnwelcome';
import checkIsCellphoneUnwelcome from './services/checkIsCellphoneUnwelcome';
import getIsAllCusDisplay from './services/getIsAllCusDisplay';
import getCustomerHairInfo from './services/getCustomerHairInfo';
import getMerchantHairCondition from './services/getMerchantHairCondition';
import SetCustomerHairInfo from './services/SetCustomerHairInfo';
import getDesignerExternalLink from './services/getDesignerExternalLink';
import getIsBookingTimeNoLimit from './services/getIsBookingTimeNoLimit';
import getIsBookingCusCheckUsing from './services/getIsBookingCusCheckUsing';
import getUnCheckedReservationCount from './services/getUnCheckedReservationCount';
import userQrcodeClockIn from './services/userQrcodeClockIn';
import userLoginAndQrcodeClockIn from './services/userLoginAndQrcodeClockIn';
import adminBookingTimes from './services/adminBookingTimes';
import attendanceRecordsForSchedule from './services/attendanceRecordsForSchedule';
import getLineBindLinkForDesigner from './services/getLineBindLinkForDesigner';
import getNDBookingItemCategory from './services/getNDBookingItemCategory';
import getNDBookingItem from './services/getNDBookingItem';
import createNDBookingItemCategory from './services/createNDBookingItemCategory';
import updateNDBookingItemCategory from './services/updateNDBookingItemCategory';
import updateNDBookingItemCategorySorting from './services/updateNDBookingItemCategorySorting';
import deleteNDBookingItemCategory from './services/deleteNDBookingItemCategory';
import createNDBookingItem from './services/createNDBookingItem';
import updateNDBookingItem from './services/updateNDBookingItem';
import updateNDBookingItemSorting from './services/updateNDBookingItemSorting';
import deleteNDBookingItem from './services/deleteNDBookingItem';
import getIsCBRDStylist from './services/getIsCBRDStylist';

const axiosPackageOptions = {
  userLoginV2: userLoginV2(axiosInstancePackage),
  services: services(axiosInstancePackage),
  userLogout: userLogout(axiosInstancePackage),
  orders: orders(axiosInstancePackage),
  order: order(axiosInstancePackage),
  designerOrders: designerOrders(axiosInstancePackage),
  user: user(axiosInstancePackage),
  VerifyBookingInput: VerifyBookingInput(axiosInstancePackage),
  bookingV2: bookingV2(axiosInstancePackage),
  getBookingTimes: getBookingTimes(axiosInstancePackage),
  unspecifiedBookingTimes: unspecifiedBookingTimes(axiosInstancePackage),
  customers: customers(axiosInstancePackage),
  designerDailyReport: designerDailyReport(axiosInstancePackage),
  nonDesignationBooking: nonDesignationBooking(axiosInstancePackage),
  updateBooking: updateBooking(axiosInstancePackage),
  me: me(axiosInstancePackage),
  getMerchantAuthorities: getMerchantAuthorities(axiosInstancePackage),
  dailyClockInRecord: dailyClockInRecord(axiosInstancePackage),
  attendanceRecords: attendanceRecords(axiosInstancePackage),
  userClockIn: userClockIn(axiosInstancePackage),
  getDesignerBookingTimesWithRange: getDesignerBookingTimesWithRange(axiosInstancePackage),
  adminBookingTime: adminBookingTime(axiosInstancePackage),
  getRegularHoliday: getRegularHoliday(axiosInstancePackage),
  getRegularHolidaySetting: getRegularHolidaySetting(axiosInstancePackage),
  setRegularHoliday: setRegularHoliday(axiosInstancePackage),
  walletDepositRecord: walletDepositRecord(axiosInstancePackage),
  walletUseRecord: walletUseRecord(axiosInstancePackage),
  customerWallet: customerWallet(axiosInstancePackage),
  getUserHelperRetrieve: getUserHelperRetrieve(axiosInstancePackage),
  customersWithoutSorting: customersWithoutSorting(axiosInstancePackage),
  userRakeReport: userRakeReport(axiosInstancePackage),
  getAllBookingTimesWithRange: getAllBookingTimesWithRange(axiosInstancePackage),
  getIsMerchantScheduleDisplay: getIsMerchantScheduleDisplay(axiosInstancePackage),
  customerCouponBalanceReport: customerCouponBalanceReport(axiosInstancePackage),
  adminBookingTimeWholeDay: adminBookingTimeWholeDay(axiosInstancePackage),
  getIsDisplayHelperRetrieveInDailyReport: getIsDisplayHelperRetrieveInDailyReport(axiosInstancePackage),
  getIsUsingMathRoundInDesignerDailyReport: getIsUsingMathRoundInDesignerDailyReport(axiosInstancePackage),
  getIsZeroValueHiddenOnDailyReport: getIsZeroValueHiddenOnDailyReport(axiosInstancePackage),
  getPriceDisplayOnDailyReportDefault: getPriceDisplayOnDailyReportDefault(axiosInstancePackage),
  checkGPSStatus: checkGPSStatus(axiosInstancePackage),
  setUserAvatar: setUserAvatar(axiosInstancePackage),
  getMerchantNewsTicker: getMerchantNewsTicker(axiosInstancePackage),
  designerPerforamnceAnalyzeReport: designerPerforamnceAnalyzeReport(axiosInstancePackage),
  users: users(axiosInstancePackage),
  userSalaryReport: userSalaryReport(axiosInstancePackage),
  customer: customer(axiosInstancePackage),
  getBookingItemCategory: getBookingItemCategory(axiosInstancePackage),
  createBookingItemCategory: createBookingItemCategory(axiosInstancePackage),
  updateBookingItemCategory: updateBookingItemCategory(axiosInstancePackage),
  deleteBookingItemCategory: deleteBookingItemCategory(axiosInstancePackage),
  createBookingItem: createBookingItem(axiosInstancePackage),
  updateBookingItem: updateBookingItem(axiosInstancePackage),
  deleteBookingItem: deleteBookingItem(axiosInstancePackage),
  updateBookingItemSorting: updateBookingItemSorting(axiosInstancePackage),
  updateBookingItemCategorySorting: updateBookingItemCategorySorting(axiosInstancePackage),
  userBindWithLine: userBindWithLine(axiosInstancePackage),
  createEvent: createEvent(axiosInstancePackage),
  deleteEvent: deleteEvent(axiosInstancePackage),
  helperDailyReport: helperDailyReport(axiosInstancePackage),
  productOrdersWithoutPaging: productOrdersWithoutPaging(axiosInstancePackage),
  products: products(axiosInstancePackage),
  getIsDisplayAllOrderForCellphone: getIsDisplayAllOrderForCellphone(axiosInstancePackage),
  userUpdateLastName: userUpdateLastName(axiosInstancePackage),
  userUpdateFirstName: userUpdateFirstName(axiosInstancePackage),
  userUpdateNickName: userUpdateNickName(axiosInstancePackage),
  userUpdateGender: userUpdateGender(axiosInstancePackage),
  userUpdateBirthday: userUpdateBirthday(axiosInstancePackage),
  changePasswordForCellphone: changePasswordForCellphone(axiosInstancePackage),
  getDesignerCalendar: getDesignerCalendar(axiosInstancePackage),
  getDesignerReservation: getDesignerReservation(axiosInstancePackage),
  checkIsCustomerExist: checkIsCustomerExist(axiosInstancePackage),
  getServiceAttributions: getServiceAttributions(axiosInstancePackage),
  setCustomerIsUnwelcome: setCustomerIsUnwelcome(axiosInstancePackage),
  checkIsCellphoneUnwelcome: checkIsCellphoneUnwelcome(axiosInstancePackage),
  getIsAllCusDisplay: getIsAllCusDisplay(axiosInstancePackage),
  getCustomerHairInfo: getCustomerHairInfo(axiosInstancePackage),
  getMerchantHairCondition: getMerchantHairCondition(axiosInstancePackage),
  SetCustomerHairInfo: SetCustomerHairInfo(axiosInstancePackage),
  getDesignerExternalLink: getDesignerExternalLink(axiosInstancePackage),
  getEvent: getEvent(axiosInstancePackage),
  updateEvent: updateEvent(axiosInstancePackage),
  getIsBookingTimeNoLimit: getIsBookingTimeNoLimit(axiosInstancePackage),
  getIsBookingCusCheckUsing: getIsBookingCusCheckUsing(axiosInstancePackage),
  getUnCheckedReservationCount: getUnCheckedReservationCount(axiosInstancePackage),
  userQrcodeClockIn: userQrcodeClockIn(axiosInstancePackage),
  userLoginAndQrcodeClockIn: userLoginAndQrcodeClockIn(axiosInstancePackage),
  adminBookingTimes: adminBookingTimes(axiosInstancePackage),
  attendanceRecordsForSchedule: attendanceRecordsForSchedule(axiosInstancePackage),
  getLineBindLinkForDesigner: getLineBindLinkForDesigner(axiosInstancePackage),
  getNDBookingItemCategory: getNDBookingItemCategory(axiosInstancePackage),
  getNDBookingItem: getNDBookingItem(axiosInstancePackage),
  createNDBookingItemCategory: createNDBookingItemCategory(axiosInstancePackage),
  updateNDBookingItemCategory: updateNDBookingItemCategory(axiosInstancePackage),
  updateNDBookingItemCategorySorting: updateNDBookingItemCategorySorting(axiosInstancePackage),
  deleteNDBookingItemCategory: deleteNDBookingItemCategory(axiosInstancePackage),
  createNDBookingItem: createNDBookingItem(axiosInstancePackage),
  updateNDBookingItem: updateNDBookingItem(axiosInstancePackage),
  updateNDBookingItemSorting: updateNDBookingItemSorting(axiosInstancePackage),
  deleteNDBookingItem: deleteNDBookingItem(axiosInstancePackage),
  getIsCBRDStylist: getIsCBRDStylist(axiosInstancePackage),
};

const axiosPackage = {
  install: () => { Vue.prototype.$api = axiosPackageOptions; },
};

Vue.use(axiosPackage);
