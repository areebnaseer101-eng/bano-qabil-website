import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  emoji: string;
}

const PETAL_EMOJIS = ['🌸', '🌺', '💮', '🌷', '🏵️'];

export function PetalFall() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const arr: Petal[] = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 10 + Math.random() * 8,
      size: 14 + Math.random() * 16,
      emoji: PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)],
    }));
    setPetals(arr);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden" aria-hidden="true">
      {petals.map(p => (
        <span
          key={p.id}
          className="absolute animate-petal-fall"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            top: '-5vh',
            opacity: 0.5,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
