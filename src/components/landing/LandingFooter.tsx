import { Logo } from '@/components/common/Logo';
import { Github, Linkedin, Mail, HeartPulse } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="border-t border-ink-100 bg-gradient-brand-soft">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo size="md" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500">
              Personal Health and Record Monitoring Intelligence System — bringing your health records, daily monitoring, and AI-driven insights together in one intelligent platform.
            </p>
            <div className="mt-5 flex gap-3">
              {[Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-xl border border-ink-200 bg-white text-ink-500 transition-all hover:border-rose-300 hover:text-rose-500 hover:shadow-soft">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-ink-800">Platform</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-500">
              <li><a href="#features" className="hover:text-rose-500 transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-rose-500 transition-colors">How It Works</a></li>
              <li><a href="#about" className="hover:text-rose-500 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-ink-800">Resources</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-500">
              <li><a href="#" className="hover:text-rose-500 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ink-100 pt-6 sm:flex-row">
          <p className="text-xs text-ink-400">© 2025 PHaRMiS — Personal Health and Record Monitoring Intelligence System. Academic project.</p>
          <p className="flex items-center gap-1.5 text-xs text-ink-400">
            <HeartPulse className="h-3.5 w-3.5 text-rose-400" /> Not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
