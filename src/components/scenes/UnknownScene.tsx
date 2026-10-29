import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle, 
  Terminal, 
  HelpCircle,
  Cpu,
  Layers,
  FileJson,
  Send,
  Sliders
} from 'lucide-react';
import { soundEffects } from '../../utils/sound';

interface Props {
  onComplete: () => void;
}

interface TermEvidence {
  id: string;
  name: string;
  icon: React.ReactNode;
  summary: string;
  detail: string;
  example: string;
  memoryNote: string;
}

export const UnknownScene: React.FC<Props> = ({ onComplete }) => {
  const terms: TermEvidence[] = [
    {
      id: 'api',
      name: 'API',
      icon: <Cpu className="w-4 h-4 text-dev-amber-light" />,
      summary: 'A formal protocol allowing software systems to communicate.',
      detail: 'Application Programming Interface. In the early days, it sounded like arcane magic. Ramakrishnan explained it simply: think of it as a reliable messenger that carries your request to another system and brings back the exact response.',
      example: 'GET https://cloud.enterprise.local/api/v1/workflows',
      memoryNote: 'First time hearing it: "Wait, is this a program, a server, or just a URL?"'
    },
    {
      id: 'endpoint',
      name: 'Endpoint',
      icon: <Send className="w-4 h-4 text-dev-blue-light" />,
      summary: 'The exact digital destination URL where a request is routed.',
      detail: 'The designated address representing a specific resource or pipeline action. Each endpoint serves a distinct purpose—from triggering automation to fetching team data.',
      example: '/api/v1/teams/ramakrishnan-krishna-hema/pipeline',
      memoryNote: 'Finding out that endpoints are just organized digital mailboxes.'
    },
    {
      id: 'headers',
      name: 'Headers',
      icon: <Sliders className="w-4 h-4 text-dev-green-light" />,
      summary: 'Metadata transmitted with the request, like content type or credentials.',
      detail: 'The envelope metadata. It informs the receiving gateway who is sending the request, what format the data is in, and proves authentication before touching any logic.',
      example: 'Content-Type: application/json\nAuthorization: Bearer RAMAKRISHNAN_LEAD_KEY',
      memoryNote: 'Learning that forgetting "Content-Type: application/json" breaks everything!'
    },
    {
      id: 'payload',
      name: 'Payload',
      icon: <Layers className="w-4 h-4 text-dev-amber-light" />,
      summary: 'The actual cargo of data being sent or returned.',
      detail: 'The substance of the request. In a POST or PUT request, it carries the records you want to insert or update. In a response, it contains the status or records you requested.',
      example: '{\n  "leadArchitect": "Ramakrishnan",\n  "engineer": "Krishna",\n  "status": "Ready"\n}',
      memoryNote: 'Realizing payload is just the data package inside the truck.'
    },
    {
      id: 'json',
      name: 'JSON',
      icon: <FileJson className="w-4 h-4 text-dev-textBright" />,
      summary: 'A lightweight, human-readable key-value text format.',
      detail: 'JavaScript Object Notation. Clean, nested key-value pairs that replaced clunky XML. Easy to read, quick to parse, and the backbone of modern web and Power Platform integrations.',
      example: '{\n  "mentor": "Ramakrishnan",\n  "developer": "Krishna",\n  "colleague": "Hema"\n}',
      memoryNote: 'From missing commas and quotes to writing clean objects without blinking.'
    }
  ];

  const [inspectedTerms, setInspectedTerms] = useState<string[]>([]);
  const [activeTermId, setActiveTermId] = useState<string>('api');

  const activeTerm = terms.find(t => t.id === activeTermId) || terms[0];

  const handleSelectTerm = (id: string) => {
    soundEffects.click();
    setActiveTermId(id);
    if (!inspectedTerms.includes(id)) {
      setInspectedTerms(prev => [...prev, id]);
      if (inspectedTerms.length + 1 >= terms.length) {
        soundEffects.discovery();
      }
    }
  };

  const hasExploredAll = inspectedTerms.length >= 3;

  const handleProceed = () => {
    soundEffects.success();
    onComplete();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Scene Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl bg-dev-surface border border-dev-border">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-dev-amber-light">
            <span className="w-2 h-2 rounded-full bg-dev-amber"></span>
            <span>SCENE 01 // THE FIRST DAYS IN IT</span>
            <span className="text-dev-border">•</span>
            <span>KRISHNA’S INITIAL ONBOARDING</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-dev-textBright mt-1">
            Deconstructing the Intimidating Words
          </h1>
          <p className="text-sm text-dev-textDim mt-1">
            Back when Krishna was brand new to IT, terms like API, headers, and payloads felt like impenetrable walls. Tap each concept to see how Ramakrishnan helped decode them.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono self-start md:self-auto bg-dev-panel px-3 py-2 rounded-lg border border-dev-border">
          <Terminal className="w-4 h-4 text-dev-textMuted" />
          <span className="text-dev-textMuted">TERMS DECODED:</span>
          <span className="text-dev-amber-light font-bold">{inspectedTerms.length} / {terms.length}</span>
        </div>
      </div>

      {/* Simulated Terminal Warning */}
      <div className="rounded-xl bg-dev-panel/50 border border-dev-border overflow-hidden">
        <div className="px-4 py-2 bg-dev-surface border-b border-dev-border flex items-center justify-between text-xs font-mono text-dev-textMuted">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-3.5 h-3.5 text-dev-amber" />
            <span>TERMINAL_OUTPUT // SYSTEM_STATUS</span>
          </div>
          <span className="text-[11px] text-dev-amber-light">INCOMPLETE_TRACE</span>
        </div>
        <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm space-y-1.5 bg-dev-bg/90">
          <div className="text-dev-red-light font-medium flex items-center space-x-2">
            <span>ERROR: Unexpected state detected</span>
          </div>
          <div className="text-dev-textDim">CONTEXT: Early career learning curve</div>
          <div className="text-dev-textDim">ROOT CAUSE: Unfamiliarity with software architecture</div>
          <div className="text-dev-amber-light font-semibold">NEXT ACTION: Investigate and understand building blocks</div>
        </div>
      </div>

      {/* Evidence Investigation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Selectable Term Evidence Cards */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-mono text-dev-textMuted uppercase tracking-wider px-1 mb-2">
            Select a concept to inspect:
          </div>

          {terms.map(t => {
            const isSelected = t.id === activeTermId;
            const isInspected = inspectedTerms.includes(t.id);

            return (
              <button
                key={t.id}
                onClick={() => handleSelectTerm(t.id)}
                className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-start justify-between ${
                  isSelected
                    ? 'bg-dev-elevated border-dev-amber/60 shadow-md ring-1 ring-dev-amber/30'
                    : isInspected
                    ? 'bg-dev-surface/90 border-dev-border hover:border-dev-borderLight hover:bg-dev-panel'
                    : 'bg-dev-surface/50 border-dev-border/70 hover:border-dev-amber/30 hover:bg-dev-surface'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded bg-dev-panel border border-dev-border shrink-0 mt-0.5">
                    {t.icon}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono font-bold text-dev-textBright">
                        {t.name}
                      </span>
                      {isInspected && (
                        <CheckCircle className="w-3.5 h-3.5 text-dev-green-light shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-dev-textDim mt-0.5 line-clamp-1 font-sans">
                      {t.summary}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-mono text-dev-textMuted shrink-0 pl-2">
                  {isSelected ? 'INSPECTING' : isInspected ? 'DECODED' : 'EXAMINE'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Terminal Inspector */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="h-full rounded-xl bg-dev-surface border border-dev-border p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-dev-border">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded bg-dev-panel border border-dev-border">
                    {activeTerm.icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono text-dev-textMuted uppercase">Term Inspector</span>
                    <h2 className="text-lg font-mono font-bold text-dev-textBright">{activeTerm.name}</h2>
                  </div>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-dev-panel border border-dev-border text-dev-amber-light">
                  STATUS: ANALYZED
                </span>
              </div>

              {/* Definition */}
              <div>
                <h3 className="text-xs font-mono text-dev-textMuted uppercase tracking-wider">
                  Core Meaning
                </h3>
                <p className="text-base text-dev-textBright font-medium mt-1">
                  {activeTerm.summary}
                </p>
              </div>

              {/* Breakdown */}
              <div className="p-4 rounded-lg bg-dev-panel/60 border border-dev-border/70 space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-mono text-dev-textDim">
                  <HelpCircle className="w-3.5 h-3.5 text-dev-amber-light" />
                  <span>How Ramakrishnan Helped Krishna See It</span>
                </div>
                <p className="text-sm text-dev-textMain leading-relaxed font-sans">
                  {activeTerm.detail}
                </p>
                <div className="pt-2 text-xs font-mono text-dev-amber-light/90 italic border-t border-dev-border/40">
                  Memory: “{activeTerm.memoryNote}”
                </div>
              </div>

              {/* Real-world inspection snippet */}
              <div>
                <span className="text-xs font-mono text-dev-textMuted uppercase tracking-wider block mb-1">
                  Real Enterprise Representation
                </span>
                <pre className="p-3 rounded bg-dev-bg border border-dev-border text-xs font-mono text-dev-amber-light/95 overflow-x-auto">
                  <code>{activeTerm.example}</code>
                </pre>
              </div>
            </div>

            {/* Narrative Fragment when explored */}
            {hasExploredAll && (
              <div className="p-4 rounded-lg border border-dev-amber/30 bg-dev-amber/5 animate-fade-in space-y-2">
                <div className="font-mono text-xs text-dev-textMuted space-y-0.5">
                  <div>Initial state: unfamiliar</div>
                  <div>Available tools: limited</div>
                  <div className="text-dev-amber-light">Objective: understand the system</div>
                </div>
                <p className="text-sm font-serif italic text-dev-textBright pt-1">
                  “Every unfamiliar thing looks complicated until you learn how to investigate it.”
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-dev-border">
        <div className="text-xs font-mono text-dev-textMuted">
          {hasExploredAll ? (
            <span className="text-dev-green-light flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" /> Foundational concepts decoded! Clues logged to journal.
            </span>
          ) : (
            <span>Explore at least 3 concepts to proceed.</span>
          )}
        </div>

        <button
          onClick={handleProceed}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-dev-amber text-dev-bg font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-dev-amber-light shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <span>Continue to Scene 2: The Learning Lab</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
