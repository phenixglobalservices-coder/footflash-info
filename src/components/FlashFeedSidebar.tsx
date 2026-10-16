import React, { useState } from 'react';
import { 
  Zap, 
  Clock, 
  Flame, 
  Volume2, 
  Radio, 
  PlusCircle, 
  ChevronRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { FlashItem } from '../types/football';
import { AudioNarrator } from '../utils/speech';

interface FlashFeedSidebarProps {
  flashes: FlashItem[];
  onSelectFlash: (flash: FlashItem) => void;
  onSimulateNewFlash: () => void;
}

export const FlashFeedSidebar: React.FC<FlashFeedSidebarProps> = ({
  flashes,
  onSelectFlash,
  onSimulateNewFlash
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'urgent' | 'mercato' | 'ligue1'>('all');
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const filteredFlashes = flashes.filter((item) => {
    if (activeFilter === 'urgent') return item.isUrgent;
    if (activeFilter === 'mercato') return item.category === 'mercato';
    if (activeFilter === 'ligue1') return item.category === 'ligue1';
    return true;
  });

  const handleSpeak = (e: React.MouseEvent, item: FlashItem) => {
    e.stopPropagation();
    if (speakingId === item.id) {
      AudioNarrator.stop();
      setSpeakingId(null);
    } else {
      setSpeakingId(item.id);
      AudioNarrator.speak(item.title, () => setSpeakingId(null));
    }
  };

  return (
    <aside className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-white leading-tight flex items-center gap-1.5">
              FIL INFO 24/7
            </h3>
            <span className="text-[11px] text-slate-400">Actualité en temps réel</span>
          </div>
        </div>

        {/* Simulate Flash Button */}
        <button
          onClick={onSimulateNewFlash}
          title="Simuler une nouvelle alerte flash en temps réel"
          className="flex items-center gap-1 text-[11px] bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 border border-amber-400/30 font-semibold px-2 py-1 rounded-lg transition"
        >
          <Zap className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">+ Simuler Flash</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar mb-4 text-xs">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition ${
            activeFilter === 'all'
              ? 'bg-slate-700 text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200 bg-slate-800/60'
          }`}
        >
          Tous ({flashes.length})
        </button>
        <button
          onClick={() => setActiveFilter('urgent')}
          className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition flex items-center gap-1 ${
            activeFilter === 'urgent'
              ? 'bg-red-600 text-white font-semibold'
              : 'text-red-400 hover:text-red-300 bg-red-950/40'
          }`}
        >
          🚨 Urgents
        </button>
        <button
          onClick={() => setActiveFilter('mercato')}
          className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition ${
            activeFilter === 'mercato'
              ? 'bg-amber-500 text-slate-950 font-bold'
              : 'text-amber-400 hover:text-amber-300 bg-amber-950/30'
          }`}
        >
          🔥 Mercato
        </button>
        <button
          onClick={() => setActiveFilter('ligue1')}
          className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition ${
            activeFilter === 'ligue1'
              ? 'bg-blue-600 text-white font-semibold'
              : 'text-blue-400 hover:text-blue-300 bg-blue-950/30'
          }`}
        >
          🇫🇷 Ligue 1
        </button>
      </div>

      {/* Flash List */}
      <div className="space-y-3 flex-1 overflow-y-auto max-h-[620px] pr-1">
        {filteredFlashes.map((item) => {
          const isSpeakingThis = speakingId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => onSelectFlash(item)}
              className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer group hover:scale-[1.01] ${
                item.isUrgent
                  ? 'bg-red-950/30 border-red-800/40 hover:border-red-500/60'
                  : 'bg-slate-900 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Top metadata */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      item.isUrgent
                        ? 'bg-red-600 text-white'
                        : item.category === 'mercato'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.categoryLabel}
                  </span>
                  {item.club && (
                    <span className="text-[10px] text-slate-400 font-medium">
                      {item.club}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {item.time}
                  </span>

                  {/* Vocal Speak Button */}
                  <button
                    onClick={(e) => handleSpeak(e, item)}
                    title="Écouter ce flash à haute voix"
                    className={`p-1 rounded transition ${
                      isSpeakingThis
                        ? 'bg-amber-400 text-slate-950 animate-bounce'
                        : 'text-slate-400 hover:text-amber-400 hover:bg-slate-800'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Title / Description */}
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-snug group-hover:text-amber-300 transition-colors">
                {item.title}
              </p>

              {item.relatedArticleId && (
                <div className="mt-2 text-[10px] text-amber-400 font-bold flex items-center gap-1 group-hover:underline">
                  Consulter l'article complet <ChevronRight className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
