import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  Bookmark, 
  Share2, 
  Volume2, 
  VolumeX, 
  ThumbsUp, 
  MessageSquare, 
  Check, 
  Send,
  Star,
  Quote,
  Flame,
  User
} from 'lucide-react';
import { Article, Comment } from '../types/football';
import { AudioNarrator } from '../utils/speech';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onLikeArticle: (id: string) => void;
  onAddComment: (articleId: string, commentText: string, authorName: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onLikeArticle,
  onAddComment
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});

  if (!article) return null;

  const handleToggleVoice = () => {
    if (isSpeaking) {
      AudioNarrator.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const fullText = `${article.title}. ${article.subtitle}. ${article.content.join(' ')}`;
      AudioNarrator.speak(fullText, () => setIsSpeaking(false));
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: article.subtitle,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const author = authorName.trim() || 'Supporter Foot Flash';
    onAddComment(article.id, commentText, author);
    setCommentText('');
  };

  const handleLikeComment = (commentId: string) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div 
        className="bg-[#0e1422] border border-slate-700/80 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Close / Header Bar */}
        <div className="sticky top-0 z-20 bg-[#0e1422]/95 backdrop-blur-md px-6 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 font-black text-xs uppercase px-2.5 py-0.5 rounded-full">
              {article.categoryLabel}
            </span>
            {article.isBreaking && (
              <span className="bg-red-600 text-white font-black text-xs uppercase px-2 py-0.5 rounded-full animate-pulse">
                FLASH
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Button */}
            <button
              onClick={handleToggleVoice}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                isSpeaking
                  ? 'bg-amber-400 text-slate-950 animate-pulse'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Arrêter lecture</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <span>Écouter l'article</span>
                </>
              )}
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-xl transition ${
                isBookmarked
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
              title="Ajouter aux favoris"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-xl transition"
              title="Partager l'article"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close button */}
            <button
              onClick={() => {
                AudioNarrator.stop();
                onClose();
              }}
              className="p-2 bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 rounded-xl transition ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero image banner */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1422] via-[#0e1422]/40 to-transparent"></div>
          {article.imageCaption && (
            <span className="absolute bottom-3 left-6 text-xs text-slate-300 bg-black/60 px-3 py-1 rounded-md backdrop-blur-sm">
              📷 {article.imageCaption}
            </span>
          )}
        </div>

        {/* Article Body */}
        <div className="px-6 sm:px-10 py-6 space-y-6">
          {/* Main Title */}
          <div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white leading-tight mb-3">
              {article.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
              {article.subtitle}
            </p>
          </div>

          {/* Byline and Stats */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold font-heading">
                {article.author.charAt(0)}
              </div>
              <div>
                <span className="font-bold text-white block">{article.author}</span>
                <span className="text-slate-400 text-[11px]">{article.authorRole}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {article.timeAgo} • {article.readTime}
              </span>
              <button
                onClick={() => onLikeArticle(article.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-amber-400 transition"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span className="font-bold">{article.likes}</span>
              </button>
            </div>
          </div>

          {/* Key Points Takeaway */}
          {article.keyPoints && article.keyPoints.length > 0 && (
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4 sm:p-5">
              <h4 className="font-heading font-bold text-amber-400 text-sm uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Flame className="w-4 h-4 fill-amber-400" /> Les points clés du dossier
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200">
                {article.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article paragraphs */}
          <div className="space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed">
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Highlight Quote */}
          {article.quote && (
            <div className="bg-slate-900 border-l-4 border-amber-400 rounded-r-2xl p-5 my-6 italic text-slate-100">
              <Quote className="w-6 h-6 text-amber-400/50 mb-2" />
              <p className="text-base sm:text-lg font-medium leading-snug">
                « {article.quote.text} »
              </p>
              <div className="mt-3 text-xs text-amber-400 not-italic font-bold">
                — {article.quote.speaker}, <span className="text-slate-400 font-normal">{article.quote.role}</span>
              </div>
            </div>
          )}

          {/* Player Ratings (if available) */}
          {article.playerRating && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mt-6">
              <h4 className="font-heading font-bold text-base text-white mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Les notes de la rédaction
              </h4>
              <div className="space-y-3">
                {article.playerRating.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                    <div>
                      <span className="font-bold text-white text-sm block">{item.player}</span>
                      <span className="text-xs text-slate-400">{item.description}</span>
                    </div>
                    <div className="bg-amber-400 text-slate-950 font-black text-sm px-2.5 py-1 rounded-lg font-mono">
                      {item.rating}/10
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="pt-8 border-t border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-400" />
                Commentaires ({article.comments.length})
              </h3>
              <span className="text-xs text-slate-400">Espace débat supporters</span>
            </div>

            {/* Comment Submission Form */}
            <form onSubmit={handleCommentSubmit} className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Votre pseudo (ex: Parisien92, Madridista...)"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="bg-slate-950 text-xs sm:text-sm text-slate-100 placeholder-slate-500 px-3 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-amber-400 w-64"
                />
              </div>

              <textarea
                placeholder="Donnez votre avis sur cet article ou ce transfert..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={2}
                className="w-full bg-slate-950 text-xs sm:text-sm text-slate-100 placeholder-slate-500 p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  Publier mon commentaire
                </button>
              </div>
            </form>

            {/* Existing Comments List */}
            <div className="space-y-3">
              {article.comments.length === 0 ? (
                <p className="text-xs text-slate-500 italic text-center py-4">
                  Soyez le premier supporter à commenter cette actualité !
                </p>
              ) : (
                article.comments.map((comment) => {
                  const isLiked = likedComments[comment.id];
                  const likesCount = comment.likes + (isLiked ? 1 : 0);

                  return (
                    <div
                      key={comment.id}
                      className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img
                            src={comment.avatar}
                            alt={comment.author}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="font-bold text-slate-200">{comment.author}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">{comment.timeAgo}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-snug">
                        {comment.content}
                      </p>

                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => handleLikeComment(comment.id)}
                          className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded transition ${
                            isLiked
                              ? 'text-amber-400 font-bold bg-amber-950/40'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{likesCount}</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
