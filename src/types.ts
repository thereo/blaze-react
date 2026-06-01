export type GameId = 'spin' | 'scratch' | 'memory' | 'whack' | 'quiz';

export interface GameState {
  points: number;
  played: Record<GameId, boolean>;
  currentGame: GameId | null;
}

export interface Prize {
  id: number;
  icon: string;
  name: string;
  cost: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface SpinSegment {
  label: string;
  value: number;
  color: string;
}

export interface ScratchPrize {
  icon: string;
  name: string;
  value: number;
}
