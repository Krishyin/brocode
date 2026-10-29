import { JournalEntry } from '../types';

export const INITIAL_JOURNAL_ENTRIES: Record<string, JournalEntry> = {
  unknown: {
    id: 'entry-01',
    sceneId: 'unknown',
    caseRef: 'EVD-01 // TAXONOMY',
    title: 'Deconstructing the Vocabulary',
    timestamp: 'Phase 1 - Investigation Log',
    technicalConcept: 'API, Endpoint, Headers, Payload, JSON',
    discovery: 'Unfamiliar engineering terms are not barriers—they are modular components with precise roles. Once broken down, the mystery dissolves.',
    quote: '“Every unfamiliar thing looks complicated until you learn how to investigate it.”'
  },
  learningLab: {
    id: 'entry-02',
    sceneId: 'learningLab',
    caseRef: 'EVD-02 // CONTEXT-FLOW',
    title: 'Cross-Screen State Transfer',
    timestamp: 'Phase 2 - Runtime Trace',
    technicalConcept: 'Power Apps Navigate() Context Passing vs Global Set()',
    discovery: 'Passed screen context cleanly using Navigate third argument. State does not have to be scattered globally when local scope is intentional.',
    quote: '“The answer matters. Learning how to find it matters even more.”'
  },
  updateVsUpdateIf: {
    id: 'entry-03',
    sceneId: 'updateVsUpdateIf',
    caseRef: 'EVD-03 // PERSISTENCE-ARCHIVE',
    title: 'The Distinction That Stuck',
    timestamp: 'Phase 3 - Early Memories',
    technicalConcept: 'Update() [Exact Record Target] vs UpdateIf() [Predicate Filter]',
    discovery: 'Update replaces an exact targeted record found by reference. UpdateIf updates matching fields across all rows matching a condition. No more mixing them up.',
    quote: '“Same question. Different day. Better answer.”'
  },
  apiLabyrinth: {
    id: 'entry-04',
    sceneId: 'apiLabyrinth',
    caseRef: 'EVD-04 // CONTRACT-VALIDATION',
    title: 'The Anatomy of a Request',
    timestamp: 'Phase 4 - Inspector Findings',
    technicalConcept: 'HTTP Headers & Content Negotiation (Content-Type: application/json)',
    discovery: 'Diagnosed a 415 error by identifying mismatch between structured JSON payload and plain text Content-Type header. The protocol became transparent.',
    quote: '“The words that once looked intimidating became tools you could use.”'
  },
  productionIncident: {
    id: 'entry-05',
    sceneId: 'productionIncident',
    caseRef: 'EVD-05 // ROOT-CAUSE-CONFIRMED',
    title: 'Navigating Production Unassisted',
    timestamp: 'Phase 5 - Incident Post-Mortem',
    technicalConcept: 'Schema Drift & Strict Validation Failure in Complex Systems',
    discovery: 'Correlated application logs, commit history, and runtime payload to pinpoint missing contactEmail required by v2.4.1. Applied fix and verified regression pass.',
    quote: '“You can now walk into something unfamiliar, investigate it, and find your way through.”'
  }
};
