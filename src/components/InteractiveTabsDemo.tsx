import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  Sparkles, 
  CreditCard, 
  Mail, 
  MessageSquare,
  CheckCircle,
  Shield,
  Zap,
  Globe,
  Send,
  Layers
} from 'lucide-react';

export interface ThemeConfig {
  id: string;
  name: string;
  primary: string;
  primaryHover: string;
  primarySubtle: string;
  focusRing: string;
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'blue',
    name: 'Royal Blue (Default)',
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    primarySubtle: '#eff6ff',
    focusRing: 'rgba(37, 99, 235, 0.4)',
  },
  {
    id: 'emerald',
    name: 'Emerald Forest',
    primary: '#059669',
    primaryHover: '#047857',
    primarySubtle: '#ecfdf5',
    focusRing: 'rgba(5, 150, 105, 0.4)',
  },
  {
    id: 'violet',
    name: 'Violet Modern',
    primary: '#7c3aed',
    primaryHover: '#6d28d9',
    primarySubtle: '#f5f3ff',
    focusRing: 'rgba(124, 58, 237, 0.4)',
  },
  {
    id: 'amber',
    name: 'Amber Sunrise',
    primary: '#d97706',
    primaryHover: '#b45309',
    primarySubtle: '#fffbeb',
    focusRing: 'rgba(217, 119, 6, 0.4)',
  },
  {
    id: 'slate',
    name: 'Slate Monochrome',
    primary: '#0f172a',
    primaryHover: '#1e293b',
    primarySubtle: '#f1f5f9',
    focusRing: 'rgba(15, 23, 42, 0.3)',
  },
];

interface InteractiveTabsDemoProps {
  currentTheme: ThemeConfig;
  isVertical: boolean;
  showIcons: boolean;
  includeFifthTab: boolean;
  onStateChange?: (state: {
    activeTabId: string;
    activePanelId: string;
    totalTabs: number;
    activeIndex: number;
    lastKey: string | null;
    activeTabLabel: string;
  }) => void;
}

export const InteractiveTabsDemo: React.FC<InteractiveTabsDemoProps> = ({
  currentTheme,
  isVertical,
  showIcons,
  includeFifthTab,
  onStateChange,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'pricing' | 'contact' | 'reviews'>('overview');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [lastKey, setLastKey] = useState<string | null>(null);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Base tabs configuration
  const tabs = [
    {
      id: 'overview',
      tabId: 'tab-overview',
      panelId: 'panel-overview',
      label: 'Overview',
      icon: Home,
    },
    {
      id: 'features',
      tabId: 'tab-features',
      panelId: 'panel-features',
      label: 'Features',
      icon: Sparkles,
    },
    {
      id: 'pricing',
      tabId: 'tab-pricing',
      panelId: 'panel-pricing',
      label: 'Pricing',
      icon: CreditCard,
    },
    {
      id: 'contact',
      tabId: 'tab-contact',
      panelId: 'panel-contact',
      label: 'Contact',
      icon: Mail,
    },
    ...(includeFifthTab
      ? [
          {
            id: 'reviews',
            tabId: 'tab-reviews',
            panelId: 'panel-reviews',
            label: 'Reviews',
            icon: MessageSquare,
          },
        ]
      : []),
  ] as const;

  const activeIndex = tabs.findIndex((t) => t.id === activeTab);
  const safeActiveIndex = activeIndex >= 0 ? activeIndex : 0;

  useEffect(() => {
    // If active tab was reviews and reviews is disabled, fallback to overview
    if (!includeFifthTab && activeTab === 'reviews') {
      setActiveTab('overview');
    }
  }, [includeFifthTab, activeTab]);

  useEffect(() => {
    const current = tabs[safeActiveIndex];
    if (current && onStateChange) {
      onStateChange({
        activeTabId: current.tabId,
        activePanelId: current.panelId,
        totalTabs: tabs.length,
        activeIndex: safeActiveIndex,
        lastKey,
        activeTabLabel: current.label,
      });
    }
  }, [activeTab, safeActiveIndex, tabs.length, lastKey, onStateChange]);

  const selectTab = (id: typeof activeTab, focus = true) => {
    setActiveTab(id);
    const newIdx = tabs.findIndex((t) => t.id === id);
    if (focus && newIdx !== -1 && tabRefs.current[newIdx]) {
      tabRefs.current[newIdx]?.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    const total = tabs.length;
    let nextIndex: number | null = null;
    let keyDescription = event.key;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        nextIndex = (index - 1 + total) % total;
        keyDescription = `${event.key} (Previous)`;
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        nextIndex = (index + 1) % total;
        keyDescription = `${event.key} (Next)`;
        break;

      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        keyDescription = 'Home (First Tab)';
        break;

      case 'End':
        event.preventDefault();
        nextIndex = total - 1;
        keyDescription = 'End (Last Tab)';
        break;

      case 'Tab':
        // Tab key allows keyboard focus to naturally leave the tablist into the tabpanel
        setLastKey('Tab (Into Panel)');
        return;

      default:
        return;
    }

    if (nextIndex !== null) {
      setLastKey(keyDescription);
      const target = tabs[nextIndex];
      selectTab(target.id as typeof activeTab, true);
    }
  };

  return (
    <div
      className="w-full transition-all duration-300"
      style={
        {
          '--tabs-primary': currentTheme.primary,
          '--tabs-primary-hover': currentTheme.primaryHover,
          '--tabs-primary-subtle': currentTheme.primarySubtle,
          '--tabs-focus-ring': currentTheme.focusRing,
        } as React.CSSProperties
      }
    >
      {/* Component Outer Card */}
      <div
        className={`bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex ${
          isVertical ? 'flex-col md:flex-row' : 'flex-col'
        }`}
        id="product-tabs"
      >
        {/* Tab Navigation (role="tablist") */}
        <div
          role="tablist"
          aria-label="Product Information"
          aria-orientation={isVertical ? 'vertical' : 'horizontal'}
          className={`flex bg-slate-100/90 p-2 border-slate-200 overflow-x-auto scrollbar-none select-none ${
            isVertical
              ? 'md:flex-col md:w-60 md:border-r md:border-b-0 border-b gap-1.5'
              : 'border-b gap-1.5 items-center'
          }`}
        >
          {tabs.map((tab, idx) => {
            const isSelected = tab.id === activeTab;
            const IconComponent = tab.icon;

            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                type="button"
                role="tab"
                id={tab.tabId}
                aria-selected={isSelected}
                aria-controls={tab.panelId}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => {
                  setLastKey(`Mouse Click: ${tab.label}`);
                  selectTab(tab.id as typeof activeTab, false);
                }}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                style={{
                  color: isSelected ? currentTheme.primary : undefined,
                }}
                className={`flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-150 relative min-h-[44px] cursor-pointer focus:outline-none ${
                  isVertical ? 'w-full justify-start' : 'justify-center'
                } ${
                  isSelected
                    ? 'bg-white shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {showIcons && (
                  <span
                    className={`shrink-0 transition-transform ${
                      isSelected ? 'scale-105' : 'opacity-80'
                    }`}
                    aria-hidden="true"
                  >
                    <IconComponent className="w-4 h-4" />
                  </span>
                )}
                <span>{tab.label}</span>

                {/* Subtle active indicator underline for horizontal or edge bar for vertical */}
                {isSelected && (
                  <span
                    style={{ backgroundColor: currentTheme.primary }}
                    className={`absolute rounded-full transition-all ${
                      isVertical
                        ? 'left-0 top-2 bottom-2 w-1'
                        : 'bottom-0 left-3 right-3 h-0.5'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Panels Container */}
        <div className="flex-1 p-6 md:p-8 bg-white min-h-[360px]">
          {/* Panel 1: Overview */}
          <section
            role="tabpanel"
            id="panel-overview"
            aria-labelledby="tab-overview"
            tabIndex={0}
            hidden={activeTab !== 'overview'}
            className={`transition-opacity duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg ${
              activeTab === 'overview' ? 'block opacity-100' : 'hidden opacity-0'
            }`}
          >
            <div className="max-w-3xl">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                Modern Cloud Architecture Platform
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Accelerate your engineering workflow with unified deployments, automated edge orchestration, and real-time observability across all continents.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/60">
                  <div className="flex items-center gap-2 mb-2 text-slate-900 font-semibold text-sm">
                    <Zap className="w-4 h-4" style={{ color: currentTheme.primary }} />
                    <span>Instant Prototyping</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Spin up isolated staging environments in under 30 seconds with pre-built stacks.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/60">
                  <div className="flex items-center gap-2 mb-2 text-slate-900 font-semibold text-sm">
                    <Shield className="w-4 h-4" style={{ color: currentTheme.primary }} />
                    <span>Built-in Security</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    End-to-end encryption, automated TLS rotation, and zero-trust RBAC access control.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/60">
                  <div className="flex items-center gap-2 mb-2 text-slate-900 font-semibold text-sm">
                    <Globe className="w-4 h-4" style={{ color: currentTheme.primary }} />
                    <span>Global Anycast CDN</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ultra-low latency delivery powered by an edge mesh spanning 280+ cities worldwide.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Panel 2: Features */}
          <section
            role="tabpanel"
            id="panel-features"
            aria-labelledby="tab-features"
            tabIndex={0}
            hidden={activeTab !== 'features'}
            className={`transition-opacity duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg ${
              activeTab === 'features' ? 'block opacity-100' : 'hidden opacity-0'
            }`}
          >
            <div className="max-w-3xl">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                Engineered for High-Velocity Teams
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Every feature is designed to reduce cognitive load and eliminate deployment friction during release cycles.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: 'Instant Branch Previews',
                    desc: 'Every GitHub pull request automatically spawns a live preview sandbox with isolated database branches.',
                  },
                  {
                    title: 'Live Telemetry & Tracing',
                    desc: 'Distributed tracing, structured query indexing, and instant error anomaly alerts with zero configuration.',
                  },
                  {
                    title: 'Zero-Downtime Blue/Green Rollouts',
                    desc: 'Progressive canary traffic shifting with instantaneous rollback safeguards if latency exceeds target thresholds.',
                  },
                  {
                    title: 'Custom Domain & Multi-Region Anycast',
                    desc: 'Automated TLS cert provisioning and global routing logic directly mapped to nearest nodes.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-lg border border-slate-100 bg-white hover:bg-slate-50/80 transition-colors"
                  >
                    <CheckCircle
                      className="w-5 h-5 mt-0.5 shrink-0"
                      style={{ color: currentTheme.primary }}
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Panel 3: Pricing */}
          <section
            role="tabpanel"
            id="panel-pricing"
            aria-labelledby="tab-pricing"
            tabIndex={0}
            hidden={activeTab !== 'pricing'}
            className={`transition-opacity duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg ${
              activeTab === 'pricing' ? 'block opacity-100' : 'hidden opacity-0'
            }`}
          >
            <div className="max-w-3xl">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                Simple, Transparent Pricing
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Choose the plan that matches your production load. Upgrade, downgrade, or cancel at any moment.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Starter */}
                <div className="p-5 rounded-xl border border-slate-200 bg-white flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Starter
                    </span>
                    <div className="mt-2 text-2xl font-bold text-slate-900">
                      $0 <span className="text-xs font-normal text-slate-500">/mo</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">
                      Perfect for hobby prototypes and student projects.
                    </p>
                    <ul className="text-xs text-slate-600 mt-4 space-y-2">
                      <li className="flex items-center gap-1.5">✓ 3 active projects</li>
                      <li className="flex items-center gap-1.5">✓ Edge CDN routing</li>
                      <li className="flex items-center gap-1.5">✓ Community forum support</li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    className="mt-6 w-full py-2 text-xs font-medium border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Deploy Free
                  </button>
                </div>

                {/* Pro */}
                <div
                  className="p-5 rounded-xl border-2 bg-white flex flex-col justify-between relative shadow-sm"
                  style={{ borderColor: currentTheme.primary }}
                >
                  <span
                    className="absolute -top-3 left-4 px-2.5 py-0.5 text-[10px] font-bold text-white rounded-full tracking-wide uppercase"
                    style={{ backgroundColor: currentTheme.primary }}
                  >
                    Most Popular
                  </span>
                  <div>
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: currentTheme.primary }}
                    >
                      Professional
                    </span>
                    <div className="mt-2 text-2xl font-bold text-slate-900">
                      $29 <span className="text-xs font-normal text-slate-500">/mo</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">
                      For engineering teams shipping commercial products.
                    </p>
                    <ul className="text-xs text-slate-600 mt-4 space-y-2">
                      <li className="flex items-center gap-1.5">✓ Unlimited projects</li>
                      <li className="flex items-center gap-1.5">✓ Automatic branch previews</li>
                      <li className="flex items-center gap-1.5">✓ 24/7 Priority tech support</li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    className="mt-6 w-full py-2 text-xs font-medium text-white rounded-lg shadow-sm transition-opacity hover:opacity-95"
                    style={{ backgroundColor: currentTheme.primary }}
                  >
                    Start 14-Day Trial
                  </button>
                </div>

                {/* Enterprise */}
                <div className="p-5 rounded-xl border border-slate-200 bg-white flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Enterprise
                    </span>
                    <div className="mt-2 text-2xl font-bold text-slate-900">
                      $99 <span className="text-xs font-normal text-slate-500">/mo</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">
                      For dedicated infrastructure, SSO, and compliance SLAs.
                    </p>
                    <ul className="text-xs text-slate-600 mt-4 space-y-2">
                      <li className="flex items-center gap-1.5">✓ 99.99% uptime SLA</li>
                      <li className="flex items-center gap-1.5">✓ Custom VPC peering</li>
                      <li className="flex items-center gap-1.5">✓ Dedicated account engineer</li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    className="mt-6 w-full py-2 text-xs font-medium border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Contact Enterprise
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Panel 4: Contact */}
          <section
            role="tabpanel"
            id="panel-contact"
            aria-labelledby="tab-contact"
            tabIndex={0}
            hidden={activeTab !== 'contact'}
            className={`transition-opacity duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg ${
              activeTab === 'contact' ? 'block opacity-100' : 'hidden opacity-0'
            }`}
          >
            <div className="max-w-xl">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                Get in Touch with Engineering
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Have questions about workload migration or custom enterprise setups? Our team responds in under 2 hours.
              </p>

              {formSubmitted ? (
                <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span>Inquiry submitted successfully!</span>
                  </div>
                  <p className="text-xs text-emerald-800 mt-1">
                    An engineer will review your requirements and reach out via email shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 px-3 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name-input" className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name
                      </label>
                      <input
                        id="contact-name-input"
                        type="text"
                        required
                        defaultValue="Jordan Vance"
                        placeholder="Alex Morgan"
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email-input" className="block text-xs font-semibold text-slate-700 mb-1">
                        Work Email
                      </label>
                      <input
                        id="contact-email-input"
                        type="email"
                        required
                        defaultValue="jordan@acme.dev"
                        placeholder="alex@company.com"
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-msg-input" className="block text-xs font-semibold text-slate-700 mb-1">
                      Project Requirements
                    </label>
                    <textarea
                      id="contact-msg-input"
                      rows={3}
                      required
                      defaultValue="Looking to migrate 4 microservices to your global edge network."
                      placeholder="Share your timeline and stack..."
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white rounded-lg transition-opacity hover:opacity-90 shadow-sm"
                    style={{ backgroundColor: currentTheme.primary }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* Panel 5: Reviews (Lab Task 1 feature) */}
          {includeFifthTab && (
            <section
              role="tabpanel"
              id="panel-reviews"
              aria-labelledby="tab-reviews"
              tabIndex={0}
              hidden={activeTab !== 'reviews'}
              className={`transition-opacity duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg ${
                activeTab === 'reviews' ? 'block opacity-100' : 'hidden opacity-0'
              }`}
            >
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                    What Customers Say
                  </h2>
                  <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded">
                    Lab Task 1 Demo
                  </span>
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Real feedback from engineering leads running production workloads on our edge stack.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                    <p className="text-xs italic text-slate-700 leading-relaxed mb-3">
                      "Moving to edge deployments cut our TTFB by 68% in APAC and Europe. The preview builds make PR reviews painless."
                    </p>
                    <div className="text-xs font-semibold text-slate-900">Elena Rostova</div>
                    <div className="text-[11px] text-slate-500">VP of Engineering at FinScale</div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                    <p className="text-xs italic text-slate-700 leading-relaxed mb-3">
                      "Our onboarding time dropped from 3 days to under 20 minutes with zero dev env drift. Highly recommended."
                    </p>
                    <div className="text-xs font-semibold text-slate-900">Marcus Sterling</div>
                    <div className="text-[11px] text-slate-500">Head of Platform at StreamFlow</div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

// Second Independent Tab Group Component (Lab Task 5 demonstration)
export const SecondaryTabsGroup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quickstart' | 'auth' | 'webhooks'>('quickstart');

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6 mt-6">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-base">Independent Tab Group #2</h3>
            <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-medium">
              Lab Task 5
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Demonstrates that multiple `new Tabs()` instances operate independently without ID collisions.
          </p>
        </div>
      </div>

      <div className="tabs" id="api-tabs">
        <div
          role="tablist"
          aria-label="API Documentation"
          className="flex bg-slate-100 p-1.5 rounded-lg gap-1 border border-slate-200 mb-4 max-w-md"
        >
          {[
            { id: 'quickstart', label: '1. Quickstart' },
            { id: 'auth', label: '2. Authentication' },
            { id: 'webhooks', label: '3. Webhooks' },
          ].map((item) => {
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`tab-api-${item.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-api-${item.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveTab(item.id as typeof activeTab)}
                className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-all ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div>
          {activeTab === 'quickstart' && (
            <div
              role="tabpanel"
              id="panel-api-quickstart"
              aria-labelledby="tab-api-quickstart"
              tabIndex={0}
              className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto"
            >
              <div className="text-slate-400 mb-1"># Install the client SDK</div>
              <div className="text-emerald-400">npm install @acme/sdk</div>
              <div className="text-slate-400 mt-3 mb-1"># Initialize client</div>
              <div className="text-cyan-300">import &#123; createClient &#125; from '@acme/sdk';</div>
              <div className="text-cyan-300">const client = createClient(&#123; key: process.env.API_KEY &#125;);</div>
            </div>
          )}

          {activeTab === 'auth' && (
            <div
              role="tabpanel"
              id="panel-api-auth"
              aria-labelledby="tab-api-auth"
              tabIndex={0}
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
            >
              <h4 className="font-semibold text-slate-900 mb-1">API Key Authentication</h4>
              <p className="mb-2">Include your bearer token in the HTTP Authorization header:</p>
              <pre className="bg-slate-900 text-emerald-400 p-2.5 rounded font-mono text-[11px]">
                Authorization: Bearer sk_live_9481940182470192
              </pre>
            </div>
          )}

          {activeTab === 'webhooks' && (
            <div
              role="tabpanel"
              id="panel-api-webhooks"
              aria-labelledby="tab-api-webhooks"
              tabIndex={0}
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
            >
              <h4 className="font-semibold text-slate-900 mb-1">Webhook Ingestion</h4>
              <p>Events are dispatched in JSON format with HMAC-SHA256 signatures in `X-Signature-256`.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
