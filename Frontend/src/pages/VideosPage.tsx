import { useState } from 'react';
import { useApp } from '../App';
import { articles, categories } from '../data/mockData';

const VIDEO_CATS = ['All', 'Rwanda', 'Africa', 'Politics', 'Sports', 'Technology', 'Business'];

function VideoCard({ article, featured = false }: { article: typeof articles[0]; featured?: boolean }) {
  const { navigate } = useApp();
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={`rounded-xl overflow-hidden cursor-pointer group ${featured ? '' : ''}`}
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
      onClick={() => navigate('article', { slug: article.slug })}
    >
      <div className={`relative ${featured ? 'aspect-video' : 'aspect-video'} overflow-hidden`}>
        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className="text-xs font-bold text-white bg-nsg-red px-2 py-0.5 rounded uppercase tracking-wider">
            {article.category}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="text-xs font-mono-nsg text-white bg-black/60 px-2 py-0.5 rounded">
            {article.readTime}:00
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className={`font-display font-bold leading-snug line-clamp-2 group-hover:text-nsg-red transition-colors ${featured ? 'text-lg' : 'text-sm'}`}
          style={{ color: 'var(--fg)' }}>
          {article.title}
        </h3>
        {featured && (
          <p className="text-sm mt-2 line-clamp-2" style={{ color: 'var(--fg-muted)' }}>{article.excerpt}</p>
        )}
        <div className="flex items-center gap-2 mt-2 text-xs" style={{ color: 'var(--fg-muted)' }}>
          <img src={article.author.avatar} alt="" className="w-4 h-4 rounded-full object-cover" />
          <span>{article.author.name}</span>
          <span>·</span>
          <span>{(article.views / 1000).toFixed(1)}K views</span>
        </div>
      </div>
    </div>
  );
}

export default function VideosPage() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? articles
    : articles.filter(a => a.category === activeTab);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🎬</span>
        <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--fg)' }}>Video News</h1>
      </div>

      {/* Category tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8">
        {VIDEO_CATS.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === cat ? 'bg-nsg-red text-white' : 'hover:bg-gray-100 dark:hover:bg-white/10'
            }`}
            style={{ color: activeTab === cat ? 'white' : 'var(--fg-muted)' }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Featured video */}
          {featured && (
            <section>
              <h2 className="font-display text-lg font-bold mb-4" style={{ color: 'var(--fg)' }}>Featured Video</h2>
              <VideoCard article={featured} featured />
            </section>
          )}

          {/* Video grid */}
          <section>
            <h2 className="font-display text-lg font-bold mb-4" style={{ color: 'var(--fg)' }}>More Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {rest.slice(0, 6).map(a => <VideoCard key={a.id} article={a} />)}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside>
          <div className="rounded-2xl p-5 mb-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <h3 className="font-display font-bold text-base mb-4" style={{ color: 'var(--fg)' }}>Trending Videos</h3>
            <div className="space-y-4">
              {[...articles].sort((a, b) => b.views - a.views).slice(0, 5).map((a, i) => (
                <div key={a.id} className="flex gap-3 items-start cursor-pointer group">
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0">
                    <img src={a.image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-nsg-red font-bold mb-0.5">{a.category}</div>
                    <div className="text-xs font-semibold line-clamp-2 group-hover:text-nsg-red transition-colors" style={{ color: 'var(--fg)' }}>{a.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--fg-muted)' }}>{(a.views / 1000).toFixed(1)}K views</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <h3 className="font-display font-bold text-base mb-4" style={{ color: 'var(--fg)' }}>Browse by Topic</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.slice(0, 8).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.name)}
                  className="flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium border hover:border-nsg-red hover:text-nsg-red transition-colors"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
