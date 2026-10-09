import React, { useState } from 'react';
import { CheckSquare, Square, CheckCircle2, RotateCcw, MousePointer, Keyboard, Smartphone, Eye } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: 'mouse' | 'keyboard' | 'mobile' | 'aria';
  title: string;
  howToTest: string;
  passedDefault: boolean;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'm1',
    category: 'mouse',
    title: 'Clicking any tab immediately swaps panels',
    howToTest: 'Click through Overview, Features, Pricing, and Contact. Only the clicked panel must be visible.',
    passedDefault: true,
  },
  {
    id: 'm2',
    category: 'mouse',
    title: 'Distinct visual style on active tab',
    howToTest: 'Confirm the active tab has distinct white card background, bold font weight, brand color, and an indicator line.',
    passedDefault: true,
  },
  {
    id: 'm3',
    category: 'mouse',
    title: 'Hover affordance on inactive tabs',
    howToTest: 'Hover your pointer over inactive tabs. Confirm subtle background darkening occurs within 200ms.',
    passedDefault: true,
  },
  {
    id: 'k1',
    category: 'keyboard',
    title: 'Arrow keys (Right / Down) move to next tab and wrap around',
    howToTest: 'Focus a tab, press ArrowRight until the last tab is selected. Press ArrowRight again to verify wrap-around to the first tab.',
    passedDefault: true,
  },
  {
    id: 'k2',
    category: 'keyboard',
    title: 'Arrow keys (Left / Up) move to previous tab and wrap around',
    howToTest: 'Focus the first tab and press ArrowLeft. Focus should wrap around directly to the last tab.',
    passedDefault: true,
  },
  {
    id: 'k3',
    category: 'keyboard',
    title: 'Home key jumps to first tab & End key jumps to last tab',
    howToTest: 'Press Home from any tab to jump to Overview. Press End to jump directly to Contact.',
    passedDefault: true,
  },
  {
    id: 'k4',
    category: 'keyboard',
    title: 'Tab key moves focus into the active tabpanel',
    howToTest: 'Press Tab while focused on an active tab button. Focus should move into the panel or the first interactive element inside.',
    passedDefault: true,
  },
  {
    id: 'k5',
    category: 'keyboard',
    title: 'Visible focus ring on keyboard focus (:focus-visible)',
    howToTest: 'Using keyboard navigation, confirm a high-contrast focus outline is clearly rendered around the focused tab.',
    passedDefault: true,
  },
  {
    id: 'r1',
    category: 'mobile',
    title: 'Horizontal tab scroll on mobile (<600px)',
    howToTest: 'Resize browser or switch to mobile view. Verify tabs remain on one row and scroll horizontally without page breaking.',
    passedDefault: true,
  },
  {
    id: 'r2',
    category: 'mobile',
    title: 'Accessible touch targets (≥ 44px)',
    howToTest: 'Verify that each tab button has minimum height and padding ensuring easy fingertip activation on touch devices.',
    passedDefault: true,
  },
  {
    id: 'a1',
    category: 'aria',
    title: 'Roving tabindex (0 on active tab, -1 on inactive tabs)',
    howToTest: 'Inspect DOM: Only active tab has tabindex="0". Sibling tabs must have tabindex="-1" so Shift+Tab leaves the group.',
    passedDefault: true,
  },
  {
    id: 'a2',
    category: 'aria',
    title: 'aria-selected and aria-controls match panel IDs',
    howToTest: 'Check that active tab has aria-selected="true" and its aria-controls points to the exact active panel ID.',
    passedDefault: true,
  },
  {
    id: 'a3',
    category: 'aria',
    title: 'prefers-reduced-motion compliance',
    howToTest: 'Ensure transitions respect user OS accessibility settings by removing translateY and opacity animation delays.',
    passedDefault: true,
  },
];

export const TestingChecklistModule: React.FC = () => {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    CHECKLIST_ITEMS.forEach((item) => {
      initial[item.id] = item.passedDefault;
    });
    return initial;
  });

  const toggleCheck = (id: string) => {
    setCheckedState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const markAll = (value: boolean) => {
    const updated: Record<string, boolean> = {};
    CHECKLIST_ITEMS.forEach((item) => {
      updated[item.id] = value;
    });
    setCheckedState(updated);
  };

  const totalCount = CHECKLIST_ITEMS.length;
  const passedCount = Object.values(checkedState).filter(Boolean).length;
  const percentage = Math.round((passedCount / totalCount) * 100);

  const getCategoryIcon = (category: ChecklistItem['category']) => {
    switch (category) {
      case 'mouse':
        return <MousePointer className="w-4 h-4 text-blue-500" />;
      case 'keyboard':
        return <Keyboard className="w-4 h-4 text-purple-500" />;
      case 'mobile':
        return <Smartphone className="w-4 h-4 text-amber-500" />;
      case 'aria':
        return <Eye className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
      {/* Header & Score */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-lg">Interactive Testing Checklist</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Comprehensive audit for mouse, keyboard, mobile responsiveness, and WAI-ARIA accessibility.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-700">
              {passedCount} of {totalCount} Tests Verified
            </div>
            <div className="text-[11px] text-slate-500 font-mono">{percentage}% Pass Rate</div>
          </div>

          <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex items-center gap-1.5 ml-2">
            <button
              type="button"
              onClick={() => markAll(true)}
              className="text-xs px-2.5 py-1 text-slate-700 hover:bg-slate-100 rounded font-medium transition-colors"
            >
              Verify All
            </button>
            <button
              type="button"
              onClick={() => markAll(false)}
              className="text-xs px-2.5 py-1 text-slate-500 hover:text-slate-800 rounded flex items-center gap-1 transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="space-y-2.5">
        {CHECKLIST_ITEMS.map((item) => {
          const isChecked = checkedState[item.id] || false;

          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 select-none ${
                isChecked
                  ? 'border-emerald-200 bg-emerald-50/40 text-slate-900'
                  : 'border-slate-200 bg-white hover:bg-slate-50/80 text-slate-700'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 shrink-0 text-slate-400 hover:text-slate-600"
                aria-label={isChecked ? 'Mark unverified' : 'Mark verified'}
              >
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-300" />
                )}
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(item.category)}
                  <span className={`text-sm font-semibold ${isChecked ? 'text-slate-900' : 'text-slate-800'}`}>
                    {item.title}
                  </span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  <strong className="text-slate-600">Verification Step:</strong> {item.howToTest}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
