import { useState } from 'react';
import { Logo } from '@/components/common/Logo';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

interface AuthPageProps {
  mode: 'login' | 'signup';
  onNavigate: (page: string) => void;
}

export function AuthPage({ mode, onNavigate }: AuthPageProps) {
  const { login, signup } = useAuth();
  const { showToast } = useToast();
  const isLogin = mode === 'login';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!isLogin && !fullName.trim()) e.fullName = 'Please enter your full name';
    if (!email.trim()) e.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email';
    if (!password) e.password = 'Please enter a password';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters';
    if (!isLogin && !confirmPassword) e.confirmPassword = 'Please confirm your password';
    else if (!isLogin && password !== confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      if (isLogin) {
        login(email);
        showToast('Welcome back to PHaRMiS!', 'success');
      } else {
        signup(fullName, email);
        showToast('Account created successfully!', 'success');
      }
      setLoading(false);
      onNavigate('dashboard');
    }, 800);
  };

  const handleDemo = () => {
    setLoading(true);
    setTimeout(() => {
      login('aarohi.sharma@pharmis.app');
      showToast('Logged in with demo account', 'success');
      setLoading(false);
      onNavigate('dashboard');
    }, 600);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - branding */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-rose-50 via-white to-lavender-50 p-12 lg:flex">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-rose-100/50 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-lavender-100/50 blur-3xl" />

        <div className="relative">
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 text-sm text-ink-500 transition-colors hover:text-rose-500">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </button>
        </div>

        <div className="relative">
          <Logo size="lg" />
          <h2 className="mt-8 font-display text-3xl font-extrabold leading-tight text-ink-800">
            Your Health.<br />
            Your Records.<br />
            <span className="text-gradient-brand">Your Intelligence.</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-500">
            PHaRMiS brings your health records, daily monitoring, personalized insights, and risk alerts together in one intelligent platform.
          </p>
          <div className="mt-8 space-y-3">
            {['Centralized Health Record Management', 'Personalized AI-Driven Insights', 'Daily Health Monitoring', 'Risk Alerts & Recommendations'].map((f) => (
              <div key={f} className="flex items-center gap-3 text-sm text-ink-600">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-100 text-rose-500">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-ink-400">© 2025 PHaRMiS — Academic Project</p>
      </div>

      {/* Right side - form */}
      <div className="flex w-full flex-col items-center justify-center bg-white p-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <button onClick={() => onNavigate('landing')}>
              <Logo />
            </button>
            <button onClick={() => onNavigate('landing')} className="text-sm text-ink-500">← Home</button>
          </div>

          <h1 className="font-display text-2xl font-extrabold text-ink-800 sm:text-3xl">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mt-2 text-sm text-ink-500">
            {isLogin ? 'Login to access your health dashboard' : 'Start your personal health monitoring journey'}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {!isLogin && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input-field"
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="mt-1.5 text-xs text-rose-500">{errors.fullName}</p>}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-11"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs text-rose-500">{errors.email}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-11 pr-11"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-rose-500">{errors.password}</p>}
            </div>

            {!isLogin && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field pl-11"
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && <p className="mt-1.5 text-xs text-rose-500">{errors.confirmPassword}</p>}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  {isLogin ? 'Logging in...' : 'Creating account...'}
                </span>
              ) : (
                <>{isLogin ? 'Login' : 'Create Account'} <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-ink-100" />
            <span className="text-xs font-medium text-ink-400">OR</span>
            <div className="h-px flex-1 bg-ink-100" />
          </div>

          <button onClick={handleDemo} disabled={loading} className="btn-secondary w-full">
            <Sparkles className="h-4 w-4 text-lavender-500" />
            Continue with demo account
          </button>

          <p className="mt-6 text-center text-sm text-ink-500">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => onNavigate(isLogin ? 'signup' : 'login')}
              className="font-semibold text-rose-500 hover:text-rose-600"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
