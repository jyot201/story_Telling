import React from 'react';

interface BottomNavProps {
  currentTab: string;
  onSelectTab: (tab: 'discover' | 'reader' | 'reviews' | 'forge') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe nav-blur-bg backdrop-blur-xl border-t border-app shadow-[0_-2px_12px_rgba(0,0,0,0.2)] transition-colors duration-500">
      <div className="h-16 px-gutter-mobile flex items-stretch justify-around max-w-lg mx-auto">
        {/* Discover */}
        <button
          onClick={() => onSelectTab('discover')}
          className={`flex-1 min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-0.5 transition-colors group cursor-pointer ${
            currentTab === 'discover'
              ? 'text-primary font-semibold'
              : 'text-app-muted hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[24px] group-hover:scale-105 transition-transform">
            auto_awesome
          </span>
          <span className="font-label-sm text-label-sm leading-none">Discover</span>
        </button>

        {/* Reader */}
        <button
          onClick={() => onSelectTab('reader')}
          aria-current={currentTab === 'reader' ? 'page' : undefined}
          className={`flex-1 min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-0.5 transition-colors group relative cursor-pointer ${
            currentTab === 'reader'
              ? 'text-primary font-semibold'
              : 'text-app-muted hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[24px] group-hover:scale-105 transition-transform">
            menu_book
          </span>
          <span className="font-label-sm text-label-sm leading-none">Reader</span>
          {currentTab === 'reader' && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
          )}
        </button>

        {/* Reviews */}
        <button
          onClick={() => onSelectTab('reviews')}
          className={`flex-1 min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-0.5 transition-colors group cursor-pointer ${
            currentTab === 'reviews'
              ? 'text-primary font-semibold'
              : 'text-app-muted hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[24px] group-hover:scale-105 transition-transform">
            reviews
          </span>
          <span className="font-label-sm text-label-sm leading-none">Reviews</span>
        </button>

        {/* Forge */}
        <button
          onClick={() => onSelectTab('forge')}
          className={`flex-1 min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-0.5 transition-colors group cursor-pointer ${
            currentTab === 'forge'
              ? 'text-primary font-semibold'
              : 'text-app-muted hover:text-primary'
          }`}
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              currentTab === 'forge'
                ? 'bg-primary text-on-primary ring-1 ring-primary'
                : 'bg-primary/10 text-primary group-hover:bg-primary/20'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">history_edu</span>
          </div>
          <span className="font-label-sm text-label-sm leading-none mt-0.5">Forge</span>
        </button>
      </div>
    </nav>
  );
};
