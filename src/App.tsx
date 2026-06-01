import { useState, useCallback } from 'react';
import { useGameState } from './hooks/useGameState';
import type { GameId } from './types';
import Header from './components/Header';
import ScoreStrip from './components/ScoreStrip';
import GameMenu from './components/GameMenu';
import PrizeShop from './components/PrizeShop';
import SpinWheel from './components/SpinWheel';
import ScratchCard from './components/ScratchCard';
import MemoryGame from './components/MemoryGame';
import WhackAMole from './components/WhackAMole';
import QuizGame from './components/QuizGame';
import Modal from './components/Modal';

interface ModalState {
  isOpen: boolean;
  icon: string;
  title: string;
  subtitle: string;
  points: number;
  isGreen?: boolean;
}

export default function App() {
  const gameState = useGameState();
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    icon: '',
    title: '',
    subtitle: '',
    points: 0,
  });

  const showModal = useCallback((icon: string, title: string, subtitle: string, points: number, isGreen?: boolean) => {
    setModal({ isOpen: true, icon, title, subtitle, points, isGreen });
    if (points > 0) {
      gameState.addPoints(points);
    }
  }, [gameState]);

  const closeModal = useCallback(() => {
    setModal(prev => ({ ...prev, isOpen: false }));
  }, []);

  const handleGameSelect = useCallback((gameId: GameId) => {
    gameState.setCurrentGame(gameId);
  }, [gameState]);

  const handleBack = useCallback(() => {
    gameState.setCurrentGame(null);
  }, [gameState]);

  const handleRedeem = useCallback((cost: number, prizeName: string) => {
    if (gameState.points < cost) {
      showModal('!', 'INSUFFICIENT POINTS', `You need ${cost} pts. Keep playing!`, 0);
      return false;
    }
    gameState.deductPoints(cost);
    const code = 'BLZ-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    showModal('*', 'REDEEMED', `${prizeName} claimed - Code: ${code}`, 0, true);
    return true;
  }, [gameState, showModal]);

  const renderCurrentGame = () => {
    switch (gameState.currentGame) {
      case 'spin':
        return <SpinWheel onBack={handleBack} onReward={showModal} isPlayed={gameState.played.spin} onPlayed={() => gameState.markPlayed('spin')} />;
      case 'scratch':
        return <ScratchCard onBack={handleBack} onReward={showModal} isPlayed={gameState.played.scratch} onPlayed={() => gameState.markPlayed('scratch')} />;
      case 'memory':
        return <MemoryGame onBack={handleBack} onReward={showModal} isPlayed={gameState.played.memory} onPlayed={() => gameState.markPlayed('memory')} />;
      case 'whack':
        return <WhackAMole onBack={handleBack} onReward={showModal} isPlayed={gameState.played.whack} onPlayed={() => gameState.markPlayed('whack')} />;
      case 'quiz':
        return <QuizGame onBack={handleBack} onReward={showModal} isPlayed={gameState.played.quiz} onPlayed={() => gameState.markPlayed('quiz')} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative z-10 min-h-screen">
      <div className="max-w-[720px] mx-auto px-4 pb-10">
        <Header />
        <ScoreStrip points={gameState.points} played={gameState.played} />
        
        {gameState.currentGame === null ? (
          <>
            <GameMenu onSelect={handleGameSelect} played={gameState.played} />
            <PrizeShop points={gameState.points} onRedeem={handleRedeem} />
            
            {/* Portfolio watermark */}
            <div className="mt-7 p-4 border border-blaze-border rounded flex items-center gap-3">
              <div className="text-2xl font-black-ops text-blaze-fire">/</div>
              <div>
                <div className="font-barlow-condensed text-xs font-bold tracking-[2px] text-blaze-fire uppercase">
                  Portfolio Demo
                </div>
                <div className="text-xs text-blaze-muted leading-relaxed mt-0.5">
                  Brand activation minigame app - fictional brand "BLAZE". Built as showcase for brand event + creative agency work.
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="animate-fadeIn">
            {renderCurrentGame()}
          </div>
        )}
      </div>

      <Modal
        isOpen={modal.isOpen}
        icon={modal.icon}
        title={modal.title}
        subtitle={modal.subtitle}
        points={modal.points}
        isGreen={modal.isGreen}
        onClose={closeModal}
      />
    </div>
  );
}
