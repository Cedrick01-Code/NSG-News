import { useApp } from '../App';
import nsgLogo from '../imports/NSG_news.png';

const FOOTER_LINKS = {
  Company:   ['About NSG News', 'Careers', 'Press', 'Advertise', 'Contact Us'],
  News:      ['Latest', 'Trending', 'Rwanda', 'Africa', 'World', 'Technology', 'Business', 'Sports'],
  Resources: ['Help Center', 'Newsletters', 'Podcasts', 'RSS Feed', 'API'],
  Legal:     ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Editorial Policy', 'Corrections'],
};

const SOCIAL = [
  { name: 'Facebook',  href: '#', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
  { name: 'X / Twitter', href: '#', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
  { name: 'Instagram',  href: '#', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z' },
  { name: 'YouTube',    href: '#', icon: 'M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02l5.75-3.02-5.75-3.02v6.04z' },
  { name: 'LinkedIn',   href: '#', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
];

export default function Footer() {
  const { navigate } = useApp();

  return (
    <footer style={{ background: 'var(--nav-bg)' }} className="text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <button onClick={() => navigate('home')} className="flex items-center gap-3 mb-4">
              <img src={nsgLogo} alt="NSG News" className="h-12 w-12 object-contain" />
              <div>
                <div className="font-display text-xl font-bold">NSG News</div>
                <div className="text-xs text-white/50 tracking-widest font-mono-nsg">AFRICA · WORLD</div>
              </div>
            </button>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Rwanda&apos;s premier digital newsroom. Delivering trusted journalism from Kigali to the world since 2018.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {SOCIAL.map(s => (
                <a key={s.name} href={s.href} aria-label={s.name}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-nsg-red flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/65 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter strip */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <div className="font-display font-semibold text-lg">Morning Briefing Newsletter</div>
            <p className="text-sm text-white/60 mt-1">Start your day with Rwanda&apos;s most important stories, curated by our editors.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 sm:w-56 px-4 py-2.5 rounded-lg text-sm bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-nsg-red"
            />
            <button className="px-4 py-2.5 bg-nsg-red hover:bg-nsg-red-dark text-white text-sm font-bold rounded-lg transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/10 text-xs text-white/40">
          <span>© {new Date().getFullYear()} NSG News Ltd. All rights reserved. Registered in Rwanda.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/70 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
