import { useState } from 'react';
import { useApp } from '../App';
import { articles, categories } from '../data/mockData';
import BreakingNewsTicker from '../components/BreakingNewsTicker';
import { FeaturedCard, ArticleCard, CompactCard, HorizontalCard } from '../components/ArticleCard';

function SectionHeader({ title, badge, onMore, moreLabel = 'See all' }: {
   title: string; badge?: string; onMore?: () => void; moreLabel?: string;
}) {
   return (
     <div className="flex items-center justify-between mb-5">
       <div className="flex items-center gap-3">
         {badge && (
           <span className="text-xs font-bold text-nsg-red bg-nsg-red/10 px-2 py-0.5 rounded uppercase tracking-wider">{badge}</span>
         )}
         <h2 className="font-display text-xl font-bold" style={{ color: 'var(--fg)' }}>{title}</h2>
       </div>
       {onMore && (
         <button onClick={onMore} className="text-sm font-semibold text-nsg-red hover:underline">{moreLabel} →</button>
       ))}
     </div>
   );
}

function NewsletterStrip() {
   const [subscribed, setSubscribed] = useState(false);
   const [email, setEmail] = useState('');

   return (
     <div className="rounded-2xl p-6 my-10" style={{ background: 'var(--nav-bg)' }}>
       <div className="max-w-xl mx-auto text-center">
         <div className="text-xs font-bold uppercase tracking-widest text-nsg-red mb-2">Newsletter</div>
         <h3 className="font-display text-2xl font-bold text-white mb-2">Morning Briefing</h3>
         <p className="text-white/60 text-sm mb-5">
           Start your day with Rwanda&apos;s most important stories, delivered to your inbox by 7 AM.
         </p>
         {subscribed ? (
           <div className="text-emerald-400 font-semibold">✓ You&apos;re subscribed! Check your inbox.</div>
         ) : (
           <div className="flex gap-2 max-w-sm mx-auto">
             <input
               type="email" value={email} onChange={e => setEmail(e.target.value)}
               placeholder="Enter your email"
               className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-nsg-red"
             />
             <button
               onClick={() => { if (email) setSubscribed(true); }}
               className="px-5 py-2.5 bg-nsg-red hover:bg-nsg-red-dark text-white text-sm font-bold rounded-xl transition-colors whitespace-nowrap"
             >
               Subscribe
             </button>
           </div>
         )}
       </div>
     </div>
   );
}

const FEED_TABS = ['Top Stories', 'Latest', 'Trending', 'Rwanda', 'Africa'];

export default function HomePage() {
   const { navigate } = useApp();
   const [activeTab, setActiveTab] = useState('Top Stories');

   const featured = articles[0];
   const secondary = articles.slice(1, 3);
   const tertiary = articles.slice(3, 7);
   const rwandaArticles = articles.filter(a => a.category === 'Rwanda').slice(0, 4);
   const africaArticles = articles.filter(a => a.category === 'Africa').slice(0, 4);
   const techArticles = articles.filter(a => a.category === 'Technology').slice(0, 4);
   const sportsArticles = articles.filter(a => a.category === 'Sports').slice(0, 3);
   const trending = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);
   const mostRead = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

   const tabArticles = activeTab === 'Rwanda'    ? rwandaArticles
     : activeTab === 'Africa'    ? africaArticles
     : activeTab === 'Latest'    ? [...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 8)
     : activeTab === 'Trending'  ? trending.slice(0, 8)
     : articles.slice(0, 8);

   return (
     <div>
       <BreakingNewsTicker />

       <div className="max-w-7xl mx-auto px-4 py-6">
         {/* Feed tabs */}
         <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-6 hide-scrollbar">
           {FEED_TABS.map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                 activeTab === tab
                   ? 'bg-nsg-red text-white'
                   : 'hover:bg-gray-100 dark:hover:bg-white/10'
               }`}
               style={{ color: activeTab === tab ? 'white' : 'var(--fg-muted)' }}
             >
               {tab}
             </button>
           ))}
         </div>

         {activeTab === 'Top Stories' ? (
           <>
             {/* Hero grid */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
               <div className="lg:col-span-2">
                 <FeaturedCard article={featured} />
               </div>
               <div className="flex flex-col gap-4">
                 {secondary.map(a => <ArticleCard key={a.id} article={a} />)}
               </div>
             </div>

             {/* Categories strip */}
             <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8">
               {categories.map(cat => (
                 <button
                   key={cat.id}
                   onClick={() => navigate('category', { slug: cat.slug })}
                   className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border hover:border-nsg-red hover:text-nsg-red transition-colors shrink-0"
                   style={{ borderColor: 'var(--border-color)', color: 'var(--fg)' }}
                 >
                   <span>{cat.icon}</span>
                   <span>{cat.name}</span>
                 </button>
               ))}
             </div>

             {/* Main content + sidebar */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 space-y-10">
                 {/* Latest News */}
                 <section>
                   <SectionHeader title="Latest News" badge="New" onMore={() => setActiveTab('Latest')} />
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                     {tertiary.map(a => <ArticleCard key={a.id} article={a} />)}
                   </div>
                 </section>

                 {/* Rwanda section */}
                 <section>
                   <SectionHeader title="Rwanda" badge="🇷🇼" onMore={() => navigate('category', { slug: 'rwanda' })} />
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                     {rwandaArticles.map(a => <ArticleCard key={a.id} article={a} />)}
                   </div>
                 </section>

                 {/* Africa section */}
                 <section>
                   <SectionHeader title="Africa" badge="🌍" onMore={() => navigate('category', { slug: 'africa' })} />
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                     {africaArticles.map(a => <ArticleCard key={a.id} article={a} />)}
                   </div>
                 </section>

                 {/* Technology */}
                 <section>
                   <SectionHeader title="Technology" badge="🔧" onMore={() => navigate('category', { slug: 'technology' })} />
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                     {techArticles.map(a => <ArticleCard key={a.id} article={a} />)}
                   </div>
                 </section>

                 {/* Sports */}
                 <section>
                   <SectionHeader title="Sports" badge="🏀" onMore={() => navigate('category', { slug: 'sports' })} />
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     {sportsArticles.map(a => <ArticleCard key={a.id} article={a} />)}
                   </div>
                 </section>

                 <NewsletterStrip />
               </div>

               {/* Sidebar */}
               <aside className="space-y-8">
                 {/* Trending */}
                 <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                   <SectionHeader title="Trending Now" badge="🔥" />
                   <div>
                     {trending.map((a, i) => (
                       <HorizontalCard key={a.id} article={a} rank={i + 1} />
                     ))}
                   </div>
                 </div>

                 {/* Most read */}
                 <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                   <SectionHeader title="Most Read" />
                   <div>
                     {mostRead.map(a => <CompactCard key={a.id} article={a} />)}
                   </div>
                 </div>

                 {/* Editor picks */}
                 <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--navy)', border: '1px solid var(--border-color)' }}>
                   <div className="px-5 pt-5">
                     <div className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">Editor&apos;s Picks</div>
                     <h3 className="font-display text-lg font-bold text-white">Curated by our editors</h3>
                   </div>
                   <div className="p-4 space-y-1">
                     {articles.filter(a => a.isFactChecked).slice(0, 4).map(a => (
                       <CompactCard key={a.id} article={a} />
                     ))}
                   </div>
                 </div>
               </aside>
             </div>
           </>
         ) : (
           <div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
               {tabArticles.map(a => <ArticleCard key={a.id} article={a} />)}
             </div>
           </div>
         )}
       </div>
     </div>
   );
}