import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  FileText, 
  GitCommit, 
  FileJson, 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  AlertTriangle
} from 'lucide-react';
import { soundEffects } from '../../utils/sound';

interface Props {
  onComplete: () => void;
}

type EvidenceTab = 'logs' | 'payload' | 'validation' | 'git' | 'response';

export const ProductionIncidentScene: React.FC<Props> = ({ onComplete }) => {
  const [activeTab, setActiveTab] = useState<EvidenceTab>('logs');
  const [selectedHypothesis, setSelectedHypothesis] = useState<string | null>(null);
  const [isPatchApplied, setIsPatchApplied] = useState(false);
  const [isRunningVerification, setIsRunningVerification] = useState(false);
  const [isResolved, setIsResolved] = useState(false);

  // Evidence data reflecting real team context (Ramakrishnan, Krishna, Hema)
  const incidentLogs = [
    { time: '10:41:02.104', level: 'INFO', msg: 'Incoming deployment dispatch [ReqId: rq-krishna-solo-01]' },
    { time: '10:41:02.119', level: 'INFO', msg: 'Release payload received for team [Lead: Ramakrishnan, Dev: Krishna, QA: Hema]' },
    { time: '10:41:02.126', level: 'WARN', msg: 'SchemaValidator: Mandatory security token [architectApprovalKey] missing in release contract' },
    { time: '10:41:02.130', level: 'ERROR', msg: 'Deployment rejected: ValidationException(Field "architectApprovalKey" required by Ramakrishnan\'s governance rule)' },
    { time: '10:41:02.131', level: 'INFO', msg: 'Error response returned: HTTP 422 Unprocessable Entity' }
  ];

  const resolvedLogs = [
    { time: '10:45:10.880', level: 'INFO', msg: 'Re-triggering deployment pipeline [ReqId: rq-krishna-solo-02]' },
    { time: '10:45:10.892', level: 'INFO', msg: 'Release payload verified with architectApprovalKey ["APPROVED_BY_RAMAKRISHNAN"]' },
    { time: '10:45:10.898', level: 'INFO', msg: 'SchemaValidator: All 18 enterprise governance checks passed cleanly' },
    { time: '10:45:10.908', level: 'INFO', msg: 'Production cluster synced: Power Platform Enterprise Connector live' },
    { time: '10:45:10.910', level: 'INFO', msg: 'Response returned: HTTP 200 OK — Krishna resolved incident independently without escalating!' }
  ];

  const rawPayload = `{\n  "pipelineId": "PIPE-POWERAPPS-2026",\n  "service": "Enterprise Workflow Connector",\n  "leadArchitect": "Ramakrishnan",\n  "developer": "Krishna",\n  "qaVerifier": "Hema",\n  "releaseVersion": "v3.2.0"\n  /* Missing: "architectApprovalKey" */\n}`;

  const patchedPayload = `{\n  "pipelineId": "PIPE-POWERAPPS-2026",\n  "service": "Enterprise Workflow Connector",\n  "leadArchitect": "Ramakrishnan",\n  "developer": "Krishna",\n  "qaVerifier": "Hema",\n  "releaseVersion": "v3.2.0",\n  "architectApprovalKey": "APPROVED_BY_RAMAKRISHNAN"  // PATCH APPLIED\n}`;

  const validationSchema = `// EnterpriseDeploymentContract (Governance Standard v3.2)
// Authored by: Ramakrishnan (Lead Architect)
export interface EnterpriseDeploymentContract {
  pipelineId: string;
  service: string;
  leadArchitect: "Ramakrishnan";
  developer: "Krishna";
  qaVerifier: "Hema";
  releaseVersion: string;
  architectApprovalKey: string; // MANDATORY: Required to authorize production rollout
}`;

  const gitChangeSummary = `Commit 9a204ba (HEAD -> main, tag: v3.2.0)
Author: Ramakrishnan <lead.architect@enterprise.local>
Date: Today, 08:30 AM
Subject: feat(governance): enforce architectApprovalKey on all solo production dispatches

Diff:
+ if (!payload.architectApprovalKey) {
+   throw new ValidationException('Field "architectApprovalKey" required by Ramakrishnan\\'s governance rule');
+ }`;

  const hypotheses = [
    {
      id: 'h1',
      title: 'Hypothesis 1: Database Connection Pool Exhausted',
      summary: 'PostgreSQL connection pool exhausted causing the deployment transaction to drop.',
      isCorrect: false,
      contradiction: 'Contradicted by evidence: Telemetry shows the request failed inside SchemaValidator within 12ms before touching any database queries. DB pool is 100% idle.'
    },
    {
      id: 'h2',
      title: 'Hypothesis 2: Schema Drift — Missing architectApprovalKey',
      summary: 'Ramakrishnan\'s latest commit 9a204b made architectApprovalKey mandatory, which Krishna\'s initial solo payload omitted.',
      isCorrect: true,
      contradiction: 'Confirmed by evidence: Commit 9a204b by Ramakrishnan explicitly introduced the mandatory architectApprovalKey check. Both the application logs and schema validation rules match.'
    },
    {
      id: 'h3',
      title: 'Hypothesis 3: Cloud Gateway Inbound Timeout',
      summary: 'Azure API Gateway dropped connection due to 30-second timeout threshold.',
      isCorrect: false,
      contradiction: 'Contradicted by evidence: Total round-trip was 27ms, and the server explicitly generated an HTTP 422 Unprocessable Entity payload, not a 504 Gateway Timeout.'
    }
  ];

  const handleSelectHypothesis = (id: string) => {
    setSelectedHypothesis(id);
    soundEffects.click();
    if (id === 'h2') {
      soundEffects.discovery();
    }
  };

  const handleApplyFix = () => {
    setIsPatchApplied(true);
    soundEffects.click();
  };

  const handleRunVerification = () => {
    setIsRunningVerification(true);
    soundEffects.click();

    setTimeout(() => {
      setIsRunningVerification(false);
      setIsResolved(true);
      setActiveTab('logs');
      soundEffects.success();
    }, 1200);
  };

  const handleReset = () => {
    setIsResolved(false);
    setIsPatchApplied(false);
    setSelectedHypothesis(null);
    setActiveTab('logs');
    soundEffects.click();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Incident Banner */}
      <div className={`p-5 rounded-xl border transition-all ${
        isResolved 
          ? 'bg-dev-surface border-dev-green-light/40 shadow-xl' 
          : 'bg-dev-surface border-dev-red-light/40 shadow-xl'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className={`w-2 h-2 rounded-full ${isResolved ? 'bg-dev-green-light' : 'bg-dev-red-light animate-pulse'}`}></span>
              <span className={isResolved ? 'text-dev-green-light font-bold' : 'text-dev-red-light font-bold'}>
                {isResolved ? 'INCIDENT RESOLVED // ZERO ESCALATION NEEDED' : 'CRITICAL PRODUCTION INCIDENT // ACTIVE'}
              </span>
              <span className="text-dev-border">•</span>
              <span className="text-dev-textMuted font-mono">PROD-7701</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-dev-textBright mt-1">
              {isResolved ? 'Root Cause Solved: PowerApps Enterprise Pipeline Live' : 'Investigating Production Pipeline: PowerApps Enterprise Connector'}
            </h1>
            <p className="text-sm text-dev-textDim mt-1">
              {isResolved 
                ? 'Krishna diagnosed schema drift, patched the payload, and verified all 18 regression suites with zero escalation to Ramakrishnan.' 
                : 'Service: Enterprise Connector // Team: Ramakrishnan, Krishna, Hema // Deployer: Krishna // Root cause undetermined. Inspect telemetry and logs.'}
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-dev-panel px-3 py-2 rounded-lg border border-dev-border text-xs font-mono self-start md:self-auto">
            <span className="text-dev-textMuted">STATUS:</span>
            <span className={isResolved ? 'text-dev-green-light font-bold' : 'text-dev-red-light font-bold'}>
              {isResolved ? 'RESOLVED (P1)' : 'BLOCKED (P1)'}
            </span>
          </div>
        </div>
      </div>

      {/* Evidence Investigation Console */}
      <div className="rounded-xl bg-dev-surface border border-dev-border overflow-hidden shadow-2xl">
        {/* Navigation Tabs */}
        <div className="flex border-b border-dev-border bg-dev-panel/40 overflow-x-auto font-mono text-xs">
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-3 border-r border-dev-border transition-colors flex items-center space-x-2 shrink-0 ${
              activeTab === 'logs' ? 'bg-dev-panel text-dev-amber-light font-bold' : 'text-dev-textDim hover:text-dev-textBright'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Application Logs</span>
          </button>

          <button
            onClick={() => setActiveTab('payload')}
            className={`px-4 py-3 border-r border-dev-border transition-colors flex items-center space-x-2 shrink-0 ${
              activeTab === 'payload' ? 'bg-dev-panel text-dev-amber-light font-bold' : 'text-dev-textDim hover:text-dev-textBright'
            }`}
          >
            <FileJson className="w-3.5 h-3.5" />
            <span>Release Payload</span>
          </button>

          <button
            onClick={() => setActiveTab('validation')}
            className={`px-4 py-3 border-r border-dev-border transition-colors flex items-center space-x-2 shrink-0 ${
              activeTab === 'validation' ? 'bg-dev-panel text-dev-amber-light font-bold' : 'text-dev-textDim hover:text-dev-textBright'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ramakrishnan's Validation Rules</span>
          </button>

          <button
            onClick={() => setActiveTab('git')}
            className={`px-4 py-3 border-r border-dev-border transition-colors flex items-center space-x-2 shrink-0 ${
              activeTab === 'git' ? 'bg-dev-panel text-dev-amber-light font-bold' : 'text-dev-textDim hover:text-dev-textBright'
            }`}
          >
            <GitCommit className="w-3.5 h-3.5" />
            <span>Recent Changes</span>
          </button>

          <button
            onClick={() => setActiveTab('response')}
            className={`px-4 py-3 transition-colors flex items-center space-x-2 shrink-0 ${
              activeTab === 'response' ? 'bg-dev-panel text-dev-amber-light font-bold' : 'text-dev-textDim hover:text-dev-textBright'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>HTTP Response</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 bg-dev-bg/90 font-mono text-xs sm:text-sm min-h-[220px]">
          {activeTab === 'logs' && (
            <div className="space-y-2 animate-fade-in">
              <div className="text-xs text-dev-textMuted uppercase tracking-wider mb-2">
                Realtime Stream: pipeline/enterprise-connector:stdout
              </div>
              {(isResolved ? resolvedLogs : incidentLogs).map((l, i) => (
                <div key={i} className="flex items-start space-x-2 sm:space-x-3 text-xs leading-relaxed">
                  <span className="text-dev-textMuted select-none shrink-0">{l.time}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold shrink-0 ${
                    l.level === 'ERROR' ? 'bg-dev-red/20 text-dev-red-light' :
                    l.level === 'WARN' ? 'bg-dev-amber/20 text-dev-amber-light' :
                    'bg-dev-border text-dev-textDim'
                  }`}>
                    {l.level}
                  </span>
                  <span className={l.level === 'ERROR' ? 'text-dev-red-light font-semibold' : l.level === 'WARN' ? 'text-dev-amber-light' : 'text-dev-textBright'}>
                    {l.msg}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'payload' && (
            <div className="space-y-3 animate-fade-in">
              <div className="text-xs text-dev-textMuted uppercase tracking-wider">
                Inbound Deployment Request Body (Krishna's Solo Dispatch)
              </div>
              <pre className="p-4 rounded bg-dev-surface border border-dev-border text-dev-textBright overflow-x-auto leading-relaxed">
                <code>{isPatchApplied ? patchedPayload : rawPayload}</code>
              </pre>
            </div>
          )}

          {activeTab === 'validation' && (
            <div className="space-y-3 animate-fade-in">
              <div className="text-xs text-dev-textMuted uppercase tracking-wider">
                Enterprise Deployment Schema // Authored by Ramakrishnan
              </div>
              <pre className="p-4 rounded bg-dev-surface border border-dev-border text-dev-amber-light/90 overflow-x-auto leading-relaxed">
                <code>{validationSchema}</code>
              </pre>
            </div>
          )}

          {activeTab === 'git' && (
            <div className="space-y-3 animate-fade-in">
              <div className="text-xs text-dev-textMuted uppercase tracking-wider">
                Git Release Log (Latest Governance Deployment)
              </div>
              <pre className="p-4 rounded bg-dev-surface border border-dev-border text-dev-textDim overflow-x-auto leading-relaxed">
                <code>{gitChangeSummary}</code>
              </pre>
            </div>
          )}

          {activeTab === 'response' && (
            <div className="space-y-3 animate-fade-in">
              <div className="text-xs text-dev-textMuted uppercase tracking-wider">
                Gateway Response Payload
              </div>
              <pre className={`p-4 rounded border overflow-x-auto leading-relaxed ${
                isResolved 
                  ? 'bg-dev-green-glow border-dev-green-light/40 text-dev-green-light' 
                  : 'bg-dev-red-glow border-dev-red-light/40 text-dev-red-light'
              }`}>
                <code>{isResolved 
                  ? JSON.stringify({ statusCode: 200, status: "success", message: "Deployment approved. Krishna resolved incident without escalation!", release: "v3.2.0" }, null, 2)
                  : JSON.stringify({ statusCode: 422, error: "Unprocessable Entity", validation: { field: "architectApprovalKey", error: "Required governance token missing from schema v3.2.0" } }, null, 2)
                }</code>
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Root Cause Hypothesis Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-dev-textMuted uppercase tracking-wider">
            Root Cause Hypotheses: Evaluate Against Evidence
          </span>
          {isResolved && (
            <button
              onClick={handleReset}
              className="text-xs font-mono text-dev-amber-light flex items-center space-x-1 hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Incident Investigation</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hypotheses.map(h => {
            const isSelected = selectedHypothesis === h.id;

            return (
              <button
                key={h.id}
                onClick={() => handleSelectHypothesis(h.id)}
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
                    {h.summary}
                  </p>
                </div>

                <div className="text-[11px] font-mono text-dev-textMuted pt-2 border-t border-dev-border/50">
                  {isSelected ? (h.isCorrect ? 'EVIDENCE MATCH' : 'CONTRADICTED') : 'TEST HYPOTHESIS'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Hypothesis Feedback & Interactive Patch Action */}
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
                      <AlertTriangle className="w-5 h-5 text-dev-red-light shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className={`text-xs font-mono font-bold ${currentH.isCorrect ? 'text-dev-green-light' : 'text-dev-red-light'}`}>
                        {currentH.isCorrect ? 'ROOT CAUSE CONFIRMED BY EVIDENCE' : 'HYPOTHESIS CONTRADICTED'}
                      </div>
                      <p className="text-sm text-dev-textMain mt-1 font-sans">
                        {currentH.contradiction}
                      </p>
                    </div>
                  </div>

                  {currentH.isCorrect && !isResolved && (
                    <div className="pt-3 border-t border-dev-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="text-xs font-mono text-dev-textMuted">
                        {!isPatchApplied ? 'Step 1: Patch the client request payload with architectApprovalKey' : 'Step 2: Trigger regression test suite'}
                      </div>

                      {!isPatchApplied ? (
                        <button
                          onClick={handleApplyFix}
                          className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-dev-amber text-dev-bg font-mono font-bold text-xs uppercase tracking-wider hover:bg-dev-amber-light shadow-md transition-all flex items-center justify-center space-x-2"
                        >
                          <Cpu className="w-4 h-4" />
                          <span>Apply Patch: Add architectApprovalKey</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleRunVerification}
                          disabled={isRunningVerification}
                          className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-dev-green-light text-dev-bg font-mono font-bold text-xs uppercase tracking-wider hover:bg-dev-green shadow-md transition-all flex items-center justify-center space-x-2"
                        >
                          <Play className="w-4 h-4 fill-current" />
                          <span>{isRunningVerification ? 'Running Regression Suite...' : 'Verify Fix & Deploy'}</span>
                        </button>
                      )}
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* Resolution Milestone Banner */}
      {isResolved && (
        <div className="p-6 rounded-2xl bg-dev-surface border-2 border-dev-green-light/40 shadow-2xl space-y-5 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-dev-border text-xs font-mono gap-2">
            <span className="text-dev-green-light font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> ROOT CAUSE: CONFIRMED
            </span>
            <span className="text-dev-green-light">FIX: APPLIED</span>
            <span className="text-dev-green-light">REGRESSION CHECK: PASSED (18/18)</span>
            <span className="text-dev-textBright font-semibold">INCIDENT STATUS: RESOLVED</span>
          </div>

          <div className="space-y-2">
            <p className="text-sm sm:text-base text-dev-textMain leading-relaxed font-sans">
              The production incident has been systematically diagnosed and resolved. No panic, no guessing—just evidence collection, careful hypothesis testing, and clean execution. Krishna resolved it independently without needing to escalate to Ramakrishnan.
            </p>
          </div>

          <div className="pt-3 border-t border-dev-border/60">
            <p className="text-base sm:text-lg font-serif italic text-dev-amber-light">
              “You can now walk into something unfamiliar, investigate it, and find your way through.”
            </p>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-dev-border">
        <div className="text-xs font-mono text-dev-textMuted">
          {isResolved ? (
            <span className="text-dev-green-light flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> All technical challenges cleared. Final incident root cause unlocked.
            </span>
          ) : (
            <span>Diagnose and resolve the production failure to reach the final revelation.</span>
          )}
        </div>

        <button
          onClick={() => {
            soundEffects.success();
            onComplete();
          }}
          className="w-full sm:w-auto px-7 py-3 rounded-lg bg-dev-amber text-dev-bg font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-dev-amber-light shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <span>Reveal Final Incident Conclusion</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
