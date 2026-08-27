import { useApp } from '../App';
import type { Article } from '../data/mockData';

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-block text-xs font-bold uppercase tracking-wider text-nsg-red bg-nsg-red/10 px-2 py-0.5 rounded">
      {category}
    </span>
  );
}

function MetaLine({ article }: { article: Article }) {
  return (
    <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--fg-muted)' }}>
      <span>{article.author.name}</span>
      <span>·</span>
      <span>{new Date(article.publishedAt).toLocaleDateString('en-RW', { month: 'short', day: 'numeric' })}</span>
      <span>·</span>
      <span>{article.readTime} min read</span>
      {article.isFactChecked && (
        <>
          <span>·</span>
          <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Verified
          </span>
        </>
      )}
      {article.isPremium && (
        <>
          <span>·</span>
          <span className="text-amber-600 font-semibold">★ Premium</span>
        </>
      )}
    </div>
  );
}

// ─── Featured (hero, large) ───────────────────────────────────────────────────

export function FeaturedCard({ article }: { article: Article }) {
  const { navigate, toggleBookmark, isBookmarked } = useApp();
  const bookmarked = isBookmarked(article.id);

  return (
    <article
      className="article-card relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{ background: 'var(--bg-card)' }}
      onClick={() => navigate('article', { slug: article.slug })}
    >
      <div className="card-img-wrap aspect-[16/9] sm:aspect-[16/10]">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Badges */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <CategoryBadge category={article.category} />
        {article.isBreaking && (
          <span className="text-xs font-bold uppercase tracking-wider text-white bg-nsg-red px-2 py-0.5 rounded flex items-center gap-1">
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-white inline-block" />
            Breaking
          </span>
        )}
      </div>

      {/* Bookmark */}
      <button
        onClick={e => { e.stopPropagation(); toggleBookmark(article.id); }}
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
        aria-label="Bookmark"
      >
        <svg className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h2 className="font-display text-white text-xl sm:text-2xl font-bold leading-snug mb-2 group-hover:underline underline-offset-2">
          {article.title}
        </h2>
        <p className="text-white/75 text-sm line-clamp-2 mb-3 hidden sm:block">{article.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <img src={article.author.avatar} alt={article.author.name} className="w-5 h-5 rounded-full object-cover" />
            <span>{article.author.name}</span>
            <span>·</span>
            <span>{article.readTime} min read</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/50">
            <span>{(article.views / 1000).toFixed(1)}K views</span>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Standard card ────────────────────────────────────────────────────────────

export function ArticleCard({ article }: { article: Article }) {
  const { navigate, toggleBookmark, isBookmarked } = useApp();
  const bookmarked = isBookmarked(article.id);

  return (
    <article
      className="article-card rounded-xl overflow-hidden cursor-pointer group flex flex-col"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
      onClick={() => navigate('article', { slug: article.slug })}
    >
      <div className="card-img-wrap aspect-video overflow-hidden relative">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" loading="lazy" />
        <button
          onClick={e => { e.stopPropagation(); toggleBookmark(article.id); }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all"
        >
          <svg className="w-3.5 h-3.5" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
        {(article.isBreaking || article.isLive) && (
          <div className="absolute top-2 left-2">
            <span className="text-xs font-bold text-white bg-nsg-red px-2 py-0.5 rounded flex items-center gap-1">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-white inline-block" />
              {article.isLive ? 'Live' : 'Breaking'}
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <CategoryBadge category={article.category} />
        <h3 className="font-display text-base font-bold leading-snug mt-2 mb-2 group-hover:text-nsg-red transition-colors line-clamp-3" style={{ color: 'var(--fg)' }}>
          {article.title}
        </h3>
        <p className="text-sm line-clamp-2 flex-1 mb-3" style={{ color: 'var(--fg-muted)' }}>{article.excerpt}</p>
        <MetaLine article={article} />
      </div>
    </article>
  );
}

// ─── Compact / list item ──────────────────────────────────────────────────────

export function CompactCard({ article }: { article: Article }) {
  const { navigate } = useApp();

  return (
    <article
      className="article-card flex gap-3 cursor-pointer group py-3"
      style={{ borderBottom: '1px solid var(--border-color)' }}
      onClick={() => navigate('article', { slug: article.slug })}
    >
      <div className="card-img-wrap w-20 h-16 sm:w-24 sm:h-18 rounded-lg overflow-hidden shrink-0">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="flex-1 min-w-0">
        <CategoryBadge category={article.category} />
        <h4 className="font-display text-sm font-semibold leading-snug mt-1 line-clamp-2 group-hover:text-nsg-red transition-colors" style={{ color: 'var(--fg)' }}>
          {article.title}
        </h4>
        <div className="flex items-center gap-2 text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>
          <span>{new Date(article.publishedAt).toLocaleDateString('en-RW', { month: 'short', day: 'numeric' })}</span>
          <span>·</span>
          <span>{article.readTime} min</span>
        </div>
      </div>
    </article>
  );
}

// ─── Horizontal card ──────────────────────────────────────────────────────────

export function HorizontalCard({ article, rank }: { article: Article; rank?: number }) {
  const { navigate } = useApp();

  return (
    <article
      className="article-card flex gap-4 cursor-pointer group py-3"
      style={{ borderBottom: '1px solid var(--border-color)' }}
      onClick={() => navigate('article', { slug: article.slug })}
    >
      {rank && (
        <div className="text-3xl font-display font-bold shrink-0 w-8 text-center" style={{ color: 'var(--border-color)' }}>
          {rank}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <CategoryBadge category={article.category} />
        <h4 className="font-display text-sm sm:text-base font-bold leading-snug mt-1 line-clamp-2 group-hover:text-nsg-red transition-colors" style={{ color: 'var(--fg)' }}>
          {article.title}
        </h4>
        <div className="flex items-center gap-2 text-xs mt-1.5" style={{ color: 'var(--fg-muted)' }}>
          <span>{article.author.name}</span>
          <span>·</span>
          <span>{(article.views / 1000).toFixed(1)}K views</span>
        </div>
      </div>
      <div className="card-img-wrap w-16 h-14 rounded-lg overflow-hidden shrink-0">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" loading="lazy" />
      </div>
    </article>
  );
}

export default ArticleCard;
