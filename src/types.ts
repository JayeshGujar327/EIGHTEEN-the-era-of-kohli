export type ThemeMode = 'all' | 'aggression' | 'discipline' | 'legacy';
export type ColorMode = 'dark' | 'light';

export type CareerFormat = 'TEST' | 'ODI' | 'T20I' | 'IPL' | 'CAPTAINCY';

export interface Milestone {
  id: string;
  year: number;
  date: string;
  title: string;
  subtitle: string;
  category: 'debut' | 'chase' | 'captaincy' | 'comeback' | 'worldcup' | 'record';
  format: CareerFormat;
  opponent: string;
  venue: string;
  score?: string;
  ballsFaced?: number;
  fours?: number;
  sixes?: number;
  strikeRate?: number;
  summary: string;
  context: string;
  significance: string;
  quote?: string;
  theme: 'aggression' | 'discipline' | 'legacy';
  statHighlight?: string;
  iconicShot?: string;
  image: string;
  matchResult: string;
  audioClipType?: 'cheer' | 'bat_crack' | 'heartbeat' | 'roaring';
}

export interface CareerStat {
  format: string;
  matches: number;
  innings: number;
  runs: number;
  average: number;
  strikeRate: number;
  hundreds: number;
  fifties: number;
  highestScore: string;
  notOuts: number;
  fours: number;
  sixes: number;
  catches: number;
  statusLabel?: string;
  statusType?: 'active' | 'retired' | 'total';
}

export interface RecentMatch {
  date: string;
  format: string;
  opponent: string;
  venue: string;
  score: string;
  ballsFaced: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  result: string;
  seriesContext: string;
}

export interface RecentSeries {
  seriesName: string;
  period: string;
  opponent: string;
  matchesPlayed: number;
  totalRuns: number;
  average: number;
  scores: { match: string; score: number; balls: number; notOut?: boolean }[];
  result: string;
}

export interface MilestoneProgress {
  title: string;
  target: number;
  current: number;
  remaining: number;
  unit: string;
  format: string;
  description: string;
}

export interface ChaseStat {
  condition: string;
  innings: number;
  runs: number;
  average: number;
  hundreds: number;
  winPercentage: string;
  notable: string;
}

export interface RecordItem {
  id: string;
  number: string;
  title: string;
  description: string;
  category: 'World Record' | 'All-Time' | 'Unbeaten' | 'Era Defining';
  context: string;
  dateOrEra: string;
  theme: 'aggression' | 'discipline' | 'legacy';
  badge: string;
  verifiedFact: string;
}

export interface QuoteItem {
  id: string;
  quote: string;
  author: string;
  authorRole: string;
  context: string;
  year: string;
  category: 'mindset' | 'rival_praise' | 'legend_verdict' | 'leadership';
  theme: 'aggression' | 'discipline' | 'legacy';
  avatarInitials: string;
}

export interface StoryChapter {
  id: string;
  number: number;
  numStr: string;
  title: string;
  subtitle: string;
  period: string;
  summary: string;
  narration: string[];
  theme: 'aggression' | 'discipline' | 'legacy';
  keyQuote: string;
  quoteAuthor: string;
  heroStat: string;
  heroStatLabel: string;
  accentColor: string;
  bgGradient: string;
  coverImage: string;
}

export interface BrandImpact {
  id: string;
  brand: string;
  sector: string;
  yearStarted: string;
  partnershipType: string;
  philosophy: string;
  impactStory: string;
  statOrFact: string;
}

export interface SimulatorChoice {
  id: string;
  shotName: string;
  description: string;
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  runsScored: number;
  commentary: string;
  audioFeedback: 'crack' | 'cheer' | 'gasp' | 'legendary';
  isCorrectMasterChoice: boolean;
  viratMindsetNote: string;
}

export interface SimulatorStep {
  stepNumber: number;
  ballsLeft: number;
  runsNeeded: number;
  bowler: string;
  ballType: string;
  bowlerSpeed: string;
  situationContext: string;
  choices: SimulatorChoice[];
}

export interface SimulatorScenario {
  id: string;
  title: string;
  match: string;
  date: string;
  venue: string;
  context: string;
  targetRuns: number;
  initialScore: string;
  steps: SimulatorStep[];
}

export interface EraItem {
  year: number;
  title: string;
  subtitle: string;
  theme: 'aggression' | 'discipline' | 'legacy';
  description: string;
  majorAchievement: string;
  keyStatistic: string;
  iconicMoment: string;
  matchScorecard?: string;
  image: string;
}

export interface EvolutionStage {
  year: number;
  age: number;
  phase: string;
  title: string;
  weightFitness: string;
  dietMindset: string;
  battingRole: string;
  keyStatsSummary: string;
  definingVisual: string;
  eraQuote: string;
}

export interface LegendComparisonFormatStats {
  matches: number;
  runs: number;
  average: number;
  strikeRate: number;
  hundreds: number;
  fifties: number;
  highestScore: string;
}

export interface LegendProfile {
  id: string;
  name: string;
  country: string;
  era: string;
  avatar: string;
  formats: {
    ODI?: LegendComparisonFormatStats;
    TEST?: LegendComparisonFormatStats;
    T20I?: LegendComparisonFormatStats;
    IPL?: LegendComparisonFormatStats;
  };
  headlineFeats: string[];
}

export interface CinematicMoment {
  id: string;
  title: string;
  match: string;
  score: string;
  opponent: string;
  venue: string;
  date: string;
  format: string;
  stage1Situation: string;
  stage2Pressure: string;
  stage3Entry: string;
  stage4TurningPoint: string;
  stage5Result: string;
  stage6WhyItMattered: string;
  iconicQuote: string;
  auraScore: number;
  image: string;
}

export interface FanMemory {
  id: string;
  momentTitle: string;
  opponent: string;
  year: number;
  memoryText: string;
  authorName: string;
  createdAt: string;
}

export interface GuessInningsItem {
  id: string;
  clues: {
    score: string;
    balls: number;
    fours: number;
    sixes: number;
    strikeRate: number;
    tournamentOrSeries: string;
    keyContextClue: string;
  };
  options: {
    id: string;
    matchTitle: string;
    opponent: string;
    year: number;
    venue: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  fullScorecardSummary: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'records' | 'chases' | 'captaincy' | 'personal' | 'worldcup';
}

export interface IndiaXIPlayer {
  id: string;
  name: string;
  role: 'OPENER' | 'MIDDLE_ORDER' | 'ALL_ROUNDER' | 'WICKET_KEEPER' | 'PACER' | 'SPINNER';
  era: string;
  isCaptainChoice?: boolean;
  specialSkill: string;
}

export interface WhatIfScenario {
  id: string;
  title: string;
  description: string;
  matchesToPlay: number;
  format: 'ODI';
  assumptions: {
    conservative: { avgRunsPerInnings: number; tonEveryInnings: number };
    average: { avgRunsPerInnings: number; tonEveryInnings: number };
    peak: { avgRunsPerInnings: number; tonEveryInnings: number };
  };
}

export interface UnlockBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'journey' | 'stats' | 'records' | 'play' | 'scholar' | 'king';
}

export interface MemoryItem {
  id: string;
  year: number;
  title: string;
  category: string;
  format?: string;
  scoreOrDetail?: string;
  opponent?: string;
  venue?: string;
  description: string;
  stats?: string;
  image: string;
  quote?: string;
  theme: ThemeMode;
}

export interface FanCardData {
  fanName: string;
  fanLevel: 'CASUAL VIEWER' | 'KOHLI FAN' | 'DIE-HARD 18' | 'KING CERTIFIED 👑';
  favoriteEra: string;
  quizScore: number;
  favoriteMoment: string;
  auraScore: number;
  badgeCount: number;
}


