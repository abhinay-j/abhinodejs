export interface CodeFile {
  id: string;
  filename: string;
  language: 'html' | 'css' | 'javascript' | 'markdown';
  description: string;
  code: string;
}

export const SOURCE_FILES: CodeFile[] = [
  {
    id: 'index-html',
    filename: 'index.html',
    language: 'html',
    description: 'Semantic HTML5 structure with WAI-ARIA roles, attributes, and panel markup.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Accessible Tabs Component</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <main class="page-container">
    <header class="page-header">
      <h1 class="page-title">Accessible Tabs Component</h1>
      <p class="page-subtitle">
        Switch between different content views using accessible, keyboard-friendly navigation tabs.
      </p>
    </header>

    <!-- Primary Tabs Group -->
    <div class="tabs" id="product-tabs" data-sync-hash="true">
      <!-- Tab Navigation List -->
      <div class="tabs__nav" role="tablist" aria-label="Product Information">
        <button
          type="button"
          role="tab"
          class="tabs__tab is-active"
          id="tab-overview"
          aria-selected="true"
          aria-controls="panel-overview"
          tabindex="0"
        >
          <span class="tabs__tab-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </span>
          <span class="tabs__tab-text">Overview</span>
        </button>

        <button
          type="button"
          role="tab"
          class="tabs__tab"
          id="tab-features"
          aria-selected="false"
          aria-controls="panel-features"
          tabindex="-1"
        >
          <span class="tabs__tab-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </span>
          <span class="tabs__tab-text">Features</span>
        </button>

        <button
          type="button"
          role="tab"
          class="tabs__tab"
          id="tab-pricing"
          aria-selected="false"
          aria-controls="panel-pricing"
          tabindex="-1"
        >
          <span class="tabs__tab-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="20" height="14" x="2" y="5" rx="2"/>
              <line x1="2" x2="22" y1="10" y2="10"/>
            </svg>
          </span>
          <span class="tabs__tab-text">Pricing</span>
        </button>

        <button
          type="button"
          role="tab"
          class="tabs__tab"
          id="tab-contact"
          aria-selected="false"
          aria-controls="panel-contact"
          tabindex="-1"
        >
          <span class="tabs__tab-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </span>
          <span class="tabs__tab-text">Contact</span>
        </button>
      </div>

      <!-- Tab Content Panels -->
      <div class="tabs__panels">
        <!-- Panel 1: Overview -->
        <section
          role="tabpanel"
          class="tabs__panel is-active"
          id="panel-overview"
          aria-labelledby="tab-overview"
          tabindex="0"
        >
          <h2 class="panel-heading">Modern Cloud Architecture Platform</h2>
          <p class="panel-lead">
            Accelerate your engineering workflow with unified deployments, automated edge orchestration, and real-time observability.
          </p>
          <div class="panel-grid">
            <div class="panel-card">
              <h3>Fast Prototyping</h3>
              <p>Spin up isolated staging environments in under 30 seconds with pre-configured developer templates.</p>
            </div>
            <div class="panel-card">
              <h3>Built-in Security</h3>
              <p>End-to-end encryption, automated TLS certificates, and fine-grained role-based access control.</p>
            </div>
            <div class="panel-card">
              <h3>Global CDN</h3>
              <p>Ultra-low latency delivery powered by an edge network spanning 280+ points of presence worldwide.</p>
            </div>
          </div>
        </section>

        <!-- Panel 2: Features -->
        <section
          role="tabpanel"
          class="tabs__panel"
          id="panel-features"
          aria-labelledby="tab-features"
          tabindex="0"
          hidden
        >
          <h2 class="panel-heading">Engineered for High-Velocity Teams</h2>
          <p class="panel-lead">
            Every feature is designed to reduce cognitive load and eliminate deployment friction.
          </p>
          <ul class="feature-list">
            <li>
              <strong>Instant Branch Previews:</strong> Every pull request receives an isolated ephemeral environment.
            </li>
            <li>
              <strong>Live Telemetry:</strong> Distributed tracing, structured log queries, and zero-config metrics dashboards.
            </li>
            <li>
              <strong>Zero-Downtime Rollouts:</strong> Automated blue-green deployments with instant rollback safety nets.
            </li>
            <li>
              <strong>Custom Domain Management:</strong> Automated DNS validation and multi-region routing.
            </li>
          </ul>
        </section>

        <!-- Panel 3: Pricing -->
        <section
          role="tabpanel"
          class="tabs__panel"
          id="panel-pricing"
          aria-labelledby="tab-pricing"
          tabindex="0"
          hidden
        >
          <h2 class="panel-heading">Simple, Transparent Pricing</h2>
          <p class="panel-lead">
            Choose the tier that matches your team's scale. Upgrade, downgrade, or cancel anytime.
          </p>
          <div class="pricing-grid">
            <div class="pricing-card">
              <span class="pricing-badge">Starter</span>
              <div class="pricing-cost"><span class="price">$0</span> / month</div>
              <p class="pricing-desc">For indie hackers and hobby projects needing reliable web hosting.</p>
              <ul class="pricing-features">
                <li>3 active projects</li>
                <li>Global CDN edge</li>
                <li>Community Discord support</li>
              </ul>
              <button type="button" class="btn btn-secondary">Get Started Free</button>
            </div>
            <div class="pricing-card is-featured">
              <span class="pricing-badge">Professional</span>
              <div class="pricing-cost"><span class="price">$29</span> / month</div>
              <p class="pricing-desc">For growing startups and product teams delivering commercial apps.</p>
              <ul class="pricing-features">
                <li>Unlimited projects</li>
                <li>Automated preview deployments</li>
                <li>Priority 24/7 engineering support</li>
              </ul>
              <button type="button" class="btn btn-primary">Start 14-Day Trial</button>
            </div>
            <div class="pricing-card">
              <span class="pricing-badge">Enterprise</span>
              <div class="pricing-cost"><span class="price">$99</span> / month</div>
              <p class="pricing-desc">Dedicated infrastructure, SSO compliance, and tailored SLAs.</p>
              <ul class="pricing-features">
                <li>Custom SLA (99.99%)</li>
                <li>Dedicated VPC peering</li>
                <li>Dedicated technical account manager</li>
              </ul>
              <button type="button" class="btn btn-secondary">Contact Sales</button>
            </div>
          </div>
        </section>

        <!-- Panel 4: Contact -->
        <section
          role="tabpanel"
          class="tabs__panel"
          id="panel-contact"
          aria-labelledby="tab-contact"
          tabindex="0"
          hidden
        >
          <h2 class="panel-heading">Get in Touch with Our Team</h2>
          <p class="panel-lead">
            Have questions about architecture, migration, or enterprise compliance? We're here to help.
          </p>
          <form class="contact-form" onsubmit="event.preventDefault(); alert('Message submitted successfully!');">
            <div class="form-row">
              <div class="form-group">
                <label for="contact-name">Full Name</label>
                <input type="text" id="contact-name" name="name" required placeholder="Alex Morgan" />
              </div>
              <div class="form-group">
                <label for="contact-email">Work Email</label>
                <input type="email" id="contact-email" name="email" required placeholder="alex@company.com" />
              </div>
            </div>
            <div class="form-group">
              <label for="contact-message">Message</label>
              <textarea id="contact-message" name="message" rows="4" required placeholder="Tell us about your project requirements..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Send Message</button>
          </form>
        </section>
      </div>
    </div>
  </main>

  <script src="script.js"></script>
</body>
</html>`
  },
  {
    id: 'style-css',
    filename: 'style.css',
    language: 'css',
    description: 'CSS Custom Properties, responsive card container, active tab styles, and transitions.',
    code: `/* ==========================================================================
   Accessible Tabs Component Stylesheet
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. CSS Custom Properties (Theme & Spacing Variables)
   -------------------------------------------------------------------------- */
:root {
  /* Brand & Accent Colors */
  --tabs-primary: #2563eb;         /* Royal Blue 600 */
  --tabs-primary-hover: #1d4ed8;   /* Royal Blue 700 */
  --tabs-primary-subtle: #eff6ff;  /* Royal Blue 50 */
  --tabs-focus-ring: rgba(37, 99, 235, 0.4);

  /* Surface & Background Colors */
  --tabs-bg-page: #f8fafc;         /* Slate 50 */
  --tabs-bg-card: #ffffff;         /* Clean White */
  --tabs-bg-nav: #f1f5f9;          /* Slate 100 */
  --tabs-bg-hover: #e2e8f0;        /* Slate 200 */

  /* Text Colors */
  --tabs-text-main: #0f172a;       /* Slate 900 */
  --tabs-text-muted: #64748b;      /* Slate 500 */
  --tabs-text-active: #2563eb;     /* Blue 600 */

  /* Borders & Shadows */
  --tabs-border-color: #e2e8f0;    /* Slate 200 */
  --tabs-border-radius: 12px;
  --tabs-tab-radius: 8px;
  --tabs-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
                 0 2px 4px -2px rgba(0, 0, 0, 0.05);

  /* Spacing */
  --tabs-padding-nav: 6px;
  --tabs-padding-tab-x: 18px;
  --tabs-padding-tab-y: 10px;
  --tabs-padding-panel: 32px;

  /* Animation & Transitions */
  --tabs-transition-speed: 200ms;
  --tabs-transition-timing: cubic-bezier(0.16, 1, 0.3, 1);
}

/* --------------------------------------------------------------------------
   2. Reset & Page Scaffolding
   -------------------------------------------------------------------------- */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--tabs-bg-page);
  color: var(--tabs-text-main);
  line-height: 1.5;
  padding: 40px 20px;
  min-height: 100vh;
}

.page-container {
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--tabs-text-main);
  letter-spacing: -0.025em;
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 1.05rem;
  color: var(--tabs-text-muted);
  max-width: 600px;
  margin: 0 auto;
}

/* --------------------------------------------------------------------------
   3. Tabs Component Container (Card Style)
   -------------------------------------------------------------------------- */
.tabs {
  background-color: var(--tabs-bg-card);
  border: 1px solid var(--tabs-border-color);
  border-radius: var(--tabs-border-radius);
  box-shadow: var(--tabs-shadow);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* --------------------------------------------------------------------------
   4. Tab Navigation List (role="tablist")
   -------------------------------------------------------------------------- */
.tabs__nav {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: var(--tabs-bg-nav);
  padding: var(--tabs-padding-nav);
  border-bottom: 1px solid var(--tabs-border-color);
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  -webkit-overflow-scrolling: touch;
}

.tabs__nav::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

/* --------------------------------------------------------------------------
   5. Tab Button (role="tab")
   -------------------------------------------------------------------------- */
.tabs__tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: var(--tabs-padding-tab-y) var(--tabs-padding-tab-x);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--tabs-text-muted);
  background: transparent;
  border: none;
  border-radius: var(--tabs-tab-radius);
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  transition: color var(--tabs-transition-speed) ease,
              background-color var(--tabs-transition-speed) ease,
              box-shadow var(--tabs-transition-speed) ease;
  position: relative;
  min-height: 44px; /* Accessible touch target height */
}

.tabs__tab:hover:not(.is-active) {
  color: var(--tabs-text-main);
  background-color: var(--tabs-bg-hover);
}

/* Focus styles (Accessibility requirement) */
.tabs__tab:focus-visible {
  outline: 2px solid var(--tabs-primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 3px var(--tabs-focus-ring);
  z-index: 1;
}

/* Active Tab Styles */
.tabs__tab.is-active,
.tabs__tab[aria-selected="true"] {
  color: var(--tabs-text-active);
  background-color: var(--tabs-bg-card);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}

/* Tab Icon & Text */
.tabs__tab-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.tabs__tab-icon svg {
  display: block;
}

/* --------------------------------------------------------------------------
   6. Tab Panels (role="tabpanel")
   -------------------------------------------------------------------------- */
.tabs__panels {
  position: relative;
}

.tabs__panel {
  padding: var(--tabs-padding-panel);
  display: none;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity var(--tabs-transition-speed) var(--tabs-transition-timing),
              transform var(--tabs-transition-speed) var(--tabs-transition-timing);
}

/* When active, show and animate */
.tabs__panel.is-active {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

/* Visible focus outline when panel receives programmatic/tab focus */
.tabs__panel:focus-visible {
  outline: 2px solid var(--tabs-primary);
  outline-offset: -2px;
}

/* --------------------------------------------------------------------------
   7. Respect prefers-reduced-motion (Accessibility Requirement)
   -------------------------------------------------------------------------- */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .tabs__panel {
    transform: none !important;
  }
}

/* --------------------------------------------------------------------------
   8. Optional Modifier: Vertical Tabs (Lab Task 4)
   -------------------------------------------------------------------------- */
@media (min-width: 768px) {
  .tabs--vertical {
    flex-direction: row;
  }

  .tabs--vertical .tabs__nav {
    flex-direction: column;
    align-items: stretch;
    border-bottom: none;
    border-right: 1px solid var(--tabs-border-color);
    min-width: 200px;
    padding: 12px;
  }

  .tabs--vertical .tabs__tab {
    width: 100%;
    justify-content: flex-start;
  }

  .tabs--vertical .tabs__panels {
    flex: 1;
  }
}

/* --------------------------------------------------------------------------
   9. Sample Panel Content Styling
   -------------------------------------------------------------------------- */
.panel-heading {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--tabs-text-main);
}

.panel-lead {
  font-size: 1.05rem;
  color: var(--tabs-text-muted);
  margin-bottom: 24px;
}

.panel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.panel-card {
  padding: 18px;
  border-radius: 8px;
  border: 1px solid var(--tabs-border-color);
  background-color: #fafafa;
}

.panel-card h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--tabs-text-main);
}

.panel-card p {
  font-size: 0.875rem;
  color: var(--tabs-text-muted);
}

.feature-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.feature-list li {
  padding-left: 24px;
  position: relative;
  font-size: 0.95rem;
  color: var(--tabs-text-muted);
}

.feature-list li strong {
  color: var(--tabs-text-main);
}

.feature-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--tabs-primary);
  font-weight: bold;
}

/* Pricing Grid */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.pricing-card {
  border: 1px solid var(--tabs-border-color);
  border-radius: 10px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  background-color: var(--tabs-bg-card);
}

.pricing-card.is-featured {
  border-color: var(--tabs-primary);
  box-shadow: 0 0 0 1px var(--tabs-primary);
  position: relative;
}

.pricing-badge {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--tabs-primary);
  margin-bottom: 12px;
}

.pricing-cost {
  font-size: 0.9rem;
  color: var(--tabs-text-muted);
  margin-bottom: 8px;
}

.pricing-cost .price {
  font-size: 2rem;
  font-weight: 700;
  color: var(--tabs-text-main);
}

.pricing-desc {
  font-size: 0.85rem;
  color: var(--tabs-text-muted);
  margin-bottom: 16px;
}

.pricing-features {
  list-style: disc inside;
  font-size: 0.85rem;
  color: var(--tabs-text-muted);
  margin-bottom: 24px;
  flex: 1;
}

.pricing-features li {
  margin-bottom: 6px;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background-color 150ms ease, border-color 150ms ease;
  min-height: 40px;
}

.btn-primary {
  background-color: var(--tabs-primary);
  color: #ffffff;
}

.btn-primary:hover {
  background-color: var(--tabs-primary-hover);
}

.btn-secondary {
  background-color: transparent;
  border-color: var(--tabs-border-color);
  color: var(--tabs-text-main);
}

.btn-secondary:hover {
  background-color: var(--tabs-bg-hover);
}

/* Contact Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 560px;
}

.form-row {
  display: flex;
  gap: 16px;
}

@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--tabs-text-main);
}

.form-group input,
.form-group textarea {
  padding: 10px 14px;
  border: 1px solid var(--tabs-border-color);
  border-radius: 6px;
  font-size: 0.9375rem;
  color: var(--tabs-text-main);
  background-color: #ffffff;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--tabs-primary);
  box-shadow: 0 0 0 3px var(--tabs-focus-ring);
}`
  },
  {
    id: 'script-js',
    filename: 'script.js',
    language: 'javascript',
    description: 'Reusable Tabs class with roving tabindex, ARIA sync, keyboard controls, and URL hash routing.',
    code: `/**
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
      console.warn(\`Tabs: Container "\${container}" not found in DOM.\`);
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
        return tab.id === hashId || tab.id === \`tab-\${hashId}\` ||
               panelId === hashId || panelId === \`panel-\${hashId}\`;
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
      return tab.id === hash || tab.id === \`tab-\${hash}\` ||
             panelId === hash || panelId === \`panel-\${hash}\`;
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
        history.replaceState(null, '', \`#\${hashName}\`);
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
});`
  },
  {
    id: 'readme-md',
    filename: 'README.md',
    language: 'markdown',
    description: 'Documentation, learning objectives, lab tasks, and testing checklist.',
    code: `# Tabs Component: Switch Between Different Content Views Using Navigation Tabs

A production-ready, accessible, and lightweight Tabs component created with plain semantic HTML5, CSS3 Custom Properties, and modular vanilla JavaScript.

---

## 1. Project Overview & Learning Objectives

This lab project teaches core front-end architectural concepts by building a real-world component from scratch without frameworks:

- **WAI-ARIA Tabs Pattern**: Understanding \`role="tablist"\`, \`role="tab"\`, \`role="tabpanel"\`, \`aria-selected\`, \`aria-controls\`, and \`aria-labelledby\`.
- **Keyboard Navigation & Roving Tabindex**: Implementing accessible keyboard focus management (\`ArrowLeft\`, \`ArrowRight\`, \`Home\`, \`End\`, \`Tab\`).
- **CSS Architecture with Custom Properties**: Designing customizable themes with design tokens (\`--tabs-primary\`, \`--tabs-bg\`, etc.) and supporting \`prefers-reduced-motion\`.
- **Object-Oriented JavaScript**: Writing a clean, reusable \`class Tabs\` that supports multiple independent instances on the same page and optional URL hash synchronization.

---

## 2. Folder Structure

\`\`\`text
tabs-component/
├── index.html        # Semantic HTML structure & accessible ARIA markup
├── style.css         # CSS variables, card container, active styles, transitions
├── script.js         # Reusable Tabs class, event handlers, keyboard routing
└── README.md         # Documentation, lab exercises, and testing checklist
\`\`\`

---

## 3. How to Run the Project

Because this project uses plain HTML, CSS, and JavaScript, no build tools or package managers are required.

1. **Option A: Direct Browser File**
   Double-click \`index.html\` or open it with your web browser.

2. **Option B: Local Web Server (Recommended)**
   If you have Python installed:
   \`\`\`bash
   # Python 3
   python -m http.server 8000
   \`\`\`
   Then open \`http://localhost:8000\` in your browser.

   Or with VS Code Live Server extension: right-click \`index.html\` and choose **Open with Live Server**.

---

## 4. How the Component Works

1. **HTML & Semantic Markup:**
   - The outer container has class \`.tabs\`.
   - The tab bar has \`role="tablist"\` and an accessible \`aria-label\`.
   - Each tab button has \`role="tab"\`, \`aria-selected="true|false"\`, \`tabindex="0|-1"\`, and an \`aria-controls="panel-id"\` link.
   - Each panel has \`role="tabpanel"\`, \`aria-labelledby="tab-id"\`, and \`tabindex="0"\` to allow screen readers and keyboard users to focus into content.

2. **Styling & Motion:**
   - Colors and dimensions are driven by \`:root\` CSS custom properties.
   - Inactive panels have the \`hidden\` attribute or \`display: none\`.
   - Active panels transition in smoothly with opacity and subtle translate animations.
   - \`@media (prefers-reduced-motion: reduce)\` zeroes transitions for motion-sensitive users.

3. **JavaScript Controller (\`class Tabs\`):**
   - Automatically initializes all \`.tabs\` containers on DOM ready.
   - Enforces the **roving tabindex pattern**: only the active tab can receive tab focus (\`tabindex="0"\`), while sibling tabs have \`tabindex="-1"\`.
   - Listens for arrow keys (\`ArrowRight\` / \`ArrowLeft\`), \`Home\`, and \`End\` to switch tabs with automatic focus.
   - Supports deep linking: activates tabs via URL hash (e.g. \`#pricing\`) and updates \`history.replaceState\` smoothly without jumping the page.

---

## 5. Lab Tasks (Exercises for Students)

### Task 1: Add a 5th Tab ("Testimonials")
1. In \`index.html\`, add a 5th \`<button role="tab">\` inside the \`role="tablist"\` container:
   \`\`\`html
   <button type="button" role="tab" class="tabs__tab" id="tab-reviews"
     aria-selected="false" aria-controls="panel-reviews" tabindex="-1">
     <span class="tabs__tab-text">Reviews</span>
   </button>
   \`\`\`
2. Below the existing panels, add the corresponding \`<section>\`:
   \`\`\`html
   <section role="tabpanel" class="tabs__panel" id="panel-reviews"
     aria-labelledby="tab-reviews" tabindex="0" hidden>
     <h2 class="panel-heading">What Customers Say</h2>
     <p class="panel-lead">Read reviews from engineering teams scaling worldwide.</p>
   </section>
   \`\`\`
3. Test that clicking it activates the panel and that arrow keys navigate through all 5 tabs.

### Task 2: Change the Theme Colors
Modify the CSS custom properties in \`style.css\` under \`:root\` to create an Emerald or Violet theme:
\`\`\`css
:root {
  --tabs-primary: #059669;        /* Emerald 600 */
  --tabs-primary-hover: #047857;  /* Emerald 700 */
  --tabs-primary-subtle: #ecfdf5; /* Emerald 50 */
  --tabs-text-active: #059669;
  --tabs-border-radius: 16px;
}
\`\`\`

### Task 3: Add an Icon to Each Tab
Include inline SVG icons inside each tab button wrapped in \`<span class="tabs__tab-icon" aria-hidden="true">\` to enhance visual recognition without interfering with screen reader labels.

### Task 4: Make Tabs Vertical on Desktop
Add the modifier class \`tabs--vertical\` to the \`.tabs\` container:
\`\`\`html
<div class="tabs tabs--vertical" id="product-tabs">
\`\`\`
Ensure desktop layouts display the navigation as a sidebar on the left and the panels on the right (see Section 8 of \`style.css\`).

### Task 5: Add a Second Independent Tab Group
Duplicate the tabs markup with new unique IDs (e.g., \`id="docs-tabs"\`, tabs \`tab-quickstart\`, \`tab-auth\`, and panels \`panel-quickstart\`, \`panel-auth\`). Verify that switching tabs in the first group does not affect the second group.

---

## 6. Testing Checklist

Use this checklist to verify your component's quality before submission:

- [ ] **Mouse Interaction:** Clicking any tab immediately shows its associated panel and hides others.
- [ ] **Active Tab Style:** The active tab is unmistakably distinct from inactive tabs.
- [ ] **Default State:** The first tab (or URL hash tab) is active on initial load.
- [ ] **Keyboard: Arrow Keys:** Pressing \`Right Arrow\` focuses the next tab (wraps from last to first); \`Left Arrow\` focuses the previous tab.
- [ ] **Keyboard: Home / End:** Pressing \`Home\` jumps directly to the first tab; \`End\` jumps to the last tab.
- [ ] **Keyboard: Tab Focus:** Pressing \`Tab\` moves focus out of the tab bar into the active panel.
- [ ] **Mobile & Responsive:** On screens < 600px, the tab bar scrolls horizontally or stacks without broken overflows or clipped borders.
- [ ] **Accessibility (ARIA):** Exactly one tab has \`aria-selected="true"\` and \`tabindex="0"\`; inactive tabs have \`aria-selected="false"\` and \`tabindex="-1"\`.
- [ ] **Motion Sensitivity:** With \`prefers-reduced-motion\` enabled in system settings, tab transitions switch instantaneously.`
  }
];
