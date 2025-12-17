
import React, { useState, useRef } from 'react';
import { QUESTIONS } from './constants';
import { Option, GameState } from './types';
import VPCVisualizer from './components/VPCVisualizer';
import OptionCard from './components/OptionCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowRight, CheckCircle2, XCircle, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    score: 0,
    streak: 0,
    isLevelComplete: false,
    isErrorModalOpen: false,
    lastIncorrectOption: null,
    selectedOptionId: null,
  });

  const [isDragging, setIsDragging] = useState(false);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const currentQuestion = QUESTIONS[gameState.currentQuestionIndex];

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrop = (option: Option, point: { x: number; y: number }) => {
    setIsDragging(false);
    if (gameState.isLevelComplete) return;

    if (dropZoneRef.current) {
      const rect = dropZoneRef.current.getBoundingClientRect();
      const buffer = 150;
      const isInside = 
        point.x >= rect.left - buffer && 
        point.x <= rect.right + buffer && 
        point.y >= rect.top - buffer && 
        point.y <= rect.bottom + buffer;

      if (isInside) {
        validateAnswer(option);
      }
    }
  };

  const validateAnswer = (option: Option) => {
    if (option.correct) {
      triggerSuccess();
      setGameState(prev => ({
        ...prev,
        score: prev.score + 10 + (prev.streak * 5),
        streak: prev.streak + 1,
        isLevelComplete: true,
        selectedOptionId: option.id,
        isErrorModalOpen: false
      }));
    } else {
      triggerFailure();
      setGameState(prev => ({
        ...prev,
        streak: 0,
        isErrorModalOpen: true,
        lastIncorrectOption: option,
        selectedOptionId: null
      }));
    }
  };

  const triggerSuccess = () => {
    const colors = ['#FF9900', '#232F3E', '#34A853', '#4285F4'];
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors
    });
    new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3').play().catch(() => {});
  };

  const triggerFailure = () => {
    new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3').play().catch(() => {});
  };

  const nextLevel = () => {
    if (gameState.currentQuestionIndex < QUESTIONS.length - 1) {
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        isLevelComplete: false,
        selectedOptionId: null
      }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      alert(`Course Completed! Final Score: ${gameState.score}`);
      setGameState({
         currentQuestionIndex: 0,
         score: 0,
         streak: 0,
         isLevelComplete: false,
         isErrorModalOpen: false,
         lastIncorrectOption: null,
         selectedOptionId: null,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const closeModal = () => {
    setGameState(prev => ({ ...prev, isErrorModalOpen: false }));
  };

  return (
    <div className="min-h-screen bg-[#F2F3F3] text-[#232F3E] flex flex-col items-center pb-12 font-sans scroll-smooth overflow-x-hidden">
      
      {/* Top Level Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-200 z-[60]">
        <motion.div 
          className="h-full bg-[#FF9900]" 
          initial={{ width: 0 }}
          animate={{ width: `${((gameState.currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
          transition={{ type: 'spring', stiffness: 40, damping: 20 }}
        />
      </div>

      {/* Header */}
      <header className="w-full bg-[#232F3E] text-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
              <Trophy className="text-[#FF9900] w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">CloudNet Quest</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">AWS Architecture Mastery</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="text-right">
                <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest">SCORE</span>
                <span className="font-mono font-bold text-2xl text-[#FF9900]">{gameState.score}</span>
             </div>
          </div>
        </div>
      </header>

      <main className="w-full max-w-5xl px-4 mt-8 flex-1 flex flex-col gap-6">
        
        {/* Challenge Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <motion.div 
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-2"
          >
            <div className="inline-block px-3 py-1 bg-orange-100 text-[#FF9900] text-[10px] font-black rounded-full mb-2 uppercase">
              Challenge {gameState.currentQuestionIndex + 1}
            </div>
            <h2 className="text-2xl font-bold text-[#232F3E]">{currentQuestion.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">{currentQuestion.prompt}</p>
          </motion.div>
        </div>

        {/* Visualizer Area */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="relative">
            <VPCVisualizer 
              scenarioType={currentQuestion.scenarioType}
              isCorrect={gameState.isLevelComplete}
              sourceLabel={currentQuestion.sourceLabel}
              destLabel={currentQuestion.destLabel}
              dropZoneRef={dropZoneRef}
            />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                animate={
                  gameState.isLevelComplete 
                  ? { scale: 1.05, backgroundColor: 'rgba(52, 168, 83, 0.05)', borderColor: '#34A853', opacity: 1 } 
                  : isDragging 
                  ? { scale: 1.05, borderColor: '#FF9900', opacity: 1, backgroundColor: 'rgba(255, 153, 0, 0.05)' }
                  : { scale: 1, opacity: 0 }
                }
                className="w-48 h-40 rounded-2xl border-4 border-dashed flex items-center justify-center z-30 transition-all duration-150"
              >
                 {isDragging && !gameState.isLevelComplete && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2">
                      <div className="text-4xl">🎯</div>
                      <span className="text-[#FF9900] font-black text-xs">DROP GATEWAY HERE</span>
                    </motion.div>
                 )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-12">
          {currentQuestion.options.map((option) => (
            <OptionCard 
              key={option.id} 
              option={option} 
              isSelected={gameState.selectedOptionId === option.id}
              onDragStart={handleDragStart}
              onDragEnd={handleDrop}
              disabled={gameState.isLevelComplete}
            />
          ))}
        </div>
      </main>

      {/* Success Modal - NEW */}
      <AnimatePresence>
        {gameState.isLevelComplete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md relative z-10 border-4 border-green-50"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-6 bg-green-50 rounded-full mb-6">
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                </div>
                <h3 className="text-3xl font-black text-slate-900">CONGRATS WELL DONE!</h3>
                <p className="text-slate-500 text-lg mt-3 font-medium">
                  Architecture verified successfully! 🚀
                </p>
                <div className="bg-green-50 p-6 rounded-2xl border border-green-100 mt-6 text-slate-800 text-sm leading-relaxed font-medium">
                  <div className="flex gap-2 text-left">
                    <Info className="shrink-0 text-green-600" size={18} />
                    <span>{currentQuestion.options.find(o => o.id === gameState.selectedOptionId)?.explanation}</span>
                  </div>
                </div>
                <button 
                  onClick={nextLevel}
                  className="w-full mt-10 py-4 bg-green-600 hover:bg-green-700 text-white font-black text-xl rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 uppercase tracking-wider"
                >
                  NEXT LEVEL <ArrowRight size={22} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Error Modal */}
      <AnimatePresence>
        {gameState.isErrorModalOpen && gameState.lastIncorrectOption && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md relative z-10 border-4 border-red-50"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-6 bg-red-50 rounded-full mb-6">
                  <span className="text-7xl">😢</span>
                </div>
                <h3 className="text-4xl font-black text-slate-900">OH NO!</h3>
                <p className="text-slate-500 text-lg mt-3 font-medium">
                  "{gameState.lastIncorrectOption.label}" is not quite right.
                </p>
                <div className="bg-red-50 p-6 rounded-2xl mt-6 text-red-800 text-sm italic border-l-4 border-red-300">
                  {gameState.lastIncorrectOption.explanation}
                </div>
                <button 
                  onClick={closeModal}
                  className="w-full mt-10 py-4 bg-[#232F3E] hover:bg-black text-white font-bold text-xl rounded-xl transition-all shadow-md active:scale-95 uppercase tracking-widest"
                >
                  TRY AGAIN
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
