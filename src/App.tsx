import { useState, useCallback, useEffect } from 'react';
import { useCountdown } from './hooks/useCountdown';
import { CountdownDisplay } from './components/CountdownDisplay';
import { StaggeredMenu } from './components/StaggeredMenu';
import { ThemeSelector } from './components/ThemeSelector';
import { SITE_THEMES, type SiteTheme } from './types/theme';
import './App.css';

export function App() {
  const { timeRemaining, releaseDate, isLoading } = useCountdown();

  const [activeTheme, setActiveTheme] = useState<SiteTheme>(() => {
    try {
      const saved = localStorage.getItem('gta-vi-theme');
      if (saved) {
        const found = SITE_THEMES.find((t) => t.id === saved);
        if (found) return found;
      }
    } catch {
      // LocalStorage access fallback
    }
    return SITE_THEMES[0];
  });

  const [autoCycle, setAutoCycle] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('gta-vi-auto-cycle');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const handleToggleAutoCycle = useCallback(() => {
    setAutoCycle((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('gta-vi-auto-cycle', String(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (!autoCycle) return;

    const interval = setInterval(() => {
      setActiveTheme((currentTheme) => {
        const currentIndex = SITE_THEMES.findIndex((t) => t.id === currentTheme.id);
        const nextIndex = (currentIndex + 1) % SITE_THEMES.length;
        const nextTheme = SITE_THEMES[nextIndex];
        try {
          localStorage.setItem('gta-vi-theme', nextTheme.id);
        } catch {
          // Ignore storage errors
        }
        return nextTheme;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [autoCycle]);

  const handleSelectTheme = useCallback((theme: SiteTheme) => {
    setActiveTheme(theme);
    try {
      localStorage.setItem('gta-vi-theme', theme.id);
    } catch {
      // Ignore storage errors
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--color-ground', activeTheme.colors.ground);
    document.documentElement.style.setProperty('--color-accent-sun', activeTheme.colors.accentSun);
    document.documentElement.style.setProperty('--color-accent-vice', activeTheme.colors.accentVice);
  }, [activeTheme]);

  const formattedTargetDate = (() => {
    try {
      const d = new Date(releaseDate);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      });
    } catch {
      return releaseDate;
    }
  })();

  const themeCustomProperties = {
    '--color-ground': activeTheme.colors.ground,
    '--color-accent-sun': activeTheme.colors.accentSun,
    '--color-accent-vice': activeTheme.colors.accentVice,
    '--color-ink': activeTheme.colors.ink,
    '--color-muted': activeTheme.colors.muted,
  } as React.CSSProperties;

  const autoCycleSwitch = (
    <div className="flex items-center gap-2" data-ui="auto-cycle-switch">
      <span className="text-sm font-semibold text-white/80 select-none">
        Auto
      </span>
      <button
        type="button"
        role="switch"
        aria-label="Automatic theme rotation"
        aria-checked={autoCycle}
        onClick={handleToggleAutoCycle}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-[background-color] duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd000] ${
          autoCycle ? 'bg-[#ffd000]' : 'bg-white/20'
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full transition-[transform,background-color] duration-200 ease-in-out ${
            autoCycle ? 'translate-x-5 bg-black' : 'translate-x-0 bg-white'
          }`}
        />
      </button>
    </div>
  );

  return (
    <main className="countdown-stage" style={themeCustomProperties}>
      <StaggeredMenu
        title="Theme"
        headerRight={autoCycleSwitch}
        accentColor={activeTheme.colors.accentSun}
        menuButtonColor="#ffffff"
        openMenuButtonColor={activeTheme.colors.accentSun}
        colors={[
          activeTheme.colors.accentVice,
          activeTheme.colors.accentSun,
          activeTheme.colors.ground,
        ]}
      >
        <ThemeSelector
          themes={SITE_THEMES}
          activeThemeId={activeTheme.id}
          onSelectTheme={handleSelectTheme}
        />
      </StaggeredMenu>

      <div className="backdrop-layer" aria-hidden="true">
        {SITE_THEMES.map((theme) => {
          const isActive = theme.id === activeTheme.id;
          return (
            <picture
              key={theme.id}
              className={`backdrop-image ${isActive ? 'backdrop-image-active' : 'backdrop-image-hidden'}`}
            >
              <source media="(max-width: 768px)" srcSet={theme.mobileImage} />
              <img
                src={theme.image}
                srcSet={`${theme.mobileImage} 1080w, ${theme.image} 1920w`}
                sizes="(max-width: 768px) 100vw, 100vw"
                alt=""
                width={1920}
                height={1200}
                loading="eager"
                className="backdrop-image-content"
              />
            </picture>
          );
        })}
        <div
          className="backdrop-scrim"
          style={{ backgroundColor: activeTheme.colors.scrim }}
        />
      </div>

      <div className="countdown-container">
        <header className="countdown-header">
          <img
            src="./assets/gta-vi-logo.png"
            alt="Grand Theft Auto VI logo"
            className="brand-logo"
            width={140}
            height={60}
          />
          <h1 className="countdown-title">Grand Theft Auto VI Launches In</h1>
        </header>

        {isLoading ? (
          <div className="countdown-loading" aria-live="polite">
            <span className="loading-indicator">Synchronizing with Vice City...</span>
          </div>
        ) : (
          <CountdownDisplay timeRemaining={timeRemaining} />
        )}

        <footer className="countdown-footer">
          <p className="countdown-target-note">
            Official target: {formattedTargetDate} (Worldwide)
          </p>
          <p className="countdown-disclaimer">
            Not affiliated with or endorsed by Rockstar Games or Take-Two Interactive.
          </p>
        </footer>
      </div>
    </main>
  );
}

export default App;
