import React, { useState } from 'react';
import { Story, UserStats } from '../types';

interface DiscoverViewProps {
  stories: Story[];
  onSelectStory: (story: Story) => void;
  stats: UserStats;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  stories,
  onSelectStory,
  stats,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAge, setSelectedAge] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Moral Growth', 'Humility & Wonder', 'Empathy & Courage', 'Acceptance & Grace'];
  const ageGroups = ['All', 'Ages 8–12', 'Ages 10–14', 'Young Adult'];

  const filteredStories = stories.filter((story) => {
    const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
    const matchesAge = selectedAge === 'All' || story.ageGroup === selectedAge;
    const matchesQuery =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.codex.moralThesis.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesAge && matchesQuery;
  });

  const featuredStory = stories.find((s) => s.featured) || stories[0];

  return (
    <div className="flex flex-col w-full min-h-screen bg-app text-app pb-24 transition-colors duration-500">
      {/* Editorial Header */}
      <div className="max-w-5xl mx-auto w-full px-margin-mobile pt-6 pb-4">
        {/* Sanctuary Banner */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary font-label-sm uppercase tracking-widest font-semibold">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>The Curated Archive</span>
          </div>
          <h1 className="font-headline-lg text-[32px] md:text-[40px] leading-tight text-app">
            Stories of Patience, Wonder &amp; Moral Grace
          </h1>
          <p className="font-body-md text-app-muted max-w-2xl leading-relaxed">
            A sanctuary of illuminated parables designed for slow reading, educator discussion circles, and quiet bedtime contemplation.
          </p>
        </div>

        {/* Reader Progress & Stats Summary Shelf */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
          <div className="p-3.5 rounded-xl bg-app-surface border border-app flex flex-col shadow-xs transition-colors">
            <span className="font-label-sm text-label-sm text-app-muted uppercase tracking-wider">
              Reading Streak
            </span>
            <div className="flex items-baseline gap-1 mt-1 text-primary">
              <span className="text-2xl font-headline-md font-bold tabular-nums">
                {stats.streakDays}
              </span>
              <span className="text-xs font-sans text-app-muted">days</span>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-app-surface border border-app flex flex-col shadow-xs transition-colors">
            <span className="font-label-sm text-label-sm text-app-muted uppercase tracking-wider">
              Contemplation Time
            </span>
            <div className="flex items-baseline gap-1 mt-1 text-primary">
              <span className="text-2xl font-headline-md font-bold tabular-nums">
                {stats.minutesRead}
              </span>
              <span className="text-xs font-sans text-app-muted">mins</span>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-app-surface border border-app flex flex-col shadow-xs transition-colors">
            <span className="font-label-sm text-label-sm text-app-muted uppercase tracking-wider">
              Saved Reflections
            </span>
            <div className="flex items-baseline gap-1 mt-1 text-primary">
              <span className="text-2xl font-headline-md font-bold tabular-nums">
                {stats.reflectionsSaved}
              </span>
              <span className="text-xs font-sans text-app-muted">verses</span>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-app-surface border border-app flex flex-col shadow-xs transition-colors">
            <span className="font-label-sm text-label-sm text-app-muted uppercase tracking-wider">
              Chapters Completed
            </span>
            <div className="flex items-baseline gap-1 mt-1 text-primary">
              <span className="text-2xl font-headline-md font-bold tabular-nums">
                {stats.storiesFinished}
              </span>
              <span className="text-xs font-sans text-app-muted">read</span>
            </div>
          </div>
        </div>

        {/* Featured Story Hero Card */}
        {featuredStory && (
          <div
            onClick={() => onSelectStory(featuredStory)}
            className="w-full relative rounded-2xl overflow-hidden bg-app-surface border border-primary/20 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center shadow-lg group cursor-pointer hover:border-primary/50 transition-all mb-8"
          >
            <div className="w-full md:w-5/12 aspect-[16/10] rounded-xl overflow-hidden relative shrink-0">
              <img
                src={featuredStory.coverImage}
                alt={featuredStory.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-3">
                <span className="font-label-sm text-label-sm bg-black/80 text-primary px-2.5 py-1 rounded-md border border-white/10 font-medium">
                  ★ Featured Masterpiece
                </span>
              </div>
            </div>

            <div className="flex flex-col flex-1 gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary font-label-sm text-label-sm font-semibold">
                  {featuredStory.category}
                </span>
                <span className="text-app-muted text-xs">·</span>
                <span className="text-app-muted text-xs font-medium">
                  {featuredStory.ageGroup}
                </span>
                <span className="text-app-muted text-xs">·</span>
                <span className="text-app-muted text-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">schedule</span>
                  {featuredStory.readTime}
                </span>
              </div>

              <h2 className="font-headline-md text-2xl md:text-3xl text-app group-hover:text-primary transition-colors">
                {featuredStory.title}
              </h2>
              <span className="font-label-md text-primary font-medium">
                By {featuredStory.author}
              </span>

              <p className="font-body-md text-app-muted text-sm md:text-base leading-relaxed line-clamp-3">
                {featuredStory.summary}
              </p>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-app-muted">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    auto_stories
                  </span>
                  <span>{featuredStory.chapters.length} Chapters with Philosophical Codex</span>
                </div>
                <button className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label-md font-semibold hover:bg-primary-container transition-all flex items-center gap-1 shadow-sm cursor-pointer">
                  <span>Enter Reader</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center py-4 border-b border-app">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-app-muted text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search by theme, title, or moral question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-app-surface border border-app text-sm text-app placeholder-app-muted focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-app-muted mr-1">Theme:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary text-on-primary font-semibold shadow-xs'
                    : 'bg-app-surface text-app-muted hover:text-app hover:bg-app-container border border-app'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              onClick={() => onSelectStory(story)}
              className="bg-app-surface rounded-2xl overflow-hidden border border-app hover:border-primary/40 transition-all flex flex-col group cursor-pointer shadow-md hover:-translate-y-0.5 duration-300"
            >
              <div className="aspect-[16/10] w-full relative overflow-hidden bg-black/40">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/75 text-primary text-[11px] font-semibold tracking-wider uppercase border border-white/10">
                  {story.category}
                </span>
                <span className="absolute bottom-2 right-3 text-xs text-[#dde2f8]">
                  {story.readTime}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs text-app-muted">
                    <span>{story.ageGroup}</span>
                    <span>{story.chapters.length} Chapters</span>
                  </div>
                  <h3 className="font-headline-sm text-xl text-app group-hover:text-primary transition-colors leading-snug">
                    {story.title}
                  </h3>
                  <span className="font-label-sm text-primary font-normal">
                    By {story.author}
                  </span>
                  <p className="font-body-sm text-app-muted line-clamp-2 text-xs leading-relaxed mt-1">
                    {story.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-app flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-primary/90 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">history_edu</span>
                    Philosophical Codex Included
                  </span>
                  <span className="material-symbols-outlined text-primary text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
