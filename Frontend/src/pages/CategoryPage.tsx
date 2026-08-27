import { useState } from 'react';
import { useApp } from '../App';
import { articles, categories } from '../data/mockData';
import { ArticleCard, FeaturedCard } from '../components/ArticleCard';

const RWANDA_REGIONS = ['All', 'Kigali', 'Eastern Province', 'Western Province', 'Northern Province', 'Southern Province'];
const AFRICA_COUNTRIES = ['All', 'Kenya', 'Tanzania', 'Uganda', 'Ethiopia', 'Nigeria', 'Ghana', 'South Africa', 'Egypt'];
const SORT_OPTIONS = ['Latest', 'Most Read', 'Most Shared', 'Most Commented'];

export default function CategoryPage({ slug }: { slug: string }) {
  const { navigate } = useApp();
  const [sort, setSort] = useState('Latest');
  const [subFilter, setSubFilter] = useState('All');

  const category = categories.find(c => c.slug === slug);
  const categoryName = category?.name || slug.charAt(0).toUpperCase() + slug.slice(1);

  let filtered = articles.filter(a => a.category.toLowerCase() === categoryName.toLowerCase());

  if (filtered.length === 0) {
    filtered = articles.slice(0, 8);
  }

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'Most Read')      return b.views - a.views;
    if (sort === 'Most Shared')    return b.shares - a.shares;
    if (sort === 'Most Commented') return b.comments - a.comments;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const featured = sorted[0];
  const rest = sorted.slice(1);

  const subFilters = slug === 'rwanda' ? RWANDA_REGIONS : slug === 'africa' ? AFRICA_COUNTRIES : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--fg-muted)' }}>
        <button onClick={() => navigate('home')} className="hover:text-nsg-red transition-colors">Home</button>
        <span>›</span>
        <span style={{ color: 'var(--fg)' }}>{categoryName}</span>
      </nav>

      {/* Category header */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ background: category?.color ? `${category.color}20` : 'var(--bg-card)' }}
        >
          {category?.icon || '📰'}
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--fg)' }}>{categoryName}</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--fg-muted)' }}>
            {category?.description || `Latest ${categoryName} news and analysis from NSG News`}
          </p>
        </div>
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
        {subFilters ? (
          <div className="flex items-center gap-2 flex-wrap">
            {subFilters.map(f => (
              <button
                key={f}
                onClick={() => setSubFilter(f)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  subFilter === f ? 'bg-nsg-red text-white' : 'hover:bg-gray-100 dark:hover:bg-white/10'
                }`}
                style={{ color: subFilter === f ? 'white' : 'var(--fg-muted)' }}
              >
                {f}
              </button>
            ))}
          </div>
        ) : <div />}

        <div className="flex items-center gap-2">
          <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>Sort by:</span>
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt}
              onClick={() => setSort(opt)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                sort === opt ? 'bg-navy text-white' : 'border hover:border-navy/50'
              }`}
              style={sort === opt ? { background: '#1B2A4A' } : { borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {sorted.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📭</div>
          <h2 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--fg)' }}>No articles found</h2>
          <p className="text-sm mb-5" style={{ color: 'var(--fg-muted)' }}>There are no articles in this category yet.</p>
          <button onClick={() => navigate('home')} className="px-5 py-2.5 bg-nsg-red text-white font-bold rounded-xl text-sm hover:bg-nsg-red-dark transition-colors">
            Back to Home
          </button>
        </div>
      ) : (
        <div>
          {featured && (
            <div className="mb-8">
              <FeaturedCard article={featured} />
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {rest.map(a => <ArticleCard key={a.id} article={a} />)}
          </div>

          {/* All categories nav */}
          <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--border-color)' }}>
            <h3 className="font-display text-lg font-bold mb-4" style={{ color: 'var(--fg)' }}>Browse All Categories</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => navigate('category', { slug: cat.slug })}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all hover:scale-105 ${
                    cat.slug === slug ? 'border-nsg-red bg-nsg-red/5' : 'hover:border-nsg-red/40'
                  }`}
                  style={{ borderColor: cat.slug === slug ? undefined : 'var(--border-color)', background: cat.slug === slug ? undefined : 'var(--bg-card)' }}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-xs font-semibold text-center" style={{ color: 'var(--fg)' }}>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
