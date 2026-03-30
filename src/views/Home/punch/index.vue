<template>
  <C-Main-Block>
    <C-Back-Nav :title="'打卡'" :rightIcon="rightIconDisplay" @iconEvent="doRoute"></C-Back-Nav>
    <section class="mx-auto mt-20 w-full max-w-screen-md px-5 lg:mt-40 lg:px-10">
      <div class="card card-body !pt-10">
        <div class="relative flex justify-center">
          <div class="my-5 flex items-center gap-4 text-lg">
            <p :class="locationInfoClass" class="font-bold">
              <i class="bi bi-geo-alt mr-3"/>{{ locationInfo }}
            </p>
            <i
              @click="reFreshLocation"
              @keypress="reFreshLocation"
              class="bi bi-arrow-repeat text-stone-600"
              :class="{'animate-spin-slow': locationInfo === '取得GPS座標中'}"
            />
          </div>
          <i
            v-if="isQRCodeClockIn"
            @click="scanBarcode"
            @keypress="scanBarcode"
            class="bi bi-upc-scan absolute right-0 top-1/2 -translate-y-1/2 text-2xl"
          />
        </div>
        <div class=" mb-1 text-center text-7xl font-bold tracking-wider text-black">
          {{ currentTime | dateFmtHm }}
        </div>
        <div class="text-md mb-2 text-center font-bold tracking-wider text-meimate-blue-gray">
          {{ currentTime | dateFmtYYYYMMDD }}
        </div>
        <template v-if="isGPSClockIn">
          <div class="mb-7 mt-10 flex w-full justify-between gap-4 text-center"
            :class="{ 'mb-3': clockInRecordInList && isHasNotClockout }">
            <div
              class="w-full select-none rounded-full bg-meimate-pink px-10 py-2.5 text-xl font-bold text-white shadow-meimate-button"
              @click="doAttendance('CLOCKIN')" @keypress="doAttendance('CLOCKIN')">
              上班
            </div>
            <div
              class="w-full select-none rounded-full bg-meimate-pink px-10 py-2.5 text-xl font-bold text-white shadow-meimate-button"
              @click="doAttendance('CLOCKOUT')" @keypress="doAttendance('CLOCKOUT')">
              下班
            </div>
          </div>

          <div class="mb-7 grid grid-cols-2 gap-4 text-center" v-if="clockInRecordInList && isHasNotClockout">
            <div
              class="select-none rounded-full bg-meimate-yellow px-10 py-2.5 text-xl font-bold text-white shadow-meimate-button"
              @click="doOutPunch(true), doAttendance('BREAKSTART')"
              @keypress="doOutPunch(true), doAttendance('BREAKSTART')">
              外出
            </div>
            <div
              class="select-none rounded-full bg-meimate-yellow px-10 py-2.5 text-xl font-bold text-white shadow-meimate-button"
              @click="doOutPunch(false), doAttendance('BREAKEND')" @keypress="doOutPunch(false), doAttendance('BREAKEND')">
              歸來
            </div>
          </div>
        </template>
        <p v-else class=" my-2 text-center text-sm text-meimate-pink">
          未開放座標定位打卡功能
        </p>

        <template v-if="isDailyClockInRecordHasClockInRecord">
          <div class="text-left" v-for="(recordItem, index) in dailyClockInRecord.clockInRecord" :key="index"
            :class="{ 'mb-4': isDailyClockInRecordHasClockInRecord }">
            <div class="mb-1 grid grid-cols-2 rounded-xl bg-meimate-beige/50 px-4 py-2 text-sm"
              :class="{ 'pointer-events-none': recordItem.breakRecord.length <= 0 }"
              @click="recordItem.open = !recordItem.open" @keypress="recordItem.open = !recordItem.open">
              <div class="flex items-center">
                <h3 class="mr-2 flex items-center gap-1 whitespace-nowrap text-stone-600">
                  <img src="@/static/images/work.svg" alt="work" class="size-4 object-contain" />
                  上班：
                </h3>
                <p v-if="recordItem.in" class="font-bold tracking-wider ">
                  {{ timstampToMinSec(recordItem.in["time"]) }}
                </p>
                <p v-else class="text-gray">--：--</p>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <h3 class="mr-2 whitespace-nowrap text-stone-600">下班：</h3>
                  <p v-if="recordItem.out" class="font-bold tracking-wider">
                    {{ timstampToMinSec(recordItem.out["time"]) }}
                  </p>
                  <p v-else class="text-gray">--：--</p>
                </div>
                <img v-if="recordItem.breakRecord.length > 0" src="@/static/images/downArrow.svg" alt="downArrow"
                  class="object-contain" />
              </div>
            </div>
            <div v-if="recordItem.open">
              <div class="rounded-xl bg-meimate-beige/50 px-4 py-2">
                <template v-if="recordItem.breakRecord.length">
                  <div class="mb-2 grid grid-cols-2 text-sm last:mb-0" v-for="(rcd, idx) in recordItem.breakRecord"
                    :key="idx">
                    <div class="flex items-center">
                      <h3 class="mr-2 flex items-center gap-1 whitespace-nowrap text-stone-600">
                        <img src="@/static/images/walking-arrow-right.svg" alt="" class="size-4 object-contain" />
                        外出：
                      </h3>
                      <p v-if="rcd.start" class="font-bold tracking-wider">
                        {{ $dayjs(rcd.start.time).format("HH:mm") }}
                      </p>
                      <p v-else class="font-normal text-gray">--：--</p>
                    </div>
                    <div class="flex items-center">
                      <h3 class="mr-2 whitespace-nowrap text-stone-600">歸來：</h3>
                      <p v-if="rcd.end" class="font-bold tracking-wider">
                        {{ $dayjs(rcd.end.time).format("HH:mm") }}
                      </p>
                      <p v-else class="font-normal text-gray">--：--</p>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="mb-2 grid grid-cols-2 rounded-xl bg-[#F7F7F7] px-4 py-2 text-[12px]">
            <div class="flex items-center">
              <h3 class="mr-2 flex items-center gap-1 whitespace-nowrap text-stone-600">
                <img src="@/static/images/work.svg" alt="work" class="size-4 object-contain" />
                上班：
              </h3>
              <p class="text-gray">--：--</p>
            </div>
            <div class="flex items-center">
              <h3 class="mr-2 whitespace-nowrap text-stone-600">下班：</h3>
              <p class="text-gray">--：--</p>
            </div>
          </div>
        </template>

        <div class="mt-7 grid grid-cols-2 gap-4">
          <div class="text-center text-meimate-blue-gray">
            <p class="text-sm">本月總打卡天數</p>
            <p class="text-xl font-bold">
              {{ monthlyAttendanceCount }}<span class="ml-1 text-sm ">天</span>
            </p>
          </div>

          <div class="text-center text-meimate-blue-gray">
            <p class="text-sm">遲到總分鐘數</p>
            <p class="text-xl font-bold">
              {{ monthlyAttendanceLateCount
              }}<small class="ml-1 font-sans text-sm ">分</small>
            </p>
          </div>
        </div>
      </div>
    </section>
    <C-Loading-Overlay
      :value="show"
      @input="$emit('input', !show)"
      @doFunction="$emit('input', !show)"
      :layerIndex="60"
    ></C-Loading-Overlay>
    <transition name="fromBottom">
      <div v-show="show" class="card card-body !fixed inset-0 z-[70] mt-60 flex w-full overflow-visible !rounded-b-none bg-white p-10 pb-20 ">
        <div id="barcode-reader" class="m-auto size-[250px] overflow-hidden"></div>
        <button @click="handleStop('close')" class="mt-auto w-full rounded-full bg-meimate-pink p-2 text-white">關閉</button>
      </div>
    </transition>
  </C-Main-Block>

</template>

<script>
import { mapState } from 'vuex';
import useHtml5QrCode from './useHtml5QrCode';

let html5QrCode;

export default {
  name: 'punch-index',
  description: '打卡的首頁',
  metaInfo: {
    title: 'Meimate Stylist',
    titleTemplate: '%s | 打卡',
  },
  data() {
    return {
      resultItem: {},
      resultAttendance: {},
      punchStart: '',
      punchEnd: '',
      outPunchStart: '',
      outPunchEnd: '',
      locationInfo: '無GPS座標',
      // 時間
      currentTimeIntervalKey: '',
      currentTime: this.$dayjs().format('YYYY-MM-DD HH:mm:ss'),
      dailyClockInRecord: {},
      isloading: false,
      isGeolocationPermission: false,
      show: false,
      rightIconDisplay: '',
    };
  },
  mounted() {
    const ML_DESIGN = JSON.parse(localStorage.getItem('ML_DESIGN'));
    const auth = ML_DESIGN.userAuthorizeList.find(
      (item) => item.pageName === '詳細打卡紀錄',
    );
    this.rightIconDisplay = auth ? 'bi bi-clock-history' : '';
    html5QrCode = useHtml5QrCode('barcode-reader');
    this.currentTimeIntervalKey = setInterval(() => {
      this.currentTime = this.$dayjs().format('YYYY-MM-DD HH:mm:ss');
    }, 1000);
    this.init();
  },
  methods: {
    async init() {
      await Promise.all([
        this.getAttendanceRecords(),
        this.getDailyClockInRecord(),
        this.reFreshLocation(),
      ]).then(() => { });
    },
    // 刷新定位資訊
    async reFreshLocation() {
      this.locationInfo = '取得GPS座標中';
      const { latitude, longitude } = await this.geoFindMe();
      const resp = await this.$api.checkGPSStatus({
        latitude: latitude ? `${latitude}` : latitude,
        longitude: longitude ? `${longitude}` : longitude,
      });
      return new Promise((resolve, reject) => {
        const { data, errors } = resp.data;
        if (errors) reject(errors);
        const actions = new Map([
          ['NULL', { locationInfo: '無GPS座標' }],
          ['LOWERTHAN25', { locationInfo: '距離 < 25m' }],
          ['BETWEEN25AND50', { locationInfo: '距離 25m-50m' }],
          ['MORETHAN50', { locationInfo: '距離 > 50m' }],
        ]);
        this.locationInfo = actions.get(data.checkGPSStatus.status)
          ? actions.get(data.checkGPSStatus.status).locationInfo
          : '無GPS座標';

        // this.locationInfo = '目標距離 < 25m';
        resolve({ latitude, longitude });
      });
    },
    // 取得打卡清單
    async getDailyClockInRecord() {
      const resp = await this.$api.dailyClockInRecord({
        date: this.$dayjs().valueOf(),
        designerId: this.userInfo.user.id,
      });
      const { data, errors } = resp.data;
      if (errors) return;
      const [dailyClockInRecord = {}] = data.dailyClockInRecord;
      this.dailyClockInRecord = dailyClockInRecord;

      this.dailyClockInRecord.clockInRecord = this.dailyClockInRecord.clockInRecord ? this.dailyClockInRecord.clockInRecord.map(
        (currentValue) => ({ open: false, ...currentValue }),
      ) : [];
      // this.dailyClockInRecord.clockInRecord.foreach((item) => {
      //   console.log(item);
      // });
    },
    async getAttendanceRecords() {
      const sumbitAttendanceRecordsForm = {
        userId: this.userInfo.user.id,
        dateRange: {
          startDate: this.$dayjs(new Date()).startOf('month').valueOf(),
          endDate: this.$dayjs(new Date()).endOf('month').valueOf(),
        },
        pageLimit: 1000,
      };
      const resp = await this.$api.attendanceRecords(sumbitAttendanceRecordsForm);
      const { data, errors } = resp.data;
      if (errors) return;
      this.resultAttendance = data.attendanceRecords;
    },
    doRoute() {
      this.$router.push({ name: 'Punch-list' });
    },
    geoFindMe() {
      return new Promise((resolve) => {
        let { latitude, longitude } = {};
        const success = (position) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          this.isGeolocationPermission = true;
          resolve({ latitude, longitude });
        };
        const error = () => {
          latitude = null;
          longitude = null;
          resolve({ latitude, longitude });
        };
        if (!navigator.geolocation) {
          this.$swal.fire({
            icon: 'warning',
            title: '請開起與授權GPS定位功能',
            showConfirmButton: true,
            showCancelButton: true,
          });
          resolve({ latitude: null, longitude: null });
        } else {
          navigator.geolocation.getCurrentPosition(success, error);
        }
      });
    },
    async doAttendance(statusType) {
      const input = {
        userIds: [this.userInfo.user.id],
        status: statusType,
        checkinType: 'CELLPHONE',
        GPSLocation: null,
      };
      // 有授權GPS時，才同步請求取得位置，否則未授權或拒絕授權位置都帶null
      if (this.isGeolocationPermission) {
        const location = await this.reFreshLocation();
        const { latitude, longitude } = location;
        input.GPSLocation = latitude ? { latitude: `${latitude}`, longitude: `${longitude}` } : null;
      }
      // 未授權再次詢問(異步)
      this.reFreshLocation();

      const resp = await this.$api.userClockIn(input);
      const { data, errors } = resp.data;
      if (errors) return;
      Promise.all([this.getAttendanceRecords(), this.getDailyClockInRecord()]).then(() => {
        if (data.userClockIn) {
          this.$swal.fire({
            showCloseButton: true,
            icon: 'success',
            title: '打卡成功',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      });
    },
    doOutPunch(status) {
      if (status) {
        this.outPunchStart = this.$dayjs().format('HH:mm');
      } else {
        this.outPunchEnd = this.$dayjs().format('HH:mm');
      }
    },
    // 掃描成功後會得到 decodedText
    qrCodeSuccessCallback(decodedText) {
      // 停止相機
      this.handleStop();
      this.QRCodeCheckIn(decodedText);
    },

    qrCodeErrorCallback() {
      // console.log('qrCodeErrorCallback', err);
    },

    // 啟動相機
    scanBarcode() {
      this.show = true;
      html5QrCode.start(this.qrCodeSuccessCallback, this.qrCodeErrorCallback, this.handleStop);
    },

    // 停止相機
    handleStop() {
      this.show = false;
      html5QrCode.handleStop();
    },

    async QRCodeCheckIn(data) {
      try {
        let submitData = {};
        if (data.includes('m.meimate.com')) {
          const urlObj = new URL(data);
          const hashParams = new URLSearchParams(urlObj.hash.split('?')[1]);
          const key = hashParams.get('key');
          const status = hashParams.get('status');

          if (!key || !status) throw new Error('QRCode有誤');
          submitData = { key, status };
        } else {
          submitData = JSON.parse(data);
        }

        const res = await this.$api.userQrcodeClockIn(submitData);
        if (res.data.errors) throw new Error(res.data.errors[0].message);
        Promise.all([this.getAttendanceRecords(), this.getDailyClockInRecord()]).then(() => {
          this.$swal.fire({
            showCloseButton: true,
            icon: 'success',
            title: '打卡成功',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        });
      } catch (error) {
        this.$swal.fire({
          showCloseButton: true,
          icon: 'error',
          title: error.message,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo', 'currentMechantId', 'userAuthorizeList']),
    monthlyAttendanceCount() {
      let count = 0;
      if (this.resultAttendance[0] && Array.isArray(this.resultAttendance[0].attendanceRecord)) {
        count = this.resultAttendance[0].attendanceRecord.filter(
          (recordItem) => Object.prototype.hasOwnProperty.call(recordItem, 'clockInRecord')
            && Array.isArray(recordItem.clockInRecord)
            && recordItem.clockInRecord.length > 0,
        ).length;
      }
      return count;
    },
    monthlyAttendanceLateCount() {
      let count = 0;
      count = this.resultAttendance[0] ? this.resultAttendance[0].totalLateMinutes : 0;
      return count;
    },
    currentMerchantName() {
      const currentMerchant = this.userInfo?.user?.merchants.find(
        (item) => item.id === this.currentMechantId,
      );
      return currentMerchant ? currentMerchant.name : '';
    },
    clockInRecordInList() {
      let clockInRecordInListContent = '';
      const { clockInRecord = [] } = this.dailyClockInRecord;
      clockInRecordInListContent = clockInRecord
        .flatMap((RecordItem) => (RecordItem.in ? this.$dayjs(RecordItem.in).format('HH:mm') : ''))
        .toString();
      return clockInRecordInListContent;
    },
    timstampToMinSec() {
      return (timestamp) => (this.$dayjs(timestamp).isValid() ? this.$dayjs(timestamp).format('HH:mm') : timestamp);
    },
    timstampListToMinSecConcatText() {
      return (timstampList, type) => timstampList
        .flatMap((timstampListItem) => [
          timstampListItem[type] && this.$dayjs(timstampListItem[type].time).isValid()
            ? this.$dayjs(timstampListItem[type].time).format('HH:mm')
            : [],
        ])
        .toString();
    },
    isHasNotClockout() {
      let isHasNotClockout = false;
      const { clockInRecord = [] } = this.dailyClockInRecord;
      isHasNotClockout = clockInRecord.some(
        (clockInRecordItem) => clockInRecordItem && clockInRecordItem.out === null,
      );
      return isHasNotClockout;
    },
    isDailyClockInRecordHasClockInRecord() {
      return (
        this.dailyClockInRecord.clockInRecord && this.dailyClockInRecord.clockInRecord.length > 0
      );
    },
    locationInfoClass() {
      return {
        'text-meimate-green': this.locationInfo === '距離 < 25m',
        'text-meimate-yellow': this.locationInfo === '距離 25m-50m',
        'text-meimate-pink': this.locationInfo === '距離 > 50m' || this.locationInfo === '無GPS座標',
        'text-meimate-blue-gray': this.locationInfo === '取得GPS座標中',
      };
    },
    isQRCodeClockIn() {
      return this.userAuthorizeList.find(
        (item) => item.pageName === 'QRCODE打卡',
      )?.authority;
    },
    isGPSClockIn() {
      return this.userAuthorizeList.find(
        (item) => item.pageName === '座標定位打卡',
      )?.authority;
    },
  },
  beforeDestroy() {
    clearInterval(this.currentTimeIntervalKey);
  },
};
</script>

<style></style>
