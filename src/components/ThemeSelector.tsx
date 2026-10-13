import React from 'react';
import type { SiteTheme } from '../types/theme';

interface ThemeSelectorProps {
  themes: SiteTheme[];
  activeThemeId: string;
  onSelectTheme: (theme: SiteTheme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  themes,
  activeThemeId,
  onSelectTheme,
}) => {
  return (
    <div data-ui="theme-selector" className="flex flex-col gap-2.5 w-full">
      {themes.map((theme) => {
        const isActive = theme.id === activeThemeId;

        return (
          <button
            key={theme.id}
            type="button"
            onClick={() => onSelectTheme(theme)}
            className={`sm-theme-item flex items-center gap-3.5 p-2.5 rounded-xl border transition-[background-color,border-color] duration-150 text-left w-full cursor-pointer ${
              isActive
                ? 'bg-white/15 border-[#ffd000] ring-1 ring-[#ffd000]/60'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/25'
            }`}
            aria-pressed={isActive}
          >
            {/* Background Thumbnail */}
            <div className="relative w-16 h-11 rounded-lg overflow-hidden shrink-0 border border-white/15 bg-black/40">
              <img
                src={theme.image}
                alt={theme.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Theme Info & Palette Swatches */}
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-bold text-sm text-white truncate leading-tight">
                {theme.name}
              </span>

              <div className="flex items-center gap-1.5 mt-1.5">
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/20"
                  style={{ backgroundColor: theme.colors.accentSun }}
                  title="Primary accent"
                />
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/20"
                  style={{ backgroundColor: theme.colors.accentVice }}
                  title="Secondary accent"
                />
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/20"
                  style={{ backgroundColor: theme.colors.ground }}
                  title="Ground tone"
                />
              </div>
            </div>

            {/* Active Check Indicator */}
            {isActive && (
              <span className="w-2 h-2 rounded-full bg-[#ffd000] shrink-0 mr-1" />
            )}
          </button>
        );
      })}
    </div>
  );
};
