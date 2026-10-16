import React from 'react';
import { LiveMatch } from '../types/football';
import { Activity, ChevronRight, Trophy } from 'lucide-react';

interface LiveScoreStripProps {
  matches: LiveMatch[];
  onSelectMatch: (match: LiveMatch) => void;
}

export const LiveScoreStrip: React.FC<LiveScoreStripProps> = ({ matches, onSelectMatch }) => {
  return (
    <section className="bg-[#0b101c] border-b border-slate-800 py-2.5 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        {/* Strip Header Tag */}
        <div className="hidden md:flex items-center gap-2 shrink-0 pr-3 border-r border-slate-800">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-black tracking-wider text-emerald-400 leading-none">
              MATCH CENTER
            </span>
            <span className="text-[9px] text-slate-400 font-medium">Direct & Scores</span>
          </div>
        </div>

        {/* Scrollable Match Cards */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth w-full py-0.5">
          {matches.map((match) => {
            const isLive = match.status === 'LIVE';
            const isFinished = match.status === 'FT';
            const isUpcoming = match.status === 'UPCOMING';

            return (
              <div
                key={match.id}
                onClick={() => onSelectMatch(match)}
                className={`flex-shrink-0 cursor-pointer bg-slate-900/90 hover:bg-slate-850 hover:border-amber-500/60 transition-all duration-200 border rounded-xl px-3.5 py-2 w-64 shadow-md ${
                  isLive ? 'border-emerald-500/40 shadow-emerald-950/20' : 'border-slate-800'
                }`}
              >
                {/* Competition & Status */}
                <div className="flex items-center justify-between text-[11px] mb-1.5 pb-1 border-b border-slate-800/60">
                  <span className="text-slate-400 font-medium truncate flex items-center gap-1">
                    <span>{match.competitionIcon}</span>
                    <span className="truncate">{match.competition}</span>
                  </span>

                  {isLive && (
                    <span className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.2 rounded text-[10px] animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      {match.minute || 'LIVE'}
                    </span>
                  )}

                  {isFinished && (
                    <span className="text-slate-400 font-bold bg-slate-800 px-1.5 py-0.2 rounded text-[10px]">
                      TERMINÉ
                    </span>
                  )}

                  {isUpcoming && (
                    <span className="text-amber-400 font-bold text-[10px]">
                      {match.dateStr || 'À VENIR'}
                    </span>
                  )}
                </div>

                {/* Score and Teams */}
                <div className="space-y-1">
                  {/* Home Team */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-sm">{match.homeTeam.logo}</span>
                      <span className="text-xs font-semibold text-slate-100 truncate">
                        {match.homeTeam.name}
                      </span>
                    </div>
                    {!isUpcoming ? (
                      <span className="text-xs font-bold text-white font-mono ml-2">
                        {match.homeScore}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">-</span>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-sm">{match.awayTeam.logo}</span>
                      <span className="text-xs font-semibold text-slate-100 truncate">
                        {match.awayTeam.name}
                      </span>
                    </div>
                    {!isUpcoming ? (
                      <span className="text-xs font-bold text-white font-mono ml-2">
                        {match.awayScore}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">-</span>
                    )}
                  </div>
                </div>

                {/* Venue / Quick prompt */}
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/40">
                  <span className="truncate">{match.venue.split(',')[0]}</span>
                  <span className="text-amber-400/90 font-medium hover:underline flex items-center">
                    Stats & Compo &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
