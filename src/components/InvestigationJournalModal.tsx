import React from 'react';
import { X, BookOpen, CheckCircle2, Lock, Terminal } from 'lucide-react';
import { JournalEntry, SceneId } from '../types';
import { INITIAL_JOURNAL_ENTRIES } from '../data/journalData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  unlockedScenes: SceneId[];
}

export const InvestigationJournalModal: React.FC<Props> = ({
  isOpen,
  onClose,
  unlockedScenes
}) => {
  if (!isOpen) return null;

  const entriesOrder: SceneId[] = [
    'unknown',
    'learningLab',
    'updateVsUpdateIf',
    'apiLabyrinth',
    'productionIncident'
  ];

  const unlockedCount = entriesOrder.filter(scene => unlockedScenes.includes(scene)).length;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dev-bg/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="journal-modal-title"
    >
      <div 
        className="w-full max-w-2xl bg-dev-surface border border-dev-border rounded-xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-dev-border bg-dev-panel/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-dev-amber/10 border border-dev-amber/30 flex items-center justify-center text-dev-amber-light shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 id="journal-modal-title" className="text-sm font-semibold tracking-wide text-dev-textBright font-mono uppercase">
                Investigation Journal
              </h2>
              <p className="text-[11px] sm:text-xs text-dev-textMuted font-mono">
                ENGINEERING NOTEBOOK // DISCOVERIES: {unlockedCount} / {entriesOrder.length}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-dev-textMuted hover:text-dev-textBright hover:bg-dev-elevated transition-colors"
            aria-label="Close investigation journal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Entries list */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {entriesOrder.map((sceneId, idx) => {
            const isUnlocked = unlockedScenes.includes(sceneId);
            const entry: JournalEntry = INITIAL_JOURNAL_ENTRIES[sceneId];

            if (!isUnlocked) {
              return (
                <div 
                  key={sceneId}
                  className="p-4 rounded-lg border border-dev-border/50 bg-dev-panel/20 text-dev-textMuted font-mono flex items-center justify-between opacity-60"
                >
                  <div className="flex items-center space-x-3">
                    <Lock className="w-4 h-4 text-dev-textMuted" />
                    <div>
                      <span className="text-xs text-dev-textMuted uppercase tracking-wider block">
                        Record #{idx + 1} // Classified
                      </span>
                      <span className="text-sm text-dev-textMuted/70">
                        Pending scene investigation...
                      </span>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-dev-elevated text-dev-textMuted border border-dev-border">
                    LOCKED
                  </span>
                </div>
              );
            }

            return (
              <div 
                key={sceneId}
                className="p-5 rounded-lg border border-dev-border bg-dev-panel/60 hover:border-dev-amber/40 transition-colors space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-dev-green-light shrink-0" />
                    <span className="text-xs font-mono text-dev-amber-light font-medium tracking-wide">
                      {entry.caseRef}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-dev-textMuted">
                    {entry.timestamp}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-dev-textBright">
                    {entry.title}
                  </h3>
                  <div className="mt-1 flex items-center space-x-2">
                    <Terminal className="w-3.5 h-3.5 text-dev-textMuted" />
                    <span className="text-xs font-mono text-dev-textDim">
                      Concept: {entry.technicalConcept}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-dev-textMain leading-relaxed font-sans">
                  {entry.discovery}
                </p>

                <div className="pt-2 border-t border-dev-border/50">
                  <p className="text-xs italic text-dev-amber-light/90 font-sans tracking-wide">
                    {entry.quote}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-dev-border bg-dev-panel/30 flex items-center justify-between text-xs font-mono text-dev-textMuted">
          <span>KRISHNA_WORKSTATION // PERSISTENT LOG</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-dev-elevated border border-dev-border text-dev-textBright hover:bg-dev-border transition-colors"
          >
            Close Notebook
          </button>
        </div>
      </div>
    </div>
  );
};
