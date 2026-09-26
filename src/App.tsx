/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Story, SavedQuote, ReviewItem, UserStats, ThemeMode } from './types';
import { INITIAL_STORIES, INITIAL_REVIEWS, INITIAL_SAVED_QUOTES } from './data/stories';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ReaderView } from './components/ReaderView';
import { DiscoverView } from './components/DiscoverView';
import { ReviewsView } from './components/ReviewsView';
import { ForgeView } from './components/ForgeView';
import { AiAtelierHub } from './components/AiAtelierHub';
import {
  SearchModal,
  NotificationsModal,
  ProfileModal,
  ArtworkModal,
  ReflectionDialog,
  SparkModal,
} from './components/Modals';

export default function App() {
  // Theme Mode State ('night' | 'candle' | 'parchment')
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('mythos_theme_mode');
      if (saved === 'night' || saved === 'candle' || saved === 'parchment') {
        return saved;
      }
      return 'night';
    } catch {
      return 'night';
    }
  });

  // Apply theme classes and data-theme dynamically to document and body
  useEffect(() => {
    try {
      const themes: ThemeMode[] = ['night', 'candle', 'parchment'];
      themes.forEach((t) => {
        document.documentElement.classList.remove(`theme-${t}`);
        document.body.classList.remove(`theme-${t}`);
      });
      document.documentElement.classList.add(`theme-${themeMode}`);
      document.documentElement.setAttribute('data-theme', themeMode);
      document.body.classList.add(`theme-${themeMode}`);
      document.body.setAttribute('data-theme', themeMode);
      localStorage.setItem('mythos_theme_mode', themeMode);
    } catch (e) {
      console.error(e);
    }
  }, [themeMode]);

  // Navigation State: 'reader' default to match user screenshot immediately
  const [currentTab, setCurrentTab] = useState<'reader' | 'discover' | 'reviews' | 'forge'>('reader');

  // Stories State
  const [stories, setStories] = useState<Story[]>(() => {
    try {
      const stored = localStorage.getItem('mythos_stories');
      return stored ? JSON.parse(stored) : INITIAL_STORIES;
    } catch {
      return INITIAL_STORIES;
    }
  });

  // Current Story & Chapter: Chapter II of "The Clockmaker of Whispering Pines"
  const [currentStoryId, setCurrentStoryId] = useState<string>('clockmaker-whispering-pines');
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(1); // Index 1 is Chapter II

  // Saved Reflections / Quotes
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>(() => {
    try {
      const stored = localStorage.getItem('mythos_saved_quotes');
      return stored ? JSON.parse(stored) : INITIAL_SAVED_QUOTES;
    } catch {
      return INITIAL_SAVED_QUOTES;
    }
  });

  // Reviews & Community Reflections
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const stored = localStorage.getItem('mythos_reviews');
      return stored ? JSON.parse(stored) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // User Stats
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const stored = localStorage.getItem('mythos_stats');
      return stored
        ? JSON.parse(stored)
        : {
            minutesRead: 42,
            storiesFinished: 3,
            reflectionsSaved: 1,
            streakDays: 4,
          };
    } catch {
      return {
        minutesRead: 42,
        storiesFinished: 3,
        reflectionsSaved: 1,
        streakDays: 4,
      };
    }
  });

  // Modals
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [artworkOpen, setArtworkOpen] = useState(false);
  const [reflectionOpen, setReflectionOpen] = useState(false);
  const [activeSpark, setActiveSpark] = useState<{ id: string; question: string; context?: string } | null>(null);

  // AI Atelier Multimodal Modal State
  const [aiAtelierOpen, setAiAtelierOpen] = useState(false);
  const [aiAtelierTab, setAiAtelierTab] = useState<
    'music' | 'image' | 'video' | 'live' | 'search' | 'transcribe' | 'chat'
  >('music');

  const handleOpenAiTab = (tab: 'music' | 'image' | 'video' | 'live' | 'search' | 'transcribe' | 'chat') => {
    setAiAtelierTab(tab);
    setAiAtelierOpen(true);
  };

  const handleApplyImageToCurrentStory = (imageUrl: string) => {
    setStories((prev) =>
      prev.map((s) => (s.id === currentStoryId ? { ...s, coverImage: imageUrl } : s))
    );
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mythos_stories', JSON.stringify(stories));
    } catch (e) {
      console.error(e);
    }
  }, [stories]);

  useEffect(() => {
    try {
      localStorage.setItem('mythos_saved_quotes', JSON.stringify(savedQuotes));
    } catch (e) {
      console.error(e);
    }
  }, [savedQuotes]);

  useEffect(() => {
    try {
      localStorage.setItem('mythos_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('mythos_stats', JSON.stringify(stats));
    } catch (e) {
      console.error(e);
    }
  }, [stats]);

  const currentStory =
    stories.find((s) => s.id === currentStoryId) || stories[0] || INITIAL_STORIES[0];

  const handleSelectStory = (story: Story) => {
    setCurrentStoryId(story.id);
    setCurrentChapterIndex(0);
    setCurrentTab('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSaveQuote = (quote: SavedQuote) => {
    setSavedQuotes((prev) => {
      const exists = prev.some((q) => q.id === quote.id || q.quote === quote.quote);
      let updated;
      if (exists) {
        updated = prev.filter((q) => q.id !== quote.id && q.quote !== quote.quote);
      } else {
        updated = [quote, ...prev];
      }
      setStats((s) => ({
        ...s,
        reflectionsSaved: updated.length,
      }));
      return updated;
    });
  };

  const handleRemoveQuote = (id: string) => {
    setSavedQuotes((prev) => {
      const updated = prev.filter((q) => q.id !== id);
      setStats((s) => ({ ...s, reflectionsSaved: updated.length }));
      return updated;
    });
  };

  const handleAddReview = (newReviewData: Omit<ReviewItem, 'id' | 'date' | 'likes'>) => {
    const review: ReviewItem = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      likes: 1,
    };
    setReviews((prev) => [review, ...prev]);
  };

  const handlePublishStory = (newStory: Story) => {
    setStories((prev) => [newStory, ...prev]);
    setCurrentStoryId(newStory.id);
    setCurrentChapterIndex(0);
    setCurrentTab('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveReflection = (noteText: string) => {
    handleAddReview({
      authorName: 'You (Personal Codex)',
      role: 'Seeker',
      storyTitle: currentStory.title,
      rating: 5,
      content: noteText,
      sparkPrompt: 'Climax & Philosophical Reflection on Verse',
    });
    setStats((s) => ({
      ...s,
      minutesRead: s.minutesRead + 8,
      storiesFinished: s.storiesFinished + 1,
    }));
  };

  const handleAnswerSpark = (sparkQuestion: string, answer: string) => {
    handleAddReview({
      authorName: 'You (Mentor Discussion)',
      role: 'Educator',
      storyTitle: currentStory.title,
      rating: 5,
      content: answer,
      sparkPrompt: sparkQuestion,
    });
  };

  return (
    <div className={`theme-${themeMode} min-h-screen bg-app text-app flex flex-col font-sans transition-colors duration-500 selection:bg-primary/25 selection:text-primary`}>
      {/* Top Header with Theme Toggle */}
      <Header
        currentTab={currentTab}
        themeMode={themeMode}
        onSelectThemeMode={setThemeMode}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenProfile={() => setProfileOpen(true)}
        onOpenAiAtelier={() => setAiAtelierOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col pt-16">
        {currentTab === 'reader' && (
          <ReaderView
            story={currentStory}
            currentChapterIndex={currentChapterIndex}
            onSelectChapter={(idx) => setCurrentChapterIndex(idx)}
            savedQuotes={savedQuotes}
            onToggleSaveQuote={handleToggleSaveQuote}
            onOpenReflection={() => setReflectionOpen(true)}
            onOpenArtworkModal={() => setArtworkOpen(true)}
            onOpenSparkModal={(spark) => setActiveSpark(spark)}
            onOpenAiTab={handleOpenAiTab}
            themeMode={themeMode}
            onSelectThemeMode={setThemeMode}
          />
        )}

        {currentTab === 'discover' && (
          <DiscoverView
            stories={stories}
            onSelectStory={handleSelectStory}
            stats={stats}
          />
        )}

        {currentTab === 'reviews' && (
          <ReviewsView
            reviews={reviews}
            savedQuotes={savedQuotes}
            onAddReview={handleAddReview}
            onRemoveQuote={handleRemoveQuote}
            onOpenAiTab={handleOpenAiTab}
          />
        )}

        {currentTab === 'forge' && (
          <ForgeView
            onPublishStory={handlePublishStory}
            onOpenAiTab={handleOpenAiTab}
          />
        )}
      </main>

      {/* Bottom Sticky Tab Navigation */}
      <BottomNav currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Multimodal AI Atelier Hub */}
      <AiAtelierHub
        isOpen={aiAtelierOpen}
        onClose={() => setAiAtelierOpen(false)}
        initialTab={aiAtelierTab}
        onApplyImageToStory={handleApplyImageToCurrentStory}
        onApplyManuscriptText={(_text) => {
          setAiAtelierOpen(false);
        }}
      />

      {/* Global Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        stories={stories}
        onSelectStory={handleSelectStory}
      />

      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        stats={stats}
        themeMode={themeMode}
        onSelectThemeMode={setThemeMode}
      />

      <ArtworkModal
        isOpen={artworkOpen}
        onClose={() => setArtworkOpen(false)}
        story={currentStory}
      />

      <ReflectionDialog
        isOpen={reflectionOpen}
        onClose={() => setReflectionOpen(false)}
        story={currentStory}
        onSaveReflection={handleSaveReflection}
      />

      <SparkModal
        spark={activeSpark}
        onClose={() => setActiveSpark(null)}
        onAnswerSpark={handleAnswerSpark}
      />
    </div>
  );
}
