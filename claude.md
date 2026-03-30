# Claude Instructions & Architecture Documentation (meimate_B-3.0)

This documentation serves as the cognitive baseline for AI assistants operating on this repository. It defines coding patterns, Vue 2 component wrappers, Tailwind UI conventions, and the layout architecture derived from the B-3.0 theme update.

---

## 1. Vue.js Component Conventions & Best Practices

All global UI blocks and recurring atomic elements are strictly abstracted into the `src/components/general/` directory and loaded globally in `general.js`.

**DO NOT use raw HTML elements for standard UI interactions.** Always utilize the registered `C-*` components.

### 1.1 Structural Components
*   **`<C-Main-Block>`**:
    *   **Usage**: Wraps exactly one entire view/page.
    *   **Behavior**: Provides structural safety, `min-h-screen`, and handles background sizing limits.
*   **`<C-Back-Nav>`**:
    *   **Usage**: The top-level sticky title bar (`fixed inset-x-0 top-0...`).
    *   **Props**:
        *   `:title`: String Title (e.g. `'預約紀錄'`).
        *   `:routeTarget`: Specific router name to navigate on back click.
        *   `bgClass`: Supports dynamic backgrounds (default `'bg-[#FAFAFA]'`, highly utilized with `'bg-white'`).
    *   **Slots**: Supports `<slot name="right" />` to inject action buttons natively aligned via flexbox container (`max-w-screen-md items-center justify-end`), eliminating the need for `absolute top-4 right-5` hacks.

### 1.2 Form & Interactive Elements
*   **`<C-Button-Check>`**:
    *   **Usage**: A pill-like toggle label/checkbox used largely in filters or property toggles.
    *   **Styling Theme**:
        *   **Active**: Hollow outline leveraging the system primary orange: `border border-gmb-orange-500 font-bold text-gmb-orange-500 bg-white`.
        *   **Inactive**: Seamless grey baseline avoiding layout jumping: `border border-gray-100 font-medium text-gray-400 bg-gray-50`.
*   **`<C-Filter-Wrap>` / `DefaultFilterWrap`**:
    *   **Warning (Z-Index)**: When displaying full-screen overlays, ensure `z-index` is elevated to `z-[60]` or `z-[70]` to completely cover the global `BottomNav` (`z-50`).

### 1.3 Modals & Overlays
*   **`<C-Modal-Dialog>`**:
    *   **Usage**: Standard overlay component. Extremely flexible via props.
    *   **Prop: `position="bottom"`**:
        *   Transforms standard modals into native mobile **Bottom Sheets**.
        *   Automatically leverages `max-w-screen-md w-full` and caps height at `max-h-[75vh]` to prevent scrolling lockouts.
        *   **Internal scrolling**: Content slots seamlessly deploy `overflow-y-auto`.
    *   **Implementation Note**: Replace `absolute right-top` DOM tooltips with this component for better responsive behavior across viewports.

---

## 2. Global Layout System (`B-3.0`)

The application embraces a "Mobile-First" WebApp layout mapping natively even when stretched to desktop widths.

### The Immutable Grid Law ⚖️
1.  **Horizontal Containment (`max-w-screen-md`)**:
    *   Every major section—including Navbars (`BackNav`), Toolbars (`BottomNav`), Page Bodies, and Modals—must enforce horizontal bounds via `max-w-screen-md mx-auto`.
    *   Failure to apply this results in UI stretching to the extreme edges of desktop views, tearing the UX map perfectly in half.
2.  **Global Persistent `BottomNav`**:
    *   The core navigation operates on `fixed bottom-0 z-50`.
    *   Always verify elements anchored to the bottom using `fixed` or `absolute` are either shifted up vertically via `pb-14` or rendered with a higher Z-Index (e.g., `z-[60]`) to overlap the navigation organically.

### The Theming Law 🎨
*   **Primary Accent**: `text-gmb-orange-500` / `border-gmb-orange-500`
*   **Deprecated Theme Colors**: `bg-meimate-yellow` (solid light brown / `#C4A67D`) is mostly phasing out for actionable states in favor of the bold outlined orange paradigm ("空心" style).
*   **Neutral Palettes**: Heavily relies on `bg-[#FAFAFA]` for backdrops and pure `bg-white` for distinct layered depth.

---

## 3. Recommended Dev Process for New Feature Additions

1.  **Check existing components**: Never write a custom `<button>` or `<input type="date">` without investigating the existing `<C-*>` variants inside `src/components/general/`.
2.  **Respect Accessibility**: When applying `@click` to a generic `<div class="btn">`, always chain a corresponding `@keypress.enter` event and inject `role="button"` and `tabindex="0"` to conform with Vue's `vuejs-accessibility/click-events-have-key-events` ESlint rule natively integrated into the compiler.
3.  **Confirm Alignment**: Validate that UI placements utilizing `absolute` do not break when testing on horizontal resolutions larger than `768px`. Revert to Flex/Grid behaviors (`justify-between`, `items-center`) inside the globally constrained blocks.
