import React, { useState } from 'react';
import { Check, ChevronDown, ChevronRight, Terminal, Palette, Layout, Plus, Layers } from 'lucide-react';

interface LabTasksModuleProps {
  includeFifthTab: boolean;
  setIncludeFifthTab: (val: boolean) => void;
  isVertical: boolean;
  setIsVertical: (val: boolean) => void;
  showIcons: boolean;
  setShowIcons: (val: boolean) => void;
  showSecondGroup: boolean;
  setShowSecondGroup: (val: boolean) => void;
  selectedThemeId: string;
  setSelectedThemeId: (id: string) => void;
  onJumpToPlayground: () => void;
}

interface TaskItem {
  id: number;
  title: string;
  badge: string;
  icon: React.ElementType;
  objective: string;
  steps: string[];
  codeSnippet: string;
  language: string;
  isApplied: boolean;
  onToggle: () => void;
  toggleLabel: string;
}

export const LabTasksModule: React.FC<LabTasksModuleProps> = ({
  includeFifthTab,
  setIncludeFifthTab,
  isVertical,
  setIsVertical,
  showIcons,
  setShowIcons,
  showSecondGroup,
  setShowSecondGroup,
  selectedThemeId,
  setSelectedThemeId,
  onJumpToPlayground,
}) => {
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(1);

  const tasks: TaskItem[] = [
    {
      id: 1,
      title: 'Task 1: Add a 5th Tab ("Reviews" / "Testimonials")',
      badge: 'HTML & ARIA',
      icon: Plus,
      objective: 'Practice adding new tab buttons and corresponding panels while maintaining ARIA relationships (aria-controls, aria-labelledby, and tabindex).',
      steps: [
        'Open `index.html` and locate the `<div class="tabs__nav" role="tablist">` element.',
        'Add a new `<button>` with `role="tab"`, `id="tab-reviews"`, `aria-controls="panel-reviews"`, and `tabindex="-1"`.',
        'In the `<div class="tabs__panels">` section, add a `<section>` with `role="tabpanel"`, `id="panel-reviews"`, `aria-labelledby="tab-reviews"`, and the `hidden` attribute.',
        'Save and test that Arrow Left/Right navigates across all 5 tabs smoothly without breaking wrap-around cycling.',
      ],
      codeSnippet: `<!-- 1. Add tab button to role="tablist" -->
<button
  type="button"
  role="tab"
  class="tabs__tab"
  id="tab-reviews"
  aria-selected="false"
  aria-controls="panel-reviews"
  tabindex="-1"
>
  <span class="tabs__tab-text">Reviews</span>
</button>

<!-- 2. Add panel section to role="tabpanel" container -->
<section
  role="tabpanel"
  class="tabs__panel"
  id="panel-reviews"
  aria-labelledby="tab-reviews"
  tabindex="0"
  hidden
>
  <h2 class="panel-heading">What Customers Say</h2>
  <p class="panel-lead">Real feedback from engineering teams scaling worldwide.</p>
</section>`,
      language: 'html',
      isApplied: includeFifthTab,
      onToggle: () => setIncludeFifthTab(!includeFifthTab),
      toggleLabel: includeFifthTab ? 'Disable 5th Tab in Demo' : 'Enable 5th Tab in Demo',
    },
    {
      id: 2,
      title: 'Task 2: Customize Theme Colors with CSS Variables',
      badge: 'CSS Custom Properties',
      icon: Palette,
      objective: 'Learn how CSS Custom Properties enable zero-friction theme switching across tabs, hover states, active indicators, and focus rings.',
      steps: [
        'Open `style.css` and find the `:root` pseudo-class declaration.',
        'Modify `--tabs-primary`, `--tabs-primary-hover`, and `--tabs-focus-ring` with your chosen brand palette (e.g., Emerald green or Violet purple).',
        'Notice how the active tab text color, focus outline, and button indicators update synchronously across the entire page without touching component markup.',
      ],
      codeSnippet: `/* In style.css */
:root {
  /* Switch to Forest Emerald theme */
  --tabs-primary: #059669;        /* Emerald 600 */
  --tabs-primary-hover: #047857;  /* Emerald 700 */
  --tabs-primary-subtle: #ecfdf5; /* Emerald 50 */
  --tabs-focus-ring: rgba(5, 150, 105, 0.4);
  --tabs-text-active: #059669;
  --tabs-border-radius: 16px;
}`,
      language: 'css',
      isApplied: selectedThemeId === 'emerald',
      onToggle: () => setSelectedThemeId(selectedThemeId === 'emerald' ? 'blue' : 'emerald'),
      toggleLabel: selectedThemeId === 'emerald' ? 'Reset to Royal Blue' : 'Apply Emerald Theme in Demo',
    },
    {
      id: 3,
      title: 'Task 3: Add Meaningful SVG Icons to Tabs',
      badge: 'Visual Design & A11y',
      icon: Terminal,
      objective: 'Enhance visual scanning while ensuring screen readers do not stutter or read raw SVG markup by using aria-hidden="true".',
      steps: [
        'Wrap the SVG icon in a `<span class="tabs__tab-icon" aria-hidden="true">` inside the button.',
        'Ensure the text label is kept inside a companion `<span class="tabs__tab-text">` for clear separation.',
        'Add CSS rules in `style.css` to align the icon vertically (`display: inline-flex; align-items: center; gap: 8px`).',
      ],
      codeSnippet: `<button type="button" role="tab" class="tabs__tab is-active" id="tab-overview"
  aria-selected="true" aria-controls="panel-overview" tabindex="0">
  <!-- Hide icon from screen reader to avoid redundant vocalization -->
  <span class="tabs__tab-icon" aria-hidden="true">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    </svg>
  </span>
  <span class="tabs__tab-text">Overview</span>
</button>`,
      language: 'html',
      isApplied: showIcons,
      onToggle: () => setShowIcons(!showIcons),
      toggleLabel: showIcons ? 'Hide Tab Icons in Demo' : 'Show Tab Icons in Demo',
    },
    {
      id: 4,
      title: 'Task 4: Make Tabs Vertical on Desktop Viewports',
      badge: 'Responsive Layout',
      icon: Layout,
      objective: 'Transform horizontal tabs into a side-by-side vertical navigation rail for dashboard or settings layouts on larger viewports.',
      steps: [
        'Add the modifier class `.tabs--vertical` to your main container: `<div class="tabs tabs--vertical">`.',
        'In `style.css`, create a desktop media query `@media (min-width: 768px)` that sets `flex-direction: row` on the container and `flex-direction: column` on `.tabs__nav`.',
        'Set `aria-orientation="vertical"` on the `tablist` so assistive technology informs users that Up/Down arrows navigate the list.',
      ],
      codeSnippet: `/* In style.css */
@media (min-width: 768px) {
  .tabs--vertical {
    flex-direction: row;
  }
  .tabs--vertical .tabs__nav {
    flex-direction: column;
    align-items: stretch;
    border-bottom: none;
    border-right: 1px solid var(--tabs-border-color);
    min-width: 220px;
    padding: 12px;
  }
  .tabs--vertical .tabs__tab {
    width: 100%;
    justify-content: flex-start;
  }
}`,
      language: 'css',
      isApplied: isVertical,
      onToggle: () => setIsVertical(!isVertical),
      toggleLabel: isVertical ? 'Switch to Horizontal Tabs' : 'Switch to Vertical Tabs in Demo',
    },
    {
      id: 5,
      title: 'Task 5: Add a Second Independent Tab Group on the Page',
      badge: 'Reusability & Isolation',
      icon: Layers,
      objective: 'Verify that the JavaScript `class Tabs` properly isolates scoped DOM elements and event handlers so multiple instances operate with zero crosstalk.',
      steps: [
        'Duplicate the tabs container with a distinct container ID (e.g. `id="docs-tabs"`).',
        'Assign unique IDs to all new tabs and panels (e.g. `tab-doc-1`, `panel-doc-1`).',
        'Verify that clicking a tab in the second group does not change or close panels in the first group.',
        'In `script.js`, note how `document.querySelectorAll(".tabs").forEach(c => new Tabs(c))` seamlessly instantiates every tab group on the page.',
      ],
      codeSnippet: `<!-- Instantiate second group in DOM -->
<div class="tabs" id="developer-docs-tabs">
  <div class="tabs__nav" role="tablist" aria-label="Developer Documentation">
    <button type="button" role="tab" class="tabs__tab is-active" id="tab-doc-quickstart"
      aria-selected="true" aria-controls="panel-doc-quickstart" tabindex="0">
      Quickstart
    </button>
    <button type="button" role="tab" class="tabs__tab" id="tab-doc-auth"
      aria-selected="false" aria-controls="panel-doc-auth" tabindex="-1">
      Authentication
    </button>
  </div>
  <div class="tabs__panels">
    <section role="tabpanel" class="tabs__panel is-active" id="panel-doc-quickstart"
      aria-labelledby="tab-doc-quickstart" tabindex="0">
      <!-- Content here -->
    </section>
  </div>
</div>`,
      language: 'html',
      isApplied: showSecondGroup,
      onToggle: () => setShowSecondGroup(!showSecondGroup),
      toggleLabel: showSecondGroup ? 'Hide Second Tab Group' : 'Show Second Tab Group in Demo',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Student Lab Exercises</h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Hands-on assignments to deepen mastery of WAI-ARIA tabs, responsive styling, and reusable JS architecture.
          </p>
        </div>
        <button
          type="button"
          onClick={onJumpToPlayground}
          className="text-xs font-semibold px-3 py-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          View Live Playground ↑
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => {
          const isExpanded = expandedTaskId === task.id;
          const Icon = task.icon;

          return (
            <div
              key={task.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all"
            >
              <button
                type="button"
                onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 text-sm">{task.title}</span>
                      <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {task.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{task.objective}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {task.isApplied && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <Check className="w-3 h-3" /> Active in Demo
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Objective
                    </h4>
                    <p className="text-sm text-slate-700">{task.objective}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Step-by-Step Implementation
                    </h4>
                    <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-600">
                      {task.steps.map((step, sIdx) => (
                        <li key={sIdx} className="leading-relaxed">
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Code Solution & Diff
                    </h4>
                    <div className="bg-slate-900 text-slate-100 p-3.5 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
                      <pre>
                        <code>{task.codeSnippet}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                    <span className="text-xs text-slate-500">
                      Test this exercise in the live preview sandbox:
                    </span>
                    <button
                      type="button"
                      onClick={task.onToggle}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors shadow-sm ${
                        task.isApplied
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      {task.toggleLabel}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
