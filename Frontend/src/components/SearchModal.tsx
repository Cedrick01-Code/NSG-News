import { useState, useEffect, useRef } from 'react';
import { useApp } from '../App';
import { articles, categories } from '../data/mockData';

const TRENDING = ['Rwanda elections 2026', 'AFCON 2026', 'Kigali startup', 'African Union', 'Green energy'];

export default function SearchModal() {
  const { setShowSearchModal, navigate } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowSearchModal(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setShowSearchModal]);

  const results = query.trim().length > 1
    ? articles.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.category.toLowerCase().includes(query.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
        a.author.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  function go(slug: string) {
    navigate('article', { slug });
    setShowSearchModal(false);
  }

  function fullSearch() {
    navigate('search', { q: query });
    setShowSearchModal(false);
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) setShowSearchModal(false); }}
    >
      <div className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden" style={{ background: 'var(--bg-card)' }}>
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <svg className="w-5 h-5 shrink-0" style={{ color: 'var(--fg-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && query.trim()) fullSearch(); }}
            placeholder="Search NSG News..."
            className="flex-1 bg-transparent text-base focus:outline-none"
            style={{ color: 'var(--fg)' }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-xs px-2 py-1 rounded" style={{ color: 'var(--fg-muted)' }}>Clear</button>
          )}
          <kbd className="hidden sm:inline text-xs px-2 py-1 rounded border font-mono-nsg" style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}>Esc</kbd>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {results.length > 0 ? (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-3 px-1" style={{ color: 'var(--fg-muted)' }}>
                {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
              </div>
              <div className="space-y-1">
                {results.map(a => (
                  <button
                    key={a.id}
                    onClick={() => go(a.slug)}
                    className="w-full text-left flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                  >
                    <img src={a.image} alt="" className="w-12 h-10 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-nsg-red mb-0.5">{a.category}</div>
                      <div className="text-sm font-semibold line-clamp-1" style={{ color: 'var(--fg)' }}>{a.title}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--fg-muted)' }}>
                        {a.author.name} · {a.readTime} min read
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {query.trim() && (
                <button
                  onClick={fullSearch}
                  className="w-full mt-3 py-2.5 text-sm font-semibold text-nsg-red border border-nsg-red/30 rounded-xl hover:bg-nsg-red/5 transition-colors"
                >
                  See all results for &quot;{query}&quot; →
                </button>
              )}
            </div>
          ) : query.trim().length > 1 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">🔍</div>
              <div className="font-semibold mb-1" style={{ color: 'var(--fg)' }}>No results found</div>
              <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>Try different keywords or browse categories</div>
            </div>
          ) : (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-3 px-1" style={{ color: 'var(--fg-muted)' }}>Trending Searches</div>
              <div className="flex flex-wrap gap-2 mb-5">
                {TRENDING.map(t => (
                  <button
                    key={t}
                    onClick={() => setQuery(t)}
                    className="px-3 py-1.5 text-sm rounded-full border hover:border-nsg-red hover:text-nsg-red transition-colors"
                    style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="text-xs font-bold uppercase tracking-wider mb-3 px-1" style={{ color: 'var(--fg-muted)' }}>Browse Categories</div>
              <div className="grid grid-cols-3 gap-2">
                {categories.slice(0, 9).map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { navigate('category', { slug: cat.slug }); setShowSearchModal(false); }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    style={{ border: '1px solid var(--border-color)', color: 'var(--fg)' }}
                  >
                    <span>{cat.icon}</span>
                    <span className="truncate">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
