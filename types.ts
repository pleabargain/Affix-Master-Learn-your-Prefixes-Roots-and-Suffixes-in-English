
export enum CEFRLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2'
}

export type AffixType = 'prefix' | 'root' | 'suffix' | 'all';

export interface Example {
  word: string;
  sentence: string;
}

export interface WordPart {
  id: string;
  type: Exclude<AffixType, 'all'>;
  value: string;
  meaning: string;
  origin: string;
  trivia: string;
  examples: Example[];
  cefr: CEFRLevel[];
}

export interface QuizQuestion {
  id: string;
  type: 'meaning-match' | 'word-building' | 'definition-deduction' | 'fill-blank';
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface SessionConfig {
  type: AffixType;
  limit: number;
}

export type AppView = 'home' | 'trainer' | 'flashcards' | 'quizzer' | 'results';
