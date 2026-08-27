import { useApp } from '../App';

const PLANS = [
  {
    name: 'Free',
    price: 0,
    currency: 'RWF',
    period: 'month',
    description: 'Standard access to NSG News coverage.',
    cta: 'Get Started Free',
    ctaAction: 'register' as const,
    highlight: false,
    features: [
      { text: 'Unlimited standard articles', included: true },
      { text: 'Breaking news access', included: true },
      { text: 'Comment on articles', included: true },
      { text: 'Save up to 10 articles', included: true },
      { text: 'Daily newsletter', included: true },
      { text: 'Premium investigations', included: false },
      { text: 'Ad-free reading', included: false },
      { text: 'Early access to reports', included: false },
      { text: 'Exclusive newsletters', included: false },
      { text: 'PDF downloads', included: false },
    ],
  },
  {
    name: 'Premium',
    price: 4990,
    currency: 'RWF',
    period: 'month',
    description: "Rwanda's most trusted journalism, without limits.",
    cta: 'Start Premium',
    ctaAction: 'register' as const,
    highlight: true,
    badge: 'Most Popular',
    features: [
      { text: 'Unlimited standard articles', included: true },
      { text: 'Breaking news access', included: true },
      { text: 'Comment on articles', included: true },
      { text: 'Unlimited saved articles', included: true },
      { text: 'All newsletters', included: true },
      { text: 'Premium investigations', included: true },
      { text: 'Ad-free reading', included: true },
      { text: 'Early access to reports', included: true },
      { text: 'Exclusive newsletters', included: true },
      { text: 'PDF downloads', included: true },
    ],
  },
  {
    name: 'Annual',
    price: 49900,
    currency: 'RWF',
    period: 'year',
    description: 'Premium access — save 17% with annual billing.',
    cta: 'Start Annual Plan',
    ctaAction: 'register' as const,
    highlight: false,
    badge: 'Best Value',
    features: [
      { text: 'Everything in Premium', included: true },
      { text: 'Save RWF 9,990 per year', included: true },
      { text: 'Priority customer support', included: true },
      { text: 'Early beta feature access', included: true },
      { text: 'Annual state of media report', included: true },
    ],
  },
];

const FAQ = [
  { q: 'Can I cancel my subscription anytime?', a: 'Yes. You can cancel your Premium or Annual subscription at any time from your account settings. You will retain access until the end of your billing period.' },
  { q: 'How is payment processed?', a: 'NSG News accepts mobile money (MTN Momo, Airtel Money), credit/debit cards, and bank transfers. All transactions are secured and encrypted.' },
  { q: 'Is there a student discount?', a: 'Yes. Students with a valid Rwandan or East African university email receive 50% off Premium. Contact support@nsgnews.rw to apply.' },
  { q: 'Do you offer institutional or group plans?', a: 'Yes. Organizations, schools, and corporate teams can access special pricing for multiple users. Contact our partnerships team.' },
];

export default function PricingPage() {
  const { setShowAuthModal, setAuthModalTab } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-xs font-bold uppercase tracking-widest text-nsg-red mb-3">NSG News Premium</div>
        <h1 className="font-display text-4xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
          Trusted journalism for Rwanda and Africa
        </h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--fg-muted)' }}>
          Support independent, fact-checked reporting — and unlock the full NSG News experience.
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {PLANS.map(plan => (
          <div
            key={plan.name}
            className={`rounded-2xl p-6 flex flex-col relative ${plan.highlight ? 'ring-2 ring-nsg-red shadow-xl' : ''}`}
            style={{ background: plan.highlight ? 'var(--nav-bg)' : 'var(--bg-card)', border: plan.highlight ? undefined : '1px solid var(--border-color)' }}
          >
            {plan.badge && (
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${plan.highlight ? 'bg-nsg-red text-white' : 'bg-amber-500 text-white'}`}>
                {plan.badge}
              </div>
            )}
            <div className="mb-5">
              <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${plan.highlight ? 'text-nsg-red-light' : 'text-nsg-red'}`}>{plan.name}</div>
              <div className="flex items-baseline gap-1">
                <span className={`font-display text-4xl font-bold ${plan.highlight ? 'text-white' : ''}`} style={{ color: plan.highlight ? undefined : 'var(--fg)' }}>
                  {plan.price === 0 ? 'Free' : plan.price.toLocaleString()}
                </span>
                {plan.price > 0 && (
                  <span className={`text-sm ${plan.highlight ? 'text-white/60' : ''}`} style={{ color: plan.highlight ? undefined : 'var(--fg-muted)' }}>
                    {plan.currency}/{plan.period}
                  </span>
                )}
              </div>
              <p className={`text-sm mt-2 ${plan.highlight ? 'text-white/70' : ''}`} style={{ color: plan.highlight ? undefined : 'var(--fg-muted)' }}>
                {plan.description}
              </p>
            </div>

            <ul className="space-y-2.5 flex-1 mb-6">
              {plan.features.map(f => (
                <li key={f.text} className="flex items-center gap-2.5 text-sm">
                  <span className={`shrink-0 ${f.included ? 'text-nsg-red' : 'text-gray-300 dark:text-white/20'}`}>
                    {f.included ? '✓' : '✗'}
                  </span>
                  <span className={`${!f.included ? 'line-through opacity-40' : ''} ${plan.highlight ? 'text-white' : ''}`}
                    style={{ color: plan.highlight ? undefined : 'var(--fg)' }}>
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => { setAuthModalTab(plan.ctaAction); setShowAuthModal(true); }}
              className={`w-full py-3 rounded-xl text-sm font-bold transition-colors ${
                plan.highlight
                  ? 'bg-nsg-red hover:bg-nsg-red-dark text-white'
                  : 'border-2 border-navy text-navy dark:text-white dark:border-white/30 hover:border-nsg-red hover:text-nsg-red'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Trust signals */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16 text-center">
        {[
          { value: '284K+', label: 'Active Readers' },
          { value: '18K+', label: 'Subscribers' },
          { value: '12,800+', label: 'Articles Published' },
          { value: '8 Years', label: 'Of Journalism' },
        ].map(stat => (
          <div key={stat.label}>
            <div className="font-display text-2xl font-bold text-nsg-red">{stat.value}</div>
            <div className="text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-2xl font-bold text-center mb-8" style={{ color: 'var(--fg)' }}>Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQ.map(faq => (
            <details key={faq.q} className="rounded-xl group" style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
              <summary className="px-5 py-4 cursor-pointer list-none flex items-center justify-between font-semibold text-sm"
                style={{ color: 'var(--fg)' }}>
                {faq.q}
                <svg className="w-4 h-4 shrink-0 group-open:rotate-180 transition-transform" style={{ color: 'var(--fg-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-4 text-sm" style={{ color: 'var(--fg-muted)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
