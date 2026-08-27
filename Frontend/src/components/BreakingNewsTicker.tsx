import { useState, useEffect } from 'react';
import { useApp } from '../App';
import { breakingNewsItems } from '../data/mockData';

export default function BreakingNewsTicker() {
  const { navigate } = useApp();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx(i => (i + 1) % breakingNewsItems.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const item = breakingNewsItems[idx];

  return (
    <div
      className="flex items-stretch text-sm overflow-hidden"
      style={{ background: 'var(--ticker-bg)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Label */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-black/25 shrink-0">
        <span className="live-dot w-2 h-2 rounded-full bg-white inline-block" />
        <span className="font-bold text-white text-xs tracking-widest uppercase">Breaking</span>
      </div>

      {/* Headline */}
      <button
        onClick={() => item.slug && navigate('article', { slug: item.slug })}
        className="flex-1 text-left px-4 py-2.5 text-white font-medium text-sm truncate hover:underline transition-opacity"
      >
        {item.headline}
      </button>

      {/* Timestamp + controls */}
      <div className="flex items-center gap-1 px-3 shrink-0">
        <span className="text-white/60 text-xs font-mono-nsg mr-2 hidden sm:inline">{item.timestamp}</span>
        <button
          onClick={() => setIdx(i => (i - 1 + breakingNewsItems.length) % breakingNewsItems.length)}
          className="w-6 h-6 flex items-center justify-center rounded text-white/70 hover:text-white hover:bg-black/20 transition-colors"
          aria-label="Previous"
        >
          ‹
        </button>
        <span className="text-white/50 text-xs font-mono-nsg w-8 text-center">{idx + 1}/{breakingNewsItems.length}</span>
        <button
          onClick={() => setIdx(i => (i + 1) % breakingNewsItems.length)}
          className="w-6 h-6 flex items-center justify-center rounded text-white/70 hover:text-white hover:bg-black/20 transition-colors"
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  );
}
