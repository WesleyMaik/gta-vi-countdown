import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export function ReleaseConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const celebrate = confetti.create(canvas, {
      resize: true,
      disableForReducedMotion: true,
    });
    const end = performance.now() + 10_000;

    const rain = () => {
      // Spread emitters across the top so the whole viewport gets a shower.
      for (let column = 0; column < 5; column += 1) {
        void celebrate({
          particleCount: 6,
          angle: 270,
          spread: 70,
          startVelocity: 12,
          gravity: 0.8,
          ticks: 360,
          scalar: 1.1,
          colors: ['#ffd000', '#f4327f', '#ffffff', '#45e0d0', '#ff9347'],
          origin: { x: (column + Math.random()) / 5, y: -0.05 },
        });
      }
    };

    rain();
    const timer = window.setInterval(() => {
      if (performance.now() >= end) {
        window.clearInterval(timer);
        return;
      }
      rain();
    }, 120);

    return () => {
      window.clearInterval(timer);
      celebrate.reset();
    };
  }, []);

  return <canvas ref={canvasRef} className="release-confetti" aria-hidden="true" />;
}
