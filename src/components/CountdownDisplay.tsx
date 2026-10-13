import React from 'react';
import type { TimeRemaining } from '../types/countdown';
import { CountdownUnit } from './CountdownUnit';

interface CountdownDisplayProps {
  timeRemaining: TimeRemaining;
}

export const CountdownDisplay: React.FC<CountdownDisplayProps> = ({
  timeRemaining,
}) => {
  if (timeRemaining.isReleased) {
    return (
      <div className="countdown-released">
        <span className="released-headline">Grand Theft Auto VI is Out Now!</span>
        <p className="released-subtext">Welcome to Vice City.</p>
      </div>
    );
  }

  return (
    <section className="countdown-display" data-ui="countdown" aria-label="Countdown timer">
      <div className="countdown-grid">
        <CountdownUnit
          value={timeRemaining.days}
          label={timeRemaining.days === 1 ? 'Day' : 'Days'}
        />
        <div className="unit-separator" aria-hidden="true">:</div>
        <CountdownUnit
          value={timeRemaining.hours}
          label={timeRemaining.hours === 1 ? 'Hour' : 'Hours'}
          padZero
        />
        <div className="unit-separator" aria-hidden="true">:</div>
        <CountdownUnit
          value={timeRemaining.minutes}
          label={timeRemaining.minutes === 1 ? 'Minute' : 'Minutes'}
          padZero
        />
        <div className="unit-separator" aria-hidden="true">:</div>
        <CountdownUnit
          value={timeRemaining.seconds}
          label={timeRemaining.seconds === 1 ? 'Second' : 'Seconds'}
          padZero
        />
      </div>
    </section>
  );
};
