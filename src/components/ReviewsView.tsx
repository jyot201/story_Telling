import React, { useState } from 'react';
import { ReviewItem, SavedQuote } from '../types';

interface ReviewsViewProps {
  reviews: ReviewItem[];
  savedQuotes: SavedQuote[];
  onAddReview: (review: Omit<ReviewItem, 'id' | 'date' | 'likes'>) => void;
  onRemoveQuote: (id: string) => void;
  onOpenAiTab?: (tab: 'music' | 'image' | 'video' | 'live' | 'search' | 'transcribe' | 'chat') => void;
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({
  reviews,
  savedQuotes,
  onAddReview,
  onRemoveQuote,
  onOpenAiTab,
}) => {
  const [activeTab, setActiveTab] = useState<'reflections' | 'savedQuotes'>('reflections');
  const [showAddForm, setShowAddForm] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [role, setRole] = useState<'Educator' | 'Parent' | 'Seeker' | 'Young Reader'>('Parent');
  const [storyTitle, setStoryTitle] = useState('The Clockmaker of Whispering Pines');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [sparkPrompt, setSparkPrompt] = useState('Can a mistake ever turn into a compass, or must we always hurry to hide it?');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) return;

    onAddReview({
      authorName,
      role,
      storyTitle,
      rating,
      content,
      sparkPrompt: sparkPrompt || undefined,
    });

    setContent('');
    setAuthorName('');
    setShowAddForm(false);
  };

  const handleCopyQuote = (quote: SavedQuote) => {
    navigator.clipboard.writeText(`"${quote.quote}" — ${quote.attribution} (${quote.storyTitle})`);
    setCopiedId(quote.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-app text-app pb-24 transition-colors duration-500">
      <div className="max-w-4xl mx-auto w-full px-margin-mobile pt-6 pb-6">
        {/* Header Lockup */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-app">
          <div className="flex flex-col gap-1.5">
            <span className="text-primary font-label-sm uppercase tracking-wider flex items-center gap-1.5 font-semibold">
              <span className="material-symbols-outlined text-[16px]">psychology_alt</span>
              Community Lore &amp; Pedagogical Codex
            </span>
            <h1 className="font-headline-lg text-2xl md:text-3xl text-app">
              Reflections &amp; Mentor Notes
            </h1>
            <p className="font-body-sm text-app-muted max-w-xl">
              Shared observations from parents, educators, and thoughtful seekers discussing the moral underpinnings of the tales.
            </p>
          </div>

          {/* Toggle between community reviews & saved quotes */}
          <div className="flex items-center gap-1 bg-app-container p-1 rounded-xl border border-app transition-colors">
            <button
              onClick={() => setActiveTab('reflections')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'reflections'
                  ? 'bg-primary text-on-primary font-semibold shadow-xs'
                  : 'text-app-muted hover:text-app'
              }`}
            >
              Mentor Reflections ({reviews.length})
            </button>
            <button
              onClick={() => setActiveTab('savedQuotes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'savedQuotes'
                  ? 'bg-primary text-on-primary font-semibold shadow-xs'
                  : 'text-app-muted hover:text-app'
              }`}
            >
              Saved Reflections ({savedQuotes.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Community Reflections */}
        {activeTab === 'reflections' && (
          <div className="flex flex-col gap-6 mt-6">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-app-muted uppercase tracking-wider font-semibold">
                Dialogue Sparks &amp; Reviews
              </span>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-3.5 py-1.5 rounded-xl bg-primary/15 text-primary hover:bg-primary hover:text-on-primary text-xs font-semibold transition-all flex items-center gap-1.5 border border-primary/30 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">edit_note</span>
                <span>{showAddForm ? 'Close Form' : 'Inscribe a Reflection'}</span>
              </button>
            </div>

            {/* Inscribe Modal/Form */}
            {showAddForm && (
              <form
                onSubmit={handleSubmit}
                className="p-5 rounded-2xl bg-app-surface border border-primary/30 flex flex-col gap-4 animate-fade-in shadow-xl transition-colors"
              >
                <h3 className="font-headline-sm text-lg text-primary">Inscribe a Philosophical Reflection</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-app-muted font-medium">Your Name / Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Master Elowen or Mother of Two"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-app-container border border-app text-xs text-app focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-app-muted font-medium">Perspective / Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-app-container border border-app text-xs text-app focus:outline-none focus:border-primary"
                    >
                      <option value="Parent">Parent / Mentor</option>
                      <option value="Educator">Educator / Teacher</option>
                      <option value="Seeker">Seeker / Adult Reader</option>
                      <option value="Young Reader">Young Reader (Middle Grade)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-app-muted font-medium">Story</label>
                    <select
                      value={storyTitle}
                      onChange={(e) => setStoryTitle(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-app-container border border-app text-xs text-app focus:outline-none focus:border-primary"
                    >
                      <option value="The Clockmaker of Whispering Pines">The Clockmaker of Whispering Pines</option>
                      <option value="The Cartographer of Silent Oceans">The Cartographer of Silent Oceans</option>
                      <option value="The Weaver of Winter Bells">The Weaver of Winter Bells</option>
                      <option value="The Botanist Who Catalogued Regret">The Botanist Who Catalogued Regret</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-app-muted font-medium">Discussion Spark Responded To (Optional)</label>
                    <input
                      type="text"
                      placeholder="Prompt question"
                      value={sparkPrompt}
                      onChange={(e) => setSparkPrompt(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-app-container border border-app text-xs text-app focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-app-muted font-medium">Your Pedagogical or Personal Reflection</label>
                    {onOpenAiTab && (
                      <button
                        type="button"
                        onClick={() => onOpenAiTab('transcribe')}
                        className="text-[11px] text-primary hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[13px]">mic</span>
                        <span>Dictate with Gemini Transcribe</span>
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share how this chapter or quote was received, lessons learned, or classroom questions that emerged..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full mt-1 p-3 rounded-xl bg-app-container border border-app text-xs text-app focus:outline-none focus:border-primary leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1 text-primary">
                    <span className="text-xs text-app-muted mr-1">Rating:</span>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setRating(s)}
                        className="material-symbols-outlined text-[18px] text-primary cursor-pointer"
                        style={{ fontVariationSettings: s <= rating ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        star
                      </button>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-all cursor-pointer shadow-sm"
                  >
                    Publish Reflection
                  </button>
                </div>
              </form>
            )}

            {/* List of Reviews */}
            <div className="flex flex-col gap-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl bg-app-surface border border-app flex flex-col gap-3 shadow-md transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-headline-sm font-bold border border-primary/20">
                        {rev.authorName.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-title-md text-sm text-app font-semibold">
                            {rev.authorName}
                          </span>
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-app-high text-primary border border-app-subtle">
                            {rev.role}
                          </span>
                        </div>
                        <span className="text-xs text-app-muted">
                          {rev.storyTitle} · {rev.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-primary">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <span
                          key={i}
                          className="material-symbols-outlined text-[15px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                  </div>

                  {rev.sparkPrompt && (
                    <div className="p-2.5 rounded-lg bg-app-container/80 border-l-2 border-primary flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">
                        psychology
                      </span>
                      <p className="text-xs italic text-app-muted">
                        Responding to spark: “{rev.sparkPrompt}”
                      </p>
                    </div>
                  )}

                  <p className="font-body-md text-sm text-app leading-relaxed">
                    {rev.content}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-app text-xs text-app-muted">
                    <span className="flex items-center gap-1.5 text-primary">
                      <span className="material-symbols-outlined text-[14px]">favorite</span>
                      <span>{rev.likes} found this inspiring</span>
                    </span>
                    <span className="text-app-muted/70">Verified Reader</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Saved Reflections from Reader */}
        {activeTab === 'savedQuotes' && (
          <div className="flex flex-col gap-4 mt-6">
            <span className="font-label-sm text-app-muted uppercase tracking-wider font-semibold">
              Illuminated Verses from Your Reading
            </span>

            {savedQuotes.length === 0 ? (
              <div className="p-8 rounded-2xl bg-app-surface border border-app text-center flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-[36px] text-primary/40">
                  bookmark_border
                </span>
                <p className="text-sm text-app">No reflections inscribed yet.</p>
                <p className="text-xs text-app-muted max-w-sm">
                  Tap the bookmark icon on pull-quote cards in the Reader to save verses to your personal codex.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedQuotes.map((sq) => (
                  <div
                    key={sq.id}
                    className="p-5 rounded-2xl bg-app-surface border border-primary/20 flex flex-col justify-between gap-3 relative group shadow-md transition-colors"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between text-xs text-primary">
                        <span className="font-label-sm uppercase tracking-wider flex items-center gap-1 font-semibold">
                          <span className="material-symbols-outlined text-[16px]">format_quote</span>
                          {sq.storyTitle}
                        </span>
                        <span>{sq.verse}</span>
                      </div>
                      <blockquote className="font-headline-sm text-lg text-primary italic leading-snug">
                        “{sq.quote}”
                      </blockquote>
                      <span className="text-xs text-app-muted">
                        — {sq.attribution}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-app text-xs">
                      <button
                        onClick={() => handleCopyQuote(sq)}
                        className="text-primary hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {copiedId === sq.id ? 'check' : 'content_copy'}
                        </span>
                        <span>{copiedId === sq.id ? 'Copied to clipboard' : 'Copy'}</span>
                      </button>

                      <button
                        onClick={() => onRemoveQuote(sq.id)}
                        className="text-app-muted hover:text-red-400 transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
