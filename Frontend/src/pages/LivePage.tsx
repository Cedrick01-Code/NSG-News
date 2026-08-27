import { useState, useEffect } from 'react';
import { useApp } from '../App';
import { liveEvents, articles } from '../data/mockData';
import { CompactCard } from '../components/ArticleCard';

export default function LivePage() {
  const { navigate } = useApp();
  const [activeEventId, setActiveEventId] = useState(liveEvents[0]?.id);
  const [newUpdate, setNewUpdate] = useState('');
  const [commentText, setCommentText] = useState('');
  const [tick, setTick] = useState(0);

  const event = liveEvents.find(e => e.id === activeEventId) || liveEvents[0];

  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 30000);
    return () => clearInterval(t);
  }, []);

  const relatedArticles = articles.filter(a => a.category === event?.category).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-nsg-red text-white text-sm font-bold rounded-full uppercase tracking-wider">
          <span className="live-dot w-2 h-2 rounded-full bg-white inline-block" />
          Live Coverage
        </span>
        <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--fg)' }}>Live News</h1>
      </div>

      {/* Event tabs */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        {liveEvents.map(e => (
          <button
            key={e.id}
            onClick={() => setActiveEventId(e.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
              activeEventId === e.id ? 'border-nsg-red bg-nsg-red/5 text-nsg-red' : ''
            }`}
            style={activeEventId === e.id ? {} : { borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}
          >
            <span className={`badge-${e.status} text-xs px-1.5 py-0.5 rounded font-bold`}>
              {e.status.toUpperCase()}
            </span>
            <span className="max-w-xs truncate">{e.title}</span>
          </button>
        ))}
      </div>

      {event ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live feed */}
          <div className="lg:col-span-2">
            {/* Event hero */}
            <div className="rounded-2xl overflow-hidden mb-6 relative">
              <img src={event.imageUrl} alt={event.title} className="w-full h-48 sm:h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-3 mb-2">
                  {event.status === 'live' && (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-nsg-red text-white text-xs font-bold rounded-full">
                      <span className="live-dot w-1.5 h-1.5 rounded-full bg-white inline-block" />
                      LIVE
                    </span>
                  )}
                  {event.status === 'upcoming' && (
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">UPCOMING</span>
                  )}
                  {event.status === 'live' && (
                    <span className="text-white/70 text-sm font-mono-nsg">
                      {(event.viewers / 1000).toFixed(1)}K watching
                    </span>
                  )}
                </div>
                <h2 className="font-display text-white text-2xl font-bold">{event.title}</h2>
                <p className="text-white/70 text-sm mt-1">📍 {event.location}</p>
              </div>
            </div>

            <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{event.description}</p>

            {/* Updates timeline */}
            {event.updates.length > 0 ? (
              <div>
                <h3 className="font-display text-lg font-bold mb-4" style={{ color: 'var(--fg)' }}>Live Updates</h3>
                <div className="space-y-0">
                  {event.updates.map((update, idx) => (
                    <div key={update.id} className="flex gap-4">
                      {/* Timeline line */}
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full shrink-0 mt-1.5 ${
                          update.type === 'breaking' ? 'bg-nsg-red' :
                          update.type === 'alert'    ? 'bg-amber-500' : 'bg-navy'
                        }`} />
                        {idx < event.updates.length - 1 && (
                          <div className="w-0.5 flex-1 mt-1" style={{ background: 'var(--border-color)', minHeight: '2rem' }} />
                        )}
                      </div>

                      {/* Update content */}
                      <div className="pb-6 flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono-nsg text-sm font-bold text-nsg-red">{update.time}</span>
                          {update.type === 'breaking' && (
                            <span className="text-xs font-bold text-nsg-red bg-nsg-red/10 px-1.5 py-0.5 rounded">BREAKING</span>
                          )}
                          <span className="text-xs" style={{ color: 'var(--fg-muted)' }}>· {update.author}</span>
                        </div>
                        <p className={`text-sm leading-relaxed ${update.type === 'breaking' ? 'font-semibold' : ''}`}
                          style={{ color: 'var(--fg)' }}>
                          {update.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div className="text-4xl mb-3">🕐</div>
                <div className="font-display font-bold text-lg mb-1" style={{ color: 'var(--fg)' }}>Coverage starting soon</div>
                <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                  Live updates will appear here when coverage begins.
                </p>
              </div>
            )}

            {/* Live comment box */}
            {event.status === 'live' && (
              <div className="mt-8 rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h4 className="font-semibold mb-3" style={{ color: 'var(--fg)' }}>Join the conversation</h4>
                <div className="flex gap-3">
                  <input
                    type="text" value={commentText} onChange={e => setCommentText(e.target.value)}
                    placeholder="Comment on this live event..."
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:border-nsg-red"
                    style={{ background: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--fg)' }}
                  />
                  <button
                    onClick={() => setCommentText('')}
                    className="px-4 py-2.5 bg-nsg-red hover:bg-nsg-red-dark text-white text-sm font-bold rounded-xl transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Event info */}
            <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--fg-muted)' }}>Event Details</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--fg-muted)' }}>Status</span>
                  <span className={`badge-${event.status} px-2 py-0.5 rounded text-xs font-bold`}>{event.status.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--fg-muted)' }}>Location</span>
                  <span style={{ color: 'var(--fg)' }}>{event.location}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--fg-muted)' }}>Category</span>
                  <span style={{ color: 'var(--fg)' }}>{event.category}</span>
                </div>
                {event.status === 'live' && (
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--fg-muted)' }}>Watching</span>
                    <span className="text-nsg-red font-bold">{event.viewers.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Related articles */}
            <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <h4 className="font-display font-bold text-base mb-4" style={{ color: 'var(--fg)' }}>Related Stories</h4>
              <div className="space-y-1">
                {relatedArticles.map(a => <CompactCard key={a.id} article={a} />)}
              </div>
            </div>

            {/* Other live events */}
            <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <h4 className="font-display font-bold text-base mb-4" style={{ color: 'var(--fg)' }}>All Live Events</h4>
              <div className="space-y-3">
                {liveEvents.map(e => (
                  <button
                    key={e.id}
                    onClick={() => setActiveEventId(e.id)}
                    className={`w-full text-left p-3 rounded-xl transition-colors border ${
                      activeEventId === e.id ? 'border-nsg-red bg-nsg-red/5' : ''
                    }`}
                    style={activeEventId === e.id ? {} : { borderColor: 'var(--border-color)' }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`badge-${e.status} text-xs px-1.5 py-0.5 rounded font-bold`}>{e.status.toUpperCase()}</span>
                    </div>
                    <div className="text-sm font-semibold line-clamp-2" style={{ color: 'var(--fg)' }}>{e.title}</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>{e.location}</div>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📡</div>
          <h2 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--fg)' }}>No live events right now</h2>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>Check back soon for live coverage of breaking news and events.</p>
          <button onClick={() => navigate('home')} className="mt-5 px-5 py-2.5 bg-nsg-red text-white font-bold rounded-xl text-sm hover:bg-nsg-red-dark transition-colors">
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}
