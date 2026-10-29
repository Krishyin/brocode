export type SceneId = 
  | 'boot'
  | 'unknown'
  | 'learningLab'
  | 'updateVsUpdateIf'
  | 'apiLabyrinth'
  | 'productionIncident'
  | 'birthdayReveal';

export interface JournalEntry {
  id: string;
  sceneId: SceneId;
  caseRef: string;
  title: string;
  timestamp: string;
  technicalConcept: string;
  discovery: string;
  quote: string;
}

export interface TermDetail {
  id: string;
  term: string;
  pronunciation?: string;
  definition: string;
  analogy: string;
  sampleCode?: string;
  investigated: boolean;
}

export interface EmployeeRecord {
  id: number;
  name: string;
  department: string;
  status: string;
}
