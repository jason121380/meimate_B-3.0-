# Apple Liquid Glass - Bottom Navigation 樣式規範

本文件記錄 Meimate Stylist 底部導覽列的 Apple Liquid Glass 設計實作細節，供設計與前端開發參考。

---

## 視覺效果預覽

```
┌─────────────────────────────────────────────┐
│  ╭───────────────────────────────────────╮   │
│  │  🏠    📅    📊    🕐    👤          │   │  ← 浮動膠囊 (glass-bar)
│  │ 首頁  我的預約  我的報表  打卡  我的  │   │
│  ╰───────────────────────────────────────╯   │
│              env(safe-area-inset-bottom)      │  ← iPhone 安全區
└─────────────────────────────────────────────┘
```

---

## 設計原理

模擬 Apple visionOS / iOS 26 的 Liquid Glass 材質效果：
- **半透明白底** — 讓底下內容隱約透出
- **高斯模糊** — 磨砂玻璃質感
- **飽和度提升** — 讓透出的色彩更鮮明
- **多層陰影** — 外層投影 + 內層高光模擬玻璃厚度
- **白色邊框** — 半透明白邊模擬光線折射

---

## CSS 實作

### Glass Bar (外層膠囊容器)

```css
.glass-bar {
  /* 半透明白色底 — 35% 不透明度 */
  background: rgba(255, 255, 255, 0.35);

  /* 核心：高斯模糊 28px + 飽和度 200% */
  backdrop-filter: blur(28px) saturate(200%);
  -webkit-backdrop-filter: blur(28px) saturate(200%);

  /* 半透明白邊 — 模擬玻璃邊緣光折射 */
  border: 1px solid rgba(255, 255, 255, 0.3);

  /* 三層陰影：
     1. 外層大範圍柔和投影 — 浮起感
     2. 外層小範圍銳利投影 — 邊緣定義
     3. 內層頂部高光 — 玻璃厚度感 */
  box-shadow:
    0 4px 30px rgba(0, 0, 0, 0.05),
    0 1px 2px rgba(0, 0, 0, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}
```

### Glass Pill (選中狀態內嵌膠囊)

```css
.glass-pill {
  /* 比外層略高的不透明度 — 45% */
  background: rgba(255, 255, 255, 0.45);

  /* 兩層陰影：
     1. 外層微投影 — 輕微浮起
     2. 內層頂部高光 — 按壓反饋感 */
  box-shadow:
    0 1px 6px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
}
```

---

## 佈局結構

### HTML 結構

```html
<!-- 外層定位容器 -->
<nav class="fixed inset-x-0 bottom-0 z-50 flex w-full justify-center"
     style="padding-bottom: env(safe-area-inset-bottom, 0px)">

  <!-- Glass Bar 膠囊 -->
  <div class="glass-bar mx-auto mb-2 flex w-[calc(100%-2rem)] max-w-[480px]
              items-center justify-around rounded-full p-1">

    <!-- 每個 Tab Item -->
    <div class="relative flex flex-1 cursor-pointer flex-col items-center
                justify-center gap-0.5 rounded-full py-2
                transition-all duration-150"
         :class="isActive ? 'glass-pill' : ''">

      <!-- Icon -->
      <i class="bi bi-house-door-fill text-[20px] text-gmb-orange-500"></i>

      <!-- Label -->
      <span class="text-[10px] font-semibold leading-tight text-gmb-orange-500">
        首頁
      </span>
    </div>
  </div>
</nav>
```

### 佈局參數

| 屬性 | 值 | 說明 |
|------|-----|------|
| 定位 | `fixed inset-x-0 bottom-0` | 固定在螢幕底部 |
| Z-Index | `z-50` | 在一般內容之上，Modal 之下 |
| 寬度 | `w-[calc(100%-2rem)]` | 左右各留 1rem 間距 |
| 最大寬度 | `max-w-[480px]` | 桌面/iPad 不會過寬 |
| 置中 | `mx-auto` | 水平居中 |
| 底部間距 | `mb-2` | 距離螢幕底部 8px |
| 圓角 | `rounded-full` | 完整膠囊形狀 |
| 內距 | `p-1` | 4px 內邊距 |
| Safe Area | `env(safe-area-inset-bottom)` | iPhone 底部安全區 |

---

## 色彩狀態

### 選中 (Active)

| 元素 | 樣式 |
|------|------|
| 背景 | `glass-pill` (rgba(255,255,255,0.45) + 陰影) |
| Icon | `text-gmb-orange-500` (#FF6B2C), `text-[20px]` |
| Label | `text-gmb-orange-500` (#FF6B2C) |

### 未選中 (Inactive)

| 元素 | 樣式 |
|------|------|
| 背景 | 透明 (無 class) |
| Icon | `text-gray-400` (#9CA3AF), `text-[19px]` |
| Label | `text-gray-400` (#9CA3AF) |

---

## 關鍵數值速查

```
blur()          → 28px     (模糊強度，越高越霧)
saturate()      → 200%     (飽和度，讓底色更鮮豔)
bg opacity      → 0.35     (外層) / 0.45 (選中 pill)
border opacity  → 0.3      (白邊透明度)
inset highlight → 0.6      (外層) / 0.7 (pill) — 頂部高光
outer shadow    → 0.05     (大範圍) / 0.03 (小範圍)
pill shadow     → 0.04     (選中狀態投影)
```

---

## 調整指南

### 想要更透明
```css
background: rgba(255, 255, 255, 0.20);  /* 降低白色不透明度 */
```

### 想要更模糊
```css
backdrop-filter: blur(40px) saturate(200%);  /* 增加 blur 值 */
```

### 想要更厚實
```css
background: rgba(255, 255, 255, 0.55);  /* 提高不透明度 */
border: 1px solid rgba(255, 255, 255, 0.5);  /* 加強白邊 */
```

### 深色模式適配 (未實作，供參考)
```css
.glass-bar-dark {
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(28px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 4px 30px rgba(0, 0, 0, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
```

---

## 瀏覽器支援

| 瀏覽器 | 支援狀態 |
|--------|---------|
| Safari (iOS 9+) | 完整支援 (`-webkit-backdrop-filter`) |
| Chrome (76+) | 完整支援 |
| Firefox (103+) | 完整支援 |
| Samsung Internet | 完整支援 |
| IE / Edge Legacy | 不支援 (降級為半透明白底，無模糊) |

> **降級行為**: 不支援 `backdrop-filter` 的瀏覽器會顯示純半透明白色背景，功能不受影響，僅失去磨砂玻璃視覺效果。

---

## 相關檔案

- **元件**: `src/components/general/BottomNav.vue`
- **主題色**: `tailwind.config.js` → `gmb-orange-500: #FF6B2C`
- **Safe Area**: `public/index.html` → `viewport-fit=cover`
