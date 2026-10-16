import React from 'react';
import { 
  Flame, 
  Clock, 
  Bookmark, 
  Share2, 
  Volume2, 
  Eye, 
  ThumbsUp, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { Article } from '../types/football';
import { AudioNarrator } from '../utils/speech';

interface FeaturedHeroProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onLikeArticle: (id: string) => void;
}

export const FeaturedHero: React.FC<FeaturedHeroProps> = ({
  articles,
  onSelectArticle,
  bookmarks,
  onToggleBookmark,
  onLikeArticle
}) => {
  if (!articles.length) return null;

  const mainArticle = articles[0];
  const secondaryArticles = articles.slice(1, 4);

  const isMainBookmarked = bookmarks.includes(mainArticle.id);

  return (
    <section className="space-y-6">
      {/* Main Hero Spotlight */}
      <div 
        onClick={() => onSelectArticle(mainArticle)}
        className="relative group rounded-3xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 shadow-2xl"
      >
        {/* Background Image with Dark Vignette */}
        <div className="relative h-[380px] sm:h-[460px] lg:h-[500px] w-full overflow-hidden">
          <img
            src={mainArticle.imageUrl}
            alt={mainArticle.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f17]/80 via-transparent to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 p-6 sm:p-8 lg:p-10 flex flex-col justify-end">
          {/* Top Tag & Actions */}
          <div className="flex items-center justify-between mb-auto">
            <div className="flex items-center gap-2">
              <span className="bg-red-600 text-white font-black text-xs uppercase px-3 py-1 rounded-full tracking-wider shadow-lg flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                À LA UNE • {mainArticle.categoryLabel}
              </span>
              {mainArticle.isExclusive && (
                <span className="bg-amber-400 text-slate-950 font-black text-xs uppercase px-2.5 py-1 rounded-full tracking-wider shadow">
                  EXCLU FLASH
                </span>
              )}
            </div>

            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => onToggleBookmark(mainArticle.id)}
                className={`p-2.5 rounded-full backdrop-blur-md transition ${
                  isMainBookmarked
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-black/50 text-white hover:bg-black/70'
                }`}
                title={isMainBookmarked ? "Retirer des favoris" : "Ajouter aux favoris"}
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>

          {/* Headline Text */}
          <div className="space-y-3 max-w-3xl">
            <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white group-hover:text-amber-300 transition-colors leading-tight">
              {mainArticle.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 line-clamp-2 sm:line-clamp-3 leading-relaxed font-normal">
              {mainArticle.subtitle}
            </p>

            {/* Footer Metadata */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400 border-t border-slate-700/60">
              <span className="font-semibold text-slate-200">
                Par {mainArticle.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {mainArticle.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                {mainArticle.views.toLocaleString('fr-FR')} lectures
              </span>

              <div className="ml-auto flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    AudioNarrator.speak(mainArticle.summary);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold backdrop-blur-sm transition border border-slate-700"
                  title="Écouter le résumé de cet article"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Écouter 1 min</span>
                </button>

                <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Lire l'article <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Secondary Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {secondaryArticles.map((article) => {
          const isBookmarked = bookmarks.includes(article.id);

          return (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group bg-slate-900 border border-slate-800/90 hover:border-amber-500/40 rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-slate-950/80 backdrop-blur-md text-amber-400 font-black text-[10px] uppercase px-2.5 py-1 rounded-md border border-slate-700/60">
                      {article.categoryLabel}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(article.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${
                      isBookmarked
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-black/40 text-white hover:bg-black/60'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {article.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-slate-800/70 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {article.timeAgo}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLikeArticle(article.id);
                    }}
                    className="flex items-center gap-1 hover:text-amber-400 transition"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{article.likes}</span>
                  </button>
                  <span className="font-bold text-amber-400 group-hover:underline">
                    Lire &rarr;
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
