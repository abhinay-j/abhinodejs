/**
 * ============================================================================
 * Accessible Tabs Component (WAI-ARIA Tabs Pattern)
 * ============================================================================
 * A lightweight, dependency-free JavaScript class that manages accessible
 * tab navigation following W3C WAI-ARIA Authoring Practices.
 *
 * Features:
 * - Full Keyboard Navigation (Arrow Keys, Home, End, Tab)
 * - Roving tabindex pattern (tabindex="0" for active, tabindex="-1" for others)
 * - ARIA state synchronization (aria-selected, aria-controls, hidden)
 * - URL Hash synchronization (optional, bookmarkable tab state)
 * - Reusable across multiple independent tab groups on the same page
 */

class Tabs {
  /**
   * Initialize a new Tabs instance.
   * @param {string|HTMLElement} container - Selector string or DOM element
   * @param {Object} options - Configuration options
   * @param {boolean} options.syncHash - Whether to sync active tab with URL hash (default: true)
   * @param {number} options.defaultIndex - Fallback active tab index if no hash is present (default: 0)
   * @param {Function} options.onChange - Optional callback triggered on tab change
   */
  constructor(container, options = {}) {
    // 1. Resolve container element
    this.container = typeof container === 'string'
      ? document.querySelector(container)
      : container;

    if (!this.container) {
      console.warn(`Tabs: Container "${container}" not found in DOM.`);
      return;
    }

    // 2. Merge options with defaults
    this.options = Object.assign({
      syncHash: this.container.dataset.syncHash === 'true' || true,
      defaultIndex: 0,
      onChange: null,
    }, options);

    // 3. Query sub-elements
    this.tablist = this.container.querySelector('[role="tablist"]');
    this.tabs = Array.from(this.container.querySelectorAll('[role="tab"]'));
    this.panels = Array.from(this.container.querySelectorAll('[role="tabpanel"]'));

    if (!this.tabs.length || !this.panels.length) {
      console.warn('Tabs: Must contain at least one [role="tab"] and [role="tabpanel"].');
      return;
    }

    // 4. Initialize state & event listeners
    this.activeIndex = -1;
    this.init();
  }

  /**
   * Bind event listeners and activate the initial tab.
   */
  init() {
    // Determine orientation from tablist aria-orientation or class
    this.isVertical = this.container.classList.contains('tabs--vertical') ||
                      this.tablist.getAttribute('aria-orientation') === 'vertical';

    // Bind event handlers
    this.tabs.forEach((tab, index) => {
      // Click interaction
      tab.addEventListener('click', (event) => {
        event.preventDefault();
        this.selectTab(index, true);
      });

      // Keyboard interaction (WAI-ARIA tabs specification)
      tab.addEventListener('keydown', (event) => {
        this.handleKeyDown(event, index);
      });
    });

    // Handle browser back/forward history navigation if hash syncing is enabled
    if (this.options.syncHash) {
      window.addEventListener('hashchange', () => {
        this.activateFromHash();
      });
    }

    // Determine initial active tab: check URL hash first, fallback to defaultIndex
    const initialIndex = this.getInitialIndex();
    this.selectTab(initialIndex, false);
  }

  /**
   * Determine the index of the tab that should be active initially.
   * @returns {number}
   */
  getInitialIndex() {
    if (this.options.syncHash && window.location.hash) {
      const hashId = window.location.hash.substring(1);
      // Check if hash matches a tab ID or a panel ID
      const matchedIndex = this.tabs.findIndex((tab, i) => {
        const panelId = tab.getAttribute('aria-controls');
        return tab.id === hashId || tab.id === `tab-${hashId}` ||
               panelId === hashId || panelId === `panel-${hashId}`;
      });

      if (matchedIndex !== -1) {
        return matchedIndex;
      }
    }

    // Check if any tab in HTML already has .is-active or aria-selected="true"
    const preactiveIndex = this.tabs.findIndex(tab =>
      tab.classList.contains('is-active') || tab.getAttribute('aria-selected') === 'true'
    );

    return preactiveIndex !== -1 ? preactiveIndex : this.options.defaultIndex;
  }

  /**
   * Activate tab based on the current URL hash.
   */
  activateFromHash() {
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    const targetIndex = this.tabs.findIndex(tab => {
      const panelId = tab.getAttribute('aria-controls');
      return tab.id === hash || tab.id === `tab-${hash}` ||
             panelId === hash || panelId === `panel-${hash}`;
    });

    if (targetIndex !== -1 && targetIndex !== this.activeIndex) {
      this.selectTab(targetIndex, false);
    }
  }

  /**
   * Select and activate a tab by its index.
   * @param {number} index - Index of the tab to activate
   * @param {boolean} shouldFocus - Whether to set programmatic focus to the tab
   */
  selectTab(index, shouldFocus = false) {
    if (index < 0 || index >= this.tabs.length) return;
    if (index === this.activeIndex) return;

    this.activeIndex = index;
    const activeTab = this.tabs[index];
    const targetPanelId = activeTab.getAttribute('aria-controls');

    // 1. Update Tabs (ARIA attributes & roving tabindex)
    this.tabs.forEach((tab, i) => {
      const isSelected = i === index;

      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      tab.setAttribute('tabindex', isSelected ? '0' : '-1');
      tab.classList.toggle('is-active', isSelected);
    });

    // 2. Update Panels (visibility & active classes)
    this.panels.forEach(panel => {
      const isMatch = panel.id === targetPanelId;

      if (isMatch) {
        panel.removeAttribute('hidden');
        panel.classList.add('is-active');
      } else {
        panel.setAttribute('hidden', '');
        panel.classList.remove('is-active');
      }
    });

    // 3. Move keyboard focus if requested
    if (shouldFocus) {
      activeTab.focus();
    }

    // 4. Optionally update URL hash without scrolling the viewport
    if (this.options.syncHash) {
      const hashName = activeTab.id.replace(/^tab-/, '') || targetPanelId.replace(/^panel-/, '');
      if (history.replaceState) {
        history.replaceState(null, '', `#${hashName}`);
      } else {
        window.location.hash = hashName;
      }
    }

    // 5. Trigger onChange callback if provided
    if (typeof this.options.onChange === 'function') {
      const activePanel = this.panels.find(p => p.id === targetPanelId);
      this.options.onChange({
        index,
        tab: activeTab,
        panel: activePanel,
        tabId: activeTab.id,
        panelId: targetPanelId
      });
    }
  }

  /**
   * Handle keyboard navigation following the WAI-ARIA Tabs pattern.
   * @param {KeyboardEvent} event - The keyboard event
   * @param {number} currentIndex - Index of the currently focused tab
   */
  handleKeyDown(event, currentIndex) {
    const totalTabs = this.tabs.length;
    let nextIndex = null;

    switch (event.key) {
      // Move to previous tab (with wrap-around)
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        nextIndex = (currentIndex - 1 + totalTabs) % totalTabs;
        break;

      // Move to next tab (with wrap-around)
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        nextIndex = (currentIndex + 1) % totalTabs;
        break;

      // Jump to the first tab
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;

      // Jump to the last tab
      case 'End':
        event.preventDefault();
        nextIndex = totalTabs - 1;
        break;

      // Tab key default behavior moves focus to the active tabpanel
      case 'Tab':
        // Let natural browser focus order navigate to panel / panel contents
        return;

      default:
        return;
    }

    if (nextIndex !== null) {
      this.selectTab(nextIndex, true);
    }
  }

  /**
   * Destroy the instance and detach listeners (cleanup helper)
   */
  destroy() {
    this.tabs.forEach(tab => {
      tab.removeAttribute('tabindex');
      tab.removeAttribute('aria-selected');
      tab.classList.remove('is-active');
    });
    this.panels.forEach(panel => {
      panel.removeAttribute('hidden');
      panel.classList.remove('is-active');
    });
  }
}

// ----------------------------------------------------------------------------
// Automatic Initialization on DOMContentLoaded
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Find all tab containers on page and initialize them
  const tabContainers = document.querySelectorAll('.tabs');
  tabContainers.forEach(container => {
    new Tabs(container);
  });
});
