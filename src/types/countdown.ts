export interface DatabaseConfig {
  releaseDate: string;
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isReleased: boolean;
  totalSeconds: number;
}
