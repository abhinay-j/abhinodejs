import React from 'react';
import { ShieldCheck, Keyboard, Volume2 } from 'lucide-react';

interface AriaTelemetryBarProps {
  activeTabId: string;
  activePanelId: string;
  totalTabs: number;
  activeIndex: number;
  lastKey: string | null;
  activeTabLabel: string;
}

export const AriaTelemetryBar: React.FC<AriaTelemetryBarProps> = ({
  activeTabId,
  activePanelId,
  totalTabs,
  activeIndex,
  lastKey,
  activeTabLabel,
}) => {
  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-4 shadow-lg border border-slate-800 text-xs sm:text-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2 font-medium text-slate-200">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Live WAI-ARIA & Keyboard State Inspector</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>DOM Synchronized</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Active Tab & Role */}
        <div className="bg-slate-800/80 rounded-lg p-2.5 border border-slate-700/60">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">Active Element</span>
          <div className="font-mono text-emerald-300 mt-1 truncate">
            #{activeTabId} <span className="text-slate-400">[role="tab"]</span>
          </div>
        </div>

        {/* aria-selected & tabindex */}
        <div className="bg-slate-800/80 rounded-lg p-2.5 border border-slate-700/60">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">Roving Tabindex</span>
          <div className="font-mono text-cyan-300 mt-1">
            tabindex="0" <span className="text-slate-400 text-xs">· others -1</span>
          </div>
        </div>

        {/* aria-controls */}
        <div className="bg-slate-800/80 rounded-lg p-2.5 border border-slate-700/60">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">aria-controls</span>
          <div className="font-mono text-amber-300 mt-1 truncate">
            → #{activePanelId}
          </div>
        </div>

        {/* Last Key Detected */}
        <div className="bg-slate-800/80 rounded-lg p-2.5 border border-slate-700/60">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold flex items-center gap-1">
            <Keyboard className="w-3.5 h-3.5 text-indigo-400" />
            Last Keyboard Action
          </span>
          <div className="font-mono text-indigo-300 mt-1 truncate">
            {lastKey ? (
              <span className="bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-700">
                {lastKey}
              </span>
            ) : (
              <span className="text-slate-500 italic">None (click or use arrow keys)</span>
            )}
          </div>
        </div>
      </div>

      {/* Screen Reader Simulation Strip */}
      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-300">
        <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="text-slate-400">Screen Reader Announcement:</span>
        <span className="font-mono text-emerald-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
          "{activeTabLabel}, tab {activeIndex + 1} of {totalTabs}, selected"
        </span>
      </div>
    </div>
  );
};
