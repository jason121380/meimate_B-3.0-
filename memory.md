# Project Memory & Evolution Log (Meimate Stylist B-3.0)

This file tracks architectural decisions, completed migrations, bug fix history, and technical debt. Updated as of **April 2026**.

---

## Timeline

### Phase 1: White Page & Deployment Fix (March 2026)

**Root Cause**: `publicPath: '/stylist'` in `vue.config.js` made all assets load from `/stylist/...` but Zeabur serves from root `/`.

**Fixes Applied**:
- Changed `publicPath` to `process.env.VUE_APP_PUBLIC_PATH || '/'`
- Replaced all hardcoded `/stylist/assets/images/` paths with `` `${process.env.BASE_URL}assets/images/` `` (template literals)
- Changed `/stylist` redirect in `router/index.js` to `/`
- Added `viewport-fit=cover` to `<meta name="viewport">` for iOS safe area support

### Phase 2: B-3.0 Visual Migration (March 2026)

**Objective**: Native mobile app feel with consistent design language.

**Changes**:
1. **Global containment** — All navbars, content, modals constrained to `max-w-screen-md mx-auto`
2. **BottomNav redesign** — Apple Liquid Glass effect (`backdrop-filter: blur(28px) saturate(200%)`), `max-w-[480px]`, `rounded-full`, `env(safe-area-inset-bottom)` padding
3. **Z-Index hierarchy established** — BackNav z-40, BottomNav z-50, Modal z-[60]/z-[61], Filter z-[70], Loader z-[9999]
4. **Theme color migration** — Solid `bg-meimate-yellow` (#C4A882) replaced with outlined orange (`border-gmb-orange-500 bg-gmb-orange-50 text-gmb-orange-500`) for active states
5. **Modal-Dialog overhaul** — Centered on desktop, bottom sheet on mobile, click-outside-to-close, no animations
6. **BackNav slot system** — Added `<slot name="right">` for action buttons, eliminating absolute positioning hacks
7. **Bottom sheet unification** — Legacy tooltip-style DOM popouts replaced with `<C-Modal-Dialog position="bottom">`
8. **Close buttons unified** — All `close-icon.svg` replaced with Bootstrap Icons `bi-x-lg`

### Phase 3: Performance Optimization (March-April 2026)

1. **`<keep-alive>`** added to main `<router-view>` in `Home.vue` — pages cached after first visit
2. **Loading spinner 350ms delay** in `LoaderLay.vue` — prevents flash on fast API calls
3. **All route `<transition>` removed** from 9 sub-route wrapper views — instant page switching
4. **`animate.css` forced to 0.08s** globally in `App.vue`
5. **Service Worker auto-reload** — On SW update, sends `SKIP_WAITING` and reloads page immediately

### Phase 4: Comprehensive Bug Sweep (April 2026)

Three parallel scan agents reviewed all 80+ Vue files and 100+ JS files. Bugs found and fixed:

| File | Bug | Fix |
|------|-----|-----|
| `scheduleBreak/add.vue` | `const { value } = this.timeCost` — timeCost is number, not object | Changed to `const value = this.timeCost` |
| `scheduleBreak/eventDetail.vue` | `timeCostRange[timeCost].label` — no bounds check | Added `timeCostRange[timeCost] ?` guard |
| `report/profitCut.vue` | `this.$dayjs(null).format('YYYY')` → "Invalid date" | Added `if (!this.date.from) return ''` |
| `SelectCustomerModal.vue` | `resetData()` set `selectCustomer = ''` instead of `null` | Changed to `null` |
| `SelectCustomerModal.vue` | `isGetting` used but never declared in `data()` | Added `isGetting: false` |
| `Select.vue` | `this.value[itemText]` when value is null (objectReturn mode) | Added `this.value ?` guard |
| `toFixed.js` | `innerText && innerText == 0` — contradictory logic | Changed to `!innerText \|\| Number(innerText) === 0` |
| `DefaultFilterWrap.vue` | `beforeUpdate` accessed `propsSearchAdvanceCtx.designer` without null check | Added `if (ctx && ctx.designer)` guard |
| `income.vue` | Scroll listeners added without removing previous — memory leak | Added `removeEventListener` before `addEventListener` |
| `consumption.vue` | Same scroll listener memory leak | Same fix |
| `StatusModal.vue` | `setTimeout` never cleared on destroy | Added `timeoutId` tracking + `beforeDestroy` cleanup |

### Phase 5: UI Polish (April 2026)

1. **Password change flow** — Close modal before API call (was causing double-modal or lag)
2. **Price list categories** — Solid gold → outlined orange active state
3. **Success toast icon** — Changed from `meimate-yellow` to `gmb-orange-500`
4. **Desktop layout** — Reduced `lg:mt-40` (160px) to `lg:mt-24` (96px) across all 21 pages
5. **Switch store overlay** — Mobile: full-screen. Desktop: centered modal with `max-w-screen-md`, 80vh, rounded corners, backdrop
6. **Report list** — Added `max-w-screen-md mx-auto` to align with BackNav title width
7. **Customer list** — Removed bold font, added phone number masking (`0912***678`)
8. **Filter modal** — Changed to 60vh height, added X close button, click-outside-to-close
9. **Modal-Dialog** — Added `@click.self` on positioning div so clicking outside card closes modal

### Phase 6: Code Cleanup (April 2026)

- Removed 20+ `console.log` / `console.error` statements from production code
- Removed empty `data()`, `mounted()`, `methods`, `computed` blocks
- Removed empty `<style>` sections (where linter allows)
- Removed ~50 lines of commented-out dead code (old sweet-alert dialogs, test data, CSS)
- Fixed lint errors caused by cleanup (empty catch blocks → `/* ignore */`, unused vars)

---

## Technical Debt & Future Considerations

1. **Vue 2 → Vue 3 Migration**: The codebase uses Options API exclusively. All `$emit()` patterns would need `defineEmits`. Vuex would migrate to Pinia. `v-calendar` v2 → v3.

2. **Typo Consistency**: Several typos are baked into the API/store interface (`currentMechantId`, `seletedTab`, `userifo`, `swtichAuthority`). These are used across dozens of files and renaming would require coordinated backend changes.

3. **SCSS + Tailwind Mix**: The codebase mixes `<style lang="scss" scoped>` with inline Tailwind classes. Some legacy `.card`, `.card-body` classes from a Bootstrap-like system remain. Consider extracting to `@apply` utilities.

4. **Safelist Bloat**: `tailwind.config.js` has ~200 safelisted height/top/margin utility classes for the schedule calendar grid. These are dynamically computed in the week/day view components.

5. **API Service Pattern**: 103 service files each export a single function. Consider consolidating into category-based modules (booking, customer, report, etc.).

6. **Missing Error Boundaries**: Many API calls have no catch blocks. The Axios interceptor shows a generic `$swal` error, but individual views could benefit from specific error handling.

7. **Scroll Pagination**: Several views (consumption, income, customer list) use manual `window.addEventListener('scroll')` for infinite scroll. Consider a shared mixin or directive.

8. **Test Coverage**: No unit or e2e tests exist. Priority areas: auth flow, booking creation, store switching.
