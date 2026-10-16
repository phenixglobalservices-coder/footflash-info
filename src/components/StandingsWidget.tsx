import React, { useState } from 'react';
import { Trophy, Award, ChevronRight } from 'lucide-react';
import { StandingTeam, TopScorer } from '../types/football';
import { STANDINGS_LIGUE1, STANDINGS_PREMIER_LEAGUE, TOP_SCORERS } from '../data/mockFootballData';

export const StandingsWidget: React.FC = () => {
  const [activeLeague, setActiveLeague] = useState<'ligue1' | 'pl'>('ligue1');
  const [activeTab, setActiveTab] = useState<'standings' | 'scorers'>('standings');

  const currentStandings = activeLeague === 'ligue1' ? STANDINGS_LIGUE1 : STANDINGS_PREMIER_LEAGUE;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
      {/* Header and Switches */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-400/20 text-amber-400 rounded-xl">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-black text-lg text-white">
              CLASSEMENTS & STATS
            </h3>
            <span className="text-xs text-slate-400">Saison 2026/2027</span>
          </div>
        </div>

        {/* Tab switchers: Standings vs Scorers */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center">
            <button
              onClick={() => setActiveTab('standings')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                activeTab === 'standings' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Classement
            </button>
            <button
              onClick={() => setActiveTab('scorers')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
                activeTab === 'scorers' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Buteurs
            </button>
          </div>
        </div>
      </div>

      {/* League selector if on standings */}
      {activeTab === 'standings' && (
        <div className="flex items-center gap-2 my-4">
          <button
            onClick={() => setActiveLeague('ligue1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeLeague === 'ligue1'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200'
            }`}
          >
            🇫🇷 Ligue 1 McDonald's
          </button>
          <button
            onClick={() => setActiveLeague('pl')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeLeague === 'pl'
                ? 'bg-purple-600 text-white shadow'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200'
            }`}
          >
            🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League
          </button>
        </div>
      )}

      {/* Content: Standings Table */}
      {activeTab === 'standings' ? (
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800/80">
                <th className="py-2.5 px-2 font-medium">#</th>
                <th className="py-2.5 px-2 font-medium">Club</th>
                <th className="py-2.5 px-2 font-medium text-center">J</th>
                <th className="py-2.5 px-2 font-medium text-center hidden sm:table-cell">G</th>
                <th className="py-2.5 px-2 font-medium text-center hidden sm:table-cell">N</th>
                <th className="py-2.5 px-2 font-medium text-center hidden sm:table-cell">P</th>
                <th className="py-2.5 px-2 font-medium text-center">Diff</th>
                <th className="py-2.5 px-2 font-bold text-center text-amber-400">Pts</th>
                <th className="py-2.5 px-2 font-medium text-right hidden md:table-cell">Forme</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {currentStandings.map((team) => {
                const isChampion = team.rank === 1;
                const isCL = team.rank <= 3;

                return (
                  <tr
                    key={team.name}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="py-2.5 px-2 font-bold font-mono">
                      <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] ${
                        isChampion 
                          ? 'bg-amber-400 text-slate-950 font-black' 
                          : isCL 
                          ? 'bg-blue-600/80 text-white' 
                          : 'text-slate-400'
                      }`}>
                        {team.rank}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 font-semibold text-slate-100 flex items-center gap-2">
                      <span className="text-base">{team.logo}</span>
                      <span className="truncate group-hover:text-amber-400 transition-colors">
                        {team.name}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center text-slate-400">{team.played}</td>
                    <td className="py-2.5 px-2 text-center text-slate-400 hidden sm:table-cell">{team.won}</td>
                    <td className="py-2.5 px-2 text-center text-slate-400 hidden sm:table-cell">{team.drawn}</td>
                    <td className="py-2.5 px-2 text-center text-slate-400 hidden sm:table-cell">{team.lost}</td>
                    <td className="py-2.5 px-2 text-center font-mono text-slate-300">
                      {team.goalDiff > 0 ? `+${team.goalDiff}` : team.goalDiff}
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold text-amber-400 font-mono text-sm">
                      {team.points}
                    </td>
                    <td className="py-2.5 px-2 text-right hidden md:table-cell">
                      <div className="flex items-center justify-end gap-1">
                        {team.form.map((res, i) => (
                          <span
                            key={i}
                            className={`w-3.5 h-3.5 rounded text-[8px] font-bold flex items-center justify-center ${
                              res === 'W'
                                ? 'bg-emerald-500 text-black'
                                : res === 'D'
                                ? 'bg-slate-600 text-white'
                                : 'bg-red-500 text-white'
                            }`}
                          >
                            {res}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Top Scorers list */
        <div className="space-y-3 mt-4">
          {TOP_SCORERS.map((scorer) => (
            <div
              key={scorer.name}
              className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-3 hover:border-amber-400/40 transition"
            >
              <div className="flex items-center gap-3">
                <span className={`w-5 h-5 rounded font-bold font-mono text-xs flex items-center justify-center ${
                  scorer.rank === 1 ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-400'
                }`}>
                  {scorer.rank}
                </span>
                <img
                  src={scorer.photo}
                  alt={scorer.name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-400/30"
                />
                <div>
                  <h4 className="font-heading font-bold text-sm text-white leading-tight">
                    {scorer.name}
                  </h4>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <span>{scorer.clubLogo}</span> {scorer.club}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-black font-mono text-amber-400 leading-none">
                  {scorer.goals} <span className="text-[10px] text-slate-400 uppercase font-sans">buts</span>
                </div>
                <span className="text-[11px] text-slate-400">
                  {scorer.assists} passes • {scorer.matches} matchs
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer link */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 text-right">
        <button className="text-xs font-bold text-amber-400 hover:text-amber-300 transition flex items-center gap-1 ml-auto">
          Voir les classements complets <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
