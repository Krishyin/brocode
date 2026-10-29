import React, { useState, useEffect } from 'react';
import { SceneId } from './types';
import { soundEffects } from './utils/sound';
import { WorkstationHeader } from './components/WorkstationHeader';
import { BootSequence } from './components/BootSequence';
import { UnknownScene } from './components/scenes/UnknownScene';
import { LearningLabScene } from './components/scenes/LearningLabScene';
import { UpdateVsUpdateIfScene } from './components/scenes/UpdateVsUpdateIfScene';
import { ApiLabyrinthScene } from './components/scenes/ApiLabyrinthScene';
import { ProductionIncidentScene } from './components/scenes/ProductionIncidentScene';
import { BirthdayReveal } from './components/scenes/BirthdayReveal';
import { InvestigationJournalModal } from './components/InvestigationJournalModal';
import { HiddenFileModal } from './components/HiddenFileModal';

export const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<SceneId>('boot');
  const [unlockedScenes, setUnlockedScenes] = useState<SceneId[]>(['boot']);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isHiddenFileOpen, setIsHiddenFileOpen] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  // Sync mute state with sound utility
  const handleToggleSound = () => {
    const nextMuted = !isSoundMuted;
    setIsSoundMuted(nextMuted);
    soundEffects.setMuted(nextMuted);
  };

  const unlockAndNavigate = (nextScene: SceneId) => {
    setUnlockedScenes(prev => {
      if (!prev.includes(nextScene)) {
        return [...prev, nextScene];
      }
      return prev;
    });
    setCurrentScene(nextScene);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsJournalOpen(false);
        setIsHiddenFileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleReplay = () => {
    setCurrentScene('boot');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dev-bg text-dev-textMain flex flex-col font-sans selection:bg-dev-amber/30 selection:text-dev-amber-light">
      {/* Workstation Header */}
      <WorkstationHeader
        currentScene={currentScene}
        unlockedScenes={unlockedScenes}
        onSelectScene={scene => {
          setCurrentScene(scene);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenJournal={() => setIsJournalOpen(true)}
        onOpenHiddenFile={() => setIsHiddenFileOpen(true)}
        isSoundMuted={isSoundMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Main Workstation Stage */}
      <main className="flex-1">
        {currentScene === 'boot' && (
          <BootSequence
            onStartInvestigation={() => unlockAndNavigate('unknown')}
          />
        )}

        {currentScene === 'unknown' && (
          <UnknownScene
            onComplete={() => unlockAndNavigate('learningLab')}
          />
        )}

        {currentScene === 'learningLab' && (
          <LearningLabScene
            onComplete={() => unlockAndNavigate('updateVsUpdateIf')}
          />
        )}

        {currentScene === 'updateVsUpdateIf' && (
          <UpdateVsUpdateIfScene
            onComplete={() => unlockAndNavigate('apiLabyrinth')}
          />
        )}

        {currentScene === 'apiLabyrinth' && (
          <ApiLabyrinthScene
            onComplete={() => unlockAndNavigate('productionIncident')}
          />
        )}

        {currentScene === 'productionIncident' && (
          <ProductionIncidentScene
            onComplete={() => unlockAndNavigate('birthdayReveal')}
          />
        )}

        {currentScene === 'birthdayReveal' && (
          <BirthdayReveal
            onReplay={handleReplay}
            onOpenJournal={() => setIsJournalOpen(true)}
            onOpenHiddenFile={() => setIsHiddenFileOpen(true)}
          />
        )}
      </main>

      {/* Persistent Investigation Journal Modal */}
      <InvestigationJournalModal
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        unlockedScenes={unlockedScenes}
      />

      {/* Hidden Archive File Modal */}
      <HiddenFileModal
        isOpen={isHiddenFileOpen}
        onClose={() => setIsHiddenFileOpen(false)}
      />
    </div>
  );
};
export default App;
