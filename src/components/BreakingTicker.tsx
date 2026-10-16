import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, AlertCircle, Sparkles } from 'lucide-react';
import { FlashItem } from '../types/football';

interface BreakingTickerProps {
  flashes: FlashItem[];
  onSelectFlash: (flash: FlashItem) => void;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({ flashes, onSelectFlash }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || flashes.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % flashes.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, flashes.length]);

  if (!flashes.length) return null;

  const currentFlash = flashes[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % flashes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + flashes.length) % flashes.length);
  };

  return (
    <div className="bg-gradient-to-r from-red-950 via-slate-900 to-amber-950/70 border-b border-red-900/40 py-2 px-3 sm:px-6 shadow-inner relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
        
        {/* Urgent Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 bg-red-600 text-white font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider text-[11px] shadow-sm animate-pulse-live">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            FLASH DIRECT
          </div>
          <span className="text-[11px] text-amber-400 font-semibold hidden md:inline">
            {currentFlash.time}
          </span>
        </div>

        {/* Content Headline */}
        <div 
          onClick={() => onSelectFlash(currentFlash)}
          className="flex-1 truncate cursor-pointer group flex items-center gap-2"
        >
          <span className="text-slate-100 font-medium group-hover:text-amber-300 transition-colors truncate">
            {currentFlash.title}
          </span>
          <span className="hidden lg:inline text-[11px] font-bold text-amber-400/90 group-hover:underline shrink-0">
            En savoir plus &rarr;
          </span>
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline mr-1">
            {currentIndex + 1}/{flashes.length}
          </span>
          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? "Reprendre le défilement" : "Mettre en pause"}
            className="p-1 hover:text-white hover:bg-slate-800 rounded transition"
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-amber-400" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handlePrev}
            title="Précédent"
            className="p-1 hover:text-white hover:bg-slate-800 rounded transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            title="Suivant"
            className="p-1 hover:text-white hover:bg-slate-800 rounded transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
