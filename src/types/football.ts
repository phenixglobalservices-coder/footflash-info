export type Category = 
  | 'tous'
  | 'flash'
  | 'mercato'
  | 'ligue1'
  | 'champions_league'
  | 'premier_league'
  | 'liga'
  | 'international';

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  content: string;
  likes: number;
  userLiked?: boolean;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  categoryLabel: string;
  club?: string;
  clubLogo?: string;
  author: string;
  authorRole: string;
  date: string;
  timeAgo: string;
  readTime: string;
  imageUrl: string;
  imageCaption?: string;
  summary: string;
  content: string[];
  keyPoints?: string[];
  quote?: {
    text: string;
    speaker: string;
    role: string;
  };
  views: number;
  likes: number;
  isBreaking?: boolean;
  isExclusive?: boolean;
  comments: Comment[];
  audioScript?: string;
  playerRating?: {
    player: string;
    club: string;
    rating: number;
    description: string;
  }[];
}

export interface FlashItem {
  id: string;
  time: string;
  category: 'mercato' | 'match' | 'ligue1' | 'europe' | 'urgent';
  categoryLabel: string;
  title: string;
  isUrgent?: boolean;
  club?: string;
  relatedArticleId?: string;
}

export interface MatchEvent {
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'sub';
  player: string;
  team: 'home' | 'away';
  description?: string;
}

export interface MatchStats {
  possession: [number, number];
  shots: [number, number];
  shotsOnTarget: [number, number];
  xG: [number, number];
  corners: [number, number];
  fouls: [number, number];
}

export interface LiveMatch {
  id: string;
  competition: string;
  competitionIcon: string;
  homeTeam: {
    name: string;
    shortName: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    shortName: string;
    logo: string;
  };
  homeScore: number;
  awayScore: number;
  status: 'LIVE' | 'HT' | 'FT' | 'UPCOMING';
  minute?: string;
  dateStr?: string;
  venue: string;
  events: MatchEvent[];
  stats: MatchStats;
  lineups?: {
    home: string[];
    away: string[];
  };
}

export interface MercatoDeal {
  id: string;
  player: string;
  position: string;
  age: number;
  fromClub: { name: string; logo: string };
  toClub: { name: string; logo: string };
  fee: string;
  reliability: number; // 0 to 100
  status: 'OFFICIEL' | 'ACCORD TOTAL' | 'NÉGOCIATIONS' | 'RUMEUR' | 'PROLONGATION';
  summary: string;
  date: string;
  playerImage: string;
}

export interface StandingTeam {
  rank: number;
  name: string;
  logo: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

export interface TopScorer {
  rank: number;
  name: string;
  club: string;
  clubLogo: string;
  goals: number;
  assists: number;
  matches: number;
  photo: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  category: string;
  options: PollOption[];
  totalVotes: number;
}
