import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, Clock } from 'lucide-react';
import { Article } from '../types/football';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  bookmarkedIds: string[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  articles,
  bookmarkedIds,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll
}) => {
  if (!isOpen) return null;

  const savedArticles = articles.filter((a) => bookmarkedIds.includes(a.id));

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end">
      <div 
        className="w-full max-w-md bg-[#0e1422] h-full border-l border-slate-800 p-6 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-400/20 text-amber-400 rounded-xl">
              <Bookmark className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-white">
                MES ARTICLES FAVORIS
              </h3>
              <span className="text-xs text-slate-400">
                {savedArticles.length} {savedArticles.length > 1 ? 'articles enregistrés' : 'article enregistré'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {savedArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center px-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mb-3">
                <Bookmark className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-300 mb-1">
                Aucun article enregistré pour le moment
              </p>
              <p className="text-xs text-slate-500">
                Cliquez sur l'icône marque-page sur n'importe quel article pour le lire plus tard.
              </p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className="p-3 bg-slate-900 border border-slate-800/80 hover:border-amber-400/50 rounded-2xl cursor-pointer group transition-all flex gap-3 relative"
              >
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-400">
                      {article.categoryLabel}
                    </span>
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-white line-clamp-2 leading-tight group-hover:text-amber-300 transition-colors">
                      {article.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> {article.readTime}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveBookmark(article.id);
                      }}
                      className="text-slate-500 hover:text-red-400 p-1"
                      title="Supprimer des favoris"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {savedArticles.length > 0 && (
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> Tout effacer
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition"
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
