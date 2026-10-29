import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  AlertCircle,
  Sliders,
  FileJson,
  ShieldCheck
} from 'lucide-react';
import { soundEffects } from '../../utils/sound';

interface Props {
  onComplete: () => void;
}

interface FaultHypothesis {
  id: string;
  title: string;
  description: string;
  isCorrect: boolean;
  feedback: string;
}

export const ApiLabyrinthScene: React.FC<Props> = ({ onComplete }) => {
  const [selectedHypothesis, setSelectedHypothesis] = useState<string | null>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [activeTab, setActiveTab] = useState<'headers' | 'body' | 'response'>('headers');

  const requestMethod = 'POST';
  const requestEndpoint = '/api/patients';
  const currentContentType = isFixed ? 'application/json' : 'text/plain';
  const authHeader = 'Bearer DEMO_TOKEN_7781';

  const requestBodyJson = `{\n  "name": "Sample Patient",\n  "department": "General Medicine"\n}`;

  const hypotheses: FaultHypothesis[] = [
    {
      id: 'h-url',
      title: 'Fault: The endpoint URL route is inactive',
      description: 'Check if /api/patients is misconfigured on the routing table.',
      isCorrect: false,
      feedback: 'Evidence contradiction: The gateway accepted the route /api/patients and reached the controller. The error was generated inside the controller.'
    },
    {
      id: 'h-auth',
      title: 'Fault: Authorization bearer token is expired',
      description: 'Check if Bearer DEMO_TOKEN_7781 was rejected by security middleware.',
      isCorrect: false,
      feedback: 'Evidence contradiction: The server returned HTTP 415 (Unsupported Media Type), not HTTP 401 Unauthorized. The token is valid.'
    },
    {
      id: 'h-header',
      title: 'Fault: Content-Type header mismatch',
      description: 'The body contains formatted JSON, but Content-Type is declared as text/plain.',
      isCorrect: true,
      feedback: 'Root cause identified! The body contains structured JSON, but the request was sent with "Content-Type: text/plain". The server cannot deserialize it into a patient object without the proper MIME type header.'
    }
  ];

  const handleSelectHypothesis = (h: FaultHypothesis) => {
    setSelectedHypothesis(h.id);
    soundEffects.click();
    if (h.isCorrect) {
      soundEffects.discovery();
    }
  };

  const handleApplyFix = () => {
    setIsFixed(true);
    setActiveTab('response');
    soundEffects.success();
  };

  const handleReset = () => {
    setIsFixed(false);
    setSelectedHypothesis(null);
    setActiveTab('headers');
    soundEffects.click();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl bg-dev-surface border border-dev-border">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-dev-amber-light">
            <span className="w-2 h-2 rounded-full bg-dev-amber"></span>
            <span>SCENE 04 // THE API LABYRINTH</span>
            <span className="text-dev-border">•</span>
            <span>HTTP REQUEST & PROTOCOL INSPECTOR</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-dev-textBright mt-1">
            Demystifying the HTTP Inspector
          </h1>
          <p className="text-sm text-dev-textDim mt-1">
            Words that once sounded formidable—endpoints, payloads, headers, status codes—are now clear architectural levers.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono bg-dev-panel px-3 py-1.5 rounded-lg border border-dev-border">
          <span className="text-dev-textMuted">SIMULATED PROTOCOL:</span>
          <span className="text-dev-amber-light font-bold">HTTP/1.1 REST</span>
        </div>
      </div>

      {/* HTTP Inspector Console */}
      <div className="rounded-xl bg-dev-surface border border-dev-border overflow-hidden shadow-2xl">
        {/* URL Bar */}
        <div className="p-4 bg-dev-panel border-b border-dev-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center space-x-2 flex-1">
            <span className="px-2.5 py-1 rounded bg-dev-amber/20 text-dev-amber-light font-bold">
              {requestMethod}
            </span>
            <div className="px-3 py-1 rounded bg-dev-bg border border-dev-border text-dev-textBright flex-1 flex items-center justify-between">
              <span>https://api.internal.hospital.local{requestEndpoint}</span>
              <span className="text-[11px] text-dev-textMuted hidden md:inline">DEMO_SANDBOX</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className={`px-2.5 py-1 rounded font-bold flex items-center gap-1.5 ${
              isFixed 
                ? 'bg-dev-green/20 text-dev-green-light border border-dev-green/40' 
                : 'bg-dev-red/20 text-dev-red-light border border-dev-red/40'
            }`}>
              {isFixed ? '200 OK' : '415 Unsupported Media Type'}
            </span>
          </div>
        </div>

        {/* Tab Headers */}
        <div className="flex border-b border-dev-border bg-dev-surface font-mono text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('headers')}
            className={`px-4 sm:px-5 py-3 border-r border-dev-border transition-colors flex items-center space-x-2 shrink-0 ${
              activeTab === 'headers' ? 'bg-dev-panel text-dev-amber-light font-bold' : 'text-dev-textDim hover:text-dev-textBright'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Headers (2)</span>
            {!isFixed && <span className="w-2 h-2 rounded-full bg-dev-red animate-pulse"></span>}
          </button>

          <button
            onClick={() => setActiveTab('body')}
            className={`px-4 sm:px-5 py-3 border-r border-dev-border transition-colors flex items-center space-x-2 shrink-0 ${
              activeTab === 'body' ? 'bg-dev-panel text-dev-amber-light font-bold' : 'text-dev-textDim hover:text-dev-textBright'
            }`}
          >
            <FileJson className="w-3.5 h-3.5" />
            <span>Payload Body (JSON)</span>
          </button>

          <button
            onClick={() => setActiveTab('response')}
            className={`px-4 sm:px-5 py-3 transition-colors flex items-center space-x-2 shrink-0 ${
              activeTab === 'response' ? 'bg-dev-panel text-dev-amber-light font-bold' : 'text-dev-textDim hover:text-dev-textBright'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Response Trace</span>
          </button>
        </div>

        {/* Tab Content Panes */}
        <div className="p-6 bg-dev-bg/80 font-mono text-xs sm:text-sm min-h-[220px]">
          {activeTab === 'headers' && (
            <div className="space-y-3 animate-fade-in">
              <div className="text-xs text-dev-textMuted uppercase tracking-wider mb-2">
                Request Headers (Metadata transmitted with payload)
              </div>

              <div className="p-3 rounded bg-dev-surface border border-dev-border flex items-center justify-between">
                <div>
                  <span className="text-dev-textMuted">Authorization: </span>
                  <span className="text-dev-textBright">{authHeader}</span>
                </div>
                <span className="text-[11px] text-dev-green-light">VALID</span>
              </div>

              <div className={`p-3 rounded border flex items-center justify-between ${
                isFixed 
                  ? 'bg-dev-green-glow border-dev-green-light/40 text-dev-green-light' 
                  : 'bg-dev-red-glow border-dev-red-light/40 text-dev-red-light'
              }`}>
                <div>
                  <span className="text-dev-textMuted">Content-Type: </span>
                  <span className="font-bold">{currentContentType}</span>
                  {!isFixed && (
                    <span className="ml-2 text-xs text-dev-red-light block sm:inline">
                      &larr; Conflict: Sending JSON with text/plain header!
                    </span>
                  )}
                </div>
                <span className={`text-[11px] font-bold ${isFixed ? 'text-dev-green-light' : 'text-dev-red-light'}`}>
                  {isFixed ? 'PATCHED' : 'INVALID'}
                </span>
              </div>
            </div>
          )}

          {activeTab === 'body' && (
            <div className="space-y-3 animate-fade-in">
              <div className="text-xs text-dev-textMuted uppercase tracking-wider">
                Request JSON Body (Data Payload)
              </div>
              <pre className="p-4 rounded bg-dev-surface border border-dev-border text-dev-textBright overflow-x-auto leading-relaxed">
                <code>{requestBodyJson}</code>
              </pre>
            </div>
          )}

          {activeTab === 'response' && (
            <div className="space-y-3 animate-fade-in">
              <div className="text-xs text-dev-textMuted uppercase tracking-wider flex items-center justify-between">
                <span>Server Response Body</span>
                <span className={isFixed ? 'text-dev-green-light' : 'text-dev-red-light'}>
                  {isFixed ? 'Status: 200 OK' : 'Status: 415 Unsupported Media Type'}
                </span>
              </div>

              {isFixed ? (
                <pre className="p-4 rounded bg-dev-green-glow border border-dev-green-light/40 text-dev-green-light overflow-x-auto leading-relaxed">
                  <code>{JSON.stringify({
                    status: "success",
                    statusCode: 200,
                    message: "Patient record registered successfully",
                    patientId: "PT-9042",
                    timestamp: "2026-10-29T07:44:00Z"
                  }, null, 2)}</code>
                </pre>
              ) : (
                <pre className="p-4 rounded bg-dev-red-glow border border-dev-red-light/40 text-dev-red-light overflow-x-auto leading-relaxed">
                  <code>{JSON.stringify({
                    error: "Unsupported Media Type",
                    statusCode: 415,
                    message: "Server expected Content-Type 'application/json' to parse payload, but received 'text/plain'. Aborting deserialization."
                  }, null, 2)}</code>
                </pre>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Fault Investigation & Repair Panel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-dev-textMuted uppercase tracking-wider">
            Hypothesis Selection: Diagnose the 415 error
          </span>
          {isFixed && (
            <button
              onClick={handleReset}
              className="text-xs font-mono text-dev-amber-light flex items-center space-x-1 hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Inspector</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hypotheses.map(h => {
            const isSelected = selectedHypothesis === h.id;

            return (
              <button
                key={h.id}
                onClick={() => handleSelectHypothesis(h)}
                className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? h.isCorrect
                      ? 'bg-dev-surface border-dev-green-light ring-1 ring-dev-green-light/40 shadow-lg'
                      : 'bg-dev-surface border-dev-red-light ring-1 ring-dev-red-light/40'
                    : 'bg-dev-surface/80 border-dev-border hover:border-dev-borderLight'
                }`}
              >
                <div>
                  <div className="text-xs font-mono font-bold text-dev-textBright">
                    {h.title}
                  </div>
                  <p className="text-xs text-dev-textDim mt-1.5 font-sans">
                    {h.description}
                  </p>
                </div>

                <div className="text-[11px] font-mono text-dev-textMuted pt-2 border-t border-dev-border/50">
                  {isSelected ? (h.isCorrect ? 'VALID HYPOTHESIS' : 'CONTRADICTED') : 'INSPECT EVIDENCE'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Hypothesis Feedback & Action */}
        {selectedHypothesis && (
          <div className="p-5 rounded-xl bg-dev-surface border border-dev-border space-y-4 animate-fade-in">
            {(() => {
              const currentH = hypotheses.find(h => h.id === selectedHypothesis);
              if (!currentH) return null;

              return (
                <>
                  <div className="flex items-start space-x-3">
                    {currentH.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-dev-green-light shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-dev-red-light shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className={`text-xs font-mono font-bold ${currentH.isCorrect ? 'text-dev-green-light' : 'text-dev-red-light'}`}>
                        {currentH.isCorrect ? 'HYPOTHESIS CONFIRMED' : 'HYPOTHESIS RULED OUT'}
                      </div>
                      <p className="text-sm text-dev-textMain mt-1 font-sans">
                        {currentH.feedback}
                      </p>
                    </div>
                  </div>

                  {currentH.isCorrect && !isFixed && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleApplyFix}
                        className="px-5 py-2.5 rounded-lg bg-dev-green-light text-dev-bg font-mono font-bold text-xs uppercase tracking-wider hover:bg-dev-green shadow-lg flex items-center space-x-2 transition-all hover:scale-[1.01]"
                      >
                        <Sliders className="w-4 h-4" />
                        <span>Patch Header: Set Content-Type: application/json</span>
                      </button>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* Success Resolution Banner */}
      {isFixed && (
        <div className="p-6 rounded-2xl bg-dev-surface border-2 border-dev-green-light/40 shadow-2xl space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-dev-border text-xs font-mono">
            <span className="text-dev-green-light font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> REQUEST: VALID
            </span>
            <span className="text-dev-green-light">RESPONSE: 200 OK</span>
            <span className="text-dev-amber-light">ROOT CAUSE: IDENTIFIED</span>
          </div>

          <div className="font-mono text-xs text-dev-textDim space-y-1">
            <div>MIME Contract: Validated</div>
            <div>Server Deserializer: Executed in 14ms</div>
            <div className="text-dev-textBright font-semibold">
              Patient #PT-9042 successfully registered in simulated hospital database.
            </div>
          </div>

          <div className="pt-3 border-t border-dev-border/60">
            <p className="text-base font-serif italic text-dev-amber-light">
              “The words that once looked intimidating became tools you could use.”
            </p>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-dev-border">
        <div className="text-xs font-mono text-dev-textMuted">
          {isFixed ? (
            <span className="text-dev-green-light flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Request contract repaired. Evidence stored in journal.
            </span>
          ) : (
            <span>Diagnose and patch the Content-Type header to resolve the request.</span>
          )}
        </div>

        <button
          onClick={() => {
            soundEffects.success();
            onComplete();
          }}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-dev-amber text-dev-bg font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-dev-amber-light shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <span>Continue to Scene 5: Production Incident</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
