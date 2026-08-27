import { useState } from 'react';
import { useApp } from '../App';
import { adminStats, recentUsers, weeklyViews, categoryBreakdown } from '../data/mockData';
import nsgLogo from '../imports/NSG_news.png';

type Section = 'overview' | 'users' | 'content' | 'analytics' | 'settings';

const NAV_ITEMS = [
  { icon: '📊', label: 'Overview',  section: 'overview'   as Section },
  { icon: '👥', label: 'Users',     section: 'users'      as Section },
  { icon: '📄', label: 'Content',   section: 'content'    as Section },
  { icon: '📈', label: 'Analytics', section: 'analytics'  as Section },
  { icon: '⚙️', label: 'Settings',  section: 'settings'   as Section },
];

function StatCard({ label, value, growth, icon, sub }: { label: string; value: string | number; growth: number; icon: string; sub?: string }) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${growth >= 0 ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'}`}>
          {growth >= 0 ? '+' : ''}{growth}%
        </span>
      </div>
      <div className="font-display text-2xl font-bold mb-0.5" style={{ color: 'var(--fg)' }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>{label}</div>
      {sub && <div className="text-xs mt-0.5 text-nsg-red font-semibold">{sub}</div>}
    </div>
  );
}

export default function AdminDashboard() {
  const { navigate, user, logout } = useApp();
  const [section, setSection] = useState<Section>('overview');
  const [users, setUsers] = useState(recentUsers);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--fg)' }}>Admin Access Required</h2>
          <p className="text-sm mb-5" style={{ color: 'var(--fg-muted)' }}>Sign in with the admin account to access this dashboard.</p>
          <button onClick={() => navigate('home')} className="px-5 py-2.5 bg-nsg-red text-white font-bold rounded-xl text-sm">Back to Home</button>
        </div>
      </div>
    );
  }

  const maxViews = Math.max(...weeklyViews.map(d => d.views));

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside className="w-56 shrink-0 flex flex-col" style={{ background: 'var(--nav-bg)' }}>
        <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <button onClick={() => navigate('home')}>
            <img src={nsgLogo} alt="NSG" className="h-9 w-9 object-contain" />
          </button>
          <div>
            <div className="font-display font-bold text-sm text-white">NSG News</div>
            <div className="text-xs text-nsg-red-light font-semibold">Admin Panel</div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(item => (
            <button key={item.section} onClick={() => setSection(item.section)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                section === item.section ? 'bg-nsg-red text-white' : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-3 mt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="text-xs uppercase tracking-wider px-3 mb-2 text-white/30">Dashboards</p>
            <button onClick={() => navigate('editor')}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors">
              ✏️ Editor
            </button>
            <button onClick={() => navigate('journalist')}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors">
              📝 Journalist
            </button>
          </div>
        </nav>

        <div className="p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex items-center gap-2 px-2 mb-3">
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
            <div className="text-xs font-semibold truncate text-white/80">{user.name}</div>
          </div>
          <button onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-900/20 transition-colors">
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="px-6 py-4 sticky top-0 z-10 flex items-center justify-between"
          style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}>
          <h1 className="font-display font-bold text-xl" style={{ color: 'var(--fg)' }}>
            {NAV_ITEMS.find(n => n.section === section)?.label}
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-nsg" style={{ color: 'var(--fg-muted)' }}>
              {new Date().toLocaleString('en-RW', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        <div className="p-6">
          {/* OVERVIEW */}
          {section === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <StatCard label="Total Users"     value={adminStats.totalUsers.value}     growth={adminStats.totalUsers.growth}     icon="👥" />
                <StatCard label="Active Users"    value={adminStats.activeUsers.value}    growth={adminStats.activeUsers.growth}    icon="✅" />
                <StatCard label="Journalists"     value={adminStats.journalists.value}    growth={adminStats.journalists.growth}    icon="✏️" />
                <StatCard label="Articles"        value={adminStats.totalArticles.value}  growth={adminStats.totalArticles.growth}  icon="📄" />
                <StatCard label="Comments"        value={adminStats.totalComments.value}  growth={adminStats.totalComments.growth}  icon="💬" />
                <StatCard label="Revenue (RWF M)" value={`${adminStats.monthlyRevenue.value / 1000}M`} growth={adminStats.monthlyRevenue.growth} icon="💰" sub="This month" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Weekly views chart */}
                <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-bold" style={{ color: 'var(--fg)' }}>Weekly Traffic</h3>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">+12.4%</span>
                  </div>
                  <div className="flex items-end gap-2 h-40">
                    {weeklyViews.map(d => (
                      <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                        <div className="text-xs font-mono-nsg mb-1" style={{ color: 'var(--fg-muted)' }}>{d.views}K</div>
                        <div className="w-full rounded-t-md bg-navy hover:bg-nsg-red transition-colors cursor-pointer"
                          style={{ height: `${(d.views / maxViews) * 80}%`, minHeight: '8px' }} />
                        <span className="text-xs font-mono-nsg" style={{ color: 'var(--fg-muted)' }}>{d.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category breakdown */}
                <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <h3 className="font-display font-bold mb-4" style={{ color: 'var(--fg)' }}>Traffic by Category</h3>
                  <div className="space-y-3">
                    {categoryBreakdown.map(cat => (
                      <div key={cat.category}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span style={{ color: 'var(--fg)' }}>{cat.category}</span>
                          <span className="font-bold font-mono-nsg" style={{ color: 'var(--fg)' }}>{cat.pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full" style={{ background: 'var(--bg)' }}>
                          <div className="h-full rounded-full transition-all" style={{ width: `${cat.pct}%`, background: cat.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent users */}
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
                <div className="px-5 py-4 flex items-center justify-between" style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border-color)' }}>
                  <h3 className="font-display font-bold" style={{ color: 'var(--fg)' }}>Recent Registrations</h3>
                  <button onClick={() => setSection('users')} className="text-sm text-nsg-red font-semibold hover:underline">View all →</button>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      {['User', 'Role', 'Joined', 'Status'].map(h => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.slice(0, 5).map(u => (
                      <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors" style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td className="px-5 py-3">
                          <div className="font-medium" style={{ color: 'var(--fg)' }}>{u.name}</div>
                          <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>{u.email}</div>
                        </td>
                        <td className="px-5 py-3 capitalize text-xs font-semibold" style={{ color: 'var(--fg-muted)' }}>{u.role}</td>
                        <td className="px-5 py-3 text-xs font-mono-nsg" style={{ color: 'var(--fg-muted)' }}>{u.joinedAt}</td>
                        <td className="px-5 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded font-semibold ${u.status === 'active' ? 'badge-published' : 'badge-rejected'}`}>
                            {u.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* USERS */}
          {section === 'users' && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex gap-2">
                  {['All', 'Admin', 'Editor', 'Journalist', 'Reader'].map(role => (
                    <button key={role}
                      className="px-3 py-1.5 rounded-full text-sm font-medium border hover:border-nsg-red hover:text-nsg-red transition-colors"
                      style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}>
                      {role}
                    </button>
                  ))}
                </div>
                <button className="px-4 py-2 bg-nsg-red text-white text-sm font-bold rounded-xl hover:bg-nsg-red-dark transition-colors">
                  + Add User
                </button>
              </div>
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
                <table className="w-full text-sm">
                  <thead style={{ background: 'var(--bg)' }}>
                    <tr>
                      {['User', 'Role', 'Joined', 'Status', 'Actions'].map(h => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors" style={{ borderTop: '1px solid var(--border-color)' }}>
                        <td className="px-5 py-3">
                          <div className="font-medium" style={{ color: 'var(--fg)' }}>{u.name}</div>
                          <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>{u.email}</div>
                        </td>
                        <td className="px-5 py-3 capitalize text-xs font-semibold" style={{ color: 'var(--fg-muted)' }}>{u.role}</td>
                        <td className="px-5 py-3 text-xs font-mono-nsg" style={{ color: 'var(--fg-muted)' }}>{u.joinedAt}</td>
                        <td className="px-5 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded font-semibold ${u.status === 'active' ? 'badge-published' : 'badge-rejected'}`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex gap-2">
                            <button className="text-xs px-2 py-1 rounded border hover:border-nsg-red hover:text-nsg-red transition-colors"
                              style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}>Edit</button>
                            <button
                              onClick={() => setUsers(prev => prev.map(p => p.id === u.id ? { ...p, status: p.status === 'active' ? 'suspended' : 'active' } : p))}
                              className={`text-xs px-2 py-1 rounded transition-colors ${u.status === 'active' ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20' : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'}`}>
                              {u.status === 'active' ? 'Suspend' : 'Restore'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CONTENT */}
          {section === 'content' && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Articles', value: '12,840', icon: '📄', action: 'Manage' },
                { label: 'Total Categories', value: '12', icon: '🏷️', action: 'Manage' },
                { label: 'Total Tags', value: '487', icon: '🔖', action: 'Manage' },
                { label: 'Media Files', value: '38.4K', icon: '🖼️', action: 'Manage' },
                { label: 'Total Comments', value: '184,200', icon: '💬', action: 'Moderate' },
                { label: 'Flagged Comments', value: '42', icon: '⚠️', action: 'Review' },
                { label: 'Reported Articles', value: '7', icon: '🚨', action: 'Review' },
                { label: 'Breaking News', value: '3 active', icon: '🔴', action: 'Manage' },
              ].map(item => (
                <div key={item.label} className="stat-card cursor-pointer hover:border-nsg-red transition-colors" style={{ border: '1px solid var(--border-color)' }}>
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-display font-bold text-xl mb-0.5" style={{ color: 'var(--fg)' }}>{item.value}</div>
                  <div className="text-xs mb-3" style={{ color: 'var(--fg-muted)' }}>{item.label}</div>
                  <button className="text-xs font-semibold text-nsg-red hover:underline">{item.action} →</button>
                </div>
              ))}
            </div>
          )}

          {/* ANALYTICS */}
          {section === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Monthly Views', value: '1.28M', growth: 12.4, icon: '👁️' },
                  { label: 'Unique Visitors', value: '347K', growth: 8.7, icon: '🧑' },
                  { label: 'Newsletter Subscribers', value: '18.2K', growth: 14.2, icon: '📧' },
                  { label: 'Monthly Revenue', value: '$48.7K', growth: 9.1, icon: '💰' },
                ].map(s => (
                  <StatCard key={s.label} label={s.label} value={s.value} growth={s.growth} icon={s.icon} />
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <h3 className="font-display font-bold mb-4" style={{ color: 'var(--fg)' }}>Traffic by Category</h3>
                  <div className="space-y-3">
                    {categoryBreakdown.map(cat => (
                      <div key={cat.category} className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ background: cat.color }} />
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span style={{ color: 'var(--fg)' }}>{cat.category}</span>
                            <span className="font-bold" style={{ color: 'var(--fg)' }}>{cat.pct}%</span>
                          </div>
                          <div className="h-2 rounded-full" style={{ background: 'var(--bg)' }}>
                            <div className="h-full rounded-full" style={{ width: `${cat.pct}%`, background: cat.color }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <h3 className="font-display font-bold mb-4" style={{ color: 'var(--fg)' }}>Weekly Traffic</h3>
                  <div className="flex items-end gap-2 h-32">
                    {weeklyViews.map(d => (
                      <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full rounded-t-md bg-nsg-red/70 hover:bg-nsg-red transition-colors"
                          style={{ height: `${(d.views / maxViews) * 100}%`, minHeight: '4px' }} />
                        <span className="text-xs font-mono-nsg" style={{ color: 'var(--fg-muted)' }}>{d.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {section === 'settings' && (
            <div className="max-w-xl space-y-5">
              {[
                { section: 'Site Information', fields: ['Site Name', 'Tagline', 'Contact Email', 'Support Email'] },
                { section: 'Content Settings', fields: ['Articles per page', 'Comments enabled', 'Moderation required'] },
                { section: 'Notification Settings', fields: ['Breaking news alerts', 'Newsletter frequency'] },
              ].map(group => (
                <div key={group.section} className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <h3 className="font-display font-bold mb-4" style={{ color: 'var(--fg)' }}>{group.section}</h3>
                  <div className="space-y-3">
                    {group.fields.map(field => (
                      <div key={field}>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--fg-muted)' }}>{field}</label>
                        <input
                          defaultValue={field === 'Site Name' ? 'NSG News' : field === 'Tagline' ? 'Rwanda\'s Premier Digital Newsroom' : ''}
                          className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:border-nsg-red"
                          style={{ background: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--fg)' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button className="w-full py-3 bg-nsg-red hover:bg-nsg-red-dark text-white font-bold rounded-xl transition-colors">
                Save Settings
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
