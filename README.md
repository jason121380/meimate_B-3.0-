# shop_storemanager_re
```
node version: ^14.16.0
開發專案做版控時，記得開幾大小小敏感。
```
## 專案起手式
```
切換相對應node 版本
npm install
```

### 編譯並執行熱重載 可以在package.json中的script 查看相關設定(環境...等)
```
npm run serve
```

### 打包
```
npm run build
```

### 驗整與修復 Lints and fixes files 
```
執行這個指令除了可以讓eslint按照我們要的styling驗證(例如:airbnb的風格會需要分號、單引號...等)並將原始碼調整。
執行時驗若證程式碼是否在編譯過程中有未定義、或未使用變數執行過程中將會在終端機跳出錯誤資訊。
npm run lint
```

### 串接api方式採用graphQL
```
所有的input type 會定義在各個service中的最上方註釋
```

### orders
判斷訂單條件
isReserved: true 區分預約與訂單
&&
status 區分審核條件
待審核
預約成功 有接單
已完成 不能有審核 可以改備註
設計師已取消 拒絕

測試帳號:
cellphone: "0977000632",
09122233789
password: "0632",
isKeepLogin: false, // 常駐登入30天 / 1天
帳號：09122233789
密碼：3789

# 打卡清單下禮拜
狀態 成功 遲到 早退

# 開發順序
行事曆 報表 客戶資料
# 
訂單明細會有店家名稱

# 設計師端預約不用判斷可不可預約
跳出排休
# 如果是公休的話出現一個就好
那公休有預約的話還是要有預約項目
排休與公休多加選項
# 最上方補上店家名稱

# 共同預約表

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
