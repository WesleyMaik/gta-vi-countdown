import { useCountdown } from './hooks/useCountdown';
import { CountdownDisplay } from './components/CountdownDisplay';
import './App.css';

export function App() {
  const { timeRemaining, releaseDate, isLoading } = useCountdown();

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

  return (
    <main className="countdown-stage">
      <div className="backdrop-layer">
        <img
          src="./assets/miami-sunset.jpg"
          alt="Vice City Miami sunset atmosphere"
          className="backdrop-image"
          width={1920}
          height={1080}
        />
        <div className="backdrop-scrim" />
      </div>

      <div className="countdown-container">
        <header className="countdown-header">
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
        </footer>
      </div>
    </main>
  );
}

export default App;
