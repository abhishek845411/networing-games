import React, { useState, useRef, useEffect } from 'react';
import { QUESTIONS } from './constants';
import { Option, GameState } from './types';
import VPCVisualizer from './components/VPCVisualizer';
import OptionCard from './components/OptionCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowRight, CheckCircle2, Info } from 'lucide-react';
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

  // Prevent background scrolling on mobile when dragging
  useEffect(() => {
    if (isDragging) {
      document.body.classList.add('dragging-active');
    } else {
      document.body.classList.remove('dragging-active');
    }
  }, [isDragging]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrop = (option: Option, point: { x: number; y: number }) => {
    setIsDragging(false);
    if (gameState.isLevelComplete) return;

    if (dropZoneRef.current) {
      const rect = dropZoneRef.current.getBoundingClientRect();
      // Expanded hit area for "fast acceptance" feel.
      // We check if the drop point is anywhere near the drop zone.
      const buffer = 120; 
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
    const colors = ['#FF9900', '#232F3E', '#31B404', '#0073BB'];
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
      zIndex: 200
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
    <div className="min-h-screen bg-[#F2F3F3] text-[#232F3E] flex flex-col items-center pb-12 font-sans scroll-smooth">
      
      {/* Top Level Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-200 z-[70]">
        <motion.div 
          className="h-full bg-[#FF9900] shadow-[0_0_8px_rgba(255,153,0,0.5)]" 
          initial={{ width: 0 }}
          animate={{ width: `${((gameState.currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
      </div>

      <header className="w-full bg-[#232F3E] text-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
              <Trophy className="text-[#FF9900] w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-base md:text-xl tracking-tight leading-none">CloudNet Quest</h1>
              <p className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Architecture Mastery</p>
            </div>
          </div>
          <div className="text-right">
            <span className="block text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">SCORE</span>
            <span className="font-mono font-bold text-xl md:text-2xl text-[#FF9900]">{gameState.score}</span>
          </div>
        </div>
      </header>

      <main className="w-full max-w-5xl px-3 mt-6 flex-1 flex flex-col gap-5">
        
        {/* Scenario Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <motion.div 
            key={currentQuestion.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="text-center space-y-2"
          >
            <div className="inline-block px-3 py-0.5 bg-orange-100 text-[#FF9900] text-[9px] font-black rounded-full uppercase tracking-widest mb-2">
              Challenge {gameState.currentQuestionIndex + 1}
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#232F3E] leading-tight">{currentQuestion.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-xs md:text-base leading-relaxed">{currentQuestion.prompt}</p>
          </motion.div>
        </div>

        {/* Visualizer Area */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 relative group">
          {/* Horizontal scroll helper for mobile */}
          <div className="absolute top-2 right-2 md:hidden animate-pulse bg-gray-100/80 px-2 py-1 rounded text-[10px] text-gray-400 font-bold z-20 pointer-events-none">
            Slide to view full architecture →
          </div>
          
          <div className="relative p-2 md:p-6 lg:p-10 overflow-x-auto overflow-y-hidden touch-pan-x scrollbar-hide md:overflow-visible">
            {/* The actual diagram */}
            <div className="min-w-[750px] md:min-w-0">
              <VPCVisualizer 
                scenarioType={currentQuestion.scenarioType}
                isCorrect={gameState.isLevelComplete}
                sourceLabel={currentQuestion.sourceLabel}
                destLabel={currentQuestion.destLabel}
                dropZoneRef={dropZoneRef}
              />
            </div>
            
            {/* Overlay for Drop Indication */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                animate={
                  gameState.isLevelComplete 
                  ? { scale: 1.05, backgroundColor: 'rgba(52, 168, 83, 0.05)', borderColor: '#34A853', opacity: 1 } 
                  : isDragging 
                  ? { scale: 1.1, borderColor: '#FF9900', opacity: 1, backgroundColor: 'rgba(255, 153, 0, 0.08)' }
                  : { scale: 1, opacity: 0 }
                }
                className="w-40 h-32 md:w-56 md:h-48 rounded-3xl border-4 border-dashed flex items-center justify-center z-30 transition-all duration-200"
              >
                 {isDragging && !gameState.isLevelComplete && (
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="flex flex-col items-center gap-1"
                    >
                      <div className="text-4xl">🎯</div>
                      <span className="text-[#FF9900] font-black text-[10px] uppercase tracking-tighter">Target Zone</span>
                    </motion.div>
                 )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pb-12">
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

      {/* Success Modal */}
      <AnimatePresence>
        {gameState.isLevelComplete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#232F3E]/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-md relative z-10 border-4 border-green-50"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-5 bg-green-50 rounded-full mb-6 ring-8 ring-green-100/50">
                  <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-green-500" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-[#232F3E] uppercase tracking-tighter">CONGRATS WELL DONE!</h3>
                <p className="text-slate-500 text-base md:text-lg mt-2 font-semibold">Architecture Verified 🚀</p>
                
                <div className="bg-green-50/80 p-5 rounded-2xl border border-green-100 mt-6 text-[#232F3E] text-xs md:text-sm leading-relaxed font-medium">
                  <div className="flex gap-3 text-left">
                    <Info className="shrink-0 text-green-600 mt-0.5" size={16} />
                    <span>{currentQuestion.options.find(o => o.id === gameState.selectedOptionId)?.explanation}</span>
                  </div>
                </div>
                
                <button 
                  onClick={nextLevel}
                  className="w-full mt-8 py-4 bg-green-600 hover:bg-green-700 text-white font-black text-lg md:text-xl rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest"
                >
                  NEXT LEVEL <ArrowRight size={22} strokeWidth={3} />
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
              className="absolute inset-0 bg-[#232F3E]/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-md relative z-10 border-4 border-red-50"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-5 bg-red-50 rounded-full mb-6 ring-8 ring-red-100/50">
                  <span className="text-6xl">😢</span>
                </div>
                <h3 className="text-3xl font-black text-[#232F3E] uppercase tracking-tighter">OH NO!</h3>
                <p className="text-slate-500 text-base md:text-lg mt-2 font-semibold">That component isn't quite right...</p>
                <div className="bg-red-50 p-5 rounded-2xl mt-6 text-red-800 text-xs md:text-sm italic border-l-4 border-red-300 text-left w-full">
                  {gameState.lastIncorrectOption.explanation}
                </div>
                <button 
                  onClick={closeModal}
                  className="w-full mt-8 py-4 bg-[#232F3E] hover:bg-black text-white font-black text-lg md:text-xl rounded-2xl transition-all shadow-lg active:scale-95 uppercase tracking-widest"
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
