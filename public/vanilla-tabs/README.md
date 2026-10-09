# Tabs Component: Switch Between Different Content Views Using Navigation Tabs

A production-ready, accessible, and lightweight Tabs component created with plain semantic HTML5, CSS3 Custom Properties, and modular vanilla JavaScript.

---

## 1. Project Overview & Learning Objectives

This lab project teaches core front-end architectural concepts by building a real-world component from scratch without frameworks:

- **WAI-ARIA Tabs Pattern**: Understanding `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, and `aria-labelledby`.
- **Keyboard Navigation & Roving Tabindex**: Implementing accessible keyboard focus management (`ArrowLeft`, `ArrowRight`, `Home`, `End`, `Tab`).
- **CSS Architecture with Custom Properties**: Designing customizable themes with design tokens (`--tabs-primary`, `--tabs-bg`, etc.) and supporting `prefers-reduced-motion`.
- **Object-Oriented JavaScript**: Writing a clean, reusable `class Tabs` that supports multiple independent instances on the same page and optional URL hash synchronization.

---

## 2. Folder Structure

```text
tabs-component/
├── index.html        # Semantic HTML structure & accessible ARIA markup
├── style.css         # CSS variables, card container, active styles, transitions
├── script.js         # Reusable Tabs class, event handlers, keyboard routing
└── README.md         # Documentation, lab exercises, and testing checklist
```

---

## 3. How to Run the Project

Because this project uses plain HTML, CSS, and JavaScript, no build tools or package managers are required.

1. **Option A: Direct Browser File**
   Double-click `index.html` or open it with your web browser.

2. **Option B: Local Web Server (Recommended)**
   If you have Python installed:
   ```bash
   # Python 3
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

   Or with VS Code Live Server extension: right-click `index.html` and choose **Open with Live Server**.

---

## 4. How the Component Works

1. **HTML & Semantic Markup:**
   - The outer container has class `.tabs`.
   - The tab bar has `role="tablist"` and an accessible `aria-label`.
   - Each tab button has `role="tab"`, `aria-selected="true|false"`, `tabindex="0|-1"`, and an `aria-controls="panel-id"` link.
   - Each panel has `role="tabpanel"`, `aria-labelledby="tab-id"`, and `tabindex="0"` to allow screen readers and keyboard users to focus into content.

2. **Styling & Motion:**
   - Colors and dimensions are driven by `:root` CSS custom properties.
   - Inactive panels have the `hidden` attribute or `display: none`.
   - Active panels transition in smoothly with opacity and subtle translate animations.
   - `@media (prefers-reduced-motion: reduce)` zeroes transitions for motion-sensitive users.

3. **JavaScript Controller (`class Tabs`):**
   - Automatically initializes all `.tabs` containers on DOM ready.
   - Enforces the **roving tabindex pattern**: only the active tab can receive tab focus (`tabindex="0"`), while sibling tabs have `tabindex="-1"`.
   - Listens for arrow keys (`ArrowRight` / `ArrowLeft`), `Home`, and `End` to switch tabs with automatic focus.
   - Supports deep linking: activates tabs via URL hash (e.g. `#pricing`) and updates `history.replaceState` smoothly without jumping the page.

---

## 5. Lab Tasks (Exercises for Students)

### Task 1: Add a 5th Tab ("Testimonials")
1. In `index.html`, add a 5th `<button role="tab">` inside the `role="tablist"` container:
   ```html
   <button type="button" role="tab" class="tabs__tab" id="tab-reviews"
     aria-selected="false" aria-controls="panel-reviews" tabindex="-1">
     <span class="tabs__tab-text">Reviews</span>
   </button>
   ```
2. Below the existing panels, add the corresponding `<section>`:
   ```html
   <section role="tabpanel" class="tabs__panel" id="panel-reviews"
     aria-labelledby="tab-reviews" tabindex="0" hidden>
     <h2 class="panel-heading">What Customers Say</h2>
     <p class="panel-lead">Read reviews from engineering teams scaling worldwide.</p>
   </section>
   ```
3. Test that clicking it activates the panel and that arrow keys navigate through all 5 tabs.

### Task 2: Change the Theme Colors
Modify the CSS custom properties in `style.css` under `:root` to create an Emerald or Violet theme:
```css
:root {
  --tabs-primary: #059669;        /* Emerald 600 */
  --tabs-primary-hover: #047857;  /* Emerald 700 */
  --tabs-primary-subtle: #ecfdf5; /* Emerald 50 */
  --tabs-text-active: #059669;
  --tabs-border-radius: 16px;
}
```

### Task 3: Add an Icon to Each Tab
Include inline SVG icons inside each tab button wrapped in `<span class="tabs__tab-icon" aria-hidden="true">` to enhance visual recognition without interfering with screen reader labels.

### Task 4: Make Tabs Vertical on Desktop
Add the modifier class `tabs--vertical` to the `.tabs` container:
```html
<div class="tabs tabs--vertical" id="product-tabs">
```
Ensure desktop layouts display the navigation as a sidebar on the left and the panels on the right (see Section 8 of `style.css`).

### Task 5: Add a Second Independent Tab Group
Duplicate the tabs markup with new unique IDs (e.g., `id="docs-tabs"`, tabs `tab-quickstart`, `tab-auth`, and panels `panel-quickstart`, `panel-auth`). Verify that switching tabs in the first group does not affect the second group.

---

## 6. Testing Checklist

Use this checklist to verify your component's quality before submission:

- [ ] **Mouse Interaction:** Clicking any tab immediately shows its associated panel and hides others.
- [ ] **Active Tab Style:** The active tab is unmistakably distinct from inactive tabs.
- [ ] **Default State:** The first tab (or URL hash tab) is active on initial load.
- [ ] **Keyboard: Arrow Keys:** Pressing `Right Arrow` focuses the next tab (wraps from last to first); `Left Arrow` focuses the previous tab.
- [ ] **Keyboard: Home / End:** Pressing `Home` jumps directly to the first tab; `End` jumps to the last tab.
- [ ] **Keyboard: Tab Focus:** Pressing `Tab` moves focus out of the tab bar into the active panel.
- [ ] **Mobile & Responsive:** On screens $<600\text{px}$, the tab bar scrolls horizontally or stacks without broken overflows or clipped borders.
- [ ] **Accessibility (ARIA):** Exactly one tab has `aria-selected="true"` and `tabindex="0"`; inactive tabs have `aria-selected="false"` and `tabindex="-1"`.
- [ ] **Motion Sensitivity:** With `prefers-reduced-motion` enabled in system settings, tab transitions switch instantaneously.
