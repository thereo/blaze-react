import { useState, useCallback, useEffect } from 'react';
import GameHeader from './GameHeader';

interface QuizGameProps {
  onBack: () => void;
  onReward: (icon: string, title: string, subtitle: string, points: number) => void;
  isPlayed: boolean;
  onPlayed: () => void;
}

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

const QUESTIONS: Question[] = [
  {
    question: 'Energy drinks typically contain which stimulant?',
    options: ['Sugar only', 'Caffeine', 'Taurine only', 'Vitamin C'],
    correctIndex: 1,
  },
  {
    question: 'Which sport is most associated with energy drink brands?',
    options: ['Tennis', 'Extreme sports', 'Golf', 'Swimming'],
    correctIndex: 1,
  },
  {
    question: '"Activation event" in marketing means?',
    options: ['A launch party', 'Engaging consumers directly', 'A TV commercial', 'An email campaign'],
    correctIndex: 1,
  },
  {
    question: "BLAZE's tagline is?",
    options: ['Stay Cool', 'Ignite Your Game', 'Drink More', 'Feel Alive'],
    correctIndex: 1,
  },
  {
    question: "Brand ambassador's main role is to?",
    options: ['Design products', 'Represent & promote the brand', 'Handle logistics', 'Manage finances'],
    correctIndex: 1,
  },
  {
    question: 'What makes a good brand activation game?',
    options: ['Long loading time', 'Fast, fun & rewarding', 'Complex rules', 'No prizes'],
    correctIndex: 1,
  },
];

export default function QuizGame({ onBack, onReward, isPlayed, onPlayed }: QuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = useCallback((index: number) => {
    if (isAnswered || isComplete) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index === QUESTIONS[currentQuestion].correctIndex) {
      setScore(s => s + 1);
    }
  }, [currentQuestion, isAnswered, isComplete]);

  const handleNext = useCallback(() => {
    if (currentQuestion >= QUESTIONS.length - 1) {
      setIsComplete(true);
      onPlayed();
      const points = score * 10;
      onReward('BOLT', 'QUIZ DONE!', `${score} correct answers`, points);
    } else {
      setCurrentQuestion(q => q + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  }, [currentQuestion, score, onPlayed, onReward]);

  const handleRestart = useCallback(() => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsComplete(false);
  }, []);

  if (isComplete) {
    return (
      <div>
        <GameHeader title="BLAZE QUIZ" colorClass="text-purple-500" onBack={onBack} />
        
        <div className="text-center py-6">
          <div className="text-5xl font-black-ops text-purple-500 mb-3">QUIZ</div>
          <h2 className="font-black-ops text-xl text-purple-500 mb-2">
            Quiz Complete!
          </h2>
          <p className="font-barlow-condensed text-sm text-blaze-muted mb-6">
            {score}/{QUESTIONS.length} correct - {score * 10} pts earned
          </p>
          <button
            onClick={handleRestart}
            className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-black-ops text-sm py-3 px-7 rounded
              hover:scale-105 active:scale-95 transition-transform duration-150
              shadow-[0_4px_20px_rgba(213,0,249,0.3)]"
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    );
  }

  const question = QUESTIONS[currentQuestion];

  return (
    <div>
      <GameHeader title="BLAZE QUIZ" colorClass="text-purple-500" onBack={onBack} />
      
      {/* Progress bar */}
      <div className="flex gap-1 mb-5">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-0.5 rounded-full transition-colors duration-300 ${
              i < currentQuestion
                ? 'bg-blaze-fire'
                : i === currentQuestion
                  ? 'bg-blaze-fire/50'
                  : 'bg-blaze-border'
            }`}
          />
        ))}
      </div>
      
      {/* Question */}
      <div className="font-barlow-condensed text-lg font-bold leading-relaxed mb-4 min-h-[56px]">
        {question.question}
      </div>
      
      {/* Options */}
      <div className="flex flex-col gap-2 mb-3.5">
        {question.options.map((option, i) => {
          const isCorrect = i === question.correctIndex;
          const isSelected = i === selectedAnswer;
          
          let optionClass = 'bg-blaze-card2 border-blaze-border text-gray-200';
          
          if (isAnswered) {
            if (isCorrect) {
              optionClass = 'bg-emerald-500/10 border-emerald-500 text-emerald-500';
            } else if (isSelected && !isCorrect) {
              optionClass = 'bg-blaze-fire/10 border-blaze-fire text-blaze-fire';
            }
          } else {
            optionClass += ' hover:border-purple-500/40 hover:bg-purple-500/6 cursor-pointer';
          }
          
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={isAnswered}
              className={`
                border rounded-lg py-3 px-4 text-left font-barlow font-semibold text-sm
                transition-all duration-200 ${optionClass}
                ${isAnswered ? 'cursor-default' : ''}
              `}
            >
              {option}
            </button>
          );
        })}
      </div>
      
      {/* Next button */}
      {isAnswered && (
        <div className="text-center">
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-black-ops text-sm py-3 px-7 rounded
              hover:scale-105 active:scale-95 transition-transform duration-150
              shadow-[0_4px_20px_rgba(213,0,249,0.3)]"
          >
            {currentQuestion >= QUESTIONS.length - 1 ? 'FINISH' : 'NEXT'}
          </button>
        </div>
      )}
    </div>
  );
}
