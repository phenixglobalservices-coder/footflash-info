import React, { useState, useEffect } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  BreakingTicker 
} from './components/BreakingTicker';
import { 
  LiveScoreStrip 
} from './components/LiveScoreStrip';
import { 
  FeaturedHero 
} from './components/FeaturedHero';
import { 
  FlashFeedSidebar 
} from './components/FlashFeedSidebar';
import { 
  MercatoRadar 
} from './components/MercatoRadar';
import {
  AdBanner
} from './components/AdBanner';
import {
  AdBanner320x50
} from './components/AdBanner320x50';
import {
  AdBanner300x250
} from './components/AdBanner300x250';
import { 
  StandingsWidget 
} from './components/StandingsWidget';
import { 
  PollWidget 
} from './components/PollWidget';
import { 
  ArticleModal 
} from './components/ArticleModal';
import { 
  MatchDetailsModal 
} from './components/MatchDetailsModal';
import { 
  BookmarksDrawer 
} from './components/BookmarksDrawer';
import { 
  NewsletterModal 
} from './components/NewsletterModal';
import { 
  Footer 
} from './components/Footer';

import { 
  Article, 
  Category, 
  FlashItem, 
  LiveMatch, 
  MercatoDeal 
} from './types/football';

import { 
  INITIAL_ARTICLES, 
  INITIAL_FLASHES, 
  LIVE_MATCHES, 
  MERCATO_DEALS 
} from './data/mockFootballData';

import { AudioNarrator } from './utils/speech';
import { Flame, Bell, Sparkles, Filter, Newspaper, Trophy, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [flashes, setFlashes] = useState<FlashItem[]>(INITIAL_FLASHES);
  const [liveMatches, setLiveMatches] = useState<LiveMatch[]>(LIVE_MATCHES);
  const [mercatoDeals, setMercatoDeals] = useState<MercatoDeal[]>(MERCATO_DEALS);

  const [currentCategory, setCurrentCategory] = useState<Category>('tous');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<LiveMatch | null>(null);
  
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [flashNotification, setFlashNotification] = useState<string | null>(null);

  // Load bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('foot_flash_bookmarks');
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch (e) {
      // Ignore
    }

    const unsubscribe = AudioNarrator.subscribe((speaking) => {
      setIsAudioPlaying(speaking);
    });

    return () => {
      unsubscribe();
      AudioNarrator.stop();
    };
  }, []);

  // Save bookmarks
  const saveBookmarks = (newBookmarks: string[]) => {
    setBookmarks(newBookmarks);
    try {
      localStorage.setItem('foot_flash_bookmarks', JSON.stringify(newBookmarks));
    } catch (e) {
      // Ignore
    }
  };

  const handleToggleBookmark = (id: string) => {
    if (bookmarks.includes(id)) {
      saveBookmarks(bookmarks.filter((bId) => bId !== id));
    } else {
      saveBookmarks([...bookmarks, id]);
    }
  };

  const handleLikeArticle = (id: string) => {
    setArticles((prev) =>
      prev.map((art) => (art.id === id ? { ...art, likes: art.likes + 1 } : art))
    );
    if (selectedArticle && selectedArticle.id === id) {
      setSelectedArticle((prev) => prev ? { ...prev, likes: prev.likes + 1 } : null);
    }
  };

  const handleAddComment = (articleId: string, content: string, author: string) => {
    const newComment = {
      id: `comm-${Date.now()}`,
      author,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      timeAgo: "À l'instant",
      content,
      likes: 0
    };

    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === articleId) {
          return {
            ...art,
            comments: [newComment, ...art.comments]
          };
        }
        return art;
      })
    );

    if (selectedArticle && selectedArticle.id === articleId) {
      setSelectedArticle((prev) =>
        prev
          ? {
              ...prev,
              comments: [newComment, ...prev.comments]
            }
          : null
      );
    }
  };

  // Toggle vocal narration for top flash news
  const handleToggleFlashAudio = () => {
    if (isAudioPlaying) {
      AudioNarrator.stop();
    } else {
      const flashSpeech = flashes
        .slice(0, 3)
        .map((f, i) => `Flash numéro ${i + 1} : ${f.title}`)
        .join('. ');
      AudioNarrator.speak(`Voici les derniers flashs de l'actualité football sur Foot Flash Info. ${flashSpeech}`);
    }
  };

  // Simulate dynamic incoming flash item
  const handleSimulateNewFlash = () => {
    const simulatedPool: Omit<FlashItem, 'id' | 'time'>[] = [
      {
        category: 'urgent',
        categoryLabel: 'URGENT',
        title: '🚨 EXCLU : Le Real Madrid prolonge Eduardo Camavinga jusqu\'en 2031 avec revalorisation salariale majeure !',
        isUrgent: true,
        club: 'Real Madrid'
      },
      {
        category: 'mercato',
        categoryLabel: 'MERCATO',
        title: '🔥 Visite médicale validée à Londres pour Viktor Gyökeres avec Arsenal !',
        isUrgent: true,
        club: 'Arsenal'
      },
      {
        category: 'ligue1',
        categoryLabel: 'LIGUE 1',
        title: '⚡ PSG : Warren Zaïre-Emery reprend l\'entraînement collectif à pleine intensité ce matin au Campus',
        isUrgent: false,
        club: 'PSG'
      },
      {
        category: 'europe',
        categoryLabel: 'ESPAGNE',
        title: '🇪🇸 Ballon d\'Or : Hansi Flick affirme que "Lamine Yamal n\'a pas de limites"',
        isUrgent: false,
        club: 'FC Barcelone'
      }
    ];

    const randomPick = simulatedPool[Math.floor(Math.random() * simulatedPool.length)];
    const newFlashItem: FlashItem = {
      ...randomPick,
      id: `f-${Date.now()}`,
      time: "À l'instant"
    };

    setFlashes((prev) => [newFlashItem, ...prev]);
    setFlashNotification(newFlashItem.title);

    // Audio chime or alert
    setTimeout(() => {
      setFlashNotification(null);
    }, 6000);
  };

  // Filter articles based on Category and Search Query
  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      searchQuery === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art.club && art.club.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (currentCategory === 'tous') return true;
    if (currentCategory === 'flash') return true;
    if (currentCategory === 'mercato') return art.category === 'mercato';
    if (currentCategory === 'champions_league') return art.category === 'champions_league';
    if (currentCategory === 'ligue1') return art.category === 'ligue1';
    if (currentCategory === 'premier_league') return art.category === 'premier_league';
    if (currentCategory === 'liga') return art.club === 'Real Madrid' || art.club === 'FC Barcelone';
    if (currentCategory === 'international') return art.category === 'international';

    return true;
  });

  const handleSelectFlash = (flash: FlashItem) => {
    if (flash.relatedArticleId) {
      const targetArticle = articles.find((a) => a.id === flash.relatedArticleId);
      if (targetArticle) {
        setSelectedArticle(targetArticle);
        return;
      }
    }
    // If no direct article, open first article or audio
    if (articles.length > 0) {
      setSelectedArticle(articles[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-black">
      {/* Toast Notification for New Incoming Flash Scoop */}
      {flashNotification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-gradient-to-r from-red-600 to-amber-600 text-white p-4 rounded-2xl shadow-2xl border border-white/20 flex items-start gap-3 animate-in slide-in-from-bottom duration-300">
          <div className="p-2 bg-white/20 rounded-xl">
            <Zap className="w-5 h-5 text-white animate-bounce" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-black uppercase tracking-wider block text-white/90">
              NOUVEAU FLASH INFO EN DIRECT
            </span>
            <p className="text-xs sm:text-sm font-semibold mt-0.5 leading-tight">
              {flashNotification}
            </p>
          </div>
          <button
            onClick={() => setFlashNotification(null)}
            className="text-white/80 hover:text-white p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main App Navigation */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={setCurrentCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        bookmarksCount={bookmarks.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleFlashAudio={handleToggleFlashAudio}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      {/* Breaking Live Ticker Strip */}
      <BreakingTicker
        flashes={flashes}
        onSelectFlash={handleSelectFlash}
      />

      {/* Live Match Center Strip */}
      <LiveScoreStrip
        matches={liveMatches}
        onSelectMatch={setSelectedMatch}
      />

      {/* Main Layout Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full space-y-10">
        
        {/* Active Filter / Search notification banner if filtering */}
        {(searchQuery || currentCategory !== 'tous') && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Filter className="w-4 h-4 text-amber-400" />
              <span>
                Filtre actif : <strong className="text-amber-400 capitalize">{currentCategory.replace('_', ' ')}</strong>
                {searchQuery && <> • Recherche : "<strong className="text-white">{searchQuery}</strong>"</>}
              </span>
            </div>

            <button
              onClick={() => {
                setCurrentCategory('tous');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Top Grid: Lead News & Live Continuous Wire (Fil Info 24/7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Columns: Featured Stories & Articles (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <FeaturedHero
              articles={filteredArticles}
              onSelectArticle={setSelectedArticle}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
              onLikeArticle={handleLikeArticle}
            />

            {/* If no articles match query */}
            {filteredArticles.length === 0 && (
              <div className="bg-slate-900/60 rounded-3xl p-10 text-center border border-slate-800">
                <p className="text-slate-300 text-base font-semibold">
                  Aucun article ne correspond à votre recherche "{searchQuery}".
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Essayez avec un nom de club ou de joueur comme "Mbappé", "PSG", ou "Barça".
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Effacer la recherche
                </button>
              </div>
            )}

            {/* Quick Action Banner: Podcast / Audio Flash */}
            <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-3xl p-6 sm:p-7 text-slate-950 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="bg-black/20 text-slate-950 font-black text-[10px] uppercase px-2.5 py-1 rounded-md tracking-wider">
                  AUDIO & PODCAST FLASH
                </span>
                <h3 className="font-heading font-black text-xl sm:text-2xl mt-1.5 leading-tight">
                  Pressé ? Écoutez le récap des 3 grands flashs du jour
                </h3>
                <p className="text-xs sm:text-sm text-slate-900 font-medium mt-1">
                  Synthèse vocale en direct des dernières dépêches européennes.
                </p>
              </div>

              <button
                onClick={handleToggleFlashAudio}
                className="shrink-0 px-6 py-3 bg-slate-950 hover:bg-slate-900 text-amber-400 font-black rounded-2xl text-xs sm:text-sm transition shadow-lg flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-amber-400" />
                {isAudioPlaying ? 'Arrêter la lecture' : 'Lancer le Flash Audio'}
              </button>
            </div>
          </div>

          {/* Right Sidebar: Fil Info 24/7 (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <FlashFeedSidebar
              flashes={flashes}
              onSelectFlash={handleSelectFlash}
              onSimulateNewFlash={handleSimulateNewFlash}
            />

            {/* Mobile / Compact Ad Slot (320x50) */}
            <AdBanner320x50 />

            {/* Daily Fan Vote Poll */}
            <PollWidget />
          </div>
        </div>

        {/* Advertisement Slot */}
        <AdBanner />

        {/* Section 2: Mercato Radar */}
        <div id="mercato">
          <MercatoRadar deals={mercatoDeals} />
        </div>

        {/* Section 3: Standings & Stats Section */}
        <div id="stats" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <StandingsWidget />
          </div>

          {/* Side Banner: Newsletter & Mobile App preview */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="bg-gradient-to-br from-slate-900 to-blue-950/40 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-500/30 px-2.5 py-1 rounded-full">
                  FOOT FLASH CLUB
                </span>
                <h3 className="font-heading font-black text-xl text-white mt-3">
                  Ne manquez plus aucune officialisation mercato
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Inscrivez-vous à nos alertes instantanées par email et recevez les notifications prioritaires sur votre club favori.
                </p>
              </div>

              <button
                onClick={() => setIsNewsletterOpen(true)}
                className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition shadow-md"
              >
                Rejoindre la Matinale Foot (Gratuit)
              </button>
            </div>

            {/* Medium Rectangle Ad Banner (300x250) */}
            <AdBanner300x250 />

            {/* Editorial Commitment card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 text-xs text-slate-400 space-y-2">
              <h4 className="font-heading font-bold text-slate-200 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Information vérifiée & Sourcée
              </h4>
              <p className="leading-relaxed">
                Toutes nos dépêches sont croisées avec les correspondants locaux en France, Angleterre, Espagne et Allemagne pour garantir la meilleure fiabilité de l'information.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* Global Modals and Drawers */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        isBookmarked={selectedArticle ? bookmarks.includes(selectedArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onLikeArticle={handleLikeArticle}
        onAddComment={handleAddComment}
      />

      <MatchDetailsModal
        match={selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />

      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        articles={articles}
        bookmarkedIds={bookmarks}
        onSelectArticle={setSelectedArticle}
        onRemoveBookmark={handleToggleBookmark}
        onClearAll={() => saveBookmarks([])}
      />

      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={setCurrentCategory}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />
    </div>
  );
}
