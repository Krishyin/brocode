import React, { useState, useEffect } from 'react';
import { ShieldAlert, ArrowRight, FastForward, Cpu } from 'lucide-react';
import { soundEffects } from '../utils/sound';

interface Props {
  onStartInvestigation: () => void;
}

export const BootSequence: React.FC<Props> = ({ onStartInvestigation }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [readyForIncident, setReadyForIncident] = useState(false);

  const fullSequence = [
    'KRISHNA_WORKSTATION // SESSION INITIALIZING',
    'Loading development environment...',
    'Restoring investigation history...',
    'Checking unresolved incidents...',
    'One incident requires attention.'
  ];

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < fullSequence.length) {
        const nextLine = fullSequence[currentIdx];
        setLines(prev => [...prev, nextLine]);
        soundEffects.click();
        currentIdx++;
      } else {
        clearInterval(interval);
        setReadyForIncident(true);
        soundEffects.discovery();
      }
    }, 550);

    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => {
    setLines(fullSequence);
    setReadyForIncident(true);
    soundEffects.discovery();
  };

  const handleInvestigate = () => {
    soundEffects.success();
    onStartInvestigation();
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center px-4 py-8 relative">
      {/* Background ambient subtle elements */}
      <div className="absolute inset-0 workstation-grid pointer-events-none opacity-40"></div>

      <div className="w-full max-w-2xl bg-dev-surface border border-dev-border rounded-xl shadow-2xl overflow-hidden relative z-10 transition-all">
        {/* Terminal Header Bar */}
        <div className="px-4 py-3 bg-dev-panel border-b border-dev-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-dev-borderLight/60"></span>
            <span className="w-3 h-3 rounded-full bg-dev-borderLight/60"></span>
            <span className="w-3 h-3 rounded-full bg-dev-borderLight/60"></span>
            <span className="text-xs font-mono text-dev-textMuted ml-2">
              bash — krishna@workstation: ~/workspace
            </span>
          </div>
          {!readyForIncident && (
            <button
              onClick={handleSkip}
              className="text-xs font-mono text-dev-textMuted hover:text-dev-amber-light flex items-center space-x-1 transition-colors"
              title="Skip terminal boot sequence"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>SKIP BOOT</span>
            </button>
          )}
        </div>

        {/* Console logs */}
        <div className="p-6 font-mono text-xs sm:text-sm space-y-3 min-h-[180px] bg-dev-bg/70">
          {lines.map((line, idx) => (
            <div 
              key={idx} 
              className={`flex items-start space-x-2 animate-fade-in ${
                idx === 0 
                  ? 'text-dev-amber-light font-semibold' 
                  : idx === lines.length - 1 && readyForIncident
                  ? 'text-dev-textBright font-medium'
                  : 'text-dev-textDim'
              }`}
            >
              <span className="text-dev-textMuted select-none">&gt;</span>
              <span>{line}</span>
            </div>
          ))}

          {!readyForIncident && (
            <div className="flex items-center space-x-2 text-dev-amber">
              <span className="text-dev-textMuted select-none">&gt;</span>
              <span className="w-2 h-4 bg-dev-amber cursor-blink"></span>
            </div>
          )}
        </div>

        {/* Incident card reveal */}
        {readyForIncident && (
          <div className="p-6 border-t border-dev-border bg-dev-panel/40 animate-fade-in space-y-6">
            <div className="p-5 rounded-lg border border-dev-amber/30 bg-dev-panel/80 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-dev-amber/5 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-dev-amber-light">
                  <ShieldAlert className="w-5 h-5" />
                  <span className="text-xs font-mono font-bold tracking-wider uppercase">
                    Unresolved Incident Record
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-dev-amber/20 text-dev-amber-light border border-dev-amber/40">
                  ACTION REQUIRED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-2.5 rounded bg-dev-bg/80 border border-dev-border">
                  <div className="text-[10px] text-dev-textMuted uppercase">Incident ID</div>
                  <div className="text-sm font-bold text-dev-textBright mt-0.5">BD-001</div>
                </div>

                <div className="p-2.5 rounded bg-dev-bg/80 border border-dev-border">
                  <div className="text-[10px] text-dev-textMuted uppercase">Status</div>
                  <div className="text-sm font-semibold text-dev-amber-light mt-0.5">ROOT CAUSE UNKNOWN</div>
                </div>

                <div className="p-2.5 rounded bg-dev-bg/80 border border-dev-border">
                  <div className="text-[10px] text-dev-textMuted uppercase">Priority</div>
                  <div className="text-sm font-bold text-dev-amber-light mt-0.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-dev-amber animate-pulse"></span>
                    PERSONAL
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-dev-border/60 text-xs text-dev-textDim font-sans">
                A historical case file containing foundational logs, early experiments, and persistent questions. Origin trace: early career mentorship.
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-dev-textMuted flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-dev-textDim" />
                <span>Ready to trace root cause</span>
              </div>

              <button
                onClick={handleInvestigate}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-dev-amber text-dev-bg font-mono font-bold text-sm tracking-wide flex items-center justify-center space-x-2 hover:bg-dev-amber-light shadow-lg shadow-dev-amber/20 transition-all hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-dev-amber focus:outline-none"
              >
                <span>[ INVESTIGATE INCIDENT ]</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Subtle quote footer */}
      <div className="mt-8 text-center text-xs font-mono text-dev-textMuted max-w-md">
        <span>“DEBUG YOURSELF” // The art of finding out</span>
      </div>
    </div>
  );
};
