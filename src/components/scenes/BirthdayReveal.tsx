import React, { useState, useEffect } from 'react';
import { 
  RotateCcw, 
  BookOpen, 
  GitCommit, 
  FileCode
} from 'lucide-react';
import { soundEffects } from '../../utils/sound';

interface Props {
  onReplay: () => void;
  onOpenJournal: () => void;
  onOpenHiddenFile: () => void;
}

export const BirthdayReveal: React.FC<Props> = ({ 
  onReplay, 
  onOpenJournal, 
  onOpenHiddenFile 
}) => {
  // Pacing sequence:
  // step 0: settled silence
  // step 1: "You didn't debug my code for me."
  // step 2: "You taught me how to debug the unknown."
  // step 3: "HAPPY BIRTHDAY, RAMAKRISHNAN"
  // step 4: Full Letter
  // step 5: Fictional Commit Record
  const [revealStep, setRevealStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setRevealStep(1);
      soundEffects.discovery();
    }, 900);

    const t2 = setTimeout(() => {
      setRevealStep(2);
      soundEffects.discovery();
    }, 2800);

    const t3 = setTimeout(() => {
      setRevealStep(3);
      soundEffects.success();
    }, 4800);

    const t4 = setTimeout(() => {
      setRevealStep(4);
    }, 6200);

    const t5 = setTimeout(() => {
      setRevealStep(5);
    }, 7800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const handleSkipAnimation = () => {
    setRevealStep(5);
    soundEffects.success();
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 relative overflow-hidden flex flex-col items-center">
      {/* Background warm amber glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-dev-amber/8 rounded-full blur-[140px] pointer-events-none transition-opacity duration-1000"></div>

      {/* Main Reading Container */}
      <div className="w-full max-w-3xl relative z-10 space-y-12">
        {/* Skip Sequence Option (Subtle, discreet) */}
        {revealStep < 4 && (
          <div className="text-center">
            <button
              onClick={handleSkipAnimation}
              className="text-xs font-mono text-dev-textMuted/60 hover:text-dev-amber-light transition-colors"
            >
              [ View full letter ]
            </button>
          </div>
        )}

        {/* Cinematic Opening Lines */}
        <div className="text-center space-y-6 pt-4">
          {revealStep >= 1 && (
            <p className="text-lg sm:text-2xl font-serif text-dev-textDim italic transition-all duration-700 animate-fade-in">
              “You didn't debug my code for me.”
            </p>
          )}

          {revealStep >= 2 && (
            <p className="text-xl sm:text-3xl font-serif font-bold text-dev-amber-light transition-all duration-700 animate-fade-in">
              “You taught me how to debug the unknown.”
            </p>
          )}

          {revealStep >= 3 && (
            <div className="pt-8 pb-4 animate-fade-in space-y-2">
              <span className="text-xs font-mono tracking-[0.25em] text-dev-amber-light uppercase block">
                INCIDENT BD-001 // ROOT CAUSE IDENTIFIED
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-dev-textBright drop-shadow-sm">
                HAPPY BIRTHDAY, RAMAKRISHNAN
              </h1>
              <div className="w-20 h-0.5 bg-dev-amber/50 mx-auto mt-4 rounded-full"></div>
            </div>
          )}
        </div>

        {/* The Personal Birthday Letter */}
        {revealStep >= 4 && (
          <div className="rounded-2xl bg-dev-surface/90 border border-dev-border/80 shadow-2xl p-5 sm:p-12 space-y-6 animate-fade-in text-dev-textMain font-serif text-base sm:text-lg leading-[1.8] sm:leading-[1.9] selection:bg-dev-amber/20">
            <p>
              When I first started in IT, there were so many things I didn't understand. Even something as simple as passing a variable between screens in Power Apps felt unfamiliar. Words like API, endpoint, headers, payload, and JSON sounded intimidating.
            </p>

            <p>
              But you didn't just give me answers. You helped me discover them for myself.
            </p>

            <p>
              I still remember those early days, including the times you kept asking me about the difference between Update() and UpdateIf(). I had studied it, and somehow I could still get it wrong. Today, I finally understand it. It makes me smile to think about those moments because they remind me of how much I have learned since then.
            </p>

            <p>
              Looking back, I realise that what you helped me learn was much bigger than any particular tool or technology. You helped me learn how to investigate, how to debug, and how to approach something I didn't understand without being afraid of it.
            </p>

            <p>
              Today, I work independently on a complex project, resolving production issues and figuring out unfamiliar things along the way. I know how much those early lessons matter.
            </p>

            <p>
              You may have seen them as ordinary moments of guidance. I didn't. They made a real difference to me.
            </p>

            <p className="text-dev-textBright font-medium">
              You're more than a senior or a mentor to me. You're like a brother, and I'm genuinely grateful that I got to learn from you.
            </p>

            <p>
              I can't put all of that into a function or a perfect line of code. So I built this instead.
            </p>

            <p className="text-dev-amber-light font-semibold pt-2">
              Happy Birthday, Ramakrishnan. Thank you for helping me become someone who can find his own answers.
            </p>

            {/* Signature */}
            <div className="pt-6 border-t border-dev-border/60 text-right space-y-1">
              <div className="text-sm sm:text-base font-serif italic text-dev-textDim">
                With respect and brotherhood,
              </div>
              <div className="text-lg sm:text-xl font-serif font-bold text-dev-textBright">
                Krishna
              </div>
            </div>
          </div>
        )}

        {/* Final Technical Flourish: Symbolic Commit Record */}
        {revealStep >= 5 && (
          <div className="space-y-8 animate-fade-in">
            <div className="max-w-md mx-auto rounded-xl bg-dev-panel border border-dev-border p-5 font-mono text-xs space-y-2 shadow-lg">
              <div className="flex items-center justify-between pb-2 border-b border-dev-border text-dev-textMuted">
                <div className="flex items-center space-x-2">
                  <GitCommit className="w-4 h-4 text-dev-amber-light" />
                  <span className="text-dev-textBright font-bold">git log -1 // origin/gratitude</span>
                </div>
                <span className="text-[10px] text-dev-green-light">COMMITTED</span>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex">
                  <span className="w-24 text-dev-textMuted">commit:</span>
                  <span className="text-dev-amber-light font-semibold">gratitude</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-dev-textMuted">author:</span>
                  <span className="text-dev-textBright">Krishna</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-dev-textMuted">recipient:</span>
                  <span className="text-dev-textBright">Ramakrishnan</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-dev-textMuted">change:</span>
                  <span className="text-dev-textDim">appreciation expressed</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-dev-textMuted">status:</span>
                  <span className="text-dev-green-light font-semibold">cannot fully express in code</span>
                </div>
              </div>
            </div>

            {/* Subtle Replay & Review Navigation */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono pt-4 text-dev-textMuted">
              <button
                onClick={onOpenJournal}
                className="px-4 py-2 rounded-lg bg-dev-surface border border-dev-border text-dev-textDim hover:text-dev-textBright hover:bg-dev-panel transition-colors flex items-center space-x-2"
              >
                <BookOpen className="w-3.5 h-3.5 text-dev-amber-light" />
                <span>Review Investigation Journal</span>
              </button>

              <button
                onClick={onOpenHiddenFile}
                className="px-4 py-2 rounded-lg bg-dev-surface border border-dev-border text-dev-textDim hover:text-dev-textBright hover:bg-dev-panel transition-colors flex items-center space-x-2"
              >
                <FileCode className="w-3.5 h-3.5 text-dev-amber-light" />
                <span>View why_this_exists.txt</span>
              </button>

              <button
                onClick={onReplay}
                className="px-4 py-2 rounded-lg bg-dev-surface border border-dev-border text-dev-textDim hover:text-dev-amber-light hover:bg-dev-panel transition-colors flex items-center space-x-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Experience</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
