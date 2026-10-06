import { useState, useEffect } from 'react';
import { Logo } from '@/components/common/Logo';
import { Menu, X } from 'lucide-react';

interface LandingNavbarProps {
  onNavigate: (page: string) => void;
}

export function LandingNavbar({ onNavigate }: LandingNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Home', id: 'home' },
    { label: 'Features', id: 'features' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'About', id: 'about' },
  ];

  const handleNav = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-soft' : 'bg-transparent'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <button onClick={() => handleNav('home')} className="flex-shrink-0">
          <Logo />
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              className="btn-ghost"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <button onClick={() => onNavigate('login')} className="btn-ghost">Login</button>
          <button onClick={() => onNavigate('signup')} className="btn-primary">Get Started</button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl p-2 text-ink-700 transition-colors hover:bg-ink-50 lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-ink-100 bg-white px-4 py-4 shadow-card lg:hidden animate-fade-in">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <button key={l.id} onClick={() => handleNav(l.id)} className="rounded-xl px-4 py-3 text-left text-sm font-medium text-ink-700 hover:bg-ink-50">
                {l.label}
              </button>
            ))}
            <div className="my-2 h-px bg-ink-100" />
            <button onClick={() => { onNavigate('login'); setMobileOpen(false); }} className="rounded-xl px-4 py-3 text-left text-sm font-medium text-ink-700 hover:bg-ink-50">Login</button>
            <button onClick={() => { onNavigate('signup'); setMobileOpen(false); }} className="btn-primary mt-1">Get Started</button>
          </div>
        </div>
      )}
    </header>
  );
}
