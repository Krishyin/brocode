import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Play, 
  RotateCcw, 
  Smile, 
  Table 
} from 'lucide-react';
import { soundEffects } from '../../utils/sound';

interface Props {
  onComplete: () => void;
}

interface TableRow {
  id: string;
  employee: string;
  department: string;
  status: 'Active' | 'Inactive';
  justUpdated?: boolean;
}

const INITIAL_EMPLOYEES: TableRow[] = [
  { id: '1', employee: 'Anu', department: 'IT', status: 'Active' },
  { id: '2', employee: 'Bala', department: 'HR', status: 'Active' },
  { id: '3', employee: 'Charan', department: 'IT', status: 'Inactive' },
];

export const UpdateVsUpdateIfScene: React.FC<Props> = ({ onComplete }) => {
  const [activeChallenge, setActiveChallenge] = useState<'A' | 'B'>('A');
  const [tableData, setTableData] = useState<TableRow[]>(INITIAL_EMPLOYEES);
  const [challengeASolved, setChallengeASolved] = useState(false);
  const [challengeBSolved, setChallengeBSolved] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Challenge A Options (Update one specific record)
  const challengeAOptions = [
    {
      id: 'A1',
      code: 'Update(\n    Employees,\n    LookUp(Employees, Employee = "Anu"),\n    { Employee: "Anu", Department: "IT", Status: "Inactive" }\n)',
      isCorrect: true,
      explanation: 'Correct! Update() targets the exact record instance returned by LookUp() and replaces it with the supplied record. Only Anu changes.'
    },
    {
      id: 'A2',
      code: 'UpdateIf(\n    Employees,\n    Employee = "Anu",\n    { Status: "Inactive" }\n)',
      isCorrect: false,
      explanation: 'UpdateIf() works by condition, but this challenge asks specifically for the Update() pattern targeting a single referenced record.'
    },
    {
      id: 'A3',
      code: 'Update(\n    Employees,\n    { Status: "Inactive" }\n)',
      isCorrect: false,
      explanation: 'Syntax error: Update() requires the target record reference as its 2nd argument before the replacement record.'
    }
  ];

  // Challenge B Options (Update records matching condition)
  const challengeBOptions = [
    {
      id: 'B1',
      code: 'UpdateIf(\n    Employees,\n    Department = "IT",\n    { Status: "Inactive" }\n)',
      isCorrect: true,
      explanation: 'Correct! UpdateIf() evaluates every record against the condition (Department = "IT") and modifies the specified fields for all matches. Bala (HR) is untouched.'
    },
    {
      id: 'B2',
      code: 'Update(\n    Employees,\n    Department = "IT",\n    { Status: "Inactive" }\n)',
      isCorrect: false,
      explanation: 'Update() cannot accept a condition expression—it requires an exact record reference. For bulk or conditional changes, UpdateIf() is required.'
    },
    {
      id: 'B3',
      code: 'UpdateIf(\n    Employees,\n    Department = "HR",\n    { Status: "Inactive" }\n)',
      isCorrect: false,
      explanation: 'Condition mismatch: The prompt asks to update all IT employees, not HR.'
    }
  ];

  const handleRunOption = (optId: string) => {
    setSelectedOption(optId);
    soundEffects.click();

    if (activeChallenge === 'A') {
      const opt = challengeAOptions.find(o => o.id === optId);
      if (opt?.isCorrect) {
        // Update only Anu
        setTableData([
          { id: '1', employee: 'Anu', department: 'IT', status: 'Inactive', justUpdated: true },
          { id: '2', employee: 'Bala', department: 'HR', status: 'Active', justUpdated: false },
          { id: '3', employee: 'Charan', department: 'IT', status: 'Inactive', justUpdated: false },
        ]);
        setChallengeASolved(true);
        soundEffects.success();
      }
    } else {
      const opt = challengeBOptions.find(o => o.id === optId);
      if (opt?.isCorrect) {
        // Update both IT rows (Anu & Charan)
        setTableData([
          { id: '1', employee: 'Anu', department: 'IT', status: 'Inactive', justUpdated: true },
          { id: '2', employee: 'Bala', department: 'HR', status: 'Active', justUpdated: false },
          { id: '3', employee: 'Charan', department: 'IT', status: 'Inactive', justUpdated: true },
        ]);
        setChallengeBSolved(true);
        soundEffects.success();
      }
    }
  };

  const handleSwitchToChallengeB = () => {
    setActiveChallenge('B');
    setTableData(INITIAL_EMPLOYEES);
    setSelectedOption(null);
    soundEffects.click();
  };

  const handleSwitchToChallengeA = () => {
    setActiveChallenge('A');
    setTableData(INITIAL_EMPLOYEES);
    setSelectedOption(null);
    soundEffects.click();
  };

  const allSolved = challengeASolved && challengeBSolved;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="p-5 rounded-xl bg-dev-surface border border-dev-border space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-xs font-mono text-dev-amber-light">
            <span className="w-2 h-2 rounded-full bg-dev-amber"></span>
            <span>SCENE 03 // ARCHIVE INCIDENT CASE</span>
            <span className="text-dev-border">•</span>
            <span className="text-dev-textBright font-semibold">POWERAPPS-TRAINING</span>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-dev-amber/15 text-dev-amber-light border border-dev-amber/30">
            RECOVERED FROM THE EARLY DAYS
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-dev-textBright flex items-center gap-2">
              The Question That Kept Coming Back
              <Smile className="w-5 h-5 text-dev-amber-light" />
            </h1>
            <p className="text-sm text-dev-textDim mt-1">
              SUBJECT: UPDATE VS UPDATEIF // ATTEMPTS: MULTIPLE // STATUS: UNDERSTANDING ACHIEVED
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-dev-panel px-3 py-1.5 rounded-lg border border-dev-border text-xs font-mono">
            <span className="text-dev-textMuted">CHALLENGES:</span>
            <span className={`px-2 py-0.5 rounded ${challengeASolved ? 'bg-dev-green/20 text-dev-green-light' : 'bg-dev-elevated text-dev-textMuted'}`}>
              Part A: {challengeASolved ? 'SOLVED' : 'PENDING'}
            </span>
            <span className={`px-2 py-0.5 rounded ${challengeBSolved ? 'bg-dev-green/20 text-dev-green-light' : 'bg-dev-elevated text-dev-textMuted'}`}>
              Part B: {challengeBSolved ? 'SOLVED' : 'PENDING'}
            </span>
          </div>
        </div>
      </div>

      {/* Challenge Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 border-b border-dev-border pb-3">
        <button
          onClick={handleSwitchToChallengeA}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all flex items-center justify-center sm:justify-start space-x-2 ${
            activeChallenge === 'A'
              ? 'bg-dev-panel border border-dev-amber/50 text-dev-amber-light shadow-sm'
              : 'text-dev-textDim hover:text-dev-textBright hover:bg-dev-panel/50'
          }`}
        >
          {challengeASolved && <CheckCircle2 className="w-3.5 h-3.5 text-dev-green-light shrink-0" />}
          <span>Challenge A: Update() <span className="hidden sm:inline">— Single Specific Record</span></span>
        </button>

        <button
          onClick={handleSwitchToChallengeB}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all flex items-center justify-center sm:justify-start space-x-2 ${
            activeChallenge === 'B'
              ? 'bg-dev-panel border border-dev-amber/50 text-dev-amber-light shadow-sm'
              : 'text-dev-textDim hover:text-dev-textBright hover:bg-dev-panel/50'
          }`}
        >
          {challengeBSolved && <CheckCircle2 className="w-3.5 h-3.5 text-dev-green-light shrink-0" />}
          <span>Challenge B: UpdateIf() <span className="hidden sm:inline">— Conditional Batch</span></span>
        </button>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Simulated Collection Table */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl bg-dev-surface border border-dev-border overflow-hidden shadow-lg">
            <div className="px-4 py-3 bg-dev-panel border-b border-dev-border flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-mono">
                <Table className="w-4 h-4 text-dev-amber-light" />
                <span className="font-bold text-dev-textBright">Collection: Employees</span>
              </div>
              <button
                onClick={() => {
                  setTableData(INITIAL_EMPLOYEES);
                  setSelectedOption(null);
                }}
                className="text-[11px] font-mono text-dev-textMuted hover:text-dev-textBright flex items-center space-x-1"
                title="Reset table data"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <div className="p-4 overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-dev-border text-dev-textMuted">
                    <th className="pb-2 font-medium">Employee</th>
                    <th className="pb-2 font-medium">Department</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dev-border/50">
                  {tableData.map(row => (
                    <tr 
                      key={row.id}
                      className={`transition-colors ${
                        row.justUpdated 
                          ? 'bg-dev-amber/15 text-dev-amber-light font-bold' 
                          : 'text-dev-textMain hover:bg-dev-panel/40'
                      }`}
                    >
                      <td className="py-2.5 flex items-center space-x-1.5">
                        <span>{row.employee}</span>
                        {row.justUpdated && (
                          <span className="text-[10px] px-1 rounded bg-dev-amber/30 text-dev-amber-light">
                            MODIFIED
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 text-dev-textDim">{row.department}</td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded text-[11px] ${
                          row.status === 'Active' 
                            ? 'bg-dev-green/15 text-dev-green-light border border-dev-green/30' 
                            : 'bg-dev-border text-dev-textMuted'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-2.5 bg-dev-panel/50 border-t border-dev-border text-[11px] font-mono text-dev-textMuted flex items-center justify-between">
              <span>Rows: 3</span>
              <span>Memory Engine: Power Fx local collection</span>
            </div>
          </div>

          {/* Educational distinction badge */}
          <div className="p-4 rounded-xl bg-dev-panel/60 border border-dev-border/80 text-xs font-mono space-y-2">
            <div className="text-dev-textBright font-bold uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-dev-amber-light" />
              Accurate Distinction
            </div>
            <div className="space-y-1.5 text-dev-textDim font-sans">
              <div>
                <strong className="text-dev-amber-light font-mono">Update():</strong> Updates a specific existing record by replacing it with a supplied record. (One selected record)
              </div>
              <div>
                <strong className="text-dev-amber-light font-mono">UpdateIf():</strong> Updates the fields specified in a change record for every record that matches a condition. (Conditional multi-record)
              </div>
            </div>
          </div>
        </div>

        {/* Right: Challenge Prompts & Options */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-xl bg-dev-surface border border-dev-border space-y-3">
            <div className="text-xs font-mono text-dev-amber-light uppercase tracking-wider font-semibold">
              {activeChallenge === 'A' ? 'Challenge A Objective:' : 'Challenge B Objective:'}
            </div>

            <p className="text-sm font-sans text-dev-textBright">
              {activeChallenge === 'A' 
                ? '“Change Anu\'s status from Active to Inactive. Leave every other record unchanged.”'
                : '“Change the status of every employee in the IT department to Inactive. Leave HR records unchanged.”'}
            </p>
          </div>

          {/* Selectable Options */}
          <div className="space-y-3">
            {(activeChallenge === 'A' ? challengeAOptions : challengeBOptions).map((opt, idx) => {
              const isSelected = selectedOption === opt.id;

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
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-dev-textMuted">
                        Formula Option {idx + 1}
                      </span>
                      <pre className="text-xs font-mono text-dev-amber-light bg-dev-bg p-2.5 rounded border border-dev-border overflow-x-auto">
                        <code>{opt.code}</code>
                      </pre>
                    </div>

                    <button
                      onClick={() => handleRunOption(opt.id)}
                      className="sm:self-center shrink-0 px-3.5 py-2 rounded text-xs font-mono font-bold bg-dev-elevated border border-dev-border text-dev-textBright hover:bg-dev-amber hover:text-dev-bg hover:border-dev-amber transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Execute</span>
                    </button>
                  </div>

                  {isSelected && (
                    <div className={`mt-3 pt-3 border-t text-xs font-sans ${
                      opt.isCorrect ? 'border-dev-green/30 text-dev-green-light' : 'border-dev-red/30 text-dev-red-light'
                    }`}>
                      <div className="font-semibold">{opt.isCorrect ? 'Validation Passed' : 'Validation Contradiction'}</div>
                      <p className="text-dev-textDim mt-0.5">{opt.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Next Part Prompt if Part A solved */}
          {challengeASolved && !challengeBSolved && activeChallenge === 'A' && (
            <div className="p-4 rounded-xl bg-dev-panel border border-dev-amber/30 flex items-center justify-between">
              <span className="text-xs font-mono text-dev-textBright">
                Challenge A verified! Now test conditional updating in Challenge B.
              </span>
              <button
                onClick={handleSwitchToChallengeB}
                className="px-4 py-2 rounded bg-dev-amber text-dev-bg font-mono font-bold text-xs flex items-center space-x-1.5 hover:bg-dev-amber-light transition-all"
              >
                <span>Proceed to Challenge B</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* The Personal Reveal When Both Solved */}
      {allSolved && (
        <div className="p-6 rounded-2xl bg-dev-surface border-2 border-dev-amber/40 shadow-2xl space-y-6 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-dev-amber/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Incident Diagnostic Header */}
          <div className="p-4 rounded-lg bg-dev-bg/90 border border-dev-border font-mono text-xs space-y-1.5">
            <div className="text-dev-amber-light font-bold">
              QUESTION: What is the difference between Update() and UpdateIf()?
            </div>
            <div className="text-dev-textDim">ATTEMPTS: More than one</div>
            <div className="text-dev-textDim">EARLY RESULT: Sometimes incorrect</div>
            <div className="text-dev-green-light font-semibold">CURRENT RESULT: Understood</div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-dev-amber-light">
              “Same question. Different day. Better answer.”
            </h2>

            <p className="text-sm sm:text-base text-dev-textBright leading-relaxed font-sans max-w-3xl">
              “You asked me this more than once. I got it wrong more than once, even after studying it. Not on purpose, of course. But I kept learning, and eventually it clicked.
            </p>
            <p className="text-sm sm:text-base text-dev-textDim leading-relaxed font-sans max-w-3xl">
              Today, I know the difference. And whenever I think about it, I remember those moments when you kept asking me to understand something properly.”
            </p>
          </div>

          {/* Compact Technical Status Panel */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 rounded bg-dev-panel border border-dev-border">
              <span className="text-[10px] text-dev-textMuted uppercase block">BUG</span>
              <span className="text-dev-textBright font-medium">Confusing Update() and UpdateIf()</span>
            </div>
            <div className="p-3 rounded bg-dev-panel border border-dev-border">
              <span className="text-[10px] text-dev-textMuted uppercase block">FIX</span>
              <span className="text-dev-textBright font-medium">Practice + persistence</span>
            </div>
            <div className="p-3 rounded bg-dev-panel border border-dev-border">
              <span className="text-[10px] text-dev-textMuted uppercase block">BONUS</span>
              <span className="text-dev-amber-light font-medium">A mentor who kept asking</span>
            </div>
            <div className="p-3 rounded bg-dev-panel border border-dev-border">
              <span className="text-[10px] text-dev-textMuted uppercase block">STATUS</span>
              <span className="text-dev-green-light font-bold">RESOLVED</span>
            </div>
          </div>

          <div className="pt-2 border-t border-dev-border/60">
            <p className="text-sm font-serif italic text-dev-amber-light/90">
              “One concept understood. A whole world still waiting to be explored.”
            </p>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-dev-border">
        <div className="text-xs font-mono text-dev-textMuted">
          {allSolved ? (
            <span className="text-dev-green-light flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Shared inside joke & distinction solved! Journal updated.
            </span>
          ) : (
            <span>Solve both Challenge A and B to unlock the archive memory.</span>
          )}
        </div>

        <button
          onClick={() => {
            soundEffects.success();
            onComplete();
          }}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-dev-amber text-dev-bg font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-dev-amber-light shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <span>Continue to Scene 4: The API Labyrinth</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
