export interface PullQuote {
  quote: string;
  attribution: string;
  verse: string;
  id: string;
}

export interface Chapter {
  id: number;
  numberRoman: string;
  title: string;
  paragraphs: string[];
  pullQuote?: PullQuote;
}

export interface StoryCodex {
  moralThesis: string;
  authorNote: string;
  discussionSparks: {
    id: string;
    question: string;
    context?: string;
  }[];
}

export interface Story {
  id: string;
  title: string;
  author: string;
  category: string;
  ageGroup: string;
  readTime: string;
  coverImage: string;
  sceneBadge: string;
  actBadge: string;
  codex: StoryCodex;
  chapters: Chapter[];
  summary: string;
  featured?: boolean;
}

export interface SavedQuote {
  id: string;
  storyId: string;
  storyTitle: string;
  quote: string;
  attribution: string;
  verse: string;
  savedAt: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  role: 'Educator' | 'Parent' | 'Seeker' | 'Young Reader';
  avatar?: string;
  storyTitle: string;
  rating: number;
  content: string;
  sparkPrompt?: string;
  date: string;
  likes: number;
}

export type ThemeMode = 'night' | 'candle' | 'parchment';

export interface UserStats {
  minutesRead: number;
  storiesFinished: number;
  reflectionsSaved: number;
  streakDays: number;
}
