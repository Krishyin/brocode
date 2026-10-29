import React from 'react';
import { X, FileText, Lock, Terminal } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const HiddenFileModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dev-bg/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hidden-file-title"
    >
      <div 
        className="w-full max-w-lg bg-dev-surface border border-dev-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-dev-border bg-dev-panel/60">
          <div className="flex items-center space-x-2.5">
            <FileText className="w-4 h-4 text-dev-amber-light" />
            <span id="hidden-file-title" className="text-xs font-mono text-dev-textBright tracking-wider">
              /sys/archive/why_this_exists.txt
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-dev-textMuted hover:text-dev-textBright hover:bg-dev-elevated transition-colors"
            aria-label="Close file viewer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 font-mono text-sm leading-relaxed space-y-4 bg-dev-bg/60">
          <div className="text-xs text-dev-textMuted flex items-center space-x-2 pb-2 border-b border-dev-border/40">
            <Lock className="w-3.5 h-3.5 text-dev-amber" />
            <span>ENCRYPTED MEMORY FRAGMENT // ATTRIBUTION: KRISHNA</span>
          </div>

          <div className="p-4 rounded border border-dev-border/60 bg-dev-panel/40 text-dev-textDim space-y-3 font-mono text-xs sm:text-sm">
            <p className="text-dev-textBright font-medium">
              Some lessons remain long after the screen is closed.
            </p>
            <p className="text-dev-textDim">
              Some fixes change more than the program.
            </p>
            <p className="text-dev-amber-light font-semibold pt-1">
              Find the root cause.
            </p>
          </div>

          <div className="text-[11px] text-dev-textMuted flex items-center space-x-2 pt-2">
            <Terminal className="w-3 h-3 text-dev-green-light" />
            <span>STATUS: Discovered in hidden system registers</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-dev-border bg-dev-panel/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded text-xs font-mono bg-dev-elevated border border-dev-border text-dev-textBright hover:bg-dev-border transition-colors"
          >
            Return to Investigation
          </button>
        </div>
      </div>
    </div>
  );
};
