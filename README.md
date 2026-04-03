# Meimate Stylist - 設計師端應用程式

專為美業設計師打造的 PWA 行動端網頁應用程式，提供預約管理、打卡、排休、價目表設定、客戶管理與營業報表分析等功能。

目前為 **B-3.0** 版本，已完成全面視覺重構與效能優化，採用 Apple Liquid Glass 風格底部導覽列、橘色主題色系、即時頁面切換等現代化設計。

---

## 技術架構

| 項目 | 技術 |
|------|------|
| 前端框架 | Vue 2.6 (Options API) |
| 路由 | Vue Router 3 (Hash Mode) |
| 狀態管理 | Vuex 3 |
| UI 樣式 | TailwindCSS 3 + SCSS |
| API 介接 | GraphQL (Axios 封裝) |
| 圖示 | Bootstrap Icons |
| 日期處理 | Day.js |
| 表單驗證 | VeeValidate 3 |
| 日曆 | v-calendar 2 |
| QR Code | html5-qrcode |
| PWA | @vue/cli-plugin-pwa (Workbox) |
| 部署 | Zeabur |

---

## 環境需求

- **Node.js**: >= 14.16.0 (建議使用 NVM)
- **npm**: >= 6

---

## 快速開始

### 安裝依賴
```bash
npm install
```

### 開發模式 (熱重載)
```bash
npm run serve
```
開發伺服器啟動後，預設訪問 `http://localhost:8080`。

### 生產打包
```bash
npm run build
```
輸出至 `dist/` 目錄。

### 程式碼檢查
```bash
npm run lint
```
使用 ESLint (Airbnb + Vue + Accessibility 規則)。提交時自動透過 `lint-staged` 執行。

---

## 專案結構

```
src/
├── assets/
│   ├── api/                    # GraphQL API 層
│   │   ├── index.js                # 匯出所有 API 為 $api
│   │   ├── axiosInstancePackage.js  # Axios 攔截器 (認證、Loading、錯誤處理)
│   │   └── services/               # 103 個 GraphQL 查詢/變更檔
│   ├── scss/                   # 全域 SCSS 樣式
│   └── constant/               # 常數定義 (月份等)
├── components/
│   ├── general/                # 20 個全域 C-* 元件
│   │   ├── BackNav.vue             # 頂部導覽列
│   │   ├── BottomNav.vue           # 底部導覽列 (Liquid Glass)
│   │   ├── Modal-Dialog.vue        # 通用彈窗
│   │   ├── Input.vue / Select.vue  # 表單元件
│   │   ├── LoaderLay.vue           # 全域 Loading (350ms 延遲)
│   │   └── ...                     # 更多元件
│   └── Home/                   # 頁面專用元件
│       ├── customer/               # 客戶相關 (消費、儲值、髮質等)
│       └── scheduleBreak/          # 行事曆視圖 (日/週/月)
├── views/
│   ├── Login.vue               # 登入頁
│   ├── ClockIn.vue             # GPS 打卡頁
│   ├── Home.vue                # 主佈局 (keep-alive + BottomNav)
│   └── Home/
│       ├── index.vue               # 首頁 (個人資料、切換店家、修改密碼)
│       ├── order/                  # 預約管理
│       ├── scheduleBreak/          # 行事曆 / 排休 / 預約詳情
│       ├── punch/                  # 打卡 (QR Code 掃描)
│       ├── customer/               # 客戶查詢
│       ├── priceList/              # 個人價目表
│       ├── report/                 # 報表 (日報、帳單、抽成、業績分析、薪資)
│       ├── coupon/                 # 折價券
│       ├── bonus/                  # 紅利
│       └── employeeSchedule/       # 全體員工排班
├── store/
│   ├── config/                 # Loading 狀態、請求取消
│   └── modules/userInfo.js     # 使用者認證、商家、訂單草稿
├── router/index.js             # 路由定義 (Hash mode, 懶加載)
├── permission.js               # 路由守衛 (requireAuth)
├── directives/                 # 自訂指令 (toFixed 等)
├── filters/                    # Vue 過濾器
├── plugins/                    # 插件 (UUID、Tailwind 動畫延遲)
└── registerServiceWorker.js    # PWA Service Worker (自動更新重載)
```

---

## 功能模組

### 首頁 (`/`)
- 個人資料顯示與編輯 (大頭照、生日)
- 修改密碼
- 切換店家 (支援搜尋，最多 257+ 店家)
- 跑馬燈公告

### 預約管理 (`/ScheduleBreak`)
- 日/週/月三種行事曆視圖
- 新增預約 (選客戶、服務項目、時段)
- 預約詳情查看與操作
- 事件 (休假、會議) 管理

### 打卡 (`/Punch`)
- GPS 定位打卡
- QR Code 掃描打卡
- 打卡紀錄查詢

### 客戶管理 (`/Customer`)
- 客戶搜尋 (姓名、手機、代號)
- 進階篩選 (生日、消費區間、服務設計師、拒絕往來)
- 客戶詳情 (基本資料、髮質紀錄、消費紀錄、儲值紀錄、折價券)

### 價目表 (`/PriceList`)
- 個人 / 不指定價目表切換
- 分類管理 (新增、編輯、刪除、排序)
- 服務項目管理 (CRUD、拖拉排序)

### 報表 (`/Report`)
- 設計師日報表
- 訂單 (帳單) 紀錄
- 抽成報表
- 互助日報表
- 設計師業績分析表
- 薪資條

### 折價券 / 紅利 (`/Coupon`, `/Bonus`)
- 發放折價券/紅利給客戶
- 發放歷史紀錄

---

## API 介接

後端 GraphQL 端點：`https://apibeautyos.mlgroup.vip/graphql`

所有請求透過 Axios 攔截器自動：
- 附加認證 Token (`accesstoken`) 和商家 ID (`usermerchantid`)
- 追蹤 Loading 狀態 (顯示/隱藏全域 Spinner)
- 處理 GraphQL 錯誤 (SweetAlert2 提示)
- 登入過期自動跳轉 `/login`

呼叫方式：
```js
const resp = await this.$api.serviceName({ param1, param2 });
const { data, errors } = resp.data;
```

---

## 設計規範

### 色彩系統
| 色碼 | Token | 用途 |
|------|-------|------|
| `#FF6B2C` | `gmb-orange-500` | 主色調：標題、選中狀態、按鈕 |
| `#FFF5F0` | `gmb-orange-100` | 淺橘底色 (選中背景) |
| `#FAFAFA` | — | 頁面預設背景 |
| `#78829d` | `meimate-blue-gray` | 未選中文字、次要標籤 |
| `#C4A882` | `meimate-yellow` | 舊色 (逐步淘汰中) |

### 選中狀態 ("空心橘" 設計)
```
選中：border-gmb-orange-500 bg-gmb-orange-50 text-gmb-orange-500
未選中：border-transparent text-meimate-blue-gray
```

### Z-Index 層級
```
z-40    BackNav (頂部導覽)
z-50    BottomNav (底部導覽)
z-[60]  Modal 遮罩
z-[61]  Modal 內容
z-[70]  篩選器覆蓋層
z-[9999] 全域 Loading
```

---

## 測試帳號

| 項目 | 值 |
|------|-----|
| 手機號碼 | `09122233789` |
| 密碼 | `3789` |

---

## 環境變數

| 變數 | 說明 | 預設值 |
|------|------|--------|
| `VUE_APP_PUBLIC_PATH` | 靜態資源根路徑 | `/` |
| `VUE_APP_BASE_API` | GraphQL API 端點 | `https://apibeautyos.mlgroup.vip/graphql` |

---

## 授權

Private repository. All rights reserved.
