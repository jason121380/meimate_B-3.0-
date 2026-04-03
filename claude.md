# CLAUDE.md - Meimate Stylist B-3.0

## Project Overview

Vue 2.6 SPA (PWA) for beauty industry stylists. GraphQL API via Axios, TailwindCSS 3, Vuex 3, Vue Router (hash mode). Deployed on Zeabur.

---

## Build & Run

```bash
npm install          # Install dependencies (Node >= 14.16)
npm run serve        # Dev server with hot-reload (--mode dev)
npm run build        # Production build → dist/
npm run lint         # ESLint (Airbnb + Vue + a11y)
```

- Pre-commit hook: `lint-staged` auto-lints staged `.js`, `.jsx`, `.vue` files
- ESLint enforces `vuejs-accessibility/click-events-have-key-events` — every `@click` on non-interactive elements needs `@keypress` + `role="button"` + `tabindex="0"`

---

## Architecture

### Directory Structure

```
src/
├── assets/
│   ├── api/              # GraphQL API layer
│   │   ├── index.js          # Exports all services as $api
│   │   ├── axiosInstancePackage.js  # Axios interceptors (auth, loading, errors)
│   │   └── services/         # 103 individual GraphQL query/mutation files
│   └── scss/             # Global SCSS (imported via vue.config.js)
├── components/
│   ├── general/          # 20 global C-* components (registered in general.js)
│   └── Home/             # Page-specific components (customer/, scheduleBreak/)
├── directives/           # Custom directives (toFixed, etc.)
├── filters/              # Vue filters
├── plugins/              # Plugins (uuid, tailwind animation delay)
├── router/index.js       # All routes (hash mode, lazy-loaded)
├── store/
│   ├── index.js          # Vuex root
│   ├── config/index.js   # Loading state, request cancellation
│   └── modules/userInfo.js  # Auth, merchant, order data
├── views/
│   ├── Home.vue          # Main layout (keep-alive + BottomNav)
│   ├── Home/index.vue    # Dashboard (profile, store switch, password)
│   └── Home/[module]/    # Feature modules (see Routes below)
├── permission.js         # Route guard (requireAuth → redirect /login)
└── registerServiceWorker.js  # PWA SW with auto-reload on update
```

### Key Config Files

- **`vue.config.js`**: `publicPath` from `VUE_APP_PUBLIC_PATH` env (default `/`). PWA config. SCSS auto-import.
- **`tailwind.config.js`**: Custom colors (gmb-orange, meimate-* series), safelist for dynamic schedule heights/positions, `@tailwindcss/forms` plugin.

---

## Global Component Registry (`C-*` prefix)

All components in `src/components/general/` are registered globally. Always use these instead of raw HTML:

| Component | Usage |
|-----------|-------|
| `<C-Main-Block>` | Wraps every page view |
| `<C-Back-Nav>` | Fixed top navbar. Props: `:title`, `:routeTarget`, `bgClass`. Slot: `#right` |
| `<C-Bottom-Nav>` | Fixed bottom nav. Apple Liquid Glass style. `z-50`, `max-w-[480px]` |
| `<C-Modal-Dialog>` | Overlay modal. Props: `v-model`, `:title`, `position="bottom"/"center"`. Click-outside-to-close. |
| `<C-Status-Modal>` | Success/error toast. Props: `:showModal`, `:content`, `:timeout`, `:status` |
| `<C-Input>` | Styled text input. Slot: `#endIcon` |
| `<C-Select>` | Dropdown select. Props: `:list`, `:itemText`, `:itemValue`, `:objectReturn` |
| `<C-Button-Check>` | Pill toggle. Active = orange outline. Inactive = gray |
| `<C-Filter-Wrap>` | Customer advanced filter. 60vh bottom sheet, `z-[70]` |
| `<C-Loader-Lay>` | Global loading spinner. 350ms delay to avoid flash. `z-[9999]` |
| `<C-Loading-Overlay>` | Dark backdrop overlay |
| `<C-Checkbox>` / `<C-CheckboxFull>` | Checkbox variants |
| `<C-VC-Calendar>` / `<C-VC-CalendarSelect>` | v-calendar wrappers |

---

## Z-Index Hierarchy

```
z-40   — BackNav (fixed top)
z-50   — BottomNav (fixed bottom)
z-[60] — Modal-Dialog backdrop
z-[61] — Modal-Dialog content
z-[70] — Filter overlays (DefaultFilterWrap)
z-[9999] — LoaderLay (global spinner)
```

---

## Color System

| Token | Hex | Usage |
|-------|-----|-------|
| `gmb-orange-500` | `#FF6B2C` | Primary accent. Active tabs, titles, icons, buttons |
| `gmb-orange-100` / `50` | `#FFF5F0` | Light orange backgrounds for selected states |
| `meimate-yellow` | `#C4A882` | **Deprecated** for active states. Still used in some buttons |
| `meimate-pink` | `#FF6B2C` | Same as gmb-orange-500 (legacy alias) |
| `meimate-beige` | `#FFF5F0` | Same as gmb-orange-100 |
| `meimate-blue-gray` | `#78829d` | Inactive text, labels |
| Default background | `#FAFAFA` | Page background (`bg-[#FAFAFA]`) |

### Active State Pattern ("空心橘")
Selected items use **outlined orange** (not solid fill):
```html
<!-- Selected -->
class="border border-gmb-orange-500 bg-gmb-orange-50 text-gmb-orange-500"
<!-- Unselected -->
class="border-transparent text-meimate-blue-gray"
```

---

## Routes

| Path | Route Name | Module |
|------|-----------|--------|
| `/` | `Home` | Dashboard (profile, store switch) |
| `/Order` | `Order` | Calendar overview |
| `/Order/list` | `Order-list` | Order list with tabs |
| `/ScheduleBreak` | `ScheduleBreak` | Booking calendar (day/week/month) |
| `/ScheduleBreak/add` | `ScheduleBreak-Add` | New booking form |
| `/ScheduleBreak/detail` | `ScheduleBreak-Detail` | Booking detail |
| `/ScheduleBreak/list` | `ScheduleBreak-List` | Weekly schedule grid |
| `/ScheduleBreak/event` | `ScheduleBreak-Event` | Event management |
| `/PriceList` | `PriceList` | Service price management |
| `/Customer` | `Customer` | Customer search/list |
| `/Customer/user-info` | `Customer-UserInfo` | Customer detail (tabs: info, hair, consumption, income, coupon) |
| `/Punch` | `Punch` | Clock-in/out with QR code |
| `/Report` | `Report` | Report menu |
| `/Report/daily-report` | `Report-daily-report` | Designer daily report |
| `/Report/bill` | `Report-bill` | Revenue records |
| `/Report/profit-cut` | `Report-profit-cut` | Designer commission report |
| `/Report/analysis` | `Report-analysis` | Performance analysis |
| `/Report/emp-earn` | `Report-emp-earn` | Helper earnings |
| `/Report/salary` | `Report-salary` | Salary slip |
| `/Coupon` | `Coupon` | Coupon management |
| `/Bonus` | `Bonus` | Bonus/reward management |
| `/EmployeeSchedule` | `EmployeeSchedule` | All employee schedules |

---

## API Layer

- Backend: `https://apibeautyos.mlgroup.vip/graphql`
- All requests go through `axiosInstancePackage.js` which:
  - Attaches `accesstoken` and `usermerchantid` headers from Vuex
  - Tracks loading state (`config/ADD_LOADING` / `REMOVE_LOADING`)
  - Shows `$swal` error toasts on GraphQL errors
  - Auto-redirects to `/login` on auth expiry
- 103 service files in `src/assets/api/services/`, each exports a function: `(request) => (variables) => request({ data: { query, variables } })`
- Call via `this.$api.serviceName(params)`

---

## Vuex Store

### `userInfo` module (namespaced)
```
state.userInfo          — Full user profile (from login API) or null
state.currentMechantId  — Active merchant/store ID (note: "Mechant" typo is intentional, used everywhere)
state.userAuthorizeList — Permission list for current merchant
state.orderData         — Booking form draft (date, time, phone, timeCost, etc.)
state.selectServiceList — Selected services for booking
```

### `config` module (namespaced)
```
state.loading[]   — Active API request tracking (show/hide spinner)
state.requests[]  — Cancel tokens for in-flight requests
```

---

## Performance Optimizations

1. **`<keep-alive>`** on main `<router-view>` — pages are cached after first visit
2. **Loading spinner 350ms delay** — prevents flash on fast API responses
3. **All route `<transition>` removed** — instant page switching, no animations
4. **`animate.css` duration forced to 0.08s** globally
5. **Service Worker auto-reload** — `SKIP_WAITING` + `location.reload()` on update

---

## Layout Rules

1. **All content containers**: `max-w-screen-md mx-auto` on desktop
2. **Page top margin**: `mt-20` mobile, `lg:mt-24` desktop (BackNav is 68px fixed)
3. **Page bottom padding**: `calc(66px + env(safe-area-inset-bottom))` for BottomNav clearance
4. **BottomNav**: `max-w-[480px]` centered, Apple Liquid Glass (`backdrop-filter: blur(28px) saturate(200%)`)
5. **Modals**: Always use `<C-Modal-Dialog>`. No raw `position: absolute` tooltips
6. **Close buttons**: Use `<i class="bi bi-x-lg text-sm text-gray-400">` (Bootstrap Icons)
7. **Safe area**: `viewport-fit=cover` in index.html, `env(safe-area-inset-bottom)` for bottom padding

---

## Common Patterns

### Phone number masking
```js
maskPhone(phone) {
  if (!phone || phone.length < 7) return phone || '';
  return `${phone.slice(0, 4)}***${phone.slice(-3)}`;
}
```

### Switch store (257+ stores)
Full-screen overlay on mobile, centered modal on desktop (`lg:h-[80vh] lg:rounded-2xl`), with search filter.

### Authority-based rendering
```js
isAuthority(label) { return this.userAuthorizeList.includes(label); }
```
Used in report list, home menu items to conditionally show features.

---

## Known Conventions (Do NOT "fix")

- `currentMechantId` — typo for "Merchant", used consistently across store, API headers, and all components. Do NOT rename.
- `seletedTab` — typo for "selected", used in multiple views. Do NOT rename.
- `userifo` — typo for "userInfo", used in Home/index.vue data. Do NOT rename.
- `swtichAuthority` — typo for "switch", used as method name. Do NOT rename.
