export type Category =
  | 'ALL'
  | 'Workflow Engineering'
  | 'RAG Fundamentals'
  | 'Advanced RAG'
  | 'Autonomous Agents';

export interface LessonModule {
  id: string;
  category: string;
  title: string;
  tags: string[];
  summary: string;
  content: string;
}

export type QuestionType =
  | 'mcq'
  | 'true_false'
  | 'fill_in_the_blank'
  | 'direct'
  | 'code_analysis'
  | 'code_write';

export interface TestQuestion {
  id: string;
  category: string;
  type: QuestionType;
  question: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficultyLevel?: 'Level 1' | 'Level 2';
  difficulty?: 'simple' | 'hard';
}

export type QuestionTypeFilter = 'all' | QuestionType;
export type ActiveMode = 'study' | 'exam';

export interface UserExamProgress {
  mastered: string[];
  saved: string[];
  review: string[];
}

export interface MetricSummary {
  total: number;
  completed: number;
  saved: number;
  review: number;
  percentage: number;
}
