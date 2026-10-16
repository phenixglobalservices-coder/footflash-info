import React, { useState } from 'react';
import { Flame, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';
import { MercatoDeal } from '../types/football';

interface MercatoRadarProps {
  deals: MercatoDeal[];
  onOpenDealArticle?: (deal: MercatoDeal) => void;
}

export const MercatoRadar: React.FC<MercatoRadarProps> = ({ deals }) => {
  const [filter, setFilter] = useState<'all' | 'official' | 'hot'>('all');

  const filteredDeals = deals.filter((deal) => {
    if (filter === 'official') return deal.status === 'OFFICIEL' || deal.status === 'ACCORD TOTAL';
    if (filter === 'hot') return deal.reliability >= 75;
    return true;
  });

  const getReliabilityColor = (rel: number) => {
    if (rel >= 90) return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40';
    if (rel >= 70) return 'text-amber-400 bg-amber-950/60 border-amber-500/40';
    return 'text-orange-400 bg-orange-950/60 border-orange-500/40';
  };

  const getStatusBadge = (status: MercatoDeal['status']) => {
    switch (status) {
      case 'OFFICIEL':
        return 'bg-emerald-500 text-slate-950 font-black';
      case 'ACCORD TOTAL':
        return 'bg-amber-400 text-slate-950 font-black';
      case 'NÉGOCIATIONS':
        return 'bg-blue-600 text-white font-bold';
      case 'PROLONGATION':
        return 'bg-purple-600 text-white font-bold';
      default:
        return 'bg-slate-700 text-slate-200 font-medium';
    }
  };

  return (
    <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950">
            <Flame className="w-7 h-7 fill-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-black text-xl sm:text-2xl text-white tracking-tight">
                MERCATO RADAR
              </h2>
              <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                En direct
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              L'indice de fiabilité des transferts exclusif Foot Flash Info
            </p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-1.5 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'all'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Tous ({deals.length})
          </button>
          <button
            onClick={() => setFilter('official')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'official'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Accords & Confirmés
          </button>
          <button
            onClick={() => setFilter('hot')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'hot'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Pistes Chaudes (75%+)
          </button>
        </div>
      </div>

      {/* Grid of Mercato Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {filteredDeals.map((deal) => {
          return (
            <div
              key={deal.id}
              className="bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group"
            >
              <div>
                {/* Status & Reliability Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md ${getStatusBadge(deal.status)}`}>
                    {deal.status}
                  </span>

                  {/* Reliability Meter */}
                  <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[11px] font-bold ${getReliabilityColor(deal.reliability)}`}>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{deal.reliability}% Fiabilité</span>
                  </div>
                </div>

                {/* Player details */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={deal.playerImage}
                    alt={deal.player}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-400/40"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                      {deal.player}
                    </h4>
                    <span className="text-xs text-slate-400">
                      {deal.position} • {deal.age} ans
                    </span>
                  </div>
                </div>

                {/* Clubs transfer movement box */}
                <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800/80 mb-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 truncate">
                    <span>{deal.fromClub.logo}</span>
                    <span className="text-slate-300 font-semibold truncate">{deal.fromClub.name}</span>
                  </div>

                  <ArrowRight className="w-4 h-4 text-amber-400 mx-2 shrink-0 animate-pulse" />

                  <div className="flex items-center gap-1.5 truncate">
                    <span>{deal.toClub.logo}</span>
                    <span className="text-amber-300 font-bold truncate">{deal.toClub.name}</span>
                  </div>
                </div>

                {/* Fee & Description */}
                <div className="space-y-1.5 mb-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Montant estimé :</span>
                    <span className="text-amber-400 font-mono font-bold">{deal.fee}</span>
                  </div>
                  <p className="text-xs text-slate-300 italic line-clamp-2 leading-relaxed">
                    "{deal.summary}"
                  </p>
                </div>
              </div>

              {/* Card Footer date */}
              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>Mis à jour le {deal.date}</span>
                <span className="text-amber-400/90 font-medium group-hover:underline">
                  Suivre le dossier &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
