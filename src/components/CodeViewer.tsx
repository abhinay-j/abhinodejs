import React, { useState } from 'react';
import { SOURCE_FILES, CodeFile } from '../data/sourceCode';
import { Copy, Check, Download, FileCode, FileText } from 'lucide-react';

export const CodeViewer: React.FC = () => {
  const [selectedFileId, setSelectedFileId] = useState<string>('index-html');
  const [copied, setCopied] = useState(false);

  const activeFile: CodeFile = SOURCE_FILES.find((f) => f.id === selectedFileId) || SOURCE_FILES[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeFile.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = activeFile.code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadSingle = () => {
    const blob = new Blob([activeFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFile.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    // Download each file individually
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
      }, index * 250);
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      {/* File Navigation Bar */}
      <div className="bg-slate-900 border-b border-slate-800 p-2 sm:p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {SOURCE_FILES.map((file) => {
            const isSelected = file.id === selectedFileId;
            return (
              <button
                key={file.id}
                type="button"
                onClick={() => setSelectedFileId(file.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  isSelected
                    ? 'bg-slate-800 text-cyan-300 font-semibold border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {file.language === 'markdown' ? (
                  <FileText className="w-3.5 h-3.5" />
                ) : (
                  <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                )}
                <span>{file.filename}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Code</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadSingle}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
            title={`Download ${activeFile.filename}`}
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Download</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-sm"
            title="Download all 4 project files"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download All Files</span>
            <span className="sm:hidden">All</span>
          </button>
        </div>
      </div>

      {/* Description Strip */}
      <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 text-xs text-slate-400 flex items-center justify-between">
        <span>{activeFile.description}</span>
        <span className="font-mono text-slate-500">{activeFile.code.split('\n').length} lines</span>
      </div>

      {/* Code Display Area */}
      <div className="bg-[#0f172a] p-4 overflow-x-auto max-h-[600px] text-xs font-mono leading-relaxed text-slate-200 selection:bg-blue-900 selection:text-white">
        <pre>
          <code>{activeFile.code}</code>
        </pre>
      </div>
    </div>
  );
};
