import { useState } from 'react';
import { useApp } from '../App';
import { categories } from '../data/mockData';
import nsgLogo from '../imports/NSG_news.png';

const NAV_LINKS = [
  { label: 'Home', page: 'home' },
  { label: 'Breaking', page: 'category', params: { slug: 'breaking' } },
  { label: 'Live', page: 'live' },
  { label: 'Videos', page: 'videos' },
  { label: 'Pricing', page: 'pricing' },
];

export default function Header() {
  const { navigate, darkMode, toggleDarkMode, user, setShowAuthModal, setAuthModalTab, setShowSearchModal, logout, page } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  function goTo(p: string, params?: Record<string, string>) {
    navigate(p, params);
    setMenuOpen(false);
    setCatOpen(false);
  }

  function openLogin() { setAuthModalTab('login'); setShowAuthModal(true); }
  function openRegister() { setAuthModalTab('register'); setShowAuthModal(true); }

  const dashLinks = user
    ? user.role === 'journalist' ? [{ label: 'Journalist Dashboard', page: 'journalist' }]
    : user.role === 'editor'     ? [{ label: 'Editor Dashboard',     page: 'editor'     }]
    : user.role === 'admin'      ? [
        { label: 'Admin Dashboard',      page: 'admin'      },
        { label: 'Editor Dashboard',     page: 'editor'     },
        { label: 'Journalist Dashboard', page: 'journalist' },
      ]
    : []
    : [];

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div style={{ background: 'var(--nav-bg)' }} className="text-white text-xs px-4 py-1.5 flex items-center justify-between">
        <span className="font-mono-nsg opacity-70">
          {new Date().toLocaleDateString('en-RW', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
        <div className="flex items-center gap-3 opacity-70">
          <span>Rwanda</span>
          <span>·</span>
          <span>Africa</span>
          <span>·</span>
          <span>World</span>
        </div>
      </div>

      {/* Main nav */}
      <nav style={{ background: 'var(--nav-bg)' }} className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => goTo('home')} className="flex items-center gap-2 shrink-0">
            <img src={nsgLogo} alt="NSG News" className="h-10 w-10 object-contain" />
            <div className="text-left hidden sm:block">
              <div className="font-display text-white font-bold text-lg leading-none">NSG News</div>
              <div className="text-xs text-white/50 font-mono-nsg tracking-widest">AFRICA · WORLD</div>
            </div>
          </button>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(l => (
              <button
                key={l.page + (l.params?.slug || '')}
                onClick={() => goTo(l.page, l.params)}
                className={`px-3 py-2 text-sm font-semibold rounded transition-colors ${
                  page === l.page ? 'text-white bg-white/10' : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                {l.label}
              </button>
            ))}

            {/* Categories dropdown */}
            <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
              <button className="px-3 py-2 text-sm font-semibold text-white/75 hover:text-white hover:bg-white/10 rounded flex items-center gap-1 transition-colors">
                Categories
                <svg className={`w-3.5 h-3.5 transition-transform ${catOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {catOpen && (
                <div className="absolute top-full left-0 w-64 rounded-xl shadow-2xl overflow-hidden z-50 mt-1"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <div className="p-2 grid grid-cols-2 gap-1">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => goTo('category', { slug: cat.slug })}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-white/10 text-left transition-colors w-full"
                        style={{ color: 'var(--fg)' }}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-2 text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Dark mode */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* User */}
            {user ? (
              <div className="relative" onMouseEnter={() => setUserOpen(true)} onMouseLeave={() => setUserOpen(false)}>
                <button className="flex items-center gap-2 rounded-full p-0.5 border-2 border-white/30 hover:border-white/70 transition-colors">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                </button>
                {userOpen && (
                  <div className="absolute top-full right-0 w-52 rounded-xl shadow-2xl overflow-hidden z-50 mt-1"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                    <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                      <div className="font-semibold text-sm" style={{ color: 'var(--fg)' }}>{user.name}</div>
                      <div className="text-xs capitalize mt-0.5" style={{ color: 'var(--fg-muted)' }}>{user.role}</div>
                    </div>
                    <div className="p-1">
                      <button onClick={() => { goTo('profile'); setUserOpen(false); }}
                        className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors" style={{ color: 'var(--fg)' }}>
                        My Profile
                      </button>
                      {dashLinks.map(dl => (
                        <button key={dl.page} onClick={() => { goTo(dl.page); setUserOpen(false); }}
                          className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors" style={{ color: 'var(--fg)' }}>
                          {dl.label}
                        </button>
                      ))}
                      <button onClick={logout}
                        className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-colors">
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button onClick={openLogin}
                  className="px-3 py-1.5 text-sm font-semibold text-white/80 hover:text-white transition-colors">
                  Log in
                </button>
                <button onClick={openRegister}
                  className="px-3 py-1.5 text-sm font-bold bg-nsg-red hover:bg-nsg-red-dark text-white rounded-lg transition-colors">
                  Sign up
                </button>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(m => !m)}
              className="lg:hidden p-2 text-white/75 hover:text-white hover:bg-white/10 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-white/10 px-4 py-3 space-y-1" style={{ background: 'var(--nav-bg)' }}>
            {NAV_LINKS.map(l => (
              <button key={l.page} onClick={() => goTo(l.page, l.params)}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                {l.label}
              </button>
            ))}
            <div className="border-t border-white/10 pt-2 mt-2">
              <div className="text-xs uppercase tracking-wider text-white/40 px-3 mb-1">Categories</div>
              <div className="grid grid-cols-2 gap-1">
                {categories.slice(0, 8).map(cat => (
                  <button key={cat.id} onClick={() => goTo('category', { slug: cat.slug })}
                    className="text-left px-3 py-1.5 text-sm text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>
            {!user && (
              <div className="flex gap-2 pt-2">
                <button onClick={openLogin} className="flex-1 py-2 text-sm font-semibold text-white border border-white/30 rounded-lg hover:border-white/60 transition-colors">
                  Log in
                </button>
                <button onClick={openRegister} className="flex-1 py-2 text-sm font-bold bg-nsg-red text-white rounded-lg hover:bg-nsg-red-dark transition-colors">
                  Sign up
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
