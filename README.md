# Meimate Stylist (設計師端應用程式)

這是一個專為美業設計師打造的行動端網頁應用程式 (PWA / Mobile Web App)，提供預約管理、打卡、排休、個人價目表設定、客戶管理與各式營業報表分析功能。

目前專案正進行/已完成 **B-3.0 主題視覺重構 (UI Migration)**，全面導入更一致的色彩計畫與具有 App 原生沉浸感的元件設計。

---

## 環境與執行需求 (Environment Setup)

- **Node.js 版本**: `>= 14.16.0` (建議使用 NVM 進行版本管理切換)
- **架構框架**: Vue 2.x
- **樣式管理**: TailwindCSS (v3), SCSS/SASS
- **API 介接**: GraphQL Endpoint (採用 `$api` 客製化建構工具封裝)

### 安裝依賴 (Install Dependencies)
```bash
nvm use 14
npm install
```

### 開發與熱重載 (Compiles and hot-reloads for development)
此專案的啟動腳本配置了相關環境變數，將於本機開啟熱重載伺服器：
```bash
npm run serve
```

### 生產環境打包 (Compiles and minifies for production)
```bash
npm run build
```

### 程式碼驗證與修復 (Lints and fixes files)
專案配置了嚴謹的 Eslint (以 Vue 官方及 Airbnb 風格為主)。使用以下指令可自動排版及進行靜態語法檢查：
```bash
npm run lint
```
*(注意：在提交新功能前，請務必先執行此腳本修復語法錯誤與 A11y 標籤缺失)*

---

## B-3.0 主題 UI 規範與設計模式 (Theme UI Specs)

專案最近引入了大型更新，確保全域擁有原生的 Mobile App 體驗：
1. **全局置中對齊限制 (`max-w-screen-md`)**
   所有頁面頂層容器 (`C-Main-Block` 等) 及全域 Navigation 均加入了螢幕寬度與置中限制，避免在平板/桌機上變形。
2. **全局底部導覽列 (`BottomNav`) & Z-Index 管理**
   系統採用 persistent `BottomNav` (`fixed bottom-0 z-50`)。因此，**從底部彈出的滿版面板或過濾器 (Filter)** 必須設定 `z-[60]` 或以上，並從底部滑出，以將導航列完全覆蓋。
3. **無邊際捲動體驗**
   移除了多餘的 `min-h-screen`，使頁面沒有內容時不會有留白的呆板捲軸滾動感。

## 專案核心業務邏輯說明

### 串接 API (GraphQL)
專案不使用傳統 REST，而是全面基於 GraphQL。
- 所有 Input 型別與 Query/Mutation 都統一定義在 `src/services` 的頂端註釋中。
- 資料請求都透過封裝好的物件去調用，例如 `$api.getBookingItemCategory()`。

### 訂單 (Orders) 狀態處理
訂單有嚴格的狀態層級來區分「預約」與「線上訂單」：
- `isReserved: true`：代表這是一筆「預約」
- `status` 各階段邏輯：
  - **待審核**
  - **預約成功** (代表設計師已接單)
  - **已完成** (不具備審核機制，僅能補充修改備註)
  - **設計師已取消** / **拒絕**

### 開發順序推薦
建議依循：行事曆 -> 報表系統 -> 客戶資料 -> 擴充功能開發。

---

## 測試資源 (Test Credentials)
若需於開發模式下繞過驗證，可使用下列設計師測試進入點：
- **帳號** (cellphone): `09122233789`
- **密碼** (password): `3789`
*(選項：`isKeepLogin: false` 控制 token 存放方式)*
