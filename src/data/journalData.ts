import { JournalEntry } from '../types';

export const INITIAL_JOURNAL_ENTRIES: Record<string, JournalEntry> = {
  unknown: {
    id: 'entry-01',
    sceneId: 'unknown',
    caseRef: 'EVD-01 // EARLY-DAYS',
    title: 'Deconstructing the IT Vocabulary',
    timestamp: 'Phase 1 - First Days with Ramakrishnan',
    technicalConcept: 'API, Endpoint, Headers, Payload, JSON',
    discovery: 'Unfamiliar engineering terms felt like impenetrable walls. Ramakrishnan encouraged breaking them down systematically—now they are daily tools.',
    quote: '“Every unfamiliar thing looks complicated until you learn how to investigate it.”'
  },
  learningLab: {
    id: 'entry-02',
    sceneId: 'learningLab',
    caseRef: 'EVD-02 // POWERAPPS-RUNTIME',
    title: 'Cross-Screen State Navigation',
    timestamp: 'Phase 2 - Learning Lab Trace',
    technicalConcept: 'Navigate() Screen Context vs Global Set()',
    discovery: 'Passed screen context cleanly from Krishna to Ramakrishnan using Navigate third argument. State is scoped cleanly without cluttering global memory.',
    quote: '“The answer matters. Learning how to find it matters even more.”'
  },
  updateVsUpdateIf: {
    id: 'entry-03',
    sceneId: 'updateVsUpdateIf',
    caseRef: 'EVD-03 // PERSISTENT-INSIDE-JOKE',
    title: 'The Distinction That Stuck',
    timestamp: 'Phase 3 - Shared Team Memory',
    technicalConcept: 'Update() [Exact Record Target] vs UpdateIf() [Predicate Filter]',
    discovery: 'Updated Krishna’s status using Update(LookUp()) and the IT team using UpdateIf(Department="IT"). The difference is crystal clear now!',
    quote: '“Same question. Different day. Better answer.”'
  },
  apiLabyrinth: {
    id: 'entry-04',
    sceneId: 'apiLabyrinth',
    caseRef: 'EVD-04 // PROTOCOL-MASTERY',
    title: 'The Enterprise Deployment Contract',
    timestamp: 'Phase 4 - API Pipeline Repair',
    technicalConcept: 'HTTP Headers & Content Negotiation (Content-Type: application/json)',
    discovery: 'Diagnosed a 415 error on the Enterprise Automation Gateway by patching the Content-Type header. Ramakrishnan’s pipeline validated successfully.',
    quote: '“The words that once looked intimidating became tools you could use.”'
  },
  productionIncident: {
    id: 'entry-05',
    sceneId: 'productionIncident',
    caseRef: 'EVD-05 // INDEPENDENT-ENGINEER',
    title: 'Navigating Production Unassisted',
    timestamp: 'Phase 5 - Incident Post-Mortem',
    technicalConcept: 'Schema Drift & Strict Governance in Complex Pipelines',
    discovery: 'Investigated PROD-7701 solo: identified missing architectApprovalKey required by Ramakrishnan’s release standard, patched payload, and cleared all 18 regression suites.',
    quote: '“You can now walk into something unfamiliar, investigate it, and find your way through.”'
  }
};
