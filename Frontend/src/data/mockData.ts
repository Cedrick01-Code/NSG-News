export interface Author {
   id: string;
   name: string;
   avatar: string;
   bio: string;
   role: 'journalist' | 'editor' | 'admin';
   articles: number;
   verified: boolean;
 }

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  views: number;
  shares: number;
  comments: number;
  isBreaking?: boolean;
  isLive?: boolean;
  isFeatured?: boolean;
  isPremium?: boolean;
  isFactChecked?: boolean;
  status: 'draft' | 'submitted' | 'review' | 'approved' | 'published' | 'rejected';
  location?: string;
}

export interface BreakingNewsItem {
  id: string;
  headline: string;
  timestamp: string;
  slug?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
  description: string;
}

export interface LiveUpdate {
  id: string;
  time: string;
  content: string;
  type: 'text' | 'breaking' | 'alert';
  author: string;
}

export interface LiveEvent {
  id: string;
  title: string;
  status: 'live' | 'upcoming' | 'ended';
  startTime: string;
  viewers: number;
  category: string;
  location: string;
  description: string;
  updates: LiveUpdate[];
  imageUrl: string;
}

export interface Comment {
  id: string;
  articleId: string;
  user: { name: string; avatar: string };
  content: string;
  likes: number;
  timestamp: string;
  replies?: Comment[];
}

// ─── Authors ────────────────────────────────────────────────────────────────

export const authors: Author[] = [
  {
    id: 'a1', name: 'Amara Nkosi', role: 'journalist',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&auto=format',
bio: 'Senior political correspondent covering East Africa. Based in Kigali.',
     articles: 287,
     verified: true,
   },
  {
    id: 'a2', name: 'Jean-Pierre Hakizimana', role: 'journalist',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&auto=format',
bio: 'Technology and innovation journalist based in Kigali. Former software engineer.',
     articles: 154,
     verified: true,
   },
  {
    id: 'a3', name: 'Fatima Al-Rashid', role: 'journalist',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format',
bio: 'Business and economics reporter with 12 years of experience in African markets.',
     articles: 201,
     verified: true,
   },
  {
    id: 'a4', name: 'Emmanuel Uwimana', role: 'editor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format',
bio: 'Chief Editor, Rwanda Desk. Former BBC Africa correspondent.',
     articles: 89,
     verified: true,
   },
  {
    id: 'a5', name: 'Sophie Kamau', role: 'journalist',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format',
bio: 'Health and science correspondent for East Africa. PhD in Public Health, University of Nairobi.',
     articles: 178,
     verified: true,
   },
  {
    id: 'a6', name: 'Claude Niyonzima', role: 'journalist',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format',
bio: 'Sports desk lead, specializing in Rwandan and East African football.',
     articles: 312,
     verified: true,
   },
];

// ─── Categories ─────────────────────────────────────────────────────────────

export const categories: Category[] = [
   { id: 'c1', name: 'Rwanda', slug: 'rwanda', color: '#1B2A4A', icon: '🇷🇼', description: 'News from across Rwanda — national, provincial, and local.' },
   { id: 'c2', name: 'Africa', slug: 'africa', color: '#CC1219', icon: '🌍', description: 'Pan-African coverage: politics, economy, culture, and development.' },
   { id: 'c3', name: 'World', slug: 'world', color: '#374151', icon: '🌐', description: 'International news and global affairs.' },
   { id: 'c4', name: 'Politics', slug: 'politics', color: '#7C3AED', icon: '🏛️', description: 'Political news, governance, and policy.' },
   { id: 'c5', name: 'Business', slug: 'business', color: '#059669', icon: '📈', description: 'Markets, economy, investment, and entrepreneurship.' },
   { id: 'c6', name: 'Technology', slug: 'technology', color: '#0284C7', icon: '🔧', description: 'Tech news, startups, and digital transformation.' },
   { id: 'c7', name: 'Sports', slug: 'sports', color: '#DC2626', icon: '🏀', description: 'Rwandan sports, AFCON, and global athletics.' },
   { id: 'c8', name: 'Entertainment', slug: 'entertainment', color: '#9333EA', icon: '🎭', description: 'Music, film, arts, and culture.' },
   { id: 'c9', name: 'Health', slug: 'health', color: '#16A34A', icon: '🏥', description: 'Public health, medicine, and wellness.' },
   { id: 'c10', name: 'Science', slug: 'science', color: '#0891B2', icon: '🔬', description: 'Scientific research, discovery, and innovation.' },
   { id: 'c11', name: 'Education', slug: 'education', color: '#CA8A04', icon: '📚', description: 'Schools, universities, and learning in Africa.' },
   { id: 'c12', name: 'Local', slug: 'local', color: '#EA580C', icon: '📍', description: 'Kigali and provincial news from across Rwanda.' },
 ];

// ─── Breaking News ───────────────────────────────────────────────────────────

export const breakingNewsItems: BreakingNewsItem[] = [
  { id: 'b1', headline: 'African Union Summit concludes with landmark Continental Digital Economy Framework signed by all 54 member states', timestamp: '2 min ago', slug: 'african-union-digital-economy' },
  { id: 'b2', headline: 'Rwanda launches $500M green energy initiative targeting 100% renewable electricity by 2030', timestamp: '15 min ago', slug: 'rwanda-green-energy-initiative' },
  { id: 'b3', headline: 'East African Community announces unified e-visa system effective January 2027', timestamp: '32 min ago', slug: 'eac-unified-visa' },
  { id: 'b4', headline: 'Kigali-based fintech Pezesha raises record $120M Series B from Sequoia Africa and a16z', timestamp: '1 hr ago', slug: 'kigali-tech-startup-funding' },
  { id: 'b5', headline: "Amavubi qualify for AFCON 2026 after Ndayishimiye's 89th-minute header against Uganda", timestamp: '2 hr ago', slug: 'rwanda-football-afcon' },
];

// ─── Articles ────────────────────────────────────────────────────────────────

export const articles: Article[] = [
  {
    id: '1', slug: 'rwanda-green-energy-initiative',
    title: "Rwanda Launches $500M Green Energy Initiative to Power Every Household by 2030",
    subtitle: "The ambitious plan targets 100% renewable electricity through solar, wind, and hydropower expansion across all five provinces",
    excerpt: "President Kagame unveiled the comprehensive green energy roadmap, committing to a carbon-neutral power grid through an unprecedented public-private partnership.",
    content: `<p>President Paul Kagame unveiled Rwanda's most ambitious energy initiative to date — a $500 million green energy programme aimed at achieving 100% renewable electricity across the country by 2030.</p>
    <p>Speaking at the launch ceremony in Kigali's Intare Conference Arena, Kagame emphasized the strategic importance of energy independence for Rwanda's long-term economic development. "Energy is the foundation of everything we want to build," he said to a gathering of ministers, diplomats, and private sector leaders. "This initiative will transform not just our grid, but our entire economy."</p>
    <h2>Key Components of the Initiative</h2>
    <p>The programme will be implemented in three phases over six years, with investments spanning solar farms in the Eastern Province, expanded methane gas extraction from Lake Kivu, and a network of small-scale hydropower stations across the country's rivers.</p>
    <blockquote>This is not merely an infrastructure investment — it is an investment in Rwanda's sovereignty and the future of every Rwandan family.</blockquote>
    <p>The initiative will be financed through a mix of government bonds, international climate finance, and private sector participation. The World Bank and African Development Bank have already committed preliminary support, with formal agreements expected by Q1 2027.</p>
    <h2>Impact on Rural Communities</h2>
    <p>A significant portion of the funding — approximately $180 million — will be directed at expanding electricity access to rural areas currently without reliable power. The government estimates this will bring electricity to an additional 2.3 million Rwandans.</p>
    <p>Local manufacturing of solar panels is also part of the plan, with a new facility in the Kigali Special Economic Zone expected to create over 3,000 direct jobs by 2028.</p>`,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=700&fit=crop&auto=format',
    category: 'Rwanda', tags: ['Energy', 'Environment', 'Investment', 'Kagame', 'Kigali'],
    author: authors[0], publishedAt: '2026-08-20T08:00:00Z', readTime: 5,
    views: 48200, shares: 3100, comments: 284,
    isFeatured: true, isFactChecked: true, status: 'published', location: 'Kigali, Rwanda',
  },
  {
    id: '2', slug: 'african-union-digital-economy',
    title: "African Union Strikes Historic Digital Economy Deal at Addis Ababa Summit",
    subtitle: "All 54 member states signed the Continental Digital Economy Framework, opening a projected $180B market",
    excerpt: "The agreement creates unified data governance rules, cross-border e-commerce regulations, and a shared digital identity system across Africa.",
    content: `<p>In a landmark moment for African integration, all 54 member states of the African Union have signed the Continental Digital Economy Framework (CDEF) at the Addis Ababa summit, creating what analysts describe as the world's most ambitious supranational digital governance structure.</p>
    <p>The agreement covers a $180 billion addressable market and is expected to add $2.3 trillion to African GDP over the next two decades by reducing friction in cross-border digital commerce.</p>
    <h2>What the Framework Covers</h2>
    <p>The CDEF establishes harmonized rules across data localization, digital identity, e-commerce, cybersecurity standards, and digital taxation. It creates the Pan-African Digital Identity System (PADIS), which will allow citizens to use a single digital identity across all member states.</p>
    <blockquote>Africa has the youngest population in the world and the fastest-growing internet user base. This framework ensures we capture the value of the digital revolution within our borders.</blockquote>
    <p>Rwanda, a pioneer in digital governance, played a central role in drafting the framework. Kigali will host the new Continental Digital Economy Authority (CDEA) secretariat — a major diplomatic achievement for the country.</p>`,
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=700&fit=crop&auto=format',
    category: 'Africa', tags: ['African Union', 'Digital Economy', 'Technology', 'Trade'],
    author: authors[0], publishedAt: '2026-08-20T06:30:00Z', readTime: 6,
    views: 62400, shares: 5800, comments: 421,
    isFeatured: true, isBreaking: true, isFactChecked: true, status: 'published', location: 'Addis Ababa, Ethiopia',
  },
  {
    id: '3', slug: 'kigali-tech-startup-funding',
    title: "Kigali Fintech Pezesha Raises Record $120M Series B, Rwanda's Largest Ever",
    subtitle: "The round co-led by Sequoia Africa and Andreessen Horowitz values the company at $650M",
    excerpt: "Pezesha, enabling micro-lending and mobile payments for SMEs, will expand into 12 African markets over 18 months.",
    content: `<p>Pezesha, the Kigali-headquartered fintech startup, has raised $120 million in a Series B funding round co-led by Sequoia Africa and Andreessen Horowitz, making it Rwanda's most valuable privately funded technology company.</p>
    <p>Founded in 2019 by CEO Hilda Moraa and CTO Claude Nkurunziza, Pezesha operates a digital platform providing micro-credit, working capital, and mobile payment rails to 340,000 small and medium enterprises, processing over $280 million in transactions monthly.</p>
    <blockquote>Rwanda proved that fintech infrastructure could be built right — compliant, secure, and genuinely useful to real people. Now we are taking that model to the continent.</blockquote>
    <p>The expansion plan targets 12 new African markets including Uganda, Tanzania, Ghana, Senegal, and Côte d'Ivoire, with Pezesha aiming to serve 2 million businesses by the end of 2027.</p>`,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=700&fit=crop&auto=format',
    category: 'Technology', tags: ['Fintech', 'Startup', 'Investment', 'Kigali'],
    author: authors[1], publishedAt: '2026-08-19T14:00:00Z', readTime: 4,
    views: 38700, shares: 2900, comments: 156,
    status: 'published', location: 'Kigali, Rwanda',
  },
  {
    id: '4', slug: 'eac-unified-visa',
    title: "East African Community to Launch Unified Tourist Visa Across Six Nations",
    subtitle: "The new EAC E-Visa replaces six separate visas with a single $100 digital pass effective January 2027",
    excerpt: "Travelers to East Africa will soon need only one visa to visit Rwanda, Kenya, Tanzania, Uganda, Burundi, and South Sudan.",
    content: `<p>The East African Community (EAC) has formally announced the launch of a unified digital tourism visa system, replacing the existing patchwork of national visas with a single EAC E-Visa covering all six member states from January 1, 2027.</p>
    <p>The system is expected to boost tourism receipts by an estimated $4.8 billion annually across the EAC bloc. Rwanda's tourism board has projected the change will increase arrivals by 35% in the first year.</p>
    <blockquote>Free movement of people is the precondition for a truly integrated East African economy. This visa is the visible face of our union.</blockquote>`,
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&h=700&fit=crop&auto=format',
    category: 'Africa', tags: ['Tourism', 'EAC', 'Travel', 'East Africa', 'Policy'],
    author: authors[0], publishedAt: '2026-08-19T10:00:00Z', readTime: 4,
    views: 29800, shares: 1800, comments: 203,
    isBreaking: true, status: 'published', location: 'Nairobi, Kenya',
  },
  {
    id: '5', slug: 'rwanda-football-afcon',
    title: "Amavubi Qualify for AFCON 2026 with Stunning Last-Minute Victory Over Uganda",
    subtitle: "Eric Ndayishimiye's 89th-minute header sends Rwanda to their second-ever Africa Cup of Nations",
    excerpt: "A capacity crowd at Amahoro National Stadium erupted in celebration as the Amavubi secured their AFCON 2026 place with a dramatic 2-1 win.",
    content: `<p>Rwanda's national football team, the Amavubi, have qualified for the Africa Cup of Nations 2026 after a breathtaking 2-1 victory over Uganda in Kigali on Tuesday evening, sending a packed Amahoro National Stadium of 28,000 into euphoria.</p>
    <p>The decisive goal came in the 89th minute when midfielder Eric Ndayishimiye met a deflected corner kick to head home what will surely be remembered as one of Rwanda's most celebrated football moments.</p>
    <blockquote>We played for every Rwandan tonight. This is for the fans, for the country, for everyone who believed in us — from day one.</blockquote>
    <p>Head coach Vincent Mashami praised his squad's resilience. "These players never stop believing. That is what makes this team special."</p>`,
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&h=700&fit=crop&auto=format',
    category: 'Sports', tags: ['Football', 'AFCON', 'Amavubi', 'Rwanda'],
    author: authors[5], publishedAt: '2026-08-18T22:00:00Z', readTime: 3,
    views: 95300, shares: 12400, comments: 892,
    isBreaking: true, status: 'published', location: 'Kigali, Rwanda',
  },
  {
    id: '6', slug: 'who-malaria-decline',
    title: "WHO Africa Reports Historic 40% Drop in Malaria Cases Over Five Years",
    subtitle: "Rwanda leads the continent with a 67% reduction, credited to community health workers and vaccine rollout",
    excerpt: "The World Health Organization's Africa Regional Office released data showing the most significant drop in malaria cases in the continent's recorded history.",
    content: `<p>The World Health Organization's Africa Regional Office has released its annual malaria report showing a 40% decline in cases across Sub-Saharan Africa over five years — the most dramatic reduction since systematic tracking began.</p>
    <p>Rwanda has emerged as a regional model, achieving a 67% reduction between 2021 and 2026. The country's community health worker programme, reaching over 95% of villages, has been widely praised as the continent's most effective grassroots health intervention.</p>
    <blockquote>Malaria is a disease of poverty, but it is also a preventable disease. Rwanda's success shows what determined political leadership combined with proper resourcing can achieve.</blockquote>`,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=700&fit=crop&auto=format',
    category: 'Health', tags: ['WHO', 'Malaria', 'Public Health', 'Africa', 'Rwanda'],
    author: authors[4], publishedAt: '2026-08-18T09:00:00Z', readTime: 5,
    views: 31200, shares: 2400, comments: 178,
    isFactChecked: true, status: 'published',
  },
  {
    id: '7', slug: 'g20-coal-agreement',
    title: "G20 Nations Agree to Phase Out Coal Power by 2035 in Binding Climate Accord",
    subtitle: "The deal signed in Rio de Janeiro is described as the most significant climate commitment since Paris",
    excerpt: "World leaders reached a landmark agreement to accelerate coal phase-out, binding the world's 20 largest economies to a 2035 deadline.",
    content: `<p>The world's 20 largest economies have agreed to phase out coal-fired electricity generation by 2035, signing what climate experts call the most consequential international climate accord since the Paris Agreement.</p>
    <p>Several African nations negotiated a special clause allowing developing economies additional flexibility in their transition timelines, provided they submit credible national decarbonization plans by 2027.</p>
    <blockquote>We will not sacrifice development for the climate mistakes of wealthy nations. But we also recognize that climate change threatens Africa more than any other region.</blockquote>`,
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=700&fit=crop&auto=format',
    category: 'World', tags: ['Climate', 'G20', 'Environment', 'Coal', 'Energy'],
    author: authors[0], publishedAt: '2026-08-17T16:00:00Z', readTime: 5,
    views: 44500, shares: 6800, comments: 534,
    isFactChecked: true, status: 'published',
  },
  {
    id: '8', slug: 'kigali-property-boom',
    title: "Kigali Property Market Surges 34% as East Africa's Premier Business Hub Attracts Global Capital",
    subtitle: "Foreign direct investment in Rwandan real estate hits record $2.1B; prime offices now rival Nairobi",
    excerpt: "Prime commercial and residential real estate in Kigali has seen unprecedented growth as multinational companies establish East African headquarters in the capital.",
    content: `<p>Kigali's property market has surged 34% over the past 12 months, driven by record levels of FDI and a sustained influx of multinational companies establishing East African headquarters in the Rwandan capital.</p>
    <p>Prime office space now fetches $28 per square meter per month, while luxury residential properties in Nyarutarama and Kacyiru have reached values comparable with Nairobi's upscale suburbs.</p>
    <blockquote>Kigali is increasingly described by global companies as the Singapore of Africa — stable, clean, business-friendly, and strategically positioned at the heart of a rapidly growing region.</blockquote>`,
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=700&fit=crop&auto=format',
    category: 'Business', tags: ['Real Estate', 'Kigali', 'Investment', 'Economy'],
    author: authors[2], publishedAt: '2026-08-17T11:00:00Z', readTime: 4,
    views: 27300, shares: 1900, comments: 142,
    status: 'published',
  },
  {
    id: '9', slug: 'ai-africa-education',
    title: "AI-Powered Tutoring Platforms Reach 8 Million African Students in 18 Months",
    subtitle: "Adaptive AI is transforming education access in rural and underserved communities across the continent",
    excerpt: "A new generation of AI-driven learning platforms is delivering personalized education to millions who previously lacked access to qualified teachers.",
    content: `<p>AI-powered educational platforms have reached 8 million students across Sub-Saharan Africa in 18 months — a tenfold increase. In Rwanda, where the government has made digital education a national priority, over 900,000 students now use AI-powered learning tools as part of their formal schooling.</p>
    <blockquote>The technology adapts to each child's pace and style. For a student in a remote village with one overworked teacher, this is transformational.</blockquote>`,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=700&fit=crop&auto=format',
    category: 'Education', tags: ['AI', 'Education', 'EdTech', 'Africa', 'Technology'],
    author: authors[1], publishedAt: '2026-08-16T13:00:00Z', readTime: 4,
    views: 19800, shares: 1500, comments: 87,
    status: 'published',
  },
  {
    id: '10', slug: 'east-africa-music-global',
    title: "East African Music Goes Global: Afrobeats Artists Break Into European Charts",
    subtitle: "Artists from Rwanda, Kenya, and Tanzania are redefining Afrobeats with distinctly East African sounds",
    excerpt: "A new wave of East African artists is achieving global commercial success, charting in the UK, France, and Germany in 2026.",
    content: `<p>East Africa's music industry is experiencing a generational breakthrough, with artists from Rwanda, Kenya, and Tanzania charting in European markets for the first time. Rwandan singer Bruce Melodie recently became the first Rwandan musician to chart in the UK Top 40, reaching number 27 with "Igihe Kirageze."</p>
    <blockquote>The world is finally hearing East African music on its own terms — not as a derivative of West African sounds but as something entirely its own.</blockquote>`,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=700&fit=crop&auto=format',
    category: 'Entertainment', tags: ['Music', 'Afrobeats', 'Rwanda', 'Culture'],
    author: authors[2], publishedAt: '2026-08-15T10:00:00Z', readTime: 3,
    views: 42100, shares: 4300, comments: 311,
    status: 'published',
  },
  {
    id: '11', slug: 'oxford-malaria-vaccine',
    title: "Oxford Scientists Report 80% Efficacy for Next-Generation Malaria Vaccine",
    subtitle: "Phase 3 results from 4,800-child trial across four African countries raise hopes for elimination",
    excerpt: "The R21/Matrix-M vaccine shows 80% efficacy in children under five — the group most vulnerable to severe disease and death from malaria.",
    content: `<p>Scientists at Oxford University's Jenner Institute have published Phase 3 results for the R21/Matrix-M malaria vaccine, showing 80% efficacy against clinical malaria in children aged 6 months to 4 years.</p>
    <p>The trial, conducted across sites in Burkina Faso, Kenya, Mali, and Tanzania, enrolled over 4,800 children followed for 24 months, demonstrating consistent protection across diverse transmission settings.</p>
    <blockquote>This is the kind of result that changes the trajectory of a disease. We could realistically be talking about the elimination of malaria from parts of Africa within a generation.</blockquote>`,
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200&h=700&fit=crop&auto=format',
    category: 'Science', tags: ['Vaccine', 'Malaria', 'Oxford', 'Health'],
    author: authors[4], publishedAt: '2026-08-14T09:00:00Z', readTime: 5,
    views: 28600, shares: 3100, comments: 245,
    isFactChecked: true, status: 'published',
  },
  {
    id: '12', slug: 'rwanda-elections-2026',
    title: "Rwanda's Parliamentary Elections Set for November 2026 as Preparations Intensify",
    subtitle: "The National Electoral Commission announces the full electoral calendar and voter registration process",
    excerpt: "Voter registration begins September 15 for elections renewing all 80 seats in the Chamber of Deputies.",
    content: `<p>Rwanda's National Electoral Commission (NEC) has officially announced the schedule for the November 2026 parliamentary elections. Voter registration runs September 15 – October 10, with voting scheduled for November 14-16 and results expected by November 20.</p>
    <blockquote>These elections are an important moment for Rwanda's democracy. The NEC is committed to free, fair, and transparent polls that reflect the will of every Rwandan voter.</blockquote>`,
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&h=700&fit=crop&auto=format',
    category: 'Politics', tags: ['Elections', 'Rwanda', 'Democracy', 'Parliament'],
    author: authors[0], publishedAt: '2026-08-13T08:00:00Z', readTime: 4,
    views: 34500, shares: 2100, comments: 389,
    status: 'published', location: 'Kigali, Rwanda',
  },
  {
    id: '13', slug: 'gorilla-trekking-record',
    title: "Rwanda's Gorilla Trekking Revenue Hits All-Time High of $96M in First Half of 2026",
    subtitle: "Record 24,000 permits sold as Volcanoes National Park implements new conservation-tourism model",
    excerpt: "Rwanda's flagship conservation tourism product is attracting more visitors than ever, with high-spending travelers from Europe and North America driving the surge.",
    content: `<p>Revenue from gorilla trekking in Rwanda's Volcanoes National Park reached $96 million in the first six months of 2026, an all-time record, according to the Rwanda Development Board. The increase was driven by a 28% rise in permit sales and a premium pricing model introduced in 2025.</p>
    <blockquote>We are demonstrating that conservation and economic development can reinforce each other. The mountain gorilla population has grown 26% in the past decade precisely because local communities benefit directly from their protection.</blockquote>`,
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&h=700&fit=crop&auto=format',
    category: 'Rwanda', tags: ['Tourism', 'Conservation', 'Wildlife', 'Volcanoes'],
    author: authors[3], publishedAt: '2026-08-12T10:00:00Z', readTime: 4,
    views: 22100, shares: 1700, comments: 98,
    status: 'published', location: 'Musanze, Rwanda', isPremium: false,
  },
  {
    id: '14', slug: 'africa-space-programme',
    title: "African Space Agency Unveils $1.2B Constellation of Earth-Observation Satellites",
    subtitle: "The programme will monitor agricultural yields, climate change, and urban growth across 54 member states",
    excerpt: "The African Space Agency's most ambitious programme yet will deploy 24 small satellites in low Earth orbit by 2030, providing real-time data across the continent.",
    content: `<p>The African Space Agency (AfSA) has unveiled plans for a $1.2 billion programme to deploy 24 earth-observation satellites in a low-Earth orbit constellation by 2030, providing continent-wide data on agriculture, climate, and infrastructure.</p>
    <blockquote>Space is not a luxury for Africa — it is a tool for development. Knowing in real time where crops are failing, where floods are forming, where cities are growing — this is strategic intelligence for the continent's future.</blockquote>`,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=700&fit=crop&auto=format',
    category: 'Science', tags: ['Space', 'Africa', 'Technology', 'Satellites'],
    author: authors[1], publishedAt: '2026-08-11T12:00:00Z', readTime: 5,
    views: 18400, shares: 2200, comments: 134,
    status: 'published', isPremium: true,
  },
  {
    id: '15', slug: 'kigali-cycling-team',
    title: "Team Rwanda Cyclists Set Record at Tour de la Coopération Internationale",
    subtitle: "Gasore Hategeka wins the overall title as Rwanda takes four of the top ten positions",
    excerpt: "Rwanda's national cycling team delivered their strongest-ever international performance, with Gasore Hategeka claiming the yellow jersey in Senegal.",
    content: `<p>Team Rwanda returned from the Tour de la Coopération Internationale in Senegal with their most successful result in the team's history, securing the overall title and four top-ten positions in the 12-stage race.</p>
    <p>Gasore Hategeka, 24, won three stages and held the yellow jersey for the final six days, finishing 1 minute 42 seconds ahead of his nearest rival.</p>
    <blockquote>Rwanda has built one of Africa's finest cycling programmes. These results reflect years of systematic investment and a generation of exceptional young athletes.</blockquote>`,
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1200&h=700&fit=crop&auto=format',
    category: 'Sports', tags: ['Cycling', 'Rwanda', 'Team Rwanda', 'Athletics'],
    author: authors[5], publishedAt: '2026-08-10T14:00:00Z', readTime: 3,
    views: 16800, shares: 1200, comments: 76,
    status: 'published', location: 'Dakar, Senegal',
  },
];

// ─── Live Events ─────────────────────────────────────────────────────────────

export const liveEvents: LiveEvent[] = [
  {
    id: 'l1',
    title: 'African Union Digital Economy Summit — Day 2',
    status: 'live',
    startTime: '2026-08-20T08:00:00Z',
    viewers: 45200,
    category: 'Africa',
    location: 'Addis Ababa, Ethiopia',
    description: 'NSG News is providing live coverage of the African Union Digital Economy Summit as 54 heads of delegation gather to finalize and sign the Continental Digital Economy Framework.',
    imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=600&fit=crop&auto=format',
    updates: [
      { id: 'u1', time: '10:42', content: 'AU Commission Chairperson delivers closing address, calling the framework "a turning point for African digital sovereignty." Delegates applaud for over two minutes.', type: 'breaking', author: 'Amara Nkosi' },
      { id: 'u2', time: '10:18', content: 'Signing ceremony begins. Delegates from all 54 member states sign the Continental Digital Economy Framework in alphabetical order of country name.', type: 'text', author: 'Amara Nkosi' },
      { id: 'u3', time: '09:55', content: "Rwanda's Minister of ICT addresses delegates: \"We have been building this architecture for years. Today, Africa plugs in.\"", type: 'text', author: 'Jean-Pierre Hakizimana' },
      { id: 'u4', time: '09:30', content: 'Summit resumes after morning break. Discussion turns to the Pan-African Digital Identity System implementation timeline and governance structure.', type: 'text', author: 'Amara Nkosi' },
      { id: 'u5', time: '08:45', content: 'Opening session begins with all 54 heads of delegation present — the first time all AU member states have attended a digital summit at ministerial level.', type: 'text', author: 'Jean-Pierre Hakizimana' },
      { id: 'u6', time: '08:00', content: 'Day 2 of the summit begins. Live coverage starts now. Get real-time updates from Addis Ababa.', type: 'alert', author: 'NSG Desk' },
    ],
  },
  {
    id: 'l2',
    title: 'Rwanda National Assembly Budget Session',
    status: 'upcoming',
    startTime: '2026-08-21T09:00:00Z',
    viewers: 0,
    category: 'Rwanda',
    location: 'Kigali, Rwanda',
    description: 'The National Assembly convenes for the annual budget reading. Finance Minister Yusuf Murangwa will present the 2027 national budget.',
    imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&h=600&fit=crop&auto=format',
    updates: [],
  },
];

// ─── Comments ────────────────────────────────────────────────────────────────

export const mockComments: Comment[] = [
  {
    id: 'cm1', articleId: '1',
    user: { name: 'Celestin Habimana', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop' },
    content: 'This is an incredible milestone for Rwanda. The rural electrification component especially is going to change lives for millions of families who still face weekly outages.',
    likes: 47, timestamp: '2 hours ago',
    replies: [
      {
        id: 'cm1r1', articleId: '1',
        user: { name: 'Diane Mukamana', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=40&h=40&fit=crop' },
        content: 'Agreed. My home village in Southern Province still has outages multiple times per week. Hoping this initiative delivers faster than past promises.',
        likes: 23, timestamp: '1 hour ago',
      },
    ],
  },
  {
    id: 'cm2', articleId: '1',
    user: { name: 'Patrick Niyonzima', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop' },
    content: "The financing structure looks solid — mixing government bonds with international climate finance and private sector capital is exactly the right approach. This should attract serious investors.",
    likes: 31, timestamp: '3 hours ago',
  },
  {
    id: 'cm3', articleId: '1',
    user: { name: 'Sandrine Uwase', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop' },
    content: "The solar manufacturing facility in the SEZ is the detail that excites me most. 3,000 jobs, local manufacturing capabilities, and clean energy all in one investment.",
    likes: 19, timestamp: '4 hours ago',
  },
];

// ─── Analytics (for dashboards) ──────────────────────────────────────────────

export const analyticsOverview = {
  totalViews:     { value: 1284000, growth: 12.4 },
  uniqueVisitors: { value: 347000,  growth: 8.7  },
  totalShares:    { value: 68400,   growth: 21.3 },
  totalComments:  { value: 34100,   growth: 5.9  },
  subscribers:    { value: 18200,   growth: 14.2 },
  revenue:        { value: 48700,   growth: 9.1  },
};

export const weeklyViews = [
  { day: 'Mon', views: 142 },
  { day: 'Tue', views: 168 },
  { day: 'Wed', views: 195 },
  { day: 'Thu', views: 178 },
  { day: 'Fri', views: 210 },
  { day: 'Sat', views: 189 },
  { day: 'Sun', views: 202 },
];

export const categoryBreakdown = [
  { category: 'Rwanda',     pct: 32, color: '#1B2A4A' },
  { category: 'Africa',     pct: 24, color: '#CC1219'  },
  { category: 'Technology', pct: 18, color: '#0284C7'  },
  { category: 'Sports',     pct: 12, color: '#DC2626'  },
  { category: 'Business',   pct:  8, color: '#059669'  },
  { category: 'Other',      pct:  6, color: '#9333EA'  },
];

// ─── Journalist dashboard data ────────────────────────────────────────────────

export const journalistStats = {
   totalViews: 284700, articles: 154, engagementRate: 4.8,
};

export const journalistArticles = [
  { id: 'ja1', title: 'Kigali Convention Centre Phase 2 Expansion Plans Revealed', status: 'draft',     updatedAt: '2026-08-19', views: 0,     category: 'Rwanda',     comments: 0   },
  { id: 'ja2', title: "Rwanda's Minister of Finance on the 2027 Budget Priorities", status: 'submitted', updatedAt: '2026-08-18', views: 0,     category: 'Politics',   comments: 0   },
  { id: 'ja3', title: "How Rwanda's Drone Delivery Network Is Expanding Nationwide",  status: 'review',    updatedAt: '2026-08-17', views: 0,     category: 'Technology', comments: 0   },
  { id: 'ja4', title: 'Gorilla Trekking Revenue Hits All-Time High',                   status: 'published', updatedAt: '2026-08-15', views: 18400, category: 'Rwanda',     comments: 98  },
  { id: 'ja5', title: 'Kigali Tech Hub Opens New AI Research Centre',                  status: 'published', updatedAt: '2026-08-12', views: 11200, category: 'Technology', comments: 54  },
  { id: 'ja6', title: 'Inside Rwanda\'s Ambitious Digital ID Programme',               status: 'rejected',  updatedAt: '2026-08-10', views: 0,     category: 'Technology', comments: 0   },
];

// ─── Editor dashboard data ────────────────────────────────────────────────────

export const pendingSubmissions = [
  { id: 'ps1', title: 'Kigali Convention Centre Phase 2 Expansion Plans Revealed',   author: 'Jean-Pierre Hakizimana', submittedAt: '2026-08-19T14:30:00Z', category: 'Rwanda',     status: 'pending'     },
  { id: 'ps2', title: 'East Africa Power Pool Seeks $3B Expansion Funding',           author: 'Amara Nkosi',            submittedAt: '2026-08-18T09:15:00Z', category: 'Business',   status: 'pending'     },
  { id: 'ps3', title: "Rwanda's 1000 Hills Coffee Brand Gains EU Premium Status",     author: 'Fatima Al-Rashid',       submittedAt: '2026-08-18T07:45:00Z', category: 'Business',   status: 'fact-check'  },
  { id: 'ps4', title: 'National Cycling Team Prepares for Paris Classic',             author: 'Sophie Kamau',           submittedAt: '2026-08-17T16:00:00Z', category: 'Sports',     status: 'approved'    },
  { id: 'ps5', title: 'Rwamagana District Launches Smart Agriculture Pilot',          author: 'Claude Niyonzima',       submittedAt: '2026-08-17T11:20:00Z', category: 'Local',      status: 'pending'     },
  { id: 'ps6', title: 'Inside Rwanda\'s National AI Strategy for 2026–2030',          author: 'Jean-Pierre Hakizimana', submittedAt: '2026-08-16T13:40:00Z', category: 'Technology', status: 'pending'     },
];

// ─── Admin dashboard data ─────────────────────────────────────────────────────

export const adminStats = {
  totalUsers:   { value: 284100, growth: 8.4  },
  activeUsers:  { value: 94200,  growth: 11.2 },
  journalists:  { value: 48,     growth: 4.3  },
  totalArticles:{ value: 12840,  growth: 6.7  },
  totalComments:{ value: 184200, growth: 9.1  },
  monthlyRevenue:{ value: 48700, growth: 12.4 },
};

export const recentUsers = [
  { id: 'ru1', name: 'Celestin Habimana',  email: 'c.habimana@gmail.com',     role: 'reader',     joinedAt: '2026-08-20', status: 'active'   },
  { id: 'ru2', name: 'Diane Mukamana',     email: 'd.mukamana@yahoo.com',      role: 'reader',     joinedAt: '2026-08-19', status: 'active'   },
  { id: 'ru3', name: 'Patrick Niyonzima',  email: 'p.niyonzima@outlook.com',   role: 'journalist', joinedAt: '2026-08-19', status: 'active'   },
  { id: 'ru4', name: 'Sandrine Uwase',     email: 's.uwase@nsgnews.rw',        role: 'editor',     joinedAt: '2026-08-18', status: 'active'   },
  { id: 'ru5', name: 'Eric Ndayishimiye',  email: 'e.ndayishimiye@gmail.com',  role: 'reader',     joinedAt: '2026-08-18', status: 'suspended'},
  { id: 'ru6', name: 'Immaculée Ingabire', email: 'i.ingabire@protonmail.com', role: 'reader',     joinedAt: '2026-08-17', status: 'active'   },
];
