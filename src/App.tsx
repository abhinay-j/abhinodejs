/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  InteractiveTabsDemo, 
  SecondaryTabsGroup, 
  THEMES, 
  ThemeConfig 
} from './components/InteractiveTabsDemo';
import { AriaTelemetryBar } from './components/AriaTelemetryBar';
import { CodeViewer } from './components/CodeViewer';
import { LabTasksModule } from './components/LabTasksModule';
import { TestingChecklistModule } from './components/TestingChecklistModule';
import { VanillaIframeView } from './components/VanillaIframeView';
import { 
  Download, 
  Columns, 
  SlidersHorizontal,
  FileCode,
  ListChecks,
  Compass,
  Monitor
} from 'lucide-react';
import { SOURCE_FILES } from './data/sourceCode';

export default function App() {
  // Navigation View State
  const [activeSection, setActiveSection] = useState<'demo' | 'sandbox' | 'tasks' | 'code' | 'testing'>('demo');

  // Interactive Playground Options
  const [selectedThemeId, setSelectedThemeId] = useState<string>('blue');
  const [isVertical, setIsVertical] = useState<boolean>(false);
  const [showIcons, setShowIcons] = useState<boolean>(true);
  const [includeFifthTab, setIncludeFifthTab] = useState<boolean>(false);
  const [showSecondGroup, setShowSecondGroup] = useState<boolean>(false);

  // Live ARIA Telemetry State
  const [telemetry, setTelemetry] = useState({
    activeTabId: 'tab-overview',
    activePanelId: 'panel-overview',
    totalTabs: 4,
    activeIndex: 0,
    lastKey: null as string | null,
    activeTabLabel: 'Overview',
  });

  const currentTheme: ThemeConfig = THEMES.find((t) => t.id === selectedThemeId) || THEMES[0];

  const handleDownloadAll = () => {
    SOURCE_FILES.forEach((file, index) => {
      setTimeout(() => {
        const blob = new Blob([file.code], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, index * 200);
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* --------------------------------------------------------------------
          Top Bar Contract: 3 zones separated by gap-8
          Zone 1: Brand title
          Zone 2: 4-5 nav links (single-line whitespace-nowrap)
          Zone 3: 1 primary action
          -------------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setActiveSection('demo')}
              className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap hover:text-blue-600 transition-colors flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                T
              </div>
              <span>Tabs Component Lab</span>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={() => setActiveSection('demo')}
              className={`whitespace-nowrap transition-colors py-1 ${
                activeSection === 'demo'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              Interactive Demo
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('sandbox')}
              className={`whitespace-nowrap transition-colors py-1 ${
                activeSection === 'sandbox'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              Vanilla Sandbox
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('tasks')}
              className={`whitespace-nowrap transition-colors py-1 ${
                activeSection === 'tasks'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              Lab Tasks
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('code')}
              className={`whitespace-nowrap transition-colors py-1 ${
                activeSection === 'code'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              Code Explorer
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('testing')}
              className={`whitespace-nowrap transition-colors py-1 ${
                activeSection === 'testing'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              Testing Checklist
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleDownloadAll}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Files</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center gap-2 px-4 py-2 overflow-x-auto border-t border-slate-100 bg-slate-50/60 scrollbar-none text-xs">
          {[
            { id: 'demo', label: 'Demo', icon: Compass },
            { id: 'sandbox', label: 'Vanilla Sandbox', icon: Monitor },
            { id: 'tasks', label: 'Lab Tasks', icon: SlidersHorizontal },
            { id: 'code', label: 'Source Code', icon: FileCode },
            { id: 'testing', label: 'Checklist', icon: ListChecks },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSection(item.id as typeof activeSection)}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium flex items-center gap-1.5 ${
                activeSection === item.id
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <item.icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Editorial Subheader & Metadata Strip */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span>Front-End Lab Curriculum</span>
            <span aria-hidden="true">·</span>
            <span>W3C WAI-ARIA Authoring Practices</span>
            <span aria-hidden="true">·</span>
            <span>Vanilla JavaScript &amp; CSS Variables</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Tabs Component: Switch Between Different Content Views
          </h1>
          <p className="mt-2 text-slate-600 text-base leading-relaxed">
            A production-ready reference implementation demonstrating semantic ARIA attributes, keyboard roving tabindex, responsive layout transitions, and multi-instance independence.
          </p>
        </div>

        {/* Section 1: Live Interactive Demo & Telemetry */}
        {activeSection === 'demo' && (
          <div className="space-y-6">
            {/* Live Interactive Controls Bar */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
              {/* Theme Picker */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-700">Theme Palette:</span>
                <div className="flex items-center gap-1.5">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setSelectedThemeId(theme.id)}
                      title={theme.name}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        selectedThemeId === theme.id
                          ? 'scale-110 border-slate-900 shadow-sm'
                          : 'border-white hover:scale-105'
                      }`}
                      style={{ backgroundColor: theme.primary }}
                    />
                  ))}
                </div>
              </div>

              {/* Layout & Feature Toggles */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {/* Vertical / Horizontal Toggle */}
                <button
                  type="button"
                  onClick={() => setIsVertical(!isVertical)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                    isVertical
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span>{isVertical ? 'Vertical Layout (Active)' : 'Make Vertical'}</span>
                </button>

                {/* Show/Hide Icons Toggle */}
                <button
                  type="button"
                  onClick={() => setShowIcons(!showIcons)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                    showIcons
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{showIcons ? 'Icons Enabled' : 'Text Only'}</span>
                </button>

                {/* 5th Tab Toggle (Lab Task 1) */}
                <button
                  type="button"
                  onClick={() => setIncludeFifthTab(!includeFifthTab)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                    includeFifthTab
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{includeFifthTab ? '5th Tab Active' : '+ Add 5th Tab'}</span>
                </button>

                {/* 2nd Tab Group Toggle (Lab Task 5) */}
                <button
                  type="button"
                  onClick={() => setShowSecondGroup(!showSecondGroup)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                    showSecondGroup
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{showSecondGroup ? '2nd Group Active' : '+ 2nd Tab Group'}</span>
                </button>
              </div>
            </div>

            {/* Live ARIA Telemetry Inspector */}
            <AriaTelemetryBar
              activeTabId={telemetry.activeTabId}
              activePanelId={telemetry.activePanelId}
              totalTabs={telemetry.totalTabs}
              activeIndex={telemetry.activeIndex}
              lastKey={telemetry.lastKey}
              activeTabLabel={telemetry.activeTabLabel}
            />

            {/* The Main Tabs Component */}
            <InteractiveTabsDemo
              currentTheme={currentTheme}
              isVertical={isVertical}
              showIcons={showIcons}
              includeFifthTab={includeFifthTab}
              onStateChange={(state) => setTelemetry(state)}
            />

            {/* Optional Second Tab Group (Lab Task 5) */}
            {showSecondGroup && <SecondaryTabsGroup />}

            {/* Keyboard Guide Callout */}
            <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-700">
              <div className="flex items-center gap-2 font-medium">
                <span className="font-semibold text-slate-900">Keyboard Shortcuts:</span>
                <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono">← / ↑</span>
                <span>Previous Tab</span>
                <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono">→ / ↓</span>
                <span>Next Tab</span>
                <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono">Home</span>
                <span>First</span>
                <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono">End</span>
                <span>Last</span>
                <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono">Tab</span>
                <span>Focus Panel</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveSection('testing')}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Run Testing Checklist →
              </button>
            </div>
          </div>
        )}

        {/* Section 2: Pure Isolated Vanilla Sandbox */}
        {activeSection === 'sandbox' && (
          <div className="space-y-4">
            <VanillaIframeView />
          </div>
        )}

        {/* Section 3: Lab Tasks & Student Exercises */}
        {activeSection === 'tasks' && (
          <LabTasksModule
            includeFifthTab={includeFifthTab}
            setIncludeFifthTab={setIncludeFifthTab}
            isVertical={isVertical}
            setIsVertical={setIsVertical}
            showIcons={showIcons}
            setShowIcons={setShowIcons}
            showSecondGroup={showSecondGroup}
            setShowSecondGroup={setShowSecondGroup}
            selectedThemeId={selectedThemeId}
            setSelectedThemeId={setSelectedThemeId}
            onJumpToPlayground={() => setActiveSection('demo')}
          />
        )}

        {/* Section 4: Source Code Viewer */}
        {activeSection === 'code' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Clean Single-Folder Architecture</h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Inspect or copy `index.html`, `style.css`, `script.js`, and `README.md`. No build step or framework required.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveSection('sandbox')}
                className="text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              >
                Open Vanilla Sandbox
              </button>
            </div>
            <CodeViewer />
          </div>
        )}

        {/* Section 5: Testing Checklist */}
        {activeSection === 'testing' && (
          <div className="space-y-4">
            <TestingChecklistModule />
          </div>
        )}
      </main>

      {/* Footer (Anti-slop: clean copyright and links only) */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span>Accessible Tabs Component Lab</span>
            <span className="mx-2">·</span>
            <span>W3C WAI-ARIA 1.2 Compliant</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveSection('code')}
              className="hover:text-slate-800 transition-colors"
            >
              View Source Code
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('tasks')}
              className="hover:text-slate-800 transition-colors"
            >
              Lab Exercises
            </button>
            <button
              type="button"
              onClick={handleDownloadAll}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Download Files
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
