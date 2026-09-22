import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import SearchModal from './components/SearchModal';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import JournalistDashboard from './pages/JournalistDashboard';
import EditorDashboard from './pages/EditorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProfilePage from './pages/ProfilePage';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'reader' | 'journalist' | 'editor' | 'admin';
  avatar: string;
}

export interface AppContextType {
  page: string;
  pageParams: Record<string, string>;
  navigate: (page: string, params?: Record<string, string>) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (v: boolean) => void;
  authModalTab: 'login' | 'register';
  setAuthModalTab: (v: 'login' | 'register') => void;
  showSearchModal: boolean;
  setShowSearchModal: (v: boolean) => void;
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);
export const useApp = () => useContext(AppContext);

// ─── Demo accounts ────────────────────────────────────────────────────────────

const DEMO_USERS: Record<string, User> = {
  'reader@nsgnews.rw': {
    id: 'u1', name: 'Alice Ingabire', email: 'reader@nsgnews.rw', role: 'reader',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&auto=format',
  },
  'journalist@nsgnews.rw': {
    id: 'u2', name: 'Jean-Pierre Hakizimana', email: 'journalist@nsgnews.rw', role: 'journalist',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&auto=format',
  },
  'editor@nsgnews.rw': {
    id: 'u3', name: 'Emmanuel Uwimana', email: 'editor@nsgnews.rw', role: 'editor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format',
  },
  'admin@nsgnews.rw': {
    id: 'u4', name: 'NSG Administrator', email: 'admin@nsgnews.rw', role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format',
  },
};

// ─── Provider ────────────────────────────────────────────────────────────────

function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState('home');
  const [pageParams, setPageParams] = useState<Record<string, string>>({});

  const [darkMode, setDarkMode] = useState(() => {
    try { return localStorage.getItem('nsg-dark') === 'true'; } catch { return false; }
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const s = localStorage.getItem('nsg-user');
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  });

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const s = localStorage.getItem('nsg-bookmarks');
      return s ? JSON.parse(s) : [];
    } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem('nsg-dark', String(darkMode)); } catch {}
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    try {
      if (user) localStorage.setItem('nsg-user', JSON.stringify(user));
      else localStorage.removeItem('nsg-user');
    } catch {}
  }, [user]);

  useEffect(() => {
    try { localStorage.setItem('nsg-bookmarks', JSON.stringify(bookmarks)); } catch {}
  }, [bookmarks]);

  const navigate = useCallback((newPage: string, params: Record<string, string> = {}) => {
    setPage(newPage);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleDarkMode = () => setDarkMode(d => !d);

  const login = (email: string, password: string): boolean => {
    const u = DEMO_USERS[email.toLowerCase().trim()];
    if (u && password === 'password') {
      setUser(u);
      setShowAuthModal(false);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, _pw: string) => {
    setUser({
      id: `u-${Date.now()}`, name, email, role: 'reader',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop&auto=format',
    });
    setShowAuthModal(false);
  };

  const logout = () => { setUser(null); navigate('home'); };

  const toggleBookmark = (id: string) =>
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);

  const isBookmarked = (id: string) => bookmarks.includes(id);

  return (
    <AppContext.Provider value={{
      page, pageParams, navigate,
      darkMode, toggleDarkMode,
      user, login, register, logout,
      showAuthModal, setShowAuthModal,
      authModalTab, setAuthModalTab,
      showSearchModal, setShowSearchModal,
      bookmarks, toggleBookmark, isBookmarked,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// ─── Router ──────────────────────────────────────────────────────────────────

function Router() {
  const { page, pageParams } = useApp();

  const isDash = ['journalist', 'editor', 'admin'].includes(page);

  const renderPage = () => {
switch (page) {
       case 'article':    return <ArticlePage   slug={pageParams.slug || ''} />;
       case 'category':   return <CategoryPage  slug={pageParams.slug || 'rwanda'} />;
       case 'search':     return <SearchPage    query={pageParams.q || ''} />;
       case 'journalist': return <JournalistDashboard />;
       case 'editor':     return <EditorDashboard />;
       case 'admin':      return <AdminDashboard />;
       case 'profile':    return <ProfilePage />;
       default:           return <HomePage />;
     }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      {!isDash && <Header />}
      <main className="flex-1">
        {renderPage()}
      </main>
      {!isDash && <Footer />}
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <AppProvider>
      <Router />
      <AuthModalWrapper />
      <SearchModalWrapper />
    </AppProvider>
  );
}

function AuthModalWrapper() {
  const { showAuthModal } = useApp();
  return showAuthModal ? <AuthModal /> : null;
}

function SearchModalWrapper() {
  const { showSearchModal } = useApp();
  return showSearchModal ? <SearchModal /> : null;
}
