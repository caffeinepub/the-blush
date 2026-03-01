import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, Scissors } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/team', label: 'Team' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/book', label: 'Book' },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full flex items-center justify-center border border-[var(--gold)] text-[var(--gold)]">
              <Scissors size={14} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-2xl font-medium tracking-widest text-foreground">
                THE BLUSH
              </span>
              <span className="font-sans text-[0.55rem] tracking-[0.25em] uppercase text-[var(--gold)] font-medium">
                Salon & Studio
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-sans text-xs tracking-[0.18em] uppercase font-medium transition-colors duration-200 pb-0.5 border-b ${
                  currentPath === link.to
                    ? 'text-[var(--gold)] border-[var(--gold)]'
                    : 'text-muted-foreground border-transparent hover:text-foreground hover:border-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/book"
              className="font-sans text-xs tracking-[0.18em] uppercase font-semibold px-6 py-2.5 bg-[var(--gold)] text-white hover:bg-[var(--gold-dark)] transition-colors duration-200"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="flex flex-col px-6 py-6 gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`font-sans text-xs tracking-[0.18em] uppercase font-medium transition-colors ${
                  currentPath === link.to
                    ? 'text-[var(--gold)]'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/book"
              onClick={() => setMobileOpen(false)}
              className="font-sans text-xs tracking-[0.18em] uppercase font-semibold px-6 py-3 bg-[var(--gold)] text-white text-center hover:bg-[var(--gold-dark)] transition-colors"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'the-blush-salon');

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 rounded-full flex items-center justify-center border border-[var(--gold-light)]">
                <Scissors size={12} strokeWidth={1.5} className="text-[var(--gold-light)]" />
              </div>
              <span className="font-serif text-xl tracking-widest text-background">THE BLUSH</span>
            </div>
            <p className="font-sans text-xs tracking-wide text-background/60 leading-relaxed max-w-xs">
              Where artistry meets elegance. Premium hair care and styling in the heart of Kharghar.
            </p>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-sans text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-[var(--gold-light)] mb-4">
              Visit Us
            </h4>
            <address className="not-italic font-sans text-xs text-background/70 leading-relaxed">
              Shop No. 5, Monarch Luxuria Towers<br />
              Plot No. 6, Sector-18<br />
              Kharghar, Navi Mumbai
            </address>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-sans text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-[var(--gold-light)] mb-4">
              Hours
            </h4>
            <p className="font-sans text-xs text-background/70 leading-relaxed">
              Open Every Day<br />
              9:30 AM – 10:00 PM
            </p>
            <div className="mt-4">
              <Link
                to="/book"
                className="font-sans text-[0.65rem] tracking-[0.18em] uppercase font-semibold text-[var(--gold-light)] hover:text-background transition-colors border-b border-[var(--gold-light)]/40 pb-0.5"
              >
                Book Appointment →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[0.65rem] tracking-wide text-background/40">
            © {year} The Blush Salon. All rights reserved.
          </p>
          <p className="font-sans text-[0.65rem] tracking-wide text-background/40">
            Built with{' '}
            <span className="text-[var(--gold-light)]">♥</span>{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--gold-light)] hover:text-background transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
