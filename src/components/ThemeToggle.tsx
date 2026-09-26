import React from 'react';
import { ThemeMode } from '../types';

interface ThemeToggleProps {
  currentTheme: ThemeMode;
  onSelectTheme: (mode: ThemeMode) => void;
  variant?: 'compact' | 'segmented' | 'dropdown';
  className?: string;
}

interface ThemeOption {
  id: ThemeMode;
  label: string;
  sublabel: string;
  icon: string;
  previewBg: string;
  previewText: string;
  previewAccent: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'night',
    label: 'Night',
    sublabel: 'Obsidian & Celestial Gold',
    icon: 'dark_mode',
    previewBg: '#0d1322',
    previewText: '#dde2f8',
    previewAccent: '#ffba56',
  },
  {
    id: 'candle',
    label: 'Candle',
    sublabel: 'Warm Soot & Ember Glow',
    icon: 'local_fire_department',
    previewBg: '#15110d',
    previewText: '#fbe6cb',
    previewAccent: '#ff9e3b',
  },
  {
    id: 'parchment',
    label: 'Parchment',
    sublabel: 'Aged Vellum & Walnut Ink',
    icon: 'auto_stories',
    previewBg: '#f5eedf',
    previewText: '#281f17',
    previewAccent: '#a85f09',
  },
];

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  currentTheme,
  onSelectTheme,
  variant = 'segmented',
  className = '',
}) => {
  if (variant === 'compact') {
    return (
      <div
        role="radiogroup"
        aria-label="Color theme selection"
        className={`inline-flex items-center p-0.5 rounded-full bg-app-container border border-app shadow-inner ${className}`}
      >
        {THEME_OPTIONS.map((opt) => {
          const isSelected = currentTheme === opt.id;
          return (
            <button
              key={opt.id}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${opt.label} theme`}
              onClick={() => onSelectTheme(opt.id)}
              title={`${opt.label} mode: ${opt.sublabel}`}
              className={`relative px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none ${
                isSelected
                  ? 'bg-app-high text-primary shadow-sm ring-1 ring-primary/40 font-semibold'
                  : 'text-app-muted hover:text-app hover:bg-app-high/50'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                style={{ backgroundColor: opt.previewBg }}
              />
              <span className="material-symbols-outlined text-[15px] shrink-0">
                {opt.icon}
              </span>
              <span className="hidden sm:inline text-xs">{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Segmented style (standard for reader toolbar and settings)
  return (
    <div
      role="radiogroup"
      aria-label="Reading atmosphere and lighting mode"
      className={`inline-flex items-center p-1 rounded-xl bg-app-container border border-app gap-1 shadow-inner ${className}`}
    >
      {THEME_OPTIONS.map((opt) => {
        const isSelected = currentTheme === opt.id;
        return (
          <button
            key={opt.id}
            role="radio"
            aria-checked={isSelected}
            aria-label={`${opt.label} theme: ${opt.sublabel}`}
            onClick={() => onSelectTheme(opt.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none ${
              isSelected
                ? 'bg-app-high text-primary shadow-sm ring-1 ring-primary/50 font-semibold scale-102'
                : 'text-app-muted hover:text-app hover:bg-app-high/40'
            }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0 shadow-xs"
              style={{ backgroundColor: opt.previewBg }}
            />
            <span className="material-symbols-outlined text-[15px] shrink-0">
              {opt.icon}
            </span>
            <span className="text-xs">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};
