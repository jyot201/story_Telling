import React from 'react';
import { ThemeMode } from '../types';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  currentTab: string;
  themeMode: ThemeMode;
  onSelectThemeMode: (mode: ThemeMode) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenAiAtelier: () => void;
  hasUnreadNotifications?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  themeMode,
  onSelectThemeMode,
  onOpenSearch,
  onOpenNotifications,
  onOpenProfile,
  onOpenAiAtelier,
  hasUnreadNotifications = true
}) => {
  const getSubLabel = () => {
    switch (currentTab) {
      case 'discover': return 'Catalog & Lore';
      case 'reviews': return 'Community Codex';
      case 'forge': return 'Story Atelier';
      default: return 'Reader';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe header-blur-bg backdrop-blur-xl border-b border-app shadow-[0_1px_12px_rgba(0,0,0,0.15)] transition-colors duration-500">
      <div className="h-16 px-gutter-mobile flex items-center justify-between gap-space-sm max-w-5xl mx-auto">
        {/* Brand Lockup */}
        <div className="flex items-center gap-space-sm min-w-0">
          <img
            alt="Mythos & Quill Brand Icon"
            className="h-8 w-auto object-contain shrink-0"
            src="https://lh3.googleusercontent.com/aida/AEtjO1XqIHFUNZrUGD4VP6NpbfGrQVzbOzg_E8d_vo3KcEnS-jHHAa58vyIfDNjETzjt4_SnT8pDbvKlQcvsYopqgnMQ6a396P5AHlYj20CmBGXI3VgHSQLyAAiBjzkfOjiNSZPRoCbtIIo5TshLF6s5fkNQR0FkdoTKBp0kwbflknc5QsZyCdB16PdlEW6N1QgaTy_oSQ9Enw36CwWyUzYjU8pop8E5r_NtlxJCHpdytPiEMWAy1s8txbJC"
          />
          <div className="flex flex-col truncate">
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-none truncate">
              Mythos &amp; Quill
            </span>
            <span className="font-label-sm text-label-sm text-app-muted tracking-wider truncate">
              {getSubLabel()}
            </span>
          </div>
        </div>

        {/* Action Icons & Theme Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Theme Mode Toggle (Night / Candle / Parchment) */}
          <ThemeToggle
            currentTheme={themeMode}
            onSelectTheme={onSelectThemeMode}
            variant="compact"
          />

          {/* AI Atelier Multimodal Labs Button */}
          <button
            aria-label="Open AI Storyteller Atelier Labs"
            onClick={onOpenAiAtelier}
            className="px-2.5 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 flex items-center gap-1.5 text-xs font-semibold transition-all shadow-sm active:scale-95"
            title="Open Lyria music, Veo video, Live voice, image generation and transcription labs"
          >
            <span className="material-symbols-outlined text-[16px] animate-pulse">auto_awesome</span>
            <span className="hidden md:inline">AI Atelier</span>
          </button>

          <button
            aria-label="Search stories, quotes and codices"
            onClick={onOpenSearch}
            className="w-9 h-9 flex items-center justify-center rounded-full text-app-muted hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          <button
            aria-label="Notifications"
            onClick={onOpenNotifications}
            className="w-9 h-9 flex items-center justify-center rounded-full text-app-muted hover:text-primary transition-colors relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {hasUnreadNotifications && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary ring-2 ring-background animate-pulse" />
            )}
          </button>

          <button
            aria-label="User Profile"
            onClick={onOpenProfile}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            <img
              alt="Profile avatar"
              className="w-7 h-7 rounded-full object-cover ring-1 ring-primary/40 hover:ring-primary transition-all"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNeEF7UBtVyrTTdKbfUTxPfh2lQ2XokRIrtd5-I5qb_JeVJySIz-meDDA38xkxWke3YVMqumLpc9qtqJCR0-6MW1T_EvBrhrM2Wd7sWDuyhzCxH5T7r8TknWS1uzLGj3fJERgcuH3JAIikYNRWEIA-DOZU7-tP9hCASUGq5VaNLRkliMk9wUqJktVNkrlkdD4qXWtKJA-0Qev3VS_N1x2MqN8VDOZr-1SlPzjE_vqatyXhFrA_03k"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
