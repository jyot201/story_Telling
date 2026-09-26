import React, { useState } from 'react';
import { Story, SavedQuote, UserStats, ThemeMode } from '../types';
import { ThemeToggle } from './ThemeToggle';

// 1. Search Modal
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
  onSelectStory: (story: Story) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  stories,
  onSelectStory,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? stories.filter((s) => {
        const q = query.toLowerCase();
        return (
          s.title.toLowerCase().includes(q) ||
          s.author.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.summary.toLowerCase().includes(q) ||
          s.chapters.some((c) => c.paragraphs.some((p) => p.toLowerCase().includes(q)))
        );
      })
    : stories.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="bg-app-surface border border-primary/25 w-full max-w-lg rounded-2xl p-6 shadow-2xl flex flex-col gap-4 text-app transition-colors duration-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-headline-sm text-lg font-bold">
            <span className="material-symbols-outlined text-[20px]">search</span>
            <span>Archive Search</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-app-high text-app-muted hover:text-primary flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            autoFocus
            placeholder="Search tales, authors, verses, or morals..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-app-container border border-app text-sm text-app focus:outline-none focus:border-primary placeholder-app-muted"
          />
        </div>

        <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pt-1">
          <span className="text-[11px] font-semibold text-app-muted uppercase tracking-wider">
            {query.trim() ? 'Matching Records' : 'Curated Suggestions'}
          </span>
          {results.length === 0 ? (
            <p className="text-xs text-app-muted py-4 text-center">
              No matching illuminated scrolls found.
            </p>
          ) : (
            results.map((story) => (
              <div
                key={story.id}
                onClick={() => {
                  onSelectStory(story);
                  onClose();
                }}
                className="p-3 rounded-xl bg-app-container hover:bg-app-high cursor-pointer flex items-center justify-between gap-3 group transition-colors border border-app-subtle"
              >
                <div className="flex flex-col">
                  <span className="font-title-md text-sm text-app group-hover:text-primary transition-colors">
                    {story.title}
                  </span>
                  <span className="text-xs text-app-muted">
                    By {story.author} · {story.category}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-primary group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// 2. Notifications Drawer
interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      title: 'Mentor Spark Discussion Added',
      description: 'Dr. Arthur Penhaligon annotated Chapter II of “The Clockmaker of Whispering Pines”.',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 'notif-2',
      title: 'Daily Contemplation Streak',
      description: 'You have maintained your 3-day quiet reading streak. Peace be upon your hours.',
      time: 'Yesterday',
      unread: false,
    },
    {
      id: 'notif-3',
      title: 'Atelier Inscription Open',
      description: 'New prompts available in the Mythos Forge: “Patience in Winter”.',
      time: '3 days ago',
      unread: false,
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="bg-app-surface border border-primary/25 w-full max-w-md rounded-2xl p-6 shadow-2xl flex flex-col gap-4 text-app transition-colors duration-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-headline-sm text-lg font-bold">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span>Notifications</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-app-high text-app-muted hover:text-primary flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-xl border flex flex-col gap-1 transition-colors ${
                n.unread
                  ? 'bg-primary/10 border-primary/40'
                  : 'bg-app-container border-app'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-title-md text-xs text-app font-semibold flex items-center gap-1.5">
                  {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  {n.title}
                </span>
                <span className="text-[10px] text-app-muted">{n.time}</span>
              </div>
              <p className="text-xs text-app-muted leading-relaxed">
                {n.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 3. Profile Modal
interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
  themeMode?: ThemeMode;
  onSelectThemeMode?: (mode: ThemeMode) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  stats,
  themeMode,
  onSelectThemeMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="bg-app-surface border border-primary/25 w-full max-w-md rounded-2xl p-6 shadow-2xl flex flex-col gap-5 text-app transition-colors duration-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              alt="User Profile"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-primary"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNeEF7UBtVyrTTdKbfUTxPfh2lQ2XokRIrtd5-I5qb_JeVJySIz-meDDA38xkxWke3YVMqumLpc9qtqJCR0-6MW1T_EvBrhrM2Wd7sWDuyhzCxH5T7r8TknWS1uzLGj3fJERgcuH3JAIikYNRWEIA-DOZU7-tP9hCASUGq5VaNLRkliMk9wUqJktVNkrlkdD4qXWtKJA-0Qev3VS_N1x2MqN8VDOZr-1SlPzjE_vqatyXhFrA_03k"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-base text-app font-bold">Seeker &amp; Mentor</span>
              <span className="text-xs text-primary font-medium">Reader Atelier Fellow</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-app-high text-app-muted hover:text-primary flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Theme Preference in Profile */}
        {themeMode && onSelectThemeMode && (
          <div className="p-3.5 rounded-xl bg-app-container border border-app flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-app flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">palette</span>
                Atmosphere Lighting Theme
              </span>
              <span className="text-[11px] text-app-muted capitalize font-medium">{themeMode} Mode</span>
            </div>
            <ThemeToggle
              currentTheme={themeMode}
              onSelectTheme={onSelectThemeMode}
              variant="segmented"
            />
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-app-container border border-app flex flex-col">
            <span className="text-[10px] text-app-muted uppercase font-semibold">Streak</span>
            <span className="text-xl font-bold text-primary font-headline-sm">{stats.streakDays} Days</span>
          </div>
          <div className="p-3 rounded-xl bg-app-container border border-app flex flex-col">
            <span className="text-[10px] text-app-muted uppercase font-semibold">Time Read</span>
            <span className="text-xl font-bold text-primary font-headline-sm">{stats.minutesRead} Mins</span>
          </div>
          <div className="p-3 rounded-xl bg-app-container border border-app flex flex-col">
            <span className="text-[10px] text-app-muted uppercase font-semibold">Reflections</span>
            <span className="text-xl font-bold text-primary font-headline-sm">{stats.reflectionsSaved} Verses</span>
          </div>
          <div className="p-3 rounded-xl bg-app-container border border-app flex flex-col">
            <span className="text-[10px] text-app-muted uppercase font-semibold">Chapters</span>
            <span className="text-xl font-bold text-primary font-headline-sm">{stats.storiesFinished} Finished</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-app-container text-xs text-app-muted leading-relaxed border border-app-subtle">
          <span className="font-semibold text-primary block mb-1">Sanctuary Vow</span>
          “I read not to escape hours, but to render them slow enough to cultivate mercy and craftsmanship.”
        </div>
      </div>
    </div>
  );
};

// 4. Artwork Modal
interface ArtworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: Story;
}

export const ArtworkModal: React.FC<ArtworkModalProps> = ({ isOpen, onClose, story }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="bg-app-surface border border-primary/30 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col text-app transition-colors duration-500">
        <div className="relative aspect-[16/9] w-full bg-black">
          <img
            src={story.coverImage}
            alt={story.sceneBadge}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 text-white hover:text-primary flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-primary uppercase tracking-wider font-semibold">
              {story.actBadge} Scene Atmosphere
            </span>
            <span className="text-xs text-app-muted">Elena Vance Atelier</span>
          </div>
          <h3 className="font-headline-md text-xl text-app">
            {story.sceneBadge}
          </h3>
          <p className="font-body-sm text-xs text-app-muted leading-relaxed">
            An atmospheric, cinematic painting of an ancient whimsical clockmaker workshop nestled in whispering misty pine woods. Intricate brass gears, warm amber glowing lanterns, celestial astronomical orreries, floating golden dust motes, and delicate woodcraft textures.
          </p>
        </div>
      </div>
    </div>
  );
};

// 5. Reflection Modal
interface ReflectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  story: Story;
  onSaveReflection: (note: string) => void;
}

export const ReflectionDialog: React.FC<ReflectionDialogProps> = ({
  isOpen,
  onClose,
  story,
  onSaveReflection,
}) => {
  const [reflectionText, setReflectionText] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!reflectionText.trim()) return;
    onSaveReflection(reflectionText);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="bg-app-surface border border-primary/30 w-full max-w-lg rounded-2xl p-6 shadow-2xl flex flex-col gap-4 text-app transition-colors duration-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-headline-sm text-lg font-bold">
            <span className="material-symbols-outlined text-[20px]">psychology</span>
            <span>Climax &amp; Philosophical Reflection</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-app-high text-app-muted hover:text-primary flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-app-container border border-primary/20 flex flex-col gap-1">
          <span className="text-[11px] text-primary uppercase font-bold tracking-wider">
            Guiding Moral Prompt
          </span>
          <p className="text-xs text-app italic font-medium">
            “A second lost is not empty space—it is soil where forgiveness grows.”
          </p>
          <span className="text-[11px] text-app-muted mt-1">
            How might we grant ourselves patience when our own fingers tremble over an important moment?
          </span>
        </div>

        <div>
          <label className="text-xs text-app-muted font-medium">Your Reflection Journal</label>
          <textarea
            rows={4}
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            placeholder="Inscribe your thoughts, realizations, or takeaways from this chapter..."
            className="w-full mt-1.5 p-3 rounded-xl bg-app-container border border-app text-xs text-app focus:outline-none focus:border-primary leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <span className="text-xs text-primary font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">check</span>
              Inscribed in personal codex!
            </span>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-app-muted hover:text-app cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-all cursor-pointer shadow-sm"
            >
              Inscribe Reflection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 6. Discussion Spark Modal
interface SparkModalProps {
  spark: { id: string; question: string; context?: string } | null;
  onClose: () => void;
  onAnswerSpark: (sparkQuestion: string, answer: string) => void;
}

export const SparkModal: React.FC<SparkModalProps> = ({ spark, onClose, onAnswerSpark }) => {
  const [response, setResponse] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!spark) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!response.trim()) return;
    onAnswerSpark(spark.question, response);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="bg-app-surface border border-primary/30 w-full max-w-md rounded-2xl p-6 shadow-2xl flex flex-col gap-4 text-app transition-colors duration-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-headline-sm text-base font-bold">
            <span className="material-symbols-outlined text-[20px]">forum</span>
            <span>Discussion Spark</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-app-high text-app-muted hover:text-primary flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-app-container border border-primary/20 flex flex-col gap-1.5">
          <p className="text-sm text-app font-medium leading-snug">
            {spark.question}
          </p>
          {spark.context && (
            <span className="text-[11px] text-app-muted italic">
              Context: {spark.context}
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-app-muted font-medium">Your Mentor or Personal Answer</label>
            <textarea
              rows={3}
              required
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Share how you or your students responded to this question..."
              className="w-full mt-1.5 p-3 rounded-xl bg-app-container border border-app text-xs text-app focus:outline-none focus:border-primary leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            {submitted ? (
              <span className="text-xs text-primary font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check</span>
                Added to community reviews!
              </span>
            ) : (
              <div />
            )}

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-all cursor-pointer shadow-sm"
            >
              Post Answer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
