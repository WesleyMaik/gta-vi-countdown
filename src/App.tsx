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

  return (
    <main className="countdown-stage" style={themeCustomProperties}>
      <StaggeredMenu
        title="Theme"
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

      <div className="backdrop-layer">
        <img
          key={activeTheme.image}
          src={activeTheme.image}
          alt={activeTheme.name}
          className="backdrop-image"
          width={1920}
          height={1200}
        />
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
