# 🎨 Meimate 設計主題規範 (Design Theme Guide)

> 本文件定義了 Meimate 客戶端的完整設計語言。
> **任何新頁面、元件、彈窗皆須遵循此規範。**

---

## 一、品牌色彩 (Brand Colors)

### 主色 (Primary)
| Token | Hex | RGB | 用途 |
|-------|-----|-----|------|
| `gmb-orange-100` | `#FFF5F0` | 255, 245, 240 | 淺底背景、hover 態、active 背景 |
| `gmb-orange-200` | `#FFE8D9` | 255, 232, 217 | 次淺背景 |
| `gmb-orange-400` | `#FF8A56` | 255, 138, 86 | - |
| `gmb-orange-500` | `#FF6B2C` | 255, 107, 44 | **核心品牌色**：按鈕、icon、重點文字 |
| `gmb-orange-600` | `#E55A1F` | 229, 90, 31 | Hover / Pressed 態 |

### 中性色 (Neutral)
| 用途 | Tailwind Class | Hex |
|------|---------------|-----|
| 主文字 | `text-gray-900` | `#111827` |
| 副文字 | `text-gray-500` | `#6B7280` |
| 輕量文字 | `text-gray-400` | `#9CA3AF` |
| 禁用文字 | `text-gray-300` | `#D1D5DB` |
| 邊框 | `border-gray-100` | `#F3F4F6` |
| 卡片背景 | `bg-white` | `#FFFFFF` |
| 頁面背景 | `bg-[#FAFAFA]` | `#FAFAFA` |
| 輸入框背景 | `bg-gray-50/80` | - |

### 功能色
| 用途 | Class | Hex |
|------|-------|-----|
| 成功 | `text-emerald-500` | `#10B981` |
| 錯誤 | `text-red-400` / `border-red-400` | `#F87171` |
| 警告 | 品牌橘色代替黃色 | `#FF6B2C` |

---

## 二、字體 (Typography)

```css
font-family: 'Inter', 'Noto Sans TC', system-ui, -apple-system, sans-serif;
```

| 層級 | Class | 用途 |
|------|-------|------|
| 頁面標題 | `text-xl font-bold text-gmb-orange-500` | 頁面主標題 |
| 區塊標題 | `text-lg font-bold text-gray-900` | 卡片/模組標題 |
| 小標 | `text-base font-semibold text-gray-900` | 段落標題 |
| 正文 | `text-[15px] font-medium text-gray-900` | 列表項目文字 |
| 描述 | `text-sm text-gray-500` | 次要說明 |
| 標籤 | `text-xs text-gray-400` | 最小輔助文字 |

---

## 三、元件規範 (Components)

### 按鈕 (Button)

```html
<!-- 主要按鈕 (Primary) -->
<button class="w-full py-3 rounded-full font-semibold text-[15px]
  bg-gmb-orange-500 text-white
  hover:bg-gmb-orange-600 transition-all shadow-sm hover:shadow-md">
  確認
</button>

<!-- 次要按鈕 (Secondary / Outline) -->
<button class="w-full py-3 rounded-full font-semibold text-[15px]
  bg-white border border-gmb-orange-500 text-gmb-orange-500
  hover:bg-gmb-orange-100/30 transition-colors">
  取消
</button>

<!-- 輕量按鈕 (Ghost) -->
<button class="py-3 rounded-full font-medium text-[15px]
  text-gray-400 hover:text-red-500 transition-colors">
  登出
</button>

<!-- 禁用態 -->
<button class="bg-gray-200 text-gray-400 pointer-events-none rounded-full">
  不可操作
</button>
```

**規則**：
- ✅ 一律 `rounded-full` (pill shape)
- ✅ hover 態使用 `gmb-orange-600`
- ❌ 不使用 `rounded-mm`、`rounded-xl` 等非標準圓角

### 卡片 (Card)

```html
<div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-mm">
  <!-- 內容 -->
</div>
```

**規則**：
- 圓角：`rounded-2xl`
- 邊框：`border border-gray-100`
- 陰影：`shadow-mm` 或 `shadow-sm`

### 輸入框 (Input)

```html
<input class="w-full bg-gray-50/80 border border-gray-200 rounded-full
  px-5 py-3 text-sm text-gray-700 placeholder-gray-300
  focus:outline-none focus:border-gmb-orange-400
  focus:ring-1 focus:ring-gmb-orange-200 transition-colors"
  placeholder="請輸入..." />
```

**規則**：
- 圓角：`rounded-full`
- Focus 態：橘色邊框 + 橘色 ring
- 錯誤態：`!border-red-400`

### 搜尋框 (Search Input)

```html
<div class="relative">
  <div class="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
    </svg>
  </div>
  <input class="w-full bg-gray-50/80 border border-gray-200 rounded-full
    px-5 ps-11 py-3 text-sm ..." placeholder="搜尋關鍵字" />
</div>
```

### 選擇卡片 (Selectable Card)

```css
/* 門市/店家選擇卡片 */
.store-card {
  padding: 14px 18px;
  border: 1px solid #f0f0f0;
  border-radius: 14px;
  transition: all 0.2s ease;
  background: white;
}
.store-card--active {
  border-color: #FF6B2C;
  background: #FFF5F0;
}

/* 設計師/人員 pill 卡片 */
.designer-card {
  border-radius: 50rem;  /* pill */
  /* 其他同 store-card */
}
.designer-card--active {
  border-color: #FF6B2C;
  background: #FFF5F0;
}
```

### 勾選圖標 (Check Icon)

```html
<!-- 圓形橘色勾選 -->
<div class="w-6 h-6 rounded-full bg-gmb-orange-500 flex justify-center items-center">
  <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
  </svg>
</div>

<!-- 大尺寸 (28px) -->
<div class="check-icon"><!-- 同上 SVG --></div>
```

---

## 四、彈窗 / 通知 (Modals & Alerts)

### SweetAlert2 全域主題
- **檔案**：`static/style/components/swal-theme.css`
- **引入**：`static/style/main.css` (自動全域生效)
- **效果**：所有 `Swal.fire()` / `this.$swal.fire()` 自動套用

| 元素 | 樣式 |
|------|------|
| 彈窗容器 | `border-radius: 1rem`, 品牌字體 |
| Warning / Info icon | 橘色 `#FF6B2C` |
| Success icon | 橘色打勾 + 橘色 ring |
| 確認按鈕 | 橘色 pill (`rounded-full`) |
| 取消按鈕 | 灰色 pill |
| 進度條 | 橘色 |

**使用方式** — 不需手動設定顏色：
```js
// ✅ 簡潔寫法 (全域 CSS 自動套用)
Swal.fire({
  icon: 'success',
  title: '操作成功',
  timer: 1500,
  showConfirmButton: false
})

// ✅ 帶按鈕的確認彈窗
Swal.fire({
  html: '<p class="text-lg text-gray-900 font-bold">確定要執行嗎?</p>',
  showCancelButton: true,
  confirmButtonText: '確定',
  cancelButtonText: '取消'
})
```

### 自訂 Modal 元件

```html
<!-- 彈窗容器 -->
<div class="w-full max-w-[768px] max-h-[80vh] overflow-y-auto
  bg-white rounded-2xl shadow-lg">

  <!-- 標題列 -->
  <div class="flex justify-between items-center px-7 py-5 border-b border-gray-100">
    <p class="font-bold text-lg text-gray-900">標題</p>
    <!-- 關閉按鈕 (統一 SVG) -->
    <button class="text-gray-400 hover:text-gray-600 transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>

  <!-- 內容 -->
  <div class="p-7">...</div>

  <!-- 雙按鈕 -->
  <div class="grid grid-cols-2 gap-x-4 mt-6 pt-2">
    <button class="py-3 px-6 rounded-full bg-gray-100 text-gray-600 font-medium
      hover:bg-gray-200 transition-colors">取消</button>
    <button class="py-3 px-6 rounded-full bg-gmb-orange-500 text-white font-medium
      hover:bg-gmb-orange-600 transition-colors shadow-sm">確認</button>
  </div>
</div>
```

---

## 五、頁面佈局 (Layout)

### 容器
```html
<div class="w-full max-w-[768px] mx-auto px-5">
```

### 頁面標題
```html
<h1 class="text-xl font-bold text-gmb-orange-500 mb-6">頁面標題</h1>
```

### 底部固定操作欄
```html
<div class="fixed left-0 right-0 bg-white border-t border-gray-100 z-20"
  style="bottom: 56px;">
  <div class="max-w-[768px] mx-auto px-5 py-3">
    <button class="w-full py-3.5 rounded-full bg-gmb-orange-500 text-white
      font-semibold text-[15px]">
      下一步
    </button>
  </div>
</div>
```

### Loading Spinner
```html
<div class="border-3 border-t-gmb-orange-500 border-gray-200
  rounded-full w-10 h-10 animate-spin"></div>
```

---

## 六、檔案結構

```
static/style/
├── main.css                    ← 全域 CSS 入口
├── variable.css                ← CSS 變數
├── container.css
├── tailwind_init.css
└── components/
    ├── swal-theme.css          ← ⭐ SweetAlert2 全域主題
    ├── btn.css
    ├── card.css
    ├── form.css
    ├── modal.css
    ├── nav.css
    └── ...

tailwind.config.js              ← gmb-orange 色彩定義
```

---

## 七、速查表 (Quick Reference)

| 場景 | Class |
|------|-------|
| 主要按鈕 | `bg-gmb-orange-500 text-white rounded-full hover:bg-gmb-orange-600` |
| 次要按鈕 | `bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200` |
| 卡片 | `bg-white rounded-2xl border border-gray-100 shadow-mm` |
| 輸入框 | `bg-gray-50/80 border-gray-200 rounded-full focus:border-gmb-orange-400` |
| 頁面標題 | `text-xl font-bold text-gmb-orange-500` |
| 段落標題 | `text-base font-semibold text-gray-900` |
| 被選中態 | `border-gmb-orange-500 bg-gmb-orange-100` + 橘色 check icon |
| 禁用態 | `bg-gray-200 text-gray-400 pointer-events-none` |
| 錯誤態 | `!border-red-400` + `text-red-400 text-xs` |
| Loading | `border-t-gmb-orange-500 border-gray-200 animate-spin` |
