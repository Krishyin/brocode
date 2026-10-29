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
}

export const UnknownScene: React.FC<Props> = ({ onComplete }) => {
  const terms: TermEvidence[] = [
    {
      id: 'api',
      name: 'API',
      icon: <Cpu className="w-4 h-4 text-dev-amber-light" />,
      summary: 'A way for two software systems to communicate.',
      detail: 'Application Programming Interface. Think of it as a formal contract or a messenger between two applications—letting one ask for information and the other deliver it reliably.',
      example: 'GET https://service.local/api/v1/status'
    },
    {
      id: 'endpoint',
      name: 'Endpoint',
      icon: <Send className="w-4 h-4 text-dev-blue-light" />,
      summary: 'The specific address where a request is sent.',
      detail: 'The exact digital location or URL representing a specific resource or action within the API.',
      example: '/api/v1/patients/PT-9042'
    },
    {
      id: 'headers',
      name: 'Headers',
      icon: <Sliders className="w-4 h-4 text-dev-green-light" />,
      summary: 'Additional information sent with a request, such as the content type or authorization details.',
      detail: 'Metadata transmitted alongside the main message—specifying who is making the request, what format the data is in, and security credentials.',
      example: 'Content-Type: application/json\nAuthorization: Bearer DEMO_TOKEN'
    },
    {
      id: 'payload',
      name: 'Payload',
      icon: <Layers className="w-4 h-4 text-dev-amber-light" />,
      summary: 'The data being sent or received.',
      detail: 'The actual cargo of the message. In a POST request, it is what you are creating or updating; in a response, it is the result returned to you.',
      example: '{\n  "patientId": "PT-9042",\n  "status": "Admitted"\n}'
    },
    {
      id: 'json',
      name: 'JSON',
      icon: <FileJson className="w-4 h-4 text-dev-textBright" />,
      summary: 'A structured text format commonly used to represent data.',
      detail: 'JavaScript Object Notation. A universally readable, key-value text format that humans can inspect and computers can parse in milliseconds.',
      example: '{ "name": "Ramakrishnan", "role": "Senior Engineer" }'
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

  const hasExploredAll = inspectedTerms.length >= 3; // Allow continuing after exploring key clues or all

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
            <span>SCENE 01 // THE UNKNOWN</span>
            <span className="text-dev-border">•</span>
            <span>PHASE: INITIAL CONFUSION TO STRUCTURE</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-dev-textBright mt-1">
            Deconstructing the Intimidating Words
          </h1>
          <p className="text-sm text-dev-textDim mt-1">
            When you first start, technical terms sound like impenetrable barriers. Inspect each term below to decode its function.
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
          <div className="text-dev-textDim">CONTEXT: Incomplete</div>
          <div className="text-dev-textDim">ROOT CAUSE: Unknown</div>
          <div className="text-dev-amber-light font-semibold">NEXT ACTION: Investigate unfamiliar components</div>
        </div>
      </div>

      {/* Evidence Investigation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Selectable Term Evidence Cards */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-mono text-dev-textMuted uppercase tracking-wider px-1 mb-2">
            Select an evidence artifact to analyze:
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
                  <span>How Krishna Learned to See It</span>
                </div>
                <p className="text-sm text-dev-textMain leading-relaxed font-sans">
                  {activeTerm.detail}
                </p>
              </div>

              {/* Real-world inspection snippet */}
              <div>
                <span className="text-xs font-mono text-dev-textMuted uppercase tracking-wider block mb-1">
                  Live Technical Representation
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
              <CheckCircle className="w-3.5 h-3.5" /> Clues documented in evidence log.
            </span>
          ) : (
            <span>Explore at least 3 terms to establish baseline understanding.</span>
          )}
        </div>

        <button
          onClick={handleProceed}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-dev-amber text-dev-bg font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-dev-amber-light shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <span>Continue to Scene 2: Learning Lab</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
