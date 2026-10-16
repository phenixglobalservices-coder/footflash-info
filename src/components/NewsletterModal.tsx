import React, { useState } from 'react';
import { X, Mail, CheckCircle2, ShieldCheck, Flame, Bell } from 'lucide-react';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [favoriteClub, setFavoriteClub] = useState('PSG');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-[#0e1422] border border-slate-700 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>

            <div>
              <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                Édition Abonnés 100% Gratuite
              </span>
              <h3 className="font-heading font-black text-2xl text-white mt-1">
                La Matinale Foot Flash & Le Flash Mercato
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Recevez chaque matin à 7h30 l'essentiel de la nuit foot, les rumeurs mercato brûlantes et l'analyse tactique de nos experts directement dans votre boîte mail.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Votre adresse email
                </label>
                <input
                  type="email"
                  required
                  placeholder="exemple@football.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Votre club de cœur (pour des alertes personnalisées)
                </label>
                <select
                  value={favoriteClub}
                  onChange={(e) => setFavoriteClub(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-400"
                >
                  <option value="PSG">Paris Saint-Germain</option>
                  <option value="OM">Olympique de Marseille</option>
                  <option value="Real Madrid">Real Madrid</option>
                  <option value="FC Barcelone">FC Barcelone</option>
                  <option value="Arsenal">Arsenal FC</option>
                  <option value="Man City">Manchester City</option>
                  <option value="Bayern Munich">Bayern Munich</option>
                  <option value="Autre">Autre club / Tous championnats</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-sm transition shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4 fill-slate-950" />
                S'abonner gratuitement au Flash
              </button>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Pas de spam. Désinscription en 1 clic à tout moment.</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-black text-2xl text-white">
              Bienvenue dans la communauté Foot Flash !
            </h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              Un e-mail de confirmation vient d'être envoyé à <span className="text-amber-400 font-semibold">{email}</span>. Vous recevrez le prochain flash mercato demain matin.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setEmail('');
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition"
            >
              Fermer et continuer ma lecture
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
