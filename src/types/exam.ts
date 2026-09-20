export interface Question {
  id: string;
  category: string;
  question: string;
  tags: string[];
  answer: string;
}

export type StatusFilter = 'ALL' | 'MASTERED' | 'REVIEW' | 'SAVED';

export interface UserProgress {
  mastered: string[];
  review: string[];
  saved: string[];
}

export interface MetricCounts {
  all: number;
  mastered: number;
  review: number;
  saved: number;
  readinessPercentage: number;
}
