import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle2, BarChart2, Flame } from 'lucide-react';
import { Poll } from '../types/football';
import { DAILY_POLL } from '../data/mockFootballData';

export const PollWidget: React.FC = () => {
  const [poll, setPoll] = useState<Poll>(DAILY_POLL);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  useEffect(() => {
    const savedVote = localStorage.getItem(`foot_flash_poll_${poll.id}`);
    if (savedVote) {
      setSelectedOption(savedVote);
      setHasVoted(true);
    }
  }, [poll.id]);

  const handleVote = (optionId: string) => {
    if (hasVoted) return;

    setSelectedOption(optionId);
    setHasVoted(true);
    localStorage.setItem(`foot_flash_poll_${poll.id}`, optionId);

    setPoll((prev) => ({
      ...prev,
      totalVotes: prev.totalVotes + 1,
      options: prev.options.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      )
    }));
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
      {/* Title */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-red-600/20 text-red-400 rounded-lg">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-black text-sm uppercase tracking-wider text-white">
              SONDAGE DES SUPPORTERS
            </h3>
            <span className="text-[11px] text-slate-400">{poll.category}</span>
          </div>
        </div>

        <span className="text-[11px] font-mono text-amber-400 font-semibold bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-full">
          {poll.totalVotes.toLocaleString('fr-FR')} votes
        </span>
      </div>

      {/* Question */}
      <h4 className="font-heading font-bold text-base sm:text-lg text-slate-100 mb-4 leading-snug">
        {poll.question}
      </h4>

      {/* Options */}
      <div className="space-y-2.5">
        {poll.options.map((option) => {
          const percentage = poll.totalVotes > 0 
            ? Math.round((option.votes / poll.totalVotes) * 100) 
            : 0;
          const isSelected = selectedOption === option.id;

          return (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={hasVoted}
              className={`w-full relative overflow-hidden rounded-xl border p-3 text-left transition-all ${
                isSelected
                  ? 'border-amber-400 bg-amber-950/20 shadow-md'
                  : 'border-slate-800 bg-slate-900 hover:border-slate-700'
              } ${hasVoted ? 'cursor-default' : 'cursor-pointer hover:border-amber-400/50'}`}
            >
              {/* Animated Percentage Fill Bar */}
              {hasVoted && (
                <div
                  className={`absolute inset-y-0 left-0 transition-all duration-700 ${
                    isSelected ? 'bg-amber-400/20' : 'bg-slate-800/40'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              )}

              <div className="relative z-10 flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected 
                      ? 'border-amber-400 bg-amber-400 text-slate-950' 
                      : 'border-slate-600'
                  }`}>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black"></span>}
                  </div>
                  <span className={`font-medium ${isSelected ? 'text-amber-300 font-semibold' : 'text-slate-200'}`}>
                    {option.text}
                  </span>
                </div>

                {hasVoted && (
                  <span className="font-mono font-bold text-amber-400 shrink-0 text-xs sm:text-sm">
                    {percentage}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {hasVoted && (
        <div className="mt-3.5 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium justify-center">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Votre vote a bien été enregistré. Merci !</span>
        </div>
      )}
    </div>
  );
};
