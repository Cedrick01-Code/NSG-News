import { useState } from 'react';
import { useApp } from '../App';
import { pendingSubmissions, weeklyViews } from '../data/mockData';
import nsgLogo from '../imports/NSG_news.png';

type Section = 'queue' | 'breaking' | 'homepage' | 'analytics';

const NAV_ITEMS = [
  { icon: '📥', label: 'Review Queue', section: 'queue' as Section },
  { icon: '🔴', label: 'Breaking News', section: 'breaking' as Section },
  { icon: '🏠', label: 'Homepage',      section: 'homepage' as Section },
  { icon: '📊', label: 'Analytics',     section: 'analytics' as Section },
];

function StatusBadge({ status }: { status: string }) {
  return <span className={`badge-${status} text-xs px-2 py-0.5 rounded font-semibold capitalize`}>{status.replace('-', ' ')}</span>;
}

export default function EditorDashboard() {
  const { navigate, user, logout } = useApp();
  const [section, setSection] = useState<Section>('queue');
  const [submissions, setSubmissions] = useState(pendingSubmissions);
  const [selected, setSelected] = useState<string | null>(null);
  const [breakingText, setBreakingText] = useState('');
  const [breakingItems, setBreakingItems] = useState([
    { id: 'bk1', text: 'AU Digital Economy Framework signed by all 54 member states', active: true,  time: '10:42' },
    { id: 'bk2', text: "Rwanda's $500M green energy initiative officially launched",   active: true,  time: '08:00' },
    { id: 'bk3', text: 'EAC unified visa announcement — full coverage inside',         active: false, time: '07:30' },
  ]);

  if (!user || (user.role !== 'editor' && user.role !== 'admin')) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--fg)' }}>Access Restricted</h2>
          <p className="text-sm mb-5" style={{ color: 'var(--fg-muted)' }}>Editor or Admin access required.</p>
          <button onClick={() => navigate('home')} className="px-5 py-2.5 bg-nsg-red text-white font-bold rounded-xl text-sm">Back to Home</button>
        </div>
      </div>
    );
  }

  const pending = submissions.filter(s => s.status === 'pending').length;
  const factCheck = submissions.filter(s => s.status === 'fact-check').length;
  const approved = submissions.filter(s => s.status === 'approved').length;

  function handleAction(id: string, action: 'approve' | 'reject' | 'fact-check') {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: action === 'fact-check' ? 'fact-check' : action === 'approve' ? 'approved' : 'rejected' } : s));
    setSelected(null);
  }

  function addBreaking() {
    if (!breakingText.trim()) return;
    setBreakingItems(prev => [{ id: `bk-${Date.now()}`, text: breakingText, active: true, time: new Date().toLocaleTimeString('en-RW', { hour: '2-digit', minute: '2-digit' }) }, ...prev]);
    setBreakingText('');
  }

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
            <div className="text-xs text-nsg-red font-semibold">Editor</div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map(item => (
            <button key={item.section} onClick={() => setSection(item.section)}
              className={`dash-nav-item w-full text-left ${section === item.section ? 'active' : ''}`}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
              {item.section === 'queue' && pending > 0 && (
                <span className="ml-auto bg-nsg-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{pending}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3" style={{ borderTop: '1px solid var(--border-color)' }}>
          <div className="flex items-center gap-2 px-2 mb-3">
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
            <div className="text-xs font-semibold truncate" style={{ color: 'var(--fg)' }}>{user.name}</div>
          </div>
          <button onClick={() => navigate('admin')}
            className="dash-nav-item w-full text-left mb-1" style={{ color: 'var(--fg-muted)' }}>
            <span>⚙️</span><span>Admin Panel</span>
          </button>
          <button onClick={logout} className="dash-nav-item w-full text-left text-red-500">
            <span>🚪</span><span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="px-6 py-4 sticky top-0 z-10 flex items-center justify-between"
          style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}>
          <div>
            <h1 className="font-display font-bold text-xl" style={{ color: 'var(--fg)' }}>
              {NAV_ITEMS.find(n => n.section === section)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span style={{ color: 'var(--fg-muted)' }}>{pending} pending</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span style={{ color: 'var(--fg-muted)' }}>{factCheck} fact-check</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span style={{ color: 'var(--fg-muted)' }}>{approved} approved</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* REVIEW QUEUE */}
          {section === 'queue' && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
                  <div className="px-5 py-4" style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border-color)' }}>
                    <h3 className="font-display font-bold" style={{ color: 'var(--fg)' }}>Submission Queue ({submissions.length})</h3>
                  </div>
                  <div>
                    {submissions.map(sub => (
                      <div
                        key={sub.id}
                        onClick={() => setSelected(sub.id === selected ? null : sub.id)}
                        className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-white/5 ${selected === sub.id ? 'bg-nsg-red/5 border-l-4 border-nsg-red' : ''}`}
                        style={{ borderBottom: '1px solid var(--border-color)' }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm truncate" style={{ color: 'var(--fg)' }}>{sub.title}</div>
                            <div className="flex items-center gap-2 mt-1 text-xs" style={{ color: 'var(--fg-muted)' }}>
                              <span>{sub.author}</span>
                              <span>·</span>
                              <span>{sub.category}</span>
                              <span>·</span>
                              <span>{new Date(sub.submittedAt).toLocaleDateString('en-RW', { month: 'short', day: 'numeric' })}</span>
                            </div>
                          </div>
                          <StatusBadge status={sub.status} />
                        </div>

                        {selected === sub.id && (
                          <div className="flex items-center gap-2 mt-4">
                            <button onClick={e => { e.stopPropagation(); handleAction(sub.id, 'approve'); }}
                              className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors">
                              ✓ Approve
                            </button>
                            <button onClick={e => { e.stopPropagation(); handleAction(sub.id, 'fact-check'); }}
                              className="px-3 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-lg hover:bg-purple-700 transition-colors">
                              🔍 Fact Check
                            </button>
                            <button onClick={e => { e.stopPropagation(); handleAction(sub.id, 'reject'); }}
                              className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors">
                              ✗ Reject
                            </button>
                            <button onClick={e => e.stopPropagation()}
                              className="px-3 py-1.5 text-xs font-semibold rounded-lg border hover:border-nsg-red hover:text-nsg-red transition-colors"
                              style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}>
                              Request Changes
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Workflow guide */}
              <div className="lg:col-span-2 space-y-4">
                <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <h4 className="font-display font-bold mb-4" style={{ color: 'var(--fg)' }}>Editorial Workflow</h4>
                  {[
                    { step: '1', label: 'Draft',        desc: 'Journalist writing',    color: '#6B7280' },
                    { step: '2', label: 'Submitted',    desc: 'Awaiting editor',       color: '#CA8A04' },
                    { step: '3', label: 'Under Review', desc: 'Editor reviewing',      color: '#0284C7' },
                    { step: '4', label: 'Fact Check',   desc: 'Verification required', color: '#9333EA' },
                    { step: '5', label: 'Approved',     desc: 'Ready to schedule',     color: '#059669' },
                    { step: '6', label: 'Published',    desc: 'Live on site',          color: '#16A34A' },
                  ].map(w => (
                    <div key={w.step} className="flex items-center gap-3 py-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ background: w.color }}>{w.step}</div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>{w.label}</div>
                        <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>{w.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <h4 className="font-display font-bold mb-3" style={{ color: 'var(--fg)' }}>Queue Summary</h4>
                  {[
                    { label: 'Pending Review', count: pending, color: '#CA8A04' },
                    { label: 'Fact Checking',  count: factCheck, color: '#9333EA' },
                    { label: 'Approved',       count: approved, color: '#059669' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                        <span className="text-sm" style={{ color: 'var(--fg)' }}>{item.label}</span>
                      </div>
                      <span className="font-bold font-mono-nsg" style={{ color: 'var(--fg)' }}>{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* BREAKING NEWS */}
          {section === 'breaking' && (
            <div className="max-w-2xl space-y-6">
              <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h3 className="font-display font-bold mb-4" style={{ color: 'var(--fg)' }}>Publish Breaking News</h3>
                <div className="space-y-3">
                  <textarea
                    value={breakingText} onChange={e => setBreakingText(e.target.value)}
                    placeholder="Enter breaking news headline..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-nsg-red resize-none"
                    style={{ background: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--fg)' }}
                  />
                  <div className="flex gap-2">
                    <button onClick={addBreaking}
                      className="px-5 py-2.5 bg-nsg-red hover:bg-nsg-red-dark text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2">
                      <span className="live-dot w-2 h-2 rounded-full bg-white inline-block" />
                      Publish Now
                    </button>
                    <button className="px-5 py-2.5 text-sm font-semibold border rounded-xl hover:border-nsg-red hover:text-nsg-red transition-colors"
                      style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}>
                      Schedule
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
                <div className="px-5 py-4" style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border-color)' }}>
                  <h3 className="font-display font-bold" style={{ color: 'var(--fg)' }}>Active Breaking News</h3>
                </div>
                {breakingItems.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <div className={`w-2 h-2 rounded-full shrink-0 ${item.active ? 'bg-nsg-red live-dot' : 'bg-gray-400'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm" style={{ color: 'var(--fg)' }}>{item.text}</div>
                      <div className="text-xs font-mono-nsg mt-0.5" style={{ color: 'var(--fg-muted)' }}>{item.time}</div>
                    </div>
                    <button
                      onClick={() => setBreakingItems(prev => prev.map(b => b.id === item.id ? { ...b, active: !b.active } : b))}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                        item.active ? 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/60 hover:bg-red-50 hover:text-red-600' : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      {item.active ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HOMEPAGE */}
          {section === 'homepage' && (
            <div className="max-w-2xl">
              <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h3 className="font-display font-bold mb-5" style={{ color: 'var(--fg)' }}>Homepage Section Manager</h3>
                <p className="text-sm mb-5" style={{ color: 'var(--fg-muted)' }}>
                  Drag to reorder sections. Toggle visibility on the public homepage. Changes take effect immediately.
                </p>
                {[
                  { name: 'Breaking News Ticker', visible: true,  editable: true  },
                  { name: 'Hero Story',           visible: true,  editable: true  },
                  { name: 'Live Banner',          visible: true,  editable: true  },
                  { name: 'Latest News',          visible: true,  editable: true  },
                  { name: 'Rwanda Section',       visible: true,  editable: true  },
                  { name: 'Africa Section',       visible: true,  editable: true  },
                  { name: 'Technology',           visible: true,  editable: true  },
                  { name: 'Sports',               visible: true,  editable: true  },
                  { name: 'Trending Sidebar',     visible: true,  editable: false },
                  { name: 'Newsletter Strip',     visible: true,  editable: false },
                  { name: 'Premium Promo',        visible: true,  editable: false },
                ].map((section, idx) => (
                  <div key={section.name} className="flex items-center gap-3 py-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <span className="text-sm font-mono-nsg" style={{ color: 'var(--fg-muted)' }}>{idx + 1}</span>
                    <div className="flex-1 text-sm font-medium" style={{ color: 'var(--fg)' }}>{section.name}</div>
                    <span className={`text-xs px-2 py-0.5 rounded font-semibold ${section.visible ? 'badge-published' : 'badge-draft'}`}>
                      {section.visible ? 'Visible' : 'Hidden'}
                    </span>
                    {section.editable && (
                      <button className="text-xs px-2 py-1 rounded border hover:border-nsg-red hover:text-nsg-red transition-colors"
                        style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}>Edit</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ANALYTICS */}
          {section === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Articles Published', value: '284', growth: 6.7, icon: '📄' },
                  { label: 'Avg. Review Time',   value: '4.2h', growth: -12.1, icon: '⏱️' },
                  { label: 'Rejection Rate',     value: '8.4%', growth: -2.3, icon: '❌' },
                  { label: 'Fact Checks',        value: '47', growth: 18.2, icon: '✓' },
                ].map(s => (
                  <div key={s.label} className="stat-card">
                    <div className="flex justify-between mb-3">
                      <span className="text-2xl">{s.icon}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.growth >= 0 ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'}`}>
                        {s.growth >= 0 ? '+' : ''}{s.growth}%
                      </span>
                    </div>
                    <div className="font-display text-2xl font-bold mb-0.5" style={{ color: 'var(--fg)' }}>{s.value}</div>
                    <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h3 className="font-display font-bold mb-4" style={{ color: 'var(--fg)' }}>Weekly Publications</h3>
                <div className="flex items-end gap-2 h-32">
                  {weeklyViews.map(d => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t-sm bg-navy hover:bg-nsg-red transition-colors"
                        style={{ height: `${(d.views / Math.max(...weeklyViews.map(v => v.views))) * 100}%`, minHeight: '4px' }}
                        title={`${d.views} articles`}
                      />
                      <span className="text-xs font-mono-nsg" style={{ color: 'var(--fg-muted)' }}>{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
