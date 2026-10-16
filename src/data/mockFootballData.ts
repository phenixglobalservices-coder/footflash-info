import { Article, FlashItem, LiveMatch, MercatoDeal, StandingTeam, TopScorer, Poll } from '../types/football';

export const INITIAL_FLASHES: FlashItem[] = [
  {
    id: 'f-1',
    time: 'Il y a 3 min',
    category: 'urgent',
    categoryLabel: 'URGENT',
    title: '🚨 Real Madrid : Kylian Mbappé élu joueur du mois après un triplé retentissant en Ligue des Champions !',
    isUrgent: true,
    club: 'Real Madrid',
    relatedArticleId: 'art-1'
  },
  {
    id: 'f-2',
    time: 'Il y a 11 min',
    category: 'mercato',
    categoryLabel: 'MERCATO',
    title: '🔥 Accord de principe trouvé entre le Bayern Munich et le PSG pour le transfert de Joshua Kimmich',
    isUrgent: false,
    club: 'PSG',
    relatedArticleId: 'art-3'
  },
  {
    id: 'f-3',
    time: 'Il y a 24 min',
    category: 'match',
    categoryLabel: 'LDC',
    title: '⚡ Man City - Arsenal : Erling Haaland ouvre le score d\'une reprise surpuissante à l\'Etihad (1-0, 18\')',
    isUrgent: false,
    club: 'Manchester City'
  },
  {
    id: 'f-4',
    time: 'Il y a 38 min',
    category: 'ligue1',
    categoryLabel: 'LIGUE 1',
    title: '🔵 OM : Roberto De Zerbi confirme le retour de Mason Greenwood dans le groupe pour le choc contre Monaco',
    isUrgent: false,
    club: 'OM',
    relatedArticleId: 'art-4'
  },
  {
    id: 'f-5',
    time: 'Il y a 52 min',
    category: 'europe',
    categoryLabel: 'ESPAGNE',
    title: '🇪🇸 Barça : Lamine Yamal prolonge officiellement son contrat avec une clause libératoire à 1 milliard d\'euros',
    isUrgent: false,
    club: 'FC Barcelone'
  },
  {
    id: 'f-6',
    time: 'Il y a 1h',
    category: 'urgent',
    categoryLabel: 'BLEUS',
    title: '🇫🇷 Didier Deschamps dévoilera sa liste ce jeudi avec la première convocation attendue de Michael Olise et Rayan Cherki',
    isUrgent: true,
    club: 'Équipe de France'
  },
  {
    id: 'f-7',
    time: 'Il y a 1h 15',
    category: 'mercato',
    categoryLabel: 'MERCATO',
    title: '💰 Liverpool prépare une offre record de 120M€ pour Florian Wirtz (Bayer Leverkusen)',
    isUrgent: false,
    club: 'Liverpool'
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Masterclass européenne : Comment Mbappé a transformé le Real Madrid en machine à gagner',
    subtitle: 'Auteur d\'un triplé historique et d\'une influence totale dans le jeu, l\'attaquant tricolore fait taire les derniers sceptiques dans la capitale espagnole.',
    category: 'champions_league',
    categoryLabel: 'Ligue des Champions',
    club: 'Real Madrid',
    clubLogo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=120&q=80',
    author: 'Alexandre Mercier',
    authorRole: 'Grand reporter Foot Flash Info',
    date: '14 Octobre 2026',
    timeAgo: 'Il y a 24 min',
    readTime: '4 min de lecture',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1400&q=80',
    imageCaption: 'Kylian Mbappé célébrant son troisième but sous l\'ovation du Santiago Bernabéu.',
    summary: 'Au terme d\'une prestation stratosphérique ponctuée de trois buts et d\'une passe décisive, Kylian Mbappé s\'est définitivement approprié les clés du Bernabéu.',
    content: [
      'Ceux qui redoutaient un embouteillage tactique avec Vinicius Junior et Jude Bellingham en sont pour leurs frais. Mardi soir, sur la pelouse du Santiago Bernabéu, le Real Madrid a livré son récital le plus accompli de la saison européenne.',
      'Aligné à la pointe de l\'attaque mais jouissant d\'une liberté totale pour décrocher et attaquer la profondeur, Mbappé a fait vivre un calvaire sans fin à la charnière adverse. Vitesse, justesse technique dans les petits espaces et sang-froid glacial devant la cage : le capitaine des Bleus a rayonné.',
      'Carlo Ancelotti ne cachait pas son admiration en conférence de presse d\'après-match : "Ce que Kylian fait est tout simplement unique. Il s\'est parfaitement intégré à notre collectif et comprend instinctivement les déplacements de ses partenaires."',
      'Avec désormais 14 buts inscrits en 11 rencontres toutes compétitions confondues sous le maillot merengue, l\'ancien Parisien confirme son statut de grand favori pour les distinctions individuelles de la saison.'
    ],
    keyPoints: [
      'Triplé et 1 passe décisive en 82 minutes de jeu',
      '94% de passes réussies et 6 dribbles tranchants',
      'Le Real Madrid prend seul la tête de la phase de ligue en C1'
    ],
    quote: {
      text: 'Nous avons trouvé notre alchimie. Jouer avec Vinicius, Jude et Rodrygo rend tout plus facile. Ce n\'est que le début.',
      speaker: 'Kylian Mbappé',
      role: 'Attaquant du Real Madrid'
    },
    views: 48920,
    likes: 3410,
    isBreaking: true,
    isExclusive: true,
    audioScript: 'Bienvenue sur Foot Flash Info. Kylian Mbappé a livré une masterclass au Santiago Bernabéu avec un triplé magistral. Carlo Ancelotti a salué une entente parfaite avec Vinicius Junior et Jude Bellingham.',
    playerRating: [
      { player: 'Kylian Mbappé', club: 'Real Madrid', rating: 9.5, description: 'Triplé magique, intenable sur chaque prise de balle.' },
      { player: 'Vinicius Jr', club: 'Real Madrid', rating: 8.5, description: 'Deux passes décisives et une débauche d\'énergie phénoménale.' },
      { player: 'Jude Bellingham', club: 'Real Madrid', rating: 8.0, description: 'Le métronome de l\'entrejeu madrilène.' }
    ],
    comments: [
      {
        id: 'c-1',
        author: 'Karim_Madrista',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        timeAgo: 'Il y a 15 min',
        content: 'Incroyable match ! Quand il accélère comme ça, aucun défenseur au monde ne peut tenir le choc. Hala Madrid !',
        likes: 42
      },
      {
        id: 'c-2',
        author: 'Julien_FootLover',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        timeAgo: 'Il y a 8 min',
        content: 'La connexion avec Vini fait peur à toute l\'Europe... Man City et le Bayern ont de quoi s\'inquiéter.',
        likes: 19
      }
    ]
  },
  {
    id: 'art-2',
    title: 'PSG : Bradley Barcola et Ousmane Dembélé, le duo qui enflamme l\'Europe',
    subtitle: 'Luis Enrique a bâti une animation offensive ultra-rapide axée sur la percussion et le contre-pressing.',
    category: 'ligue1',
    categoryLabel: 'Ligue 1',
    club: 'Paris Saint-Germain',
    author: 'Thomas Riviere',
    authorRole: 'Correspondant Paris',
    date: '14 Octobre 2026',
    timeAgo: 'Il y a 1h 10',
    readTime: '3 min de lecture',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1400&q=80',
    imageCaption: 'Le PSG domine le championnat grâce à sa jeunesse triomphante et un pressing étouffant.',
    summary: 'Avec 28 buts marqués en 8 journées, le Paris Saint-Germain réalise son meilleur début de saison offensive depuis cinq ans.',
    content: [
      'Libéré de toute dépendance à une superstar unique, le Paris Saint-Germain affiche un visage collectif séduisant et vorace. Bradley Barcola, devenu titulaire indiscutable sur l\'aile gauche, enchaîne les gestes de grande classe.',
      'À droite, Ousmane Dembélé régale par sa vista et ses passes laser. "Nous courons tous les uns pour les autres, le plaisir est total sur le terrain", confiait Barcola à la sortie de l\'entraînement au Campus PSG.',
      'Luis Enrique dispose d\'une profondeur de banc impressionnante et d\'un milieu de terrain Neves-Vitinha-Zaïre-Emery qui dicte le tempo à chaque confrontation.'
    ],
    views: 31250,
    likes: 1840,
    isBreaking: false,
    comments: [
      {
        id: 'c-3',
        author: 'ParisienDu16',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        timeAgo: 'Il y a 40 min',
        content: 'Barcola Ballon d\'Or potentiel d\'ici deux ans, retenez bien ce tweet !',
        likes: 15
      }
    ]
  },
  {
    id: 'art-3',
    title: 'Flash Mercato : Coup de tonnerre pour Joshua Kimmich au PSG ? Les coulisses du dossier',
    subtitle: 'En fin de contrat dans six mois en Bavière, le milieu international allemand a donné son accord pour rejoindre la capitale.',
    category: 'mercato',
    categoryLabel: 'Mercato',
    club: 'Paris Saint-Germain',
    author: 'Hugo Lefevre',
    authorRole: 'Spécialiste Mercato',
    date: '14 Octobre 2026',
    timeAgo: 'Il y a 2h',
    readTime: '5 min de lecture',
    imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1400&q=80',
    summary: 'Le club de la capitale est en passe de réaliser l\'un des coups de l\'année en s\'offrant les services du taulier du Bayern Munich.',
    content: [
      'Selon nos informations exclusives Foot Flash Info, les discussions entre Luis Campos et les représentants de Joshua Kimmich sont entrées dans leur phase finale.',
      'Séduit par le projet sportif parisien et la vision de Luis Enrique, le capitaine allemand de 31 ans aurait refusé les propositions de Manchester City et de Barcelone pour privilégier Paris.',
      'Une prime à la signature record et un bail de quatre saisons sont déjà couchés sur le papier.'
    ],
    keyPoints: [
      'Contrat de 4 ans proposé par le PSG',
      'Salaire estimé à 14M€ par an',
      'Refus des offres de City et du FC Barcelone'
    ],
    views: 65400,
    likes: 4210,
    isBreaking: true,
    isExclusive: true,
    comments: []
  },
  {
    id: 'art-4',
    title: 'OM : La révolution tactique de Roberto De Zerbi passée au crible',
    subtitle: 'Possession agressive, sortie de balle sous haute tension et Vélodrome en fusion : l\'entraîneur italien a transformé Marseille.',
    category: 'ligue1',
    categoryLabel: 'Ligue 1',
    club: 'Olympique de Marseille',
    author: 'Matthieu Blanc',
    authorRole: 'Analyste Tactique',
    date: '13 Octobre 2026',
    timeAgo: 'Il y a 4h',
    readTime: '6 min de lecture',
    imageUrl: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1400&q=80',
    summary: 'Deuxième de Ligue 1 avec un football offensif sans concession, l\'Olympique de Marseille séduit autant qu\'il impressionne.',
    content: [
      'Il fallait oser attirer l\'un des théoriciens les plus audacieux du football moderne sur la Canebière. Quelques mois après son arrivée, Roberto De Zerbi a déjà conquis le cœur des supporters marseillais.',
      'Son schéma en 3-2-4-1 en phase de possession désarçonne les blocs bas adverses. Le gardien Geronimo Rulli agit comme un véritable libero créateur de surnombre.',
      '"Nous ne spéculons jamais sur le résultat. Notre obligation est de procurer de l\'émotion à nos supporters", rappelait le technicien transalpin.'
    ],
    views: 22800,
    likes: 1980,
    comments: []
  },
  {
    id: 'art-5',
    title: 'Premier League : Le choc des titans entre Guardiola et Arteta électrise l\'Angleterre',
    subtitle: 'Manchester City et Arsenal se livrent une bataille tactique de très haut vol pour le fauteuil de leader.',
    category: 'premier_league',
    categoryLabel: 'Premier League',
    club: 'Manchester City',
    author: 'Samir Benali',
    authorRole: 'Correspondant Royaume-Uni',
    date: '13 Octobre 2026',
    timeAgo: 'Il y a 6h',
    readTime: '4 min de lecture',
    imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1400&q=80',
    summary: 'Deux points seulement séparent les deux cadors d\'Outre-Manche avant le money time de la saison.',
    content: [
      'Le maître face à l\'élève : la rivalité entre Pep Guardiola et Mikel Arteta est devenue le sommet absolu du football anglais.',
      'Arsenal impressionne par sa solidité défensive incarnée par la charnière Saliba - Gabriel, tandis que Manchester City compte sur l\'insolente efficacité d\'Erling Haaland.'
    ],
    views: 39100,
    likes: 2150,
    comments: []
  },
  {
    id: 'art-6',
    title: 'Ballon d\'Or 2027 : Qui sont les 5 favoris à mi-parcours de la saison ?',
    subtitle: 'Mbappé, Vinicius, Haaland, Bellingham et le prodige Lamine Yamal se disputent la couronne suprême.',
    category: 'international',
    categoryLabel: 'International',
    author: 'Alexandre Mercier',
    authorRole: 'Rédacteur en chef',
    date: '12 Octobre 2026',
    timeAgo: 'Il y a 1 jour',
    readTime: '5 min de lecture',
    imageUrl: 'https://images.unsplash.com/photo-1489944445391-11dd35574549?auto=format&fit=crop&w=1400&q=80',
    summary: 'Le trophée individuel le plus prestigieux s\'annonce plus disputé que jamais après des performances collectives exceptionnelles.',
    content: [
      'Chaque semaine apporte son lot de coups d\'éclat. Entre les records de précocité battus par Lamine Yamal et la régularité impériale d\'Erling Haaland, le scrutin s\'annonce passionnant.',
      'La nouvelle formule de la Ligue des Champions sera le juge de paix pour départager ces géants du ballon rond.'
    ],
    views: 54100,
    likes: 3890,
    comments: []
  }
];

export const LIVE_MATCHES: LiveMatch[] = [
  {
    id: 'm-1',
    competition: 'Ligue des Champions',
    competitionIcon: '🏆',
    homeTeam: {
      name: 'Real Madrid',
      shortName: 'RMA',
      logo: '👑'
    },
    awayTeam: {
      name: 'Bayern Munich',
      shortName: 'BAY',
      logo: '🔴'
    },
    homeScore: 3,
    awayScore: 1,
    status: 'LIVE',
    minute: "76'",
    venue: 'Santiago Bernabéu, Madrid',
    events: [
      { minute: 14, type: 'goal', player: 'K. Mbappé (RMA)', team: 'home', description: 'Frappe enroulée lucarne opposée' },
      { minute: 38, type: 'goal', player: 'H. Kane (BAY)', team: 'away', description: 'Tête sur corner de Kimmich' },
      { minute: 58, type: 'goal', player: 'K. Mbappé (RMA)', team: 'home', description: 'Pénalty transformé' },
      { minute: 71, type: 'goal', player: 'Vinicius Jr (RMA)', team: 'home', description: 'Contre-attaque fulgurante' },
      { minute: 64, type: 'yellow_card', player: 'A. Davies (BAY)', team: 'away' }
    ],
    stats: {
      possession: [58, 42],
      shots: [15, 9],
      shotsOnTarget: [8, 4],
      xG: [2.6, 1.1],
      corners: [7, 4],
      fouls: [9, 14]
    },
    lineups: {
      home: ['Courtois', 'Carvajal', 'Militao', 'Rüdiger', 'Mendy', 'Valverde', 'Tchouaméni', 'Bellingham', 'Rodrygo', 'Mbappé', 'Vinicius Jr'],
      away: ['Neuer', 'Boey', 'Upamecano', 'Kim', 'Davies', 'Kimmich', 'Pavlovic', 'Sané', 'Musiala', 'Gnabry', 'Kane']
    }
  },
  {
    id: 'm-2',
    competition: 'Premier League',
    competitionIcon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    homeTeam: {
      name: 'Manchester City',
      shortName: 'MCI',
      logo: '🩵'
    },
    awayTeam: {
      name: 'Arsenal FC',
      shortName: 'ARS',
      logo: '🔴'
    },
    homeScore: 2,
    awayScore: 2,
    status: 'LIVE',
    minute: "88'",
    venue: 'Etihad Stadium, Manchester',
    events: [
      { minute: 18, type: 'goal', player: 'E. Haaland (MCI)', team: 'home' },
      { minute: 42, type: 'goal', player: 'B. Saka (ARS)', team: 'away' },
      { minute: 67, type: 'goal', player: 'K. De Bruyne (MCI)', team: 'home' },
      { minute: 82, type: 'goal', player: 'G. Martinelli (ARS)', team: 'away' }
    ],
    stats: {
      possession: [62, 38],
      shots: [18, 11],
      shotsOnTarget: [7, 5],
      xG: [2.1, 1.8],
      corners: [9, 3],
      fouls: [8, 12]
    }
  },
  {
    id: 'm-3',
    competition: 'Ligue 1 McDonald\'s',
    competitionIcon: '🇫🇷',
    homeTeam: {
      name: 'Paris SG',
      shortName: 'PSG',
      logo: '🗼'
    },
    awayTeam: {
      name: 'Marseille (OM)',
      shortName: 'OM',
      logo: '⚪'
    },
    homeScore: 2,
    awayScore: 0,
    status: 'FT',
    venue: 'Parc des Princes, Paris',
    events: [
      { minute: 23, type: 'goal', player: 'B. Barcola (PSG)', team: 'home' },
      { minute: 65, type: 'goal', player: 'O. Dembélé (PSG)', team: 'home' }
    ],
    stats: {
      possession: [64, 36],
      shots: [16, 7],
      shotsOnTarget: [9, 2],
      xG: [2.4, 0.6],
      corners: [6, 2],
      fouls: [11, 15]
    }
  },
  {
    id: 'm-4',
    competition: 'LaLiga EA Sports',
    competitionIcon: '🇪🇸',
    homeTeam: {
      name: 'FC Barcelone',
      shortName: 'BAR',
      logo: '🔵🔴'
    },
    awayTeam: {
      name: 'Atlético Madrid',
      shortName: 'ATM',
      logo: '⚪🔴'
    },
    homeScore: 0,
    awayScore: 0,
    status: 'UPCOMING',
    dateStr: 'Ce soir à 21h00',
    venue: 'Camp Nou, Barcelone',
    events: [],
    stats: {
      possession: [50, 50],
      shots: [0, 0],
      shotsOnTarget: [0, 0],
      xG: [0, 0],
      corners: [0, 0],
      fouls: [0, 0]
    }
  }
];

export const MERCATO_DEALS: MercatoDeal[] = [
  {
    id: 'mer-1',
    player: 'Joshua Kimmich',
    position: 'Milieu défensif / Latéral droit',
    age: 31,
    fromClub: { name: 'Bayern Munich', logo: '🔴' },
    toClub: { name: 'Paris Saint-Germain', logo: '🗼' },
    fee: 'Gratuit (Fin de contrat) + 15M€ prime',
    reliability: 92,
    status: 'ACCORD TOTAL',
    summary: 'Visite médicale prévue la semaine prochaine à Paris. Contrat de 4 saisons paraphé.',
    date: '14 Oct 2026',
    playerImage: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'mer-2',
    player: 'Florian Wirtz',
    position: 'Milieu offensif',
    age: 23,
    fromClub: { name: 'Bayer Leverkusen', logo: '⚫🔴' },
    toClub: { name: 'Liverpool FC', logo: '🔴' },
    fee: '125M€',
    reliability: 78,
    status: 'NÉGOCIATIONS',
    summary: 'Arne Slot en a fait sa priorité absolue pour remplacer Mohamed Salah la saison prochaine.',
    date: '14 Oct 2026',
    playerImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'mer-3',
    player: 'Viktor Gyökeres',
    position: 'Buteur',
    age: 28,
    fromClub: { name: 'Sporting CP', logo: '🟢⚪' },
    toClub: { name: 'Arsenal FC', logo: '🔴' },
    fee: '85M€ (Clause libératoire)',
    reliability: 88,
    status: 'ACCORD TOTAL',
    summary: 'Mikel Arteta tient enfin son numéro 9 de classe mondiale pour la prochaine fenêtre des transferts.',
    date: '13 Oct 2026',
    playerImage: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'mer-4',
    player: 'Lamine Yamal',
    position: 'Ailier droit',
    age: 19,
    fromClub: { name: 'FC Barcelone', logo: '🔵🔴' },
    toClub: { name: 'FC Barcelone (Prolongation)', logo: '🔵🔴' },
    fee: 'Clause 1 Milliard €',
    reliability: 100,
    status: 'OFFICIEL',
    summary: 'Le crack blaugrana a lié son avenir à son club formateur jusqu\'en juin 2031.',
    date: '12 Oct 2026',
    playerImage: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'mer-5',
    player: 'Theo Hernandez',
    position: 'Latéral gauche',
    age: 29,
    fromClub: { name: 'AC Milan', logo: '🔴⚫' },
    toClub: { name: 'Real Madrid', logo: '👑' },
    fee: '50M€',
    reliability: 65,
    status: 'RUMEUR',
    summary: 'Florentino Pérez envisage un retour de l\'international tricolore pour doubler le flanc gauche.',
    date: '11 Oct 2026',
    playerImage: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=400&q=80'
  }
];

export const STANDINGS_LIGUE1: StandingTeam[] = [
  { rank: 1, name: 'Paris Saint-Germain', logo: '🗼', played: 9, won: 8, drawn: 1, lost: 0, goalsFor: 29, goalsAgainst: 7, goalDiff: 22, points: 25, form: ['W', 'W', 'W', 'W', 'D'] },
  { rank: 2, name: 'Olympique de Marseille', logo: '⚪', played: 9, won: 6, drawn: 2, lost: 1, goalsFor: 21, goalsAgainst: 10, goalDiff: 11, points: 20, form: ['W', 'W', 'D', 'W', 'L'] },
  { rank: 3, name: 'AS Monaco', logo: '🇲🇨', played: 9, won: 6, drawn: 1, lost: 2, goalsFor: 18, goalsAgainst: 9, goalDiff: 9, points: 19, form: ['W', 'L', 'W', 'W', 'W'] },
  { rank: 4, name: 'LOSC Lille', logo: '🐕', played: 9, won: 5, drawn: 2, lost: 2, goalsFor: 16, goalsAgainst: 11, goalDiff: 5, points: 17, form: ['W', 'D', 'W', 'L', 'W'] },
  { rank: 5, name: 'Olympique Lyonnais', logo: '🦁', played: 9, won: 4, drawn: 2, lost: 3, goalsFor: 15, goalsAgainst: 14, goalDiff: 1, points: 14, form: ['L', 'W', 'W', 'D', 'W'] },
  { rank: 6, name: 'RC Lens', logo: '🔴🟡', played: 9, won: 4, drawn: 2, lost: 3, goalsFor: 12, goalsAgainst: 11, goalDiff: 1, points: 14, form: ['D', 'D', 'W', 'L', 'W'] }
];

export const STANDINGS_PREMIER_LEAGUE: StandingTeam[] = [
  { rank: 1, name: 'Manchester City', logo: '🩵', played: 9, won: 7, drawn: 2, lost: 0, goalsFor: 24, goalsAgainst: 8, goalDiff: 16, points: 23, form: ['W', 'W', 'W', 'D', 'W'] },
  { rank: 2, name: 'Arsenal FC', logo: '🔴', played: 9, won: 6, drawn: 3, lost: 0, goalsFor: 20, goalsAgainst: 6, goalDiff: 14, points: 21, form: ['W', 'W', 'D', 'W', 'W'] },
  { rank: 3, name: 'Liverpool FC', logo: '🔴', played: 9, won: 6, drawn: 1, lost: 2, goalsFor: 19, goalsAgainst: 9, goalDiff: 10, points: 19, form: ['L', 'W', 'W', 'W', 'L'] },
  { rank: 4, name: 'Chelsea FC', logo: '🔵', played: 9, won: 5, drawn: 2, lost: 2, goalsFor: 18, goalsAgainst: 12, goalDiff: 6, points: 17, form: ['W', 'D', 'W', 'W', 'L'] },
  { rank: 5, name: 'Aston Villa', logo: '🦁', played: 9, won: 5, drawn: 2, lost: 2, goalsFor: 16, goalsAgainst: 11, goalDiff: 5, points: 17, form: ['W', 'W', 'D', 'L', 'W'] }
];

export const TOP_SCORERS: TopScorer[] = [
  { rank: 1, name: 'Erling Haaland', club: 'Manchester City', clubLogo: '🩵', goals: 13, assists: 2, matches: 9, photo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=200&q=80' },
  { rank: 2, name: 'Kylian Mbappé', club: 'Real Madrid', clubLogo: '👑', goals: 11, assists: 4, matches: 9, photo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=200&q=80' },
  { rank: 3, name: 'Harry Kane', club: 'Bayern Munich', clubLogo: '🔴', goals: 10, assists: 3, matches: 8, photo: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=200&q=80' },
  { rank: 4, name: 'Bradley Barcola', club: 'Paris Saint-Germain', clubLogo: '🗼', goals: 9, assists: 5, matches: 9, photo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=200&q=80' },
  { rank: 5, name: 'Robert Lewandowski', club: 'FC Barcelone', clubLogo: '🔵🔴', goals: 9, assists: 1, matches: 9, photo: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=200&q=80' }
];

export const DAILY_POLL: Poll = {
  id: 'poll-today',
  question: 'Le Real Madrid de Kylian Mbappé remportera-t-il la Ligue des Champions cette saison ?',
  category: 'Ligue des Champions',
  options: [
    { id: 'opt-1', text: 'Oui, intouchables avec ce secteur offensif', votes: 1420 },
    { id: 'opt-2', text: 'Non, Manchester City reste supérieur collectivement', votes: 890 },
    { id: 'opt-3', text: 'Attention au PSG ou au Bayern Munich', votes: 530 }
  ],
  totalVotes: 2840
};
