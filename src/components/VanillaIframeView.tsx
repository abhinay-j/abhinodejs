import React from 'react';
import { ExternalLink, RotateCcw } from 'lucide-react';

export const VanillaIframeView: React.FC = () => {
  const [key, setKey] = React.useState(0);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="bg-slate-900 text-slate-200 px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="font-mono text-xs font-semibold text-slate-100">
              Isolated Vanilla Sandbox (/vanilla-tabs/index.html)
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Running 100% pure vanilla HTML5, CSS3, and JavaScript with zero React dependencies in a dedicated iframe sandbox.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setKey((k) => k + 1)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 transition-colors"
            title="Reload sandbox"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reload</span>
          </button>
          <a
            href="/vanilla-tabs/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Open in New Tab</span>
          </a>
        </div>
      </div>

      <div className="w-full h-[620px] bg-slate-50">
        <iframe
          key={key}
          src="/vanilla-tabs/index.html"
          title="Vanilla Tabs Sandbox"
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>
    </div>
  );
};
