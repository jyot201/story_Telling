import React, { useState, useEffect } from 'react';
import { Story, Chapter, SavedQuote, ThemeMode } from '../types';
import { storyAudio } from '../utils/audio';
import { ThemeToggle } from './ThemeToggle';

interface ReaderViewProps {
  story: Story;
  currentChapterIndex: number;
  onSelectChapter: (index: number) => void;
  savedQuotes: SavedQuote[];
  onToggleSaveQuote: (quote: SavedQuote) => void;
  onOpenReflection: () => void;
  onOpenArtworkModal: () => void;
  onOpenSparkModal: (spark: { id: string; question: string; context?: string }) => void;
  onOpenAiTab?: (tab: 'music' | 'image' | 'video' | 'live' | 'search' | 'transcribe' | 'chat') => void;
  themeMode: ThemeMode;
  onSelectThemeMode: (mode: ThemeMode) => void;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  story,
  currentChapterIndex,
  onSelectChapter,
  savedQuotes,
  onToggleSaveQuote,
  onOpenReflection,
  onOpenArtworkModal,
  onOpenSparkModal,
  onOpenAiTab,
  themeMode,
  onSelectThemeMode,
}) => {
  const chapter: Chapter = story.chapters[currentChapterIndex] || story.chapters[0];
  const totalChapters = story.chapters.length;

  // Reader Settings State
  const [controlsOpen, setControlsOpen] = useState(true);
  const [fontScale, setFontScale] = useState(100);
  const [codexOpen, setCodexOpen] = useState(false);
  const [chapterDropdownOpen, setChapterDropdownOpen] = useState(false);
  const [ambientAudioActive, setAmbientAudioActive] = useState(false);

  // Audio Speech State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);

  // Bookmark Chapter State
  const [isChapterBookmarked, setIsChapterBookmarked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Quote check
  const activeQuote = chapter.pullQuote;
  const isQuoteSaved = activeQuote
    ? savedQuotes.some((sq) => sq.id === activeQuote.id || sq.quote === activeQuote.quote)
    : false;

  useEffect(() => {
    storyAudio.setListener((playing, paused) => {
      setIsPlayingAudio(playing);
      setIsAudioPaused(paused);
    });

    return () => {
      storyAudio.stop();
      storyAudio.stopAmbientSoundscape();
    };
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleFontChange = (delta: number) => {
    setFontScale((prev) => Math.min(130, Math.max(85, prev + delta)));
  };

  const handleToggleAudio = () => {
    const fullText = chapter.paragraphs.join(' ');
    storyAudio.toggle(fullText);
  };

  const handleToggleAmbient = () => {
    const newState = storyAudio.toggleAmbientSoundscape();
    setAmbientAudioActive(newState);
    if (newState) {
      triggerToast('Atmosphere enabled: Cedar pine breeze & subtle clockwork');
    } else {
      triggerToast('Atmosphere muted');
    }
  };

  const handleQuoteClick = () => {
    if (!activeQuote) return;
    onToggleSaveQuote({
      id: activeQuote.id,
      storyId: story.id,
      storyTitle: story.title,
      quote: activeQuote.quote,
      attribution: activeQuote.attribution,
      verse: activeQuote.verse,
      savedAt: 'Today',
    });
    triggerToast(isQuoteSaved ? 'Quote removed from saved reflections' : 'Reflection saved to your codex');
  };

  const handleBookmarkToggle = () => {
    setIsChapterBookmarked(!isChapterBookmarked);
    triggerToast(
      !isChapterBookmarked
        ? `Bookmarked ${chapter.numberRoman}: ${chapter.title}`
        : `Bookmark removed`
    );
  };

  const calculateReadPercent = () => {
    if (currentChapterIndex === 1 && totalChapters === 5) return 42;
    return Math.round(((currentChapterIndex + 1) / totalChapters) * 100);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-app text-app transition-colors duration-500">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-app-high/95 border border-primary/40 text-primary rounded-full text-xs font-medium shadow-2xl backdrop-blur-md animate-fade-in flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Reading Progress Bar (Fixed Subtle Filament) */}
      <div className="sticky top-16 z-30 w-full header-blur-bg backdrop-blur-md px-margin-mobile py-space-xs flex items-center justify-between gap-space-md border-b border-app transition-colors duration-500">
        <div className="flex items-center gap-space-xs text-primary">
          <span className="material-symbols-outlined text-[16px]">menu_book</span>
          <span className="font-label-sm text-label-sm tracking-widest uppercase font-semibold">
            {calculateReadPercent()}% Read
          </span>
        </div>
        <div className="flex-1 h-1 bg-app-high rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-300"
            style={{ width: `${calculateReadPercent()}%` }}
          />
        </div>
        <span className="font-label-sm text-label-sm text-app-muted">
          {chapter.numberRoman} of {romanize(totalChapters)}
        </span>
      </div>

      <div className="px-margin-mobile pt-space-md pb-space-xl flex flex-col gap-space-lg max-w-[720px] mx-auto w-full">
        {/* Top Story Metadata & Context */}
        <header className="flex flex-col gap-space-sm">
          <div className="flex flex-wrap items-center gap-space-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-app-high text-app-muted font-label-sm text-label-sm border border-app-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {story.category}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-app-high text-app-muted font-label-sm text-label-sm border border-app-subtle">
              {story.ageGroup}
            </span>
            <span className="inline-flex items-center gap-1 text-app-muted/80 font-label-sm text-label-sm ml-auto">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              {story.readTime}
            </span>
          </div>

          <div className="flex flex-col">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight leading-tight mt-1 text-app">
              {story.title}
            </h1>
            <p className="font-title-md text-title-md text-primary font-normal mt-0.5">
              By {story.author}
            </p>
          </div>

          {/* Chapter Marker & Quick Customization Shelf */}
          <div className="p-space-md bg-app-surface rounded-xl flex flex-col gap-space-sm mt-1 shadow-sm border border-app transition-colors duration-500">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setChapterDropdownOpen(!chapterDropdownOpen)}
                className="flex items-center gap-2 text-left group hover:opacity-90 transition-opacity cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-label-md text-label-md text-app group-hover:text-primary transition-colors">
                  {chapter.numberRoman}: {chapter.title}
                </span>
                <span className="material-symbols-outlined text-[16px] text-primary transition-transform">
                  {chapterDropdownOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              <button
                aria-label="Toggle reader settings"
                onClick={() => setControlsOpen(!controlsOpen)}
                className={`text-app-muted hover:text-primary transition-colors flex items-center gap-1 font-label-sm text-label-sm p-1.5 rounded-lg cursor-pointer ${
                  controlsOpen ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>
            </div>

            {/* Chapter Selection Drawer */}
            {chapterDropdownOpen && (
              <div className="pt-2 border-t border-app flex flex-col gap-1 animate-fade-in">
                <span className="font-label-sm text-label-sm text-app-muted uppercase tracking-wider mb-1">
                  Select Chapter
                </span>
                {story.chapters.map((ch, idx) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      onSelectChapter(idx);
                      setChapterDropdownOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm text-left transition-colors cursor-pointer ${
                      idx === currentChapterIndex
                        ? 'bg-primary/15 text-primary font-semibold'
                        : 'text-app-muted hover:bg-app-container hover:text-app'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono opacity-60">{ch.numberRoman}</span>
                      <span>{ch.title}</span>
                    </div>
                    {idx === currentChapterIndex && (
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        menu_book
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Collapsible Reader Utility Bar (Theme, Font Scale, Ambient sound) */}
            {controlsOpen && (
              <div className="flex flex-wrap items-center justify-between pt-space-xs bg-app-container/70 p-2.5 rounded-lg gap-2 border border-app-subtle transition-colors duration-500">
                {/* Text Scale */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleFontChange(-10)}
                    aria-label="Decrease font size"
                    className="w-8 h-8 rounded-lg bg-app-high flex items-center justify-center text-app hover:text-primary transition-colors active:scale-95 cursor-pointer border border-app-subtle"
                  >
                    <span className="font-label-sm text-label-sm">A-</span>
                  </button>
                  <span className="font-label-sm text-label-sm text-app-muted px-1.5 tabular-nums">
                    {fontScale}%
                  </span>
                  <button
                    onClick={() => handleFontChange(10)}
                    aria-label="Increase font size"
                    className="w-8 h-8 rounded-lg bg-app-high flex items-center justify-center text-app hover:text-primary transition-colors active:scale-95 cursor-pointer border border-app-subtle"
                  >
                    <span className="font-label-sm text-label-sm font-bold">A+</span>
                  </button>
                </div>

                {/* Theme Mode Toggle (Night / Candle / Parchment) */}
                <ThemeToggle
                  currentTheme={themeMode}
                  onSelectTheme={onSelectThemeMode}
                  variant="segmented"
                />

                {/* Ambient Soundscapes toggle */}
                <button
                  onClick={handleToggleAmbient}
                  className={`px-2.5 py-1.5 rounded-lg font-label-sm text-label-sm flex items-center gap-1 transition-all cursor-pointer ${
                    ambientAudioActive
                      ? 'bg-primary text-on-primary font-semibold shadow-xs'
                      : 'bg-app-high text-app-muted hover:text-primary border border-app-subtle'
                  }`}
                  title="Toggle subtle procedural clockwork & pine breeze atmosphere"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {ambientAudioActive ? 'graphic_eq' : 'volume_mute'}
                  </span>
                  <span>{ambientAudioActive ? 'Atmosphere On' : 'Atmosphere'}</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Visual Story Atmosphere Artwork */}
        <div
          onClick={onOpenArtworkModal}
          className="w-full relative rounded-xl overflow-hidden shadow-md group cursor-pointer border border-app hover:border-primary/40 transition-all"
        >
          <div
            className="aspect-[16/9] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-102"
            style={{ backgroundImage: `url('${story.coverImage}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[#dde2f8]">
              <span className="font-label-sm text-label-sm text-[#f0f4ff] drop-shadow-sm flex items-center gap-1.5 font-medium">
                <span className="material-symbols-outlined text-[14px] text-primary">brush</span>
                {story.sceneBadge}
              </span>
              <span className="font-label-sm text-label-sm bg-black/70 px-2 py-0.5 rounded text-primary border border-white/10 font-semibold">
                {story.actBadge}
              </span>
            </div>
          </div>
        </div>

        {/* Multimodal AI Atelier Actions Ribbon */}
        {onOpenAiTab && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => onOpenAiTab('music')}
              className="p-2.5 rounded-xl bg-app-surface hover:bg-app-container border border-app hover:border-primary/40 transition-all flex items-center gap-2 text-left group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[16px]">music_note</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-app group-hover:text-primary transition-colors truncate">
                  Lyria Music
                </span>
                <span className="text-[10px] text-app-muted truncate">Compose Score</span>
              </div>
            </button>

            <button
              onClick={() => onOpenAiTab('live')}
              className="p-2.5 rounded-xl bg-app-surface hover:bg-app-container border border-app hover:border-primary/40 transition-all flex items-center gap-2 text-left group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[16px]">audio_spark</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-app group-hover:text-primary transition-colors truncate">
                  Live Voice
                </span>
                <span className="text-[10px] text-app-muted truncate">Speak to Tobias</span>
              </div>
            </button>

            <button
              onClick={() => onOpenAiTab('video')}
              className="p-2.5 rounded-xl bg-app-surface hover:bg-app-container border border-app hover:border-primary/40 transition-all flex items-center gap-2 text-left group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[16px]">movie</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-app group-hover:text-primary transition-colors truncate">
                  Veo 3 Video
                </span>
                <span className="text-[10px] text-app-muted truncate">Animate Scene</span>
              </div>
            </button>

            <button
              onClick={() => onOpenAiTab('search')}
              className="p-2.5 rounded-xl bg-app-surface hover:bg-app-container border border-app hover:border-primary/40 transition-all flex items-center gap-2 text-left group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[16px]">travel_explore</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-app group-hover:text-primary transition-colors truncate">
                  Search Lore
                </span>
                <span className="text-[10px] text-app-muted truncate">Google Grounding</span>
              </div>
            </button>
          </div>
        )}

        {/* Collapsible Story Notes & Core Need Drawer */}
        <section className="bg-app-container rounded-xl p-space-md shadow-md border border-app transition-colors duration-500">
          <button
            onClick={() => setCodexOpen(!codexOpen)}
            className="w-full flex items-center justify-between text-left group cursor-pointer"
          >
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors shrink-0">
                <span className="material-symbols-outlined text-[20px]">history_edu</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-title-md text-title-md text-app group-hover:text-primary transition-colors truncate">
                  Story Codex &amp; Philosophical Intent
                </span>
                <span className="font-label-sm text-label-sm text-primary">
                  Core Moral Thesis · For Educators &amp; Seekers
                </span>
              </div>
            </div>
            <span
              className={`material-symbols-outlined text-primary transition-transform duration-300 ${
                codexOpen ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>

          {codexOpen && (
            <div className="pt-space-md flex flex-col gap-space-md animate-fade-in">
              {/* The Core Need / Moral Thesis */}
              <div className="p-space-md rounded-lg bg-app-surface flex flex-col gap-1.5 border border-app transition-colors">
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-[18px]">psychology_alt</span>
                  <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
                    The Core Need &amp; Moral Thesis
                  </h4>
                </div>
                <p className="font-body-sm text-body-sm text-app-muted leading-relaxed">
                  {story.codex.moralThesis}
                </p>
              </div>

              {/* Author's Guiding Note */}
              <div className="p-space-md rounded-lg bg-app-surface flex flex-col gap-1.5 border border-app transition-colors">
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-[18px]">stylus_note</span>
                  <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
                    Author’s Guiding Note
                  </h4>
                </div>
                <p className="font-body-sm text-body-sm text-app-muted leading-relaxed italic">
                  {story.codex.authorNote}
                </p>
              </div>

              {/* Discussion Sparks Interactive */}
              <div className="flex flex-col gap-2">
                <span className="font-label-sm text-label-sm text-app-muted uppercase tracking-wider flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[14px] text-primary">forum</span>
                  Discussion Sparks for Mentors &amp; Parents
                </span>
                <div className="flex flex-col gap-2">
                  {story.codex.discussionSparks.map((spark) => (
                    <div
                      key={spark.id}
                      onClick={() => onOpenSparkModal(spark)}
                      className="p-3 rounded-lg bg-app-high hover:bg-app-highest cursor-pointer transition-colors flex items-start gap-2.5 group border border-app-subtle"
                    >
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        question_mark
                      </span>
                      <div className="flex flex-col gap-0.5 flex-1">
                        <p className="font-body-sm text-body-sm text-app leading-snug">
                          {spark.question}
                        </p>
                        {spark.context && (
                          <span className="text-[11px] text-app-dim italic">
                            {spark.context}
                          </span>
                        )}
                      </div>
                      <span className="material-symbols-outlined text-[16px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        edit_note
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Narrative Body Prose (The Reading Experience) */}
        <article
          className="flex flex-col gap-space-md transition-all duration-300 select-text"
          style={{ fontSize: `${fontScale / 100}rem` }}
        >
          {chapter.paragraphs.map((paragraph, idx) => {
            // First paragraph gets the decorative drop-cap
            if (idx === 0) {
              const firstLetter = paragraph.charAt(0);
              const restOfParagraph = paragraph.slice(1);
              return (
                <div
                  key={idx}
                  className="font-body-lg text-body-lg text-app leading-relaxed"
                >
                  <span className="float-left text-[60px] font-headline-lg leading-none font-bold text-primary pr-3 pt-1 select-none">
                    {firstLetter}
                  </span>
                  {restOfParagraph}
                </div>
              );
            }

            // Insert Pull Quote after paragraph 3 (as in Chapter II)
            const showPullQuote = idx === 3 && activeQuote;

            return (
              <React.Fragment key={idx}>
                {showPullQuote && (
                  <div
                    onClick={handleQuoteClick}
                    className="my-space-sm p-space-lg rounded-xl bg-app-surface shadow-sm flex flex-col gap-2 relative overflow-hidden group cursor-pointer transition-all hover:bg-app-container border border-app hover:border-primary/40"
                  >
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all pointer-events-none" />
                    <div className="flex items-center gap-1.5 text-primary">
                      <span className="material-symbols-outlined text-[20px]">format_quote</span>
                      <span className="font-label-sm text-label-sm tracking-wider uppercase font-semibold">
                        Saved Reflection
                      </span>
                    </div>
                    <blockquote className="font-headline-sm text-headline-sm text-primary italic leading-snug">
                      “{activeQuote.quote}”
                    </blockquote>
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-label-sm text-label-sm text-app-muted">
                        {activeQuote.attribution} · {activeQuote.verse}
                      </span>
                      <span
                        className={`material-symbols-outlined text-[18px] text-primary transition-all group-hover:scale-125 ${
                          isQuoteSaved ? 'font-fill text-primary' : 'text-primary/70'
                        }`}
                        style={{
                          fontVariationSettings: isQuoteSaved ? "'FILL' 1" : "'FILL' 0",
                        }}
                      >
                        bookmark
                      </span>
                    </div>
                  </div>
                )}

                <p className="font-body-lg text-body-lg text-app leading-relaxed">
                  {paragraph}
                </p>

                {/* Chapter break ornament after penultimate paragraph */}
                {idx === chapter.paragraphs.length - 2 && (
                  <div className="flex items-center justify-center gap-3 py-space-sm text-primary/60">
                    <div className="w-8 h-px bg-primary/30" />
                    <span className="material-symbols-outlined text-[16px]">auto_stories</span>
                    <div className="w-8 h-px bg-primary/30" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </article>

        {/* Reader Engagement Floating Utility Hub */}
        <div className="sticky bottom-20 z-40 w-full mt-space-md">
          <div className="bg-app-surface/95 backdrop-blur-xl p-space-sm rounded-2xl shadow-xl flex items-center justify-between gap-space-sm border border-app transition-colors duration-500">
            {/* Audio Narration Pill */}
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all active:scale-95 cursor-pointer ${
                isPlayingAudio && !isAudioPaused
                  ? 'bg-primary text-on-primary ring-1 ring-primary'
                  : 'bg-app-container text-primary hover:bg-app-high'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  isPlayingAudio && !isAudioPaused ? 'animate-spin' : ''
                }`}
              >
                {isPlayingAudio && !isAudioPaused ? 'pause_circle' : 'volume_up'}
              </span>
              <div className="flex flex-col text-left">
                <span className="font-label-sm text-label-sm font-bold leading-none">
                  {isPlayingAudio && !isAudioPaused ? 'Pause' : 'Listen'}
                </span>
                <span className="text-[10px] text-app-muted font-label-sm leading-none mt-0.5">
                  8 min voice
                </span>
              </div>
            </button>

            {/* Quick Bookmark Toggle */}
            <button
              aria-label="Bookmark paragraph"
              onClick={handleBookmarkToggle}
              className={`w-10 h-10 rounded-xl bg-app-container flex items-center justify-center transition-all active:scale-90 cursor-pointer border border-app-subtle ${
                isChapterBookmarked ? 'text-primary bg-primary/10' : 'text-app hover:text-primary'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{
                  fontVariationSettings: isChapterBookmarked ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {isChapterBookmarked ? 'bookmark' : 'bookmark_border'}
              </span>
            </button>

            {/* Primary Advance Action */}
            <button
              onClick={() => {
                if (currentChapterIndex < totalChapters - 1) {
                  onSelectChapter(currentChapterIndex + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  triggerToast(`Turned to ${story.chapters[currentChapterIndex + 1].numberRoman}`);
                } else {
                  onOpenReflection();
                }
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all flex items-center justify-center gap-1 active:scale-98 shadow-sm font-semibold cursor-pointer"
            >
              <span>
                {currentChapterIndex < totalChapters - 1
                  ? 'Climax & Reflection'
                  : 'Reflect on Tale'}
              </span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function romanize(num: number): string {
  const lookup: Record<string, number> = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let roman = '';
  for (const i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman || 'I';
}
