import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Play, 
  RotateCcw, 
  Smartphone,
  Info
} from 'lucide-react';
import { soundEffects } from '../../utils/sound';

interface Props {
  onComplete: () => void;
}

interface FormulaOption {
  id: string;
  code: string;
  isCorrect: boolean;
  explanation: string;
  hint: string;
}

export const LearningLabScene: React.FC<Props> = ({ onComplete }) => {
  const [greetingText, setGreetingText] = useState('Hello Ramakrishnan, from Krishna & Hema!');
  const [selectedFormulaId, setSelectedFormulaId] = useState<string>('');
  const [activeScreen, setActiveScreen] = useState<'ScreenA' | 'ScreenB'>('ScreenA');
  const [executionResult, setExecutionResult] = useState<{
    status: 'idle' | 'success' | 'error';
    receivedValue: string | null;
    message: string;
  }>({
    status: 'idle',
    receivedValue: null,
    message: ''
  });
  const [showHint, setShowHint] = useState(false);

  const formulaOptions: FormulaOption[] = [
    {
      id: 'incomplete-nav',
      code: 'Navigate(ScreenB, ScreenTransition.Fade)',
      isCorrect: false,
      explanation: 'Screen B loaded, but no context record was passed in the 3rd argument. The destination screen received nothing.',
      hint: 'Navigate takes an optional 3rd argument { contextVariable: value } to pass data directly to the destination screen.'
    },
    {
      id: 'global-set',
      code: `Set(gblGreeting, "${greetingText}");\nNavigate(ScreenB, ScreenTransition.Fade)`,
      isCorrect: false,
      explanation: 'Set() creates a global variable (gblGreeting) accessible everywhere. It works, but pollutes global memory when screen-specific context is preferred.',
      hint: 'Ramakrishnan encouraged using the 3rd argument of Navigate() for clean, isolated screen context variables.'
    },
    {
      id: 'correct-context',
      code: `Navigate(\n    ScreenB,\n    ScreenTransition.Fade,\n    { greeting: "${greetingText}" }\n)`,
      isCorrect: true,
      explanation: 'Spot on! The 3rd argument { greeting: ... } passes a clean context record directly to Screen B.',
      hint: 'Screen B can now directly render the local context variable "greeting".'
    }
  ];

  const handleTestFormula = (option: FormulaOption) => {
    setSelectedFormulaId(option.id);
    soundEffects.click();

    if (option.isCorrect) {
      setActiveScreen('ScreenB');
      setExecutionResult({
        status: 'success',
        receivedValue: greetingText,
        message: 'Context record received and rendered on Screen B.'
      });
      soundEffects.success();
    } else {
      setActiveScreen('ScreenB');
      setExecutionResult({
        status: 'error',
        receivedValue: null,
        message: option.explanation
      });
    }
  };

  const handleReset = () => {
    soundEffects.click();
    setActiveScreen('ScreenA');
    setExecutionResult({
      status: 'idle',
      receivedValue: null,
      message: ''
    });
  };

  const isSolved = executionResult.status === 'success';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl bg-dev-surface border border-dev-border">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-dev-amber-light">
            <span className="w-2 h-2 rounded-full bg-dev-amber"></span>
            <span>SCENE 02 // THE LEARNING LAB</span>
            <span className="text-dev-border">•</span>
            <span>POWER APPS SCREEN NAVIGATION</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-dev-textBright mt-1">
            Passing Context Between Screens
          </h1>
          <p className="text-sm text-dev-textDim mt-1">
            In the early days, navigating between screens and handing over variables in Power Apps felt like a puzzle. Test the formulas below to pass data to Ramakrishnan’s screen.
          </p>
        </div>

        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-dev-panel border border-dev-border text-dev-amber-light hover:bg-dev-elevated transition-colors self-start md:self-auto"
        >
          <HelpCircle className="w-4 h-4" />
          <span>{showHint ? 'Hide Guidance' : 'Concept Guidance'}</span>
        </button>
      </div>

      {/* Conceptual Guidance Drawer */}
      {showHint && (
        <div className="p-4 rounded-xl bg-dev-panel/80 border border-dev-amber/30 text-xs sm:text-sm space-y-2 animate-fade-in">
          <div className="flex items-center space-x-2 text-dev-amber-light font-mono font-bold">
            <Info className="w-4 h-4" />
            <span>Power Apps Architecture: Local Context vs Global State</span>
          </div>
          <p className="text-dev-textMain leading-relaxed font-sans">
            In Power Apps, <code className="text-dev-amber-light font-mono bg-dev-bg px-1.5 py-0.5 rounded">Set()</code> creates a <em>global variable</em> that persists across the whole app. In contrast, <code className="text-dev-amber-light font-mono bg-dev-bg px-1.5 py-0.5 rounded">Navigate(Screen, Transition, &#123; ContextRecord &#125;)</code> passes <em>screen context</em> directly to the target screen—cleaner, isolated, and easier to debug.
          </p>
        </div>
      )}

      {/* Main Interaction Area: Simulated Device & Code Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Simulated Power Apps Mobile Device */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-sm rounded-2xl bg-dev-surface border-2 border-dev-border shadow-2xl p-4 flex flex-col space-y-3">
            {/* Screen Header Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-dev-border text-xs font-mono text-dev-textMuted">
              <div className="flex items-center space-x-1.5">
                <Smartphone className="w-3.5 h-3.5 text-dev-amber-light" />
                <span className="text-dev-textBright font-semibold">PowerApps Player</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-dev-panel text-[11px] text-dev-textDim">
                {activeScreen === 'ScreenA' ? 'ScreenA: Krishna Welcome' : 'ScreenB: Ramakrishnan Greeting'}
              </span>
            </div>

            {/* Device Screen Body */}
            <div className="h-84 rounded-xl bg-dev-bg border border-dev-border p-5 flex flex-col justify-between transition-all relative overflow-hidden">
              {activeScreen === 'ScreenA' ? (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-dev-amber-light block">
                      Screen A // Origin
                    </span>
                    <h2 className="text-base font-bold text-dev-textBright">Welcome Screen</h2>
                    <p className="text-xs text-dev-textDim mt-1">
                      Enter the message to pass to Ramakrishnan on Screen B:
                    </p>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-dev-textMuted block mb-1">
                      InputText_TeamGreeting
                    </label>
                    <input
                      type="text"
                      value={greetingText}
                      onChange={e => setGreetingText(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono rounded bg-dev-surface border border-dev-border text-dev-textBright focus:outline-none focus:border-dev-amber-light"
                      placeholder="Enter greeting..."
                    />
                  </div>

                  <div className="p-3 rounded bg-dev-panel/50 border border-dev-border/60 text-xs text-dev-textMuted font-mono space-y-1">
                    <div>Sender: Krishna & Hema</div>
                    <div>Target: ScreenB (Ramakrishnan)</div>
                    <div>Expected Parameter: &#123; greeting &#125;</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-dev-amber-light block">
                        Screen B // Destination
                      </span>
                      <h2 className="text-base font-bold text-dev-textBright">Greeting Screen</h2>
                    </div>
                    <button
                      onClick={handleReset}
                      className="p-1 px-2 rounded bg-dev-panel text-dev-textMuted hover:text-dev-textBright text-xs font-mono flex items-center space-x-1"
                      title="Back to Screen A"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Back</span>
                    </button>
                  </div>

                  <div className="mt-2">
                    <span className="text-[11px] font-mono text-dev-textMuted block mb-1">
                      Label Binding: Text(greeting)
                    </span>
                    <div className={`p-4 rounded-lg border text-sm font-mono min-h-[72px] flex items-center justify-center text-center leading-relaxed ${
                      executionResult.receivedValue
                        ? 'bg-dev-green-glow border-dev-green-light text-dev-textBright font-semibold'
                        : 'bg-dev-panel border-dev-border text-dev-textMuted italic'
                    }`}>
                      {executionResult.receivedValue ? (
                        <span>"{executionResult.receivedValue}"</span>
                      ) : (
                        <span>[Blank — No Context Received]</span>
                      )}
                    </div>
                  </div>

                  <div className="text-xs font-mono">
                    <span className="text-dev-textMuted">Status: </span>
                    <span className={executionResult.status === 'success' ? 'text-dev-green-light font-bold' : 'text-dev-red-light'}>
                      {executionResult.status === 'success' ? 'CONTEXT BOUND TO RAMAKRISHNAN’S SCREEN' : 'VARIABLE UNDEFINED'}
                    </span>
                  </div>
                </div>
              )}

              {/* Simulated PowerApps Nav Button */}
              {activeScreen === 'ScreenA' && (
                <div className="pt-2">
                  <div className="w-full py-2.5 px-4 rounded bg-dev-amber/20 border border-dev-amber/40 text-dev-amber-light text-xs font-mono font-medium text-center">
                    Navigate to Screen B (Select formula on right &rarr;)
                  </div>
                </div>
              )}
            </div>

            {/* Screen indicator dots */}
            <div className="flex justify-center space-x-1.5 pt-1">
              <span className={`w-2 h-2 rounded-full ${activeScreen === 'ScreenA' ? 'bg-dev-amber' : 'bg-dev-border'}`}></span>
              <span className={`w-2 h-2 rounded-full ${activeScreen === 'ScreenB' ? 'bg-dev-amber' : 'bg-dev-border'}`}></span>
            </div>
          </div>
        </div>

        {/* Right: Formula Options & Investigation Feedback */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-dev-textMuted uppercase tracking-wider">
              Select Navigation Formula To Execute:
            </span>
            {activeScreen === 'ScreenB' && (
              <button
                onClick={handleReset}
                className="text-xs font-mono text-dev-amber-light flex items-center space-x-1 hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Screen A</span>
              </button>
            )}
          </div>

          {formulaOptions.map((opt, idx) => {
            const isSelected = selectedFormulaId === opt.id;

            return (
              <div 
                key={opt.id}
                className={`p-4 rounded-xl border transition-all ${
                  isSelected
                    ? opt.isCorrect
                      ? 'bg-dev-surface border-dev-green-light ring-1 ring-dev-green-light/40'
                      : 'bg-dev-surface border-dev-red-light ring-1 ring-dev-red-light/40'
                    : 'bg-dev-surface/80 border-dev-border hover:border-dev-borderLight'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1 min-w-0 flex-1">
                    <span className="text-[11px] font-mono text-dev-textMuted block">
                      Option {idx + 1}
                    </span>
                    <pre className="text-xs font-mono text-dev-amber-light bg-dev-bg p-2.5 rounded border border-dev-border overflow-x-auto max-w-full">
                      <code>{opt.code}</code>
                    </pre>
                  </div>

                  <button
                    onClick={() => handleTestFormula(opt)}
                    className="w-full md:w-auto shrink-0 px-4 py-2.5 rounded-lg text-xs font-mono font-bold bg-dev-elevated border border-dev-border text-dev-textBright hover:bg-dev-amber hover:text-dev-bg hover:border-dev-amber transition-all flex items-center justify-center space-x-1.5 shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Formula</span>
                  </button>
                </div>

                {isSelected && (
                  <div className={`mt-3 pt-3 border-t text-xs font-sans space-y-1 ${
                    opt.isCorrect ? 'border-dev-green/30 text-dev-green-light' : 'border-dev-red/30 text-dev-red-light'
                  }`}>
                    <div className="font-semibold">{opt.isCorrect ? 'Result: Success' : 'Result: Incomplete Context'}</div>
                    <p className="text-dev-textDim">{opt.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Success Banner and Emotional Milestone */}
          {isSolved && (
            <div className="p-5 rounded-xl border border-dev-green-light/40 bg-dev-surface shadow-xl space-y-4 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-dev-border text-xs font-mono">
                <span className="text-dev-green-light font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> DATA TRANSFER: SUCCESS
                </span>
                <span className="text-dev-textMuted">CONTEXT: RECEIVED</span>
              </div>

              <div className="space-y-1 font-mono text-xs text-dev-textDim">
                <div>UNDERSTANDING: IMPROVING</div>
                <div className="text-dev-textBright font-semibold">
                  Destination variable `greeting` successfully populated with "{greetingText}"
                </div>
              </div>

              <div className="pt-2 border-t border-dev-border/60">
                <p className="text-base font-serif italic text-dev-amber-light">
                  “The answer matters. Learning how to find it matters even more.”
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-dev-border">
        <div className="text-xs font-mono text-dev-textMuted">
          {isSolved ? (
            <span className="text-dev-green-light flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Context variable verified. Milestone added to journal.
            </span>
          ) : (
            <span>Run the correct Navigate formula to pass context to Screen B.</span>
          )}
        </div>

        <button
          onClick={() => {
            soundEffects.success();
            onComplete();
          }}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-dev-amber text-dev-bg font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-dev-amber-light shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <span>Continue to Scene 3: The Inside Joke</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
