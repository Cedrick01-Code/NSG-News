import { useState, useEffect } from 'react';
import { useApp } from '../App';
import { articles, mockComments, type Comment } from '../data/mockData';
import { CompactCard } from '../components/ArticleCard';

function ShareButton({ icon, label, onClick }: { icon: string; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border hover:border-nsg-red hover:text-nsg-red transition-colors"
      style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}
    >
      <span>{icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function CommentItem({ comment }: { comment: Comment }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);

  return (
    <div className="flex gap-3 py-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
      <img src={comment.user.avatar} alt={comment.user.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm" style={{ color: 'var(--fg)' }}>{comment.user.name}</span>
          <span className="text-xs" style={{ color: 'var(--fg-muted)' }}>{comment.timestamp}</span>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--fg)' }}>{comment.content}</p>
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={() => { setLiked(l => !l); setLikes(n => liked ? n - 1 : n + 1); }}
            className={`flex items-center gap-1 text-xs transition-colors ${liked ? 'text-nsg-red' : ''}`}
            style={{ color: liked ? undefined : 'var(--fg-muted)' }}
          >
            {liked ? '❤️' : '🤍'} {likes}
          </button>
          <button className="text-xs hover:text-nsg-red transition-colors" style={{ color: 'var(--fg-muted)' }}>Reply</button>
          <button className="text-xs hover:text-nsg-red transition-colors" style={{ color: 'var(--fg-muted)' }}>Report</button>
        </div>
        {comment.replies?.map(r => (
          <div key={r.id} className="flex gap-3 mt-3 pl-4 border-l-2" style={{ borderColor: 'var(--border-color)' }}>
            <img src={r.user.avatar} alt={r.user.name} className="w-7 h-7 rounded-full object-cover shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-semibold text-sm" style={{ color: 'var(--fg)' }}>{r.user.name}</span>
                <span className="text-xs" style={{ color: 'var(--fg-muted)' }}>{r.timestamp}</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--fg)' }}>{r.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AISummaryPanel({ article }: { article: typeof articles[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border mb-6" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-card2)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">✨</span>
          <span className="font-semibold text-sm" style={{ color: 'var(--fg)' }}>AI Summary</span>
          <span className="text-xs px-1.5 py-0.5 rounded text-nsg-red bg-nsg-red/10 font-semibold">Beta</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
          style={{ color: 'var(--fg-muted)' }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4">
          <div className="text-xs mb-3 p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400">
            AI-generated summary. May not reflect full nuance — read the full article for complete accuracy.
          </div>
          <ul className="space-y-2">
            {[
              `${article.author.name} reports on ${article.title.split(' ').slice(0, 5).join(' ')}...`,
              `The story involves ${article.tags.slice(0, 2).join(' and ')} in ${article.category}.`,
              `Key stakeholders include ${article.author.name} and relevant parties in ${article.location || article.category}.`,
              `The estimated impact affects ${article.category} news coverage significantly.`,
              `This article has been read ${(article.views / 1000).toFixed(1)}K times and shared ${(article.shares / 1000).toFixed(1)}K times.`,
            ].map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--fg)' }}>
                <span className="text-nsg-red font-bold shrink-0 mt-0.5">{i + 1}.</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function ArticlePage({ slug }: { slug: string }) {
  const { navigate, toggleBookmark, isBookmarked, user, setShowAuthModal } = useApp();
  const article = articles.find(a => a.slug === slug) || articles[0];
  const related = articles.filter(a => a.id !== article.id && a.category === article.category).slice(0, 4);
  const comments = mockComments.filter(c => c.articleId === article.id);

  const [commentText, setCommentText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const bookmarked = isBookmarked(article.id);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  function submitComment() {
    if (!user) { setShowAuthModal(true); return; }
    if (!commentText.trim()) return;
    setCommentText('');
    setSubmitted(true);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--fg-muted)' }}>
        <button onClick={() => navigate('home')} className="hover:text-nsg-red transition-colors">Home</button>
        <span>›</span>
        <button onClick={() => navigate('category', { slug: article.category.toLowerCase() })} className="hover:text-nsg-red transition-colors">{article.category}</button>
        <span>›</span>
        <span className="truncate max-w-xs" style={{ color: 'var(--fg)' }}>{article.title.slice(0, 40)}...</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Article body */}
        <div className="lg:col-span-2">
          {/* Tags + status badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-bold text-nsg-red bg-nsg-red/10 px-2 py-0.5 rounded uppercase tracking-wider">{article.category}</span>
            {article.isBreaking && (
              <span className="text-xs font-bold text-white bg-nsg-red px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                <span className="live-dot w-1.5 h-1.5 rounded-full bg-white inline-block" />Breaking
              </span>
            )}
            {article.isFactChecked && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded uppercase tracking-wider">✓ Fact Checked</span>
            )}
            {article.isPremium && (
              <span className="text-xs font-bold text-amber-700 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded uppercase tracking-wider">★ Premium</span>
            )}
          </div>

          {/* Headline */}
          <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-4" style={{ color: 'var(--fg)' }}>
            {article.title}
          </h1>
          <p className="text-lg mb-5 leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{article.subtitle}</p>

          {/* Author + meta */}
          <div className="flex items-center justify-between py-4 mb-5" style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
            <div className="flex items-center gap-3">
              <img src={article.author.avatar} alt={article.author.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-sm flex items-center gap-1.5" style={{ color: 'var(--fg)' }}>
                  {article.author.name}
                  {article.author.verified && <span className="text-nsg-red text-xs">✓</span>}
                </div>
                <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                  Published {new Date(article.publishedAt).toLocaleDateString('en-RW', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--fg-muted)' }}>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {article.readTime} min read
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {(article.views / 1000).toFixed(1)}K views
              </span>
            </div>
          </div>

          {/* Reading tools */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ShareButton icon="🔗" label="Copy link" onClick={() => navigator.clipboard?.writeText(window.location.href)} />
              <ShareButton icon="🐦" label="Share" />
              <ShareButton icon="📘" label="Facebook" />
              <ShareButton icon="💼" label="LinkedIn" />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFontSize(s => Math.max(14, s - 2))}
                className="px-2 py-1 text-sm rounded border hover:border-nsg-red transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}
              >A−</button>
              <button
                onClick={() => setFontSize(s => Math.min(24, s + 2))}
                className="px-2 py-1 text-sm rounded border hover:border-nsg-red transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}
              >A+</button>
              <button
                onClick={() => toggleBookmark(article.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors flex items-center gap-1.5 ${bookmarked ? 'bg-nsg-red border-nsg-red text-white' : 'hover:border-nsg-red hover:text-nsg-red'}`}
                style={bookmarked ? {} : { borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}
              >
                <svg className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                {bookmarked ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>

          {/* Featured image */}
          <div className="rounded-xl overflow-hidden mb-6">
            <img
              src={article.image}
              alt={article.title}
              className="w-full object-cover"
              style={{ maxHeight: '480px' }}
            />
            <p className="text-xs mt-2 text-center" style={{ color: 'var(--fg-muted)' }}>
              Photo: Unsplash · NSG News
            </p>
          </div>

          {/* AI Summary */}
          <AISummaryPanel article={article} />

          {/* Article body */}
          <div
            className="article-body"
            style={{ fontSize: `${fontSize}px`, color: 'var(--fg)' }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6" style={{ borderTop: '1px solid var(--border-color)' }}>
            {article.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full text-sm border hover:border-nsg-red hover:text-nsg-red cursor-pointer transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}>
                #{tag}
              </span>
            ))}
          </div>

          {/* Author box */}
          <div className="rounded-2xl p-5 mt-8 flex items-start gap-4" style={{ background: 'var(--bg-card2)', border: '1px solid var(--border-color)' }}>
            <img src={article.author.avatar} alt={article.author.name} className="w-14 h-14 rounded-full object-cover" />
            <div>
              <div className="font-display font-bold text-lg mb-0.5" style={{ color: 'var(--fg)' }}>
                {article.author.name}
                {article.author.verified && <span className="text-nsg-red ml-1.5 text-sm">✓ Verified</span>}
              </div>
<div className="text-xs mb-2 font-mono-nsg" style={{ color: 'var(--fg-muted)' }}>
                 {article.author.articles} articles
               </div>
              <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>{article.author.bio}</p>
            </div>
          </div>

          {/* Comments */}
          <div className="mt-10">
            <h3 className="font-display text-xl font-bold mb-5" style={{ color: 'var(--fg)' }}>
              Comments ({article.comments})
            </h3>

            {/* New comment */}
            <div className="mb-6">
              <textarea
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder={user ? 'Share your thoughts...' : 'Sign in to join the conversation'}
                disabled={!user}
                rows={3}
                className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-nsg-red resize-none"
                style={{ background: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--fg)' }}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={submitComment}
                  className="px-5 py-2 bg-nsg-red hover:bg-nsg-red-dark text-white text-sm font-bold rounded-xl transition-colors"
                >
                  {user ? 'Post Comment' : 'Sign in to Comment'}
                </button>
              </div>
              {submitted && (
                <div className="text-sm text-emerald-600 mt-2">✓ Comment submitted for moderation.</div>
              )}
            </div>

            {/* Comment list */}
            <div>
              {comments.map(c => <CommentItem key={c.id} comment={c} />)}
              {comments.length === 0 && (
                <div className="text-center py-8 text-sm" style={{ color: 'var(--fg-muted)' }}>
                  Be the first to comment on this article.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Related articles */}
          <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <h3 className="font-display font-bold text-base mb-4" style={{ color: 'var(--fg)' }}>Related Stories</h3>
            <div className="space-y-1">
              {related.map(a => <CompactCard key={a.id} article={a} />)}
            </div>
          </div>

          {/* Stats card */}
          <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--fg-muted)' }}>Article Stats</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Views', value: `${(article.views / 1000).toFixed(1)}K` },
                { label: 'Shares', value: `${(article.shares / 1000).toFixed(1)}K` },
                { label: 'Comments', value: article.comments.toLocaleString() },
                { label: 'Read time', value: `${article.readTime} min` },
              ].map(stat => (
                <div key={stat.label} className="text-center p-3 rounded-xl" style={{ background: 'var(--bg)' }}>
                  <div className="font-display font-bold text-xl text-nsg-red">{stat.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--fg-muted)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>


        </aside>
      </div>
    </div>
  );
}
