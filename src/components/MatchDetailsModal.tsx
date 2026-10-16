import React from 'react';
import { X, Activity, Shield, Trophy, MapPin, CheckCircle2 } from 'lucide-react';
import { LiveMatch } from '../types/football';

interface MatchDetailsModalProps {
  match: LiveMatch | null;
  onClose: () => void;
}

export const MatchDetailsModal: React.FC<MatchDetailsModalProps> = ({ match, onClose }) => {
  if (!match) return null;

  const { stats, events } = match;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        className="bg-[#0e1422] border border-slate-700/80 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{match.competitionIcon}</span>
            <div>
              <span className="font-heading font-bold text-white text-sm sm:text-base block">
                {match.competition}
              </span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" /> {match.venue}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Scoreboard Banner */}
        <div className="p-6 bg-gradient-to-b from-slate-900 to-[#0e1422] text-center border-b border-slate-800">
          <div className="inline-block mb-3">
            {match.status === 'LIVE' && (
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                {match.minute} • EN DIRECT
              </span>
            )}
            {match.status === 'FT' && (
              <span className="bg-slate-800 text-slate-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Score Final (Terminé)
              </span>
            )}
            {match.status === 'UPCOMING' && (
              <span className="bg-amber-400/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {match.dateStr}
              </span>
            )}
          </div>

          <div className="flex items-center justify-around gap-4 max-w-md mx-auto">
            {/* Home */}
            <div className="flex flex-col items-center flex-1">
              <span className="text-4xl sm:text-5xl mb-2">{match.homeTeam.logo}</span>
              <span className="font-heading font-black text-sm sm:text-lg text-white">
                {match.homeTeam.name}
              </span>
            </div>

            {/* Score */}
            <div className="flex items-center gap-3 font-mono font-black text-3xl sm:text-5xl text-amber-400">
              {match.status !== 'UPCOMING' ? (
                <>
                  <span>{match.homeScore}</span>
                  <span className="text-slate-600">:</span>
                  <span>{match.awayScore}</span>
                </>
              ) : (
                <span className="text-slate-500 text-2xl">VS</span>
              )}
            </div>

            {/* Away */}
            <div className="flex flex-col items-center flex-1">
              <span className="text-4xl sm:text-5xl mb-2">{match.awayTeam.logo}</span>
              <span className="font-heading font-black text-sm sm:text-lg text-white">
                {match.awayTeam.name}
              </span>
            </div>
          </div>
        </div>

        {/* Match Events Timeline */}
        {events.length > 0 && (
          <div className="p-6 border-b border-slate-800">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-amber-400" /> Faits marquants du match
            </h4>
            <div className="space-y-2.5">
              {events.map((evt, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs sm:text-sm ${
                    evt.team === 'home'
                      ? 'bg-slate-900/80 border-slate-800 text-left'
                      : 'bg-slate-900/80 border-slate-800 text-left'
                  }`}
                >
                  <span className="font-mono font-black text-amber-400 w-10 shrink-0">
                    {evt.minute}'
                  </span>
                  <span className="text-base">
                    {evt.type === 'goal' ? '⚽' : evt.type === 'yellow_card' ? '🟨' : '🟥'}
                  </span>
                  <div className="flex-1">
                    <span className="font-bold text-white">{evt.player}</span>
                    {evt.description && (
                      <span className="text-xs text-slate-400 ml-2 italic">({evt.description})</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Comparative Bars */}
        <div className="p-6 space-y-4">
          <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-400 mb-2">
            Statistiques Comparatives
          </h4>

          {/* Possession */}
          <StatBar
            label="Possession de balle"
            val1={`${stats.possession[0]}%`}
            val2={`${stats.possession[1]}%`}
            pct1={stats.possession[0]}
            pct2={stats.possession[1]}
          />

          {/* Shots */}
          <StatBar
            label="Tirs totaux"
            val1={stats.shots[0]}
            val2={stats.shots[1]}
            pct1={(stats.shots[0] / (stats.shots[0] + stats.shots[1] || 1)) * 100}
            pct2={(stats.shots[1] / (stats.shots[0] + stats.shots[1] || 1)) * 100}
          />

          {/* Shots on target */}
          <StatBar
            label="Tirs cadrés"
            val1={stats.shotsOnTarget[0]}
            val2={stats.shotsOnTarget[1]}
            pct1={(stats.shotsOnTarget[0] / (stats.shotsOnTarget[0] + stats.shotsOnTarget[1] || 1)) * 100}
            pct2={(stats.shotsOnTarget[1] / (stats.shotsOnTarget[0] + stats.shotsOnTarget[1] || 1)) * 100}
          />

          {/* xG */}
          <StatBar
            label="Expected Goals (xG)"
            val1={stats.xG[0]}
            val2={stats.xG[1]}
            pct1={(stats.xG[0] / (stats.xG[0] + stats.xG[1] || 1)) * 100}
            pct2={(stats.xG[1] / (stats.xG[0] + stats.xG[1] || 1)) * 100}
          />

          {/* Corners */}
          <StatBar
            label="Corners"
            val1={stats.corners[0]}
            val2={stats.corners[1]}
            pct1={(stats.corners[0] / (stats.corners[0] + stats.corners[1] || 1)) * 100}
            pct2={(stats.corners[1] / (stats.corners[0] + stats.corners[1] || 1)) * 100}
          />
        </div>

        {/* Lineups if present */}
        {match.lineups && (
          <div className="p-6 border-t border-slate-800 bg-slate-950/40">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-400 mb-3">
              Compositions probables
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-amber-400 block mb-2">{match.homeTeam.name}</span>
                <ul className="space-y-1 text-slate-300">
                  {match.lineups.home.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-bold text-amber-400 block mb-2">{match.awayTeam.name}</span>
                <ul className="space-y-1 text-slate-300">
                  {match.lineups.away.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatBar: React.FC<{
  label: string;
  val1: string | number;
  val2: string | number;
  pct1: number;
  pct2: number;
}> = ({ label, val1, val2, pct1, pct2 }) => {
  return (
    <div className="space-y-1 text-xs">
      <div className="flex items-center justify-between font-medium">
        <span className="font-bold text-white font-mono">{val1}</span>
        <span className="text-slate-400">{label}</span>
        <span className="font-bold text-white font-mono">{val2}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-800 flex overflow-hidden">
        <div
          className="bg-amber-400 transition-all duration-500"
          style={{ width: `${pct1}%` }}
        />
        <div
          className="bg-blue-500 transition-all duration-500"
          style={{ width: `${pct2}%` }}
        />
      </div>
    </div>
  );
};
