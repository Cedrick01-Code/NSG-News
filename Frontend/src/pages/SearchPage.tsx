import { useState } from 'react';
import { articles, categories } from '../data/mockData';
import { ArticleCard } from '../components/ArticleCard';
import { useApp } from '../App';

const SORT_OPTIONS = ['Most Relevant', 'Latest', 'Most Read'];

export default function SearchPage({ query: initial }: { query: string }) {
  const { navigate } = useApp();
  const [query, setQuery] = useState(initial);
  const [sort, setSort] = useState('Most Relevant');
  const [catFilter, setCatFilter] = useState('All');

  const results = query.trim().length > 0
    ? articles.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        a.category.toLowerCase().includes(query.toLowerCase()) ||
        a.author.name.toLowerCase().includes(query.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    : articles;

  const filtered = catFilter === 'All' ? results : results.filter(a => a.category === catFilter);
  const sorted = [...filtered].sort((a, b) =>
    sort === 'Latest'    ? new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime() :
    sort === 'Most Read' ? b.views - a.views : 0
  );

  const activeCats = [...new Set(results.map(a => a.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--fg)' }}>Search NSG News</h1>

      {/* Search bar */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <svg className="w-5 h-5 shrink-0" style={{ color: 'var(--fg-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search articles, authors, topics..."
            className="flex-1 bg-transparent focus:outline-none text-sm"
            style={{ color: 'var(--fg)' }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          {['All', ...activeCats].map(cat => (
            <button
              key={cat}
              onClick={() => setCatFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${catFilter === cat ? 'bg-nsg-red text-white' : 'border hover:border-nsg-red/50'}`}
              style={catFilter === cat ? {} : { borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>Sort:</span>
          <select
            value={sort} onChange={e => setSort(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-sm border focus:outline-none"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--fg)' }}
          >
            {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm mb-5" style={{ color: 'var(--fg-muted)' }}>
        {sorted.length} result{sorted.length !== 1 ? 's' : ''}
        {query ? ` for "${query}"` : ''}
        {catFilter !== 'All' ? ` in ${catFilter}` : ''}
      </div>

      {/* Results */}
      {sorted.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--fg)' }}>No results found</h2>
          <p className="text-sm mb-5" style={{ color: 'var(--fg-muted)' }}>Try different keywords or browse our categories.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.slice(0, 6).map(cat => (
              <button key={cat.id} onClick={() => navigate('category', { slug: cat.slug })}
                className="px-4 py-2 rounded-full text-sm border hover:border-nsg-red hover:text-nsg-red transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}>
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sorted.map(a => <ArticleCard key={a.id} article={a} />)}
        </div>
      )}
    </div>
  );
}
