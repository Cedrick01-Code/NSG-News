import { useApp } from '../App';
import { articles, categories, authors } from '../data/mockData';
import { CompactCard } from '../components/ArticleCard';

export default function ProfilePage() {
  const { user, navigate, setShowAuthModal, setAuthModalTab, bookmarks } = useApp();

  if (!user) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">👤</div>
        <h2 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--fg)' }}>Sign in to view your profile</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--fg-muted)' }}>Access your saved articles, reading history, and personalized feed.</p>
        <button
          onClick={() => { setAuthModalTab('login'); setShowAuthModal(true); }}
          className="px-6 py-3 bg-nsg-red text-white font-bold rounded-xl hover:bg-nsg-red-dark transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  const savedArticles = articles.filter(a => bookmarks.includes(a.id));
  const recommended = articles.slice(0, 4);

  const dashLink = user.role === 'journalist' ? 'journalist'
    : user.role === 'editor' ? 'editor'
    : user.role === 'admin'  ? 'admin'
    : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile sidebar */}
        <aside className="space-y-5">
          {/* Profile card */}
          <div className="rounded-2xl p-6 text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <div className="relative w-20 h-20 mx-auto mb-3">
              <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover ring-4 ring-nsg-red/20" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-nsg-red border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            <h2 className="font-display font-bold text-xl mb-0.5" style={{ color: 'var(--fg)' }}>{user.name}</h2>
            <div className="text-xs text-nsg-red font-bold uppercase tracking-wider mb-1">{user.role}</div>
            <div className="text-xs mb-4" style={{ color: 'var(--fg-muted)' }}>{user.email}</div>
            {dashLink && (
              <button onClick={() => navigate(dashLink)}
                className="w-full py-2 bg-navy text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity">
                Go to Dashboard
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--fg)' }}>Activity</h3>
            <div className="space-y-3">
              {[
                { label: 'Articles Read', value: 142 },
                { label: 'Saved Articles', value: bookmarks.length },
                { label: 'Comments Posted', value: 8 },
                { label: 'Following', value: 5 },
              ].map(stat => (
                <div key={stat.label} className="flex justify-between text-sm">
                  <span style={{ color: 'var(--fg-muted)' }}>{stat.label}</span>
                  <span className="font-bold" style={{ color: 'var(--fg)' }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Following categories */}
          <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--fg)' }}>Following Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 5).map(cat => (
                <button key={cat.id} onClick={() => navigate('category', { slug: cat.slug })}
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border hover:border-nsg-red hover:text-nsg-red transition-colors"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}>
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Following journalists */}
          <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--fg)' }}>Following Journalists</h3>
            <div className="space-y-3">
              {authors.slice(0, 3).map(author => (
                <div key={author.id} className="flex items-center gap-3">
                  <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate" style={{ color: 'var(--fg)' }}>{author.name}</div>
                    <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>{author.articles} articles</div>
                  </div>
                  <button className="text-xs px-2.5 py-1 rounded-full bg-nsg-red text-white font-semibold">Following</button>
                </div>
              ))}
            </div>
          </div>

          {/* Notification settings */}
          <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--fg)' }}>Notifications</h3>
            <div className="space-y-3">
              {[
                { label: 'Breaking News', enabled: true },
                { label: 'New articles in Rwanda', enabled: true },
                { label: 'Comment replies', enabled: true },
                { label: 'Newsletter', enabled: false },
              ].map(n => (
                <div key={n.label} className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: 'var(--fg)' }}>{n.label}</span>
                  <div className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${n.enabled ? 'bg-nsg-red' : 'bg-gray-300 dark:bg-white/20'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${n.enabled ? 'translate-x-4' : 'translate-x-0.5'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Saved articles */}
          <div>
            <h2 className="font-display text-xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
              Saved Articles ({savedArticles.length})
            </h2>
            {savedArticles.length === 0 ? (
              <div className="rounded-2xl p-10 text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div className="text-4xl mb-3">🔖</div>
                <div className="font-semibold mb-1" style={{ color: 'var(--fg)' }}>No saved articles yet</div>
                <p className="text-sm mb-4" style={{ color: 'var(--fg-muted)' }}>Bookmark articles to read them later.</p>
                <button onClick={() => navigate('home')} className="px-5 py-2.5 bg-nsg-red text-white font-bold rounded-xl text-sm hover:bg-nsg-red-dark transition-colors">
                  Browse Articles
                </button>
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
                {savedArticles.map(a => (
                  <div key={a.id} className="px-5">
                    <CompactCard article={a} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reading history */}
          <div>
            <h2 className="font-display text-xl font-bold mb-4" style={{ color: 'var(--fg)' }}>Reading History</h2>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
              {articles.slice(2, 7).map(a => (
                <div key={a.id} className="px-5">
                  <CompactCard article={a} />
                </div>
              ))}
            </div>
          </div>

          {/* Recommended */}
          <div>
            <h2 className="font-display text-xl font-bold mb-4" style={{ color: 'var(--fg)' }}>Recommended for You</h2>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
              {recommended.map(a => (
                <div key={a.id} className="px-5">
                  <CompactCard article={a} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
