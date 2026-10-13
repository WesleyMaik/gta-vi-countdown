import { useState, useEffect } from 'react';
import type { DatabaseConfig, TimeRemaining } from '../types/countdown';

const DEFAULT_RELEASE_DATE = '2026-11-19T00:00:00Z';

function calculateTimeRemaining(targetDateStr: string): TimeRemaining {
  const targetTime = new Date(targetDateStr).getTime();
  const now = Date.now();
  const deltaMs = Math.max(0, targetTime - now);
  const totalSeconds = Math.floor(deltaMs / 1000);

  if (totalSeconds <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isReleased: true,
      totalSeconds: 0,
    };
  }

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isReleased: false,
    totalSeconds,
  };
}

export function useCountdown() {
  const [releaseDate, setReleaseDate] = useState<string>(DEFAULT_RELEASE_DATE);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(DEFAULT_RELEASE_DATE)
  );

  useEffect(() => {
    let isMounted = true;

    async function loadConfig() {
      try {
        const url = `${import.meta.env.BASE_URL}db.json`;
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Failed to load db.json: ${response.status}`);
        }
        const data: DatabaseConfig = await response.json();
        if (isMounted && data.releaseDate) {
          setReleaseDate(data.releaseDate);
          setTimeRemaining(calculateTimeRemaining(data.releaseDate));
        }
      } catch (err) {
        console.warn('Falling back to default release date:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadConfig();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(releaseDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [releaseDate]);

  return {
    releaseDate,
    timeRemaining,
    isLoading,
  };
}
