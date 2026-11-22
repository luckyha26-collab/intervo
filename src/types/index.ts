export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type CategoryFocus = 'All-Round' | 'Technical Architecture' | 'Behavioral (STAR)' | 'System Design' | 'Problem Solving';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  targetRole: string;
  createdAt: string;
  password?: string;
  isLoggedIn?: boolean;
}

export interface InterviewQuestion {
  id: number;
  question: string;
  type: 'technical' | 'behavioral' | 'system-design' | 'project-deep-dive';
  contextSnippet?: string;
  expectedKeyPoints: string[];
  hint: string;
}

export interface KeyCompetencyScores {
  technicalDepth: number;
  communication: number;
  problemSolving: number;
  relevance: number;
}

export interface AnswerFeedback {
  score: number; // 1-10
  strengths: string[];
  missingAreas: string[];
  idealAnswerModel: string;
  keyCompetencyScores: KeyCompetencyScores;
  feedbackSummary: string;
  source?: string;
  timestamp: string;
}

export interface QuestionSessionItem {
  question: InterviewQuestion;
  userAnswer: string;
  feedback?: AnswerFeedback;
  timeSpentSeconds: number;
  peerNotes?: string;
  audioRecorded?: boolean;
}

export interface InterviewSession {
  id: string;
  userId: string;
  targetRole: string;
  difficulty: Difficulty;
  categoryFocus: CategoryFocus;
  questionCount: number;
  questions: QuestionSessionItem[];
  overallScore: number;
  overallSummary: string;
  completedAt: string;
  timerPerQuestion: number; // 0 for untimed, else seconds (60, 90, 120)
  isEncrypted?: boolean;
  interviewerPersona: string;
  wasStoppedEarly?: boolean;
}

export interface PeerComment {
  id: string;
  author: string;
  role: string;
  avatar: string;
  text: string;
  timestamp: string;
  type: 'suggestion' | 'praise' | 'critique';
}

export interface SkillPriority {
  skill: string;
  urgency: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  impactScore: string;
  actionItem: string;
}

export interface PredictiveAnalyticsData {
  hiringProbability: number;
  avgScore: number;
  totalSessions: number;
  skillPrioritization: SkillPriority[];
  cohortBenchmark: {
    userPercentile: number;
    cohortAverageScore: number;
    topTenPercentScore: number;
    readinessLevel: string;
  };
  targetRole: string;
}

export interface InterviewerPersona {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  voicePitch: number;
  voiceRate: number;
  tagline: string;
}

// 14. Weakness Detector Types
export interface WeaknessTopic {
  id: string;
  topic: string;
  category: 'System Architecture' | 'Algorithms & Data Structures' | 'Behavioral & Leadership' | 'Database & Storage' | 'DevOps & Reliability' | 'Frontend Performance';
  severity: 'Critical' | 'High' | 'Moderate';
  frequencyDetected: number;
  diagnosis: string;
  suggestedAction: string;
  recoveryProgress: number; // 0 - 100%
  sampleQuestionPrompt: string;
  lastTestedDate?: string;
}

// Group Discussion (GD) Arena Types
export interface GDParticipant {
  id: string;
  name: string;
  avatar: string;
  role: string;
  isSpeaking: boolean;
  isMuted: boolean;
  hasRaisedHand: boolean;
  speakingTimeSec: number;
  isAI?: boolean;
  colorRing?: string;
}

export interface GDMessage {
  id: string;
  senderId: string;
  senderName: string;
  avatar: string;
  text: string;
  timestamp: string;
  type?: 'speech' | 'chat' | 'moderator';
}

export interface GDRoom {
  id: string;
  title: string;
  topicDescription: string;
  category: string;
  moderatorName: string;
  activeSpeakersCount: number;
  participants: GDParticipant[];
  callDurationSec: number;
  isCallActive: boolean;
  inviteCode: string;
}

export interface GDScorecard {
  leadershipScore: number; // 1-10
  clarityScore: number;
  listeningEtiquette: number;
  knowledgeScore: number;
  totalScore: number;
  feedback: string;
  keyPointsSpoken: string[];
  improvements: string[];
}

// 15. Live Coding Interview Arena Types
export type ProgrammingLanguage = 'python' | 'javascript' | 'java' | 'cpp' | 'c' | 'sql';

export type CodingCategory =
  | 'Data Structures and Algorithms'
  | 'Arrays and Strings'
  | 'Searching and Sorting'
  | 'Linked Lists'
  | 'Stack and Queue'
  | 'Trees and Graphs'
  | 'Dynamic Programming'
  | 'Object-Oriented Programming'
  | 'Database and SQL'
  | 'Problem Solving';

export type CodingInterviewMode = 'practice' | 'real' | 'challenge';

export interface CodingTestCase {
  id: number;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  passed?: boolean;
  executionTimeMs?: number;
  memoryMb?: number;
  error?: string;
  isHidden?: boolean;
  description?: string;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: CodingCategory;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  sampleInput: string;
  sampleOutput: string;
  explanation: string;
  expectedTimeComplexity: string;
  expectedSpaceComplexity: string;
  starterCode: Record<ProgrammingLanguage, string>;
  solutionCode?: Record<ProgrammingLanguage, string>;
  solutionExplanation?: string;
  publicTestCases: CodingTestCase[];
  hiddenTestCasesCount?: number;
  tags?: string[];
}

export interface ExecutionResult {
  status: 'accepted' | 'wrong_answer' | 'compile_error' | 'runtime_error' | 'time_limit_exceeded';
  output: string;
  compilationError?: string;
  runtimeError?: string;
  totalTestCases: number;
  passedTestCases: number;
  testResults: CodingTestCase[];
  executionTimeMs: number;
  memoryMb: number;
}

export interface AIInterviewerMessage {
  id: string;
  sender: 'interviewer' | 'candidate';
  text: string;
  timestamp: string;
  suggestedAction?: 'explain_approach' | 'time_complexity' | 'optimize' | 'hint';
  isVoicePlayed?: boolean;
}

export interface CodingEvaluationCategory {
  name: string;
  score: number;
  maxScore: number;
  assessment: string;
}

export interface CodingOptimizationSuggestion {
  problemsInCode: string[];
  inefficientLogic: string[];
  possibleImprovements: string[];
  optimizedApproach: string;
  alternativeAlgorithms: string[];
  timeComplexityComparison: {
    current: string;
    optimized: string;
  };
  spaceComplexityComparison: {
    current: string;
    optimized: string;
  };
  improvedSolutionCode: string;
}

export interface CodingInterviewResult {
  id: string;
  userId: string;
  problem: CodingProblem;
  language: ProgrammingLanguage;
  mode: CodingInterviewMode;
  submittedCode: string;
  executionResult: ExecutionResult;
  overallScore: number; // 0 - 100
  functionalCorrectnessScore: number;
  codeQualityScore: number;
  problemSolvingScore: number;
  optimizationScore: number;
  algorithmKnowledgeScore: number;
  testCasesPassedRate: string;
  averageExecutionTimeMs: number;
  categoryScores: CodingEvaluationCategory[];
  optimizationSuggestions: CodingOptimizationSuggestion;
  strongTopics: string[];
  weakTopics: string[];
  repeatedMistakes: string[];
  recommendedProblems: {
    title: string;
    difficulty: Difficulty;
    category: string;
  }[];
  personalizedSuggestions: string[];
  completedAt: string;
  timeSpentSeconds: number;
  interviewerChat: AIInterviewerMessage[];
  correctSolutionCode?: string;
  mistakesAnalysis?: string[];
  whyCodeFailed?: string;
  userGaveUp?: boolean;
  rank?: number;
}
