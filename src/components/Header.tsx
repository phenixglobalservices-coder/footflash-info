import React, { useState } from 'react';
import { 
  Flame, 
  Search, 
  Bookmark, 
  Volume2, 
  VolumeX, 
  Bell, 
  TrendingUp, 
  Menu, 
  X, 
  ShieldAlert,
  Radio
} from 'lucide-react';
import { Category } from '../types/football';

interface HeaderProps {
  currentCategory: Category;
  onSelectCategory: (cat: Category) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  isAudioPlaying: boolean;
  onToggleFlashAudio: () => void;
  onOpenNewsletter: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  bookmarksCount,
  onOpenBookmarks,
  isAudioPlaying,
  onToggleFlashAudio,
  onOpenNewsletter
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsActive, setNotificationsActive] = useState(true);

  const categories: { id: Category; label: string; icon?: string }[] = [
    { id: 'tous', label: 'À la Une' },
    { id: 'flash', label: 'Fil 24/7' },
    { id: 'mercato', label: 'Mercato Radar' },
    { id: 'champions_league', label: 'Ligue des Champions' },
    { id: 'ligue1', label: 'Ligue 1' },
    { id: 'premier_league', label: 'Premier League' },
    { id: 'international', label: 'International' },
  ];

  const currentDateFormatted = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="sticky top-0 z-40 bg-[#0d131f]/95 backdrop-blur-md border-b border-slate-800 shadow-xl transition-all">
      {/* Top Bar with Date & Global Flash status */}
      <div className="bg-[#090d16] border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="capitalize text-slate-300 font-medium">{currentDateFormatted}</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block"></span>
              <span className="flex items-center gap-1 text-[11px]"><Radio className="w-3 h-3 text-emerald-400" /> Édition Live 24/7</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setNotificationsActive(!notificationsActive);
              }}
              title={notificationsActive ? "Alertes flash activées" : "Alertes flash désactivées"}
              className={`flex items-center gap-1 px-2 py-0.5 rounded transition ${
                notificationsActive ? 'text-amber-400 hover:text-amber-300' : 'text-slate-500'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[11px]">
                {notificationsActive ? 'Alertes Flash ON' : 'Alertes Silencieuses'}
              </span>
            </button>
            <button
              onClick={onOpenNewsletter}
              className="text-[11px] text-slate-300 hover:text-amber-400 transition font-medium hidden sm:inline"
            >
              Newsletter Quotidienne
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation and Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => onSelectCategory('tous')}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
              <Flame className="w-6 h-6 text-black fill-black transform group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                  FOOT<span className="text-amber-400">FLASH</span>
                </span>
                <span className="bg-red-600 text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded tracking-widest shadow-sm">
                  INFO
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-semibold tracking-wide">
                L'actualité football à la seconde
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher joueur, club, transfert (ex: Mbappé, PSG, Real...)"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-400 pl-9 pr-4 py-2 rounded-xl border border-slate-700/80 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Actions: Audio Flash, Bookmarks, Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Flash Reader Button */}
            <button
              onClick={onToggleFlashAudio}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shadow-md ${
                isAudioPlaying
                  ? 'bg-amber-400 text-slate-950 shadow-amber-400/30 animate-pulse'
                  : 'bg-slate-800/90 text-slate-200 hover:bg-slate-700 border border-slate-700/60'
              }`}
              title="Écouter le flash audio en direct"
            >
              {isAudioPlaying ? (
                <>
                  <VolumeX className="w-4 h-4 text-slate-950 animate-bounce" />
                  <span className="hidden sm:inline font-bold">Arrêter Flash</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Flash Vocal</span>
                </>
              )}
            </button>

            {/* Bookmarks Counter Button */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-2.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700/60 transition"
              title="Mes articles enregistrés"
            >
              <Bookmark className="w-4 h-4 text-slate-300" />
              {bookmarksCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 bg-slate-800 text-slate-200 rounded-xl hover:bg-slate-700 transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="lg:hidden mt-3 pt-2">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher club, joueur, mercato..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-400 pl-9 pr-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Horizontal Navigation Categories Bar */}
        <nav className="mt-3 pt-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
          {categories.map((cat) => {
            const isActive = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {cat.id === 'mercato' && <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                {cat.id === 'flash' && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                {cat.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer if open */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d131f] border-b border-slate-800 px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="text-xs uppercase font-bold text-slate-400 px-2 tracking-wider">
            Rubriques Principales
          </div>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-lg text-left text-sm font-medium ${
                  currentCategory === cat.id
                    ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30 font-bold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
