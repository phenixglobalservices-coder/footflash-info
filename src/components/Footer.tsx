import React from 'react';
import { Flame, Radio, Shield, Globe, Award, Heart } from 'lucide-react';
import { Category } from '../types/football';

interface FooterProps {
  onSelectCategory: (cat: Category) => void;
  onOpenNewsletter: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenNewsletter }) => {
  return (
    <footer className="bg-[#090d16] border-t border-slate-800 text-slate-400 text-xs mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <Flame className="w-6 h-6 fill-slate-950" />
              </div>
              <span className="font-heading font-extrabold text-2xl text-white tracking-tight">
                FOOT<span className="text-amber-400">FLASH</span> INFO
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Le premier média indépendant d'actualité footballistique en direct. Scores en direct, coulisses du mercato, analyses tactiques pointues et couverture 24/7 des plus grands championnats européens.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-[11px] font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                Rédaction en direct
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                Mis à jour à la seconde
              </span>
            </div>
          </div>

          {/* Compétitions */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-3 uppercase tracking-wider">
              Compétitions
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onSelectCategory('ligue1')}
                  className="hover:text-amber-400 transition"
                >
                  Ligue 1 McDonald's
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('champions_league')}
                  className="hover:text-amber-400 transition"
                >
                  Ligue des Champions UEFA
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('premier_league')}
                  className="hover:text-amber-400 transition"
                >
                  Premier League
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('liga')}
                  className="hover:text-amber-400 transition"
                >
                  LaLiga EA Sports
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('international')}
                  className="hover:text-amber-400 transition"
                >
                  Coupe du Monde & Sélections
                </button>
              </li>
            </ul>
          </div>

          {/* Rubriques */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-3 uppercase tracking-wider">
              Rubriques
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onSelectCategory('mercato')}
                  className="hover:text-amber-400 transition flex items-center gap-1"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500" /> Mercato Radar
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('flash')}
                  className="hover:text-amber-400 transition flex items-center gap-1"
                >
                  <Radio className="w-3.5 h-3.5 text-red-500" /> Fil d'actualité 24/7
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenNewsletter}
                  className="hover:text-amber-400 transition"
                >
                  La Matinale Foot
                </button>
              </li>
              <li>
                <a href="#scores" className="hover:text-amber-400 transition">
                  Scores & Match Center
                </a>
              </li>
              <li>
                <a href="#stats" className="hover:text-amber-400 transition">
                  Buteurs & Statistiques
                </a>
              </li>
            </ul>
          </div>

          {/* Editorial & Légal */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-3 uppercase tracking-wider">
              À Propos
            </h4>
            <ul className="space-y-2">
              <li><span className="hover:text-slate-200 cursor-pointer">L'Équipe rédactionnelle</span></li>
              <li><span className="hover:text-slate-200 cursor-pointer">Charte déontologique</span></li>
              <li><span className="hover:text-slate-200 cursor-pointer">Mentions Légales & CGU</span></li>
              <li><span className="hover:text-slate-200 cursor-pointer">Gestion des cookies</span></li>
              <li><span className="hover:text-slate-200 cursor-pointer">Contact & Partenariats</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © 2026 <strong className="text-white">Foot Flash Info</strong>. Tous droits réservés.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            Fait pour les passionnés de football avec <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
