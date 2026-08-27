import { useState } from 'react';
import { useApp } from '../App';
import nsgLogo from '../imports/NSG_news.png';

export default function AuthModal() {
  const { setShowAuthModal, authModalTab, setAuthModalTab, login, register } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isLogin = authModalTab === 'login';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    if (isLogin) {
      const ok = login(email, password);
      if (!ok) setError('Invalid email or password. Use demo accounts below.');
    } else {
      if (!name.trim()) { setError('Please enter your full name.'); setLoading(false); return; }
      register(name, email, password);
    }
    setLoading(false);
  }

  const demoAccounts = [
    { label: 'Reader',     email: 'reader@nsgnews.rw' },
    { label: 'Journalist', email: 'journalist@nsgnews.rw' },
    { label: 'Editor',     email: 'editor@nsgnews.rw' },
    { label: 'Admin',      email: 'admin@nsgnews.rw' },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden" style={{ background: 'var(--bg-card)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <div className="flex items-center gap-3">
            <img src={nsgLogo} alt="NSG News" className="h-8 w-8 object-contain" />
            <span className="font-display font-bold text-lg" style={{ color: 'var(--fg)' }}>
              {isLogin ? 'Sign in to NSG News' : 'Create your account'}
            </span>
          </div>
          <button
            onClick={() => setShowAuthModal(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            style={{ color: 'var(--fg-muted)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex rounded-xl p-1 mb-6" style={{ background: 'var(--bg)' }}>
            {(['login', 'register'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => { setAuthModalTab(tab); setError(''); }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                  authModalTab === tab
                    ? 'bg-white dark:bg-navy text-navy dark:text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-white/70'
                }`}
              >
                {tab === 'login' ? 'Log in' : 'Register'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--fg)' }}>Full Name</label>
                <input
                  type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Your full name" required={!isLogin}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:border-nsg-red"
                  style={{ background: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--fg)' }}
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--fg)' }}>Email Address</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" required
                className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:border-nsg-red"
                style={{ background: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--fg)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--fg)' }}>Password</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder={isLogin ? 'Your password' : 'Choose a password'} required
                className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:border-nsg-red"
                style={{ background: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--fg)' }}
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">{error}</div>
            )}

            <button
              type="submit" disabled={loading}
              className="w-full py-3 bg-nsg-red hover:bg-nsg-red-dark text-white font-bold rounded-xl transition-colors disabled:opacity-60"
            >
              {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {isLogin && (
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--fg-muted)' }}>
                Demo accounts (password: password)
              </p>
              <div className="grid grid-cols-2 gap-2">
                {demoAccounts.map(d => (
                  <button
                    key={d.email}
                    onClick={() => { setEmail(d.email); setPassword('password'); }}
                    className="text-left px-3 py-2 rounded-lg text-xs border transition-colors hover:border-nsg-red hover:text-nsg-red"
                    style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}
                  >
                    <div className="font-semibold" style={{ color: 'var(--fg)' }}>{d.label}</div>
                    <div className="truncate">{d.email}</div>
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
