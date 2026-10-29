import React from 'react';
import { 
  Terminal, 
  BookOpen, 
  FileCode, 
  Volume2, 
  VolumeX, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { SceneId } from '../types';

interface Props {
  currentScene: SceneId;
  unlockedScenes: SceneId[];
  onSelectScene: (scene: SceneId) => void;
  onOpenJournal: () => void;
  onOpenHiddenFile: () => void;
  isSoundMuted: boolean;
  onToggleSound: () => void;
}

export const WorkstationHeader: React.FC<Props> = ({
  currentScene,
  unlockedScenes,
  onSelectScene,
  onOpenJournal,
  onOpenHiddenFile,
  isSoundMuted,
  onToggleSound,
}) => {
  const sceneLabels: { id: SceneId; label: string; short: string }[] = [
    { id: 'unknown', label: '1. The Unknown', short: 'S1' },
    { id: 'learningLab', label: '2. Learning Lab', short: 'S2' },
    { id: 'updateVsUpdateIf', label: '3. Update vs UpdateIf', short: 'S3' },
    { id: 'apiLabyrinth', label: '4. API Labyrinth', short: 'S4' },
    { id: 'productionIncident', label: '5. Prod Incident', short: 'S5' },
    { id: 'birthdayReveal', label: '6. Root Cause', short: 'BD' },
  ];

  const unlockedCount = [
    'unknown',
    'learningLab',
    'updateVsUpdateIf',
    'apiLabyrinth',
    'productionIncident'
  ].filter(s => unlockedScenes.includes(s as SceneId)).length;

  const isResolved = currentScene === 'birthdayReveal';

  return (
    <header className="border-b border-dev-border bg-dev-surface/95 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Station Identity */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-dev-panel border border-dev-border flex items-center justify-center text-dev-amber-light">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold tracking-wider text-dev-textBright">
                KRISHNA_WORKSTATION
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-dev-border/50 text-dev-textMuted border border-dev-border/70">
                v2.6.0
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[11px] font-mono">
              <span className="text-dev-textMuted">INCIDENT: BD-001</span>
              <span className="text-dev-border">•</span>
              {isResolved ? (
                <span className="text-dev-green-light flex items-center gap-1 font-medium">
                  <Sparkles className="w-3 h-3" /> RESOLVED // GRATITUDE
                </span>
              ) : (
                <span className="text-dev-amber-light flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-dev-amber animate-pulse"></span>
                  PRIORITY: PERSONAL
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Center: Navigation Steps (Visible on larger screens) */}
        {currentScene !== 'boot' && (
          <nav className="hidden md:flex items-center space-x-1" aria-label="Investigation progress">
            {sceneLabels.map(({ id, label, short }) => {
              const isUnlocked = unlockedScenes.includes(id);
              const isCurrent = currentScene === id;

              return (
                <button
                  key={id}
                  onClick={() => isUnlocked && onSelectScene(id)}
                  disabled={!isUnlocked}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-all flex items-center space-x-1.5 ${
                    isCurrent
                      ? 'bg-dev-amber/15 text-dev-amber-light border border-dev-amber/40 shadow-sm'
                      : isUnlocked
                      ? 'text-dev-textDim hover:text-dev-textBright hover:bg-dev-panel'
                      : 'text-dev-textMuted/40 cursor-not-allowed'
                  }`}
                  title={isUnlocked ? `Jump to ${label}` : `${label} (Locked)`}
                >
                  {isUnlocked && id !== 'birthdayReveal' && (
                    <CheckCircle2 className="w-3 h-3 text-dev-green-light shrink-0" />
                  )}
                  {id === 'birthdayReveal' && isUnlocked && (
                    <Sparkles className="w-3 h-3 text-dev-amber-light shrink-0" />
                  )}
                  <span className="hidden lg:inline">{label}</span>
                  <span className="lg:hidden">{short}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Right: Actions */}
        <div className="flex items-center space-x-2">
          {/* Hidden File Discover Button */}
          <button
            onClick={onOpenHiddenFile}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded text-xs font-mono bg-dev-panel border border-dev-border text-dev-textDim hover:text-dev-amber-light hover:border-dev-amber/40 transition-colors"
            title="Inspect hidden archive file: why_this_exists.txt"
          >
            <FileCode className="w-3.5 h-3.5 text-dev-amber-light" />
            <span className="hidden sm:inline">why_this_exists.txt</span>
          </button>

          {/* Journal Button */}
          {currentScene !== 'boot' && (
            <button
              onClick={onOpenJournal}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded text-xs font-mono bg-dev-panel border border-dev-border text-dev-textBright hover:border-dev-borderLight transition-colors"
              title="Open Investigation Journal"
            >
              <BookOpen className="w-3.5 h-3.5 text-dev-amber-light" />
              <span>JOURNAL</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-dev-amber/20 text-dev-amber-light font-bold">
                {unlockedCount}/5
              </span>
            </button>
          )}

          {/* Audio toggle */}
          <button
            onClick={onToggleSound}
            className="p-1.5 rounded bg-dev-panel border border-dev-border text-dev-textMuted hover:text-dev-textBright transition-colors"
            title={isSoundMuted ? 'Unmute tactical audio' : 'Mute tactical audio'}
            aria-label={isSoundMuted ? 'Unmute tactical audio' : 'Mute tactical audio'}
          >
            {isSoundMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-dev-textMuted" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-dev-textDim" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      {currentScene !== 'boot' && (
        <div className="md:hidden border-t border-dev-border/70 bg-dev-panel/50 px-3 py-1.5 overflow-x-auto flex items-center space-x-1.5 scrollbar-none">
          {sceneLabels.map(({ id, label }) => {
            const isUnlocked = unlockedScenes.includes(id);
            const isCurrent = currentScene === id;

            return (
              <button
                key={id}
                onClick={() => isUnlocked && onSelectScene(id)}
                disabled={!isUnlocked}
                className={`shrink-0 px-2 py-0.5 rounded text-[11px] font-mono transition-all flex items-center space-x-1 ${
                  isCurrent
                    ? 'bg-dev-amber/20 text-dev-amber-light border border-dev-amber/50 font-bold'
                    : isUnlocked
                    ? 'text-dev-textDim bg-dev-surface border border-dev-border hover:text-dev-textBright'
                    : 'text-dev-textMuted/40 bg-dev-bg/40 border border-dev-border/30 cursor-not-allowed'
                }`}
              >
                {isUnlocked && id !== 'birthdayReveal' && (
                  <CheckCircle2 className="w-2.5 h-2.5 text-dev-green-light shrink-0" />
                )}
                {id === 'birthdayReveal' && isUnlocked && (
                  <Sparkles className="w-2.5 h-2.5 text-dev-amber-light shrink-0" />
                )}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
