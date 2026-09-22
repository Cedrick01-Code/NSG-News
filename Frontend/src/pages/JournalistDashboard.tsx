import { useState } from 'react';
import { useApp } from '../App';
import { journalistStats, journalistArticles, weeklyViews } from '../data/mockData';
import nsgLogo from '../imports/NSG_news.png';

type DashSection = 'overview' | 'articles' | 'create' | 'analytics' | 'profile';

const NAV_ITEMS: { icon: string; label: string; section: DashSection }[] = [
  { icon: '📊', label: 'Overview',    section: 'overview'   },
  { icon: '📄', label: 'My Articles', section: 'articles'   },
  { icon: '✏️', label: 'Create',      section: 'create'     },
  { icon: '📈', label: 'Analytics',   section: 'analytics'  },
  { icon: '👤', label: 'Profile',     section: 'profile'    },
];

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`badge-${status} text-xs px-2 py-0.5 rounded font-semibold capitalize`}>{status}</span>
  );
}

function StatCard({ label, value, growth, icon }: { label: string; value: string; growth?: number; icon: string }) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        {growth !== undefined && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${growth >= 0 ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'}`}>
            {growth >= 0 ? '+' : ''}{growth}%
          </span>
        )}
      </div>
      <div className="font-display text-2xl font-bold mb-0.5" style={{ color: 'var(--fg)' }}>{value}</div>
      <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>{label}</div>
    </div>
  );
}

function BarChart({ data }: { data: { day: string; views: number }[] }) {
  const max = Math.max(...data.map(d => d.views));
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map(d => (
        <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full rounded-t-sm bg-nsg-red/80 hover:bg-nsg-red transition-colors"
            style={{ height: `${(d.views / max) * 100}%`, minHeight: '4px' }}
            title={`${d.views}K views`}
          />
          <span className="text-xs font-mono-nsg" style={{ color: 'var(--fg-muted)' }}>{d.day}</span>
        </div>
      ))}
    </div>
  );
}

export default function JournalistDashboard() {
  const { navigate, user, logout } = useApp();
  const [section, setSection] = useState<DashSection>('overview');
  const [articleStatus, setArticleStatus] = useState('all');
  const [newArticle, setNewArticle] = useState({ title: '', category: 'Rwanda', content: '', excerpt: '' });
  const [saved, setSaved] = useState(false);

if (!user || (user.role !== 'journalist' && user.role !== 'editor')) {
     return (
       <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
         <div className="text-center">
           <div className="text-5xl mb-4">🔒</div>
           <h2 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--fg)' }}>Access Restricted</h2>
           <p className="text-sm mb-5" style={{ color: 'var(--fg-muted)' }}>Sign in with a journalist or editor account to access this dashboard.</p>
           <button onClick={() => navigate('home')} className="px-5 py-2.5 bg-nsg-red text-white font-bold rounded-xl text-sm">Back to Home</button>
         </div>
       </div>
     );
   }

  const filteredArticles = articleStatus === 'all'
    ? journalistArticles
    : journalistArticles.filter(a => a.status === articleStatus);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside className="w-56 shrink-0 flex flex-col" style={{ background: 'var(--bg-card)', borderRight: '1px solid var(--border-color)' }}>
        <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <button onClick={() => navigate('home')}>
            <img src={nsgLogo} alt="NSG" className="h-9 w-9 object-contain" />
          </button>
          <div>
            <div className="font-display font-bold text-sm" style={{ color: 'var(--fg)' }}>NSG News</div>
            <div className="text-xs text-nsg-red font-semibold">Journalist</div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(item => (
            <button
              key={item.section}
              onClick={() => setSection(item.section)}
              className={`dash-nav-item w-full text-left ${section === item.section ? 'active' : ''}`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-3" style={{ borderTop: '1px solid var(--border-color)' }}>
          <div className="flex items-center gap-2 mb-3 px-2">
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
            <div className="min-w-0">
              <div className="text-xs font-semibold truncate" style={{ color: 'var(--fg)' }}>{user.name}</div>
            </div>
          </div>
          <button onClick={logout} className="dash-nav-item w-full text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Topbar */}
        <div className="px-6 py-4 flex items-center justify-between sticky top-0 z-10"
          style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}>
          <div>
            <h1 className="font-display font-bold text-xl" style={{ color: 'var(--fg)' }}>
              {NAV_ITEMS.find(n => n.section === section)?.label}
            </h1>
            <div className="text-xs font-mono-nsg mt-0.5" style={{ color: 'var(--fg-muted)' }}>
              {new Date().toLocaleDateString('en-RW', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
          <button
            onClick={() => setSection('create')}
            className="flex items-center gap-2 px-4 py-2 bg-nsg-red hover:bg-nsg-red-dark text-white text-sm font-bold rounded-xl transition-colors"
          >
            <span>+</span>
            <span>New Article</span>
          </button>
        </div>

        <div className="p-6">
          {/* OVERVIEW */}
          {section === 'overview' && (
            <div className="space-y-6">
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                 <StatCard label="Total Views" value={`${(journalistStats.totalViews / 1000).toFixed(0)}K`} growth={12.4} icon="👁️" />
                 <StatCard label="Articles"    value={journalistStats.articles.toString()}         growth={4.1} icon="📄" />
                 <StatCard label="Engagement"  value={`${journalistStats.engagementRate}%`}        growth={2.1} icon="💬" />
               </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <h3 className="font-display font-bold mb-4" style={{ color: 'var(--fg)' }}>Weekly Views</h3>
                  <BarChart data={weeklyViews} />
                </div>

                <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <h3 className="font-display font-bold mb-4" style={{ color: 'var(--fg)' }}>Article Status</h3>
                  <div className="space-y-3">
                    {[
                      { status: 'Published', count: 4, color: '#059669' },
                      { status: 'Under Review', count: 1, color: '#0284C7' },
                      { status: 'Submitted', count: 1, color: '#CA8A04' },
                      { status: 'Draft', count: 1, color: '#6B7280' },
                      { status: 'Rejected', count: 1, color: '#DC2626' },
                    ].map(item => (
                      <div key={item.status} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color }} />
                        <span className="text-sm flex-1" style={{ color: 'var(--fg)' }}>{item.status}</span>
                        <span className="font-bold text-sm" style={{ color: 'var(--fg)' }}>{item.count}</span>
                        <div className="w-24 h-1.5 rounded-full bg-gray-100 dark:bg-white/10">
                          <div className="h-full rounded-full" style={{ width: `${(item.count / 8) * 100}%`, background: item.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent activity */}
              <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h3 className="font-display font-bold mb-4" style={{ color: 'var(--fg)' }}>Recent Articles</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                        {['Title', 'Category', 'Status', 'Views', 'Updated'].map(h => (
                          <th key={h} className="text-left pb-3 pr-4 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {journalistArticles.map(a => (
                        <tr key={a.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td className="py-3 pr-4 font-medium max-w-xs truncate" style={{ color: 'var(--fg)' }}>{a.title}</td>
                          <td className="py-3 pr-4 text-xs" style={{ color: 'var(--fg-muted)' }}>{a.category}</td>
                          <td className="py-3 pr-4"><StatusBadge status={a.status} /></td>
                          <td className="py-3 pr-4 font-mono-nsg text-xs" style={{ color: 'var(--fg-muted)' }}>
                            {a.views > 0 ? `${(a.views / 1000).toFixed(1)}K` : '—'}
                          </td>
                          <td className="py-3 text-xs" style={{ color: 'var(--fg-muted)' }}>{a.updatedAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ARTICLES */}
          {section === 'articles' && (
            <div>
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                {['all', 'draft', 'submitted', 'review', 'published', 'rejected'].map(s => (
                  <button
                    key={s}
                    onClick={() => setArticleStatus(s)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                      articleStatus === s ? 'bg-nsg-red text-white' : 'border hover:border-nsg-red/40'
                    }`}
                    style={articleStatus === s ? {} : { borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}
                  >
                    {s === 'all' ? 'All Articles' : s}
                  </button>
                ))}
              </div>

              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
                {filteredArticles.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="text-4xl mb-3">📭</div>
                    <div className="font-semibold" style={{ color: 'var(--fg)' }}>No articles in this status</div>
                  </div>
                ) : (
                  <table className="w-full text-sm">
                    <thead style={{ background: 'var(--bg)' }}>
                      <tr>
                        {['Title', 'Category', 'Status', 'Views', 'Comments', 'Updated', 'Actions'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredArticles.map(a => (
                        <tr key={a.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors" style={{ borderTop: '1px solid var(--border-color)' }}>
                          <td className="px-4 py-3 font-medium max-w-xs" style={{ color: 'var(--fg)' }}>
                            <div className="truncate">{a.title}</div>
                          </td>
                          <td className="px-4 py-3 text-xs" style={{ color: 'var(--fg-muted)' }}>{a.category}</td>
                          <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                          <td className="px-4 py-3 font-mono-nsg text-xs" style={{ color: 'var(--fg-muted)' }}>
                            {a.views > 0 ? `${(a.views / 1000).toFixed(1)}K` : '—'}
                          </td>
                          <td className="px-4 py-3 font-mono-nsg text-xs" style={{ color: 'var(--fg-muted)' }}>{a.comments || '—'}</td>
                          <td className="px-4 py-3 text-xs" style={{ color: 'var(--fg-muted)' }}>{a.updatedAt}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button onClick={() => setSection('create')}
                                className="text-xs px-2.5 py-1 rounded-lg border hover:border-nsg-red hover:text-nsg-red transition-colors"
                                style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}>
                                Edit
                              </button>
                              {a.status === 'draft' && (
                                <button className="text-xs px-2.5 py-1 rounded-lg bg-nsg-red text-white hover:bg-nsg-red-dark transition-colors">
                                  Submit
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* CREATE */}
          {section === 'create' && (
            <div className="max-w-3xl">
              {saved && (
                <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 text-sm rounded-xl">
                  ✓ Draft saved successfully.
                </div>
              )}
              <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-bold text-lg" style={{ color: 'var(--fg)' }}>New Article</h2>
                  <div className="flex gap-2">
                    <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000); }}
                      className="px-4 py-2 text-sm font-semibold border rounded-xl hover:border-nsg-red hover:text-nsg-red transition-colors"
                      style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}>
                      Save Draft
                    </button>
                    <button className="px-4 py-2 text-sm font-bold bg-nsg-red hover:bg-nsg-red-dark text-white rounded-xl transition-colors">
                      Submit for Review
                    </button>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--fg)' }}>Headline *</label>
                    <input
                      type="text" value={newArticle.title} onChange={e => setNewArticle(a => ({ ...a, title: e.target.value }))}
                      placeholder="Enter a clear, compelling headline..."
                      className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-nsg-red font-display font-semibold"
                      style={{ background: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--fg)' }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--fg)' }}>Category</label>
                      <select
                        value={newArticle.category} onChange={e => setNewArticle(a => ({ ...a, category: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-nsg-red"
                        style={{ background: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--fg)' }}
                      >
                        {['Rwanda', 'Africa', 'World', 'Politics', 'Business', 'Technology', 'Sports', 'Health', 'Science', 'Education'].map(c => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--fg)' }}>Tags</label>
                      <input
                        type="text" placeholder="Add tags separated by commas"
                        className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-nsg-red"
                        style={{ background: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--fg)' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--fg)' }}>Excerpt / Summary</label>
                    <textarea
                      value={newArticle.excerpt} onChange={e => setNewArticle(a => ({ ...a, excerpt: e.target.value }))}
                      placeholder="Brief summary for previews and social media..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-nsg-red resize-none"
                      style={{ background: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--fg)' }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>Article Body *</label>
                      <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg" style={{ background: 'var(--bg)', color: 'var(--fg-muted)' }}>
                        <span>✨</span>
                        <span>AI Assist</span>
                      </div>
                    </div>
                    <textarea
                      value={newArticle.content} onChange={e => setNewArticle(a => ({ ...a, content: e.target.value }))}
                      placeholder="Write your article here..."
                      rows={14}
                      className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-nsg-red resize-none"
                      style={{ background: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--fg)', lineHeight: '1.8' }}
                    />
                  </div>

                  {/* AI suggestions */}
                  <div className="rounded-xl p-4" style={{ background: 'var(--bg)', border: '1px solid var(--border-color)' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <span>✨</span>
                      <span className="font-semibold text-sm" style={{ color: 'var(--fg)' }}>AI Newsroom Assistant</span>
                      <span className="text-xs px-1.5 py-0.5 rounded text-nsg-red bg-nsg-red/10 font-semibold">Beta</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['Suggest headline', 'Generate summary', 'SEO optimize', 'Suggest tags', 'Check grammar'].map(action => (
                        <button key={action}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium border hover:border-nsg-red hover:text-nsg-red transition-colors"
                          style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}>
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ANALYTICS */}
          {section === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="This Month" value="42.1K" growth={18.3} icon="📅" />
                <StatCard label="Avg. per Article" value="1,850" growth={5.2} icon="📖" />
                <StatCard label="Shares" value="2,840" growth={22.1} icon="🔗" />
                <StatCard label="Comments" value="341" growth={-3.2} icon="💬" />
              </div>
              <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h3 className="font-display font-bold mb-4" style={{ color: 'var(--fg)' }}>Weekly Performance</h3>
                <BarChart data={weeklyViews} />
              </div>
              <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h3 className="font-display font-bold mb-4" style={{ color: 'var(--fg)' }}>Top Performing Articles</h3>
                {journalistArticles.filter(a => a.views > 0).map(a => (
                  <div key={a.id} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="text-sm font-medium truncate" style={{ color: 'var(--fg)' }}>{a.title}</div>
                      <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>{a.category} · {a.updatedAt}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-nsg-red font-mono-nsg">{(a.views / 1000).toFixed(1)}K</div>
                      <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>views</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROFILE */}
          {section === 'profile' && (
            <div className="max-w-lg">
              <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div className="flex items-center gap-4 mb-6">
                  <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <div className="font-display font-bold text-xl" style={{ color: 'var(--fg)' }}>{user.name}</div>
                    <div className="text-sm capitalize text-nsg-red font-semibold">{user.role}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--fg-muted)' }}>{user.email}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Display Name', value: user.name },
                    { label: 'Email', value: user.email },
                    { label: 'Bio', value: 'Technology and innovation journalist based in Kigali.' },
                    { label: 'Location', value: 'Kigali, Rwanda' },
                  ].map(field => (
                    <div key={field.label}>
                      <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--fg-muted)' }}>
                        {field.label}
                      </label>
                      <input
                        defaultValue={field.value}
                        className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:border-nsg-red"
                        style={{ background: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--fg)' }}
                      />
                    </div>
                  ))}
                  <button className="w-full py-3 bg-nsg-red hover:bg-nsg-red-dark text-white font-bold rounded-xl transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
