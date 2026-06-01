import { useState, useCallback } from 'react';
import type { GameId, GameState } from '../types';

const INITIAL_STATE: GameState = {
  points: 0,
  played: {
    spin: false,
    scratch: false,
    memory: false,
    whack: false,
    quiz: false,
  },
  currentGame: null,
};

export function useGameState() {
  const [state, setState] = useState<GameState>(INITIAL_STATE);

  const addPoints = useCallback((amount: number) => {
    setState(prev => ({
      ...prev,
      points: prev.points + amount,
    }));
  }, []);

  const markPlayed = useCallback((gameId: GameId) => {
    setState(prev => ({
      ...prev,
      played: { ...prev.played, [gameId]: true },
    }));
  }, []);

  const setCurrentGame = useCallback((gameId: GameId | null) => {
    setState(prev => ({
      ...prev,
      currentGame: gameId,
    }));
  }, []);

  const deductPoints = useCallback((amount: number) => {
    setState(prev => ({
      ...prev,
      points: Math.max(0, prev.points - amount),
    }));
  }, []);

  const resetGame = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    ...state,
    addPoints,
    markPlayed,
    setCurrentGame,
    deductPoints,
    resetGame,
  };
}
